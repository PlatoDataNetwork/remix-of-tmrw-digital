import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import ApiKeySection from "@/components/api-docs/ApiKeySection";
import EndpointCard from "@/components/api-docs/EndpointCard";
import CodeBlock from "@/components/api-docs/CodeBlock";
import { downloadPostmanCollection } from "@/components/api-docs/postmanCollection";
import { API_TAGS, API_ENDPOINTS, AVAILABLE_VERTICALS } from "@/components/api-docs/apiSpec";
import { Book, Server, Database, Globe, Copy, Check, Download, Terminal, FileCode2 } from "lucide-react";
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

          {/* Postman Collection */}
          <section className="mb-16">
            <h2 className="text-2xl md:text-3xl font-light text-foreground mb-6">Postman Collection</h2>
            <div className="rounded-2xl border border-border bg-card p-6">
              <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
                <div className="flex-1">
                  <h3 className="font-medium text-foreground mb-1">Import to Postman</h3>
                  <p className="text-sm text-muted-foreground font-light">
                    Download our pre-configured Postman collection with all endpoints, examples, and vertical presets.
                    {generatedKey && (
                      <span className="block mt-1 text-xs text-primary">
                        ✓ Your API key will be auto-populated in the collection variables.
                      </span>
                    )}
                  </p>
                </div>
                <Button
                  onClick={() => downloadPostmanCollection(generatedKey)}
                  className="rounded-xl px-6"
                  variant="outline"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Download Collection
                </Button>
              </div>
              <div className="mt-4 pt-4 border-t border-border">
                <p className="text-xs text-muted-foreground font-light">
                  <strong className="text-foreground">How to import:</strong> Open Postman → File → Import → Select the downloaded JSON file. The collection includes pre-set variables for <code className="bg-muted px-1 py-0.5 rounded">base_url</code>, <code className="bg-muted px-1 py-0.5 rounded">api_key</code>, and <code className="bg-muted px-1 py-0.5 rounded">vertical</code>.
                </p>
              </div>
            </div>
          </section>

          {/* Code Examples */}
          <section className="mb-16">
            <h2 className="text-2xl md:text-3xl font-light text-foreground mb-6">Quick Start Examples</h2>
            <div className="space-y-6">
              <CodeBlock
                language="curl"
                title="cURL"
                icon={<Terminal className="w-4 h-4 text-muted-foreground" />}
                code={`# Public JSON feed (no authentication required)
curl -X GET "${siteUrl}/blockchain.json"

# Public RSS feed
curl -X GET "${siteUrl}/blockchain.xml"

# Authenticated API — paginated articles
curl -X GET "${siteUrl}/api/blockchain?page=1&limit=20" \\
  -H "X-API-Key: ${generatedKey || "your_api_key_here"}"

# List all available verticals
curl -X GET "${siteUrl}/api/verticals" \\
  -H "X-API-Key: ${generatedKey || "your_api_key_here"}"

# Fetch a specific article by ID
curl -X GET "${siteUrl}/api/article?id=ARTICLE_UUID&format=json" \\
  -H "X-API-Key: ${generatedKey || "your_api_key_here"}"`}
              />

              <CodeBlock
                language="javascript"
                title="JavaScript / TypeScript"
                icon={<FileCode2 className="w-4 h-4 text-muted-foreground" />}
                code={`// ── Public Feed (no auth required) ──────────────────
const feedResponse = await fetch("${siteUrl}/blockchain.json");
const feed = await feedResponse.json();

// Access articles from the JSON Feed
const articles = feed.items;
console.log("Total articles:", articles.length);
console.log("Latest:", articles[0].title);

// ── Authenticated API with Pagination ──────────────
const API_KEY = "${generatedKey || "your_api_key_here"}";
const BASE_URL = "${siteUrl}";

async function getArticles(vertical, page = 1, limit = 20) {
  const url = \`\${BASE_URL}/api/\${vertical}?page=\${page}&limit=\${limit}\`;
  const response = await fetch(url, {
    headers: { "X-API-Key": API_KEY }
  });

  if (!response.ok) {
    throw new Error(\`API error: \${response.status}\`);
  }

  return response.json();
}

// Fetch first page of blockchain articles
const data = await getArticles("blockchain", 1, 50);
console.log(\`Page \${data.page} of \${data.total_pages}\`);
console.log(\`Total articles: \${data.total}\`);

// Iterate through all pages
for (let page = 1; page <= data.total_pages; page++) {
  const pageData = await getArticles("blockchain", page, 100);
  console.log(\`Processing page \${page}: \${pageData.articles.length} articles\`);
}`}
              />

              <CodeBlock
                language="python"
                title="Python"
                icon={<FileCode2 className="w-4 h-4 text-muted-foreground" />}
                code={`import requests
import json

BASE_URL = "${siteUrl}"
API_KEY = "${generatedKey || "your_api_key_here"}"

# ── Public Feed (no auth required) ──────────────────
response = requests.get(f"{BASE_URL}/blockchain.json")
feed = response.json()
articles = feed["items"]
print(f"Found {len(articles)} articles in feed")

# ── Authenticated API with Pagination ──────────────
def get_articles(vertical, page=1, limit=20):
    headers = {"X-API-Key": API_KEY}
    params = {"page": page, "limit": limit}
    response = requests.get(
        f"{BASE_URL}/api/{vertical}",
        headers=headers,
        params=params
    )
    response.raise_for_status()
    return response.json()

# Fetch first page
data = get_articles("blockchain", page=1, limit=50)
print(f"Page {data['page']} of {data['total_pages']}")
print(f"Total: {data['total']} articles")

# Iterate all pages and collect articles
all_articles = []
for page in range(1, data["total_pages"] + 1):
    page_data = get_articles("blockchain", page=page, limit=100)
    all_articles.extend(page_data["articles"])
    print(f"Fetched page {page}: {len(page_data['articles'])} articles")

print(f"Collected {len(all_articles)} total articles")`}
              />
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
