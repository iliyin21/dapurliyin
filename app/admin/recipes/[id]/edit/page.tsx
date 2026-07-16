import { notFound } from "next/navigation";

import { getRecipeById } from "@/lib/supabase/recipes";
import EditRecipeFormClient from "./EditRecipeFormClient";

export default async function EditRecipePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const recipe = await getRecipeById(Number(id));

  if (!recipe) {
    notFound();
  }

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold">Edit Resep</h1>
      <EditRecipeFormClient recipe={recipe} />
    </div>
  );
}
