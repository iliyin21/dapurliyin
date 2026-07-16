"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { LogIn } from "lucide-react";

import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Container from "@/components/shared/Container";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const supabase = createClient();
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    setLoading(false);

    if (error) {
      toast.error(
        error.message === "Invalid login credentials"
          ? "Email atau password salah"
          : error.message
      );
      return;
    }

    toast.success("Berhasil masuk!");
    router.push("/");
    router.refresh();
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
              <LogIn size={20} />
            </div>
            <h1 className="text-xl font-bold">Masuk ke Akunmu</h1>
            <p className="mt-1 text-sm text-slate-500">
              Simpan dan kelola resep favoritmu.
            </p>
          </div>

          <div className="space-y-4">
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
                placeholder="Password kamu"
                required
              />
            </div>
          </div>

          <Button type="submit" className="mt-6 w-full" disabled={loading}>
            {loading ? "Memproses..." : "Masuk"}
          </Button>

          <p className="mt-4 text-center text-sm text-slate-500">
            Belum punya akun?{" "}
            <Link href="/signup" className="font-medium text-blue-800">
              Daftar di sini
            </Link>
          </p>
        </form>
      </Container>
    </main>
  );
}
