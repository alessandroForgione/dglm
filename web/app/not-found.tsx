import { ButtonLink } from "@/components/Button";

export default function NotFound() {
  return (
    <section className="min-h-[60svh] flex flex-col items-start justify-center px-5 md:px-8 ">
      <p className="eyebrow mb-3 text-ruggine">Errore 404</p>
      <h1 className="display text-[clamp(2rem,5vw,4rem)]">Non c&apos;è.</h1>
      <p className="mt-4 max-w-md text-calce/75">Questa pagina non esiste o il capo è finito. Torna alla collezione.</p>
      <ButtonLink href="/collezione" className="mt-8">Collezione</ButtonLink>
    </section>
  );
}
