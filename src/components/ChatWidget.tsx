import { useState, useRef, useEffect, useCallback, useMemo } from "react";
import { createPortal } from "react-dom";
import { X, Send, Loader2, Trash2, Maximize2, Minimize2, ExternalLink } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import ReactMarkdown from "react-markdown";
import { useNavigate } from "react-router-dom";

import platoIcon from "@/assets/plato-icon.webp";
import { useChatContext } from "./ChatContext";
import { Children, ReactNode, isValidElement } from "react";

function extractText(node: ReactNode): string {
  if (typeof node === "string") return node;
  if (typeof node === "number") return String(node);
  if (!node) return "";
  if (Array.isArray(node)) return node.map(extractText).join("");
  if (isValidElement(node)) return extractText(node.props.children);
  return Children.toArray(node).map(extractText).join("");
}

const REF_REGEX = /\[\[REF:([^|]+)\|([^\]]+)\]\]/g;

function parseRefs(content: string): { cleanContent: string; refs: { label: string; path: string }[] } {
  const refs: { label: string; path: string }[] = [];
  const cleanContent = content.replace(REF_REGEX, (_, label, path) => {
    refs.push({ label: label.trim(), path: path.trim() });
    return "";
  }).trim();
  return { cleanContent, refs };
}

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  time: string;
}

const CHAT_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/chat`;

const marvinGreetings = [
  "Hey there! 👋 I'm **Marvin** — your W3AI guide. Ask me anything about the TMRW Browser, tokenomics, or our RWA sectors. Let's dive in!",
  "Welcome! 🚀 **Marvin** here. I've got the full W3AI Whitepaper loaded up. What would you like to explore today?",
  "Hi friend! ✨ I'm **Marvin**, your AI companion for all things TMRW. Curious about Web3, RWAs, or our token? Fire away!",
  "Greetings! 🤖 **Marvin** at your service. I know W3AI inside and out — from tokenomics to cybersecurity. What's on your mind?",
  "Hey! 👋 **Marvin** here, ready to chat. Whether it's the TMRW Browser, staking, or real-world assets — I've got answers.",
  "Hello! 🌟 I'm **Marvin** — think of me as your TMRW concierge. Ask about any of our 12 RWA sectors or the W3AI roadmap!",
  "What's up! 💡 **Marvin** reporting for duty. I can walk you through our whitepaper, token utility, or anything W3AI. Let's go!",
  "Hi there! 🛡️ I'm **Marvin**, your friendly W3AI assistant. Got questions about our AI layer, security, or multi-chain strategy? Ask away!",
];

function createWelcomeMessage(): Message {
  const greeting = marvinGreetings[Math.floor(Math.random() * marvinGreetings.length)];
  return {
    id: "welcome",
    content: greeting,
    role: "assistant",
    time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
  };
}

const ChatWidget = () => {
  
  const navigate = useNavigate();
  const { open, setOpen, maximized, setMaximized } = useChatContext();
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([createWelcomeMessage()]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const abortRef = useRef<AbortController | null>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const pendingFollowUp = useRef<string | null>(null);

  const streamChat = useCallback(async (allMessages: Message[]) => {
    const controller = new AbortController();
    abortRef.current = controller;

    const resp = await fetch(CHAT_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
      },
      body: JSON.stringify({
        messages: allMessages.map((m) => ({ role: m.role, content: m.content })),
      }),
      signal: controller.signal,
    });

    if (!resp.ok || !resp.body) {
      const errorData = await resp.json().catch(() => ({}));
      throw new Error(errorData.error || `Request failed (${resp.status})`);
    }

    const reader = resp.body.getReader();
    const decoder = new TextDecoder();
    let textBuffer = "";
    let assistantSoFar = "";
    let streamDone = false;

    const upsert = (next: string) => {
      assistantSoFar += next;
      const content = assistantSoFar;
      setMessages((prev) => {
        const last = prev[prev.length - 1];
        if (last?.role === "assistant" && last.id === "streaming") {
          return prev.map((m, i) => (i === prev.length - 1 ? { ...m, content } : m));
        }
        return [
          ...prev,
          {
            id: "streaming",
            role: "assistant" as const,
            content,
            time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
          },
        ];
      });
    };

    while (!streamDone) {
      const { done, value } = await reader.read();
      if (done) break;
      textBuffer += decoder.decode(value, { stream: true });

      let newlineIndex: number;
      while ((newlineIndex = textBuffer.indexOf("\n")) !== -1) {
        let line = textBuffer.slice(0, newlineIndex);
        textBuffer = textBuffer.slice(newlineIndex + 1);
        if (line.endsWith("\r")) line = line.slice(0, -1);
        if (line.startsWith(":") || line.trim() === "") continue;
        if (!line.startsWith("data: ")) continue;
        const jsonStr = line.slice(6).trim();
        if (jsonStr === "[DONE]") { streamDone = true; break; }
        try {
          const parsed = JSON.parse(jsonStr);
          const content = parsed.choices?.[0]?.delta?.content as string | undefined;
          if (content) upsert(content);
        } catch {
          textBuffer = line + "\n" + textBuffer;
          break;
        }
      }
    }

    if (textBuffer.trim()) {
      for (let raw of textBuffer.split("\n")) {
        if (!raw) continue;
        if (raw.endsWith("\r")) raw = raw.slice(0, -1);
        if (raw.startsWith(":") || raw.trim() === "") continue;
        if (!raw.startsWith("data: ")) continue;
        const jsonStr = raw.slice(6).trim();
        if (jsonStr === "[DONE]") continue;
        try {
          const parsed = JSON.parse(jsonStr);
          const content = parsed.choices?.[0]?.delta?.content as string | undefined;
          if (content) upsert(content);
        } catch { /* ignore */ }
      }
    }

    setMessages((prev) =>
      prev.map((m) => (m.id === "streaming" ? { ...m, id: Date.now().toString() } : m))
    );
  }, []);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;
    const now = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    const userMsg: Message = {
      id: Date.now().toString(),
      content: input.trim(),
      role: "user",
      time: now,
    };
    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setInput("");
    setIsLoading(true);

    try {
      await streamChat(newMessages);
    } catch (e: any) {
      if (e.name !== "AbortError") {
        setMessages((prev) => [
          ...prev,
          {
            id: (Date.now() + 1).toString(),
            content: "Sorry, I'm having trouble connecting right now. Please try again in a moment.",
            role: "assistant",
            time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
          },
        ]);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleFollowUp = useCallback((text: string) => {
    if (isLoading) return;
    const now = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    const userMsg: Message = { id: Date.now().toString(), content: text, role: "user", time: now };
    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setInput("");
    setIsLoading(true);
    streamChat(newMessages).catch((e: any) => {
      if (e.name !== "AbortError") {
        setMessages((prev) => [...prev, { id: (Date.now() + 1).toString(), content: "Sorry, I'm having trouble connecting right now.", role: "assistant", time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) }]);
      }
    }).finally(() => setIsLoading(false));
  }, [isLoading, messages, streamChat]);

  const panelClasses = maximized
    ? "fixed top-16 lg:top-20 left-0 right-0 z-[55] w-full rounded-none border-t border-border bg-background/95 backdrop-blur-2xl shadow-2xl flex flex-col overflow-hidden"
    : "fixed bottom-6 right-6 z-[60] w-[360px] sm:w-[400px] h-[520px] rounded-2xl border border-border bg-background/95 backdrop-blur-2xl shadow-2xl flex flex-col overflow-hidden";

  const panelHeight = maximized ? "calc(100vh - 4rem)" : undefined;
  const panelHeightLg = maximized ? "calc(100vh - 5rem)" : undefined;

  const chatUi = (
    <>
      {/* Floating Chat Button — hidden when chat is open */}
      {!open && (
        <motion.button
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
          onClick={() => setOpen(true)}
          className="fixed bottom-6 right-6 z-[70] h-9 w-9 flex items-center justify-center rounded-full bg-card border border-border hover:bg-accent transition-colors shadow-lg"
          aria-label="Open chat"
        >
          <div
            className="h-8 w-8 animated-gradient-icon-bright"
            style={{
              WebkitMaskImage: `url(${platoIcon})`,
              maskImage: `url(${platoIcon})`,
              WebkitMaskSize: "contain",
              maskSize: "contain",
              WebkitMaskRepeat: "no-repeat",
              maskRepeat: "no-repeat",
              WebkitMaskPosition: "center",
              maskPosition: "center",
            }}
          />
        </motion.button>
      )}

      {/* Chat Panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: maximized ? -10 : 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: maximized ? -10 : 20, scale: 0.95 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className={panelClasses}
            style={{ height: maximized ? panelHeight : undefined }}
          >
            {/* Use lg height via a style override */}
            {maximized && (
              <style>{`@media (min-width: 1024px) { .chat-maximized { height: ${panelHeightLg} !important; } }`}</style>
            )}

            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-border bg-card/70">
              <div className="flex items-center gap-3">
                <div
                  className="h-8 w-8 animated-gradient-icon-bright"
                  style={{
                    WebkitMaskImage: `url(${platoIcon})`,
                    maskImage: `url(${platoIcon})`,
                    WebkitMaskSize: "contain",
                    maskSize: "contain",
                    WebkitMaskRepeat: "no-repeat",
                    maskRepeat: "no-repeat",
                    WebkitMaskPosition: "center",
                    maskPosition: "center",
                  }}
                />
                <span className="text-sm font-semibold text-foreground">Marvin</span>
                <div className="h-2 w-2 rounded-full bg-green-400 animate-pulse" />
              </div>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => {
                    setMessages([createWelcomeMessage()]);
                  }}
                  className="p-1.5 rounded-full hover:bg-foreground/10 transition-colors"
                  title="Clear chat"
                >
                  <Trash2 className="h-3.5 w-3.5 text-muted-foreground" />
                </button>
                <button
                  onClick={() => setMaximized(!maximized)}
                  className="p-1.5 rounded-full hover:bg-foreground/10 transition-colors"
                  title={maximized ? "Minimize" : "Maximize"}
                >
                  {maximized ? (
                    <Minimize2 className="h-3.5 w-3.5 text-muted-foreground" />
                  ) : (
                    <Maximize2 className="h-3.5 w-3.5 text-muted-foreground" />
                  )}
                </button>
                <button
                  onClick={() => { setOpen(false); setMaximized(false); }}
                  className="p-1.5 rounded-full hover:bg-foreground/10 transition-colors"
                >
                  <X className="h-4 w-4 text-muted-foreground" />
                </button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3 scrollbar-thin bg-transparent">
              {messages.map((msg) => {
                const { cleanContent, refs } = msg.role === "assistant" ? parseRefs(msg.content) : { cleanContent: msg.content, refs: [] };
                return (
                <div
                  key={msg.id}
                  className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div className={`max-w-[85%] flex flex-col gap-2`}>
                    <div
                      className={`rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                        msg.role === "user"
                          ? "bg-gradient-to-r from-[hsl(260,80%,55%)] to-[hsl(220,90%,55%)] text-white rounded-br-md"
                          : "bg-foreground/[0.06] text-foreground/90 border border-border rounded-bl-md"
                      }`}
                    >
                      {msg.role === "assistant" ? (
                        <div className="prose prose-sm dark:prose-invert max-w-none [&>p]:m-0 [&>p]:mb-2 [&>ul]:my-1.5 [&>ol]:my-1.5 [&>hr]:my-3 [&>hr]:border-border [&_strong]:text-foreground [&_li]:mb-1">
                        <ReactMarkdown
                            components={{
                              a: ({ children }) => <span>{children}</span>,
                              li: ({ children, ...props }) => {
                                const text = extractText(children);
                                const isFollowUp = text.endsWith("?");
                                if (isFollowUp) {
                                  return (
                                    <li
                                      {...props}
                                      onClick={() => handleFollowUp(text)}
                                      className="cursor-pointer hover:text-[hsl(210,100%,70%)] transition-colors"
                                    >
                                      {children}
                                    </li>
                                  );
                                }
                                return <li {...props}>{children}</li>;
                              },
                            }}
                          >
                            {cleanContent}
                          </ReactMarkdown>
                        </div>
                      ) : (
                        <p>{msg.content}</p>
                      )}
                      <p className={`text-[10px] mt-1.5 ${msg.role === "user" ? "text-white/40" : "text-muted-foreground"}`}>
                        {msg.time}
                      </p>
                    </div>
                    {/* Reference Link Pills + Tell Me a Joke */}
                    {msg.role === "assistant" && msg.id !== "streaming" && (
                      <motion.div
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: 0.15 }}
                        className="flex flex-wrap gap-1.5 px-1"
                      >
                        {refs.map((ref, i) => (
                          <motion.button
                            key={i}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.2, delay: 0.2 + i * 0.08 }}
                            whileHover={{ scale: 1.05, y: -1 }}
                            whileTap={{ scale: 0.97 }}
                            onClick={() => {
                              handleFollowUp(`Tell me more about ${ref.label}`);
                              setTimeout(() => navigate(ref.path), 600);
                            }}
                            className="group flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium bg-gradient-to-r from-[hsl(260,60%,30%,0.4)] to-[hsl(220,70%,30%,0.4)] border border-border text-foreground/80 hover:text-foreground hover:border-foreground/25 hover:from-[hsl(260,60%,35%,0.5)] hover:to-[hsl(220,70%,35%,0.5)] transition-all duration-200 shadow-sm hover:shadow-md hover:shadow-[hsl(260,80%,55%,0.15)]"
                          >
                            <ExternalLink className="h-3 w-3 text-muted-foreground group-hover:text-[hsl(210,100%,70%)] transition-colors" />
                            {ref.label}
                          </motion.button>
                        ))}
                        <motion.button
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.2, delay: 0.2 + refs.length * 0.08 }}
                          whileHover={{ scale: 1.05, y: -1 }}
                          whileTap={{ scale: 0.97 }}
                          onClick={() => handleFollowUp("Tell me a joke about AI")}
                          className="group flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium bg-gradient-to-r from-[hsl(260,60%,30%,0.4)] to-[hsl(220,70%,30%,0.4)] border border-border text-foreground/80 hover:text-foreground hover:border-foreground/25 hover:from-[hsl(260,60%,35%,0.5)] hover:to-[hsl(220,70%,35%,0.5)] transition-all duration-200 shadow-sm hover:shadow-md hover:shadow-[hsl(260,80%,55%,0.15)]"
                        >
                          🤖 AI Joke
                        </motion.button>
                        <motion.button
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.2, delay: 0.2 + refs.length * 0.08 + 0.08 }}
                          whileHover={{ scale: 1.05, y: -1 }}
                          whileTap={{ scale: 0.97 }}
                          onClick={() => handleFollowUp("Tell me a blockchain joke")}
                          className="group flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium bg-gradient-to-r from-[hsl(45,80%,35%,0.4)] to-[hsl(30,70%,30%,0.4)] border border-border text-foreground/80 hover:text-foreground hover:border-foreground/25 hover:from-[hsl(45,80%,40%,0.5)] hover:to-[hsl(30,70%,35%,0.5)] transition-all duration-200 shadow-sm hover:shadow-md hover:shadow-[hsl(45,80%,55%,0.15)]"
                        >
                          ⛓️ Blockchain Joke
                        </motion.button>
                      </motion.div>
                    )}
                  </div>
                </div>
              );
              })}
              {isLoading && messages[messages.length - 1]?.role === "user" && (
                <div className="flex justify-start">
                  <div className="bg-foreground/[0.06] border border-border rounded-2xl rounded-bl-md px-4 py-3">
                    <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Suggestions */}
            {messages.length <= 1 && !isLoading && (
              <div className="px-4 pt-2 pb-0 flex flex-wrap gap-1.5">
                {[
                  { label: "📄 W3AI Whitepaper", text: "Tell me about the W3AI Whitepaper" },
                  { label: "😄 Tell Me a Joke", text: "Tell me a joke about AI" },
                ].map((s) => (
                  <button
                    key={s.label}
                    onClick={() => handleFollowUp(s.text)}
                    className="px-3 py-1.5 rounded-full text-xs font-medium bg-foreground/[0.06] border border-border text-muted-foreground hover:text-foreground hover:bg-foreground/10 hover:border-foreground/20 transition-all duration-200"
                  >
                    {s.label}
                  </button>
                ))}
              </div>
            )}

            {/* Input */}
            <div className="px-4 py-3 border-t border-border bg-card/70">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSend();
                }}
                className="flex items-center gap-2"
              >
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask about our services..."
                  disabled={isLoading}
                  className="flex-1 bg-white/5 border border-white/10 rounded-full px-4 py-2 text-sm text-white placeholder-white/30 focus:outline-none focus:border-white/20 transition-colors disabled:opacity-50"
                />
                <button
                  type="submit"
                  disabled={!input.trim() || isLoading}
                  className="p-2 rounded-full bg-gradient-to-r from-[hsl(260,80%,55%)] to-[hsl(220,90%,55%)] text-white hover:opacity-90 transition-opacity disabled:opacity-30"
                >
                  <Send className="h-4 w-4" />
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );

  if (typeof document === "undefined") return null;
  return createPortal(chatUi, document.body);
};

export default ChatWidget;
