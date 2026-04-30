'use client';

import React from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';

const Header = () => {
  const router = useRouter();
  const pathname = usePathname();

  const showBackButton = pathname !== '/';

  return (
    <header className="w-full py-6 px-8 flex justify-between items-center animate-slide-down">
      <div className="flex items-center">
        {showBackButton && (
          <button
            onClick={() => router.back()}
            className="mr-4 p-2 rounded-full hover:bg-secondary/50 transition-all"
            aria-label="Retour"
          >
            <ArrowLeft className="h-5 w-5 text-foreground/80" />
          </button>
        )}
        <h1 className="text-xl font-display font-semibold text-foreground">
          MultiTable
        </h1>
      </div>
    </header>
  );
};

export default Header;
