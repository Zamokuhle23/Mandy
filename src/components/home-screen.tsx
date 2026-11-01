"use client";

import Image from "next/image";
import { mediaSrc } from "@/lib/api-base";
import { useContent } from "@/lib/content-context";
import type { AppId } from "@/lib/types";
import { appVisuals, AppTile } from "./app-visuals";
import { ArrowRight } from "./icons";

type HomeScreenProps = {
  unlocked: boolean;
  onOpenApp: (id: AppId) => void;
};

const gridApps: AppId[] = ["tiktok", "facebook", "about", "sayhi"];
const dockApps: AppId[] = ["shop", "photos", "whatsapp", "instagram"];

export default function HomeScreen({ unlocked, onOpenApp }: HomeScreenProps) {
  const { site, photos } = useContent();
  const previews = photos.slice(0, 3);

  return (
    <div
      className={`absolute inset-0 z-10 flex flex-col px-6 pb-6 pt-16 transition-all duration-700 ${
        unlocked
          ? "pointer-events-auto scale-100 opacity-100"
          : "pointer-events-none scale-[1.05] opacity-0"
      }`}
      style={{
        transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)",
      }}
    >
      <button
        type="button"
        onClick={() => onOpenApp("shop")}
        className="glass relative h-[160px] w-full overflow-hidden rounded-[30px] text-left transition active:scale-[0.985]"
      >
        <span className="absolute -right-10 -top-14 h-48 w-48 rounded-full bg-[#ff3d6e]/50 blur-3xl" />
        <span className="absolute -bottom-16 left-6 h-40 w-40 rounded-full bg-[#f59e0b]/30 blur-3xl" />
        <span className="pointer-events-none absolute -bottom-10 right-2 text-[150px] font-black leading-none text-white/[0.06]">
          M
        </span>
        <div className="relative flex h-full flex-col justify-between p-5">
          <div className="flex items-center gap-2 text-[10.5px] font-semibold uppercase tracking-[0.16em] text-white/65">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.9)]" />
            New drop live
          </div>
          <div>
            <p className="text-[27px] font-semibold leading-tight tracking-[-0.02em]">
              {site.tagline}
            </p>
            <span className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-white px-3.5 py-1.5 text-[12px] font-semibold text-black">
              Shop now
              <ArrowRight className="h-3.5 w-3.5" />
            </span>
          </div>
        </div>
      </button>

      <div className="mt-8 grid grid-cols-4 justify-items-center gap-x-2 gap-y-6">
        {gridApps.map((id) => (
          <button
            key={id}
            type="button"
            onClick={() => onOpenApp(id)}
            className="flex w-full flex-col items-center gap-2 transition active:scale-95"
          >
            <AppTile id={id} size={60} />
            <span className="text-[11px] font-medium tracking-tight text-white/90 drop-shadow-[0_1px_4px_rgba(0,0,0,0.6)]">
              {appVisuals[id].label}
            </span>
          </button>
        ))}
      </div>

      <div className="mt-6 grid grid-cols-2 gap-3">
        <button
          type="button"
          onClick={() => onOpenApp("photos")}
          className="glass relative overflow-hidden rounded-[24px] p-3.5 text-left transition active:scale-[0.975]"
        >
          <div className="grid grid-cols-3 gap-1">
            {previews.length > 0
              ? previews.map((photo) => (
                  <span
                    key={photo.id}
                    className="relative aspect-square overflow-hidden rounded-[5px] bg-white/10"
                  >
                    <Image
                      src={mediaSrc(photo.src)}
                      alt=""
                      fill
                      sizes="80px"
                      className="object-cover"
                    />
                  </span>
                ))
              : [
                  "from-[#f97316] to-[#7c3aed]",
                  "from-[#22d3ee] to-[#1e1b4b]",
                  "from-[#fbbf24] to-[#a855f7]",
                ].map((gradient) => (
                  <span
                    key={gradient}
                    className={`aspect-square rounded-[5px] bg-gradient-to-br ${gradient}`}
                  />
                ))}
          </div>
          <p className="mt-3 text-[12px] font-semibold">Photos</p>
          <p className="text-[10.5px] text-white/65">Latest shoot</p>
        </button>

        <button
          type="button"
          onClick={() => onOpenApp("sayhi")}
          className="glass relative overflow-hidden rounded-[24px] p-3.5 text-left transition active:scale-[0.975]"
        >
          <span className="absolute -right-5 -top-6 h-20 w-20 rounded-full bg-[#25d366]/40 blur-2xl" />
          <div className="relative">
            <AppTile id="whatsapp" size={34} />
            <p className="mt-2.5 text-[12px] font-semibold">Say hi</p>
            <p className="text-[10.5px] text-white/65">Replies fast</p>
          </div>
        </button>
      </div>

      <div className="mt-auto flex flex-col items-center gap-3.5">
        <div className="flex items-center gap-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-white" />
          <span className="h-1.5 w-1.5 rounded-full bg-white/35" />
          <span className="h-1.5 w-1.5 rounded-full bg-white/35" />
        </div>

        <div className="glass flex w-full items-center justify-around rounded-[34px] px-3 py-3">
          {dockApps.map((id) => (
            <button
              key={id}
              type="button"
              onClick={() => onOpenApp(id)}
              aria-label={appVisuals[id].label}
              className="transition active:scale-90"
            >
              <AppTile id={id} size={58} />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
