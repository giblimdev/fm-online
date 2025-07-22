// @/components/layout/Header.tsx
"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";
import Logo from "./Logo";
import Nav from "./Nav";
import IsConnected from "./IsConnected";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo - Toujours visible */}
          <div className="flex-shrink-0">
            <Logo />
          </div>

          {/* Navigation desktop - Hidden on mobile */}
          <div className="hidden md:block">
            <Nav />
          </div>

          {/* Actions desktop - Hidden on mobile */}
          <div className="hidden md:block">
            <IsConnected />
          </div>

          {/* Menu burger - Visible uniquement sur mobile */}
          <div className="md:hidden flex items-center space-x-4">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              aria-expanded="false"
              aria-label="Menu principal"
            >
              {isMenuOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Menu mobile - Slide down animation */}
      <div
        className={`md:hidden transition-all duration-300 ease-in-out ${
          isMenuOpen
            ? "max-h-screen opacity-100 visible"
            : "max-h-0 opacity-0 invisible"
        } overflow-hidden`}
      >
        <div className="bg-white border-t border-slate-200 shadow-lg">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-6">
            {/* Navigation mobile */}
            <nav onClick={closeMenu}>
              <Nav />
            </nav>

            {/* Actions mobile */}
            <div className="pt-4 border-t border-slate-200" onClick={closeMenu}>
              <IsConnected />
            </div>
          </div>
        </div>
      </div>

      {/* Overlay pour fermer le menu en cliquant à côté */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 md:hidden"
          onClick={closeMenu}
          aria-hidden="true"
        />
      )}
    </header>
  );
}
