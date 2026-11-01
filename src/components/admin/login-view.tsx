"use client";

import { useState } from "react";
import { inputClass, primaryButton } from "./fields";

type LoginViewProps = {
  onLogin: (password: string) => Promise<void>;
};

export function LoginView({ onLogin }: LoginViewProps) {
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!password) return;

    setBusy(true);
    setError("");

    try {
      await onLogin(password);
    } catch (loginError) {
      setError(
        loginError instanceof Error
          ? loginError.message
          : "Could not sign in.",
      );
    } finally {
      setBusy(false);
    }
  }

  return (
    <main className="grid min-h-dvh place-items-center bg-[#07070a] px-4 text-white">
      <div className="w-full max-w-sm rounded-3xl border border-white/10 bg-white/[0.03] p-6 shadow-[0_40px_120px_-40px_rgba(124,58,237,0.5)]">
        <div className="flex items-center gap-3">
          <span className="grid h-11 w-11 place-items-center rounded-2xl bg-gradient-to-br from-[#fbbf24] via-[#f472b6] to-[#7c3aed] text-[18px] font-semibold">
            M
          </span>
          <div>
            <h1 className="text-[18px] font-semibold tracking-[-0.01em]">
              Mandy admin
            </h1>
            <p className="text-[12px] text-white/45">
              Sign in to edit the site.
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="mt-6 space-y-3">
          <label className="block">
            <span className="mb-1.5 block text-[11px] font-semibold uppercase tracking-[0.12em] text-white/45">
              Admin password
            </span>
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              autoFocus
              autoComplete="current-password"
              className={inputClass}
            />
          </label>

          {error ? (
            <p className="text-[12px] leading-snug text-red-300">{error}</p>
          ) : null}

          <button
            type="submit"
            disabled={busy || !password}
            className={`${primaryButton} w-full`}
          >
            {busy ? "Signing in…" : "Sign in"}
          </button>
        </form>

        <p className="mt-5 text-[11px] leading-snug text-white/30">
          The password is set with ADMIN_PASSWORD on the API server.
        </p>
      </div>
    </main>
  );
}
