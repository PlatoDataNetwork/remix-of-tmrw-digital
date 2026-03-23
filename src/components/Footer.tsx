import { Link } from "react-router-dom";
import { useCurrentLanguage, langPath } from "@/hooks/useLanguage";
import platoIcon from "@/assets/plato-icon.webp";

const Footer = () => {
  const currentLang = useCurrentLanguage();
  const lp = (path: string) => langPath(currentLang, path);

  return (
    <footer className="py-12 sm:py-16 bg-background border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-6 gap-8 lg:gap-10 mb-12 sm:mb-16">
          <div className="col-span-2">
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
              <span className="text-base sm:text-lg lg:text-xl font-bold tracking-tight text-foreground">
                The Tomorrow Company
              </span>
            </Link>
            <p className="text-sm sm:text-base text-muted-foreground mt-4">
              <a href="mailto:bf@tmrw-digital.com" className="hover:text-foreground transition-colors">bf@tmrw-digital.com</a>
            </p>
            <p className="text-sm sm:text-base text-muted-foreground mt-2">
              300-10991 Shellbridge Way<br />
              Richmond, BC V6X 3C6
            </p>
            <div className="mt-4 inline-flex items-center gap-2.5 px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl border border-border">
              <span className="h-2.5 w-2.5 rounded-full bg-green-500 animate-pulse" />
              <span className="text-sm sm:text-base font-light text-foreground">AI Systems Online</span>
            </div>
            <p className="text-sm sm:text-base text-muted-foreground font-light mt-6 flex items-center gap-1.5">
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
            <p className="text-xs sm:text-sm uppercase tracking-[0.2em] text-muted-foreground mb-3 sm:mb-4">Company</p>
            <div className="space-y-2.5 sm:space-y-3">
              {[
                { label: "About", href: "/#about" },
                { label: "Methodology", href: "/#vision" },
                { label: "Web3AI", href: "/#web3ai" },
                { label: "RWAs", href: "/#rwa" },
                { label: "Intelligence", href: "/intel" },
                { label: "RTO", href: "/rto" },
                { label: "Team", href: "/#team" },
              ].map((link) => (
                link.href.startsWith("/#") ? (
                  <a
                    key={link.label}
                    href={link.href}
                    className="block text-sm sm:text-base text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </a>
                ) : link.href.startsWith("/") ? (
                  <Link
                    key={link.label}
                    to={lp(link.href)}
                    className="block text-sm sm:text-base text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </Link>
                ) : (
                  <a
                    key={link.label}
                    href={link.href}
                    {...(link.href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    className="block text-sm sm:text-base text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </a>
                )
              ))}
            </div>
          </div>
          <div>
            <p className="text-xs sm:text-sm uppercase tracking-[0.2em] text-muted-foreground mb-3 sm:mb-4">Network</p>
            <div className="space-y-2.5 sm:space-y-3">
              {[
                { label: "Showcase", href: "/showcase" },
                { label: "CUT Token", href: "/cut-token" },
                { label: "RWA Channel", href: "/rwa-channel" },
                { label: "CyberSecurity", href: "/security" },
                { label: "Intelligence", href: "/intel" },
                { label: "W3AI Token", href: "/whitepaper" },
                { label: "Data Feeds", href: "/data-feeds" },
              ].map((link) => (
                link.href.startsWith("/") ? (
                  <Link
                    key={link.label}
                    to={lp(link.href)}
                    className="block text-sm sm:text-base text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </Link>
                ) : (
                  <a
                    key={link.label}
                    href={link.href}
                    {...(link.href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    className="block text-sm sm:text-base text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </a>
                )
              ))}
            </div>
          </div>
          <div>
            <p className="text-xs sm:text-sm uppercase tracking-[0.2em] text-muted-foreground mb-3 sm:mb-4">Resources</p>
            <div className="space-y-2.5 sm:space-y-3">
              {[
              { label: "TMRW Deck", href: "/corporate-deck" },
              { label: "W3AI Deck", href: "/deck" },
              { label: "RTO Deck", href: "/rto-deck" },
              { label: "Path to $1B", href: "/path-to-1b" },
              { label: "Whitepaper", href: "/whitepaper" },
              { label: "Orbital Beam", href: "https://orbitalbeam.com/" },
              { label: "RWA Summit", href: "https://www.rwasummit.io/" },
              ].map((link) => (
                link.href.startsWith("/") ? (
                  <Link
                    key={link.label}
                    to={lp(link.href)}
                    className="block text-sm sm:text-base text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </Link>
                ) : (
                  <a
                    key={link.label}
                    href={link.href}
                    {...(link.href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    className="block text-sm sm:text-base text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </a>
                )
              ))}
            </div>
          </div>
          <div>
            <p className="text-xs sm:text-sm uppercase tracking-[0.2em] text-muted-foreground mb-3 sm:mb-4">Community</p>
            <div className="space-y-2.5 sm:space-y-3">
              {[
                { label: "LinkedIn", href: "#" },
                { label: "Twitter / X", href: "#" },
                { label: "Telegram", href: "#" },
                { label: "Reddit", href: "#" },
                { label: "Discord", href: "#" },
                { label: "0xLabs", href: "https://www.0xlabs.tech/" },
                { label: "Web3", href: "https://web3.foundation/" },
              ].map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  {...(link.href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  className="block text-sm sm:text-base text-muted-foreground hover:text-foreground transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        </div>
        <div className="border-t border-border pt-6 sm:pt-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <p className="text-sm sm:text-base text-muted-foreground">
            © 2026 Tomorrow Digital Inc. All Rights Reserved.
          </p>
          <div className="flex flex-wrap gap-x-4 sm:gap-x-6 gap-y-2">
            <Link to={lp("/legal#privacy")} className="text-sm sm:text-base text-muted-foreground hover:text-foreground transition-colors">Privacy Policy</Link>
            <Link to={lp("/legal#compliance")} className="text-sm sm:text-base text-muted-foreground hover:text-foreground transition-colors">Compliance</Link>
            <Link to={lp("/legal#terms")} className="text-sm sm:text-base text-muted-foreground hover:text-foreground transition-colors">Terms of Service</Link>
            <Link to={lp("/legal#data-processing")} className="text-sm sm:text-base text-muted-foreground hover:text-foreground transition-colors">Data Processing</Link>
            <Link to={lp("/legal#faq")} className="text-sm sm:text-base text-muted-foreground hover:text-foreground transition-colors">FAQ</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
