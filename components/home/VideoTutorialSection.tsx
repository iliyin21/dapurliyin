import Link from "next/link";

import Container from "../shared/Container";
import SectionTitle from "../shared/SectionTitle";
import VideoThumbnail from "../recipe/video-thumbnail";
import { getRecipesWithVideo } from "@/lib/supabase/recipes";
import { getVideoEntries } from "@/lib/video";

export default async function VideoTutorialSection() {
  const recipesWithVideo = await getRecipesWithVideo();

  if (recipesWithVideo.length === 0) return null;

  return (
    <section className="bg-slate-50 py-16">
      <Container>
        <SectionTitle
          title="🎬 Video Tutorial"
          subtitle="Tonton langsung cara memasaknya dari YouTube, Instagram, dan TikTok."
        />

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {recipesWithVideo.map((recipe) => {
            const entries = getVideoEntries(recipe.video, recipe.image);
            const first = entries[0];
            if (!first) return null;

            return (
              <div key={recipe.id} className="space-y-3">
                <VideoThumbnail video={first} />

                <Link
                  href={`/recipes/${recipe.id}`}
                  className="block font-semibold text-slate-900 hover:text-blue-800"
                >
                  {recipe.title}
                </Link>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
