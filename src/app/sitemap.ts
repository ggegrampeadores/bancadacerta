import { MetadataRoute } from "next";
import { supabase } from "@/lib/supabase";

const BASE_URL = "https://bancadacerta.com.br";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Páginas estáticas
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${BASE_URL}/blog`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/guia`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/sobre`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
    },
  ];

  // Categorias
  const { data: categorias } = await supabase
    .from("bc_categorias")
    .select("slug, updated_at")
    .eq("ativo", true);

  const categoriasPages: MetadataRoute.Sitemap = (categorias || []).map((cat) => ({
    url: `${BASE_URL}/${cat.slug}`,
    lastModified: cat.updated_at ? new Date(cat.updated_at) : new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  // Produtos (com join na categoria para pegar o slug)
  const { data: produtos } = await supabase
    .from("bc_produtos")
    .select("slug, updated_at, categoria:bc_categorias(slug)")
    .eq("ativo", true);

  const produtosPages: MetadataRoute.Sitemap = (produtos || []).map((prod: any) => ({
    url: `${BASE_URL}/${prod.categoria?.slug || "produto"}/${prod.slug}`,
    lastModified: prod.updated_at ? new Date(prod.updated_at) : new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  // Blog posts
  const { data: posts } = await supabase
    .from("bc_posts")
    .select("slug, updated_at")
    .eq("publicado", true);

  const postPages: MetadataRoute.Sitemap = (posts || []).map((post) => ({
    url: `${BASE_URL}/blog/${post.slug}`,
    lastModified: post.updated_at ? new Date(post.updated_at) : new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  return [...staticPages, ...categoriasPages, ...produtosPages, ...postPages];
}
