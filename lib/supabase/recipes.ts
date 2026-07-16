import { createClient } from "./server";
import { mapRecipeRow, type RecipeRow, type DbRecipe } from "./recipe-mapper";
import type { Recipe } from "@/data/recipes";

export async function getRecipeById(id: number): Promise<DbRecipe | undefined> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("recipes")
    .select("*")
    .eq("id", id)
    .single();

  return data ? mapRecipeRow(data as RecipeRow) : undefined;
}

export async function getFeaturedRecipes(limit = 4): Promise<DbRecipe[]> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("recipes")
    .select("*")
    .eq("published", true)
    .eq("featured", true)
    .limit(limit);

  return (data ?? []).map((row) => mapRecipeRow(row as RecipeRow));
}

export async function getTrendingRecipes(limit = 6): Promise<DbRecipe[]> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("recipes")
    .select("*")
    .eq("published", true)
    .order("views", { ascending: false })
    .limit(limit);

  return (data ?? []).map((row) => mapRecipeRow(row as RecipeRow));
}

export async function getPopularRecipes(limit = 6): Promise<DbRecipe[]> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("recipes")
    .select("*")
    .eq("published", true)
    .order("favorites_count", { ascending: false })
    .limit(limit);

  return (data ?? []).map((row) => mapRecipeRow(row as RecipeRow));
}

export async function getNewRecipes(limit = 6): Promise<DbRecipe[]> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("recipes")
    .select("*")
    .eq("published", true)
    .order("created_at", { ascending: false })
    .limit(limit);

  return (data ?? []).map((row) => mapRecipeRow(row as RecipeRow));
}

export async function getRelatedRecipes(
  recipe: Recipe,
  limit = 3
): Promise<DbRecipe[]> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("recipes")
    .select("*")
    .eq("published", true)
    .eq("category", recipe.category)
    .neq("id", recipe.id)
    .limit(limit);

  return (data ?? []).map((row) => mapRecipeRow(row as RecipeRow));
}

export async function getRecipesWithVideo(): Promise<DbRecipe[]> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("recipes")
    .select("*")
    .eq("published", true)
    .not("video", "is", null);

  return (data ?? []).map((row) => mapRecipeRow(row as RecipeRow));
}

/** All published recipes — used for the browse/search page and category counts. */
export async function getAllPublishedRecipes(): Promise<DbRecipe[]> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("recipes")
    .select("*")
    .eq("published", true)
    .order("created_at", { ascending: false });

  return (data ?? []).map((row) => mapRecipeRow(row as RecipeRow));
}

/** All recipes including drafts — used by the admin dashboard (RLS restricts this to admins). */
export async function getAllRecipesForAdmin(): Promise<DbRecipe[]> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("recipes")
    .select("*")
    .order("created_at", { ascending: false });

  return (data ?? []).map((row) => mapRecipeRow(row as RecipeRow));
}

export async function getRecipesByIds(ids: number[]): Promise<DbRecipe[]> {
  if (ids.length === 0) return [];

  const supabase = await createClient();
  const { data } = await supabase
    .from("recipes")
    .select("*")
    .in("id", ids)
    .eq("published", true);

  return (data ?? []).map((row) => mapRecipeRow(row as RecipeRow));
}

export async function getAllRecipeIds(): Promise<number[]> {
  const supabase = await createClient();
  const { data } = await supabase.from("recipes").select("id").eq("published", true);
  return (data ?? []).map((row) => row.id as number);
}
