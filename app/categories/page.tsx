import type { Metadata } from "next";
import Link from "next/link";

import Container from "@/components/shared/Container";
import SectionTitle from "@/components/shared/SectionTitle";
import { categories } from "@/data/recipes";
import { getAllPublishedRecipes } from "@/lib/supabase/recipes";

export const metadata: Metadata = {
  title: "Kategori Resep",
  description: "Jelajahi resep berdasarkan kategori favoritmu.",
};

export default async function CategoriesPage() {
  const recipes = await getAllPublishedRecipes();

  return (
    <main className="py-12">
      <Container>
        <SectionTitle
          title="Kategori Resep"
          subtitle="Pilih kategori untuk menemukan resep yang paling sesuai dengan seleramu."
        />

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((c) => {
            const count = recipes.filter((r) => r.category === c.name).length;

            return (
              <Link
                key={c.name}
                href={`/recipes?category=${encodeURIComponent(c.name)}`}
                className="flex items-center justify-between rounded-2xl border bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="flex items-center gap-4">
                  <span className="text-3xl">{c.icon}</span>
                  <span className="font-semibold text-slate-900">
                    {c.name}
                  </span>
                </div>

                <span className="rounded-full bg-blue-50 px-3 py-1 text-sm font-medium text-blue-900">
                  {count} resep
                </span>
              </Link>
            );
          })}
        </div>
      </Container>
    </main>
  );
}
