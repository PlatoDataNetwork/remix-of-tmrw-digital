const Footer = () => {
  return (
    <footer className="py-16 bg-background border-t border-border">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-10 mb-16">
          <div className="md:col-span-2">
            <p className="text-lg font-semibold text-foreground mb-2">
              RCA <span className="font-light">Financial Partners</span>
            </p>
            <p className="text-sm text-muted-foreground font-light leading-relaxed max-w-sm">
              Capital markets and investor relations advisory for public and pre-IPO management teams.
            </p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-4">Navigation</p>
            <div className="space-y-3">
              {["About", "Services", "RWAs", "News", "Contact"].map((link) => (
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
              {["LinkedIn", "Twitter / X", "Email"].map((link) => (
                <a
                  key={link}
                  href="#"
                  className="block text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  {link}
                </a>
              ))}
            </div>
          </div>
        </div>
        <div className="border-t border-border pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} RCA Financial Partners. All rights reserved.
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
