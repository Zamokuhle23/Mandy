"use client";

import { useCallback, useEffect, useState } from "react";
import {
  adminLogin,
  ApiError,
  fetchAdminContent,
  getAdminToken,
  saveAdminContent,
  setAdminToken,
} from "@/lib/api";
import type { Content } from "@/lib/types";
import { CategoriesEditor } from "./categories-editor";
import { secondaryButton } from "./fields";
import { LoginView } from "./login-view";
import { NotificationsEditor } from "./notifications-editor";
import { PhotosEditor } from "./photos-editor";
import { ProductsEditor } from "./products-editor";
import { SiteEditor } from "./site-editor";

const TABS = [
  { id: "site", label: "Site" },
  { id: "products", label: "Products" },
  { id: "categories", label: "Categories" },
  { id: "photos", label: "Photos" },
  { id: "notifications", label: "Notifications" },
] as const;

type Tab = (typeof TABS)[number]["id"];

type Status = {
  type: "ok" | "error";
  text: string;
};

function errorText(error: unknown): string {
  return error instanceof Error ? error.message : "Something went wrong.";
}

export function AdminApp() {
  const [content, setContent] = useState<Content | null>(null);
  const [checking, setChecking] = useState(true);
  const [loadError, setLoadError] = useState("");
  const [busy, setBusy] = useState(false);
  const [tab, setTab] = useState<Tab>("site");
  const [status, setStatus] = useState<Status | null>(null);

  useEffect(() => {
    let active = true;

    if (!getAdminToken()) {
      const timer = window.setTimeout(() => {
        if (active) setChecking(false);
      }, 0);

      return () => {
        active = false;
        window.clearTimeout(timer);
      };
    }

    fetchAdminContent()
      .then((data) => {
        if (active) setContent(data);
      })
      .catch((error: unknown) => {
        if (!active) return;
        if (error instanceof ApiError && error.status === 401) {
          setAdminToken(null);
        } else {
          setLoadError(errorText(error));
        }
      })
      .finally(() => {
        if (active) setChecking(false);
      });

    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    if (status?.type !== "ok") return;
    const timer = window.setTimeout(() => setStatus(null), 3000);
    return () => window.clearTimeout(timer);
  }, [status]);

  const handleLogin = useCallback(async (password: string) => {
    await adminLogin(password);
    const data = await fetchAdminContent();
    setContent(data);
    setLoadError("");
  }, []);

  function handleLogout() {
    setAdminToken(null);
    setContent(null);
    setStatus(null);
    setLoadError("");
  }

  function handleChange(next: Content) {
    setContent(next);
    if (status?.type === "ok") setStatus(null);
  }

  async function handleSave() {
    if (!content || busy) return;

    setBusy(true);
    setStatus(null);

    try {
      const saved = await saveAdminContent(content);
      setContent(saved);
      setStatus({ type: "ok", text: "Saved" });
    } catch (error) {
      if (error instanceof ApiError && error.status === 401) {
        setAdminToken(null);
        setContent(null);
        return;
      }
      setStatus({ type: "error", text: errorText(error) });
    } finally {
      setBusy(false);
    }
  }

  if (checking) {
    return (
      <main className="grid min-h-dvh place-items-center bg-[#07070a] text-white">
        <p className="text-[13px] text-white/50">Loading admin…</p>
      </main>
    );
  }

  if (loadError) {
    return (
      <main className="grid min-h-dvh place-items-center bg-[#07070a] px-4 text-white">
        <div className="w-full max-w-md rounded-3xl border border-white/10 bg-white/[0.03] p-6">
          <h1 className="text-[18px] font-semibold">Cannot reach the API</h1>
          <p className="mt-2 text-[12.5px] leading-relaxed text-white/50">
            {loadError}
          </p>
          <div className="mt-5 flex gap-2">
            <button
              type="button"
              onClick={() => window.location.reload()}
              className={secondaryButton}
            >
              Retry
            </button>
            <button
              type="button"
              onClick={handleLogout}
              className={secondaryButton}
            >
              Log out
            </button>
          </div>
        </div>
      </main>
    );
  }

  if (!content) {
    return <LoginView onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-dvh bg-[#07070a] text-white">
      <header className="sticky top-0 z-20 border-b border-white/10 bg-[#07070a]/90 backdrop-blur">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-3 px-4 py-3">
          <div className="flex items-center gap-2.5">
            <span className="grid h-8 w-8 place-items-center rounded-xl bg-gradient-to-br from-[#fbbf24] via-[#f472b6] to-[#7c3aed] text-[13px] font-semibold">
              M
            </span>
            <div>
              <p className="text-[13px] font-semibold leading-tight">
                Mandy admin
              </p>
              <a
                href="/"
                target="_blank"
                rel="noreferrer"
                className="text-[11px] text-white/40 hover:text-white/70"
              >
                View site
              </a>
            </div>
          </div>

          <div className="ml-auto flex flex-wrap items-center gap-2">
            {status ? (
              <span
                className={`rounded-full px-2.5 py-1 text-[11px] font-semibold ${
                  status.type === "ok"
                    ? "bg-emerald-400/15 text-emerald-200"
                    : "bg-red-400/15 text-red-200"
                }`}
              >
                {status.text}
              </span>
            ) : null}
            <button
              type="button"
              onClick={handleSave}
              disabled={busy}
              className="inline-flex items-center justify-center rounded-xl bg-white px-4 py-2 text-[13px] font-semibold text-black transition hover:bg-white/90 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {busy ? "Saving…" : "Save changes"}
            </button>
            <button
              type="button"
              onClick={handleLogout}
              className={secondaryButton}
            >
              Log out
            </button>
          </div>
        </div>

        <nav className="no-scrollbar mx-auto flex max-w-6xl gap-1 overflow-x-auto px-3 pb-2">
          {TABS.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setTab(item.id)}
              className={`shrink-0 rounded-lg px-3 py-1.5 text-[12px] font-semibold transition ${
                tab === item.id
                  ? "bg-white/10 text-white"
                  : "text-white/45 hover:text-white/75"
              }`}
            >
              {item.label}
            </button>
          ))}
        </nav>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-5">
        {tab === "site" ? (
          <SiteEditor content={content} onChange={handleChange} />
        ) : null}
        {tab === "products" ? (
          <ProductsEditor content={content} onChange={handleChange} />
        ) : null}
        {tab === "categories" ? (
          <CategoriesEditor content={content} onChange={handleChange} />
        ) : null}
        {tab === "photos" ? (
          <PhotosEditor content={content} onChange={handleChange} />
        ) : null}
        {tab === "notifications" ? (
          <NotificationsEditor content={content} onChange={handleChange} />
        ) : null}
      </main>
    </div>
  );
}
