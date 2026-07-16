"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Search, X } from "lucide-react";

import RecipeCard from "./RecipeCard";
import { categories } from "@/data/recipes";
import { fetchPublishedRecipes } from "@/lib/supabase/client-recipes";
import type { DbRecipe } from "@/lib/supabase/recipe-mapper";

export default function RecipeList() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [recipes, setRecipes] = useState<DbRecipe[]>([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState(searchParams.get("q") ?? "");
  const [category, setCategory] = useState(
    searchParams.get("category") ?? ""
  );

  useEffect(() => {
    fetchPublishedRecipes()
      .then(setRecipes)
      .finally(() => setLoading(false));
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();

    return recipes.filter((r) => {
      const matchesCategory = category
        ? r.category.toLowerCase() === category.toLowerCase()
        : true;

      const matchesQuery = q
        ? r.title.toLowerCase().includes(q) ||
          r.category.toLowerCase().includes(q) ||
          r.author.toLowerCase().includes(q) ||
          r.tags.some((tag) => tag.toLowerCase().includes(q))
        : true;

      return matchesCategory && matchesQuery;
    });
  }, [query, category, recipes]);

  const updateUrl = (nextQuery: string, nextCategory: string) => {
    const params = new URLSearchParams();
    if (nextQuery) params.set("q", nextQuery);
    if (nextCategory) params.set("category", nextCategory);
    router.replace(`/recipes${params.toString() ? `?${params}` : ""}`, {
      scroll: false,
    });
  };

  return (
    <div>
      <div className="mb-8 space-y-5">
        <div className="flex items-center gap-3 rounded-xl border p-2 pl-4 focus-within:border-blue-400">
          <Search size={20} className="shrink-0 text-slate-400" />

          <input
            value={query}
            placeholder="Cari berdasarkan judul, kategori, tag, atau author..."
            className="w-full py-2 outline-none"
            onChange={(e) => {
              setQuery(e.target.value);
              updateUrl(e.target.value, category);
            }}
          />

          {query && (
            <button
              onClick={() => {
                setQuery("");
                updateUrl("", category);
              }}
              className="shrink-0 rounded-full p-1 hover:bg-slate-100"
            >
              <X size={18} />
            </button>
          )}
        </div>

        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => {
              setCategory("");
              updateUrl(query, "");
            }}
            className={`rounded-full border px-4 py-2 text-sm font-medium transition ${
              category === ""
                ? "border-blue-900 bg-blue-900 text-white"
                : "border-blue-200 bg-blue-50 text-blue-900 hover:bg-blue-100"
            }`}
          >
            Semua
          </button>

          {categories.map((c) => (
            <button
              key={c.name}
              onClick={() => {
                setCategory(c.name);
                updateUrl(query, c.name);
              }}
              className={`rounded-full border px-4 py-2 text-sm font-medium transition ${
                category === c.name
                  ? "border-blue-900 bg-blue-900 text-white"
                  : "border-blue-200 bg-blue-50 text-blue-900 hover:bg-blue-100"
              }`}
            >
              {c.icon} {c.name}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <p className="text-slate-500">Memuat resep...</p>
      ) : (
        <>
          <p className="mb-4 text-sm text-slate-500">
            Menampilkan {filtered.length} dari {recipes.length} resep
          </p>

          {filtered.length === 0 ? (
            <p className="rounded-2xl border border-dashed p-10 text-center text-slate-500">
              Tidak ada resep yang cocok dengan pencarianmu.
            </p>
          ) : (
            <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
              {filtered.map((recipe) => (
                <RecipeCard key={recipe.id} recipe={recipe} />
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}
