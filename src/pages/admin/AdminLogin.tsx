import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAdminAuth } from "@/contexts/AdminAuthContext";
import platoIcon from "@/assets/plato-icon.webp";

const AdminLogin = () => {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAdminAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    const success = await login(password);
    setLoading(false);
    if (success) {
      navigate("/tmrw-admin");
    } else {
      setError("Invalid password");
    }
  };

  return (
    <>
      <Helmet>
        <meta name="robots" content="noindex, nofollow" />
        <title>Admin Login</title>
      </Helmet>
      <div className="min-h-screen flex items-center justify-center bg-[hsl(220,20%,4%)]">
        <div className="w-full max-w-sm mx-auto px-6">
          <div className="flex flex-col items-center mb-8">
            <div
              className="h-12 w-12 mb-4 animated-gradient-icon-bright"
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
            <h1 className="text-xl font-semibold text-white">Admin Panel</h1>
            <p className="text-sm text-white/50 mt-1">Enter password to continue</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/40" />
              <Input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="pl-10 bg-white/5 border-white/10 text-white placeholder:text-white/30 focus-visible:ring-white/20"
                autoFocus
              />
            </div>
            {error && <p className="text-sm text-red-400">{error}</p>}
            <Button
              type="submit"
              disabled={loading || !password}
              className="w-full bg-gradient-to-r from-[hsl(260,80%,55%)] to-[hsl(220,90%,55%)] text-white border-0"
            >
              {loading ? "Verifying..." : "Sign In"}
            </Button>
          </form>
        </div>
      </div>
    </>
  );
};

export default AdminLogin;
