interface Props {
  pros: string[];
  contras: string[];
}

export default function ProsCons({ pros, contras }: Props) {
  if (!pros.length && !contras.length) return null;

  return (
    <div className="grid md:grid-cols-2 gap-4">
      {pros.length > 0 && (
        <div className="bg-green-50 border border-green-200 rounded-xl p-5">
          <h4 className="font-bold text-success flex items-center gap-2 mb-3">
            <span className="text-lg">✓</span> Pontos Fortes
          </h4>
          <ul className="space-y-2">
            {pros.map((p, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-neutral-700">
                <span className="text-success mt-0.5">•</span>
                {p}
              </li>
            ))}
          </ul>
        </div>
      )}
      {contras.length > 0 && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-5">
          <h4 className="font-bold text-danger flex items-center gap-2 mb-3">
            <span className="text-lg">✗</span> Pontos Fracos
          </h4>
          <ul className="space-y-2">
            {contras.map((c, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-neutral-700">
                <span className="text-danger mt-0.5">•</span>
                {c}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
