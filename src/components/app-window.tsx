"use client";

import type { AppId } from "@/lib/types";
import { appVisuals } from "./app-visuals";
import AboutApp from "./apps/about";
import PhotosApp from "./apps/photos";
import ShopApp from "./apps/shop";
import { XIcon } from "./icons";

type AppWindowProps = {
  app: AppId;
  onClose: () => void;
  notify: (message: string) => void;
};

const internalApps: AppId[] = ["shop", "photos", "about"];

export default function AppWindow({ app, onClose, notify }: AppWindowProps) {
  if (!internalApps.includes(app)) {
    return null;
  }

  const title = appVisuals[app].label;

  return (
    <div
      className="app-surface animate-app-in absolute inset-0 z-30"
      role="dialog"
      aria-modal="true"
      aria-label={title}
    >
      <div className="absolute inset-0 bg-[#09080e]" />
      <div className="absolute inset-0 bg-[radial-gradient(120%_60%_at_20%_0%,rgba(76,48,132,0.5),transparent_65%)]" />

      <div className="relative flex h-full flex-col">
        <header className="flex items-center gap-3 px-5 pb-4 pt-[calc(env(safe-area-inset-top,0px)+58px)]">
          <h2 className="text-[28px] font-semibold tracking-[-0.025em]">
            {title}
          </h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="glass ml-auto grid h-9 w-9 place-items-center rounded-full text-white/85 transition active:scale-95"
          >
            <XIcon className="h-4 w-4" />
          </button>
        </header>

        <div className="no-scrollbar min-h-0 flex-1 overflow-y-auto px-5 pb-24">
          {app === "shop" && <ShopApp notify={notify} />}
          {app === "photos" && <PhotosApp />}
          {app === "about" && <AboutApp notify={notify} />}
        </div>
      </div>
    </div>
  );
}
