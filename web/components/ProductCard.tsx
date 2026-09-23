import Image from "next/image";
import Link from "next/link";
import clsx from "clsx";
import { formatPrice, type Product } from "@/content/products";

export const statusLabel: Record<Product["status"], string> = {
  preorder: "Pre-order",
  available: "Disponibile",
  soldout: "Sold out",
};

const defaultSizes = "(min-width: 1024px) 25vw, 50vw";

/** Card di catalogo: foto 4:5, badge a pillola in alto a destra, nome e prezzo sotto. */
export function ProductCard({
  product,
  priority = false,
  sizes = defaultSizes,
}: {
  product: Product;
  priority?: boolean;
  sizes?: string;
}) {
  const img = product.images[0]!;
  return (
    <Link href={`/collezione/${product.slug}`} className="group block">
      <div className="relative aspect-[4/5] overflow-hidden bg-cemento">
        <Image
          src={img.src}
          alt={img.alt}
          fill
          priority={priority}
          sizes={sizes}
          className={clsx("card-media object-cover", product.status === "soldout" && "opacity-60")}
        />
        <span className="absolute right-2 top-2 md:right-3 md:top-3 rounded-full bg-badge px-2.5 py-1 text-[12px] leading-none text-asfalto/80">
          {statusLabel[product.status]}
        </span>
      </div>
      <h3 className="mt-3 text-[14px] md:text-[15px] leading-snug">{product.name}</h3>
      <p className="mt-1 text-[13px] tabular-nums">{formatPrice(product.price)}</p>
    </Link>
  );
}

/** Griglia prodotti: 2 colonne su mobile, 4 da desktop. */
export function ProductGrid({ products }: { products: Product[] }) {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-3 gap-y-8 md:gap-x-4 md:gap-y-10">
      {products.map((p, i) => (
        <ProductCard key={p.slug} product={p} priority={i < 4} />
      ))}
    </div>
  );
}
