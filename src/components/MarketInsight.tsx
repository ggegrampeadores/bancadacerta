interface Props {
  status: string | null;
  dica: string | null;
}

const statusConfig: Record<string, { label: string; color: string; icon: string }> = {
  queridinho: { label: "Queridinho do mercado", color: "bg-amber-100 text-amber-800 border-amber-200", icon: "⭐" },
  descontinuado: { label: "Descontinuado", color: "bg-red-100 text-red-800 border-red-200", icon: "⚠️" },
  novidade: { label: "Novidade", color: "bg-blue-100 text-blue-800 border-blue-200", icon: "🆕" },
  classico: { label: "Clássico do mercado", color: "bg-green-100 text-green-800 border-green-200", icon: "🏆" },
  nicho: { label: "Produto de nicho", color: "bg-purple-100 text-purple-800 border-purple-200", icon: "🎯" },
};

export default function MarketInsight({ status, dica }: Props) {
  if (!status && !dica) return null;

  const config = status ? statusConfig[status] : null;

  return (
    <div className="mb-6">
      {config && (
        <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full border text-sm font-medium ${config.color} mb-3`}>
          <span>{config.icon}</span>
          <span>{config.label}</span>
        </div>
      )}
      {dica && (
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mt-2">
          <p className="text-sm font-medium text-amber-900 flex items-center gap-2">
            <span>💡</span> Dica de quem conhece o mercado
          </p>
          <p className="text-sm text-amber-800 mt-1">{dica}</p>
        </div>
      )}
    </div>
  );
}
