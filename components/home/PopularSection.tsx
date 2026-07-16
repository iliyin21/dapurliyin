import RecipeGrid from "@/components/recipe/RecipeGrid";
import { getPopularRecipes } from "@/lib/supabase/recipes";

export default async function PopularSection() {
  const popular = await getPopularRecipes(6);

  if (popular.length === 0) return null;

  return (
    <div className="bg-slate-50">
      <RecipeGrid
        recipes={popular}
        title="💙 Resep Populer"
        subtitle="Paling banyak difavoritkan oleh pengguna lain."
        viewAllHref="/recipes"
      />
    </div>
  );
}
