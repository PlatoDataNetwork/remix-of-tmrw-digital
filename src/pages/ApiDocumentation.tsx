import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Key, Globe, Code2, FileJson, AlertTriangle, Copy, Check } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const countries = [
  { code: "+1", name: "United States", flag: "🇺🇸" },
  { code: "+1", name: "Canada", flag: "🇨🇦" },
  { code: "+44", name: "United Kingdom", flag: "🇬🇧" },
  { code: "+91", name: "India", flag: "🇮🇳" },
  { code: "+61", name: "Australia", flag: "🇦🇺" },
  { code: "+49", name: "Germany", flag: "🇩🇪" },
  { code: "+33", name: "France", flag: "🇫🇷" },
  { code: "+81", name: "Japan", flag: "🇯🇵" },
  { code: "+86", name: "China", flag: "🇨🇳" },
  { code: "+82", name: "South Korea", flag: "🇰🇷" },
  { code: "+971", name: "UAE", flag: "🇦🇪" },
  { code: "+966", name: "Saudi Arabia", flag: "🇸🇦" },
  { code: "+65", name: "Singapore", flag: "🇸🇬" },
  { code: "+41", name: "Switzerland", flag: "🇨🇭" },
  { code: "+31", name: "Netherlands", flag: "🇳🇱" },
  { code: "+46", name: "Sweden", flag: "🇸🇪" },
  { code: "+47", name: "Norway", flag: "🇳🇴" },
  { code: "+55", name: "Brazil", flag: "🇧🇷" },
  { code: "+52", name: "Mexico", flag: "🇲🇽" },
  { code: "+234", name: "Nigeria", flag: "🇳🇬" },
  { code: "+27", name: "South Africa", flag: "🇿🇦" },
  { code: "+254", name: "Kenya", flag: "🇰🇪" },
  { code: "+62", name: "Indonesia", flag: "🇮🇩" },
  { code: "+60", name: "Malaysia", flag: "🇲🇾" },
  { code: "+63", name: "Philippines", flag: "🇵🇭" },
  { code: "+66", name: "Thailand", flag: "🇹🇭" },
  { code: "+84", name: "Vietnam", flag: "🇻🇳" },
  { code: "+48", name: "Poland", flag: "🇵🇱" },
  { code: "+39", name: "Italy", flag: "🇮🇹" },
  { code: "+34", name: "Spain", flag: "🇪🇸" },
  { code: "+351", name: "Portugal", flag: "🇵🇹" },
  { code: "+7", name: "Russia", flag: "🇷🇺" },
  { code: "+90", name: "Turkey", flag: "🇹🇷" },
  { code: "+20", name: "Egypt", flag: "🇪🇬" },
  { code: "+972", name: "Israel", flag: "🇮🇱" },
  { code: "+92", name: "Pakistan", flag: "🇵🇰" },
  { code: "+880", name: "Bangladesh", flag: "🇧🇩" },
  { code: "+54", name: "Argentina", flag: "🇦🇷" },
  { code: "+56", name: "Chile", flag: "🇨🇱" },
  { code: "+57", name: "Colombia", flag: "🇨🇴" },
];

function detectCountry(): string {
  try {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const tzCountryMap: Record<string, string> = {
      "America/New_York": "United States",
      "America/Chicago": "United States",
      "America/Denver": "United States",
      "America/Los_Angeles": "United States",
      "America/Toronto": "Canada",
      "America/Vancouver": "Canada",
      "Europe/London": "United Kingdom",
      "Asia/Kolkata": "India",
      "Asia/Calcutta": "India",
      "Australia/Sydney": "Australia",
      "Europe/Berlin": "Germany",
      "Europe/Paris": "France",
      "Asia/Tokyo": "Japan",
      "Asia/Shanghai": "China",
      "Asia/Seoul": "South Korea",
      "Asia/Dubai": "UAE",
      "Asia/Riyadh": "Saudi Arabia",
      "Asia/Singapore": "Singapore",
    };
    return tzCountryMap[tz] || "United States";
  } catch {
    return "United States";
  }
}

const ApiDocumentation = () => {
  const { toast } = useToast();
  const [showForm, setShowForm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [generatedKey, setGeneratedKey] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    phone: "",
    country_code: (() => {
      const detected = detectCountry();
      const c = countries.find((c) => c.name === detected);
      return c ? c.code : "+1";
    })(),
  });

  const baseUrl = window.location.origin;
  const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const { data, error } = await supabase.functions.invoke("request-api-key", {
        body: {
          full_name: formData.full_name,
          email: formData.email,
          phone: formData.country_code + formData.phone,
          country_code: formData.country_code,
        },
      });

      if (error) throw error;

      if (data?.success) {
        setGeneratedKey(data.api_key);
        setShowForm(false);
        toast({ title: "Success", description: data.message });
      } else {
        toast({ title: "Error", description: data?.error || "Something went wrong", variant: "destructive" });
      }
    } catch (err: any) {
      toast({ title: "Error", description: err.message || "Failed to request API key", variant: "destructive" });
    } finally {
      setIsSubmitting(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="API Documentation | The Tomorrow Company"
        description="Access our articles programmatically with our REST API. Get real-time data on AI, Web3, and emerging technology news."
        path="/api-documentation"
      />
      <Navbar />

      <main className="pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent mb-4">
              API Documentation
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Access our articles programmatically with our REST API. Get real-time data on
              AI, Web3, and emerging technology news.
            </p>
          </div>

          {/* Generated Key Display */}
          {generatedKey && (
            <div className="mb-8 p-4 rounded-xl border border-green-500/30 bg-green-500/5">
              <div className="flex items-center gap-2 mb-2">
                <Key className="w-5 h-5 text-green-400" />
                <h3 className="font-semibold text-green-400">Your API Key</h3>
              </div>
              <div className="flex items-center gap-2">
                <code className="flex-1 bg-muted px-3 py-2 rounded text-sm font-mono text-foreground break-all">
                  {generatedKey}
                </code>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => copyToClipboard(generatedKey)}
                >
                  {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                </Button>
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                Save this key securely. Include it in the X-API-Key header for all API requests.
              </p>
            </div>
          )}

          {/* Authentication */}
          <section className="mb-10">
            <div className="flex items-center gap-2 mb-4">
              <Key className="w-5 h-5 text-blue-400" />
              <h2 className="text-xl font-bold text-foreground">Authentication</h2>
            </div>
            <div className="rounded-xl border border-border bg-card p-6">
              <p className="text-muted-foreground mb-3">
                All API requests require authentication using an API key. Include your API key in the request headers:
              </p>
              <div className="bg-muted rounded-lg p-4 mb-4">
                <code className="text-sm font-mono text-foreground">
                  X-API-Key: your_api_key_here
                </code>
              </div>
              <p className="text-muted-foreground">
                To obtain an API key, please{" "}
                <button
                  onClick={() => setShowForm(true)}
                  className="text-blue-400 hover:text-blue-300 underline underline-offset-2 font-medium transition-colors"
                >
                  click here
                </button>
                .
              </p>
            </div>
          </section>

          {/* Base URL */}
          <section className="mb-10">
            <div className="flex items-center gap-2 mb-4">
              <Globe className="w-5 h-5 text-blue-400" />
              <h2 className="text-xl font-bold text-foreground">Base URL</h2>
            </div>
            <div className="rounded-xl border border-border bg-card p-6">
              <div className="bg-muted rounded-lg p-4">
                <code className="text-sm font-mono text-foreground break-all">
                  {supabaseUrl}/functions/v1/data-feed-proxy
                </code>
              </div>
            </div>
          </section>

          {/* Query Parameters */}
          <section className="mb-10">
            <div className="flex items-center gap-2 mb-4">
              <Code2 className="w-5 h-5 text-blue-400" />
              <h2 className="text-xl font-bold text-foreground">Query Parameters</h2>
            </div>
            <div className="rounded-xl border border-border bg-card p-6 overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-2 px-3 text-blue-400 font-medium">Parameter</th>
                    <th className="text-left py-2 px-3 text-muted-foreground font-medium">Type</th>
                    <th className="text-left py-2 px-3 text-muted-foreground font-medium">Default</th>
                    <th className="text-left py-2 px-3 text-muted-foreground font-medium">Description</th>
                  </tr>
                </thead>
                <tbody className="text-muted-foreground">
                  <tr className="border-b border-border/50">
                    <td className="py-2 px-3 text-blue-400">vertical</td>
                    <td className="py-2 px-3">string</td>
                    <td className="py-2 px-3">-</td>
                    <td className="py-2 px-3">Filter articles by vertical slug (e.g., "blockchain")</td>
                  </tr>
                  <tr className="border-b border-border/50">
                    <td className="py-2 px-3 text-blue-400">format</td>
                    <td className="py-2 px-3">string</td>
                    <td className="py-2 px-3">json</td>
                    <td className="py-2 px-3">Response format: json, xml, or api</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-3 text-blue-400">api_key</td>
                    <td className="py-2 px-3">string</td>
                    <td className="py-2 px-3">-</td>
                    <td className="py-2 px-3">Required for format=api. Can also use X-API-Key header.</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* Examples */}
          <section className="mb-10">
            <div className="flex items-center gap-2 mb-4">
              <FileJson className="w-5 h-5 text-blue-400" />
              <h2 className="text-xl font-bold text-foreground">Examples</h2>
            </div>
            <div className="space-y-6">
              {/* cURL */}
              <div className="rounded-xl border border-border bg-card p-6">
                <h3 className="font-semibold text-foreground mb-2">cURL</h3>
                <p className="text-sm text-muted-foreground mb-3">Fetch the latest blockchain articles:</p>
                <div className="bg-muted rounded-lg p-4 overflow-x-auto">
                  <pre className="text-sm font-mono text-foreground whitespace-pre-wrap">
{`curl -X GET "${supabaseUrl}/functions/v1/data-feed-proxy?vertical=blockchain&format=api" \\
  -H "X-API-Key: your_api_key_here" \\
  -H "Authorization: Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}"`}
                  </pre>
                </div>
              </div>

              {/* JavaScript */}
              <div className="rounded-xl border border-border bg-card p-6">
                <h3 className="font-semibold text-foreground mb-2">JavaScript / TypeScript</h3>
                <div className="bg-muted rounded-lg p-4 overflow-x-auto">
                  <pre className="text-sm font-mono text-foreground whitespace-pre-wrap">
{`const response = await fetch(
  "${supabaseUrl}/functions/v1/data-feed-proxy?vertical=blockchain&format=api",
  {
    headers: {
      "X-API-Key": "your_api_key_here",
      "Authorization": "Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}"
    }
  }
);

const data = await response.json();
console.log(data);`}
                  </pre>
                </div>
              </div>

              {/* Python */}
              <div className="rounded-xl border border-border bg-card p-6">
                <h3 className="font-semibold text-foreground mb-2">Python</h3>
                <div className="bg-muted rounded-lg p-4 overflow-x-auto">
                  <pre className="text-sm font-mono text-foreground whitespace-pre-wrap">
{`import requests

url = "${supabaseUrl}/functions/v1/data-feed-proxy"
headers = {
    "X-API-Key": "your_api_key_here",
    "Authorization": "Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}"
}
params = {"vertical": "blockchain", "format": "api"}

response = requests.get(url, headers=headers, params=params)
data = response.json()
print(data)`}
                  </pre>
                </div>
              </div>
            </div>
          </section>

          {/* Error Responses */}
          <section className="mb-10">
            <div className="flex items-center gap-2 mb-4">
              <AlertTriangle className="w-5 h-5 text-blue-400" />
              <h2 className="text-xl font-bold text-foreground">Error Responses</h2>
            </div>
            <div className="rounded-xl border border-border bg-card p-6 space-y-4">
              <div>
                <h4 className="font-semibold text-foreground text-sm">401 Unauthorized</h4>
                <p className="text-xs text-muted-foreground mb-1">Invalid or missing API key</p>
                <div className="bg-muted rounded-lg p-3">
                  <code className="text-xs font-mono text-foreground">
                    {`{"success": false, "error": "Invalid or missing API key"}`}
                  </code>
                </div>
              </div>
              <div>
                <h4 className="font-semibold text-foreground text-sm">400 Bad Request</h4>
                <p className="text-xs text-muted-foreground mb-1">Missing required parameters</p>
                <div className="bg-muted rounded-lg p-3">
                  <code className="text-xs font-mono text-foreground">
                    {`{"success": false, "error": "vertical parameter is required"}`}
                  </code>
                </div>
              </div>
              <div>
                <h4 className="font-semibold text-foreground text-sm">404 Not Found</h4>
                <p className="text-xs text-muted-foreground mb-1">Feed not found for the given vertical</p>
                <div className="bg-muted rounded-lg p-3">
                  <code className="text-xs font-mono text-foreground">
                    {`{"success": false, "error": "Feed not found for ..."}`}
                  </code>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>

      {/* API Key Request Dialog */}
      <Dialog open={showForm} onOpenChange={setShowForm}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Request API Key</DialogTitle>
            <DialogDescription>
              Fill in your details to receive your API key instantly.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="full_name">Full Name *</Label>
              <Input
                id="full_name"
                required
                maxLength={200}
                value={formData.full_name}
                onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                placeholder="John Doe"
              />
            </div>
            <div>
              <Label htmlFor="email">Email *</Label>
              <Input
                id="email"
                type="email"
                required
                maxLength={255}
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="john@example.com"
              />
            </div>
            <div>
              <Label htmlFor="phone">Phone Number</Label>
              <div className="flex gap-2">
                <Select
                  value={formData.country_code}
                  onValueChange={(val) => setFormData({ ...formData, country_code: val })}
                >
                  <SelectTrigger className="w-[140px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="max-h-60">
                    {countries.map((c) => (
                      <SelectItem key={c.name} value={c.code}>
                        {c.flag} {c.code}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="Phone number"
                  className="flex-1"
                />
              </div>
            </div>
            <Button type="submit" disabled={isSubmitting} className="w-full">
              {isSubmitting ? "Generating..." : "Get API Key"}
            </Button>
          </form>
        </DialogContent>
      </Dialog>

      <Footer />
    </div>
  );
};

export default ApiDocumentation;
