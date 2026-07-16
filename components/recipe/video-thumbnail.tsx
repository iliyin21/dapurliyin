"use client";

import Image from "next/image";
import { Play } from "lucide-react";
import { FaYoutube, FaInstagram, FaTiktok } from "react-icons/fa";

import type { VideoInfo } from "@/lib/video";

const platformIcon = {
  youtube: FaYoutube,
  instagram: FaInstagram,
  tiktok: FaTiktok,
};

const platformColor = {
  youtube: "bg-red-600",
  instagram: "bg-gradient-to-tr from-purple-600 to-pink-500",
  tiktok: "bg-black",
};

interface VideoThumbnailProps {
  video: VideoInfo;
}

export default function VideoThumbnail({ video }: VideoThumbnailProps) {
  const Icon = platformIcon[video.platform];

  return (
    <a
      href={video.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative block aspect-video overflow-hidden rounded-2xl bg-slate-200 shadow-sm"
    >
      <Image
        src={video.thumbnail}
        alt={`Video tutorial di ${video.label}`}
        fill
        className="object-cover transition duration-500 group-hover:scale-105"
      />

      <div className="absolute inset-0 flex items-center justify-center bg-black/30 transition group-hover:bg-black/40">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white/90 shadow-lg transition group-hover:scale-110">
          <Play size={24} className="ml-1 fill-slate-900 text-slate-900" />
        </div>
      </div>

      <div
        className={`absolute left-3 top-3 flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold text-white ${platformColor[video.platform]}`}
      >
        <Icon size={12} />
        {video.label}
      </div>
    </a>
  );
}
