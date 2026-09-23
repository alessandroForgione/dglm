import Link from "next/link";
import clsx from "clsx";
import type { ComponentProps } from "react";

type Variant = "acid" | "ghost" | "ink";

const base =
  "inline-flex items-center justify-center gap-2 text-[15px] font-medium px-6 h-12 rounded-xl border transition-colors duration-200 select-none whitespace-nowrap";
const variants: Record<Variant, string> = {
  acid: "bg-calce text-asfalto border-calce hover:bg-calce/85 hover:border-calce/85",
  ghost: "bg-transparent text-calce border-calce hover:bg-calce/15",
  ink: "bg-grafite text-calce border-grafite hover:bg-calce/25",
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
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
    <path d="M2.5 8h11M9 3.5 13.5 8 9 12.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
