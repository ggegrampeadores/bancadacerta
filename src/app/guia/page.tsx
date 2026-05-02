import type { Metadata } from "next";
import Wizard from "@/components/Wizard";

export const metadata: Metadata = {
  title: "Guia Consultivo — Qual Ferramenta Comprar?",
  description: "Responda 4 perguntas e descubra o grampeador, pinador ou pregador ideal para seu trabalho.",
};

export default function GuiaPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-bold text-primary">
          Qual ferramenta de fixação comprar?
        </h1>
        <p className="mt-3 text-neutral-600 text-lg max-w-2xl mx-auto">
          Responda 4 perguntas rápidas e receba uma recomendação personalizada
          baseada em 30+ anos de experiência no mercado.
        </p>
      </div>
      <Wizard />
    </div>
  );
}
