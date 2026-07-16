"use client";

import { useRouter } from "next/navigation";
import { toast } from "sonner";

import RecipeForm, { type RecipeFormValues } from "@/components/admin/RecipeForm";
import { createClient } from "@/lib/supabase/client";
import { toRecipeRow, type DbRecipe } from "@/lib/supabase/recipe-mapper";

export default function EditRecipeFormClient({
  recipe,
}: {
  recipe: DbRecipe;
}) {
  const router = useRouter();

  const handleSubmit = async (values: RecipeFormValues) => {
    const supabase = createClient();

    const row = toRecipeRow({
      slug: recipe.slug,
      title: values.title,
      description: values.description,
      image: values.image || recipe.image,
      category: values.category,
      tags: recipe.tags,
      author: values.author,
      cookingTime: values.cookingTime,
      calories: recipe.calories,
      servings: values.servings,
      difficulty: values.difficulty,
      ingredients: values.ingredients,
      steps: values.steps,
      video: {
        youtube: values.youtube || undefined,
        instagram: values.instagram || undefined,
        tiktok: values.tiktok || undefined,
      },
      published: values.published,
      featured: recipe.featured,
      isNew: recipe.isNew,
    });

    const { error } = await supabase
      .from("recipes")
      .update(row)
      .eq("id", recipe.id);

    if (error) {
      toast.error(`Gagal menyimpan perubahan: ${error.message}`);
      return;
    }

    toast.success("Resep berhasil diperbarui");
    router.push("/admin");
    router.refresh();
  };

  return (
    <RecipeForm
      initial={recipe}
      onSubmit={handleSubmit}
      submitLabel="Simpan Perubahan"
    />
  );
}
