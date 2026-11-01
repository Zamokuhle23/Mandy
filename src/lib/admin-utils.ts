import type { AppId } from "./types";

export const APP_OPTIONS: { value: AppId; label: string }[] = [
  { value: "shop", label: "Shop" },
  { value: "photos", label: "Photos" },
  { value: "about", label: "About" },
  { value: "whatsapp", label: "WhatsApp" },
  { value: "instagram", label: "Instagram" },
  { value: "tiktok", label: "TikTok" },
  { value: "facebook", label: "Facebook" },
  { value: "sayhi", label: "Say hi" },
];

export const APP_LABELS: Record<AppId, string> = Object.fromEntries(
  APP_OPTIONS.map((option) => [option.value, option.label]),
) as Record<AppId, string>;

export const DEFAULT_GRADIENTS = [
  "from-[#f7b267] via-[#f79d65] to-[#f4845f]",
  "from-[#8e9eab] via-[#667eea] to-[#4c51bf]",
  "from-[#fbc2eb] via-[#a6c1ee] to-[#8b5cf6]",
  "from-[#a8e063] via-[#56ab2f] to-[#2f8f46]",
  "from-[#f97316] via-[#ef4444] to-[#7c3aed]",
  "from-[#22d3ee] via-[#3b82f6] to-[#1e1b4b]",
];

export function gradientFor(index: number): string {
  return DEFAULT_GRADIENTS[index % DEFAULT_GRADIENTS.length];
}

export function slugify(value: string): string {
  return value
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[^\w\s-]/g, "")
    .trim()
    .replace(/[\s_]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

export function uniqueId(value: string, used: Set<string>): string {
  const base = slugify(value) || "item";
  let candidate = base;
  let suffix = 2;

  while (used.has(candidate)) {
    candidate = `${base}-${suffix}`;
    suffix += 1;
  }

  used.add(candidate);
  return candidate;
}

export function moveItem<T>(items: T[], index: number, direction: -1 | 1): T[] {
  const target = index + direction;
  if (target < 0 || target >= items.length) return items;

  const next = [...items];
  [next[index], next[target]] = [next[target], next[index]];
  return next;
}

export function splitList(value: string): string[] {
  return value
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

export function joinList(value: string[]): string {
  return value.join(", ");
}
