import { Badge } from "@/components/ui/badge";

interface RecipeBadgeProps {
  label: string;
  variant?: "category" | "difficulty" | "new" | "featured";
}

const stylesByVariant: Record<string, string> = {
  category: "bg-blue-100 text-blue-900",
  difficulty: "bg-slate-100 text-slate-700",
  new: "bg-emerald-600 text-white",
  featured: "bg-blue-900 text-white",
};

export default function RecipeBadge({
  label,
  variant = "category",
}: RecipeBadgeProps) {
  return (
    <Badge className={stylesByVariant[variant]} variant="secondary">
      {label}
    </Badge>
  );
}
