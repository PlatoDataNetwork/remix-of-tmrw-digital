import { Link } from "react-router-dom";
import { useCurrentLanguage, langPath } from "@/hooks/useLanguage";
import platoIcon from "@/assets/plato-icon.png";

const Footer = () => {
  const currentLang = useCurrentLanguage();
  const lp = (path: string) => langPath(currentLang, path);

  return (
    <footer className="py-16 bg-background border-t border-border">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid md:grid-cols-6 gap-10 mb-16">
          <div className="md:col-span-2">
            <Link to={lp("/")} className="flex items-center gap-2 mb-2">
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
              <span className="text-lg lg:text-xl font-bold tracking-tight text-foreground">
                The Tomorrow Company
              </span>
            </Link>
            <p className="text-lg text-muted-foreground mt-4">
              <a href="mailto:bf@tmrw-digital.com" className="hover:text-foreground transition-colors">bf@tmrw-digital.com</a>
            </p>
            <p className="text-lg text-muted-foreground mt-2">
              300-10991 Shellbridge Way<br />
              Richmond, BC V6X 3C6
            </p>
            <div className="mt-4 inline-flex items-center gap-2.5 px-4 py-3 rounded-xl border border-border">
              <span className="h-2.5 w-2.5 rounded-full bg-green-500 animate-pulse" />
              <span className="text-lg font-light text-foreground">AI Systems Online</span>
            </div>
            <p className="text-lg text-muted-foreground font-light mt-6 flex items-center gap-1.5">
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
            <p className="text-sm uppercase tracking-[0.2em] text-muted-foreground mb-4">Company</p>
            <div className="space-y-3">
              {[
                { label: "About", href: "/#about" },
                { label: "Mission", href: "/#vision" },
                { label: "Methodology", href: "/#services" },
                { label: "FAQ", href: "/legal#faq" },
                { label: "Contact", href: "#contact" },
              ].map((link) => (
                link.href.startsWith("/#") ? (
                  <a
                    key={link.label}
                    href={link.href}
                    className="block text-lg text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </a>
                ) : link.href.startsWith("/") ? (
                  <Link
                    key={link.label}
                    to={lp(link.href)}
                    className="block text-lg text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </Link>
                ) : (
                  <a
                    key={link.label}
                    href={link.href}
                    className="block text-lg text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </a>
                )
              ))}
            </div>
          </div>
          <div>
            <p className="text-sm uppercase tracking-[0.2em] text-muted-foreground mb-4">Network</p>
            <div className="space-y-3">
              {[
                { label: "Showcase", href: "/showcase" },
                { label: "Intelligence", href: "/intel" },
                { label: "TMRW Token", href: "#" },
                { label: "CUT Token", href: "#" },
                { label: "Security", href: "#" },
              ].map((link) => (
                link.href.startsWith("/") ? (
                  <Link
                    key={link.label}
                    to={lp(link.href)}
                    className="block text-lg text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </Link>
                ) : (
                  <a
                    key={link.label}
                    href={link.href}
                    className="block text-lg text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </a>
                )
              ))}
            </div>
          </div>
          <div>
            <p className="text-sm uppercase tracking-[0.2em] text-muted-foreground mb-4">Resources</p>
            <div className="space-y-3">
              {[
              { label: "RTO", href: "/rto" },
              { label: "Blog", href: "#" },
              { label: "Whitepaper", href: "#" },
              { label: "Documentation", href: "#" },
              { label: "FAQ", href: "/legal#faq" },
              ].map((link) => (
                link.href.startsWith("/") ? (
                  <Link
                    key={link.label}
                    to={lp(link.href)}
                    className="block text-lg text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </Link>
                ) : (
                  <a
                    key={link.label}
                    href={link.href}
                    className="block text-lg text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </a>
                )
              ))}
            </div>
          </div>
          <div>
            <p className="text-sm uppercase tracking-[0.2em] text-muted-foreground mb-4">Connect</p>
            <div className="space-y-3">
              {[
                { label: "LinkedIn", href: "#" },
                { label: "Reddit", href: "#" },
                { label: "Twitter / X", href: "#" },
                { label: "Telegram", href: "#" },
                { label: "Discord", href: "#" },
              ].map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="block text-lg text-muted-foreground hover:text-foreground transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        </div>
        <div className="border-t border-border pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-lg text-muted-foreground">
            © 2026 Tomorrow Digital Inc. All Rights Reserved.
          </p>
          <div className="flex flex-wrap gap-6">
            <Link to={lp("/legal#privacy")} className="text-lg text-muted-foreground hover:text-foreground transition-colors">Privacy Policy</Link>
            <Link to={lp("/legal#compliance")} className="text-lg text-muted-foreground hover:text-foreground transition-colors">Compliance</Link>
            <Link to={lp("/legal#terms")} className="text-lg text-muted-foreground hover:text-foreground transition-colors">Terms of Service</Link>
            <Link to={lp("/legal#faq")} className="text-lg text-muted-foreground hover:text-foreground transition-colors">FAQ</Link>
            <Link to={lp("/legal#data-processing")} className="text-lg text-muted-foreground hover:text-foreground transition-colors">Data Processing</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
