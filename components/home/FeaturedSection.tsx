import RecipeGrid from "@/components/recipe/RecipeGrid";
import { getFeaturedRecipes } from "@/lib/supabase/recipes";

export default async function FeaturedSection() {
  const featured = await getFeaturedRecipes(4);

  if (featured.length === 0) return null;

  return (
    <RecipeGrid
      recipes={featured}
      title="⭐ Resep Unggulan"
      subtitle="Pilihan terbaik dari tim editor Dapur Liyin."
      viewAllHref="/recipes"
    />
  );
}
