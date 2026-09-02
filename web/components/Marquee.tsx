import clsx from "clsx";

/** acid = banda tonale su gesso, line = solo testo grigio sulla carta. */
export function Marquee({ items, className, tone = "line" }: { items: readonly string[]; className?: string; tone?: "acid" | "line" }) {
  const row = [...items, ...items];
  return (
    <div
      className={clsx(
        "overflow-hidden whitespace-nowrap select-none",
        tone === "acid" ? "bg-gesso text-inchiostro" : "text-grigio",
        className,
      )}
      aria-hidden
    >
      <div className="flex w-max animate-marquee motion-reduce:animate-none">
        {row.map((t, i) => (
          <span key={i} className="inline-flex items-center gap-6 px-6 py-3 font-sans text-[18px] md:text-[20px] font-medium leading-none">
            {t}
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-current opacity-40" />
          </span>
        ))}
      </div>
    </div>
  );
}
