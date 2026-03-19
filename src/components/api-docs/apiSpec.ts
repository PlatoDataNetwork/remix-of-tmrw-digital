// OpenAPI-like specification for all API endpoints

export interface ApiEndpoint {
  method: "GET" | "POST" | "PUT" | "DELETE";
  path: string;
  summary: string;
  description: string;
  tag: string;
  requiresAuth: boolean;
  parameters: {
    name: string;
    in: "query" | "header" | "path";
    required: boolean;
    type: string;
    description: string;
    default?: string;
    enum?: string[];
  }[];
  responses: {
    status: number;
    description: string;
    body: string;
  }[];
}

export const API_TAGS = [
  { name: "Public Feeds", description: "Free access to JSON and RSS feeds — no API key required." },
  { name: "Authenticated API", description: "Full API access with pagination, filtering, and detailed article data. Requires an API key." },
];

export const API_ENDPOINTS: ApiEndpoint[] = [
  // ===== PUBLIC FEEDS =====
  {
    method: "GET",
    path: "/{vertical}.json",
    summary: "JSON Feed",
    description: "Returns a JSON Feed (v1.1 spec) for a given vertical. Contains the latest 50 articles with title, summary, content, author, and publication date. No authentication required. Ideal for feed readers and aggregators.",
    tag: "Public Feeds",
    requiresAuth: false,
    parameters: [
      {
        name: "vertical",
        in: "path",
        required: true,
        type: "string",
        description: "The vertical slug (e.g., blockchain, artificial-intelligence, fintech)",
      },
    ],
    responses: [
      {
        status: 200,
        description: "Successful response — JSON Feed v1.1 format",
        body: `{
  "version": "https://jsonfeed.org/version/1.1",
  "title": "The Tomorrow Company - Blockchain",
  "home_page_url": "https://www.tmrw-digital.com/data-feeds",
  "feed_url": "https://www.tmrw-digital.com/blockchain.json",
  "description": "Latest news from the blockchain industry",
  "items": [
    {
      "id": "uuid-here",
      "title": "Article Title",
      "summary": "Brief excerpt...",
      "content_html": "<p>Full HTML content...</p>",
      "url": "https://www.tmrw-digital.com/...",
      "date_published": "2025-01-15T10:30:00Z",
      "authors": [{ "name": "The Tomorrow Company" }],
      "image": "https://..."
    }
  ]
}`,
      },
      {
        status: 404,
        description: "Feed not found for the given vertical",
        body: `{ "error": "Feed not found for unknown-vertical" }`,
      },
    ],
  },
  {
    method: "GET",
    path: "/{vertical}.xml",
    summary: "RSS Feed",
    description: "Returns an RSS 2.0 XML feed for a given vertical. Contains the latest 50 articles. Compatible with all RSS readers including Feedly, Inoreader, and NewsBlur. No authentication required.",
    tag: "Public Feeds",
    requiresAuth: false,
    parameters: [
      {
        name: "vertical",
        in: "path",
        required: true,
        type: "string",
        description: "The vertical slug (e.g., blockchain, artificial-intelligence, fintech)",
      },
    ],
    responses: [
      {
        status: 200,
        description: "Successful response — RSS 2.0 XML",
        body: `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="...">
  <channel>
    <title>The Tomorrow Company - Blockchain</title>
    <link>https://www.tmrw-digital.com/data-feeds</link>
    <description>Latest Blockchain news...</description>
    <item>
      <title>Article Title</title>
      <description>Brief excerpt...</description>
      <link>https://...</link>
      <pubDate>Wed, 15 Jan 2025 10:30:00 GMT</pubDate>
    </item>
  </channel>
</rss>`,
      },
      {
        status: 404,
        description: "Feed not found",
        body: `<?xml version="1.0"?><rss><channel><title>Feed not found</title></channel></rss>`,
      },
    ],
  },

  // ===== AUTHENTICATED API =====
  {
    method: "GET",
    path: "/api/{vertical}",
    summary: "Get Articles (Paginated)",
    description: "Returns a paginated list of articles for a specific vertical with full content, author attribution, read time, and image URLs. Supports configurable page size (1-100) and page number. API key required in the X-API-Key header.",
    tag: "Authenticated API",
    requiresAuth: true,
    parameters: [
      {
        name: "vertical",
        in: "query",
        required: true,
        type: "string",
        description: "The vertical slug (e.g., blockchain, fintech, real-estate)",
      },
      {
        name: "page",
        in: "query",
        required: false,
        type: "integer",
        description: "Page number for pagination",
        default: "1",
      },
      {
        name: "limit",
        in: "query",
        required: false,
        type: "integer",
        description: "Number of articles per page (1-100)",
        default: "20",
      },
      {
        name: "format",
        in: "query",
        required: false,
        type: "string",
        description: "Response format",
        default: "api",
        enum: ["api", "json", "xml"],
      },
    ],
    responses: [
      {
        status: 200,
        description: "Paginated articles response",
        body: `{
  "success": true,
  "vertical": "blockchain",
  "page": 1,
  "limit": 20,
  "total": 112547,
  "total_pages": 5628,
  "articles": [
    {
      "id": "uuid",
      "title": "Article Title",
      "excerpt": "Brief excerpt...",
      "content": "<p>Full HTML content...</p>",
      "author": "The Tomorrow Company",
      "published_at": "2025-01-15T10:30:00Z",
      "read_time": "4 min",
      "image_url": "https://...",
      "external_url": "https://www.tmrw-digital.com/...",
      "vertical_slug": "blockchain"
    }
  ]
}`,
      },
      {
        status: 401,
        description: "Invalid or missing API key",
        body: `{ "success": false, "error": "Invalid or missing API key" }`,
      },
      {
        status: 400,
        description: "Missing required parameter",
        body: `{ "success": false, "error": "vertical parameter is required" }`,
      },
    ],
  },
  {
    method: "GET",
    path: "/api/verticals",
    summary: "List All Verticals",
    description: "Returns a list of all available verticals with their article counts, sorted by count descending. Use this to discover available data categories and their volume. API key recommended but not required.",
    tag: "Authenticated API",
    requiresAuth: false,
    parameters: [],
    responses: [
      {
        status: 200,
        description: "List of all verticals with article counts",
        body: `{
  "success": true,
  "total_verticals": 55,
  "total_articles": 616000,
  "verticals": [
    { "slug": "blockchain", "name": "Blockchain", "count": 112547 },
    { "slug": "artificial-intelligence", "name": "AI", "count": 98320 },
    { "slug": "fintech", "name": "Fintech", "count": 45123 }
  ]
}`,
      },
    ],
  },
  {
    method: "GET",
    path: "/api/article/{id}",
    summary: "Get Single Article",
    description: "Returns a single article by its UUID with full content, metadata, and author information. Supports JSON and XML response formats. API key recommended.",
    tag: "Authenticated API",
    requiresAuth: false,
    parameters: [
      {
        name: "id",
        in: "query",
        required: true,
        type: "string (UUID)",
        description: "The unique article ID",
      },
      {
        name: "format",
        in: "query",
        required: false,
        type: "string",
        description: "Response format",
        default: "json",
        enum: ["json", "xml"],
      },
    ],
    responses: [
      {
        status: 200,
        description: "Full article data",
        body: `{
  "success": true,
  "article": {
    "id": "uuid",
    "title": "Article Title",
    "excerpt": "Brief excerpt...",
    "content": "<p>Full HTML content...</p>",
    "author": "The Tomorrow Company",
    "published_at": "2025-01-15T10:30:00Z",
    "read_time": "4 min",
    "category": "Technology",
    "vertical_slug": "blockchain",
    "image_url": "https://...",
    "external_url": "https://..."
  }
}`,
      },
      {
        status: 404,
        description: "Article not found",
        body: `{ "success": false, "error": "Article not found" }`,
      },
    ],
  },
];

export const AVAILABLE_VERTICALS = [
  "aerospace", "ar-vr", "artificial-intelligence", "autism", "automotive", "aviation",
  "big-data", "biotech", "biotechnology", "blockchain", "cannabis", "carbon", "cleantech",
  "clinical-trials", "code", "crowdfunding", "cyber-security", "defense", "ecommerce",
  "edtech", "energy", "environment", "esg", "esports", "finance", "financefeeds", "fintech",
  "forex", "gaming", "hrtech", "hydrogen", "iot", "medical-devices", "music",
  "nano-technology", "nfts", "patents", "payments", "private-equity",
  "psychedelics", "quantum", "real-estate", "saas", "semiconductor", "seo", "solar",
  "spacs", "startups", "stem-cell", "supply-chain", "trading", "venture-capital",
  "waste-management",
];
