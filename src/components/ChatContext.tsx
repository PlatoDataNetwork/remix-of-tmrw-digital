import { createContext, useContext, useState, ReactNode } from "react";

interface ChatContextType {
  open: boolean;
  setOpen: (open: boolean) => void;
  maximized: boolean;
  setMaximized: (maximized: boolean) => void;
  toggleOpen: () => void;
}

const ChatContext = createContext<ChatContextType | null>(null);

export const useChatContext = () => {
  const ctx = useContext(ChatContext);
  if (!ctx) throw new Error("useChatContext must be used within ChatProvider");
  return ctx;
};

export const ChatProvider = ({ children }: { children: ReactNode }) => {
  const [open, setOpen] = useState(false);
  const [maximized, setMaximized] = useState(false);

  const toggleOpen = () => setOpen((prev) => !prev);

  return (
    <ChatContext.Provider value={{ open, setOpen, maximized, setMaximized, toggleOpen }}>
      {children}
    </ChatContext.Provider>
  );
};
