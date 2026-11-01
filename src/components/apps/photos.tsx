"use client";

import Image from "next/image";
import { mediaSrc } from "@/lib/api-base";
import { useContent } from "@/lib/content-context";
import { CameraIcon } from "../icons";

const placeholders = [
  "from-[#f97316] via-[#ef4444] to-[#7c3aed]",
  "from-[#22d3ee] via-[#3b82f6] to-[#1e1b4b]",
  "from-[#fbbf24] via-[#f472b6] to-[#a855f7]",
  "from-[#34d399] via-[#0ea5e9] to-[#312e81]",
  "from-[#fca5a5] via-[#f472b6] to-[#6d28d9]",
  "from-[#fde68a] via-[#fb923c] to-[#b91c1c]",
  "from-[#a5b4fc] via-[#6366f1] to-[#111827]",
  "from-[#5eead4] via-[#14b8a6] to-[#0f766e]",
  "from-[#fda4af] via-[#e879f9] to-[#4c1d95]",
];

export default function PhotosApp() {
  const { photos } = useContent();

  if (photos.length > 0) {
    return (
      <>
        <p className="text-[12.5px] leading-snug text-white/60">
          Moments, fits, and behind the scenes.
        </p>
        <div className="mt-4 grid grid-cols-3 gap-1.5">
          {photos.map((photo) => (
            <div
              key={photo.id}
              className="relative aspect-[3/4] overflow-hidden rounded-[14px] bg-white/5"
            >
              <Image
                src={mediaSrc(photo.src)}
                alt={photo.alt}
                fill
                sizes="(max-width: 640px) 33vw, 130px"
                className="object-cover"
              />
            </div>
          ))}
        </div>
      </>
    );
  }

  return (
    <>
      <p className="text-[12.5px] leading-snug text-white/60">
        Moments, fits, and behind the scenes.
      </p>

      <div className="glass mt-4 flex items-center gap-3 rounded-[24px] p-4">
        <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-white/10 text-white">
          <CameraIcon className="h-5 w-5" />
        </span>
        <div>
          <p className="text-[13px] font-semibold">Photos coming soon</p>
          <p className="mt-0.5 text-[11.5px] leading-snug text-white/55">
            New shots will appear here.
          </p>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-3 gap-1.5" aria-hidden>
        {placeholders.map((gradient) => (
          <div
            key={gradient}
            className={`relative aspect-[3/4] overflow-hidden rounded-[14px] bg-gradient-to-br ${gradient}`}
          >
            <span className="absolute -bottom-6 -right-6 h-20 w-20 rounded-full bg-white/20 blur-xl" />
          </div>
        ))}
      </div>
    </>
  );
}
