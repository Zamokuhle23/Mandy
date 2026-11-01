"use client";

import {
  useEffect,
  useId,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { joinList, splitList } from "@/lib/admin-utils";

export const inputClass =
  "w-full rounded-xl border border-white/10 bg-white/[0.04] px-3 py-2 text-[13px] text-white outline-none transition placeholder:text-white/25 focus:border-white/30 focus:bg-white/[0.07]";

export const labelClass =
  "text-[11px] font-semibold uppercase tracking-[0.12em] text-white/45";

export const primaryButton =
  "inline-flex items-center justify-center gap-2 rounded-xl bg-white px-4 py-2 text-[13px] font-semibold text-black transition hover:bg-white/90 disabled:cursor-not-allowed disabled:opacity-50";

export const secondaryButton =
  "inline-flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-3 py-2 text-[12px] font-semibold text-white/75 transition hover:bg-white/[0.08] disabled:cursor-not-allowed disabled:opacity-40";

export const dangerButton =
  "inline-flex items-center justify-center gap-2 rounded-xl border border-red-400/20 bg-red-500/10 px-3 py-2 text-[12px] font-semibold text-red-200 transition hover:bg-red-500/20";

type FieldProps = {
  label: string;
  hint?: string;
  className?: string;
  children: ReactNode;
};

export function Field({ label, hint, className, children }: FieldProps) {
  return (
    <label className={`block ${className ?? ""}`}>
      <span className={`${labelClass} mb-1.5 block`}>{label}</span>
      {children}
      {hint ? (
        <span className="mt-1.5 block text-[11px] leading-snug text-white/35">
          {hint}
        </span>
      ) : null}
    </label>
  );
}

type ListFieldProps = {
  label: string;
  value: string[];
  onChange: (value: string[]) => void;
  hint?: string;
  placeholder?: string;
};

export function ListField({
  label,
  value,
  onChange,
  hint,
  placeholder,
}: ListFieldProps) {
  const id = useId();
  const focused = useRef(false);
  const [text, setText] = useState(joinList(value));

  useEffect(() => {
    if (!focused.current) {
      setText(joinList(value));
    }
  }, [value]);

  return (
    <div>
      <label htmlFor={id} className={`${labelClass} mb-1.5 block`}>
        {label}
      </label>
      <input
        id={id}
        type="text"
        value={text}
        onFocus={() => {
          focused.current = true;
        }}
        onBlur={() => {
          focused.current = false;
          onChange(splitList(text));
        }}
        onChange={(event) => setText(event.target.value)}
        placeholder={placeholder}
        className={inputClass}
      />
      {hint ? (
        <p className="mt-1.5 text-[11px] leading-snug text-white/35">{hint}</p>
      ) : null}
    </div>
  );
}

type ToggleProps = {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
};

export function Toggle({ label, checked, onChange }: ToggleProps) {
  return (
    <label className="flex cursor-pointer items-center gap-2 text-[12px] font-medium text-white/70">
      <input
        type="checkbox"
        checked={checked}
        onChange={(event) => onChange(event.target.checked)}
        className="h-4 w-4 rounded accent-emerald-400"
      />
      {label}
    </label>
  );
}

type SectionProps = {
  title: string;
  description?: string;
  actions?: ReactNode;
  children: ReactNode;
};

export function Section({
  title,
  description,
  actions,
  children,
}: SectionProps) {
  return (
    <section className="rounded-2xl border border-white/10 bg-white/[0.025] p-4 sm:p-5">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h2 className="text-[17px] font-semibold tracking-[-0.01em]">
            {title}
          </h2>
          {description ? (
            <p className="mt-1 text-[12px] leading-snug text-white/45">
              {description}
            </p>
          ) : null}
        </div>
        {actions}
      </div>
      <div className="mt-4">{children}</div>
    </section>
  );
}

export function EmptyState({ children }: { children: ReactNode }) {
  return (
    <div className="rounded-xl border border-dashed border-white/10 px-4 py-8 text-center text-[12.5px] text-white/40">
      {children}
    </div>
  );
}

type RowActionsProps = {
  canUp?: boolean;
  canDown?: boolean;
  onUp: () => void;
  onDown: () => void;
  onRemove: () => void;
  removeLabel?: string;
};

export function RowActions({
  canUp = true,
  canDown = true,
  onUp,
  onDown,
  onRemove,
  removeLabel = "Remove",
}: RowActionsProps) {
  return (
    <div className="flex items-center gap-1">
      <button
        type="button"
        onClick={onUp}
        disabled={!canUp}
        aria-label="Move up"
        className={`${secondaryButton} h-8 w-8 px-0`}
      >
        ↑
      </button>
      <button
        type="button"
        onClick={onDown}
        disabled={!canDown}
        aria-label="Move down"
        className={`${secondaryButton} h-8 w-8 px-0`}
      >
        ↓
      </button>
      <button
        type="button"
        onClick={onRemove}
        aria-label={removeLabel}
        className={`${dangerButton} h-8 w-8 px-0`}
      >
        ×
      </button>
    </div>
  );
}
