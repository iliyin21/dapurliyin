import VideoThumbnail from "./video-thumbnail";
import { getVideoEntries } from "@/lib/video";
import type { VideoLinks } from "@/data/recipes";

interface VideoTutorialCardProps {
  video?: VideoLinks;
  fallbackImage: string;
}

export default function VideoTutorialCard({
  video,
  fallbackImage,
}: VideoTutorialCardProps) {
  const entries = getVideoEntries(video, fallbackImage);

  if (entries.length === 0) return null;

  return (
    <section className="rounded-3xl border bg-white p-6 shadow-sm md:p-8">
      <div className="mb-6">
        <h2 className="text-2xl font-bold">Video Tutorial</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Klik thumbnail untuk menonton langsung dari sumbernya.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {entries.map((entry) => (
          <VideoThumbnail key={entry.platform} video={entry} />
        ))}
      </div>
    </section>
  );
}
