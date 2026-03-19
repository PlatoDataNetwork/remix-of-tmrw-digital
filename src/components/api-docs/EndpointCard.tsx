import { useState } from "react";
import { ChevronDown, ChevronRight, Copy, Check, Play, Loader2, Key, ArrowUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { AVAILABLE_VERTICALS } from "./apiSpec";

interface Parameter {
  name: string;
  in: "query" | "header" | "path";
  required: boolean;
  type: string;
  description: string;
  default?: string;
  enum?: string[];
}

interface ResponseExample {
  status: number;
  description: string;
  body: string;
}

interface EndpointCardProps {
  method: "GET" | "POST" | "PUT" | "DELETE";
  path: string;
  summary: string;
  description: string;
  tag: string;
  parameters: Parameter[];
  responses: ResponseExample[];
  requiresAuth: boolean;
  baseUrl: string;
  apiKey: string | null;
}

const methodColors: Record<string, string> = {
  GET: "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border-emerald-500/30",
  POST: "bg-blue-500/15 text-blue-600 dark:text-blue-400 border-blue-500/30",
  PUT: "bg-amber-500/15 text-amber-600 dark:text-amber-400 border-amber-500/30",
  DELETE: "bg-red-500/15 text-red-600 dark:text-red-400 border-red-500/30",
};

const EndpointCard = ({
  method,
  path,
  summary,
  description,
  tag,
  parameters,
  responses,
  requiresAuth,
  baseUrl,
  apiKey,
}: EndpointCardProps) => {
  const [expanded, setExpanded] = useState(false);
  const [tryItOpen, setTryItOpen] = useState(false);
  const [paramValues, setParamValues] = useState<Record<string, string>>(() => {
    const defaults: Record<string, string> = {};
    parameters.forEach((p) => {
      if (p.default) defaults[p.name] = p.default;
      // Pre-fill vertical with "blockchain" as a sensible default
      if (p.name === "vertical" && !p.default) defaults[p.name] = "blockchain";
    });
    return defaults;
  });
  const [response, setResponse] = useState<{ status: number; body: string } | null>(null);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  // All params that need input fields (both path and query)
  const allInputParams = parameters.filter((p) => p.in === "path" || p.in === "query");

  const constructUrl = () => {
    let resolvedPath = path;
    parameters
      .filter((p) => p.in === "path")
      .forEach((p) => {
        const val = paramValues[p.name] || `{${p.name}}`;
        resolvedPath = resolvedPath.replace(`{${p.name}}`, val);
      });

    let url = baseUrl + resolvedPath;
    const queryParams = parameters
      .filter((p) => p.in === "query" && paramValues[p.name])
      .map((p) => `${p.name}=${encodeURIComponent(paramValues[p.name])}`)
      .join("&");
    if (queryParams) url += `?${queryParams}`;
    return url;
  };

  const handleTryIt = async () => {
    setLoading(true);
    setResponse(null);
    try {
      const url = constructUrl();
      const headers: Record<string, string> = {};

      if (requiresAuth && apiKey) {
        headers["X-API-Key"] = apiKey;
      }

      const res = await fetch(url, { headers });
      const text = await res.text();
      let body: string;
      try {
        body = JSON.stringify(JSON.parse(text), null, 2);
      } catch {
        body = text;
      }
      setResponse({ status: res.status, body });
    } catch (err: any) {
      setResponse({ status: 0, body: `Network error: ${err.message}` });
    } finally {
      setLoading(false);
    }
  };

  const copyUrl = () => {
    navigator.clipboard.writeText(constructUrl());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const scrollToAuth = () => {
    const el = document.getElementById("authentication");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const isVerticalParam = (p: Parameter) => p.name === "vertical";

  const renderParamInput = (p: Parameter) => {
    // Vertical gets a dropdown with all available verticals
    if (isVerticalParam(p)) {
      return (
        <select
          value={paramValues[p.name] || ""}
          onChange={(e) => setParamValues({ ...paramValues, [p.name]: e.target.value })}
          className="flex-1 h-9 rounded-lg border border-input bg-background px-3 text-sm font-mono"
        >
          <option value="">Select a vertical...</option>
          {AVAILABLE_VERTICALS.map((v) => (
            <option key={v} value={v}>{v}</option>
          ))}
        </select>
      );
    }

    // Enum params get a dropdown
    if (p.enum) {
      return (
        <select
          value={paramValues[p.name] || ""}
          onChange={(e) => setParamValues({ ...paramValues, [p.name]: e.target.value })}
          className="flex-1 h-9 rounded-lg border border-input bg-background px-3 text-sm"
        >
          <option value="">Select...</option>
          {p.enum.map((v) => <option key={v} value={v}>{v}</option>)}
        </select>
      );
    }

    // Regular text/number input
    return (
      <Input
        value={paramValues[p.name] || ""}
        onChange={(e) => setParamValues({ ...paramValues, [p.name]: e.target.value })}
        placeholder={p.default || p.description}
        className="flex-1 h-9 text-sm rounded-lg font-mono"
      />
    );
  };

  return (
    <div className="rounded-2xl border border-border bg-card overflow-hidden transition-all duration-200">
      {/* Header */}
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full flex items-center gap-3 p-5 text-left hover:bg-muted/50 transition-colors"
      >
        <span className={cn("px-2.5 py-1 rounded-lg text-xs font-bold uppercase tracking-wider border", methodColors[method])}>
          {method}
        </span>
        <code className="text-sm font-mono text-foreground flex-1 truncate">{path}</code>
        {requiresAuth && (
          <span className="text-[10px] uppercase tracking-wider text-muted-foreground bg-muted px-2 py-0.5 rounded-full">
            Auth
          </span>
        )}
        <span className="text-sm text-muted-foreground font-light hidden md:block max-w-[200px] truncate">{summary}</span>
        {expanded ? (
          <ChevronDown className="w-4 h-4 text-muted-foreground flex-shrink-0" />
        ) : (
          <ChevronRight className="w-4 h-4 text-muted-foreground flex-shrink-0" />
        )}
      </button>

      {/* Expanded Content */}
      {expanded && (
        <div className="border-t border-border">
          <div className="p-6 space-y-6">
            {/* Description */}
            <p className="text-sm text-muted-foreground font-light leading-relaxed">{description}</p>

            {/* Parameters Table */}
            {parameters.length > 0 && (
              <div>
                <h4 className="text-sm font-medium text-foreground mb-3">Parameters</h4>
                <div className="rounded-xl border border-border overflow-hidden">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-muted/50">
                        <th className="text-left py-2.5 px-4 font-medium text-foreground">Name</th>
                        <th className="text-left py-2.5 px-4 font-medium text-muted-foreground">Location</th>
                        <th className="text-left py-2.5 px-4 font-medium text-muted-foreground">Type</th>
                        <th className="text-left py-2.5 px-4 font-medium text-muted-foreground hidden md:table-cell">Description</th>
                      </tr>
                    </thead>
                    <tbody>
                      {parameters.map((p) => (
                        <tr key={p.name} className="border-t border-border/50">
                          <td className="py-2.5 px-4">
                            <code className="text-xs font-mono text-foreground">{p.name}</code>
                            {p.required && <span className="text-destructive ml-1 text-xs">*</span>}
                          </td>
                          <td className="py-2.5 px-4 text-muted-foreground text-xs">{p.in}</td>
                          <td className="py-2.5 px-4 text-muted-foreground text-xs">{p.type}</td>
                          <td className="py-2.5 px-4 text-muted-foreground text-xs font-light hidden md:table-cell">
                            {p.description}
                            {p.enum && (
                              <span className="block mt-1 text-[10px]">
                                Values: {p.enum.map((v) => <code key={v} className="bg-muted px-1 py-0.5 rounded mx-0.5">{v}</code>)}
                              </span>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Responses */}
            <div>
              <h4 className="text-sm font-medium text-foreground mb-3">Responses</h4>
              <div className="space-y-3">
                {responses.map((r) => (
                  <div key={r.status} className="rounded-xl border border-border overflow-hidden">
                    <div className="flex items-center gap-2 px-4 py-2 bg-muted/50">
                      <span className={cn(
                        "text-xs font-bold",
                        r.status >= 200 && r.status < 300 ? "text-emerald-600 dark:text-emerald-400" :
                        r.status >= 400 ? "text-red-600 dark:text-red-400" : "text-foreground"
                      )}>
                        {r.status}
                      </span>
                      <span className="text-xs text-muted-foreground">{r.description}</span>
                    </div>
                    <div className="bg-muted/30 p-4 overflow-x-auto">
                      <pre className="text-xs font-mono text-foreground whitespace-pre-wrap">{r.body}</pre>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Try It Out */}
            <div className="border-t border-border pt-6">
              <button
                onClick={() => setTryItOpen(!tryItOpen)}
                className="flex items-center gap-2 text-sm font-medium text-primary hover:text-primary/80 transition-colors"
              >
                <Play className="w-4 h-4" />
                {tryItOpen ? "Hide Try It Out" : "Try It Out"}
              </button>

              {tryItOpen && (
                <div className="mt-4 space-y-4 rounded-xl border border-border bg-muted/20 p-5">
                  {/* API Key Field (for authenticated endpoints) */}
                  {requiresAuth && (
                    <div>
                      <label className="text-xs font-medium text-foreground mb-1.5 flex items-center gap-1.5">
                        <Key className="w-3.5 h-3.5" />
                        API Key <span className="text-destructive">*</span>
                      </label>
                      {apiKey ? (
                        <Input
                          value={apiKey}
                          disabled
                          className="h-9 text-sm rounded-lg font-mono bg-muted cursor-not-allowed opacity-70"
                        />
                      ) : (
                        <button
                          onClick={scrollToAuth}
                          className="w-full h-9 rounded-lg border border-dashed border-destructive/40 bg-destructive/5 text-sm text-destructive flex items-center justify-center gap-2 hover:bg-destructive/10 transition-colors"
                        >
                          <ArrowUp className="w-3.5 h-3.5" />
                          Generate your API Key first
                        </button>
                      )}
                      {apiKey && (
                        <p className="text-[10px] text-muted-foreground mt-1 font-light">
                          Your API key is auto-filled and will be sent in the X-API-Key header.
                        </p>
                      )}
                    </div>
                  )}

                  {/* All Parameter Inputs (path + query) */}
                  {allInputParams.length > 0 && (
                    <div className="space-y-3">
                      <h5 className="text-xs font-medium text-foreground uppercase tracking-wider">Parameters</h5>
                      {allInputParams.map((p) => (
                        <div key={p.name}>
                          <label className="text-xs font-mono text-muted-foreground mb-1 flex items-center gap-1">
                            {p.name}
                            {p.required && <span className="text-destructive text-[10px]">required</span>}
                            <span className="text-[10px] text-muted-foreground/60 ml-1">({p.in})</span>
                          </label>
                          {renderParamInput(p)}
                          <p className="text-[10px] text-muted-foreground/70 mt-0.5 font-light">{p.description}</p>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* URL Preview */}
                  <div>
                    <h5 className="text-xs font-medium text-foreground uppercase tracking-wider mb-1.5">Request URL</h5>
                    <div className="flex items-center gap-2">
                      <code className="flex-1 text-xs font-mono text-muted-foreground bg-muted px-4 py-2.5 rounded-xl break-all">
                        {constructUrl()}
                      </code>
                      <Button variant="outline" size="sm" onClick={copyUrl} className="rounded-lg flex-shrink-0">
                        {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                      </Button>
                    </div>
                  </div>

                  {/* Execute */}
                  <div className="flex gap-2">
                    <Button
                      onClick={handleTryIt}
                      disabled={loading || (requiresAuth && !apiKey)}
                      size="sm"
                      className="rounded-lg"
                    >
                      {loading ? <Loader2 className="w-4 h-4 animate-spin mr-1" /> : <Play className="w-4 h-4 mr-1" />}
                      Execute
                    </Button>
                    {requiresAuth && !apiKey && (
                      <span className="text-xs text-destructive flex items-center font-light">
                        API key required to execute
                      </span>
                    )}
                  </div>

                  {/* Live Response */}
                  {response && (
                    <div>
                      <h5 className="text-xs font-medium text-foreground uppercase tracking-wider mb-1.5">Response</h5>
                      <div className="rounded-xl border border-border overflow-hidden">
                        <div className="flex items-center gap-2 px-4 py-2 bg-muted/50">
                          <span className={cn(
                            "text-xs font-bold",
                            response.status >= 200 && response.status < 300 ? "text-emerald-600 dark:text-emerald-400" :
                            "text-red-600 dark:text-red-400"
                          )}>
                            {response.status || "ERR"}
                          </span>
                          <span className="text-xs text-muted-foreground">Live Response</span>
                        </div>
                        <div className="bg-muted/30 p-4 overflow-x-auto max-h-80 overflow-y-auto">
                          <pre className="text-xs font-mono text-foreground whitespace-pre-wrap">{response.body}</pre>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EndpointCard;
