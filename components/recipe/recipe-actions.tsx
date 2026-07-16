"use client";

import {
  Bookmark,
  Heart,
  Share2,
  Printer,
  Link2,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { createClient } from "@/lib/supabase/client";

interface RecipeActionsProps {
  recipeId: number;
  favorites: number;
}

export default function RecipeActions({
  recipeId,
  favorites,
}: RecipeActionsProps) {
  const router = useRouter();
  const [userId, setUserId] = useState<string | null>(null);
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const bookmarkData = localStorage.getItem(`bookmark-${recipeId}`);
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setSaved(bookmarkData === "true");

    const supabase = createClient();
    supabase.auth.getUser().then(({ data }) => {
      const uid = data.user?.id ?? null;
      setUserId(uid);

      if (uid) {
        supabase
          .from("favorites")
          .select("recipe_id")
          .eq("user_id", uid)
          .eq("recipe_id", recipeId)
          .maybeSingle()
          .then(({ data: row }) => setLiked(Boolean(row)));
      }
    });
  }, [recipeId]);

  const toggleFavorite = async () => {
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
        .insert({ user_id: userId, recipe_id: recipeId });
      if (error) {
        setLiked(false);
        toast.error("Gagal menyimpan favorit");
      }
    } else {
      const { error } = await supabase
        .from("favorites")
        .delete()
        .eq("user_id", userId)
        .eq("recipe_id", recipeId);
      if (error) {
        setLiked(true);
        toast.error("Gagal menghapus favorit");
      }
    }
  };

  const toggleBookmark = () => {
    const newValue = !saved;
    setSaved(newValue);
    localStorage.setItem(`bookmark-${recipeId}`, String(newValue));
    toast.success(newValue ? "Resep disimpan" : "Resep dihapus dari simpanan");
  };

  const handleShare = async () => {
    const url = window.location.href;

    try {
      if (navigator.share) {
        await navigator.share({
          title: "Dapur Liyin",
          text: "Lihat resep ini!",
          url,
        });
      } else {
        await navigator.clipboard.writeText(url);
        toast.success("Link resep berhasil disalin");
      }
    } catch {
      toast.error("Gagal membagikan resep");
    }
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      toast.success("Link resep berhasil disalin");
    } catch {
      toast.error("Gagal menyalin link");
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="flex flex-wrap gap-3">
      <Button
        onClick={toggleFavorite}
        variant="outline"
        className={liked ? "border-red-200 bg-red-50 text-red-500" : ""}
      >
        <Heart size={18} className={liked ? "fill-red-500" : ""} />
        {liked ? favorites + 1 : favorites}
      </Button>

      <Button
        onClick={toggleBookmark}
        variant="outline"
        className={saved ? "border-blue-200 bg-blue-50 text-blue-600" : ""}
      >
        <Bookmark size={18} className={saved ? "fill-blue-600" : ""} />
        {saved ? "Tersimpan" : "Simpan"}
      </Button>

      <Button onClick={handleShare} variant="outline">
        <Share2 size={18} />
        Bagikan
      </Button>

      <Button onClick={handleCopyLink} variant="outline">
        <Link2 size={18} />
        Salin Link
      </Button>

      <Button onClick={handlePrint} variant="outline">
        <Printer size={18} />
        Cetak
      </Button>
    </div>
  );
}
