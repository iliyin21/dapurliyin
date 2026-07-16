import Link from "next/link";

import { getAllRecipesForAdmin } from "@/lib/supabase/recipes";
import { Button } from "@/components/ui/button";
import AdminRecipeTable from "@/components/admin/AdminRecipeTable";

export default async function AdminDashboardPage() {
  const recipes = await getAllRecipesForAdmin();

  const stats = [
    { label: "Total Resep", value: recipes.length },
    {
      label: "Dipublikasikan",
      value: recipes.filter((r) => r.published).length,
    },
    {
      label: "Draft",
      value: recipes.filter((r) => !r.published).length,
    },
    {
      label: "Total Views",
      value: recipes
        .reduce((sum, r) => sum + r.views, 0)
        .toLocaleString("id-ID"),
    },
  ];

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <Link href="/admin/recipes/new">
          <Button>+ Tambah Resep</Button>
        </Link>
      </div>

      <div className="mb-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
        {stats.map((s) => (
          <div key={s.label} className="rounded-2xl border bg-white p-5">
            <p className="text-sm text-slate-500">{s.label}</p>
            <p className="mt-1 text-2xl font-bold">{s.value}</p>
          </div>
        ))}
      </div>

      <AdminRecipeTable initialRecipes={recipes} />
    </div>
  );
}
