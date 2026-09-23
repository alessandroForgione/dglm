import Link from "next/link";
import clsx from "clsx";

/** Wordmark DGLM: Inter nero corsivo, compatto come un marchio stampato. */
export function Logo({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      aria-label="DGLM — home"
      className={clsx("font-bold italic text-[26px] md:text-[30px] leading-none tracking-[-0.06em] select-none", className)}
    >
      DGLM
    </Link>
  );
}
