import Link from "next/link";
import Image from "next/image";
import { Search, User, Plus, LayoutDashboard } from "lucide-react";

import Container from "../shared/Container";
import { getCurrentUserProfile } from "@/lib/supabase/server";

export default async function Navbar() {
  const profile = await getCurrentUserProfile();

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur border-b border-slate-200">
      <Container>
        <div className="flex h-20 items-center justify-between">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5">
            <Image
              src="/logo/dapur-liyin-icon.png"
              alt="Dapur Liyin"
              width={44}
              height={44}
              className="h-11 w-11 object-contain"
              priority
            />

            <div>
              <h1 className="font-heading text-xl font-bold leading-none text-slate-900">
                Dapur <span className="text-blue-900">Liyin</span>
              </h1>

              <p className="-mt-0.5 text-xs text-slate-500">
                Inspirasi Resep Lezat
              </p>
            </div>
          </Link>

          {/* Menu */}
          <nav className="hidden lg:flex items-center gap-8">

            <Link href="/">Beranda</Link>

            <Link href="/recipes">Jelajahi</Link>

            <Link href="/categories">Kategori</Link>

            <Link href="/videos">Video</Link>

            <Link href="/about">Tentang</Link>

          </nav>

          {/* Right */}
          <div className="flex items-center gap-3">

            <Link
              href="/recipes"
              className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-100 hover:bg-slate-200 transition"
            >
              <Search size={20}/>
            </Link>

            {profile?.role === "admin" && (
              <Link
                href="/admin/recipes/new"
                className="hidden md:flex items-center gap-2 rounded-xl bg-blue-900 px-5 py-3 text-white hover:bg-blue-800 transition"
              >
                <Plus size={18}/>
                Buat Resep
              </Link>
            )}

            {profile?.role === "admin" && (
              <Link
                href="/admin"
                aria-label="Dashboard Admin"
                className="flex h-11 w-11 items-center justify-center rounded-xl border border-slate-200 hover:bg-slate-100 transition"
              >
                <LayoutDashboard size={20}/>
              </Link>
            )}

            {profile ? (
              <Link
                href="/account"
                aria-label="Akun Saya"
                className="flex h-11 w-11 items-center justify-center rounded-xl border border-slate-200 hover:bg-slate-100 transition"
              >
                <User size={20}/>
              </Link>
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  href="/login"
                  className="rounded-xl px-4 py-3 text-sm font-medium text-slate-700 hover:bg-slate-100 transition"
                >
                  Masuk
                </Link>
                <Link
                  href="/signup"
                  className="rounded-xl bg-blue-900 px-4 py-3 text-sm font-semibold text-white hover:bg-blue-800 transition"
                >
                  Daftar
                </Link>
              </div>
            )}

          </div>

        </div>
      </Container>
    </header>
  );
}
