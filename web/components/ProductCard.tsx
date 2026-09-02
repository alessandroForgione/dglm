import Image from "next/image";
import Link from "next/link";
import clsx from "clsx";
import { formatPrice, type Product } from "@/content/products";

/** Stato capo: lime = aperto, calce = disponibile, ruggine = finito. */
const statusLabel: Record<Product["status"], { text: string; cls: string }> = {
  preorder: { text: "Pre-order", cls: "text-acido" },
  available: { text: "Disponibile", cls: "text-calce" },
  soldout: { text: "Sold out", cls: "text-ruggine" },
};

const defaultSizes = "(min-width: 1280px) 25vw, (min-width: 1024px) 33vw, 50vw";

/**
 * Tile di catalogo. Le tile stanno a contatto: il contenitore mette border-t/border-l,
 * ogni tile mette border-r/border-b. All'hover un anello lime di 1px sopra la linea.
 * size="lg" è per la tile 2×2: da md la foto parte quadrata e cresce a riempire l'area
 * (senza un aspetto di base collasserebbe quando la tile è sola nella riga).
 */
export function ProductCard({
  product,
  priority = false,
  className,
  size = "sm",
  sizes = defaultSizes,
}: {
  product: Product;
  priority?: boolean;
  className?: string;
  size?: "sm" | "lg";
  sizes?: string;
}) {
  const img = product.images[0]!;
  const st = statusLabel[product.status];
  const lg = size === "lg";
  return (
    <Link
      href={`/collezione/${product.slug}`}
      className={clsx(
        "group relative flex h-full flex-col bg-cemento border-r border-b border-line hover:z-10 hover:shadow-[0_0_0_1px_var(--color-acido)] focus-visible:z-10",
        className,
      )}
    >
      <div className={clsx("relative overflow-hidden bg-cemento aspect-[4/5]", lg && "md:aspect-square md:flex-1 md:min-h-0")}>
        <Image
          src={img.src}
          alt={img.alt}
          fill
          priority={priority}
          sizes={sizes}
          className={clsx("card-media object-cover", product.status === "soldout" && "opacity-60")}
        />
        <span className="absolute left-3 top-3 eyebrow bg-asfalto/80 px-2 py-1 text-calce/80">{product.tag}</span>
      </div>
      <div className="flex items-baseline justify-between gap-3 px-4 py-3 border-t border-line group-hover:border-acido transition-colors duration-300">
        <div className="min-w-0">
          <h3 className={clsx("display leading-none line-clamp-2", lg ? "text-[22px] md:text-[40px]" : "text-[22px] md:text-[26px]")}>{product.name}</h3>
          <p className={clsx("eyebrow mt-1", st.cls)}>{st.text}</p>
        </div>
        <p className="font-mono text-[14px] tabular-nums">{formatPrice(product.price)}</p>
      </div>
    </Link>
  );
}
