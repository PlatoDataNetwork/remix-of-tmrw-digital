import { useState, useMemo } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import ApiKeySection from "@/components/api-docs/ApiKeySection";
import EndpointCard from "@/components/api-docs/EndpointCard";
import { API_TAGS, API_ENDPOINTS, AVAILABLE_VERTICALS } from "@/components/api-docs/apiSpec";
import { Book, Server, Database, Globe, Copy, Check } from "lucide-react";
import { Button } from "@/components/ui/button";

const ApiDocumentation = () => {
  const [generatedKey, setGeneratedKey] = useState<string | null>(null);
  const [copiedBaseUrl, setCopiedBaseUrl] = useState(false);

  const siteUrl = typeof window !== "undefined" ? window.location.origin : "";
  const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;

  // Build actual try-it base URLs for each endpoint type
  const getBaseUrl = (endpoint: typeof API_ENDPOINTS[0]) => {
    if (endpoint.path.endsWith(".json")) {
      return `${SUPABASE_URL}/functions/v1/json-feed`;
    }
    if (endpoint.path.endsWith(".xml")) {
      return `${SUPABASE_URL}/functions/v1/rss-feed`;
    }
    if (endpoint.path === "/api/verticals") {
      return `${SUPABASE_URL}/functions/v1/platodata-feeds`;
    }
    if (endpoint.path.startsWith("/api/article")) {
      return `${SUPABASE_URL}/functions/v1/platodata-feeds`;
    }
    // Authenticated paginated API
    return `${SUPABASE_URL}/functions/v1/data-feed-proxy`;
  };

  // Transform endpoint path params to query params for try-it functionality
  const getEndpointParams = (endpoint: typeof API_ENDPOINTS[0]) => {
    const params = [...endpoint.parameters];

    // For the platodata-feeds endpoints, add `action` param
    if (endpoint.path === "/api/verticals") {
      return [{ name: "action", in: "query" as const, required: true, type: "string", description: "API action", default: "verticals" }];
    }
    if (endpoint.path.startsWith("/api/article")) {
      return [
        { name: "action", in: "query" as const, required: true, type: "string", description: "API action", default: "article" },
        ...params,
      ];
    }
    if (endpoint.path.endsWith(".json") || endpoint.path.endsWith(".xml")) {
      // Convert path param to query param
      return params.map((p) =>
        p.in === "path" ? { ...p, in: "query" as const, name: "vertical" } : p
      );
    }
    return params;
  };

  const copyBaseUrl = () => {
    navigator.clipboard.writeText(siteUrl);
    setCopiedBaseUrl(true);
    setTimeout(() => setCopiedBaseUrl(false), 2000);
  };

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="API Documentation | The Tomorrow Company"
        description="Interactive API documentation for accessing 600K+ articles across 55+ verticals. Try endpoints live, get your API key, and integrate in minutes."
        path="/api-documentation"
      />
      <Navbar />

      <main className="pt-24 pb-16">
        <div className="max-w-5xl mx-auto px-6 lg:px-8">
          {/* Hero Header */}
          <div className="text-center mb-16">
            <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground mb-4">Developer</p>
            <h1 className="text-3xl md:text-5xl font-light text-foreground mb-6">
              API Documentation
            </h1>
            <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto font-light">
              Access 600K+ articles across 55+ verticals via REST API.
              Real-time data on AI, Web3, Fintech, and emerging technology.
            </p>
          </div>

          {/* Quick Info Bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
            <div className="rounded-2xl border border-border bg-card p-5 text-center">
              <Server className="w-5 h-5 text-muted-foreground mx-auto mb-2" />
              <p className="text-xs text-muted-foreground font-light">Base URL</p>
              <p className="text-sm font-mono text-foreground mt-1 truncate">{siteUrl}</p>
            </div>
            <div className="rounded-2xl border border-border bg-card p-5 text-center">
              <Database className="w-5 h-5 text-muted-foreground mx-auto mb-2" />
              <p className="text-xs text-muted-foreground font-light">Articles</p>
              <p className="text-sm font-medium text-foreground mt-1">600,000+</p>
            </div>
            <div className="rounded-2xl border border-border bg-card p-5 text-center">
              <Globe className="w-5 h-5 text-muted-foreground mx-auto mb-2" />
              <p className="text-xs text-muted-foreground font-light">Verticals</p>
              <p className="text-sm font-medium text-foreground mt-1">55+</p>
            </div>
            <div className="rounded-2xl border border-border bg-card p-5 text-center">
              <Book className="w-5 h-5 text-muted-foreground mx-auto mb-2" />
              <p className="text-xs text-muted-foreground font-light">Formats</p>
              <p className="text-sm font-medium text-foreground mt-1">JSON, XML, RSS</p>
            </div>
          </div>

          {/* API Key Section */}
          <ApiKeySection generatedKey={generatedKey} setGeneratedKey={setGeneratedKey} />

          {/* Base URL */}
          <section className="mb-16">
            <h2 className="text-2xl md:text-3xl font-light text-foreground mb-6">Base URL</h2>
            <div className="rounded-2xl border border-border bg-card p-6">
              <div className="flex items-center gap-2">
                <code className="flex-1 bg-muted px-4 py-3 rounded-xl text-sm font-mono text-foreground break-all">
                  {siteUrl}
                </code>
                <Button variant="outline" size="sm" onClick={copyBaseUrl} className="rounded-xl flex-shrink-0">
                  {copiedBaseUrl ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                </Button>
              </div>
              <p className="text-xs text-muted-foreground mt-3 font-light">
                All endpoint paths are relative to this base URL. Public feeds can be accessed directly; authenticated endpoints require the <code className="bg-muted px-1 py-0.5 rounded text-xs">X-API-Key</code> header.
              </p>
            </div>
          </section>

          {/* Endpoints by Tag */}
          {API_TAGS.map((tag) => {
            const endpoints = API_ENDPOINTS.filter((e) => e.tag === tag.name);
            if (endpoints.length === 0) return null;
            return (
              <section key={tag.name} className="mb-16">
                <div className="mb-6">
                  <h2 className="text-2xl md:text-3xl font-light text-foreground mb-2">{tag.name}</h2>
                  <p className="text-sm text-muted-foreground font-light">{tag.description}</p>
                </div>
                <div className="space-y-4">
                  {endpoints.map((endpoint, i) => (
                    <EndpointCard
                      key={i}
                      {...endpoint}
                      parameters={getEndpointParams(endpoint)}
                      baseUrl={getBaseUrl(endpoint)}
                      apiKey={generatedKey}
                    />
                  ))}
                </div>
              </section>
            );
          })}

          {/* Available Verticals */}
          <section className="mb-16">
            <h2 className="text-2xl md:text-3xl font-light text-foreground mb-6">Available Verticals</h2>
            <div className="rounded-2xl border border-border bg-card p-6">
              <p className="text-sm text-muted-foreground font-light mb-4">
                Use any of these vertical slugs as the <code className="bg-muted px-1.5 py-0.5 rounded text-xs">vertical</code> parameter in your API requests:
              </p>
              <div className="flex flex-wrap gap-2">
                {AVAILABLE_VERTICALS.map((v) => (
                  <code
                    key={v}
                    className="text-xs font-mono bg-muted text-foreground px-2.5 py-1.5 rounded-lg hover:bg-muted/80 cursor-default transition-colors"
                  >
                    {v}
                  </code>
                ))}
              </div>
            </div>
          </section>

          {/* Code Examples */}
          <section className="mb-16">
            <h2 className="text-2xl md:text-3xl font-light text-foreground mb-6">Quick Start Examples</h2>
            <div className="space-y-6">
              <div className="rounded-2xl border border-border bg-card p-6">
                <h3 className="font-medium text-foreground mb-3">cURL</h3>
                <div className="bg-muted rounded-xl p-4 overflow-x-auto">
                  <pre className="text-sm font-mono text-foreground whitespace-pre-wrap">
{`# Public feed (no auth)
curl "${siteUrl}/blockchain.json"

# Authenticated API with pagination
curl -H "X-API-Key: your_api_key" \\
  "${siteUrl}/api/blockchain?page=1&limit=20"`}
                  </pre>
                </div>
              </div>

              <div className="rounded-2xl border border-border bg-card p-6">
                <h3 className="font-medium text-foreground mb-3">JavaScript / TypeScript</h3>
                <div className="bg-muted rounded-xl p-4 overflow-x-auto">
                  <pre className="text-sm font-mono text-foreground whitespace-pre-wrap">
{`// Public feed
const feed = await fetch("${siteUrl}/blockchain.json");
const data = await feed.json();
console.log(data.items); // Array of articles

// Authenticated API with pagination
const res = await fetch("${siteUrl}/api/blockchain?page=2&limit=50", {
  headers: { "X-API-Key": "your_api_key" }
});
const { articles, total, total_pages } = await res.json();`}
                  </pre>
                </div>
              </div>

              <div className="rounded-2xl border border-border bg-card p-6">
                <h3 className="font-medium text-foreground mb-3">Python</h3>
                <div className="bg-muted rounded-xl p-4 overflow-x-auto">
                  <pre className="text-sm font-mono text-foreground whitespace-pre-wrap">
{`import requests

# Public feed
response = requests.get("${siteUrl}/blockchain.json")
articles = response.json()["items"]

# Authenticated API with pagination
headers = {"X-API-Key": "your_api_key"}
response = requests.get(
    "${siteUrl}/api/blockchain",
    params={"page": 1, "limit": 20},
    headers=headers
)
data = response.json()
print(f"Page {data['page']} of {data['total_pages']}")`}
                  </pre>
                </div>
              </div>
            </div>
          </section>

          {/* Rate Limits & Caching */}
          <section className="mb-16">
            <h2 className="text-2xl md:text-3xl font-light text-foreground mb-6">Rate Limits & Caching</h2>
            <div className="rounded-2xl border border-border bg-card p-6 space-y-4">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium text-foreground text-sm mb-2">Caching</h4>
                  <ul className="text-sm text-muted-foreground font-light space-y-1">
                    <li>• Public feeds: 30 minutes cache</li>
                    <li>• Paginated API: 5 minutes cache</li>
                    <li>• Single article: 10 minutes cache</li>
                    <li>• Vertical list: 30 minutes cache</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium text-foreground text-sm mb-2">Pagination</h4>
                  <ul className="text-sm text-muted-foreground font-light space-y-1">
                    <li>• Default page size: 20 articles</li>
                    <li>• Maximum page size: 100 articles</li>
                    <li>• Response includes <code className="bg-muted px-1 rounded text-xs">total</code> and <code className="bg-muted px-1 rounded text-xs">total_pages</code></li>
                    <li>• Sorted by publication date (newest first)</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ApiDocumentation;
