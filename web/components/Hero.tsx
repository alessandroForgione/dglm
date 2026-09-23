import Image from "next/image";
import Link from "next/link";

/** Hero a tutta larghezza: foto, velo scuro dall'alto per leggere l'header, un solo link in basso. */
export function Hero() {
  return (
    <section className="relative h-[46svh] min-h-[300px] md:h-[100svh] md:min-h-[640px] overflow-hidden">
      <Image src="/images/hero-lookbook.jpg" alt="" fill priority sizes="100vw" className="object-cover" />
      <div className="absolute inset-0 bg-linear-to-b from-[#121212]/40 to-transparent" aria-hidden />
      <div className="absolute inset-x-0 bottom-0 flex justify-center pb-10 md:pb-16">
        <Link href="/collezione" className="text-[15px] font-medium underline-offset-4 hover:underline">
          Shop all
        </Link>
      </div>
    </section>
  );
}
