import type { MetadataRoute } from "next";

import { getAllPublishedRecipes } from "@/lib/supabase/recipes";

const BASE_URL = "https://dapurliyin.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticPages = [
    "",
    "/recipes",
    "/categories",
    "/videos",
    "/about",
  ].map((path) => ({
    url: `${BASE_URL}${path}`,
    lastModified: new Date(),
  }));

  const recipes = await getAllPublishedRecipes();
  const recipePages = recipes.map((recipe) => ({
    url: `${BASE_URL}/recipes/${recipe.id}`,
    lastModified: new Date(recipe.createdAt),
  }));

  return [...staticPages, ...recipePages];
}
