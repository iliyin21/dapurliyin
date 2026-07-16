import { Flame, Beef, Wheat, Droplet } from "lucide-react";

import type { NutritionInfo } from "@/data/recipes";

interface NutritionCardProps {
  nutrition?: NutritionInfo;
}

export default function NutritionCard({ nutrition }: NutritionCardProps) {
  if (!nutrition) return null;

  const items = [
    { icon: Flame, label: "Kalori", value: nutrition.calories, color: "bg-orange-100 text-orange-600" },
    { icon: Beef, label: "Protein", value: nutrition.protein, color: "bg-red-100 text-red-600" },
    { icon: Wheat, label: "Karbohidrat", value: nutrition.carbs, color: "bg-amber-100 text-amber-600" },
    { icon: Droplet, label: "Lemak", value: nutrition.fat, color: "bg-blue-100 text-blue-600" },
  ];

  return (
    <section className="rounded-3xl border bg-white p-6 shadow-sm md:p-8">
      <div className="mb-6">
        <h2 className="text-2xl font-bold">Informasi Nutrisi</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Perkiraan nilai gizi per porsi.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        {items.map((item) => {
          const Icon = item.icon;
          return (
            <div
              key={item.label}
              className="flex flex-col items-center gap-2 rounded-2xl bg-gray-50 p-4 text-center"
            >
              <div className={`flex h-10 w-10 items-center justify-center rounded-full ${item.color}`}>
                <Icon size={18} />
              </div>
              <p className="text-xs text-muted-foreground">{item.label}</p>
              <p className="font-semibold">{item.value}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
