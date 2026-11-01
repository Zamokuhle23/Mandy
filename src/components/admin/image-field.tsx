"use client";

import Image from "next/image";
import { useId, useState } from "react";
import { mediaSrc } from "@/lib/api-base";
import { uploadImage } from "@/lib/api";
import { labelClass, secondaryButton } from "./fields";

type ImageFieldProps = {
  label: string;
  value: string;
  onChange: (value: string) => void;
  hint?: string;
};

function previewable(value: string): boolean {
  return value.startsWith("/") || /^https?:\/\//i.test(value);
}

export function ImageField({ label, value, onChange, hint }: ImageFieldProps) {
  const fileId = useId();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  async function handleFile(file: File | undefined) {
    if (!file) return;

    setBusy(true);
    setError("");

    try {
      const url = await uploadImage(file);
      onChange(url);
    } catch (uploadError) {
      setError(
        uploadError instanceof Error ? uploadError.message : "Upload failed.",
      );
    } finally {
      setBusy(false);
    }
  }

  return (
    <div>
      <p className={`${labelClass} mb-1.5`}>{label}</p>
      <div className="flex flex-col gap-3 sm:flex-row">
        <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-xl border border-white/10 bg-white/[0.04]">
          {previewable(value) ? (
            <Image
              src={mediaSrc(value)}
              alt="Preview"
              width={192}
              height={192}
              className="h-24 w-24 object-cover"
            />
          ) : (
            <span className="grid h-full w-full place-items-center px-2 text-center text-[10px] leading-snug text-white/30">
              No image
            </span>
          )}
        </div>

        <div className="min-w-0 flex-1 space-y-2">
          <div className="flex flex-wrap items-center gap-2">
            <input
              id={fileId}
              type="file"
              accept="image/jpeg,image/png,image/webp,image/avif,image/heic,image/heif"
              className="sr-only"
              onChange={(event) => {
                const file = event.target.files?.[0];
                event.target.value = "";
                void handleFile(file);
              }}
            />
            <label
              htmlFor={fileId}
              className={`${secondaryButton} ${
                busy ? "pointer-events-none opacity-50" : ""
              }`}
            >
              {busy ? "Uploading…" : "Upload image"}
            </label>
            {value ? (
              <button
                type="button"
                onClick={() => {
                  onChange("");
                  setError("");
                }}
                className="text-[11px] font-semibold text-red-200/80 hover:text-red-200"
              >
                Remove
              </button>
            ) : null}
          </div>

          <input
            type="text"
            value={value}
            onChange={(event) => onChange(event.target.value)}
            placeholder="https://... or /photos/01.jpg"
            className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-3 py-2 text-[12px] text-white outline-none transition placeholder:text-white/25 focus:border-white/30 focus:bg-white/[0.07]"
          />
          <p className="text-[11px] leading-snug text-white/35">
            {hint ??
              "JPG, PNG, WebP, AVIF, or HEIC. Images are resized automatically."}
          </p>
          {error ? (
            <p className="text-[11px] leading-snug text-red-300">{error}</p>
          ) : null}
        </div>
      </div>
    </div>
  );
}
