import type { PortfolioItem } from "../../types/influencer";

interface PortfolioProps {
  items: PortfolioItem[];
  onSelect?: (item: PortfolioItem) => void;
}

export default function Portfolio({
  items,
  onSelect,
}: PortfolioProps) {
  return (
    <div className="rounded-2xl bg-white shadow-sm p-6">
      <h2 className="text-base font-semibold text-slate-900 mb-4">
        Portfolio
      </h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        {items.map((item) => (
          <button
            key={item.id}
            onClick={() => onSelect?.(item)}
            className="group relative aspect-square rounded-xl overflow-hidden bg-slate-100"
          >
            <img
              src={item.image}
              alt={item.title}
              className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
            />

            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all flex items-end p-3">
              <span className="text-white text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                {item.title}
              </span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}