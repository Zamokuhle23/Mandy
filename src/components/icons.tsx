type IconProps = {
  className?: string;
};

export function ShopGlyph({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <path
        d="M6.2 8.4h11.6l-1.05 11.1a1.4 1.4 0 0 1-1.4 1.3H8.65a1.4 1.4 0 0 1-1.4-1.3L6.2 8.4Z"
        stroke="white"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
      <path
        d="M9.1 9V7.1a2.9 2.9 0 0 1 5.8 0V9"
        stroke="white"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function PhotosGlyph({ className }: IconProps) {
  const petals = [
    "#f43f5e",
    "#f97316",
    "#facc15",
    "#84cc16",
    "#06b6d4",
    "#3b82f6",
    "#8b5cf6",
    "#ec4899",
  ];

  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden>
      {petals.map((color, index) => (
        <ellipse
          key={color}
          cx="24"
          cy="13.5"
          rx="6.2"
          ry="10.5"
          fill={color}
          transform={`rotate(${index * 45} 24 24)`}
          opacity="0.92"
        />
      ))}
      <circle cx="24" cy="24" r="4.4" fill="#ffffff" />
    </svg>
  );
}

export function WhatsAppGlyph({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <path
        d="M12 21a9 9 0 1 0-7.4-3.9L3.4 21l4-1.1A9 9 0 0 0 12 21Z"
        stroke="white"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <path
        d="M9.1 8.2c.2-.4.5-.4.8-.4h.6c.2 0 .5 0 .7.5l.8 1.9c.1.2 0 .5-.1.7l-.6.7c-.1.2-.2.4 0 .7.4.7 1 1.4 1.8 1.9.3.2.5.2.7 0l.8-.8c.2-.2.5-.2.7-.1l1.9.9c.3.1.4.3.4.6 0 .6-.3 1.5-.9 1.9-.5.4-1.3.6-2.2.3-1.4-.4-3-1.3-4.4-2.7-1.3-1.3-2.1-2.7-2.4-3.8-.2-.9.1-1.8.5-2.3Z"
        fill="white"
      />
    </svg>
  );
}

export function InstagramGlyph({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <rect
        x="3.6"
        y="3.6"
        width="16.8"
        height="16.8"
        rx="5.2"
        stroke="white"
        strokeWidth="1.8"
      />
      <circle cx="12" cy="12" r="4" stroke="white" strokeWidth="1.8" />
      <circle cx="17.1" cy="6.9" r="1.2" fill="white" />
    </svg>
  );
}

export function TikTokGlyph({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden>
      <g transform="translate(-1.1 -0.5)">
        <path
          d="M14 3v9.4a3.4 3.4 0 1 1-3-3.37V6.16l7-1.5V3Z"
          fill="#25f4ee"
        />
      </g>
      <g transform="translate(1.1 0.5)">
        <path
          d="M14 3v9.4a3.4 3.4 0 1 1-3-3.37V6.16l7-1.5V3Z"
          fill="#fe2c55"
        />
      </g>
      <path
        d="M14 3v9.4a3.4 3.4 0 1 1-3-3.37V6.16l7-1.5V3Z"
        fill="white"
      />
    </svg>
  );
}

export function FacebookGlyph({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden>
      <path
        d="M13.6 21.5v-7.3h2.5l.4-2.9h-2.9V9.4c0-.83.23-1.4 1.43-1.4h1.53V5.4c-.26-.04-1.18-.11-2.25-.11-2.23 0-3.76 1.36-3.76 3.86v2.15H8v2.9h2.6v7.3h3Z"
        fill="white"
      />
    </svg>
  );
}

export function UserGlyph({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <circle cx="12" cy="8.2" r="3.6" stroke="white" strokeWidth="1.7" />
      <path
        d="M4.8 20c.6-3.5 3.6-5.6 7.2-5.6s6.6 2.1 7.2 5.6"
        stroke="white"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function ChatGlyph({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <path
        d="M20.4 11.6c0 4-3.7 7.2-8.3 7.2-.9 0-1.8-.1-2.6-.4L4.6 20l1.1-3.5a6.8 6.8 0 0 1-2.1-4.9c0-4 3.7-7.2 8.4-7.2s8.4 3.2 8.4 7.2Z"
        stroke="white"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <circle cx="8.4" cy="11.6" r="1.1" fill="white" />
      <circle cx="12.1" cy="11.6" r="1.1" fill="white" />
      <circle cx="15.8" cy="11.6" r="1.1" fill="white" />
    </svg>
  );
}

export function ChevronUp({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <path
        d="m6 14.5 6-5.5 6 5.5"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function XIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <path
        d="M6.5 6.5l11 11m0-11-11 11"
        stroke="currentColor"
        strokeWidth="1.9"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function ArrowRight({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <path
        d="M5 12h13m0 0-5-5m5 5-5 5"
        stroke="currentColor"
        strokeWidth="1.9"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function ArrowUpRight({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <path
        d="M7 17 17 7m0 0H9m8 0v8"
        stroke="currentColor"
        strokeWidth="1.9"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function PlusIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <path
        d="M12 5v14M5 12h14"
        stroke="currentColor"
        strokeWidth="1.9"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function MinusIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <path d="M5 12h14" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" />
    </svg>
  );
}

export function LockIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <rect
        x="5.2"
        y="10.4"
        width="13.6"
        height="9.4"
        rx="2.6"
        stroke="currentColor"
        strokeWidth="1.6"
      />
      <path
        d="M8.4 10.2V8a3.6 3.6 0 0 1 7.2 0v2.2"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function FlashlightIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <path
        d="M9.4 3.6h5.2v3.1l-1.2 2.1v11.6h-2.8V8.8L9.4 6.7V3.6Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path d="M10.6 6.7h2.8" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

export function CameraIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <path
        d="M4.2 8.6h2.6l1.2-1.8h8l1.2 1.8h2.6a1.4 1.4 0 0 1 1.4 1.4v8.2a1.4 1.4 0 0 1-1.4 1.4H4.2a1.4 1.4 0 0 1-1.4-1.4V10a1.4 1.4 0 0 1 1.4-1.4Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <circle cx="12" cy="14" r="3.4" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

export function SignalIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 18 12" fill="currentColor" className={className} aria-hidden>
      <rect x="0" y="8" width="3" height="4" rx="1" />
      <rect x="5" y="5.6" width="3" height="6.4" rx="1" />
      <rect x="10" y="3" width="3" height="9" rx="1" />
      <rect x="15" y="0.5" width="3" height="11.5" rx="1" />
    </svg>
  );
}

export function WifiIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 18 13" fill="none" className={className} aria-hidden>
      <path
        d="M1.5 4.4a10.6 10.6 0 0 1 15 0M4.2 7.2a6.7 6.7 0 0 1 9.6 0M7 9.9a2.8 2.8 0 0 1 4 0"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
      <circle cx="9" cy="11.9" r="1.1" fill="currentColor" />
    </svg>
  );
}

export function BatteryIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 26 13" fill="none" className={className} aria-hidden>
      <rect
        x="0.8"
        y="0.8"
        width="21.4"
        height="11.4"
        rx="3.2"
        stroke="currentColor"
        strokeOpacity="0.45"
        strokeWidth="1.2"
      />
      <rect x="2.6" y="2.6" width="16.2" height="7.8" rx="2" fill="currentColor" />
      <path
        d="M24 4.6v3.8a2.4 2.4 0 0 0 0-3.8Z"
        fill="currentColor"
        fillOpacity="0.45"
      />
    </svg>
  );
}
