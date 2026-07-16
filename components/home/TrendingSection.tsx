import RecipeGrid from "@/components/recipe/RecipeGrid";
import { getTrendingRecipes } from "@/lib/supabase/recipes";

export default async function TrendingSection() {
  const trending = await getTrendingRecipes(6);

  if (trending.length === 0) return null;

  return (
    <div className="bg-slate-50">
      <RecipeGrid
        recipes={trending}
        title="🔥 Resep Trending"
        subtitle="Resep yang sedang paling banyak dilihat minggu ini."
        viewAllHref="/recipes"
      />
    </div>
  );
}
