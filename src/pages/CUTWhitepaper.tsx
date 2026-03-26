/* CUT Whitepaper — Gitbook-style layout matching W3AI Whitepaper template */
import React, { useState, useEffect, useRef, useMemo, useCallback } from "react";
import { motion } from "framer-motion";
import { ArrowUp, ChevronRight, ChevronLeft, ChevronDown, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import heroBg from "@/assets/hero-bg.webp";
import platoIcon from "@/assets/plato-icon.webp";
import { useChatContext } from "@/components/ChatContext";

// --- Section structure ---
interface SubSection { id: string; title: string; }
interface Section { id: string; title: string; number?: string; icon?: "home"; children?: SubSection[]; }

const sections: Section[] = [
  { id: "directory", title: "Directory", icon: "home" },
  { id: "abstract", title: "Abstract", number: "01" },
  { id: "vision-mission", title: "Vision + Mission", number: "02" },
  { id: "strategy", title: "Strategy", number: "03", children: [
    { id: "strategy-real-utility", title: "Real Utility for Climate Change" },
    { id: "strategy-ease-of-access", title: "Ease of Access and Use" },
    { id: "strategy-transparency", title: "Transparency + Auditability" },
  ]},
  { id: "the-token", title: "The Token", number: "04", children: [
    { id: "token-offsets", title: "Carbon Utility Token for Offsets" },
    { id: "token-applications", title: "Applications for CUT" },
    { id: "token-minting", title: "Minting + Retirement" },
  ]},
  { id: "supply-release", title: "Launch Supply + Release", number: "05" },
  { id: "sustainability", title: "Commitment to Sustainability", number: "06" },
  { id: "carbon-terminology", title: "Carbon Terminology", number: "07" },
  { id: "disclaimer", title: "Disclaimer", number: "08" },
];

const topLevelIds = sections.map(s => s.id);
const chapterSections = sections.filter(s => s.number);

function getParentId(id: string): string {
  for (const s of sections) {
    if (s.id === id) return s.id;
    if (s.children?.some(c => c.id === id)) return s.id;
  }
  return sections[0].id;
}

// --- Sidebar Ask Marvin ---
function SidebarAskMarvin() {
  const { setOpen } = useChatContext();
  return (
    <div className="px-3 py-2 border-b border-border">
      <button
        onClick={() => setOpen(true)}
        className="w-full flex items-center gap-2 bg-gradient-to-r from-[hsl(142,70%,45%,0.1)] to-[hsl(142,70%,35%,0.1)] hover:from-[hsl(142,70%,45%,0.2)] hover:to-[hsl(142,70%,35%,0.2)] border border-[hsl(142,70%,45%,0.3)] rounded-md px-3 py-1.5 text-xs font-medium text-[hsl(142,70%,45%)] hover:text-[hsl(142,70%,55%)] transition-all group"
      >
        <div
          className="h-4 w-4 shrink-0 bg-[hsl(142,70%,45%)]"
          style={{
            WebkitMaskImage: `url(${platoIcon})`,
            maskImage: `url(${platoIcon})`,
            WebkitMaskSize: "contain", maskSize: "contain",
            WebkitMaskRepeat: "no-repeat", maskRepeat: "no-repeat",
            WebkitMaskPosition: "center", maskPosition: "center",
          }}
        />
        <span>Ask Marvin</span>
        <ChevronRight className="h-3 w-3 ml-auto opacity-50 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" />
      </button>
    </div>
  );
}

// --- Sidebar Nav ---
function SidebarNav({ activeId, onNavigate }: { activeId: string; onNavigate: (id: string) => void }) {
  const activePage = getParentId(activeId);
  const [openSections, setOpenSections] = useState<Set<string>>(new Set([activePage]));
  const activeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    setOpenSections(prev => { const next = new Set(prev); next.add(activePage); return next; });
  }, [activePage]);

  useEffect(() => {
    activeRef.current?.scrollIntoView({ block: "nearest", behavior: "smooth" });
  }, [activeId]);

  const toggleAccordion = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setOpenSections(prev => { const next = new Set(prev); if (next.has(id)) next.delete(id); else next.add(id); return next; });
  };

  return (
    <nav className="p-3 space-y-0.5 flex-1 overflow-y-auto">
      {sections.map(s => {
        const isActive = activePage === s.id;
        const isOpen = openSections.has(s.id);
        const hasChildren = !!(s.children && s.children.length > 0);
        return (
          <div key={s.id}>
            <button
              ref={isActive && !hasChildren ? activeRef : undefined}
              onClick={() => onNavigate(s.id)}
              className={cn(
                "w-full flex items-center gap-2.5 px-3 py-2 rounded-md text-sm transition-all duration-200",
                isActive ? "bg-sidebar-accent text-sidebar-accent-foreground font-medium border-l-2 border-[hsl(142,70%,45%)]" : "text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground"
              )}
            >
              {s.icon === "home" && <img src="/favicon.png" alt="logo" className="w-4 h-4 shrink-0 object-contain" />}
              {s.number && <span className={cn("text-[10px] font-bold w-5 shrink-0 transition-colors", isActive ? "text-[hsl(142,70%,55%)]" : "text-[hsl(142,70%,45%)]")}>{s.number}</span>}
              {!s.icon && !s.number && <span className="w-5 shrink-0" />}
              <span className="text-left truncate flex-1">{s.title}</span>
              {hasChildren && (
                <span onClick={(e) => toggleAccordion(s.id, e)} className="p-0.5 rounded hover:bg-muted/50">
                  <ChevronDown className={cn("h-3 w-3 shrink-0 transition-transform duration-200", isOpen && "rotate-180")} />
                </span>
              )}
            </button>
            {hasChildren && isOpen && (
              <div className="ml-7 pl-3 space-y-0.5 mt-0.5 mb-1">
                {s.children!.map(child => {
                  const isChildActive = activeId === child.id;
                  return (
                    <button
                      key={child.id}
                      ref={isChildActive ? activeRef : undefined}
                      onClick={() => onNavigate(child.id)}
                      className={cn(
                        "w-full text-left px-2 py-1.5 rounded text-sm transition-colors",
                        isChildActive ? "text-[hsl(142,70%,45%)] font-medium bg-sidebar-accent/50" : "text-sidebar-foreground/50 hover:text-sidebar-foreground/80"
                      )}
                    >
                      {child.title}
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        );
      })}
    </nav>
  );
}

// --- Desktop Sidebar ---
function DesktopSidebar({ activeId, onNavigate, collapsed, onToggle }: { activeId: string; onNavigate: (id: string) => void; collapsed: boolean; onToggle: () => void }) {
  return (
    <aside className={cn(
      "flex flex-col sticky top-[80px] h-[calc(100vh-80px)] border-r border-border bg-sidebar-background overflow-y-auto shrink-0 z-10 transition-all duration-300",
      collapsed ? "w-0 overflow-hidden border-r-0" : "w-64"
    )}>
      <div className="flex items-center justify-between px-4 py-3 border-b border-border shrink-0">
        <span className="text-sm font-semibold text-foreground whitespace-nowrap">CUT Whitepaper</span>
        <button onClick={onToggle} className="p-1 text-muted-foreground hover:text-foreground transition-colors" aria-label="Collapse sidebar">
          <Menu className="h-4 w-4" />
        </button>
      </div>
      <SidebarAskMarvin />
      <SidebarNav activeId={activeId} onNavigate={onNavigate} />
    </aside>
  );
}

// --- Prev / Next Navigation ---
function PrevNextNav({ activePage, onNavigate }: { activePage: string; onNavigate: (id: string) => void }) {
  const idx = topLevelIds.indexOf(activePage);
  const prev = idx > 0 ? sections[idx - 1] : null;
  const next = idx < sections.length - 1 ? sections[idx + 1] : null;
  return (
    <div className="flex items-stretch gap-4 mt-16 mb-8 border-t border-border pt-8">
      {prev ? (
        <button onClick={() => onNavigate(prev.id)} className="flex-1 flex items-center gap-3 px-5 py-4 rounded-lg border border-border bg-card hover:bg-accent hover:border-primary/30 hover:shadow-[0_0_15px_-3px_hsl(142,70%,45%,0.15)] transition-all duration-200 text-left group">
          <ChevronLeft className="h-4 w-4 text-muted-foreground group-hover:text-foreground group-hover:-translate-x-0.5 transition-all shrink-0" />
          <div className="flex flex-col min-w-0">
            <span className="text-[10px] uppercase tracking-wider text-muted-foreground/60 mb-0.5">Previous</span>
            <span className="text-sm text-foreground truncate group-hover:text-primary transition-colors">{prev.number ? `${prev.number}. ` : ""}{prev.title}</span>
          </div>
        </button>
      ) : <div className="flex-1" />}
      {next ? (
        <button onClick={() => onNavigate(next.id)} className="flex-1 flex items-center justify-end gap-3 px-5 py-4 rounded-lg border border-border bg-card hover:bg-accent hover:border-primary/30 hover:shadow-[0_0_15px_-3px_hsl(142,70%,45%,0.15)] transition-all duration-200 text-right group">
          <div className="flex flex-col min-w-0 items-end">
            <span className="text-[10px] uppercase tracking-wider text-muted-foreground/60 mb-0.5">Next</span>
            <span className="text-sm text-foreground truncate group-hover:text-primary transition-colors">{next.number ? `${next.number}. ` : ""}{next.title}</span>
          </div>
          <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-foreground group-hover:translate-x-0.5 transition-all shrink-0" />
        </button>
      ) : <div className="flex-1" />}
    </div>
  );
}

// --- Reading Progress Bar ---
function ReadingProgress() {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(docHeight > 0 ? Math.min((scrollTop / docHeight) * 100, 100) : 0);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return (
    <div className="fixed top-[64px] lg:top-[80px] left-0 right-0 z-50 h-0.5 bg-transparent">
      <div className="h-full bg-gradient-to-r from-[hsl(142,70%,45%)] to-[hsl(160,80%,45%)] transition-[width] duration-150 ease-out" style={{ width: `${progress}%` }} />
    </div>
  );
}

// --- Content ---
function CUTWhitepaperContent({ activePage, onNavigate }: { activePage: string; onNavigate: (id: string) => void }) {
  const p = (id: string) => activePage !== id ? "cut-wp-page-hidden" : "space-y-10";

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 cut-whitepaper-content">

      {/* === Directory === */}
      <div className={p("directory")}>
        <section id="directory">
          <div className="relative rounded-2xl overflow-hidden h-[300px] md:h-[420px] bg-[hsl(220,20%,4%)]">
            <img src={heroBg} alt="" className="absolute inset-0 w-full h-full object-contain object-center scale-110" />
            <div className="absolute inset-0 pointer-events-none animated-gradient-hero-overlay" />
            <div className="absolute inset-0 bg-[hsl(220,20%,4%,0.25)]" />
            <div className="absolute inset-0 bg-gradient-to-b from-[hsl(220,20%,4%,0.3)] via-transparent to-[hsl(220,20%,4%)]" />
            <div className="relative z-10 flex flex-col items-center justify-start h-full pt-24 md:pt-32 text-center px-6">
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-extralight leading-[1.1] tracking-tight text-white mb-2">
                Carbon Utility Token<br />For Climate Impact.
              </h2>
              <p className="text-xs md:text-sm uppercase tracking-[0.4em] text-white/50 mb-2">
                Carbon Offsets · Blockchain · Sustainability
              </p>
              <p className="text-lg md:text-xl lg:text-2xl uppercase tracking-[0.25em] text-white/70 mt-1">
                WHITEPAPER
              </p>
            </div>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-foreground mt-10 mb-2">CUT Whitepaper</h1>
          <p className="text-muted-foreground mb-8">An immutable ledger for tracking and retiring certified Carbon Offsets — Version 2.0</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-12">
            {chapterSections.map(s => (
              <button
                key={s.id}
                onClick={() => onNavigate(s.id)}
                className="flex items-center gap-3 px-4 py-3 rounded-lg border border-border bg-card hover:bg-accent hover:border-primary/30 hover:shadow-[0_0_15px_-3px_hsl(142,70%,45%,0.15)] active:scale-[0.98] transition-all duration-200 text-left group"
              >
                <span className="text-xs font-bold text-[hsl(142,70%,45%)] w-6 shrink-0 group-hover:scale-110 transition-transform duration-200">{s.number}</span>
                <span className="text-sm text-foreground flex-1 group-hover:text-primary transition-colors duration-200">{s.title}</span>
                <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-foreground group-hover:translate-x-0.5 transition-all duration-200 shrink-0" />
              </button>
            ))}
          </div>
        </section>
      </div>

      {/* === 01: Abstract === */}
      <div className={p("abstract")}>
        <section id="abstract">
          <h2 className="text-2xl font-bold text-foreground mb-4">Abstract</h2>
          <div className="prose-section">
            <p>The Carbon Utility Token (CUT) leverages the trust and immutability of Blockchain Technology to offer a public ledger for certified Carbon Offsets.</p>
            <p>The pool of Carbon Offsets used in the CUT project, created through the reduction of harmful greenhouse gas emissions entering the atmosphere, are available to be transferred peer-to-peer and can be used to retire the full or partial Carbon Footprint of any given activity in AI, Web3, ReFi (Regenerative Finance), TradFi (Traditional Finance), ESG (Environment, Social, Governance) and legacy goods and services in the real world.</p>
          </div>
        </section>
        <PrevNextNav activePage={activePage} onNavigate={onNavigate} />
      </div>

      {/* === 02: Vision + Mission === */}
      <div className={p("vision-mission")}>
        <section id="vision-mission">
          <h2 className="text-2xl font-bold text-foreground mb-4">Vision + Mission</h2>
          <div className="prose-section">
            <p>Support more clean energy and greenhouse gas reducing projects with a commitment to ongoing positive environmental impact.</p>
            <p>The vision of our project is to offer technological tools and best practices that provide trust and transparency, bringing this greenhouse gas reducing opportunity to as many individuals, businesses, products, and services as possible.</p>
            <p>By creating a transparent blockchain powered technology for producers and consumers of Carbon Offsets, CUT incentivizes growth in these activities which we believe can help to create meaningful and long lasting positive environmental impact.</p>
            <p>What we want to achieve is measurable climate impact, offering participation in positive action for as many people as possible for a cleaner future that benefits the planet.</p>
            <p><strong>Increased opportunities for meaningful environmental impact</strong> for both large companies and individuals.</p>
            <p>We offer CUT in fractional amounts small enough to allow any user to make a certain activity, business, service, or product either fully or partially Carbon Neutral. At the same time we combine this carbon footprint reducing technology with positive green energy projects that reduce emissions and reliance on fossil fuels.</p>
            <p>By opening this doorway to widespread environmental impact through carbon footprint reduction, we enable individuals and corporations to action tangible climate benefits, and make daily decisions that can effectuate meaningful changes for the environment.</p>
          </div>
        </section>
        <section>
          <h3 className="text-xl font-semibold text-foreground mb-3">Opportunity for the Development Community</h3>
          <div className="prose-section">
            <p>CUT is able to create integrations and additional use cases through the engagement of developers worldwide and engage other technologies, platforms, organizations and data projects where a Carbon Offset or carbon neutrality can offer value. The more partnerships and integrations we build and observe, the more we can increase tangible action against climate change.</p>
          </div>
        </section>
        <PrevNextNav activePage={activePage} onNavigate={onNavigate} />
      </div>

      {/* === 03: Strategy === */}
      <div className={p("strategy")}>
        <section id="strategy">
          <h2 className="text-2xl font-bold text-foreground mb-4">Strategy</h2>
        </section>

        <section id="strategy-real-utility">
          <h3 className="text-xl font-semibold text-foreground mb-3">Real Utility for Climate Change</h3>
          <div className="prose-section">
            <p>We create access to the utility of retiring Carbon Offsets through the Carbon Utility Token (CUT). The Offset's represented by CUT are verified by recognized international protocols such as: ISO, CDM, ETS, VCR, verified from accredited third party organizations.</p>
            <p>Project examples include, but are not limited to, greenhouse gas capture and destruction, biomass, wind, solar, and small hydro power generation.</p>
            <p><strong>What is the utility of the token?</strong></p>
            <p>Our Smart Contract acts as an ideal ledger for storing, distributing, tracking and retiring Carbon Offsets. It is in this unique contract function of retiring where we see the utility of CUT and close the cycle of impact.</p>
            <p>To offer real visibility into Carbon Offset retirement, rather than just burning away any records of the tokens being retired, we offer tracking of both the living supply as well as the total historical supply of CUT created. Even after CUT have been retired, a record of the retirement and its associated offset data remain on the blockchain as an immutable record.</p>
          </div>
        </section>

        <section id="strategy-ease-of-access">
          <h3 className="text-xl font-semibold text-foreground mb-3">Ease of Access and Use</h3>
          <div className="prose-section">
            <p>For the person who wants to offset the Carbon Footprint of individual activities, to the business that wants to make Carbon Neutral certain processes or products, this token allows for units of any size. In a Carbon market that has traditionally been operated as a brokerage model in many tonnes per transaction, CUT offers access to CO2E retirement previously unavailable directly to consumers in increments that are fractionalized.</p>
            <p>The Carbon Utility Token uses blockchain technology to fractionalize a quantity of tonnes into small amounts of grams to be distributed on-demand to offset a much wider range of products and activities from the very small to the very large.</p>
          </div>
        </section>

        <section id="strategy-transparency">
          <h3 className="text-xl font-semibold text-foreground mb-3">Transparency + Auditability</h3>
          <div className="prose-section">
            <p>The fact that CUT partners with emission reducing projects in supporting their growth and operations allows the ledger to offer a full audit trail from their creation to their place of retirement on the blockchain. This immutable audit trail on the blockchain can inform the token users of: the type of project that created their offset, the location of the project, the certification protocol followed in creating this offset, and the third party certifier that was used.</p>
            <p>This level of transparency allows users to have the flexibility to choose the desired amount of carbon they wish to offset for a given service, activity or product, at scale, or for something as small as an individual cup of coffee.</p>
            <p>CUT does not include projects or offsets that are sourced from <strong>REDD+ credits</strong>. These types of projects historically have been associated with the exploitation of land owners, illegal logging, the displacement of indigenous peoples, and the offsets that were sold were often fraudulent and offered no tangible verifiable benefit to the environment in regards to carbon capture.</p>
          </div>
        </section>
        <PrevNextNav activePage={activePage} onNavigate={onNavigate} />
      </div>

      {/* === 04: The Token === */}
      <div className={p("the-token")}>
        <section id="the-token">
          <h2 className="text-2xl font-bold text-foreground mb-4">The Token (Carbon Utility Token - CUT)</h2>
        </section>

        <section id="token-offsets">
          <h3 className="text-xl font-semibold text-foreground mb-3">Carbon Utility Token for Offsets</h3>
          <div className="prose-section">
            <p>Launched on the <strong>Ethereum Blockchain</strong> (rCUT, Retire Carbon Utility Token) and the <strong>Arbitrum Layer 2 Network</strong> (aCUT, Arbitrum Carbon Utility Token), CUT is a dApp with an ERC-20 compatible interface. Building on a foundation created by OpenZeppelin, CUT combines standard, tested code which has been reviewed by the broader Ethereum community, in addition to our own Smart Contract architecture enabling the verification and tracking of the Carbon workflow.</p>
            <p><strong>Utility, Defined:</strong> Upon minting Carbon Utility Tokens, the CUT Contract internally creates a tracked OFFSET which aggregates in the project pool recording the real world offsets. Every CUT minted is directly linked to one of these projects and has an explicit legal and certified paper trail associating the offsets generated with the fractionalized tonnage within the CUT dApp. Upon using your CUT to retire an OFFSET, your token is paired with the exact offset project you are retiring Carbon from for immutable record keeping.</p>
          </div>
        </section>

        <section id="token-applications">
          <h3 className="text-xl font-semibold text-foreground mb-3">Applications for CUT</h3>
          <div className="prose-section">
            <p>CUT was developed to interact with any Ethereum wallet or application that is compatible with ERC-20 tokens for the basic functionality of the token. Running on Public Ethereum makes this token simple to onboard, and basic to send and store. Running on Arbitrum can offer help in transaction factors like cost or speed.</p>
            <p>There is a dApp frontend to manually retire CUT, that allows flexibility regarding the timing of holding and retiring chosen volumes of Carbon Offsets.</p>
            <p>Once CUT has been retired, users can create a certificate connecting their action to the actual CO2E project the CUT corresponds to. This information includes the type of activity that created the offset being retired, the location of the project, the type of certification used to verify the impact, and other information relating to the project and certification process.</p>
            <p>This same data can be used to do things like create QR codes linking to an explorer of retirement activity, or printing keepsakes of impact like certificates with a link to the web3 record of the project details.</p>
          </div>
        </section>

        <section id="token-minting">
          <h3 className="text-xl font-semibold text-foreground mb-3">Minting + Retirement</h3>
          <div className="prose-section">
            <p>We mint tokens to the Living Supply of CUT, with every tonne of Carbon Offset added to the pool equating to <strong>1,000.00 CUT</strong> created. There is secondary tracking done by the Smart Contract, where tokens created in the OFFSET pool are programmed with information on the attributes of emission reduction projects that produced the Offsets.</p>
            <p>Along with the Living Supply is the Historical Supply. This includes all values of CUT retired from supply over time plus the current Living Supply of tokens. <strong>(Total Retired + Living Supply = Historical Supply)</strong></p>
            <p>When a CUT holder retires a token volume from the Living Supply it closes the loop of impact for all of the directly related Carbon Offsets being retired. In addition it forces the CUT team to go out to the real world to source the next round of Carbon Offsets from producers to mint more CUT into the Living Supply.</p>
            <p>A user can choose any timing or volume for retirement of any CUT they hold. By sending a balance of tokens to a wallet such as MetaMask, or using the published ABI, holders can signal their intent to retire CUT which locks an allowance for retirement in the contract. Locked allowances of CUT cannot be transferred to other wallets, as they are held within a holder's available balance until retirement and matching are complete.</p>
            <p>The CUT team operates a retirement bot that watches for locked allowances to be retired, pairs them with a unique matching entry of Carbon Offsets and creates the blockchain record for this specific retirement transaction information. Each retirement transaction is logged as a "Contribution" log on the chain that links the account, project, and number of CUT retired.</p>
          </div>
        </section>
        <PrevNextNav activePage={activePage} onNavigate={onNavigate} />
      </div>

      {/* === 05: Launch Supply + Release === */}
      <div className={p("supply-release")}>
        <section id="supply-release">
          <h2 className="text-2xl font-bold text-foreground mb-4">Launch Supply + Release</h2>
          <div className="prose-section">
            <p>There was a small Private sale prior to launch in which CUT supporters were given the opportunity to participate in the first transactions and balances of a project with real climate impact.</p>
            <p>This saw <strong>45,822 tonnes</strong> of Carbon Offsets being minted on the CUT ledger, as 45,822,000 CUT. Funds raised contributed to more Carbon Offsets being added to the project supply, and technology development.</p>
            <p>The main launch supply of CUT created during our first major minting event in Q1 of 2021 was: <strong>500 Thousand Tonnes of Offsets</strong>, equating to 500 Million CUT.</p>

            {/* Allocation Table */}
            <div className="overflow-x-auto my-6">
              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr className="border-b-2 border-border">
                    <th className="text-left py-2 px-3 text-foreground font-semibold">Allocation</th>
                    <th className="text-right py-2 px-3 text-foreground font-semibold">Tonnes</th>
                  </tr>
                </thead>
                <tbody className="text-muted-foreground">
                  <tr className="border-b border-border"><td className="py-2 px-3">Main Sale</td><td className="text-right py-2 px-3">400,000</td></tr>
                  <tr className="border-b border-border"><td className="py-2 px-3">Strategic Reserve</td><td className="text-right py-2 px-3">75,000</td></tr>
                  <tr className="border-b border-border"><td className="py-2 px-3">Founders & Team</td><td className="text-right py-2 px-3">25,000</td></tr>
                </tbody>
              </table>
            </div>

            <p><strong>Proceeds of CUT Sales contribute to:</strong></p>
            <ul className="list-disc ml-6 space-y-1 text-muted-foreground">
              <li>Carbon Offset Purchases — 5%</li>
              <li>Technology Advancement — 15%</li>
              <li>Marketing CUT</li>
            </ul>

            <p className="mt-4">With the creation of aCUT on the Arbitrum Network, an additional pool of Offsets were added in the amount of <strong>19,299 tonnes</strong>. This contributed 19,299,000 aCUT tokens bringing the combined supply across chains of 565,000 tonnes.</p>
            <p>As CUT are retired over time, and the balance of supply reduces, the CUT team works in the real world securing more Carbon Offsets, developing more green project relationships, used to mint CUT. Keeping a balance of CUT in the circulating available supply is the goal.</p>
          </div>
        </section>
        <PrevNextNav activePage={activePage} onNavigate={onNavigate} />
      </div>

      {/* === 06: Commitment to Sustainability === */}
      <div className={p("sustainability")}>
        <section id="sustainability">
          <h2 className="text-2xl font-bold text-foreground mb-4">Commitment to Sustainability</h2>
          <div className="prose-section">
            <p>With a focus on reducing the impact of our activities, CUT calculates our usage within the Ethereum Blockchain and other networks and hosting, to make our data footprint for this project Carbon Neutral using the Carbon Utility Token.</p>
            <p>Extending to neutralize any adverse climate effects of our activity on the Public Ethereum Blockchain, and the Arbitrum Layer 2 Network, we monitor the hashrate of the network and the relative activity footprint of rCUT and aCUT. The hashrate translates to a footprint to be offset, against data on the most current and efficient mining method.</p>
            <p>This is where climate impact is directly tied to the user decisions of those holding CUT, where clicking to retire triggers more certified offsets to be sourced and the reach of the project impact to grow.</p>
          </div>
        </section>
        <PrevNextNav activePage={activePage} onNavigate={onNavigate} />
      </div>

      {/* === 07: Carbon Terminology === */}
      <div className={p("carbon-terminology")}>
        <section id="carbon-terminology">
          <h2 className="text-2xl font-bold text-foreground mb-4">Carbon Terminology</h2>
          <div className="prose-section">
            <ul className="list-disc ml-6 space-y-2 text-muted-foreground">
              <li><strong>Emission Reduction</strong> — This term represents the amount of reduction of Carbon Dioxide or equivalent (CO2E) from entering the atmosphere.</li>
              <li><strong>Verified Emission Reduction (VER)</strong> — Emission reductions verified by an independent third party utilizing internationally recognized protocols such as: ISO, CDM, VCR, ETS, or similar.</li>
              <li><strong>Carbon Offset</strong> — Is a VER which can be utilized to "offset" the carbon footprint of any activity.</li>
              <li><strong>CO2E</strong> — Carbon Dioxide Equivalent, a common unit for various GHGs to be expressed in terms of their CO2 equivalent relative to global warming potential.</li>
            </ul>
          </div>
        </section>
        <PrevNextNav activePage={activePage} onNavigate={onNavigate} />
      </div>

      {/* === 08: Disclaimer === */}
      <div className={p("disclaimer")}>
        <section id="disclaimer">
          <h2 className="text-2xl font-bold text-foreground mb-4">Disclaimer</h2>
          <div className="prose-section">
            <p>The CUT whitepaper, CUT website, and CUT tokens (rCUT, & aCUT) are not available in the United States of America or any other prohibited jurisdictions.</p>
            <p>This document is provided for informational purposes only. Nothing contained herein is intended as, or shall be construed as, an offer to sell, or the solicitation of an offer to buy, any token, security, or other asset in any jurisdiction where such offer or solicitation would be unlawful.</p>
            <p>Presented by CUT Carbon Distributed Technologies AG. Version 2.0 — June 2023.</p>
          </div>
        </section>
        <PrevNextNav activePage={activePage} onNavigate={onNavigate} />
      </div>

    </div>
  );
}

// --- Main Page ---
export default function CUTWhitepaper() {
  const [activeId, setActiveId] = useState("directory");
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const activePage = useMemo(() => getParentId(activeId), [activeId]);

  useEffect(() => {
    const handleScroll = () => setShowScrollTop(window.scrollY > 400);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navigateTo = useCallback((id: string) => {
    const newParent = getParentId(id);
    const isTopLevel = newParent === id;
    setActiveId(id);
    if (isTopLevel) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      setTimeout(() => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 100);
    }
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SEOHead title="CUT Whitepaper" description="Carbon Utility Token (CUT) whitepaper — an immutable ledger for tracking and retiring certified Carbon Offsets on Ethereum and Arbitrum." path="/cut-whitepaper" />
      <Navbar />
      <ReadingProgress />

      <div className="flex min-h-[calc(100vh-80px)] pt-16 lg:pt-20">
        <DesktopSidebar activeId={activeId} onNavigate={navigateTo} collapsed={sidebarCollapsed} onToggle={() => setSidebarCollapsed(c => !c)} />
        {sidebarCollapsed && (
          <button
            onClick={() => setSidebarCollapsed(false)}
            className="fixed top-[72px] left-3 lg:sticky lg:top-[80px] lg:left-auto h-9 w-9 flex items-center justify-center shrink-0 z-20 text-muted-foreground hover:text-foreground transition-colors bg-card/80 backdrop-blur-sm rounded-md border border-border lg:bg-transparent lg:backdrop-blur-none lg:border-0 lg:rounded-none lg:h-10 lg:w-10"
            aria-label="Expand sidebar"
          >
            <Menu className="h-5 w-5" />
          </button>
        )}
        <main className="flex-1 min-w-0">
          <CUTWhitepaperContent activePage={activePage} onNavigate={navigateTo} />
        </main>
      </div>

      <Footer />

      {showScrollTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-20 right-6 z-30 h-10 w-10 rounded-full bg-primary text-primary-foreground shadow-lg flex items-center justify-center hover:bg-primary/90 transition-colors"
        >
          <ArrowUp className="h-4 w-4" />
        </button>
      )}

      <style>{`
        .cut-whitepaper-content .prose-section p { color: hsl(var(--muted-foreground)); line-height: 1.75; margin-bottom: 1rem; }
        .cut-whitepaper-content .prose-section strong { color: hsl(142 70% 45%); }

        .cut-whitepaper-content section > h2 { position: relative; padding-bottom: 0.5rem; }
        .cut-whitepaper-content section > h2::after {
          content: ''; position: absolute; bottom: 0; left: 0; width: 40px; height: 2px;
          background: linear-gradient(90deg, hsl(142 70% 45%), hsl(142 70% 45% / 0)); border-radius: 1px;
        }

        .cut-whitepaper-content .prose-section ul { list-style: none; }
        .cut-whitepaper-content .prose-section ul li { position: relative; padding-left: 1.25rem; }
        .cut-whitepaper-content .prose-section ul li::before {
          content: ''; position: absolute; left: 0; top: 0.65em; width: 5px; height: 5px; border-radius: 50%;
          background: hsl(142 70% 45%); box-shadow: 0 0 6px hsl(142 70% 45% / 0.4);
        }

        .cut-whitepaper-content .prose-section a { color: hsl(142 70% 45%); text-decoration: none; transition: text-shadow 0.2s ease; }
        .cut-whitepaper-content .prose-section a:hover { text-shadow: 0 0 8px hsl(142 70% 45% / 0.3); }

        .cut-whitepaper-content table { border-color: hsl(142 70% 45% / 0.15); }
        .cut-whitepaper-content thead { border-bottom: 2px solid hsl(142 70% 45% / 0.25); }
        .cut-whitepaper-content th { color: hsl(142 70% 45%) !important; font-weight: 500; letter-spacing: 0.02em; }

        aside::-webkit-scrollbar-thumb { background: hsl(142 70% 45% / 0.2) !important; border-radius: 3px; }
        aside::-webkit-scrollbar-thumb:hover { background: hsl(142 70% 45% / 0.4) !important; }

        .cut-wp-page-hidden { display: none; }

        /* Light theme overrides */
        :root:not(.dark):not(.colorful) .cut-whitepaper-content .prose-section strong { color: hsl(220 20% 10%) !important; }
        :root:not(.dark):not(.colorful) .cut-whitepaper-content section > h2::after {
          background: linear-gradient(90deg, hsl(220 20% 10%), hsl(220 20% 10% / 0)) !important;
        }
        :root:not(.dark):not(.colorful) .cut-whitepaper-content .prose-section ul li::before {
          background: hsl(220 20% 10%) !important; box-shadow: none !important;
        }
        :root:not(.dark):not(.colorful) .cut-whitepaper-content .prose-section a { color: hsl(220 20% 10%) !important; }
        :root:not(.dark):not(.colorful) .cut-whitepaper-content .prose-section a:hover { text-shadow: none !important; }
        :root:not(.dark):not(.colorful) .cut-whitepaper-content table { border-color: hsl(220 13% 91%) !important; }
        :root:not(.dark):not(.colorful) .cut-whitepaper-content thead { border-bottom-color: hsl(220 20% 10% / 0.2) !important; }
        :root:not(.dark):not(.colorful) .cut-whitepaper-content th { color: hsl(220 20% 10%) !important; }
      `}</style>
    </div>
  );
}
