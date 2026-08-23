import clsx from "clsx";

export function Marquee({ items, className, tone = "acid" }: { items: readonly string[]; className?: string; tone?: "acid" | "line" }) {
  const row = [...items, ...items];
  return (
    <div
      className={clsx(
        "overflow-hidden whitespace-nowrap select-none",
        tone === "acid" ? "bg-acido text-asfalto" : "border-y border-line text-calce",
        className,
      )}
      aria-hidden
    >
      <div className="flex w-max animate-marquee motion-reduce:animate-none">
        {row.map((t, i) => (
          <span key={i} className="display inline-flex items-center gap-6 px-6 py-2 text-[28px] md:text-[34px] leading-none">
            {t}
            <span className="inline-block h-2 w-2 rounded-full bg-current opacity-70" />
          </span>
        ))}
      </div>
    </div>
  );
}
