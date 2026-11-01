const configured = process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, "");

export function apiBase(): string {
  if (configured) return configured;

  if (typeof window !== "undefined") {
    const { protocol, hostname } = window.location;
    if (hostname === "localhost" || hostname === "127.0.0.1") {
      return "http://localhost:4000";
    }
    return `${protocol}//${hostname}:4000`;
  }

  return "http://localhost:4000";
}

export function mediaSrc(src: string): string {
  if (!src) return "";
  if (src.startsWith("/uploads/")) {
    return `${apiBase()}${src}`;
  }
  return src;
}
