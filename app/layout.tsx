// app/layout.tsx
'use client';
import "./globals.css";
import { ReactNode, useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { GameProvider } from "@/context/GameContext";
import { UserProvider } from "@/context/UserContext";

const queryClient = new QueryClient();

export default function RootLayout({ children }: { children: ReactNode }) {
  const [client] = useState(() => queryClient);

  return (
    <html lang="fr" suppressHydrationWarning> 
      {/* suppressHydrationWarning est nécessaire pour next-themes sur <html> */}
      <body className="antialiased">
        <QueryClientProvider client={client}>
            <TooltipProvider>
              <GameProvider>
                <UserProvider>
                  <Sonner position="top-center" theme="dark" />
                  {children}
                </UserProvider>
              </GameProvider>
            </TooltipProvider>
        </QueryClientProvider>
      </body>
    </html>
  );
}