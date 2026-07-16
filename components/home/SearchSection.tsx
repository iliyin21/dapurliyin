"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Search } from "lucide-react";

import Container from "../shared/Container";
import { fetchPublishedRecipes } from "@/lib/supabase/client-recipes";
import type { DbRecipe } from "@/lib/supabase/recipe-mapper";

export default function SearchSection() {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [recipes, setRecipes] = useState<DbRecipe[]>([]);
  const router = useRouter();

  useEffect(() => {
    fetchPublishedRecipes().then(setRecipes);
  }, []);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];

    return recipes
      .filter(
        (r) =>
          r.title.toLowerCase().includes(q) ||
          r.category.toLowerCase().includes(q) ||
          r.author.toLowerCase().includes(q) ||
          r.tags.some((tag) => tag.toLowerCase().includes(q))
      )
      .slice(0, 5);
  }, [query, recipes]);

  const goToResults = () => {
    if (!query.trim()) return;
    router.push(`/recipes?q=${encodeURIComponent(query.trim())}`);
    setOpen(false);
  };

  return (
    <section className="bg-white py-10">
      <Container>
        <h2 className="text-3xl font-bold text-slate-900">
          Cari Resep Favoritmu
        </h2>

        <div className="relative mt-5">
          <div className="flex items-center gap-3 rounded-xl border p-2 pl-4 focus-within:border-blue-400">
            <Search size={20} className="shrink-0 text-slate-400" />

            <input
              type="text"
              value={query}
              placeholder="Cari berdasarkan judul, kategori, tag, atau author..."
              className="w-full py-2 outline-none"
              onChange={(e) => {
                setQuery(e.target.value);
                setOpen(true);
              }}
              onFocus={() => setOpen(true)}
              onKeyDown={(e) => {
                if (e.key === "Enter") goToResults();
                if (e.key === "Escape") setOpen(false);
              }}
            />

            <button
              onClick={goToResults}
              className="shrink-0 rounded-lg bg-blue-900 px-5 py-2.5 font-semibold text-white transition hover:bg-blue-800"
            >
              Cari
            </button>
          </div>

          {/* Realtime suggestions dropdown */}
          {open && query.trim() && (
            <div className="absolute z-40 mt-2 w-full overflow-hidden rounded-xl border bg-white shadow-xl">
              {results.length === 0 ? (
                <p className="p-4 text-sm text-slate-500">
                  Tidak ada resep yang cocok dengan &quot;{query}&quot;.
                </p>
              ) : (
                <>
                  {results.map((r) => (
                    <Link
                      key={r.id}
                      href={`/recipes/${r.id}`}
                      onClick={() => setOpen(false)}
                      className="flex items-center gap-3 border-b p-3 last:border-b-0 hover:bg-slate-50"
                    >
                      <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-lg">
                        <Image
                          src={r.image}
                          alt={r.title}
                          fill
                          className="object-cover"
                        />
                      </div>

                      <div className="min-w-0">
                        <p className="truncate font-medium text-slate-900">
                          {r.title}
                        </p>
                        <p className="text-xs text-slate-500">
                          {r.category} • {r.author}
                        </p>
                      </div>
                    </Link>
                  ))}

                  <button
                    onClick={goToResults}
                    className="w-full bg-slate-50 p-3 text-center text-sm font-semibold text-blue-800 hover:bg-slate-100"
                  >
                    Lihat semua hasil untuk &quot;{query}&quot; →
                  </button>
                </>
              )}
            </div>
          )}
        </div>
      </Container>
    </section>
  );
}
