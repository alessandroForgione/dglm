import type { Metadata } from "next";
import { site } from "@/content/site";
import { getDb, countPreorders } from "@/lib/db";
import { PreorderForm } from "@/components/PreorderForm";

export const dynamic = "force-dynamic";
export const metadata: Metadata = {
  title: "Pre-order",
  description: `Entra in lista per ${site.drop.name}. Nome, email e telefono: ti contattiamo noi all'apertura del drop.`,
};

export default async function PreorderPage({ searchParams }: PageProps<"/preorder">) {
  const { email } = await searchParams;
  const count = countPreorders(getDb());
  const dropDate = new Date(site.drop.date).toLocaleDateString("it-IT", { day: "2-digit", month: "long", year: "numeric" });
  return (
    <section className="px-5 md:px-10 pt-6 md:pt-10 pb-16 md:pb-24">
      <div className="grid gap-10 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <p className="eyebrow mb-3">Pre-order aperto — drop il {dropDate}</p>
          <h1 className="display text-[clamp(2rem,5vw,4rem)]">
            Prendi il<br />tuo numero.
          </h1>
          <p className="mt-8 max-w-md text-[17px] text-calce/80">
            {site.drop.name} è a tiratura chiusa. Lascia i tuoi dati: ricevi un numero progressivo e, all&apos;apertura del drop, accedi prima di tutti gli altri.
          </p>
          <dl className="mt-10 grid grid-cols-2 gap-6 max-w-md">
            <div>
              <dt className="eyebrow">In lista</dt>
              <dd className="text-[40px] leading-none tabular-nums mt-1 text-calce/70">{String(count).padStart(4, "0")}</dd>
            </div>
            <div>
              <dt className="eyebrow">Prossimo numero</dt>
              <dd className="text-[40px] leading-none tabular-nums mt-1 text-acido">{String(count + 1).padStart(4, "0")}</dd>
            </div>
          </dl>
        </div>
        <div className="lg:col-span-6 lg:col-start-7">
          <PreorderForm nextNumber={count + 1} defaultEmail={typeof email === "string" ? email.slice(0, 254) : undefined} />
        </div>
      </div>
    </section>
  );
}
