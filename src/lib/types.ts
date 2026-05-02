export interface Categoria {
  id: string;
  nome: string;
  slug: string;
  categoria_pai: string | null;
  descricao: string | null;
  icone: string | null;
  ordem: number;
  ativo: boolean;
}

export interface Produto {
  id: string;
  nome: string;
  slug: string;
  marca: string | null;
  modelo: string | null;
  categoria_id: string;
  energia: 'manual' | 'eletrico' | 'bateria' | 'pneumatico';
  tipo_fixador: 'grampeador' | 'pinador' | 'pregador' | 'combo';
  // Specs
  pino_tipo: string | null;
  pino_min_mm: number | null;
  pino_max_mm: number | null;
  peso_kg: number | null;
  psi_min: number | null;
  psi_max: number | null;
  consumo_ar: string | null;
  capacidade_magazine: number | null;
  conexao_ar: string | null;
  // Conteúdo
  veredicto: string | null;
  para_quem: { icon: string; titulo: string; desc: string }[];
  pros: string[];
  contras: string[];
  descricao_longa: string | null;
  // Mídia
  imagem_principal: string | null;
  galeria: string[];
  video_youtube: string | null;
  pdf_catalogo: string | null;
  pdf_vista_explodida: string | null;
  pdf_manual: string | null;
  // Classificação
  nivel: 'hobby' | 'profissional' | 'industrial';
  destaque: 'melhor_custo' | 'melhor_qualidade' | 'melhor_entrada' | null;
  nota: number | null;
  // Preços
  preco_ml: number | null;
  url_ml: string | null;
  preco_shopee: number | null;
  url_shopee: string | null;
  preco_amazon: number | null;
  url_amazon: string | null;
  precos_atualizado_em: string | null;
  // Meta
  ativo: boolean;
  created_at: string;
  updated_at: string;
  // Join
  categoria?: Categoria;
}

export interface Comparativo {
  id: string;
  produto_id: string;
  concorrente_id: string;
  analise: string | null;
  concorrente?: Produto;
}

export interface Post {
  id: string;
  titulo: string;
  slug: string;
  tipo: 'ranking' | 'comparativo' | 'guia' | 'noticia';
  conteudo: string | null;
  resumo: string | null;
  produtos_ids: string[] | null;
  meta_title: string | null;
  meta_description: string | null;
  faq: { pergunta: string; resposta: string }[] | null;
  publicado: boolean;
  publicado_em: string | null;
  created_at: string;
  updated_at: string;
}

export interface WizardRegra {
  id: string;
  espessura: string;
  compressor: string;
  frequencia: string;
  orcamento: string;
  produto_indicado_id: string;
  alternativa_1_id: string | null;
  alternativa_2_id: string | null;
  justificativa: string | null;
  eliminados_texto: string | null;
  produto_indicado?: Produto;
  alternativa_1?: Produto;
  alternativa_2?: Produto;
}
