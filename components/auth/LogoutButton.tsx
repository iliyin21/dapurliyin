"use client";

import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";
import { toast } from "sonner";

import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";

export default function LogoutButton() {
  const router = useRouter();

  const handleLogout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    toast.success("Berhasil keluar");
    router.push("/");
    router.refresh();
  };

  return (
    <Button variant="outline" onClick={handleLogout}>
      <LogOut size={16} />
      Keluar
    </Button>
  );
}
