import Link from "next/link";
import type { Produto } from "@/lib/types";

interface Props {
  produto: Produto;
  categoriaSlug: string;
}

const destaqueLabels: Record<string, { text: string; color: string }> = {
  melhor_custo: { text: "Melhor Custo-Benefício", color: "bg-success" },
  melhor_qualidade: { text: "Melhor Qualidade", color: "bg-accent" },
  melhor_entrada: { text: "Melhor para Começar", color: "bg-primary" },
};

export default function ProductCard({ produto, categoriaSlug }: Props) {
  const badge = produto.destaque ? destaqueLabels[produto.destaque] : null;
  const menorPreco = Math.min(
    ...[produto.preco_ml, produto.preco_shopee, produto.preco_amazon].filter(
      (p): p is number => p !== null && p > 0
    )
  );

  return (
    <Link
      href={`/${categoriaSlug}/${produto.slug}`}
      className="card p-4 flex flex-col group"
    >
      {badge && (
        <span className={`${badge.color} text-white text-xs font-bold px-2 py-1 rounded-full self-start mb-2`}>
          {badge.text}
        </span>
      )}
      <div className="aspect-square bg-neutral-100 rounded-lg flex items-center justify-center mb-3 overflow-hidden">
        {produto.imagem_principal ? (
          <img
            src={produto.imagem_principal}
            alt={produto.nome}
            className="object-contain w-full h-full group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <span className="text-neutral-400 text-4xl">📦</span>
        )}
      </div>
      <h3 className="font-semibold text-neutral-800 group-hover:text-primary transition-colors">
        {produto.nome}
      </h3>
      <p className="text-sm text-neutral-600 mt-1 line-clamp-2">
        {produto.veredicto || `${produto.marca} ${produto.modelo}`}
      </p>
      <div className="mt-auto pt-3 flex items-center justify-between">
        {menorPreco && menorPreco !== Infinity ? (
          <span className="text-lg font-bold text-success">
            R$ {menorPreco.toFixed(2).replace(".", ",")}
          </span>
        ) : (
          <span className="text-sm text-neutral-500">Ver preços</span>
        )}
        <span className="text-xs bg-neutral-100 text-neutral-600 px-2 py-1 rounded">
          {produto.energia}
        </span>
      </div>
    </Link>
  );
}
