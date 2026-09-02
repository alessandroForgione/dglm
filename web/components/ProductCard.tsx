import Image from "next/image";
import Link from "next/link";
import clsx from "clsx";
import { formatPrice, type Product } from "@/content/products";

const statusLabel: Record<Product["status"], { text: string; cls: string }> = {
  preorder: { text: "Pre-order", cls: "text-grigio" },
  available: { text: "Disponibile", cls: "text-grigio" },
  soldout: { text: "Sold out", cls: "text-grigio line-through" },
};

export function ProductCard({ product, priority = false, className }: { product: Product; priority?: boolean; className?: string }) {
  const img = product.images[0]!;
  const st = statusLabel[product.status];
  return (
    <Link
      href={`/collezione/${product.slug}`}
      className={clsx("group block rounded-[var(--radius-lg)] overflow-hidden bg-carta transition-shadow duration-300 hover:shadow-soft", className)}
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
        <span className="absolute left-3 top-3 eyebrow rounded-full bg-carta/90 px-2.5 py-1 text-inchiostro/80">{product.tag}</span>
      </div>
      <div className="flex items-baseline justify-between gap-3 px-4 py-4">
        <div className="min-w-0">
          <h3 className="headline text-[18px] truncate">{product.name}</h3>
          <p className={clsx("eyebrow mt-1", st.cls)}>{st.text}</p>
        </div>
        <p className="font-mono text-[14px] tabular-nums text-inchiostro/80">{formatPrice(product.price)}</p>
      </div>
    </Link>
  );
}
