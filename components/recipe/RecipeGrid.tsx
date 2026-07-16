import Container from "../shared/Container";
import SectionTitle from "../shared/SectionTitle";
import RecipeCard from "./RecipeCard";
import type { Recipe } from "@/data/recipes";

interface RecipeGridProps {
  recipes: Recipe[];
  title: string;
  subtitle?: string;
  viewAllHref?: string;
  bare?: boolean;
}

export default function RecipeGrid({
  recipes,
  title,
  subtitle,
  viewAllHref,
  bare = false,
}: RecipeGridProps) {
  const content = (
    <>
      <div className="mb-8 flex items-end justify-between gap-4">
        <SectionTitle title={title} subtitle={subtitle} />

        {viewAllHref && (
          <a
            href={viewAllHref}
            className="mb-10 shrink-0 font-semibold text-blue-700 hover:underline"
          >
            Lihat Semua →
          </a>
        )}
      </div>

      {recipes.length === 0 ? (
        <p className="rounded-2xl border border-dashed p-10 text-center text-slate-500">
          Belum ada resep untuk kategori ini.
        </p>
      ) : (
        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
          {recipes.map((recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))}
        </div>
      )}
    </>
  );

  if (bare) {
    return <section className="py-10">{content}</section>;
  }

  return (
    <section className="py-16">
      <Container>{content}</Container>
    </section>
  );
}
