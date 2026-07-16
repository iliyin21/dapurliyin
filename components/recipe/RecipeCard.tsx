"use client";

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FaHeart, FaClock, FaFire, FaStar, FaEye } from "react-icons/fa";
import { toast } from "sonner";

import type { Recipe } from "@/data/recipes";
import { Badge } from "@/components/ui/badge";
import { createClient } from "@/lib/supabase/client";

interface RecipeCardProps {
  recipe: Recipe;
}

export default function RecipeCard({ recipe }: RecipeCardProps) {
  const router = useRouter();
  const [userId, setUserId] = useState<string | null>(null);
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    const supabase = createClient();

    supabase.auth.getUser().then(({ data }: { data: { user: { id: string } | null } }) => {
      const uid = data.user?.id ?? null;
      setUserId(uid);

      if (uid) {
        supabase
          .from("favorites")
          .select("recipe_id")
          .eq("user_id", uid)
          .eq("recipe_id", recipe.id)
          .maybeSingle()
          .then(({ data: row }: { data: { recipe_id: number } | null }) =>
            setLiked(Boolean(row))
          );
      }
    });
  }, [recipe.id]);

  const toggleLike = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!userId) {
      toast.error("Masuk dulu untuk menyimpan resep favorit");
      router.push("/login");
      return;
    }

    const supabase = createClient();
    const next = !liked;
    setLiked(next);

    if (next) {
      const { error } = await supabase
        .from("favorites")
        .insert({ user_id: userId, recipe_id: recipe.id });
      if (error) {
        setLiked(false);
        toast.error("Gagal menyimpan favorit");
      }
    } else {
      const { error } = await supabase
        .from("favorites")
        .delete()
        .eq("user_id", userId)
        .eq("recipe_id", recipe.id);
      if (error) {
        setLiked(true);
        toast.error("Gagal menghapus favorit");
      }
    }
  };

  return (
    <Link href={`/recipes/${recipe.id}`}>
      <div className="group overflow-hidden rounded-3xl bg-white shadow-md transition duration-300 hover:-translate-y-2 hover:shadow-2xl">
        <div className="relative h-64">
          <Image
            src={recipe.image}
            alt={recipe.title}
            fill
            className="object-cover transition duration-500 group-hover:scale-110"
          />

          <div className="absolute left-4 top-4 flex gap-2">
            {recipe.isNew && <Badge className="bg-emerald-600">Baru</Badge>}
            {recipe.featured && (
              <Badge className="bg-blue-900">Unggulan</Badge>
            )}
          </div>

          <button
            onClick={toggleLike}
            className="absolute right-4 top-4 rounded-full bg-white/90 p-3 shadow transition hover:bg-red-50"
          >
            <FaHeart className={liked ? "text-red-500" : "text-slate-400"} />
          </button>

          <div className="absolute left-4 bottom-4 flex items-center gap-2 rounded-full bg-white px-3 py-1 shadow">
            <FaStar className="text-yellow-500" />
            <span className="font-semibold">{recipe.rating}</span>
          </div>
        </div>

        <div className="space-y-4 p-5">
          <div className="flex items-center justify-between gap-2">
            <h3 className="line-clamp-1 text-xl font-bold text-slate-900">
              {recipe.title}
            </h3>
          </div>

          <p className="line-clamp-1 text-gray-500">Oleh {recipe.author}</p>

          <div className="flex justify-between text-sm text-gray-600">
            <span className="flex items-center gap-2">
              <FaClock />
              {recipe.cookingTime}
            </span>

            <span className="flex items-center gap-2">
              <FaFire />
              {recipe.difficulty}
            </span>
          </div>

          <div className="flex justify-between text-sm text-gray-500">
            <span className="flex items-center gap-2">
              <FaEye />
              {recipe.views.toLocaleString("id-ID")} Views
            </span>

            <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-900">
              {recipe.category}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
