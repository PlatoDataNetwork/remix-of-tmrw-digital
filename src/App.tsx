import { lazy, Suspense, ReactNode } from "react";
import { HelmetProvider } from "react-helmet-async";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Outlet, useParams } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import LanguageHandler from "./components/LanguageHandler";
import SeoHreflang from "./components/SeoHreflang";
import LoadingScreen from "./components/LoadingScreen";
import ChatWidget from "./components/ChatWidget";
import { ChatProvider } from "./components/ChatContext";
import { SUPPORTED_LANGUAGES } from "./hooks/useLanguage";
import Index from "./pages/Index";
import { AdminAuthProvider } from "./contexts/AdminAuthContext";

// Admin pages (lazy)
const AdminLogin = lazy(() => import("./pages/admin/AdminLogin"));
const AdminLayout = lazy(() => import("./pages/admin/AdminLayout"));
const AdminDashboard = lazy(() => import("./pages/admin/AdminDashboard"));
const AdminAnalytics = lazy(() => import("./pages/admin/AdminAnalytics"));
const AdminContacts = lazy(() => import("./pages/admin/AdminContacts"));
const AdminContactDetail = lazy(() => import("./pages/admin/AdminContactDetail"));
const AdminApiKeys = lazy(() => import("./pages/admin/AdminApiKeys"));
const AdminApiKeyDetail = lazy(() => import("./pages/admin/AdminApiKeyDetail"));
const AdminNotifications = lazy(() => import("./pages/admin/AdminNotifications"));
const AdminInvestors = lazy(() => import("./pages/admin/AdminInvestors"));
const AdminPageSpeed = lazy(() => import("./pages/admin/AdminPageSpeed"));
const AdminSecurityAudit = lazy(() => import("./pages/admin/AdminSecurityAudit"));
// Lazy load secondary pages
const RWAs = lazy(() => import("./pages/RWAs"));
const Collectables = lazy(() => import("./pages/rwa/Collectables"));
const Energy = lazy(() => import("./pages/rwa/Energy"));
const Metals = lazy(() => import("./pages/rwa/Metals"));
const RareEarth = lazy(() => import("./pages/rwa/RareEarth"));
const Infrastructure = lazy(() => import("./pages/rwa/Infrastructure"));
const RealEstate = lazy(() => import("./pages/rwa/RealEstate"));
const Commodities = lazy(() => import("./pages/rwa/Commodities"));
const CarbonCredits = lazy(() => import("./pages/rwa/CarbonCredits"));
const SovereignWealth = lazy(() => import("./pages/rwa/SovereignWealth"));
const TaxCredits = lazy(() => import("./pages/rwa/TaxCredits"));
const Stablecoins = lazy(() => import("./pages/rwa/Stablecoins"));
const UtilitiesRWA = lazy(() => import("./pages/rwa/Utilities"));
const Web3AIService = lazy(() => import("./pages/services/Web3AI"));
const RealWorldAssetsService = lazy(() => import("./pages/services/RealWorldAssets"));
const DataIntelligenceService = lazy(() => import("./pages/services/DataIntelligence"));
const AIAnalyticsService = lazy(() => import("./pages/services/AIAnalytics"));
const CyberDefenseService = lazy(() => import("./pages/services/CyberDefense"));
const DigitalStrategyService = lazy(() => import("./pages/services/DigitalStrategy"));
const AIAutomation = lazy(() => import("./pages/web3ai/AIAutomation"));
const TokenEcosystem = lazy(() => import("./pages/web3ai/TokenEcosystem"));
const CrossBorderSettlements = lazy(() => import("./pages/web3ai/CrossBorderSettlements"));
const RWAInfrastructure = lazy(() => import("./pages/web3ai/RWAInfrastructure"));
const VerticalIntelligence = lazy(() => import("./pages/web3ai/VerticalIntelligence"));
const CommunityDriven = lazy(() => import("./pages/web3ai/CommunityDriven"));
const RWATokenization = lazy(() => import("./pages/blog/RWATokenization"));
const AIInvestorEngagement = lazy(() => import("./pages/blog/AIInvestorEngagement"));
const PreIPOMarkets = lazy(() => import("./pages/blog/PreIPOMarkets"));
const CarbonCreditsTokenization = lazy(() => import("./pages/blog/CarbonCreditsTokenization"));
const CommoditiesTokenization = lazy(() => import("./pages/blog/CommoditiesTokenization"));
const EnergyTokenization = lazy(() => import("./pages/blog/EnergyTokenization"));
const InfrastructureTokenization = lazy(() => import("./pages/blog/InfrastructureTokenization"));
const MetalsTokenization = lazy(() => import("./pages/blog/MetalsTokenization"));
const RareEarthTokenization = lazy(() => import("./pages/blog/RareEarthTokenization"));
const RealEstateTokenization = lazy(() => import("./pages/blog/RealEstateTokenization"));
const SovereignWealthTokenization = lazy(() => import("./pages/blog/SovereignWealthTokenization"));
const TaxCreditsTokenization = lazy(() => import("./pages/blog/TaxCreditsTokenization"));
const CollectablesTokenization = lazy(() => import("./pages/blog/CollectablesTokenization"));
const StablecoinsTokenization = lazy(() => import("./pages/blog/StablecoinsTokenization"));
const UtilitiesTokenization = lazy(() => import("./pages/blog/UtilitiesTokenization"));
const TMRWLaunch = lazy(() => import("./pages/blog/TMRWLaunch"));
const TokenizationAlternatives = lazy(() => import("./pages/blog/TokenizationAlternatives"));
const SECNasdaqTokenizedStocks = lazy(() => import("./pages/blog/SECNasdaqTokenizedStocks"));
const Web3AIConvergence = lazy(() => import("./pages/blog/Web3AIConvergence"));
const AITokenizationCapitalMarkets = lazy(() => import("./pages/blog/AITokenizationCapitalMarkets"));
const RWASecurityAttackSurface = lazy(() => import("./pages/blog/RWASecurityAttackSurface"));
const FutureProofingRWA = lazy(() => import("./pages/blog/FutureProofingRWA"));
const ProgrammableYieldRWA = lazy(() => import("./pages/blog/ProgrammableYieldRWA"));
const AutonomousCapitalMarkets = lazy(() => import("./pages/blog/AutonomousCapitalMarkets"));
const WhyRWAProjectsFail = lazy(() => import("./pages/blog/WhyRWAProjectsFail"));
const WallStreetToWallets = lazy(() => import("./pages/blog/WallStreetToWallets"));
const VibeCodingStartup = lazy(() => import("./pages/blog/VibeCodingStartup"));
const ComplianceParadoxRWA = lazy(() => import("./pages/blog/ComplianceParadoxRWA"));
const LiquidityTwoPointZero = lazy(() => import("./pages/blog/LiquidityTwoPointZero"));
const ProtocolLayerEvolution = lazy(() => import("./pages/blog/ProtocolLayerEvolution"));
const Intel = lazy(() => import("./pages/Intel"));
const News = lazy(() => import("./pages/News"));
const InvestorDisclaimer = lazy(() => import("./pages/InvestorDisclaimer"));
const InvestorPresentation = lazy(() => import("./pages/InvestorPresentation"));
const Legal = lazy(() => import("./pages/Legal"));
const Showcase = lazy(() => import("./pages/Showcase"));
const RTO = lazy(() => import("./pages/RTO"));
const Whitepaper = lazy(() => import("./pages/Whitepaper"));
const Deck = lazy(() => import("./pages/Deck"));
const CorporateDeck = lazy(() => import("./pages/CorporateDeck"));
const OrdiorDeck = lazy(() => import("./pages/OrdiorDeck"));
const SuperCloud = lazy(() => import("./pages/SuperCloud"));
const CUTToken = lazy(() => import("./pages/CUTToken"));
const Security = lazy(() => import("./pages/Security"));
const PathTo1B = lazy(() => import("./pages/PathTo1B"));
const RTODeck = lazy(() => import("./pages/RTODeck"));
const DataFeeds = lazy(() => import("./pages/DataFeeds"));
const ApiDocumentation = lazy(() => import("./pages/ApiDocumentation"));
const NotFound = lazy(() => import("./pages/NotFound"));

const queryClient = new QueryClient();

// Language layout validates lang param
const LanguageLayout = () => {
  const { lang } = useParams();
  const isValid = SUPPORTED_LANGUAGES.some(l => l.toLowerCase() === lang?.toLowerCase());
  if (!isValid) return <NotFound />;
  return <Outlet />;
};

// Shared route definitions (without leading slash)
function getRoutes() {
  return [
    <Route key="investors" path="investors" element={<InvestorDisclaimer />} />,
    <Route key="investors-pres" path="investors/presentation" element={<InvestorPresentation />} />,
    <Route key="rwas" path="rwas" element={<RWAs />} />,
    <Route key="rwas-collectables" path="rwas/collectables" element={<Collectables />} />,
    <Route key="rwas-energy" path="rwas/energy" element={<Energy />} />,
    <Route key="rwas-metals" path="rwas/metals" element={<Metals />} />,
    <Route key="rwas-rare-earth" path="rwas/rare-earth" element={<RareEarth />} />,
    <Route key="rwas-infrastructure" path="rwas/infrastructure" element={<Infrastructure />} />,
    <Route key="rwas-real-estate" path="rwas/real-estate" element={<RealEstate />} />,
    <Route key="rwas-commodities" path="rwas/commodities" element={<Commodities />} />,
    <Route key="rwas-carbon" path="rwas/carbon-credits" element={<CarbonCredits />} />,
    <Route key="rwas-sovereign" path="rwas/sovereign-wealth" element={<SovereignWealth />} />,
    <Route key="rwas-stablecoins" path="rwas/stablecoins" element={<Stablecoins />} />,
    <Route key="rwas-tax" path="rwas/tax-credits" element={<TaxCredits />} />,
    <Route key="rwas-utilities" path="rwas/utilities" element={<UtilitiesRWA />} />,
    <Route key="svc-web3" path="services/web3-ai" element={<Web3AIService />} />,
    <Route key="svc-rwa" path="services/real-world-assets" element={<RealWorldAssetsService />} />,
    <Route key="svc-data" path="services/data-intelligence" element={<DataIntelligenceService />} />,
    <Route key="svc-ai" path="services/ai-analytics" element={<AIAnalyticsService />} />,
    <Route key="super-cloud" path="super-cloud" element={<SuperCloud />} />,
    <Route key="cut-token" path="cut-token" element={<CUTToken />} />,
    <Route key="security" path="security" element={<Security />} />,
    <Route key="svc-cyber" path="services/cyber-defense" element={<CyberDefenseService />} />,
    <Route key="svc-digital" path="services/digital-strategy" element={<DigitalStrategyService />} />,
    <Route key="w3-ai" path="web3ai/ai-automation" element={<AIAutomation />} />,
    <Route key="w3-token" path="web3ai/token-ecosystem" element={<TokenEcosystem />} />,
    <Route key="w3-cross" path="web3ai/cross-border-settlements" element={<CrossBorderSettlements />} />,
    <Route key="w3-rwa" path="web3ai/rwa-infrastructure" element={<RWAInfrastructure />} />,
    <Route key="w3-vert" path="web3ai/vertical-intelligence" element={<VerticalIntelligence />} />,
    <Route key="w3-comm" path="web3ai/community-driven" element={<CommunityDriven />} />,
    <Route key="blog-rwa" path="blog/rwa-tokenization" element={<RWATokenization />} />,
    <Route key="blog-ai" path="blog/ai-investor-engagement" element={<AIInvestorEngagement />} />,
    <Route key="blog-ipo" path="blog/pre-ipo-markets" element={<PreIPOMarkets />} />,
    <Route key="blog-carbon" path="blog/carbon-credits-tokenization" element={<CarbonCreditsTokenization />} />,
    <Route key="blog-comm" path="blog/commodities-tokenization" element={<CommoditiesTokenization />} />,
    <Route key="blog-energy" path="blog/energy-tokenization" element={<EnergyTokenization />} />,
    <Route key="blog-infra" path="blog/infrastructure-tokenization" element={<InfrastructureTokenization />} />,
    <Route key="blog-metals" path="blog/metals-tokenization" element={<MetalsTokenization />} />,
    <Route key="blog-rare" path="blog/rare-earth-tokenization" element={<RareEarthTokenization />} />,
    <Route key="blog-realestate" path="blog/real-estate-tokenization" element={<RealEstateTokenization />} />,
    <Route key="blog-sovereign" path="blog/sovereign-wealth-tokenization" element={<SovereignWealthTokenization />} />,
    <Route key="blog-tax" path="blog/tax-credits-tokenization" element={<TaxCreditsTokenization />} />,
    <Route key="blog-collect" path="blog/collectables-tokenization" element={<CollectablesTokenization />} />,
    <Route key="blog-stable" path="blog/stablecoins-tokenization" element={<StablecoinsTokenization />} />,
    <Route key="blog-util" path="blog/utilities-tokenization" element={<UtilitiesTokenization />} />,
    <Route key="blog-tmrw" path="blog/tmrw-launch" element={<TMRWLaunch />} />,
    <Route key="blog-token-alts" path="blog/tokenization-alternatives" element={<TokenizationAlternatives />} />,
    <Route key="blog-sec-nasdaq" path="blog/sec-nasdaq-tokenized-stocks" element={<SECNasdaqTokenizedStocks />} />,
    <Route key="intel" path="intel" element={<Intel />} />,
    <Route key="news" path="news" element={<News />} />,
    <Route key="showcase" path="showcase" element={<Showcase />} />,
    <Route key="rto" path="rto" element={<RTO />} />,
    <Route key="legal" path="legal" element={<Legal />} />,
    <Route key="whitepaper" path="whitepaper" element={<Whitepaper />} />,
    <Route key="deck" path="deck" element={<Deck />} />,
    <Route key="corporate-deck" path="corporate-deck" element={<CorporateDeck />} />,
    <Route key="ordior" path="Ordior" element={<OrdiorDeck />} />,
    <Route key="path-to-1b" path="path-to-1b" element={<PathTo1B />} />,
    <Route key="rto-deck" path="rto-deck" element={<RTODeck />} />,
    <Route key="data-feeds" path="data-feeds" element={<DataFeeds />} />,
    <Route key="api-docs" path="api-documentation" element={<ApiDocumentation />} />,
  ];
}

const App = () => (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <ChatProvider>
            <AdminAuthProvider>
              <ScrollToTop />
              <LanguageHandler />
              <SeoHreflang />
              <Suspense fallback={<LoadingScreen />}>
                <Routes>
                  {/* Admin routes */}
                  <Route path="/tmrw-admin/login" element={<AdminLogin />} />
                  <Route path="/tmrw-admin" element={<AdminLayout />}>
                    <Route index element={<AdminDashboard />} />
                    <Route path="analytics" element={<AdminAnalytics />} />
                    <Route path="contacts" element={<AdminContacts />} />
                    <Route path="contacts/:id" element={<AdminContactDetail />} />
                    <Route path="api-keys" element={<AdminApiKeys />} />
                    <Route path="api-keys/:id" element={<AdminApiKeyDetail />} />
                    <Route path="investors" element={<AdminInvestors />} />
                    <Route path="pagespeed" element={<AdminPageSpeed />} />
                    <Route path="security-audit" element={<AdminSecurityAudit />} />
                    <Route path="notifications" element={<AdminNotifications />} />
                  </Route>

                  {/* Default English routes */}
                  <Route path="/" element={<Index />} />
                  {getRoutes().map(r => (
                    <Route key={r.key} path={`/${r.props.path}`} element={r.props.element} />
                  ))}

                  {/* Language-prefixed routes */}
                  <Route path="/:lang" element={<LanguageLayout />}>
                    <Route index element={<Index />} />
                    {getRoutes()}
                    <Route path="*" element={<NotFound />} />
                  </Route>

                  <Route path="*" element={<NotFound />} />
                </Routes>
              </Suspense>
              <ChatWidget />
            </AdminAuthProvider>
          </ChatProvider>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;
