import type { Metadata } from "next";
import Link from "next/link";

import Container from "@/components/shared/Container";
import SectionTitle from "@/components/shared/SectionTitle";
import VideoThumbnail from "@/components/recipe/video-thumbnail";
import { getRecipesWithVideo } from "@/lib/supabase/recipes";
import { getVideoEntries } from "@/lib/video";

export const metadata: Metadata = {
  title: "Video Tutorial",
  description:
    "Kumpulan video tutorial memasak dari YouTube, Instagram, dan TikTok.",
};

export default async function VideosPage() {
  const recipesWithVideo = await getRecipesWithVideo();

  return (
    <main className="py-12">
      <Container>
        <SectionTitle
          title="🎬 Video Tutorial"
          subtitle="Tonton langsung cara memasak dari sumber aslinya."
        />

        {recipesWithVideo.length === 0 ? (
          <p className="rounded-2xl border border-dashed p-10 text-center text-slate-500">
            Belum ada video tutorial yang tersedia.
          </p>
        ) : (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {recipesWithVideo.map((recipe) => {
              const entries = getVideoEntries(recipe.video, recipe.image);

              return (
                <div key={recipe.id} className="space-y-3">
                  <div className="grid grid-cols-1 gap-2">
                    {entries.map((entry) => (
                      <VideoThumbnail key={entry.platform} video={entry} />
                    ))}
                  </div>

                  <Link
                    href={`/recipes/${recipe.id}`}
                    className="block font-semibold text-slate-900 hover:text-blue-800"
                  >
                    {recipe.title}
                  </Link>

                  <p className="text-sm text-slate-500">
                    {recipe.category} • Oleh {recipe.author}
                  </p>
                </div>
              );
            })}
          </div>
        )}
      </Container>
    </main>
  );
}
