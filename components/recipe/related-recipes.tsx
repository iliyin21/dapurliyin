import RecipeCard from "./RecipeCard";
import type { Recipe } from "@/data/recipes";

interface RelatedRecipesProps {
  recipes: Recipe[];
}

export default function RelatedRecipes({ recipes }: RelatedRecipesProps) {
  if (recipes.length === 0) return null;

  return (
    <section>
      <h2 className="mb-6 text-2xl font-bold">Resep Terkait</h2>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {recipes.map((recipe) => (
          <RecipeCard key={recipe.id} recipe={recipe} />
        ))}
      </div>
    </section>
  );
}
