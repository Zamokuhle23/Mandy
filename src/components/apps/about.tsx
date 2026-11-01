"use client";

import { externalUrl } from "@/lib/config";
import { useContent } from "@/lib/content-context";
import { appVisuals, AppTile } from "../app-visuals";
import { ArrowUpRight } from "../icons";

type AboutAppProps = {
  notify: (message: string) => void;
};

const socialApps = ["instagram", "tiktok", "facebook"] as const;

export default function AboutApp({ notify }: AboutAppProps) {
  const { site } = useContent();
  const sayHi = externalUrl(site, "sayhi");
  const meta = [site.handle, site.location].filter(Boolean).join(" · ");

  return (
    <>
      <div className="flex flex-col items-center pt-2 text-center">
        <span className="relative grid h-24 w-24 place-items-center overflow-hidden rounded-full bg-gradient-to-br from-[#fbbf24] via-[#f472b6] to-[#7c3aed] text-[34px] font-semibold shadow-[0_20px_40px_-15px_rgba(124,58,237,0.8)] ring-4 ring-white/10">
          {site.name.charAt(0).toUpperCase() || "M"}
        </span>
        <h3 className="mt-4 text-[24px] font-semibold tracking-[-0.02em]">
          {site.name}
        </h3>
        {meta ? (
          <p className="text-[13px] text-white/55">{meta}</p>
        ) : null}
      </div>

      {site.bio.length > 0 ? (
        <div className="glass mt-6 rounded-[24px] p-4">
          {site.bio.map((paragraph, index) => (
            <p
              key={`${index}-${paragraph.slice(0, 12)}`}
              className={`text-[13px] leading-relaxed text-white/75 ${
                index > 0 ? "mt-3" : ""
              }`}
            >
              {paragraph}
            </p>
          ))}
        </div>
      ) : null}

      <div className="mt-4 grid grid-cols-3 gap-3">
        {socialApps.map((id) => {
          const url = externalUrl(site, id);
          return (
            <button
              key={id}
              type="button"
              onClick={() => {
                if (url) {
                  window.open(url, "_blank", "noopener,noreferrer");
                } else {
                  notify(`${appVisuals[id].label} link coming soon`);
                }
              }}
              className="glass flex flex-col items-center gap-2 rounded-[20px] px-2 py-3 transition active:scale-95"
            >
              <AppTile id={id} size={40} />
              <span className="text-[11px] font-medium text-white/80">
                {appVisuals[id].label}
              </span>
            </button>
          );
        })}
      </div>

      {sayHi ? (
        <a
          href={sayHi}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 flex w-full items-center justify-center gap-2 rounded-full bg-[#25d366] px-5 py-3.5 text-[14px] font-semibold text-[#052e16] transition active:scale-[0.98]"
        >
          Say hi on WhatsApp
          <ArrowUpRight className="h-4 w-4" />
        </a>
      ) : (
        <button
          type="button"
          onClick={() => notify("WhatsApp is coming soon.")}
          className="glass mt-4 flex w-full items-center justify-center gap-2 rounded-full px-5 py-3.5 text-[14px] font-semibold text-white/85 transition active:scale-[0.98]"
        >
          Say hi on WhatsApp
          <ArrowUpRight className="h-4 w-4" />
        </button>
      )}
    </>
  );
}
