import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-neutral-900 text-neutral-400 mt-16">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <span className="text-xl font-bold text-white">
              Bancada<span className="text-accent">Certa</span>
            </span>
            <p className="mt-3 text-sm leading-relaxed">
              Guia independente de ferramentas de fixação. Reviews técnicos por quem
              entende do assunto há mais de 30 anos.
            </p>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-3">Categorias</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/pinadores-pneumaticos" className="hover:text-white transition-colors">Pinadores Pneumáticos</Link></li>
              <li><Link href="/pinadores-bateria" className="hover:text-white transition-colors">Pinadores a Bateria</Link></li>
              <li><Link href="/grampeadores" className="hover:text-white transition-colors">Grampeadores</Link></li>
              <li><Link href="/pregadores" className="hover:text-white transition-colors">Pregadores</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-3">Recursos</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/guia" className="hover:text-white transition-colors">Guia: Qual Comprar?</Link></li>
              <li><Link href="/blog" className="hover:text-white transition-colors">Blog</Link></li>
              <li><Link href="/sobre" className="hover:text-white transition-colors">Sobre</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-3">Aviso</h4>
            <p className="text-sm leading-relaxed">
              Este site contém links de afiliado. Ao comprar através dos nossos links, 
              você nos ajuda a manter o conteúdo gratuito — sem custo adicional para você.
            </p>
          </div>
        </div>
        <div className="border-t border-neutral-800 mt-8 pt-8 text-center text-sm">
          <p>&copy; {new Date().getFullYear()} BancadaCerta.com.br — Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
}
