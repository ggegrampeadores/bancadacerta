import { notFound } from "next/navigation";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import type { Categoria, Produto } from "@/lib/types";
import ProductCard from "@/components/ProductCard";
import FAQ from "@/components/FAQ";

export const revalidate = 3600;

interface Props {
  params: { categoria: string };
}

async function getCategoria(slug: string) {
  const { data } = await supabase
    .from("bc_categorias")
    .select("*")
    .eq("slug", slug)
    .eq("ativo", true)
    .single();
  return data as Categoria | null;
}

async function getProdutos(categoriaId: string) {
  const { data } = await supabase
    .from("bc_produtos")
    .select("*")
    .eq("categoria_id", categoriaId)
    .eq("ativo", true)
    .order("nota", { ascending: false });
  return (data || []) as Produto[];
}

export async function generateMetadata({ params }: Props) {
  const cat = await getCategoria(params.categoria);
  if (!cat) return {};
  return {
    title: cat.nome,
    description: cat.descricao || `Melhores ${cat.nome.toLowerCase()} — comparativo e reviews completos.`,
  };
}

export default async function CategoriaPage({ params }: Props) {
  const categoria = await getCategoria(params.categoria);
  if (!categoria) notFound();

  const produtos = await getProdutos(categoria.id);

  const top3 = produtos.filter((p) => p.destaque).slice(0, 3);
  const medalhas = ["🥇", "🥈", "🥉"];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <nav className="text-sm text-neutral-500 mb-6">
        <a href="/" className="hover:text-primary">Início</a>
        {" / "}
        <span className="text-neutral-800">{categoria.nome}</span>
      </nav>

      <h1 className="text-3xl md:text-4xl font-bold text-primary mb-2">{categoria.nome}</h1>
      {categoria.descricao && (
        <p className="text-neutral-600 text-lg mb-8 max-w-3xl">{categoria.descricao}</p>
      )}

      {/* Top 3 */}
      {top3.length > 0 && (
        <section className="mb-12">
          <h2 className="section-title mb-6">Top Recomendações</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {top3.map((p, i) => (
              <div key={p.id} className="card p-5 relative">
                <span className="absolute -top-3 -left-3 text-3xl">{medalhas[i]}</span>
                <Link href={`/${categoria.slug}/${p.slug}`} className="block group">
                  <div className="aspect-[4/3] bg-neutral-100 rounded-lg mb-3 flex items-center justify-center overflow-hidden">
                    {p.imagem_principal ? (
                      <img src={p.imagem_principal} alt={p.nome} className="object-contain w-full h-full" />
                    ) : (
                      <span className="text-4xl text-neutral-300">📦</span>
                    )}
                  </div>
                  <h3 className="font-bold text-lg group-hover:text-accent transition-colors">{p.nome}</h3>
                  <p className="text-sm text-neutral-600 mt-1">{p.veredicto}</p>
                  {p.preco_ml && (
                    <p className="mt-2 text-success font-bold">
                      R$ {p.preco_ml.toFixed(2).replace(".", ",")}
                    </p>
                  )}
                </Link>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Grid todos produtos */}
      <section>
        <h2 className="section-title mb-6">
          Todos os {categoria.nome} ({produtos.length})
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {produtos.map((p) => (
            <ProductCard key={p.id} produto={p} categoriaSlug={categoria.slug} />
          ))}
        </div>
        {produtos.length === 0 && (
          <p className="text-neutral-500 text-center py-12">
            Estamos preparando os reviews para esta categoria. Volte em breve!
          </p>
        )}
      </section>

      {/* FAQ SEO */}
      <FAQ items={(categoria as any).faq || []} />

      {/* CTA */}
      <section className="mt-12 bg-neutral-100 rounded-xl p-8 text-center">
        <h2 className="text-2xl font-bold text-primary mb-3">Não sabe qual escolher?</h2>
        <p className="text-neutral-600 mb-4">
          Use nosso guia consultivo e descubra a melhor opção para seu caso.
        </p>
        <Link href="/guia" className="btn-primary">
          Iniciar o guia
        </Link>
      </section>
    </div>
  );
}
