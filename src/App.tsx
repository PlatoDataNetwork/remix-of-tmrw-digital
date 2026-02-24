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
import TokenizationPage from "./pages/rwa/Tokenization";
import SovereignWealth from "./pages/rwa/SovereignWealth";
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
          <Route path="/rwas/tokenization" element={<TokenizationPage />} />
          <Route path="/rwas/sovereign-wealth" element={<SovereignWealth />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
