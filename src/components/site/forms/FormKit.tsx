import type { ReactNode } from "react";

export type Values = Record<string, string | string[]>;
export type SetValue = (key: string, value: string | string[]) => void;

export const inputCls =
  "w-full bg-background border border-foreground/15 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary transition-colors";
export const labelCls = "block text-[10px] uppercase tracking-[0.22em] text-foreground/60 mb-2";

export function FormSection({
  number,
  title,
  note,
  children,
}: {
  number?: string;
  title: string;
  note?: ReactNode;
  children: ReactNode;
}) {
  return (
    <fieldset className="pt-10 first:pt-0 border-t first:border-t-0 border-foreground/10">
      <legend className="sr-only">{title}</legend>
      <div className="flex items-baseline gap-4 mb-2">
        {number && <span className="font-serif text-2xl text-primary">{number}</span>}
        <h3 className="font-serif text-2xl leading-snug">{title}</h3>
      </div>
      {note && <p className="text-sm text-muted-foreground leading-relaxed mb-6 max-w-2xl">{note}</p>}
      <div className={note ? "" : "mt-6"}>{children}</div>
    </fieldset>
  );
}

export function Grid({ children, cols = 2 }: { children: ReactNode; cols?: 2 | 3 }) {
  return (
    <div className={`grid gap-5 ${cols === 3 ? "md:grid-cols-3" : "md:grid-cols-2"}`}>{children}</div>
  );
}

export function TextField({
  name,
  label,
  values,
  set,
  type = "text",
  helper,
  placeholder,
  full,
  error,
  autoComplete,
}: {
  name: string;
  label: string;
  values: Values;
  set: SetValue;
  type?: string;
  helper?: string;
  placeholder?: string;
  full?: boolean;
  error?: string;
  autoComplete?: string;
}) {
  return (
    <label className={`block ${full ? "md:col-span-full" : ""}`}>
      <span className={labelCls}>{label}</span>
      <input
        type={type}
        className={inputCls}
        value={(values[name] as string) ?? ""}
        onChange={(e) => set(name, e.target.value)}
        placeholder={placeholder}
        autoComplete={autoComplete}
      />
      {helper && <span className="text-xs text-muted-foreground mt-1.5 block">{helper}</span>}
      {error && <span className="text-xs text-destructive mt-1.5 block">{error}</span>}
    </label>
  );
}

export function TextArea({
  name,
  label,
  values,
  set,
  helper,
  rows = 4,
}: {
  name: string;
  label: string;
  values: Values;
  set: SetValue;
  helper?: string;
  rows?: number;
}) {
  return (
    <label className="block md:col-span-full">
      <span className={labelCls}>{label}</span>
      {helper && <span className="text-xs text-muted-foreground -mt-1 mb-2 block">{helper}</span>}
      <textarea
        rows={rows}
        className={`${inputCls} resize-y`}
        value={(values[name] as string) ?? ""}
        onChange={(e) => set(name, e.target.value)}
      />
    </label>
  );
}

export function RadioGroup({
  name,
  label,
  options,
  values,
  set,
  inline = true,
  compact,
}: {
  name: string;
  label: string;
  options: string[];
  values: Values;
  set: SetValue;
  inline?: boolean;
  compact?: boolean;
}) {
  const current = values[name] as string | undefined;
  return (
    <div
      role="radiogroup"
      aria-label={label}
      className={
        compact
          ? "flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-4 py-3 border-b border-foreground/5"
          : "block"
      }
    >
      <span className={compact ? "text-sm text-foreground/85 leading-snug" : labelCls}>{label}</span>
      <div className={`flex flex-wrap gap-2 ${inline ? "" : "flex-col"} shrink-0`}>
        {options.map((opt) => {
          const on = current === opt;
          return (
            <label
              key={opt}
              className={`cursor-pointer select-none rounded-full border px-4 py-1.5 text-xs transition-colors ${
                on
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-foreground/15 text-foreground/75 hover:border-primary"
              }`}
            >
              <input
                type="radio"
                name={name}
                value={opt}
                checked={on}
                onChange={() => set(name, opt)}
                className="sr-only"
              />
              {opt}
            </label>
          );
        })}
      </div>
    </div>
  );
}

export function CheckboxGroup({
  name,
  options,
  values,
  set,
}: {
  name: string;
  options: string[];
  values: Values;
  set: SetValue;
}) {
  const current = (values[name] as string[]) ?? [];
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
      {options.map((opt) => {
        const on = current.includes(opt);
        return (
          <label
            key={opt}
            className={`flex items-center gap-3 cursor-pointer rounded-xl border px-4 py-3 text-sm transition-colors ${
              on ? "border-primary bg-primary/5" : "border-foreground/15 hover:border-primary"
            }`}
          >
            <input
              type="checkbox"
              checked={on}
              onChange={() =>
                set(name, on ? current.filter((c) => c !== opt) : [...current, opt])
              }
              className="size-4 accent-primary flex-none"
            />
            {opt}
          </label>
        );
      })}
    </div>
  );
}

/** Hidden honeypot field for basic spam protection. */
export function Honeypot({ values, set }: { values: Values; set: SetValue }) {
  return (
    <div aria-hidden className="absolute -left-[9999px] w-px h-px overflow-hidden">
      <label>
        Leave this field empty
        <input
          tabIndex={-1}
          autoComplete="off"
          value={(values._hp as string) ?? ""}
          onChange={(e) => set("_hp", e.target.value)}
        />
      </label>
    </div>
  );
}

export function fmt(v: string | string[] | undefined) {
  if (Array.isArray(v)) return v.length ? v.join(", ") : "—";
  return v && v.trim() ? v : "—";
}
