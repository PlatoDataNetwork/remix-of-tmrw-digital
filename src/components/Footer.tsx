import platoIcon from "@/assets/plato-icon.png";

const Footer = () => {
  return (
    <footer className="py-16 bg-background border-t border-border">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-10 mb-16">
          <div className="md:col-span-2">
            <a href="/" className="flex items-center gap-2 mb-2">
              <div
                className="h-8 w-8 animated-gradient-icon-bright"
                style={{
                  WebkitMaskImage: `url(${platoIcon})`,
                  maskImage: `url(${platoIcon})`,
                  WebkitMaskSize: 'contain',
                  maskSize: 'contain',
                  WebkitMaskRepeat: 'no-repeat',
                  maskRepeat: 'no-repeat',
                  WebkitMaskPosition: 'center',
                  maskPosition: 'center',
                  opacity: 1,
                }}
              />
              <span className="text-lg font-bold tracking-tight text-foreground">
                The Tomorrow Company
              </span>
            </a>
            <p className="text-sm text-muted-foreground font-light leading-relaxed max-w-sm">
              Web3 AI and real world assets intelligence for public and pre-IPO management teams.
            </p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-4">Navigation</p>
            <div className="space-y-3">
              {["About", "Services", "RWAs", "News"].map((link) => (
                <a
                  key={link}
                  href={link === "RWAs" ? "/rwas" : `#${link.toLowerCase()}`}
                  className="block text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  {link}
                </a>
              ))}
            </div>
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-4">Connect</p>
            <div className="space-y-3">
              {[
                { label: "Contact", href: "#contact" },
                { label: "LinkedIn", href: "#" },
                { label: "Twitter / X", href: "#" },
                { label: "Telegram", href: "#" },
                { label: "Discord", href: "#" },
                { label: "Email", href: "#" },
              ].map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="block text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        </div>
        <div className="border-t border-border pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} The Tomorrow Company. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-xs text-muted-foreground hover:text-foreground transition-colors">Privacy Policy</a>
            <a href="#" className="text-xs text-muted-foreground hover:text-foreground transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;