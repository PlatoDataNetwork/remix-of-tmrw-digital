import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Key, Copy, Check, Shield, Zap, Clock } from "lucide-react";
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
      "America/New_York": "United States", "America/Chicago": "United States",
      "America/Denver": "United States", "America/Los_Angeles": "United States",
      "America/Toronto": "Canada", "America/Vancouver": "Canada",
      "Europe/London": "United Kingdom", "Asia/Kolkata": "India",
      "Australia/Sydney": "Australia", "Europe/Berlin": "Germany",
      "Europe/Paris": "France", "Asia/Tokyo": "Japan",
      "Asia/Shanghai": "China", "Asia/Seoul": "South Korea",
      "Asia/Dubai": "UAE", "Asia/Riyadh": "Saudi Arabia",
      "Asia/Singapore": "Singapore",
    };
    return tzCountryMap[tz] || "United States";
  } catch {
    return "United States";
  }
}

const API_KEY_STORAGE_KEY = "tmrw_api_key";
const API_KEY_EMAIL_KEY = "tmrw_api_email";

interface ApiKeySectionProps {
  generatedKey: string | null;
  setGeneratedKey: (key: string | null) => void;
}

const ApiKeySection = ({ generatedKey, setGeneratedKey }: ApiKeySectionProps) => {
  const { toast } = useToast();
  const [showForm, setShowForm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [copied, setCopied] = useState(false);
  const detectedCountryName = detectCountry();

  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    phone: "",
    selected_country: detectedCountryName,
  });

  const selectedCountry = countries.find((c) => c.name === formData.selected_country);
  const countryCode = selectedCountry?.code || "+1";

  useEffect(() => {
    const storedKey = localStorage.getItem(API_KEY_STORAGE_KEY);
    if (storedKey) setGeneratedKey(storedKey);
  }, [setGeneratedKey]);

  const handleRequestKey = () => {
    const storedKey = localStorage.getItem(API_KEY_STORAGE_KEY);
    if (storedKey) {
      setGeneratedKey(storedKey);
      toast({ title: "API Key Found", description: "You already have an API key." });
      return;
    }
    setShowForm(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const { data, error } = await supabase.functions.invoke("request-api-key", {
        body: {
          full_name: formData.full_name,
          email: formData.email,
          phone: countryCode + formData.phone,
          country_code: countryCode,
        },
      });
      if (error) throw error;
      if (data?.success) {
        setGeneratedKey(data.api_key);
        localStorage.setItem(API_KEY_STORAGE_KEY, data.api_key);
        localStorage.setItem(API_KEY_EMAIL_KEY, formData.email);
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
    <>
      {/* How to Get an API Key */}
      <section id="authentication" className="mb-16">
        <h2 className="text-2xl md:text-3xl font-light text-foreground mb-8">Getting Started</h2>

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="rounded-2xl border border-border bg-card p-6">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
              <Zap className="w-5 h-5 text-primary" />
            </div>
            <h3 className="font-medium text-foreground mb-2">1. Request Key</h3>
            <p className="text-sm text-muted-foreground font-light">
              Fill in your name and email to instantly receive your API key. No approval wait time.
            </p>
          </div>
          <div className="rounded-2xl border border-border bg-card p-6">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
              <Shield className="w-5 h-5 text-primary" />
            </div>
            <h3 className="font-medium text-foreground mb-2">2. Authenticate</h3>
            <p className="text-sm text-muted-foreground font-light">
              Include your key in the <code className="text-xs bg-muted px-1.5 py-0.5 rounded">X-API-Key</code> header for authenticated endpoints.
            </p>
          </div>
          <div className="rounded-2xl border border-border bg-card p-6">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
              <Clock className="w-5 h-5 text-primary" />
            </div>
            <h3 className="font-medium text-foreground mb-2">3. Start Building</h3>
            <p className="text-sm text-muted-foreground font-light">
              Access 55+ verticals with 600K+ articles. Public feeds are available without authentication.
            </p>
          </div>
        </div>

        {/* Generated Key Display */}
        {generatedKey ? (
          <div className="p-6 rounded-2xl border-2 border-primary/20 bg-primary/5">
            <div className="flex items-center gap-2 mb-3">
              <Key className="w-5 h-5 text-primary" />
              <h3 className="font-medium text-foreground">Your API Key</h3>
            </div>
            <div className="flex items-center gap-2">
              <code className="flex-1 bg-muted px-4 py-3 rounded-xl text-sm font-mono text-foreground break-all">
                {generatedKey}
              </code>
              <Button
                variant="outline"
                size="sm"
                onClick={() => copyToClipboard(generatedKey)}
                className="rounded-xl"
              >
                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              </Button>
            </div>
            <p className="text-xs text-muted-foreground mt-3 font-light">
              Save this key securely. Include it in the <code className="bg-muted px-1 py-0.5 rounded text-xs">X-API-Key</code> header for all authenticated requests.
            </p>
          </div>
        ) : (
          <Button onClick={handleRequestKey} className="rounded-xl px-8" size="lg">
            <Key className="w-4 h-4 mr-2" />
            Get Your Free API Key
          </Button>
        )}
      </section>

      {/* Request Dialog */}
      <Dialog open={showForm} onOpenChange={setShowForm}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="font-medium">Request API Key</DialogTitle>
            <DialogDescription className="font-light">
              Fill in your details to receive your API key instantly.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="full_name">Full Name *</Label>
              <Input id="full_name" required maxLength={200} value={formData.full_name}
                onChange={(e) => setFormData({ ...formData, full_name: e.target.value })} placeholder="John Doe" />
            </div>
            <div>
              <Label htmlFor="email">Email *</Label>
              <Input id="email" type="email" required maxLength={255} value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })} placeholder="john@example.com" />
            </div>
            <div>
              <Label htmlFor="phone">Phone Number</Label>
              <div className="flex gap-2">
                <Select value={formData.selected_country}
                  onValueChange={(val) => setFormData({ ...formData, selected_country: val })}>
                  <SelectTrigger className="w-[160px]"><SelectValue /></SelectTrigger>
                  <SelectContent className="max-h-60">
                    {countries.map((c) => (
                      <SelectItem key={c.name} value={c.name}>{c.flag} {c.code} ({c.name})</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Input id="phone" type="tel" value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })} placeholder="Phone number" className="flex-1" />
              </div>
            </div>
            <Button type="submit" disabled={isSubmitting} className="w-full">
              {isSubmitting ? "Generating..." : "Get API Key"}
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ApiKeySection;
