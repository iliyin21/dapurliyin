import Link from "next/link";
import Image from "next/image";
import { FaInstagram, FaYoutube, FaTiktok } from "react-icons/fa";

import Container from "../shared/Container";
import { categories } from "@/data/recipes";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-slate-200 bg-white pt-16">
      <Container>
        <div className="grid gap-10 pb-12 md:grid-cols-4">
          <div>
            <Link href="/" className="flex items-center gap-2.5">
              <Image
                src="/logo/dapur-liyin-icon.png"
                alt="Dapur Liyin"
                width={44}
                height={44}
                className="h-11 w-11 object-contain"
              />
              <div>
                <p className="font-heading text-xl font-bold leading-none text-slate-900">
                  Dapur <span className="text-blue-900">Liyin</span>
                </p>
                <p className="-mt-0.5 text-xs text-slate-500">Inspirasi Resep Lezat</p>
              </div>
            </Link>

            <p className="mt-4 text-sm text-slate-500">
              Temukan ribuan resep makanan dan minuman terbaik dari komunitas.
              Masak lebih mudah, berbagi lebih bermakna.
            </p>

            <div className="mt-5 flex gap-3">
              <a
                href="#"
                aria-label="Instagram"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-slate-600 transition hover:bg-blue-900 hover:text-white"
              >
                <FaInstagram size={16} />
              </a>
              <a
                href="#"
                aria-label="YouTube"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-slate-600 transition hover:bg-blue-900 hover:text-white"
              >
                <FaYoutube size={16} />
              </a>
              <a
                href="#"
                aria-label="TikTok"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-slate-600 transition hover:bg-blue-900 hover:text-white"
              >
                <FaTiktok size={16} />
              </a>
            </div>
          </div>

          <div>
            <h3 className="mb-4 font-semibold text-slate-900">Navigasi</h3>
            <ul className="space-y-3 text-sm text-slate-500">
              <li><Link href="/" className="hover:text-blue-900">Beranda</Link></li>
              <li><Link href="/recipes" className="hover:text-blue-900">Jelajahi Resep</Link></li>
              <li><Link href="/about" className="hover:text-blue-900">Tentang Kami</Link></li>
              <li><Link href="/videos" className="hover:text-blue-900">Video Tutorial</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 font-semibold text-slate-900">Kategori</h3>
            <ul className="space-y-3 text-sm text-slate-500">
              {categories.slice(0, 4).map((c) => (
                <li key={c.name}>
                  <Link
                    href={`/recipes?category=${encodeURIComponent(c.name)}`}
                    className="hover:text-blue-900"
                  >
                    {c.icon} {c.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 font-semibold text-slate-900">Legal</h3>
            <ul className="space-y-3 text-sm text-slate-500">
              <li><Link href="/privacy" className="hover:text-blue-900">Kebijakan Privasi</Link></li>
              <li><Link href="/terms" className="hover:text-blue-900">Syarat & Ketentuan</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-200 py-6 text-center text-sm text-slate-500">
          © {year} Dapur Liyin. Seluruh hak cipta dilindungi.
        </div>
      </Container>
    </footer>
  );
}
