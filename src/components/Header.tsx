import Link from "next/link";

export default function Header() {
  return (
    <header className="bg-primary text-white sticky top-0 z-50 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-2xl font-bold">
            Bancada<span className="text-accent">Certa</span>
          </span>
        </Link>
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
        <button className="md:hidden p-2" aria-label="Menu">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>
    </header>
  );
}
