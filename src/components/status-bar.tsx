import { formatClock } from "@/lib/time";
import { BatteryIcon, SignalIcon, WifiIcon } from "./icons";

type StatusBarProps = {
  now: Date | null;
  unlocked: boolean;
  onLock: () => void;
};

export default function StatusBar({ now, unlocked, onLock }: StatusBarProps) {
  return (
    <div className="pointer-events-none absolute inset-x-0 top-0 z-40 flex h-12 items-center justify-between px-6 pt-[env(safe-area-inset-top)] text-white">
      <button
        type="button"
        onClick={onLock}
        onDoubleClick={onLock}
        disabled={!unlocked}
        title={unlocked ? "Lock screen" : undefined}
        className="pointer-events-auto min-w-[54px] text-left text-[15px] font-semibold tracking-tight drop-shadow-[0_1px_3px_rgba(0,0,0,0.5)]"
      >
        {now ? formatClock(now) : "9:41"}
      </button>

      <div className="absolute left-1/2 top-1/2 h-[29px] w-[104px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-black shadow-[0_1px_0_rgba(255,255,255,0.08)] ring-1 ring-white/10">
        <span className="absolute right-3 top-1/2 h-[7px] w-[7px] -translate-y-1/2 rounded-full bg-[#0b0b10] ring-1 ring-white/10" />
      </div>

      <div className="flex items-center gap-1.5">
        <SignalIcon className="h-[11px] w-[17px]" />
        <WifiIcon className="h-[11px] w-[16px]" />
        <BatteryIcon className="h-[12px] w-[26px]" />
      </div>
    </div>
  );
}
