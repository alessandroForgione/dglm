import Link from "next/link";
import clsx from "clsx";
import type { ComponentProps } from "react";

type Variant = "acid" | "ghost" | "ink";

const base =
  "inline-flex items-center justify-center gap-2 font-mono text-[12px] uppercase tracking-[0.18em] px-5 h-12 border transition-colors duration-200 select-none whitespace-nowrap";
const variants: Record<Variant, string> = {
  acid: "bg-inchiostro text-carta border-inchiostro hover:bg-carta hover:text-inchiostro",
  ghost: "bg-transparent text-inchiostro border-inchiostro/40 hover:border-inchiostro",
  ink: "bg-carta text-inchiostro border-inchiostro hover:bg-inchiostro hover:text-carta",
};

type LinkProps = ComponentProps<typeof Link> & { variant?: Variant };
export function ButtonLink({ variant = "acid", className, children, ...rest }: LinkProps) {
  return (
    <Link className={clsx(base, variants[variant], className)} {...rest}>
      {children}
    </Link>
  );
}

type BtnProps = ComponentProps<"button"> & { variant?: Variant };
export function Button({ variant = "acid", className, children, ...rest }: BtnProps) {
  return (
    <button className={clsx(base, variants[variant], "disabled:opacity-50 disabled:cursor-not-allowed", className)} {...rest}>
      {children}
    </button>
  );
}

export const Arrow = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
    <path d="M2 7h9M7 2l5 5-5 5" stroke="currentColor" strokeWidth="1.6" />
  </svg>
);
