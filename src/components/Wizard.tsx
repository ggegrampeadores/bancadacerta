"use client";
import { useState } from "react";
import { supabase } from "@/lib/supabase";
import type { Produto } from "@/lib/types";

interface Step {
  id: string;
  titulo: string;
  descricao: string;
  opcoes: { value: string; label: string; icon: string; desc: string }[];
}

const steps: Step[] = [
  {
    id: "espessura",
    titulo: "Qual espessura do material?",
    descricao: "Pense no material mais grosso que você fixa regularmente.",
    opcoes: [
      { value: "0-5", label: "Até 5mm", icon: "📄", desc: "Tecido, papel, fórmica fina" },
      { value: "5-10", label: "5 a 10mm", icon: "📏", desc: "Compensado fino, MDF, estofado" },
      { value: "10-20", label: "10 a 20mm", icon: "🪵", desc: "MDF grosso, madeira, rodapé" },
      { value: "20-30", label: "Acima de 20mm", icon: "🏗️", desc: "Madeira maciça, estrutural, batente" },
    ],
  },
  {
    id: "compressor",
    titulo: "Tem compressor de ar?",
    descricao: "Ferramentas pneumáticas precisam de compressor.",
    opcoes: [
      { value: "sim", label: "Sim, tenho", icon: "✅", desc: "Já tenho compressor funcionando" },
      { value: "vou_comprar", label: "Vou comprar", icon: "🛒", desc: "Pretendo investir em um" },
      { value: "nao", label: "Não tenho", icon: "❌", desc: "Não quero depender de compressor" },
    ],
  },
  {
    id: "frequencia",
    titulo: "Com que frequência usa?",
    descricao: "Isso define a durabilidade necessária.",
    opcoes: [
      { value: "hobby", label: "Eventual", icon: "🏠", desc: "Fim de semana, projetos pessoais" },
      { value: "regular", label: "Regular", icon: "🔨", desc: "Usa toda semana, trabalho secundário" },
      { value: "intenso", label: "Uso intenso", icon: "🏭", desc: "Profissional, o dia todo" },
    ],
  },
  {
    id: "orcamento",
    titulo: "Qual seu orçamento?",
    descricao: "Faixa de investimento para a ferramenta.",
    opcoes: [
      { value: "ate200", label: "Até R$200", icon: "💵", desc: "Entrada, básico" },
      { value: "200-500", label: "R$200 a R$500", icon: "💰", desc: "Intermediário, bom custo-benefício" },
      { value: "acima500", label: "Acima de R$500", icon: "💎", desc: "Profissional, sem limitação" },
    ],
  },
];

interface Resultado {
  produto: Produto;
  alternativas: Produto[];
  justificativa: string | null;
  eliminados: string | null;
}

export default function Wizard() {
  const [currentStep, setCurrentStep] = useState(0);
  const [respostas, setRespostas] = useState<Record<string, string>>({});
  const [resultado, setResultado] = useState<Resultado | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSelect = async (value: string) => {
    const step = steps[currentStep];
    const newRespostas = { ...respostas, [step.id]: value };
    setRespostas(newRespostas);

    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // Buscar resultado
      setLoading(true);
      const { data } = await supabase
        .from("bc_wizard_regras")
        .select(`
          *,
          produto_indicado:produto_indicado_id(*),
          alternativa_1:alternativa_1_id(*),
          alternativa_2:alternativa_2_id(*)
        `)
        .eq("espessura", newRespostas.espessura)
        .eq("compressor", newRespostas.compressor)
        .eq("frequencia", newRespostas.frequencia)
        .eq("orcamento", newRespostas.orcamento)
        .single();

      if (data) {
        setResultado({
          produto: data.produto_indicado,
          alternativas: [data.alternativa_1, data.alternativa_2].filter(Boolean),
          justificativa: data.justificativa,
          eliminados: data.eliminados_texto,
        });
      }
      setLoading(false);
    }
  };

  const reset = () => {
    setCurrentStep(0);
    setRespostas({});
    setResultado(null);
  };

  if (loading) {
    return (
      <div className="text-center py-16">
        <div className="animate-spin w-12 h-12 border-4 border-accent border-t-transparent rounded-full mx-auto" />
        <p className="mt-4 text-neutral-600">Analisando suas respostas...</p>
      </div>
    );
  }

  if (resultado) {
    return (
      <div className="max-w-2xl mx-auto">
        <div className="bg-green-50 border border-green-200 rounded-xl p-6 mb-6">
          <h3 className="text-xl font-bold text-success mb-2">Nossa Recomendação</h3>
          <div className="flex items-center gap-4">
            {resultado.produto.imagem_principal && (
              <img src={resultado.produto.imagem_principal} alt="" className="w-24 h-24 object-contain" />
            )}
            <div>
              <p className="text-2xl font-bold text-primary">{resultado.produto.nome}</p>
              <p className="text-neutral-600">{resultado.produto.marca} {resultado.produto.modelo}</p>
              {resultado.produto.preco_ml && (
                <p className="text-success font-bold mt-1">
                  R$ {resultado.produto.preco_ml.toFixed(2).replace(".", ",")}
                </p>
              )}
            </div>
          </div>
          {resultado.justificativa && (
            <p className="mt-4 text-neutral-700">{resultado.justificativa}</p>
          )}
          {resultado.produto.url_ml && (
            <a href={resultado.produto.url_ml} target="_blank" rel="noopener noreferrer nofollow"
              className="btn-primary mt-4 w-full justify-center">
              Ver no Mercado Livre
            </a>
          )}
        </div>

        {resultado.alternativas.length > 0 && (
          <div className="mb-6">
            <h4 className="font-semibold text-neutral-700 mb-3">Alternativas</h4>
            <div className="space-y-3">
              {resultado.alternativas.map((alt) => (
                <div key={alt.id} className="card p-4 flex items-center justify-between">
                  <div>
                    <p className="font-medium">{alt.nome}</p>
                    {alt.preco_ml && (
                      <p className="text-sm text-success">R$ {alt.preco_ml.toFixed(2).replace(".", ",")}</p>
                    )}
                  </div>
                  <a href={`/pinadores-pneumaticos/${alt.slug}`} className="text-accent text-sm font-medium">
                    Ver review →
                  </a>
                </div>
              ))}
            </div>
          </div>
        )}

        {resultado.eliminados && (
          <div className="bg-neutral-100 rounded-xl p-4 mb-6">
            <h4 className="font-semibold text-neutral-700 mb-2">O que foi descartado e por quê</h4>
            <p className="text-sm text-neutral-600">{resultado.eliminados}</p>
          </div>
        )}

        <button onClick={reset} className="text-accent font-medium hover:underline">
          ← Refazer o guia
        </button>
      </div>
    );
  }

  const step = steps[currentStep];

  return (
    <div className="max-w-2xl mx-auto">
      {/* Progress */}
      <div className="flex gap-2 mb-8">
        {steps.map((_, i) => (
          <div
            key={i}
            className={`h-2 flex-1 rounded-full transition-colors ${
              i <= currentStep ? "bg-accent" : "bg-neutral-200"
            }`}
          />
        ))}
      </div>

      <p className="text-sm text-neutral-500 mb-2">
        Passo {currentStep + 1} de {steps.length}
      </p>
      <h2 className="text-2xl font-bold text-primary mb-2">{step.titulo}</h2>
      <p className="text-neutral-600 mb-6">{step.descricao}</p>

      <div className="grid gap-3">
        {step.opcoes.map((opt) => (
          <button
            key={opt.value}
            onClick={() => handleSelect(opt.value)}
            className="card p-4 text-left hover:border-accent hover:shadow-md transition-all flex items-center gap-4 group"
          >
            <span className="text-3xl">{opt.icon}</span>
            <div>
              <p className="font-semibold group-hover:text-accent transition-colors">{opt.label}</p>
              <p className="text-sm text-neutral-500">{opt.desc}</p>
            </div>
          </button>
        ))}
      </div>

      {currentStep > 0 && (
        <button
          onClick={() => setCurrentStep(currentStep - 1)}
          className="mt-4 text-neutral-500 hover:text-primary text-sm"
        >
          ← Voltar
        </button>
      )}
    </div>
  );
}
