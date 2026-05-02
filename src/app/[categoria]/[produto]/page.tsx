import { notFound } from "next/navigation";
import { supabase } from "@/lib/supabase";
import type { Produto, Comparativo } from "@/lib/types";
import Gallery from "@/components/Gallery";
import PriceButtons from "@/components/PriceButtons";
import ProsCons from "@/components/ProsCons";
import FAQ from "@/components/FAQ";
import MarketInsight from "@/components/MarketInsight";

export const revalidate = 3600;

interface Props {
  params: { categoria: string; produto: string };
}

async function getProduto(slug: string) {
  const { data } = await supabase
    .from("bc_produtos")
    .select("*, categoria:bc_categorias(*)")
    .eq("slug", slug)
    .eq("ativo", true)
    .single();
  return data as (Produto & { categoria: { nome: string; slug: string } }) | null;
}

async function getComparativos(produtoId: string) {
  const { data } = await supabase
    .from("bc_comparativos")
    .select("*, concorrente:concorrente_id(nome, slug, marca, nota, preco_ml, destaque)")
    .eq("produto_id", produtoId);
  return (data || []) as Comparativo[];
}

export async function generateMetadata({ params }: Props) {
  const produto = await getProduto(params.produto);
  if (!produto) return {};
  return {
    title: `${produto.nome} — Review Completo`,
    description: produto.veredicto || `Análise técnica completa do ${produto.nome}`,
  };
}

export default async function ProdutoPage({ params }: Props) {
  const produto = await getProduto(params.produto);
  if (!produto) notFound();

  const comparativos = await getComparativos(produto.id);

  const allImages = [
    produto.imagem_principal,
    ...(produto.galeria || []),
  ].filter(Boolean) as string[];

  const specs = [
    { label: "Tipo de pino/grampo", value: produto.pino_tipo },
    { label: "Comprimento", value: produto.pino_min_mm && produto.pino_max_mm ? `${produto.pino_min_mm}–${produto.pino_max_mm}mm` : null },
    { label: "Peso", value: produto.peso_kg ? `${produto.peso_kg} kg` : null },
    { label: "Pressão", value: produto.psi_min && produto.psi_max ? `${produto.psi_min}–${produto.psi_max} PSI` : null },
    { label: "Consumo de ar", value: produto.consumo_ar },
    { label: "Magazine", value: produto.capacidade_magazine ? `${produto.capacidade_magazine} pinos` : null },
    { label: "Conexão", value: produto.conexao_ar },
    { label: "Energia", value: produto.energia },
  ].filter((s) => s.value);

  return (
    <article className="max-w-7xl mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <nav className="text-sm text-neutral-500 mb-6">
        <a href="/" className="hover:text-primary">Início</a>
        {" / "}
        <a href={`/${produto.categoria?.slug}`} className="hover:text-primary">
          {produto.categoria?.nome}
        </a>
        {" / "}
        <span className="text-neutral-800">{produto.nome}</span>
      </nav>

      {/* Top section: Gallery + Info */}
      <div className="grid lg:grid-cols-2 gap-8 mb-12">
        <Gallery images={allImages} alt={produto.nome} />
        <div>
          <h1 className="text-3xl font-bold text-primary mb-2">{produto.nome}</h1>
          <p className="text-neutral-600 mb-4">
            {produto.marca} {produto.modelo}
          </p>
          {produto.veredicto && (
            <p className="text-lg text-neutral-700 mb-6 border-l-4 border-accent pl-4">
              {produto.veredicto}
            </p>
          )}
          {produto.nota && (
            <div className="flex items-center gap-2 mb-6">
              <span className="text-3xl font-bold text-accent">{produto.nota.toFixed(1)}</span>
              <span className="text-neutral-500">/10</span>
            </div>
          )}
          <PriceButtons produto={produto} />
        </div>
      </div>

      {/* Para quem */}
      {produto.para_quem && produto.para_quem.length > 0 && (
        <section className="mb-12">
          <h2 className="section-title mb-4">Para quem é</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {produto.para_quem.map((pq, i) => (
              <div key={i} className="card p-4">
                <span className="text-2xl">{pq.icon}</span>
                <h4 className="font-semibold mt-2">{pq.titulo}</h4>
                <p className="text-sm text-neutral-600 mt-1">{pq.desc}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Prós e Contras */}
      <section className="mb-12">
        <h2 className="section-title mb-4">Prós e Contras</h2>
        <ProsCons pros={produto.pros || []} contras={produto.contras || []} />
      </section>

      {/* Specs */}
      {specs.length > 0 && (
        <section className="mb-12">
          <h2 className="section-title mb-4">Especificações</h2>
          <div className="card overflow-hidden">
            <table className="w-full">
              <tbody>
                {specs.map((s, i) => (
                  <tr key={i} className={i % 2 === 0 ? "bg-neutral-50" : ""}>
                    <td className="px-4 py-3 font-medium text-neutral-700 w-1/3">{s.label}</td>
                    <td className="px-4 py-3">{s.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}

      {/* Vídeo */}
      {produto.video_youtube && (
        <section className="mb-12">
          <h2 className="section-title mb-4">Vídeo</h2>
          <div className="aspect-video rounded-xl overflow-hidden">
            <iframe
              src={`https://www.youtube.com/embed/${produto.video_youtube}`}
              className="w-full h-full"
              allowFullScreen
              title={`Vídeo ${produto.nome}`}
            />
          </div>
        </section>
      )}

      {/* PDFs */}
      {(produto.pdf_catalogo || produto.pdf_vista_explodida || produto.pdf_manual) && (
        <section className="mb-12">
          <h2 className="section-title mb-4">Documentos</h2>
          <div className="flex flex-wrap gap-3">
            {produto.pdf_catalogo && (
              <a href={produto.pdf_catalogo} target="_blank" rel="noopener" className="btn-secondary flex items-center gap-2">
                📄 Catálogo PDF
              </a>
            )}
            {produto.pdf_vista_explodida && (
              <a href={produto.pdf_vista_explodida} target="_blank" rel="noopener" className="btn-secondary flex items-center gap-2">
                🔩 Vista Explodida
              </a>
            )}
            {produto.pdf_manual && (
              <a href={produto.pdf_manual} target="_blank" rel="noopener" className="btn-secondary flex items-center gap-2">
                📘 Manual
              </a>
            )}
          </div>
        </section>
      )}

      {/* Market Insight */}
      <MarketInsight status={(produto as any).status_mercado} dica={(produto as any).dica_mercado} />

      {/* Comparativos */}
      {comparativos.length > 0 && (
        <section className="mb-12">
          <h2 className="section-title mb-4">Comparativo</h2>
          <div className="space-y-4">
            {comparativos.map((comp) => (
              <div key={comp.id} className="card p-4 flex items-center justify-between">
                <div>
                  <span className="font-semibold">{(comp.concorrente as any)?.nome}</span>
                  {comp.analise && (
                    <p className="text-sm text-neutral-600 mt-1">{comp.analise}</p>
                  )}
                </div>
                <a
                  href={`/${params.categoria}/${(comp.concorrente as any)?.slug}`}
                  className="text-accent font-medium text-sm hover:underline"
                >
                  Ver review →
                </a>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* FAQ */}
      <FAQ items={(produto as any).faq || []} />

      {/* CTA final */}
      <section className="bg-primary text-white rounded-xl p-8 text-center">
        <h2 className="text-2xl font-bold mb-3">Decidiu?</h2>
        <p className="text-neutral-300 mb-6">Compre pelo melhor preço com nossos links verificados.</p>
        <PriceButtons produto={produto} />
      </section>
    </article>
  );
}
