import { redirect } from "next/navigation";
import type { Metadata } from "next";

import Container from "@/components/shared/Container";
import RecipeCard from "@/components/recipe/RecipeCard";
import LogoutButton from "@/components/auth/LogoutButton";
import { getCurrentUserProfile, createClient } from "@/lib/supabase/server";
import { getRecipesByIds } from "@/lib/supabase/recipes";

export const metadata: Metadata = {
  title: "Akun Saya",
};

export default async function AccountPage() {
  const profile = await getCurrentUserProfile();

  if (!profile) {
    redirect("/login");
  }

  const supabase = await createClient();
  const { data: favoriteRows } = await supabase
    .from("favorites")
    .select("recipe_id")
    .eq("user_id", profile.id);

  const favoriteIds = (favoriteRows ?? []).map((row) => row.recipe_id as number);
  const favoriteRecipes = await getRecipesByIds(favoriteIds);

  const initials = (profile.fullName || profile.email || "U")
    .split(" ")
    .map((w) => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <main className="py-12">
      <Container>
        <div className="mb-10 flex flex-col items-center gap-4 rounded-3xl border bg-white p-8 text-center sm:flex-row sm:justify-between sm:text-left">
          <div className="flex flex-col items-center gap-4 sm:flex-row">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-900 text-xl font-bold text-white">
              {initials}
            </div>
            <div>
              <h1 className="text-xl font-bold">
                {profile.fullName || "Pengguna"}
              </h1>
              <p className="text-sm text-slate-500">{profile.email}</p>
              {profile.role === "admin" && (
                <span className="mt-1 inline-block rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-900">
                  Admin
                </span>
              )}
            </div>
          </div>

          <LogoutButton />
        </div>

        <h2 className="mb-6 text-2xl font-bold">Resep Favorit Saya</h2>

        {favoriteRecipes.length === 0 ? (
          <p className="rounded-2xl border border-dashed p-10 text-center text-slate-500">
            Belum ada resep favorit. Klik ikon ❤️ di halaman resep untuk
            menyimpannya di sini.
          </p>
        ) : (
          <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
            {favoriteRecipes.map((recipe) => (
              <RecipeCard key={recipe.id} recipe={recipe} />
            ))}
          </div>
        )}
      </Container>
    </main>
  );
}
