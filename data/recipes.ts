// Recipe data itself now lives in Supabase (table `recipes`, see
// supabase/recipes_schema.sql and lib/supabase/recipes.ts). This file only
// keeps the shared TypeScript types and the static category list used by
// filters, forms, and navigation.

export interface NutritionInfo {
  calories: string;
  protein: string;
  carbs: string;
  fat: string;
}

export interface VideoLinks {
  youtube?: string;
  instagram?: string;
  tiktok?: string;
}

export interface Recipe {
  id: number;
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

  rating: number;
  views: number;
  favorites: number;

  featured?: boolean;
  isNew?: boolean;

  ingredients: string[];
  steps: string[];

  nutrition?: NutritionInfo;
  tips?: string[];
  video?: VideoLinks;

  createdAt: string; // ISO date, used for "New Recipe" sorting
}

export const categories = [
  { name: "Ala Anak Kost", icon: "🍚" },
  { name: "Ayam", icon: "🍗" },
  { name: "Seafood", icon: "🐟" },
  { name: "Minuman", icon: "🥤" },
  { name: "Dessert", icon: "🧁" },
  { name: "Diet", icon: "🥗" },
  { name: "Vegetarian", icon: "🥦" },
  { name: "Cemilan", icon: "🍿" },
  { name: "Fine Dining", icon: "🍽️" },
];
