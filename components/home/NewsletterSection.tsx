"use client";

import { useState } from "react";
import { Mail } from "lucide-react";
import { toast } from "sonner";

import Container from "../shared/Container";
import { Button } from "@/components/ui/button";

export default function NewsletterSection() {
  const [email, setEmail] = useState("");

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();

    if (!email.trim() || !email.includes("@")) {
      toast.error("Masukkan alamat email yang valid");
      return;
    }

    // TODO: connect to a real newsletter provider (e.g. Supabase table,
    // Mailchimp, or Resend audience) once the backend is wired up.
    toast.success("Terima kasih sudah berlangganan!");
    setEmail("");
  };

  return (
    <section className="bg-blue-900 py-16">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10">
            <Mail size={26} className="text-white" />
          </div>

          <h2 className="font-heading text-3xl font-bold text-white">
            Jangan Lewatkan Resep Terbaru
          </h2>

          <p className="mt-3 text-blue-100">
            Berlangganan newsletter kami dan dapatkan resep pilihan langsung
            ke email kamu setiap minggu.
          </p>

          <form
            onSubmit={handleSubscribe}
            className="mx-auto mt-8 flex max-w-md flex-col gap-3 sm:flex-row"
          >
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Alamat email kamu"
              className="w-full rounded-xl border-0 px-5 py-3.5 text-slate-900 outline-none focus:ring-2 focus:ring-white"
            />

            <Button
              type="submit"
              className="h-auto shrink-0 rounded-xl bg-white px-6 py-3.5 font-semibold text-blue-900 hover:bg-blue-50"
            >
              Berlangganan
            </Button>
          </form>
        </div>
      </Container>
    </section>
  );
}
