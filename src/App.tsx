import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import RWAs from "./pages/RWAs";
import Energy from "./pages/rwa/Energy";
import Metals from "./pages/rwa/Metals";
import RareEarth from "./pages/rwa/RareEarth";
import Infrastructure from "./pages/rwa/Infrastructure";
import RealEstate from "./pages/rwa/RealEstate";
import Commodities from "./pages/rwa/Commodities";
import CarbonCredits from "./pages/rwa/CarbonCredits";
import SovereignWealth from "./pages/rwa/SovereignWealth";
import Web3AIService from "./pages/services/Web3AI";
import RealWorldAssetsService from "./pages/services/RealWorldAssets";
import DataIntelligenceService from "./pages/services/DataIntelligence";
import AIAnalyticsService from "./pages/services/AIAnalytics";
import CyberDefenseService from "./pages/services/CyberDefense";
import DigitalStrategyService from "./pages/services/DigitalStrategy";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
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
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
