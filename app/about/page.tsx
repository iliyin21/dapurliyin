import type { Metadata } from "next";

import Container from "@/components/shared/Container";
import SectionTitle from "@/components/shared/SectionTitle";

export const metadata: Metadata = {
  title: "Tentang Kami",
  description:
    "Kenali lebih dekat Dapur Liyin, platform berbagi resep makanan dan minuman terbaik.",
};

export default function AboutPage() {
  return (
    <main className="py-16">
      <Container>
        <div className="mx-auto max-w-3xl">
          <SectionTitle
            title="Tentang Dapur Liyin"
            subtitle="Rumah bagi para pecinta masak dan minum di Indonesia."
          />

          <div className="space-y-5 leading-relaxed text-slate-600">
            <p>
              Dapur Liyin adalah platform berbagi resep makanan dan
              minuman yang bertujuan membantu siapa pun—mulai dari pemula
              hingga koki berpengalaman—untuk memasak lebih mudah dan berbagi
              lebih bermakna.
            </p>

            <p>
              Kami menghadirkan ribuan resep pilihan lengkap dengan bahan,
              langkah memasak, informasi nutrisi, tips dari komunitas, hingga
              video tutorial dari YouTube, Instagram, dan TikTok, semuanya
              dalam satu tempat.
            </p>

            <p>
              Misi kami sederhana: membuat setiap orang percaya diri di
              dapur, satu resep pada satu waktu.
            </p>
          </div>
        </div>
      </Container>
    </main>
  );
}
