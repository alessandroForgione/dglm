import type { Metadata } from "next";
import { site } from "@/content/site";
import { getDb, countPreorders } from "@/lib/db";
import { PreorderForm } from "@/components/PreorderForm";

export const dynamic = "force-dynamic";
export const metadata: Metadata = {
  title: "Pre-order",
  description: `Entra in lista per ${site.drop.name}. Nome, email e telefono: ti contattiamo noi all'apertura del drop.`,
};

export default function PreorderPage() {
  const count = countPreorders(getDb());
  const dropDate = new Date(site.drop.date).toLocaleDateString("it-IT", { day: "2-digit", month: "long", year: "numeric" });
  return (
    <section className="mx-auto max-w-[1600px] px-5 md:px-8 pt-[calc(var(--nav-h)+40px)] pb-16">
      <div className="grid gap-10 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <p className="eyebrow mb-3 text-acido">Pre-order aperto — drop il {dropDate}</p>
          <h1 className="display text-[clamp(3rem,10vw,9rem)]">
            Prendi il<br />tuo numero.
          </h1>
          <p className="mt-8 max-w-md text-[17px] text-calce/80">
            {site.drop.name} è a tiratura chiusa. Lascia i tuoi dati: ricevi un numero progressivo e, all&apos;apertura del drop, accedi prima di tutti gli altri.
          </p>
          <dl className="mt-10 grid grid-cols-2 gap-6 max-w-md">
            <div>
              <dt className="eyebrow">In lista</dt>
              <dd className="font-mono text-[40px] leading-none tabular-nums mt-1 text-calce/70">{String(count).padStart(4, "0")}</dd>
            </div>
            <div>
              <dt className="eyebrow">Prossimo numero</dt>
              <dd className="font-mono text-[40px] leading-none tabular-nums mt-1 text-acido">{String(count + 1).padStart(4, "0")}</dd>
            </div>
          </dl>
        </div>
        <div className="lg:col-span-6 lg:col-start-7">
          <PreorderForm nextNumber={count + 1} />
        </div>
      </div>
    </section>
  );
}
