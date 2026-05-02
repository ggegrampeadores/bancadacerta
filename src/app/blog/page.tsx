import Link from "next/link";
import { supabase } from "@/lib/supabase";
import type { Metadata } from "next";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Blog — Comparativos, Dicas e Novidades",
  description: "Artigos sobre ferramentas de fixação: comparativos, guias de compra, dicas de uso e novidades do mercado.",
};

interface Post {
  id: string;
  titulo: string;
  slug: string;
  tipo: string;
  resumo: string | null;
  publicado_em: string;
}

const tipoLabels: Record<string, { label: string; color: string }> = {
  comparativo: { label: "Comparativo", color: "bg-blue-100 text-blue-800" },
  guia: { label: "Guia", color: "bg-green-100 text-green-800" },
  novidade: { label: "Novidade", color: "bg-purple-100 text-purple-800" },
  dica: { label: "Dica", color: "bg-amber-100 text-amber-800" },
  ranking: { label: "Ranking", color: "bg-red-100 text-red-800" },
};

export default async function BlogPage() {
  const { data: posts } = await supabase
    .from("bc_posts")
    .select("id, titulo, slug, tipo, resumo, publicado_em")
    .eq("publicado", true)
    .order("publicado_em", { ascending: false });

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h1 className="text-3xl md:text-4xl font-bold text-primary mb-2">Blog</h1>
      <p className="text-neutral-600 text-lg mb-8">
        Comparativos, dicas de uso e novidades do mercado de ferramentas de fixação.
      </p>

      {posts && posts.length > 0 ? (
        <div className="grid gap-6">
          {posts.map((post: Post) => {
            const badge = tipoLabels[post.tipo];
            return (
              <Link
                key={post.id}
                href={`/blog/${post.slug}`}
                className="card p-6 hover:border-accent group"
              >
                <div className="flex items-center gap-3 mb-2">
                  {badge && (
                    <span className={`text-xs font-semibold px-2 py-1 rounded-full ${badge.color}`}>
                      {badge.label}
                    </span>
                  )}
                  {post.publicado_em && (
                    <span className="text-xs text-neutral-500">
                      {new Date(post.publicado_em).toLocaleDateString("pt-BR")}
                    </span>
                  )}
                </div>
                <h2 className="text-xl font-semibold group-hover:text-accent transition-colors">
                  {post.titulo}
                </h2>
                {post.resumo && (
                  <p className="text-neutral-600 mt-2 line-clamp-2">{post.resumo}</p>
                )}
              </Link>
            );
          })}
        </div>
      ) : (
        <p className="text-neutral-500 text-center py-12">
          Estamos preparando conteúdo incrível. Volte em breve!
        </p>
      )}
    </div>
  );
}
