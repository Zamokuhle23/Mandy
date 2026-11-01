"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useContent } from "@/lib/content-context";
import { formatClock, formatLongDate } from "@/lib/time";
import type { AppId } from "@/lib/types";
import { AppTile } from "./app-visuals";
import { CameraIcon, ChevronUp, FlashlightIcon, LockIcon } from "./icons";

type LockScreenProps = {
  now: Date | null;
  unlocked: boolean;
  onUnlock: () => void;
  onOpenApp: (id: AppId) => void;
};

const UNLOCK_DISTANCE = 64;
const FLICK_DISTANCE = 24;
const FLICK_VELOCITY = -0.5;

export default function LockScreen({
  now,
  unlocked,
  onUnlock,
  onOpenApp,
}: LockScreenProps) {
  const { site, notifications } = useContent();
  const [drag, setDrag] = useState(0);
  const [dragging, setDragging] = useState(false);
  const startY = useRef<number | null>(null);
  const dragRef = useRef(0);
  const movedRef = useRef(false);
  const lastSample = useRef({ y: 0, time: 0, velocity: 0 });

  const handlePointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    if (unlocked) return;
    movedRef.current = false;
    startY.current = event.clientY;
    lastSample.current = {
      y: event.clientY,
      time: performance.now(),
      velocity: 0,
    };
    setDragging(true);
  };

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (startY.current === null) return;

    dragRef.current = Math.min(0, event.clientY - startY.current);

    const time = performance.now();
    const elapsed = time - lastSample.current.time;
    if (elapsed > 0) {
      lastSample.current.velocity =
        (event.clientY - lastSample.current.y) / elapsed;
    }
    lastSample.current.y = event.clientY;
    lastSample.current.time = time;

    setDrag(dragRef.current);
  };

  const finishPointer = useCallback(() => {
    if (startY.current === null) return;
    startY.current = null;
    setDragging(false);

    movedRef.current = dragRef.current <= -8;

    const flicked =
      dragRef.current < -FLICK_DISTANCE &&
      lastSample.current.velocity < FLICK_VELOCITY;

    if (dragRef.current <= -UNLOCK_DISTANCE || flicked) {
      onUnlock();
    }

    dragRef.current = 0;
    setDrag(0);
  }, [onUnlock]);

  useEffect(() => {
    if (!dragging) return;

    const handleRelease = () => finishPointer();

    window.addEventListener("pointerup", handleRelease);
    window.addEventListener("pointercancel", handleRelease);

    return () => {
      window.removeEventListener("pointerup", handleRelease);
      window.removeEventListener("pointercancel", handleRelease);
    };
  }, [dragging, finishPointer]);

  const openNotification = (id: AppId) => {
    if (movedRef.current) {
      movedRef.current = false;
      return;
    }

    onOpenApp(id);
  };

  return (
    <div
      className="lock-surface absolute inset-0 z-20 flex select-none flex-col px-5 pb-7 pt-20"
      style={{
        touchAction: "none",
        transform: `translate3d(0, ${unlocked ? -1000 : drag}px, 0)`,
        opacity: unlocked ? 0 : 1,
        filter: unlocked ? "blur(12px)" : undefined,
        transition: dragging
          ? "none"
          : "transform 620ms cubic-bezier(0.22,1,0.36,1), opacity 420ms ease, filter 420ms ease",
      }}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
    >
      <h1 className="sr-only">
        {site.name} — {site.tagline}
      </h1>

      <div className="flex flex-col items-center">
        <LockIcon className="h-[15px] w-[15px] text-white/85" />
        <p className="mt-2 text-[13px] font-medium tracking-wide text-white/80">
          {now ? formatLongDate(now) : "\u00a0"}
        </p>
        <div className="mt-1 text-[78px] font-semibold leading-[0.92] tracking-[-0.055em] text-white drop-shadow-[0_10px_40px_rgba(0,0,0,0.4)]">
          {now ? formatClock(now) : "9:41"}
        </div>
      </div>

      <div className="mt-7 flex flex-col gap-2.5">
        {notifications.map((notification, index) => (
          <button
            key={notification.id}
            type="button"
            onClick={() => openNotification(notification.app)}
            className="glass animate-rise w-full rounded-[24px] p-3 text-left transition active:scale-[0.985]"
            style={{ animationDelay: `${120 + index * 80}ms` }}
          >
            <div className="flex items-center gap-2.5">
              <AppTile id={notification.app} size={32} />
              <span className="text-[10.5px] font-semibold uppercase tracking-[0.12em] text-white/60">
                {notification.appName}
              </span>
              <span className="ml-auto text-[11px] text-white/45">
                {notification.time}
              </span>
            </div>
            <p className="mt-2 text-[14px] font-semibold leading-tight text-white">
              {notification.title}
            </p>
            <p className="mt-0.5 line-clamp-2 text-[12.5px] leading-snug text-white/70">
              {notification.body}
            </p>
          </button>
        ))}
      </div>

      <div className="mt-auto flex items-end justify-between">
        <div className="glass grid h-12 w-12 place-items-center rounded-full text-white/90">
          <FlashlightIcon className="h-5 w-5" />
        </div>

        <button
          type="button"
          onClick={onUnlock}
          className="flex flex-col items-center gap-2 pb-1 text-white/85"
          aria-label="Unlock and open the home screen"
        >
          <ChevronUp className="animate-nudge h-5 w-5" />
          <span className="text-[11.5px] font-medium tracking-wide">
            Swipe up or tap to unlock
          </span>
        </button>

        <div className="glass grid h-12 w-12 place-items-center rounded-full text-white/90">
          <CameraIcon className="h-5 w-5" />
        </div>
      </div>
    </div>
  );
}
