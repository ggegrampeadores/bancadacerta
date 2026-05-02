interface FAQItem {
  pergunta: string;
  resposta: string;
}

interface Props {
  items: FAQItem[];
  title?: string;
}

export default function FAQ({ items, title = "Perguntas Frequentes" }: Props) {
  if (!items || items.length === 0) return null;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.pergunta,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.resposta,
      },
    })),
  };

  return (
    <section className="mb-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <h2 className="section-title mb-6">{title}</h2>
      <div className="space-y-4">
        {items.map((item, i) => (
          <details
            key={i}
            className="card group"
          >
            <summary className="cursor-pointer p-4 font-medium text-neutral-800 hover:text-primary transition-colors list-none flex items-center justify-between">
              <span>{item.pergunta}</span>
              <svg
                className="w-5 h-5 text-neutral-400 group-open:rotate-180 transition-transform"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </summary>
            <div className="px-4 pb-4 text-neutral-600 text-sm leading-relaxed border-t border-neutral-100 pt-3">
              {item.resposta}
            </div>
          </details>
        ))}
      </div>
    </section>
  );
}
