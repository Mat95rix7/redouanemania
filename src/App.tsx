import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { GameProvider } from "./context/GameContext.tsx";
import { UserProvider } from "./context/UserContext";
import HomePage from "./pages/HomePage";
import Game1 from "./pages/Game1";
import Game2 from "./pages/Game2";
import NotFound from "./pages/NotFound";
import Game3 from "./pages/Game3";
import Game4 from "./pages/Game4";
import Game5 from "./pages/Game5";
import LoginPage from "./pages/Login";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <GameProvider>
        <UserProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/game1" element={<Game1 />} />
              <Route path="/game2" element={<Game2 />} />
              <Route path="/game3" element={<Game3 onBack={() => window.history.back()} />} />
              <Route path="/game4" element={<Game4 />} />
              <Route path="/game5" element={<Game5 />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </UserProvider>
      </GameProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
