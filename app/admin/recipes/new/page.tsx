"use client";

import { useRouter } from "next/navigation";
import { toast } from "sonner";

import RecipeForm, { type RecipeFormValues } from "@/components/admin/RecipeForm";
import { createClient } from "@/lib/supabase/client";
import { toRecipeRow } from "@/lib/supabase/recipe-mapper";

function slugify(title: string) {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export default function NewRecipePage() {
  const router = useRouter();

  const handleSubmit = async (values: RecipeFormValues) => {
    const supabase = createClient();

    const row = toRecipeRow({
      slug: `${slugify(values.title)}-${Date.now().toString(36)}`,
      title: values.title,
      description: values.description,
      image: values.image || "/images/ayam-geprek.jpg",
      category: values.category,
      tags: [values.category.toLowerCase()],
      author: values.author || "Admin",
      cookingTime: values.cookingTime || "-",
      calories: "-",
      servings: values.servings || "-",
      difficulty: values.difficulty,
      ingredients: values.ingredients,
      steps: values.steps,
      video: {
        youtube: values.youtube || undefined,
        instagram: values.instagram || undefined,
        tiktok: values.tiktok || undefined,
      },
      published: values.published,
    });

    const { error } = await supabase.from("recipes").insert(row);

    if (error) {
      toast.error(`Gagal menambahkan resep: ${error.message}`);
      return;
    }

    toast.success("Resep berhasil ditambahkan");
    router.push("/admin");
    router.refresh();
  };

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold">Tambah Resep Baru</h1>
      <RecipeForm onSubmit={handleSubmit} submitLabel="Simpan Resep" />
    </div>
  );
}
