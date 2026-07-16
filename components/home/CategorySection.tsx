import Link from "next/link";

import Container from "../shared/Container";
import { categories } from "@/data/recipes";

export default function CategorySection() {
  return (
    <section className="bg-white py-16">
      <Container>
        <h2 className="mb-8 text-3xl font-bold text-slate-900">
          Jelajahi Kategori
        </h2>

        <div className="flex flex-wrap gap-4">
          {categories.map((item) => (
            <Link
              key={item.name}
              href={`/recipes?category=${encodeURIComponent(item.name)}`}
              className="rounded-full border border-blue-200 bg-blue-50 px-6 py-3 font-medium text-blue-900 transition hover:bg-blue-700 hover:text-white"
            >
              {item.icon} {item.name}
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}
