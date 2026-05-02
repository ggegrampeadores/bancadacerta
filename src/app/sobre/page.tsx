import Link from "next/link";

export const metadata = {
  title: "Sobre",
  description:
    "Conheça o BancadaCerta — guia independente de ferramentas de fixação criado por quem trabalha no setor há mais de 30 anos.",
};

export default function SobrePage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <nav className="text-sm text-neutral-500 mb-6">
        <a href="/" className="hover:text-primary">
          Início
        </a>
        {" / "}
        <span className="text-neutral-800">Sobre</span>
      </nav>

      <h1 className="text-3xl md:text-4xl font-bold text-primary mb-6">
        Sobre o BancadaCerta
      </h1>

      <div className="prose prose-lg max-w-none">
        <p className="text-lg text-neutral-700 leading-relaxed">
          O <strong>BancadaCerta</strong> nasceu de uma constatação simples: quem
          precisa de um grampeador, pinador ou pregador para trabalho profissional
          não encontra informação técnica confiável em português. A maioria dos
          sites repete fichas de catálogo sem nunca ter usado a ferramenta. Nós
          fazemos diferente.
        </p>

        <h2 className="text-2xl font-bold text-primary mt-10 mb-4">
          Quem está por trás
        </h2>
        <p className="text-neutral-700 leading-relaxed">
          O BancadaCerta é mantido por profissionais com mais de 30 anos de
          experiência no mercado de ferramentas de fixação. Conhecemos cada
          modelo por dentro — literalmente. Já desmontamos, testamos e
          comparamos praticamente tudo que existe no mercado brasileiro de
          pinadores, grampeadores e pregadores pneumáticos e a bateria.
        </p>

        <h2 className="text-2xl font-bold text-primary mt-10 mb-4">
          Nossa proposta
        </h2>
        <ul className="space-y-3 text-neutral-700">
          <li className="flex items-start gap-3">
            <span className="text-accent font-bold text-xl mt-0.5">1.</span>
            <span>
              <strong>Independência total:</strong> não representamos nenhuma marca.
              Todas as ferramentas são avaliadas com o mesmo critério, sem
              favoritismo.
            </span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-accent font-bold text-xl mt-0.5">2.</span>
            <span>
              <strong>Conhecimento técnico real:</strong> nossos reviews são
              baseados em experiência prática, não em fichas de catálogo copiadas.
            </span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-accent font-bold text-xl mt-0.5">3.</span>
            <span>
              <strong>Melhor preço sempre visível:</strong> comparamos os preços
              nos principais marketplaces para que você encontre a melhor oferta.
            </span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-accent font-bold text-xl mt-0.5">4.</span>
            <span>
              <strong>Conteúdo para quem trabalha de verdade:</strong> do
              hobby à indústria, nosso guia ajuda cada perfil a encontrar a
              ferramenta certa.
            </span>
          </li>
        </ul>

        <h2 className="text-2xl font-bold text-primary mt-10 mb-4">
          Como nos sustentamos
        </h2>
        <p className="text-neutral-700 leading-relaxed">
          Utilizamos links de afiliado nos principais marketplaces (Mercado Livre,
          Amazon, Shopee). Quando você compra através dos nossos links, recebemos
          uma pequena comissão — sem nenhum custo adicional para você. Isso nos
          permite manter o site funcionando e o conteúdo atualizado.
        </p>
        <p className="text-neutral-700 leading-relaxed mt-3">
          Importante: as comissões <strong>nunca</strong> influenciam nossas
          recomendações. Se um produto é bom, dizemos que é bom. Se tem problemas,
          avisamos. Simples assim.
        </p>

        <h2 className="text-2xl font-bold text-primary mt-10 mb-4">
          O que você encontra aqui
        </h2>
        <div className="grid sm:grid-cols-2 gap-4 not-prose mt-4">
          <div className="card p-5">
            <h3 className="font-bold text-primary mb-2">Reviews detalhados</h3>
            <p className="text-sm text-neutral-600">
              Análise técnica de cada modelo com prós, contras e para quem é
              indicado.
            </p>
          </div>
          <div className="card p-5">
            <h3 className="font-bold text-primary mb-2">Comparativos</h3>
            <p className="text-sm text-neutral-600">
              Lado a lado: veja as diferenças reais entre modelos similares.
            </p>
          </div>
          <div className="card p-5">
            <h3 className="font-bold text-primary mb-2">Rankings</h3>
            <p className="text-sm text-neutral-600">
              Top 5 por categoria — os melhores para cada necessidade e orçamento.
            </p>
          </div>
          <div className="card p-5">
            <h3 className="font-bold text-primary mb-2">Guia consultivo</h3>
            <p className="text-sm text-neutral-600">
              Responda 4 perguntas e descubra qual ferramenta é ideal para você.
            </p>
          </div>
        </div>
      </div>

      {/* CTA */}
      <section className="mt-12 bg-neutral-100 rounded-xl p-8 text-center">
        <h2 className="text-2xl font-bold text-primary mb-3">
          Pronto para encontrar sua ferramenta?
        </h2>
        <p className="text-neutral-600 mb-4">
          Use nosso guia interativo e descubra a ferramenta ideal em menos de 1
          minuto.
        </p>
        <Link href="/guia" className="btn-primary">
          Iniciar o guia
        </Link>
      </section>
    </div>
  );
}
