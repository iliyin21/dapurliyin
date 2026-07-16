import { Check } from "lucide-react";

interface IngredientsCardProps {
  ingredients: string[];
}

export default function IngredientsCard({
  ingredients,
}: IngredientsCardProps) {
  return (
    <section className="rounded-3xl border bg-white p-6 shadow-sm md:p-8">
      <div className="mb-6">
        <h2 className="text-2xl font-bold">
          Bahan Masakan
        </h2>

        <p className="mt-2 text-sm text-muted-foreground">
          Siapkan bahan-bahan berikut sebelum mulai memasak.
        </p>
      </div>


      <div className="space-y-3">
        {ingredients.map((ingredient, index) => (
          <div
            key={index}
            className="flex items-center gap-3 rounded-xl bg-gray-50 p-4 transition hover:bg-gray-100"
          >
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-black text-white">
              <Check size={16} />
            </div>

            <p className="text-sm font-medium md:text-base">
              {ingredient}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}