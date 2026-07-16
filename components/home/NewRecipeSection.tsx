import RecipeGrid from "@/components/recipe/RecipeGrid";
import { getNewRecipes } from "@/lib/supabase/recipes";

export default async function NewRecipeSection() {
  const newest = await getNewRecipes(6);

  if (newest.length === 0) return null;

  return (
    <div className="bg-white">
      <RecipeGrid
        recipes={newest}
        title="🆕 Resep Terbaru"
        subtitle="Kreasi terbaru dari komunitas Dapur Liyin."
        viewAllHref="/recipes"
      />
    </div>
  );
}
