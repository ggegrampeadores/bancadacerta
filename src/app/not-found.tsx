import Link from "next/link";

export default function NotFound() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-24 text-center">
      <h1 className="text-6xl font-bold text-neutral-300 mb-4">404</h1>
      <h2 className="text-2xl font-bold text-primary mb-4">Página não encontrada</h2>
      <p className="text-neutral-600 mb-8">
        O conteúdo que você procura pode ter sido movido ou ainda não foi publicado.
      </p>
      <Link href="/" className="btn-primary">
        Voltar para o início
      </Link>
    </div>
  );
}
