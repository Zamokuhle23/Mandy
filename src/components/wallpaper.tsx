"use client";

import Image from "next/image";
import { mediaSrc } from "@/lib/api-base";
import { useContent } from "@/lib/content-context";

export default function Wallpaper() {
  const { site } = useContent();
  const wallpaper = mediaSrc(site.wallpaper);

  return (
    <div
      className="pointer-events-none absolute inset-0 overflow-hidden bg-[#08060f]"
      aria-hidden
    >
      {wallpaper ? (
        <Image
          src={wallpaper}
          alt=""
          fill
          priority
          sizes="(max-width: 640px) 100vw, 390px"
          className="object-cover"
        />
      ) : null}

      {wallpaper ? (
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(5,5,10,0.42),rgba(5,5,10,0.58))]" />
      ) : null}

      {!wallpaper ? (
        <>
          <div className="absolute -left-[30%] -top-[22%] h-[70%] w-[95%] rounded-full bg-[#7c3aed]/60 blur-[70px] animate-drift" />
          <div className="absolute -right-[35%] top-[16%] h-[62%] w-[90%] rounded-full bg-[#db2777]/50 blur-[80px] animate-drift [animation-delay:-6s]" />
          <div className="absolute -bottom-[18%] left-[5%] h-[55%] w-[85%] rounded-full bg-[#0ea5e9]/40 blur-[80px] animate-drift [animation-delay:-12s]" />
          <div className="absolute right-[10%] top-[48%] h-[38%] w-[55%] rounded-full bg-[#f59e0b]/20 blur-[70px] animate-drift [animation-delay:-3s]" />
          <div className="absolute inset-0 bg-[linear-gradient(160deg,rgba(10,8,20,0.2),rgba(5,5,10,0.55))]" />
        </>
      ) : null}
      <div className="absolute inset-0 bg-[radial-gradient(120%_85%_at_50%_0%,transparent_20%,rgba(0,0,0,0.55)_100%)]" />
      <div className="noise absolute inset-0" />
    </div>
  );
}
