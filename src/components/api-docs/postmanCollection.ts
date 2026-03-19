// Generates a Postman Collection v2.1 JSON for The Tomorrow Company API

const BASE_URL = "https://www.tmrw-digital.com";

export function generatePostmanCollection(apiKey: string | null): object {
  const collection = {
    info: {
      _postman_id: "tmrw-api-collection",
      name: "The Tomorrow Company API",
      description: "Complete API collection for The Tomorrow Company data feeds. Access 600K+ articles across 55+ verticals via REST API.\n\nPublic feeds (JSON & RSS) require no authentication. Authenticated endpoints require an API key in the X-API-Key header.\n\nDocumentation: https://www.tmrw-digital.com/api-documentation",
      schema: "https://schema.getpostman.com/json/collection/v2.1.0/collection.json",
    },
    variable: [
      {
        key: "base_url",
        value: BASE_URL,
        type: "string",
      },
      {
        key: "api_key",
        value: apiKey || "YOUR_API_KEY_HERE",
        type: "string",
      },
      {
        key: "vertical",
        value: "blockchain",
        type: "string",
      },
    ],
    item: [
      {
        name: "🌐 Public Feeds",
        description: "Free access endpoints — no API key required.",
        item: [
          {
            name: "Get JSON Feed",
            request: {
              method: "GET",
              header: [],
              url: {
                raw: "{{base_url}}/{{vertical}}.json",
                host: ["{{base_url}}"],
                path: ["{{vertical}}.json"],
              },
              description: "Returns a JSON Feed (v1.1 spec) for the specified vertical. Contains the latest 50 articles with title, summary, full HTML content, author, and publication date.\n\nNo authentication required.",
            },
            response: [],
          },
          {
            name: "Get RSS Feed",
            request: {
              method: "GET",
              header: [],
              url: {
                raw: "{{base_url}}/{{vertical}}.xml",
                host: ["{{base_url}}"],
                path: ["{{vertical}}.xml"],
              },
              description: "Returns an RSS 2.0 XML feed for the specified vertical. Compatible with all RSS readers including Feedly, Inoreader, and NewsBlur.\n\nNo authentication required.",
            },
            response: [],
          },
        ],
      },
      {
        name: "🔐 Authenticated API",
        description: "Full API access with pagination and filtering. Requires X-API-Key header.",
        item: [
          {
            name: "List All Verticals",
            request: {
              method: "GET",
              header: [
                { key: "X-API-Key", value: "{{api_key}}", type: "text" },
              ],
              url: {
                raw: "{{base_url}}/api/verticals",
                host: ["{{base_url}}"],
                path: ["api", "verticals"],
              },
              description: "Returns all available verticals with their article counts, sorted by count descending. Use to discover available data categories.",
            },
            response: [],
          },
          {
            name: "Get Articles (Paginated)",
            request: {
              method: "GET",
              header: [
                { key: "X-API-Key", value: "{{api_key}}", type: "text" },
              ],
              url: {
                raw: "{{base_url}}/api/{{vertical}}?page=1&limit=20&format=api",
                host: ["{{base_url}}"],
                path: ["api", "{{vertical}}"],
                query: [
                  { key: "page", value: "1", description: "Page number (default: 1)" },
                  { key: "limit", value: "20", description: "Articles per page, 1-100 (default: 20)" },
                  { key: "format", value: "api", description: "Response format: api, json, xml (default: api)" },
                ],
              },
              description: "Returns a paginated list of articles for a specific vertical with full content, author attribution, read time, and image URLs.\n\nSupports page sizes from 1 to 100.",
            },
            response: [],
          },
          {
            name: "Get Articles — Page 2",
            request: {
              method: "GET",
              header: [
                { key: "X-API-Key", value: "{{api_key}}", type: "text" },
              ],
              url: {
                raw: "{{base_url}}/api/{{vertical}}?page=2&limit=50&format=api",
                host: ["{{base_url}}"],
                path: ["api", "{{vertical}}"],
                query: [
                  { key: "page", value: "2" },
                  { key: "limit", value: "50" },
                  { key: "format", value: "api" },
                ],
              },
              description: "Example: fetch the second page with 50 articles per page.",
            },
            response: [],
          },
          {
            name: "Get Articles as XML",
            request: {
              method: "GET",
              header: [
                { key: "X-API-Key", value: "{{api_key}}", type: "text" },
              ],
              url: {
                raw: "{{base_url}}/api/{{vertical}}?format=xml",
                host: ["{{base_url}}"],
                path: ["api", "{{vertical}}"],
                query: [
                  { key: "format", value: "xml", description: "Returns RSS XML instead of JSON" },
                ],
              },
              description: "Fetch articles in RSS XML format using authenticated API.",
            },
            response: [],
          },
        ],
      },
      {
        name: "📋 Vertical Examples",
        description: "Pre-configured requests for popular verticals.",
        item: [
          "blockchain", "artificial-intelligence", "fintech", "cyber-security", "real-estate", "gaming", "biotech",
        ].map((v) => ({
          name: `${v.replace(/-/g, " ").replace(/\b\w/g, (c: string) => c.toUpperCase())} Feed`,
          request: {
            method: "GET",
            header: [],
            url: {
              raw: `{{base_url}}/${v}.json`,
              host: ["{{base_url}}"],
              path: [`${v}.json`],
            },
            description: `JSON feed for the ${v.replace(/-/g, " ")} vertical.`,
          },
          response: [],
        })),
      },
    ],
  };

  return collection;
}

export function downloadPostmanCollection(apiKey: string | null) {
  const collection = generatePostmanCollection(apiKey);
  const json = JSON.stringify(collection, null, 2);
  const blob = new Blob([json], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "TMRW_API_Collection.postman_collection.json";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
