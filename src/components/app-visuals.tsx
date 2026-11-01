import type { ReactNode } from "react";
import type { AppId } from "@/lib/types";
import {
  ChatGlyph,
  FacebookGlyph,
  InstagramGlyph,
  PhotosGlyph,
  ShopGlyph,
  TikTokGlyph,
  UserGlyph,
  WhatsAppGlyph,
} from "./icons";

type Visual = {
  label: string;
  bg: string;
  icon: ReactNode;
  iconWrapper?: string;
};

export const appVisuals: Record<AppId, Visual> = {
  shop: {
    label: "Shop",
    bg: "bg-gradient-to-br from-[#ffb15c] via-[#ff7a59] to-[#ff3d6e]",
    icon: <ShopGlyph className="h-full w-full" />,
  },
  photos: {
    label: "Photos",
    bg: "bg-white",
    icon: <PhotosGlyph className="h-full w-full" />,
    iconWrapper: "[&_svg]:h-[82%] [&_svg]:w-[82%]",
  },
  about: {
    label: "About",
    bg: "bg-gradient-to-br from-[#a78bfa] via-[#7c3aed] to-[#4f46e5]",
    icon: <UserGlyph className="h-full w-full" />,
  },
  whatsapp: {
    label: "WhatsApp",
    bg: "bg-gradient-to-br from-[#3ee07f] to-[#0f9d58]",
    icon: <WhatsAppGlyph className="h-full w-full" />,
  },
  instagram: {
    label: "Instagram",
    bg: "bg-[radial-gradient(circle_at_28%_105%,#fdc468_0%,#df4996_42%,#8a3ab9_68%,#4c68d7_100%)]",
    icon: <InstagramGlyph className="h-full w-full" />,
  },
  tiktok: {
    label: "TikTok",
    bg: "bg-black",
    icon: <TikTokGlyph className="h-full w-full" />,
  },
  facebook: {
    label: "Facebook",
    bg: "bg-[#1877f2]",
    icon: <FacebookGlyph className="h-full w-full" />,
  },
  sayhi: {
    label: "Say hi",
    bg: "bg-gradient-to-br from-[#5eead4] via-[#22d3ee] to-[#0ea5e9]",
    icon: <ChatGlyph className="h-full w-full" />,
  },
};

type AppTileProps = {
  id: AppId;
  size?: number;
  className?: string;
};

export function AppTile({ id, size = 60, className = "" }: AppTileProps) {
  const visual = appVisuals[id];
  const radius = size >= 48 ? "rounded-[17px]" : "rounded-[10px]";

  return (
    <span
      className={`app-icon relative grid shrink-0 place-items-center overflow-hidden ${radius} ${visual.bg} ${
        visual.iconWrapper ?? "[&_svg]:h-[56%] [&_svg]:w-[56%]"
      } ${className}`}
      style={{ width: size, height: size }}
    >
      {visual.icon}
    </span>
  );
}
