import type { Produto } from "@/lib/types";

interface Props {
  produto: Produto;
}

interface StoreButton {
  label: string;
  price: number | null;
  url: string | null;
  color: string;
  icon: string;
}

export default function PriceButtons({ produto }: Props) {
  const stores: StoreButton[] = [
    {
      label: "Mercado Livre",
      price: produto.preco_ml,
      url: produto.url_ml,
      color: "bg-[#FFE600] text-neutral-900 hover:bg-[#f5dc00]",
      icon: "🛒",
    },
    {
      label: "Shopee",
      price: produto.preco_shopee,
      url: produto.url_shopee,
      color: "bg-[#EE4D2D] text-white hover:bg-[#d94429]",
      icon: "🧡",
    },
    {
      label: "Amazon",
      price: produto.preco_amazon,
      url: produto.url_amazon,
      color: "bg-[#FF9900] text-neutral-900 hover:bg-[#e68a00]",
      icon: "📦",
    },
  ];

  const available = stores.filter((s) => s.url && s.price && s.price > 0);
  if (available.length === 0) return null;

  // Identify cheapest
  const cheapest = available.reduce((min, s) =>
    (s.price || 999999) < (min.price || 999999) ? s : min
  );

  return (
    <div className="space-y-3">
      <h3 className="font-bold text-lg text-primary">Onde comprar</h3>
      <div className="grid gap-2">
        {available.map((store) => {
          const isCheapest = store === cheapest && available.length > 1;
          return (
            <a
              key={store.label}
              href={store.url!}
              target="_blank"
              rel="noopener noreferrer nofollow"
              className={`${store.color} rounded-lg p-3 flex items-center justify-between font-semibold transition-all duration-200 ${
                isCheapest ? "ring-2 ring-success ring-offset-2 scale-[1.02]" : ""
              }`}
            >
              <span className="flex items-center gap-2">
                <span>{store.icon}</span>
                <span>{store.label}</span>
                {isCheapest && (
                  <span className="text-xs bg-success text-white px-2 py-0.5 rounded-full">
                    Menor preço
                  </span>
                )}
              </span>
              <span className="text-lg">
                R$ {store.price!.toFixed(2).replace(".", ",")}
              </span>
            </a>
          );
        })}
      </div>
      {produto.precos_atualizado_em && (
        <p className="text-xs text-neutral-500 text-center">
          Preços atualizados em{" "}
          {new Date(produto.precos_atualizado_em).toLocaleDateString("pt-BR")}
        </p>
      )}
    </div>
  );
}
