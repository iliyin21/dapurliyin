import { createClient } from "./client";
import { mapRecipeRow, type RecipeRow, type DbRecipe } from "./recipe-mapper";

export async function fetchPublishedRecipes(): Promise<DbRecipe[]> {
  const supabase = createClient();
  const { data } = await supabase
    .from("recipes")
    .select("*")
    .eq("published", true)
    .order("created_at", { ascending: false });

  return (data ?? []).map((row) => mapRecipeRow(row as RecipeRow));
}
