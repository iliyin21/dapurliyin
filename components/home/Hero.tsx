"use client";

import Link from "next/link";
import { motion } from "framer-motion";

import Container from "../shared/Container";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay, ease: "easeOut" as const },
  }),
};

export default function Hero() {
  return (
    <section className="bg-gradient-to-b from-blue-50 to-white">
      <Container>
        <div className="py-24 text-center">
          <motion.span
            initial="hidden"
            animate="visible"
            custom={0}
            variants={fadeUp}
            className="inline-block rounded-full bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900"
          >
            🍽️ Selamat Datang di Dapur Liyin
          </motion.span>

          <motion.h1
            initial="hidden"
            animate="visible"
            custom={0.1}
            variants={fadeUp}
            className="mt-8 font-heading text-6xl font-bold leading-tight text-slate-900"
          >
            Masak Lebih Mudah,
            <br />
            Berbagi Lebih Bermakna.
          </motion.h1>

          <motion.p
            initial="hidden"
            animate="visible"
            custom={0.2}
            variants={fadeUp}
            className="mx-auto mt-8 max-w-2xl text-lg leading-8 text-slate-600"
          >
            Temukan ribuan resep makanan dan minuman terbaik dari komunitas.
            Simpan resep favoritmu atau bagikan kreasi masakanmu kepada dunia.
          </motion.p>

          <motion.div
            initial="hidden"
            animate="visible"
            custom={0.3}
            variants={fadeUp}
            className="mt-12 flex justify-center gap-5"
          >
            <Link
              href="/recipes"
              className="rounded-xl bg-blue-900 px-8 py-4 font-semibold text-white transition hover:bg-blue-800"
            >
              Jelajahi Resep
            </Link>

            <Link
              href="/admin/recipes/new"
              className="rounded-xl border border-slate-300 bg-white px-8 py-4 font-semibold transition hover:bg-slate-100"
            >
              + Buat Resep
            </Link>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
