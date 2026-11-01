"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { externalUrl } from "@/lib/config";
import { useContent } from "@/lib/content-context";
import type { AppId } from "@/lib/types";
import AppWindow from "./app-window";
import { appVisuals } from "./app-visuals";
import HomeScreen from "./home-screen";
import LockScreen from "./lock-screen";
import StatusBar from "./status-bar";
import Toast from "./toast";
import Wallpaper from "./wallpaper";

const internalApps: AppId[] = ["shop", "photos", "about"];

export default function Phone() {
  const { site } = useContent();
  const [now, setNow] = useState<Date | null>(null);
  const [unlocked, setUnlocked] = useState(false);
  const [openApp, setOpenApp] = useState<AppId | null>(null);
  const [toast, setToast] = useState<string | null>(null);
  const toastTimer = useRef<number | null>(null);

  useEffect(() => {
    const tick = () => setNow(new Date());
    const timeout = window.setTimeout(tick, 0);
    const interval = window.setInterval(tick, 15000);

    return () => {
      window.clearTimeout(timeout);
      window.clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    return () => {
      if (toastTimer.current) {
        window.clearTimeout(toastTimer.current);
      }
    };
  }, []);

  const notify = useCallback((message: string) => {
    setToast(message);
    if (toastTimer.current) {
      window.clearTimeout(toastTimer.current);
    }
    toastTimer.current = window.setTimeout(() => setToast(null), 2800);
  }, []);

  const handleOpenApp = useCallback(
    (id: AppId) => {
      if (internalApps.includes(id)) {
        setUnlocked(true);
        setOpenApp(id);
        return;
      }

      const url = externalUrl(site, id);
      if (!url) {
        notify(`${appVisuals[id].label} link coming soon`);
        return;
      }

      window.open(url, "_blank", "noopener,noreferrer");
    },
    [notify, site],
  );

  const handleLock = useCallback(() => {
    setOpenApp(null);
    setUnlocked(false);
  }, []);

  useEffect(() => {
    const handleKey = (event: KeyboardEvent) => {
      if (event.key !== "Escape") {
        return;
      }

      if (openApp) {
        setOpenApp(null);
      } else if (unlocked) {
        handleLock();
      }
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [handleLock, openApp, unlocked]);

  return (
    <main className="flex min-h-dvh w-full items-center justify-center sm:p-6">
      <div className="relative h-dvh w-full overflow-hidden bg-black sm:h-[844px] sm:max-h-[92dvh] sm:w-[390px] sm:rounded-[52px] sm:ring-[6px] sm:ring-[#101013] sm:shadow-[0_60px_140px_-30px_rgba(124,58,237,0.45)]">
        <Wallpaper />

        <HomeScreen unlocked={unlocked} onOpenApp={handleOpenApp} />

        <LockScreen
          now={now}
          unlocked={unlocked}
          onUnlock={() => setUnlocked(true)}
          onOpenApp={handleOpenApp}
        />

        <StatusBar now={now} unlocked={unlocked} onLock={handleLock} />

        {openApp ? (
          <AppWindow
            app={openApp}
            onClose={() => setOpenApp(null)}
            notify={notify}
          />
        ) : null}

        <div className="pointer-events-none absolute bottom-[max(8px,env(safe-area-inset-bottom))] left-1/2 z-50 h-[5px] w-32 -translate-x-1/2 rounded-full bg-white/80" />

        <Toast key={toast ?? "idle"} message={toast} />
      </div>
    </main>
  );
}
