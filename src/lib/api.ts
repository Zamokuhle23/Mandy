import { apiBase } from "./api-base";
import type { Content } from "./types";

const TOKEN_KEY = "mandy-admin-token";

export class ApiError extends Error {
  status: number;

  constructor(status: number, message: string) {
    super(message);
    this.name = "ApiError";
    this.status = status;
  }
}

async function errorMessage(response: Response): Promise<string> {
  try {
    const data = (await response.json()) as { error?: string };
    return data.error || response.statusText;
  } catch {
    return response.statusText;
  }
}

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(`${apiBase()}${path}`, init);

  if (!response.ok) {
    throw new ApiError(response.status, await errorMessage(response));
  }

  return (await response.json()) as T;
}

function authHeaders(): HeadersInit {
  const token = getAdminToken();
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };
  if (token) headers.Authorization = `Bearer ${token}`;
  return headers;
}

export async function fetchPublicContent(signal?: AbortSignal): Promise<Content> {
  return request<Content>("/api/content", { signal, cache: "no-store" });
}

export function getAdminToken(): string | null {
  if (typeof window === "undefined") return null;
  return window.localStorage.getItem(TOKEN_KEY);
}

export function setAdminToken(token: string | null): void {
  if (typeof window === "undefined") return;
  if (token) {
    window.localStorage.setItem(TOKEN_KEY, token);
  } else {
    window.localStorage.removeItem(TOKEN_KEY);
  }
}

export async function adminLogin(password: string): Promise<string> {
  const data = await request<{ token: string }>("/api/admin/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ password }),
  });
  setAdminToken(data.token);
  return data.token;
}

export async function fetchAdminContent(): Promise<Content> {
  return request<Content>("/api/admin/content", {
    headers: authHeaders(),
    cache: "no-store",
  });
}

export async function saveAdminContent(content: Content): Promise<Content> {
  return request<Content>("/api/admin/content", {
    method: "PUT",
    headers: authHeaders(),
    body: JSON.stringify(content),
  });
}

export async function uploadImage(file: File): Promise<string> {
  const token = getAdminToken();
  const form = new FormData();
  form.append("file", file);

  const headers: Record<string, string> = {};
  if (token) headers.Authorization = `Bearer ${token}`;

  const response = await fetch(`${apiBase()}/api/admin/upload`, {
    method: "POST",
    headers,
    body: form,
  });

  if (!response.ok) {
    throw new ApiError(response.status, await errorMessage(response));
  }

  const data = (await response.json()) as { url: string };
  return data.url;
}
