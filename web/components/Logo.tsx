import Link from "next/link";
import clsx from "clsx";

/** Wordmark DGLM: display type + layer grigio fuori registro. */
export function Logo({ className, size = "md" }: { className?: string; size?: "sm" | "md" }) {
  return (
    <Link
      href="/"
      aria-label="DGLM — home"
      className={clsx(
        "display misprint leading-none tracking-tight select-none",
        size === "sm" ? "text-[28px]" : "text-[36px]",
        className,
      )}
      data-text="DGLM"
      style={{ ["--mis-x" as string]: "0.045em", ["--mis-y" as string]: "-0.045em" }}
    >
      DGLM
    </Link>
  );
}
