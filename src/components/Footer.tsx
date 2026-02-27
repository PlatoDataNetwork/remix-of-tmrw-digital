import { Link } from "react-router-dom";
import { Twitter, Linkedin, ExternalLink, Mail, Send } from "lucide-react";
import platoIcon from "@/assets/plato-icon.png";

const Footer = () => {
  return (
    <footer className="py-16 bg-background border-t border-border">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-10 mb-16">
          <div className="md:col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-2">
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
            </Link>
            <div className="flex items-center gap-4 mt-4">
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors" aria-label="Twitter">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors" aria-label="LinkedIn">
                <Linkedin size={20} />
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors" aria-label="Telegram">
                <Send size={20} />
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors" aria-label="Reddit">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="14" r="8"/><circle cx="9" cy="13" r="1.25" fill="currentColor" stroke="none"/><circle cx="15" cy="13" r="1.25" fill="currentColor" stroke="none"/><path d="M9.5 17c1 1 3.5 1 5 0"/><path d="M17.5 8.5l2-3"/><circle cx="20" cy="4.5" r="1.5"/><path d="M12 6V2"/><circle cx="12" cy="14" r="8"/></svg>
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors" aria-label="Discord">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9.09 9a3 3 0 0 1 5.83 0"/><path d="M8.5 17h7"/><path d="M9 9v3a1 1 0 0 0 1 1h4a1 1 0 0 0 1-1V9"/><path d="M20.2 7.8l-2.6 12.4a2 2 0 0 1-2 1.8H8.4a2 2 0 0 1-2-1.8L3.8 7.8"/><path d="M7 3l-1.8 4.8"/><path d="M17 3l1.8 4.8"/></svg>
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors" aria-label="Website">
                <ExternalLink size={20} />
              </a>
              <a href="mailto:bf@tmrw-digital.com" className="text-muted-foreground hover:text-foreground transition-colors" aria-label="Email">
                <Mail size={20} />
              </a>
            </div>
            <p className="text-sm text-muted-foreground font-light mt-4 leading-relaxed">
              300-10991 Shellbridge Way<br />
              Richmond, BC V6X 3C6
            </p>
            <p className="text-sm text-muted-foreground font-light mt-6 flex items-center gap-1.5">
              Made with
              <span
                className="inline-block h-5 w-5 animated-gradient-icon-bright"
                style={{
                  WebkitMaskImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='black'%3E%3Cpath d='M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z'/%3E%3C/svg%3E")`,
                  maskImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='black'%3E%3Cpath d='M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z'/%3E%3C/svg%3E")`,
                  WebkitMaskSize: 'contain',
                  maskSize: 'contain',
                  WebkitMaskRepeat: 'no-repeat',
                  maskRepeat: 'no-repeat',
                  WebkitMaskPosition: 'center',
                  maskPosition: 'center',
                }}
              />
              in Canada
            </p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-4">Navigation</p>
            <div className="space-y-3">
              {[
                { label: "About", href: "/#about" },
                { label: "Services", href: "/#services" },
                { label: "RWAs", href: "/rwas" },
                { label: "News", href: "/#news" },
              ].map((link) => (
                link.href.startsWith("/#") ? (
                  <a
                    key={link.label}
                    href={link.href}
                    className="block text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </a>
                ) : (
                  <Link
                    key={link.label}
                    to={link.href}
                    className="block text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </Link>
                )
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
            © 2026 Tomorrow Digital Inc. All Rights Reserved.
          </p>
          <div className="flex gap-6">
            <Link to="/legal#privacy" className="text-xs text-muted-foreground hover:text-foreground transition-colors">Privacy Policy</Link>
            <Link to="/legal#terms" className="text-xs text-muted-foreground hover:text-foreground transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
