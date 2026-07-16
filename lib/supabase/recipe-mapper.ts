import type { Recipe, NutritionInfo, VideoLinks } from "@/data/recipes";

/** Shape of a row exactly as it comes back from the `recipes` table. */
export interface RecipeRow {
  id: number;
  slug: string;
  title: string;
  description: string;
  image: string;
  category: string;
  tags: string[];
  author: string;
  cooking_time: string;
  calories: string;
  servings: string;
  difficulty: "Mudah" | "Sedang" | "Sulit";
  rating: number;
  views: number;
  favorites_count: number;
  featured: boolean;
  is_new: boolean;
  published: boolean;
  ingredients: string[];
  steps: string[];
  nutrition: NutritionInfo | null;
  tips: string[] | null;
  video: VideoLinks | null;
  created_at: string;
}

export interface DbRecipe extends Recipe {
  published: boolean;
}

export function mapRecipeRow(row: RecipeRow): DbRecipe {
  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    description: row.description,
    image: row.image,
    category: row.category,
    tags: row.tags ?? [],
    author: row.author,
    cookingTime: row.cooking_time,
    calories: row.calories,
    servings: row.servings,
    difficulty: row.difficulty,
    rating: Number(row.rating),
    views: row.views,
    favorites: row.favorites_count,
    featured: row.featured,
    isNew: row.is_new,
    published: row.published,
    ingredients: row.ingredients ?? [],
    steps: row.steps ?? [],
    nutrition: row.nutrition ?? undefined,
    tips: row.tips ?? undefined,
    video: row.video ?? undefined,
    createdAt: row.created_at,
  };
}

/** Fields the admin form can write. Maps camelCase form values -> DB columns. */
export interface RecipeWriteInput {
  slug: string;
  title: string;
  description: string;
  image: string;
  category: string;
  tags: string[];
  author: string;
  cookingTime: string;
  calories: string;
  servings: string;
  difficulty: "Mudah" | "Sedang" | "Sulit";
  ingredients: string[];
  steps: string[];
  nutrition?: NutritionInfo;
  tips?: string[];
  video?: VideoLinks;
  published: boolean;
  featured?: boolean;
  isNew?: boolean;
}

export function toRecipeRow(input: RecipeWriteInput) {
  return {
    slug: input.slug,
    title: input.title,
    description: input.description,
    image: input.image,
    category: input.category,
    tags: input.tags,
    author: input.author,
    cooking_time: input.cookingTime,
    calories: input.calories,
    servings: input.servings,
    difficulty: input.difficulty,
    ingredients: input.ingredients,
    steps: input.steps,
    nutrition: input.nutrition ?? null,
    tips: input.tips ?? null,
    video: input.video ?? null,
    published: input.published,
    featured: input.featured ?? false,
    is_new: input.isNew ?? false,
  };
}
