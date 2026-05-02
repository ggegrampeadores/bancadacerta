import Link from "next/link";
import { supabase } from "@/lib/supabase";
import type { Post } from "@/lib/types";

export const revalidate = 3600;

export const metadata = {
  title: "Blog",
  description:
    "Artigos, comparativos e rankings sobre grampeadores, pinadores e ferramentas de fixação. Conteúdo independente para ajudar sua escolha.",
};

async function getPosts() {
  const { data } = await supabase
    .from("bc_posts")
    .select("id, titulo, slug, tipo, resumo, publicado_em")
    .eq("publicado", true)
    .order("publicado_em", { ascending: false });
  return (data || []) as Post[];
}

const tipoBadge: Record<string, { label: string; color: string }> = {
  ranking: { label: "Top 5", color: "bg-accent/10 text-accent" },
  comparativo: { label: "Comparativo", color: "bg-primary/10 text-primary" },
  guia: { label: "Guia", color: "bg-green-50 text-green-700" },
  noticia: { label: "Notícia", color: "bg-neutral-100 text-neutral-700" },
};

export default async function BlogPage() {
  const posts = await getPosts();

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <nav className="text-sm text-neutral-500 mb-6">
        <a href="/" className="hover:text-primary">Início</a>
        {" / "}
        <span className="text-neutral-800">Blog</span>
      </nav>

      <h1 className="text-3xl md:text-4xl font-bold text-primary mb-2">Blog</h1>
      <p className="text-neutral-600 text-lg mb-10 max-w-3xl">
        Comparativos, rankings e guias para ajudar você a escolher a ferramenta de fixação certa.
      </p>

      {posts.length === 0 ? (
        <p className="text-neutral-500 text-center py-12">
          Em breve teremos artigos por aqui. Volte logo!
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => {
            const badge = tipoBadge[post.tipo] || tipoBadge.noticia;
            return (
              <Link
                key={post.id}
                href={`/blog/${post.slug}`}
                className="card p-5 group hover:shadow-lg transition-shadow"
              >
                <span
                  className={`inline-block text-xs font-semibold px-2 py-0.5 rounded ${badge.color} mb-3`}
                >
                  {badge.label}
                </span>
                <h2 className="font-bold text-lg group-hover:text-accent transition-colors leading-snug mb-2">
                  {post.titulo}
                </h2>
                {post.resumo && (
                  <p className="text-sm text-neutral-600 line-clamp-3">{post.resumo}</p>
                )}
                {post.publicado_em && (
                  <p className="text-xs text-neutral-400 mt-3">
                    {new Date(post.publicado_em).toLocaleDateString("pt-BR", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })}
                  </p>
                )}
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
