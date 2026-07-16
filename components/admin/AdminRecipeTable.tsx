"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Pencil, Trash2, Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/client";
import type { DbRecipe } from "@/lib/supabase/recipe-mapper";

export default function AdminRecipeTable({
  initialRecipes,
}: {
  initialRecipes: DbRecipe[];
}) {
  const router = useRouter();
  const [recipes, setRecipes] = useState(initialRecipes);
  const [busyId, setBusyId] = useState<number | null>(null);

  const handleDelete = async (id: number, title: string) => {
    if (
      !confirm(`Hapus resep "${title}"? Tindakan ini tidak bisa dibatalkan.`)
    ) {
      return;
    }

    setBusyId(id);
    const supabase = createClient();
    const { error } = await supabase.from("recipes").delete().eq("id", id);
    setBusyId(null);

    if (error) {
      toast.error(`Gagal menghapus resep: ${error.message}`);
      return;
    }

    setRecipes((prev) => prev.filter((r) => r.id !== id));
    toast.success("Resep dihapus");
    router.refresh();
  };

  const togglePublish = async (id: number, current: boolean) => {
    setBusyId(id);
    const supabase = createClient();
    const { error } = await supabase
      .from("recipes")
      .update({ published: !current })
      .eq("id", id);
    setBusyId(null);

    if (error) {
      toast.error(`Gagal mengubah status: ${error.message}`);
      return;
    }

    setRecipes((prev) =>
      prev.map((r) => (r.id === id ? { ...r, published: !current } : r))
    );
    router.refresh();
  };

  return (
    <div className="overflow-hidden rounded-2xl border bg-white">
      <table className="w-full text-left text-sm">
        <thead className="border-b bg-slate-50 text-slate-500">
          <tr>
            <th className="px-4 py-3">Resep</th>
            <th className="px-4 py-3">Kategori</th>
            <th className="px-4 py-3">Status</th>
            <th className="px-4 py-3">Views</th>
            <th className="px-4 py-3 text-right">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {recipes.length === 0 && (
            <tr>
              <td colSpan={5} className="px-4 py-10 text-center text-slate-500">
                Belum ada resep. Klik &quot;+ Tambah Resep&quot; untuk mulai.
              </td>
            </tr>
          )}

          {recipes.map((recipe) => (
            <tr key={recipe.id} className="border-b last:border-b-0">
              <td className="px-4 py-3">
                <div className="flex items-center gap-3">
                  <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-lg">
                    <Image
                      src={recipe.image}
                      alt={recipe.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <span className="line-clamp-1 font-medium text-slate-900">
                    {recipe.title}
                  </span>
                </div>
              </td>
              <td className="px-4 py-3 text-slate-600">{recipe.category}</td>
              <td className="px-4 py-3">
                <button
                  onClick={() => togglePublish(recipe.id, recipe.published)}
                  disabled={busyId === recipe.id}
                  className={`flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium disabled:opacity-50 ${
                    recipe.published
                      ? "bg-emerald-100 text-emerald-700"
                      : "bg-slate-100 text-slate-500"
                  }`}
                >
                  {recipe.published ? (
                    <Eye size={12} />
                  ) : (
                    <EyeOff size={12} />
                  )}
                  {recipe.published ? "Published" : "Draft"}
                </button>
              </td>
              <td className="px-4 py-3 text-slate-600">
                {recipe.views.toLocaleString("id-ID")}
              </td>
              <td className="px-4 py-3">
                <div className="flex justify-end gap-2">
                  <Link href={`/admin/recipes/${recipe.id}/edit`}>
                    <Button variant="outline" size="icon">
                      <Pencil size={14} />
                    </Button>
                  </Link>
                  <Button
                    variant="destructive"
                    size="icon"
                    disabled={busyId === recipe.id}
                    onClick={() => handleDelete(recipe.id, recipe.title)}
                  >
                    <Trash2 size={14} />
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
