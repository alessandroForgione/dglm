import { Resend } from "resend";
import { site } from "@/content/site";

interface PreorderMail {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}

function client(): Resend | null {
  const key = process.env.RESEND_API_KEY;
  if (!key) return null;
  return new Resend(key);
}

const from = () => process.env.MAIL_FROM ?? "DGLM <onboarding@resend.dev>";
const esc = (s: string) => s.replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]!);

function shell(title: string, body: string) {
  return `<!doctype html><html lang="it"><body style="margin:0;background:#000000;color:#f2f0ea;font-family:Helvetica,Arial,sans-serif">
  <div style="max-width:560px;margin:0 auto;padding:40px 24px">
    <div style="font-size:44px;font-weight:900;letter-spacing:-2px;line-height:1">DGLM</div>
    <div style="height:3px;background:#ffffff;width:64px;margin:16px 0 32px"></div>
    <h1 style="font-size:28px;line-height:1.1;margin:0 0 16px;text-transform:uppercase;letter-spacing:-0.5px">${title}</h1>
    ${body}
    <p style="margin-top:40px;font-size:12px;color:#999999">${esc(site.name)} · ${esc(site.contact.city)} · <a href="${site.url}" style="color:#ffffff">${site.url.replace(/^https?:\/\//, "")}</a></p>
  </div></body></html>`;
}

/** Notifica al brand: nuovo pre-order. */
export async function notifyBrand(p: PreorderMail) {
  const r = client();
  const to = (process.env.MAIL_TO ?? "").split(",").map((s) => s.trim()).filter(Boolean);
  if (!r || to.length === 0) {
    console.warn("[email] notifyBrand skipped: RESEND_API_KEY/MAIL_TO non configurati");
    return;
  }
  const rows = [
    ["Nome", p.firstName],
    ["Cognome", p.lastName],
    ["Email", p.email],
    ["Telefono", p.phone],
  ]
    .map(([k, v]) => `<tr><td style="padding:8px 12px 8px 0;color:#999999;text-transform:uppercase;font-size:12px;letter-spacing:1px">${k}</td><td style="padding:8px 0;font-size:16px">${esc(v)}</td></tr>`)
    .join("");
  const { error } = await r.emails.send({
    from: from(),
    to,
    replyTo: p.email,
    subject: `Nuovo pre-order ${site.drop.name}: ${p.firstName} ${p.lastName}`,
    html: shell("Nuovo pre-order", `<table style="border-collapse:collapse">${rows}</table><p style="margin-top:24px;font-size:14px;color:#999999">Vedi tutti i pre-order in <a href="${site.url}/admin" style="color:#ffffff">${site.url}/admin</a></p>`),
    text: `Nuovo pre-order ${site.drop.name}\n\nNome: ${p.firstName}\nCognome: ${p.lastName}\nEmail: ${p.email}\nTelefono: ${p.phone}\n`,
  });
  if (error) throw new Error(`Resend notifyBrand: ${error.message}`);
}

/** Conferma all'utente: sei in lista. */
export async function confirmUser(p: PreorderMail) {
  const r = client();
  if (!r) {
    console.warn("[email] confirmUser skipped: RESEND_API_KEY non configurata");
    return;
  }
  const { error } = await r.emails.send({
    from: from(),
    to: p.email,
    subject: `Sei in lista — ${site.drop.name}`,
    html: shell(
      `Sei dentro, ${esc(p.firstName)}.`,
      `<p style="font-size:16px;line-height:1.6;color:#d8d6cf">Abbiamo registrato il tuo pre-order per <strong style="color:#ffffff">${site.drop.name}</strong> (${esc(site.drop.label)}). Ti scriviamo noi appena il drop è pronto: avrai accesso prima di tutti gli altri.</p>
       <p style="font-size:16px;line-height:1.6;color:#d8d6cf">Nel frattempo seguici su <a href="${site.contact.instagram}" style="color:#ffffff">Instagram</a>.</p>
       <p style="margin-top:32px"><a href="${site.url}/collezione" style="display:inline-block;background:#ffffff;color:#000000;font-weight:700;text-transform:uppercase;letter-spacing:1px;padding:14px 22px;text-decoration:none">Guarda la collezione</a></p>`,
    ),
    text: `Sei dentro, ${p.firstName}.\n\nAbbiamo registrato il tuo pre-order per ${site.drop.name} (${site.drop.label}). Ti scriviamo noi appena il drop è pronto.\n\n${site.url}\n`,
  });
  if (error) throw new Error(`Resend confirmUser: ${error.message}`);
}
