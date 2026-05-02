import { notFound } from "next/navigation";
import { supabase } from "@/lib/supabase";
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
  return data;
}

export async function generateMetadata({ params }: Props) {
  const post = await getPost(params.slug);
  if (!post) return {};
  return {
    title: post.meta_title || post.titulo,
    description: post.meta_description || post.resumo,
  };
}

export default async function PostPage({ params }: Props) {
  const post = await getPost(params.slug);
  if (!post) notFound();

  return (
    <article className="max-w-3xl mx-auto px-4 py-12">
      <nav className="text-sm text-neutral-500 mb-6">
        <a href="/" className="hover:text-primary">Início</a>
        {" / "}
        <a href="/blog" className="hover:text-primary">Blog</a>
        {" / "}
        <span className="text-neutral-800">{post.titulo}</span>
      </nav>

      <h1 className="text-3xl md:text-4xl font-bold text-primary mb-4">{post.titulo}</h1>
      
      {post.publicado_em && (
        <p className="text-neutral-500 text-sm mb-8">
          Publicado em {new Date(post.publicado_em).toLocaleDateString("pt-BR")}
        </p>
      )}

      <div
        className="prose prose-neutral max-w-none"
        dangerouslySetInnerHTML={{ __html: post.conteudo || "" }}
      />

      <FAQ items={post.faq || []} />
    </article>
  );
}
