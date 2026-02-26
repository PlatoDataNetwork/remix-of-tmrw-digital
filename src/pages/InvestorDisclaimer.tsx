import { useState, useRef, useCallback, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import Navbar from "@/components/Navbar";

const disclaimerText = `IMPORTANT LEGAL DISCLAIMER — PLEASE READ CAREFULLY

This presentation and the information contained herein (collectively, the "Presentation") is provided by Tomorrow Digital Inc. (DBA: The Tomorrow Company) and its affiliates (collectively, the "Company") for informational purposes only. By accessing this Presentation, you acknowledge and agree to the following terms and conditions.

FORWARD-LOOKING STATEMENTS
This Presentation contains forward-looking statements within the meaning of applicable securities legislation. Forward-looking statements are based on the opinions and estimates of management at the date the statements are made, and are subject to a variety of risks and uncertainties and other factors that could cause actual events or results to differ materially from those anticipated in the forward-looking statements. These forward-looking statements include, but are not limited to, statements regarding the Company's proposed reverse takeover (RTO) transaction, anticipated TSX Venture Exchange listing, projected market sizes, anticipated token values, revenue projections, business strategies, and future plans.

NO OFFER OF SECURITIES
This Presentation does not constitute an offer to sell or a solicitation of an offer to buy any securities. Any offering of securities will be made only by means of a formal offering memorandum or prospectus and only to qualified investors in jurisdictions where such offer or sale is permitted. The securities described herein have not been, and will not be, registered under the United States Securities Act of 1933, as amended (the "Securities Act"), or any state securities laws, and may not be offered or sold in the United States or to, or for the account or benefit of, U.S. persons except pursuant to an exemption from, or in a transaction not subject to, the registration requirements of the Securities Act.

ACCREDITED INVESTOR STATUS
By proceeding, you represent and warrant that you are an "accredited investor" as defined under applicable securities laws, or that you are accessing this material in a jurisdiction and capacity that permits such access under applicable law. If you do not meet these criteria, you must exit this page immediately.

RISK FACTORS
Investment in early-stage companies involves a high degree of risk, including the possible loss of your entire investment. The Company's business plan is subject to numerous risks including, but not limited to:
• Market and competitive risks in the Web3, AI, and carbon credit sectors
• Regulatory and compliance risks across multiple jurisdictions
• Technology risks including cybersecurity threats and platform failures
• Liquidity risks associated with digital assets and tokens
• Risks associated with reverse takeover transactions and public market listings
• Risks related to carbon credit valuations and market volatility
• Risks associated with cryptocurrency and blockchain technology adoption
• Management and operational risks inherent in early-stage ventures
• Risks of dilution through future financing activities

CONFIDENTIALITY
The information contained in this Presentation is confidential and proprietary. By accessing this Presentation, you agree not to reproduce, redistribute, or disclose any information contained herein to any third party without the prior written consent of the Company. This Presentation is intended solely for the personal use of the intended recipient.

NO RELIANCE
While the Company has taken reasonable care to ensure that the information contained in this Presentation is accurate and complete, no representation or warranty, express or implied, is made as to the accuracy, completeness, or reliability of the information. The Company, its directors, officers, employees, agents, and advisors expressly disclaim any and all liability for any representations, expressed or implied, contained in, or for omissions from, the Presentation or any other written or oral communications transmitted to any party in the course of its evaluation of the matters described herein.

INDEPENDENT ADVICE
Prospective investors should conduct their own independent investigation and assessment of the Company and the information contained in this Presentation. Nothing in this Presentation constitutes financial, legal, tax, or investment advice. You should consult with your own financial, legal, and tax advisors before making any investment decision.

JURISDICTIONAL RESTRICTIONS
This Presentation may not be distributed in any jurisdiction where such distribution would be contrary to law. Persons in possession of this Presentation should inform themselves about and observe any such restrictions.

GOVERNING LAW
This disclaimer and any disputes arising from the use of this Presentation shall be governed by and construed in accordance with the laws of Canada and the Province of Ontario, without regard to conflict of law principles.

By entering your email address and initials below, you acknowledge that you have read, understood, and agree to be bound by the terms and conditions set forth in this disclaimer, and that you meet the qualifications required to access this investment material.`;

const InvestorDisclaimer = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [initials, setInitials] = useState("");
  const [hasScrolledToBottom, setHasScrolledToBottom] = useState(false);
  const [error, setError] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  const handleScroll = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    const atBottom = el.scrollHeight - el.scrollTop - el.clientHeight < 30;
    if (atBottom) setHasScrolledToBottom(true);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!hasScrolledToBottom) {
      setError("Please read the entire disclaimer by scrolling to the bottom.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      setError("Please enter a valid email address.");
      return;
    }

    if (initials.trim().length < 2 || initials.trim().length > 5) {
      setError("Please enter your initials (2-5 characters).");
      return;
    }

    sessionStorage.setItem("investor_access", JSON.stringify({
      email: email.trim(),
      initials: initials.trim().toUpperCase(),
      timestamp: Date.now(),
    }));

    navigate("/investors/presentation");
  };

  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove("dark", "colorful");
    root.classList.add("colorful");
    return () => {
      // Restore default on unmount
      root.classList.remove("dark", "colorful");
      root.classList.add("colorful");
    };
  }, []);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />

      {/* Content */}
      <div className="flex-1 flex items-center justify-center px-4 py-8 pt-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-3xl"
        >
          <div className="text-center mb-8">
            <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
              Investor Disclaimer
            </h1>
            <p className="text-sm text-muted-foreground">
              Please read the following disclaimer in its entirety before proceeding.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Scrollable disclaimer */}
            <div className="relative">
              <div
                ref={scrollRef}
                onScroll={handleScroll}
                className="h-[400px] md:h-[450px] overflow-y-auto rounded-xl border border-border bg-card p-6 md:p-8 text-sm text-muted-foreground leading-relaxed whitespace-pre-wrap font-light"
              >
                {disclaimerText}
              </div>

              {/* Scroll indicator */}
              {!hasScrolledToBottom && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-card to-transparent rounded-b-xl pointer-events-none flex items-end justify-center pb-2"
                >
                  <motion.div
                    animate={{ y: [0, 6, 0] }}
                    transition={{ repeat: Infinity, duration: 1.5 }}
                    className="flex flex-col items-center gap-1 text-muted-foreground"
                  >
                    <span className="text-xs">Scroll to continue</span>
                    <ChevronDown className="h-4 w-4" />
                  </motion.div>
                </motion.div>
              )}
            </div>

            {/* Status badge */}
            <div className="flex justify-center">
              <span
                className={`inline-flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full border ${
                  hasScrolledToBottom
                    ? "border-green-500/30 text-green-400 bg-green-500/10"
                    : "border-border text-muted-foreground bg-secondary"
                }`}
              >
                <span className={`h-1.5 w-1.5 rounded-full ${hasScrolledToBottom ? "bg-green-400" : "bg-muted-foreground"}`} />
                {hasScrolledToBottom ? "Disclaimer reviewed" : "Please scroll to the bottom"}
              </span>
            </div>

            {/* Form inputs */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Email Address</label>
                <Input
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={!hasScrolledToBottom}
                  className="bg-card disabled:opacity-40"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Initials</label>
                <Input
                  type="text"
                  placeholder="e.g. JD"
                  value={initials}
                  onChange={(e) => setInitials(e.target.value.toUpperCase().slice(0, 5))}
                  required
                  disabled={!hasScrolledToBottom}
                  maxLength={5}
                  className="bg-card disabled:opacity-40 uppercase"
                />
              </div>
            </div>

            {error && (
              <p className="text-sm text-destructive text-center">{error}</p>
            )}

            <Button
              type="submit"
              disabled={!hasScrolledToBottom}
              className="w-full h-12 rounded-full bg-foreground text-background hover:opacity-90 disabled:opacity-30 text-sm font-medium"
            >
              I Agree — Access Investor Presentation
            </Button>

            <p className="text-xs text-muted-foreground text-center">
              By clicking above, you confirm you have read and agree to the disclaimer terms.
            </p>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default InvestorDisclaimer;
