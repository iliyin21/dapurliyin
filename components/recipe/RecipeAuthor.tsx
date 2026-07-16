import { Avatar, AvatarFallback } from "@/components/ui/avatar";

interface RecipeAuthorProps {
  author: string;
  role?: string;
}

export default function RecipeAuthor({
  author,
  role = "Kontributor Resep",
}: RecipeAuthorProps) {
  const initials = author
    .split(" ")
    .map((word) => word[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <div className="flex items-center gap-3">
      <Avatar size="lg">
        <AvatarFallback className="bg-blue-900 text-white font-semibold">
          {initials}
        </AvatarFallback>
      </Avatar>

      <div>
        <p className="font-semibold text-slate-900">{author}</p>
        <p className="text-xs text-muted-foreground">{role}</p>
      </div>
    </div>
  );
}
