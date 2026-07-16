import Link from "next/link";
import { redirect } from "next/navigation";
import { LayoutDashboard, PlusCircle, ExternalLink, ShieldAlert } from "lucide-react";

import { getCurrentUserProfile } from "@/lib/supabase/server";
import Container from "@/components/shared/Container";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const profile = await getCurrentUserProfile();

  if (!profile) {
    redirect("/login");
  }

  if (profile.role !== "admin") {
    return (
      <main className="py-20">
        <Container className="flex justify-center">
          <div className="max-w-md rounded-3xl border bg-white p-10 text-center">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-red-100 text-red-600">
              <ShieldAlert size={26} />
            </div>
            <h1 className="text-xl font-bold">Akses Ditolak</h1>
            <p className="mt-2 text-sm text-slate-500">
              Akun kamu (<strong>{profile.email}</strong>) tidak memiliki
              akses admin. Hubungi pemilik website jika kamu seharusnya
              memiliki akses ini.
            </p>
          </div>
        </Container>
      </main>
    );
  }

  return (
    <div className="mx-auto flex min-h-[80vh] w-full max-w-7xl gap-8 px-4 py-8 md:px-8">
      <aside className="hidden w-56 shrink-0 md:block">
        <div className="sticky top-24 space-y-1">
          <Link
            href="/admin"
            className="flex items-center gap-2 rounded-xl px-4 py-3 font-medium text-slate-700 hover:bg-slate-100"
          >
            <LayoutDashboard size={18} />
            Dashboard
          </Link>
          <Link
            href="/admin/recipes/new"
            className="flex items-center gap-2 rounded-xl px-4 py-3 font-medium text-slate-700 hover:bg-slate-100"
          >
            <PlusCircle size={18} />
            Tambah Resep
          </Link>
          <Link
            href="/"
            className="flex items-center gap-2 rounded-xl px-4 py-3 font-medium text-slate-700 hover:bg-slate-100"
          >
            <ExternalLink size={18} />
            Lihat Website
          </Link>
        </div>
      </aside>

      <div className="min-w-0 flex-1">{children}</div>
    </div>
  );
}
