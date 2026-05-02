import { notFound } from "next/navigation";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import type { Post } from "@/lib/types";
import FAQ from "@/components/FAQ";

export const revalidate = 3600;

interface Props {
  params: { slug: string };
}

async function getPost(slug: string) {
  const { data } = await supabase
    .from("bc_posts")
    .select("*")
    .eq("slug", slug)
    .eq("publicado", true)
    .single();
  return data as Post | null;
}

async function getOutrosPosts(currentSlug: string) {
  const { data } = await supabase
    .from("bc_posts")
    .select("titulo, slug, tipo")
    .eq("publicado", true)
    .neq("slug", currentSlug)
    .order("publicado_em", { ascending: false })
    .limit(4);
  return (data || []) as Post[];
}

export async function generateMetadata({ params }: Props) {
  const post = await getPost(params.slug);
  if (!post) return {};
  return {
    title: post.meta_title || post.titulo,
    description: post.meta_description || post.resumo || `Leia: ${post.titulo}`,
  };
}

const tipoBadge: Record<string, { label: string; color: string }> = {
  ranking: { label: "Top 5", color: "bg-accent/10 text-accent" },
  comparativo: { label: "Comparativo", color: "bg-primary/10 text-primary" },
  guia: { label: "Guia", color: "bg-green-50 text-green-700" },
  noticia: { label: "Notícia", color: "bg-neutral-100 text-neutral-700" },
};

export default async function PostPage({ params }: Props) {
  const post = await getPost(params.slug);
  if (!post) notFound();

  const outrosPosts = await getOutrosPosts(params.slug);
  const badge = tipoBadge[post.tipo] || tipoBadge.noticia;

  return (
    <article className="max-w-4xl mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <nav className="text-sm text-neutral-500 mb-6">
        <a href="/" className="hover:text-primary">Início</a>
        {" / "}
        <a href="/blog" className="hover:text-primary">Blog</a>
        {" / "}
        <span className="text-neutral-800">{post.titulo}</span>
      </nav>

      {/* Header */}
      <header className="mb-8">
        <span
          className={`inline-block text-xs font-semibold px-2 py-0.5 rounded ${badge.color} mb-3`}
        >
          {badge.label}
        </span>
        <h1 className="text-3xl md:text-4xl font-bold text-primary leading-tight mb-3">
          {post.titulo}
        </h1>
        {post.resumo && (
          <p className="text-lg text-neutral-600">{post.resumo}</p>
        )}
        {post.publicado_em && (
          <p className="text-sm text-neutral-400 mt-3">
            Publicado em{" "}
            {new Date(post.publicado_em).toLocaleDateString("pt-BR", {
              day: "2-digit",
              month: "long",
              year: "numeric",
            })}
          </p>
        )}
      </header>

      {/* Conteúdo */}
      {post.conteudo && (
        <div
          className="prose prose-lg max-w-none mb-12"
          dangerouslySetInnerHTML={{ __html: post.conteudo }}
        />
      )}

      {/* FAQ do post */}
      {post.faq && post.faq.length > 0 && (
        <FAQ items={post.faq} />
      )}

      {/* Outros posts */}
      {outrosPosts.length > 0 && (
        <section className="mt-12 border-t pt-8">
          <h2 className="text-xl font-bold text-primary mb-4">Leia também</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {outrosPosts.map((p) => (
              <Link
                key={p.slug}
                href={`/blog/${p.slug}`}
                className="card p-4 hover:shadow-md transition-shadow group"
              >
                <span
                  className={`inline-block text-xs font-semibold px-2 py-0.5 rounded ${(tipoBadge[p.tipo] || tipoBadge.noticia).color} mb-2`}
                >
                  {(tipoBadge[p.tipo] || tipoBadge.noticia).label}
                </span>
                <h3 className="font-semibold group-hover:text-accent transition-colors">
                  {p.titulo}
                </h3>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="mt-12 bg-neutral-100 rounded-xl p-8 text-center">
        <h2 className="text-2xl font-bold text-primary mb-3">Quer ajuda para escolher?</h2>
        <p className="text-neutral-600 mb-4">
          Use nosso guia interativo e descubra a ferramenta ideal em menos de 1 minuto.
        </p>
        <Link href="/guia" className="btn-primary">
          Iniciar o guia
        </Link>
      </section>
    </article>
  );
}
