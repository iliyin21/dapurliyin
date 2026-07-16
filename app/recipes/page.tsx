import { Suspense } from "react";
import type { Metadata } from "next";

import Container from "@/components/shared/Container";
import SectionTitle from "@/components/shared/SectionTitle";
import RecipeList from "@/components/recipe/recipe-list";

export const metadata: Metadata = {
  title: "Jelajahi Resep",
  description:
    "Jelajahi ribuan resep makanan dan minuman terbaik. Cari berdasarkan judul, kategori, tag, atau author.",
};

export default function RecipesPage() {
  return (
    <main className="py-12">
      <Container>
        <SectionTitle
          title="Jelajahi Resep"
          subtitle="Temukan resep makanan dan minuman favoritmu dari komunitas Dapur Liyin."
        />

        <Suspense fallback={<p className="text-slate-500">Memuat resep...</p>}>
          <RecipeList />
        </Suspense>
      </Container>
    </main>
  );
}
