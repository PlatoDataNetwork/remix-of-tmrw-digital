import { useState } from "react";
import { Copy, Check } from "lucide-react";
import { Button } from "@/components/ui/button";

type TokenType = "keyword" | "string" | "comment" | "number" | "function" | "operator" | "variable" | "property" | "punctuation" | "plain";

interface Token {
  type: TokenType;
  value: string;
}

const tokenColors: Record<TokenType, string> = {
  keyword: "text-[hsl(280,80%,65%)]",       // purple
  string: "text-[hsl(100,60%,55%)]",         // green
  comment: "text-[hsl(220,10%,50%)]",        // gray
  number: "text-[hsl(30,90%,60%)]",          // orange
  function: "text-[hsl(200,80%,65%)]",       // blue
  operator: "text-[hsl(0,70%,65%)]",         // red
  variable: "text-[hsl(40,80%,65%)]",        // yellow
  property: "text-[hsl(170,60%,55%)]",       // teal
  punctuation: "text-muted-foreground",
  plain: "text-foreground",
};

function tokenizeLine(line: string, lang: string): Token[] {
  const tokens: Token[] = [];
  let remaining = line;

  const push = (type: TokenType, value: string) => {
    tokens.push({ type, value });
    remaining = remaining.slice(value.length);
  };

  while (remaining.length > 0) {
    // Comments
    if (remaining.startsWith("#") || remaining.startsWith("//")) {
      push("comment", remaining);
      continue;
    }

    // Strings (double-quoted, single-quoted, backtick)
    const strMatch = remaining.match(/^(`[^`]*`|"[^"]*"|'[^']*')/);
    if (strMatch) { push("string", strMatch[0]); continue; }

    // Numbers
    const numMatch = remaining.match(/^\b\d+\.?\d*\b/);
    if (numMatch) { push("number", numMatch[0]); continue; }

    // Language-specific keywords
    const keywords = lang === "python"
      ? /^(import|from|as|def|class|return|if|else|elif|for|in|while|try|except|with|print|True|False|None)\b/
      : lang === "curl"
        ? /^(curl|GET|POST|PUT|DELETE|HEAD|PATCH)\b/
        : /^(const|let|var|function|async|await|return|import|from|export|default|if|else|for|while|try|catch|new|class|this|typeof|null|undefined|true|false)\b/;
    const kwMatch = remaining.match(keywords);
    if (kwMatch) { push("keyword", kwMatch[0]); continue; }

    // Flags for curl
    if (lang === "curl") {
      const flagMatch = remaining.match(/^-[A-Za-z]+/);
      if (flagMatch) { push("variable", flagMatch[0]); continue; }
    }

    // Object property keys (before colon)
    const propMatch = remaining.match(/^([a-zA-Z_]\w*)\s*:/);
    if (propMatch) {
      push("property", propMatch[1]);
      continue;
    }

    // Function calls
    const funcMatch = remaining.match(/^([a-zA-Z_]\w*)\s*\(/);
    if (funcMatch) {
      push("function", funcMatch[1]);
      continue;
    }

    // Dot property access
    const dotPropMatch = remaining.match(/^\.([a-zA-Z_]\w*)/);
    if (dotPropMatch) {
      push("punctuation", ".");
      push("property", dotPropMatch[1]);
      continue;
    }

    // Operators
    if (/^[=+\-*/<>!&|?:]/.test(remaining)) {
      const opMatch = remaining.match(/^(===|!==|==|!=|=>|>=|<=|&&|\|\||[=+\-*/<>!&|?:])/);
      if (opMatch) { push("operator", opMatch[0]); continue; }
    }

    // Punctuation
    if (/^[{}()\[\];,\\]/.test(remaining)) {
      push("punctuation", remaining[0]);
      continue;
    }

    // Whitespace
    const wsMatch = remaining.match(/^\s+/);
    if (wsMatch) { push("plain", wsMatch[0]); continue; }

    // Identifiers / plain text
    const idMatch = remaining.match(/^[a-zA-Z_$]\w*/);
    if (idMatch) { push("plain", idMatch[0]); continue; }

    // Fallback: single char
    push("plain", remaining[0]);
  }

  return tokens;
}

interface CodeBlockProps {
  code: string;
  language: "curl" | "javascript" | "python";
  title: string;
  icon?: React.ReactNode;
}

const CodeBlock = ({ code, language, title, icon }: CodeBlockProps) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const lines = code.split("\n");

  return (
    <div className="rounded-2xl border border-border bg-card overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-3 border-b border-border bg-muted/30">
        <div className="flex items-center gap-2">
          {/* Traffic light dots */}
          <div className="flex items-center gap-1.5 mr-3">
            <div className="w-3 h-3 rounded-full bg-[hsl(0,70%,55%)]" />
            <div className="w-3 h-3 rounded-full bg-[hsl(45,80%,55%)]" />
            <div className="w-3 h-3 rounded-full bg-[hsl(120,50%,50%)]" />
          </div>
          {icon}
          <span className="text-sm font-medium text-foreground">{title}</span>
        </div>
        <Button variant="ghost" size="sm" onClick={handleCopy} className="h-7 px-2 rounded-lg text-muted-foreground hover:text-foreground">
          {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
          <span className="ml-1.5 text-xs">{copied ? "Copied" : "Copy"}</span>
        </Button>
      </div>

      {/* Code */}
      <div className="overflow-x-auto">
        <div className="p-5 min-w-0">
          <pre className="text-[13px] font-mono leading-6 whitespace-pre">
            {lines.map((line, lineIdx) => (
              <div key={lineIdx} className="flex">
                <span className="select-none text-muted-foreground/40 w-8 text-right mr-5 flex-shrink-0 text-xs leading-6">
                  {lineIdx + 1}
                </span>
                <span className="flex-1">
                  {tokenizeLine(line, language).map((token, ti) => (
                    <span key={ti} className={tokenColors[token.type]}>
                      {token.value}
                    </span>
                  ))}
                </span>
              </div>
            ))}
          </pre>
        </div>
      </div>
    </div>
  );
};

export default CodeBlock;
