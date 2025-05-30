import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { GameProvider } from "./context/GameContext.tsx";
import HomePage from "./pages/HomePage";
import Game1 from "./pages/Game1";
import SelectTables from "./pages/SelectTables";
import Quiz from "./pages/Quiz";
import Results from "./pages/Results";
import Game2 from "./pages/Game2";
import NotFound from "./pages/NotFound";
import Game3 from "./pages/Game3";
import Game4 from "./pages/Game4";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <GameProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/game1" element={<Game1 />} />
            <Route path="/game1/select-tables" element={<SelectTables />} />
            <Route path="/game1/quiz" element={<Quiz />} />
            <Route path="/game1/results" element={<Results />} />
            <Route path="/game2" element={<Game2 />} />
            <Route path="/game3" element={<Game3 />} />
            <Route path="/game4" element={<Game4 />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </GameProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
