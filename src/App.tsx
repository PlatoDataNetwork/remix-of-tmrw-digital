import { lazy, Suspense } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import LoadingScreen from "./components/LoadingScreen";
import Index from "./pages/Index";

// Lazy load secondary pages
const RWAs = lazy(() => import("./pages/RWAs"));
const Energy = lazy(() => import("./pages/rwa/Energy"));
const Metals = lazy(() => import("./pages/rwa/Metals"));
const RareEarth = lazy(() => import("./pages/rwa/RareEarth"));
const Infrastructure = lazy(() => import("./pages/rwa/Infrastructure"));
const RealEstate = lazy(() => import("./pages/rwa/RealEstate"));
const Commodities = lazy(() => import("./pages/rwa/Commodities"));
const CarbonCredits = lazy(() => import("./pages/rwa/CarbonCredits"));
const SovereignWealth = lazy(() => import("./pages/rwa/SovereignWealth"));
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
const InvestorDisclaimer = lazy(() => import("./pages/InvestorDisclaimer"));
const InvestorPresentation = lazy(() => import("./pages/InvestorPresentation"));
const Legal = lazy(() => import("./pages/Legal"));
const NotFound = lazy(() => import("./pages/NotFound"));

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop />
        <Suspense fallback={<LoadingScreen />}>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/investors" element={<InvestorDisclaimer />} />
            <Route path="/investors/presentation" element={<InvestorPresentation />} />
            <Route path="/rwas" element={<RWAs />} />
            <Route path="/rwas/energy" element={<Energy />} />
            <Route path="/rwas/metals" element={<Metals />} />
            <Route path="/rwas/rare-earth" element={<RareEarth />} />
            <Route path="/rwas/infrastructure" element={<Infrastructure />} />
            <Route path="/rwas/real-estate" element={<RealEstate />} />
            <Route path="/rwas/commodities" element={<Commodities />} />
            <Route path="/rwas/carbon-credits" element={<CarbonCredits />} />
            <Route path="/rwas/sovereign-wealth" element={<SovereignWealth />} />
            <Route path="/services/web3-ai" element={<Web3AIService />} />
            <Route path="/services/real-world-assets" element={<RealWorldAssetsService />} />
            <Route path="/services/data-intelligence" element={<DataIntelligenceService />} />
            <Route path="/services/ai-analytics" element={<AIAnalyticsService />} />
            <Route path="/services/cyber-defense" element={<CyberDefenseService />} />
            <Route path="/services/digital-strategy" element={<DigitalStrategyService />} />
            <Route path="/web3ai/ai-automation" element={<AIAutomation />} />
            <Route path="/web3ai/token-ecosystem" element={<TokenEcosystem />} />
            <Route path="/web3ai/cross-border-settlements" element={<CrossBorderSettlements />} />
            <Route path="/web3ai/rwa-infrastructure" element={<RWAInfrastructure />} />
            <Route path="/web3ai/vertical-intelligence" element={<VerticalIntelligence />} />
            <Route path="/web3ai/community-driven" element={<CommunityDriven />} />
            <Route path="/blog/rwa-tokenization" element={<RWATokenization />} />
            <Route path="/blog/ai-investor-engagement" element={<AIInvestorEngagement />} />
            <Route path="/blog/pre-ipo-markets" element={<PreIPOMarkets />} />
            <Route path="/legal" element={<Legal />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
