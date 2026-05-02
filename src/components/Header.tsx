"use client";

import { useState } from "react";
import Link from "next/link";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="bg-primary text-white sticky top-0 z-50 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-2xl font-bold">
            Bancada<span className="text-accent">Certa</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
          <Link href="/pinadores-pneumaticos" className="hover:text-accent transition-colors">
            Pinadores
          </Link>
          <Link href="/grampeadores" className="hover:text-accent transition-colors">
            Grampeadores
          </Link>
          <Link href="/pregadores" className="hover:text-accent transition-colors">
            Pregadores
          </Link>
          <Link href="/blog" className="hover:text-accent transition-colors">
            Blog
          </Link>
          <Link href="/guia" className="btn-primary !py-2 !px-4 !text-sm">
            Qual comprar?
          </Link>
        </nav>

        {/* Mobile menu button */}
        <button
          className="md:hidden p-2"
          aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile nav */}
      {menuOpen && (
        <nav className="md:hidden bg-primary-dark border-t border-white/10 px-4 pb-4 space-y-1">
          <Link
            href="/pinadores-pneumaticos"
            className="block py-3 px-2 text-sm hover:text-accent transition-colors border-b border-white/5"
            onClick={() => setMenuOpen(false)}
          >
            Pinadores
          </Link>
          <Link
            href="/grampeadores"
            className="block py-3 px-2 text-sm hover:text-accent transition-colors border-b border-white/5"
            onClick={() => setMenuOpen(false)}
          >
            Grampeadores
          </Link>
          <Link
            href="/pregadores"
            className="block py-3 px-2 text-sm hover:text-accent transition-colors border-b border-white/5"
            onClick={() => setMenuOpen(false)}
          >
            Pregadores
          </Link>
          <Link
            href="/blog"
            className="block py-3 px-2 text-sm hover:text-accent transition-colors border-b border-white/5"
            onClick={() => setMenuOpen(false)}
          >
            Blog
          </Link>
          <Link
            href="/guia"
            className="block py-3 px-2 text-sm font-semibold text-accent hover:text-accent-light transition-colors"
            onClick={() => setMenuOpen(false)}
          >
            Qual comprar?
          </Link>
        </nav>
      )}
    </header>
  );
}
