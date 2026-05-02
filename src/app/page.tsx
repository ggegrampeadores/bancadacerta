import Link from "next/link";
import { supabase } from "@/lib/supabase";
import type { Categoria, Produto } from "@/lib/types";
import ProductCard from "@/components/ProductCard";

export const revalidate = 3600; // ISR: 1 hora

async function getCategorias() {
  const { data } = await supabase
    .from("bc_categorias")
    .select("*")
    .eq("ativo", true)
    .is("categoria_pai", null)
    .order("ordem");
  return (data || []) as Categoria[];
}

async function getDestaques() {
  const { data } = await supabase
    .from("bc_produtos")
    .select("*, categoria:bc_categorias(slug)")
    .eq("ativo", true)
    .not("destaque", "is", null)
    .order("nota", { ascending: false })
    .limit(6);
  return (data || []) as (Produto & { categoria: { slug: string } })[];
}

export default async function Home() {
  const [categorias, destaques] = await Promise.all([
    getCategorias(),
    getDestaques(),
  ]);

  return (
    <>
      {/* Hero */}
      <section className="bg-primary text-white py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-5xl font-bold leading-tight">
            O guia definitivo de{" "}
            <span className="text-accent">ferramentas de fixação</span>
          </h1>
          <p className="mt-4 text-lg md:text-xl text-neutral-300 max-w-2xl mx-auto">
            Reviews técnicos, comparativos e recomendações para grampeadores,
            pinadores e pregadores. Por quem entende há mais de 30 anos.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/guia" className="btn-primary text-lg">
              Qual ferramenta comprar?
            </Link>
            <Link
              href="#categorias"
              className="border border-white/30 hover:bg-white/10 text-white font-medium py-3 px-6 rounded-lg transition-colors"
            >
              Ver categorias
            </Link>
          </div>
        </div>
      </section>

      {/* Destaques */}
      {destaques.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 py-12">
          <h2 className="section-title mb-8">Destaques</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {destaques.map((p) => (
              <ProductCard
                key={p.id}
                produto={p}
                categoriaSlug={p.categoria?.slug || "produto"}
              />
            ))}
          </div>
        </section>
      )}

      {/* Categorias */}
      <section id="categorias" className="max-w-7xl mx-auto px-4 py-12">
        <h2 className="section-title mb-8">Categorias</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {categorias.map((cat) => (
            <Link
              key={cat.id}
              href={`/${cat.slug}`}
              className="card p-6 text-center hover:border-accent group"
            >
              <span className="text-4xl block mb-3">{cat.icone || "🔧"}</span>
              <h3 className="font-semibold text-neutral-800 group-hover:text-accent transition-colors">
                {cat.nome}
              </h3>
            </Link>
          ))}
        </div>
      </section>

      {/* CTA Wizard */}
      <section className="bg-neutral-100 py-12">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="section-title mb-4">Não sabe qual escolher?</h2>
          <p className="text-neutral-600 mb-6">
            Responda 4 perguntas e descubra a ferramenta ideal para o seu trabalho.
          </p>
          <Link href="/guia" className="btn-primary text-lg">
            Iniciar o guia consultivo
          </Link>
        </div>
      </section>
    </>
  );
}
