import type { VideoLinks } from "@/data/recipes";

export type VideoPlatform = "youtube" | "instagram" | "tiktok";

export interface VideoInfo {
  platform: VideoPlatform;
  url: string;
  thumbnail: string;
  label: string;
}

function getYoutubeId(url: string): string | null {
  const match = url.match(
    /(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|shorts\/))([a-zA-Z0-9_-]{6,})/
  );
  return match ? match[1] : null;
}

/**
 * Builds a list of playable video entries with an auto-generated thumbnail
 * for every platform link a recipe has.
 *
 * - YouTube: uses YouTube's public thumbnail CDN (no API key required).
 * - Instagram / TikTok: these platforms don't allow anonymous thumbnail
 *   scraping without their oEmbed APIs (which need a server call), so we
 *   fall back to a branded placeholder thumbnail and open the original
 *   link in a new tab when clicked.
 */
export function getVideoEntries(
  video: VideoLinks | undefined,
  fallbackImage: string
): VideoInfo[] {
  if (!video) return [];

  const entries: VideoInfo[] = [];

  if (video.youtube) {
    const id = getYoutubeId(video.youtube);
    entries.push({
      platform: "youtube",
      url: video.youtube,
      thumbnail: id
        ? `https://img.youtube.com/vi/${id}/hqdefault.jpg`
        : fallbackImage,
      label: "YouTube",
    });
  }

  if (video.instagram) {
    entries.push({
      platform: "instagram",
      url: video.instagram,
      thumbnail: fallbackImage,
      label: "Instagram",
    });
  }

  if (video.tiktok) {
    entries.push({
      platform: "tiktok",
      url: video.tiktok,
      thumbnail: fallbackImage,
      label: "TikTok",
    });
  }

  return entries;
}
