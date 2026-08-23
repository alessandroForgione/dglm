import Image from "next/image";
import Link from "next/link";
import clsx from "clsx";
import { formatPrice, type Product } from "@/content/products";

const statusLabel: Record<Product["status"], { text: string; cls: string }> = {
  preorder: { text: "Pre-order", cls: "text-inchiostro" },
  available: { text: "Disponibile", cls: "text-inchiostro" },
  soldout: { text: "Sold out", cls: "text-grigio line-through" },
};

export function ProductCard({ product, priority = false, className }: { product: Product; priority?: boolean; className?: string }) {
  const img = product.images[0]!;
  const st = statusLabel[product.status];
  return (
    <Link
      href={`/collezione/${product.slug}`}
      className={clsx("group block border border-line hover:border-inchiostro transition-colors duration-300", className)}
    >
      <div className="relative aspect-[4/5] overflow-hidden bg-gesso">
        <Image
          src={img.src}
          alt={img.alt}
          fill
          priority={priority}
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className={clsx("card-media object-cover", product.status === "soldout" && "opacity-60")}
        />
        <span className="absolute left-3 top-3 eyebrow bg-carta/80 px-2 py-1 text-inchiostro/80">{product.tag}</span>
      </div>
      <div className="flex items-baseline justify-between gap-3 px-4 py-3 border-t border-line group-hover:border-inchiostro transition-colors duration-300">
        <div className="min-w-0">
          <h3 className="display text-[26px] leading-none truncate">{product.name}</h3>
          <p className={clsx("eyebrow mt-1", st.cls)}>{st.text}</p>
        </div>
        <p className="font-mono text-[14px] tabular-nums">{formatPrice(product.price)}</p>
      </div>
    </Link>
  );
}
