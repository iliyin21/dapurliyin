import { notFound } from "next/navigation";
import type { Metadata } from "next";

import {
  getRecipeById,
  getRelatedRecipes,
} from "@/lib/supabase/recipes";

import RecipeHero from "@/components/recipe/recipe-hero";
import RecipeMeta from "@/components/recipe/recipe-meta";
import RecipeActions from "@/components/recipe/recipe-actions";
import RecipeAuthor from "@/components/recipe/RecipeAuthor";
import IngredientsCard from "@/components/recipe/ingredients-card";
import StepsCard from "@/components/recipe/steps-card";
import NutritionCard from "@/components/recipe/nutrition-card";
import TipsCard from "@/components/recipe/tips-card";
import VideoTutorialCard from "@/components/recipe/video-tutorial";
import RelatedRecipes from "@/components/recipe/related-recipes";

interface RecipeDetailPageProps {
  params: Promise<{
    id: string;
  }>;
}

// Recipe pages render dynamically per-request (data changes via the admin
// dashboard), so we intentionally don't pre-render them at build time.

export async function generateMetadata({
  params,
}: RecipeDetailPageProps): Promise<Metadata> {
  const { id } = await params;
  const recipe = await getRecipeById(Number(id));

  if (!recipe) {
    return { title: "Resep tidak ditemukan" };
  }

  return {
    title: recipe.title,
    description: recipe.description,
    keywords: [recipe.title, recipe.category, ...recipe.tags],
    openGraph: {
      title: recipe.title,
      description: recipe.description,
      images: [recipe.image],
      type: "article",
    },
  };
}

export default async function RecipeDetailPage({
  params,
}: RecipeDetailPageProps) {
  const { id } = await params;

  const recipe = await getRecipeById(Number(id));

  if (!recipe) {
    notFound();
  }

  const related = await getRelatedRecipes(recipe);

  return (
    <main className="mx-auto w-full max-w-7xl space-y-8 px-4 py-8 md:px-8">
      {/* Hero */}
      <RecipeHero
        title={recipe.title}
        image={recipe.image}
        category={recipe.category}
      />

      {/* Information */}
      <RecipeMeta
        author={recipe.author}
        cookingTime={recipe.cookingTime}
        calories={recipe.calories}
        rating={recipe.rating}
        views={recipe.views}
        servings={recipe.servings}
      />

      {/* Actions: favorite, bookmark, share, print, copy link */}
      <RecipeActions recipeId={recipe.id} favorites={recipe.favorites} />

      {/* Description */}
      <section className="rounded-3xl border bg-white p-6 shadow-sm md:p-8">
        <div className="mb-6 flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <h2 className="text-2xl font-bold">Tentang Resep</h2>
          <RecipeAuthor author={recipe.author} />
        </div>

        <p className="leading-relaxed text-muted-foreground">
          {recipe.description}
        </p>
      </section>

      {/* Content */}
      <section className="grid gap-8 lg:grid-cols-2">
        {/* Ingredients */}
        <IngredientsCard ingredients={recipe.ingredients} />

        {/* Steps */}
        <StepsCard steps={recipe.steps} />
      </section>

      {/* Nutrition */}
      <NutritionCard nutrition={recipe.nutrition} />

      {/* Tips */}
      <TipsCard tips={recipe.tips} />

      {/* Video Tutorial */}
      <VideoTutorialCard video={recipe.video} fallbackImage={recipe.image} />

      {/* Related recipes */}
      <RelatedRecipes recipes={related} />
    </main>
  );
}
