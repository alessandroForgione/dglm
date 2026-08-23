import type { Metadata } from "next";
import { LoginForm } from "./LoginForm";

export const metadata: Metadata = { title: "Admin · Login", robots: { index: false, follow: false } };

export default function AdminLoginPage() {
  return (
    <section className="min-h-[100svh] flex items-center justify-center px-5">
      <div className="w-full max-w-sm">
        <p className="display text-[40px] leading-none">DGLM</p>
        <p className="eyebrow mt-1 mb-8">Area riservata</p>
        <LoginForm />
      </div>
    </section>
  );
}
