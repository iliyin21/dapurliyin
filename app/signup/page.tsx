"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { UserPlus } from "lucide-react";

import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Container from "@/components/shared/Container";

export default function SignUpPage() {
  const router = useRouter();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password.length < 6) {
      toast.error("Password minimal 6 karakter");
      return;
    }

    setLoading(true);
    const supabase = createClient();

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { full_name: fullName },
      },
    });

    setLoading(false);

    if (error) {
      toast.error(error.message);
      return;
    }

    toast.success(
      "Pendaftaran berhasil! Cek email kamu untuk verifikasi akun."
    );
    router.push("/login");
  };

  return (
    <main className="flex min-h-[75vh] items-center justify-center py-16">
      <Container className="flex justify-center">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-sm rounded-3xl border bg-white p-8 shadow-sm"
        >
          <div className="mb-6 flex flex-col items-center text-center">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-900 text-white">
              <UserPlus size={20} />
            </div>
            <h1 className="text-xl font-bold">Buat Akun Baru</h1>
            <p className="mt-1 text-sm text-slate-500">
              Gabung dan mulai simpan resep favoritmu.
            </p>
          </div>

          <div className="space-y-4">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-slate-700">
                Nama Lengkap
              </label>
              <Input
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Nama kamu"
                required
              />
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-medium text-slate-700">
                Email
              </label>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="kamu@email.com"
                required
              />
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-medium text-slate-700">
                Password
              </label>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Minimal 6 karakter"
                required
              />
            </div>
          </div>

          <Button type="submit" className="mt-6 w-full" disabled={loading}>
            {loading ? "Memproses..." : "Daftar"}
          </Button>

          <p className="mt-4 text-center text-sm text-slate-500">
            Sudah punya akun?{" "}
            <Link href="/login" className="font-medium text-blue-800">
              Masuk di sini
            </Link>
          </p>
        </form>
      </Container>
    </main>
  );
}
