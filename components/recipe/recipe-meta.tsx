import {
  Clock3,
  Flame,
  Eye,
  Star,
  User,
  Users,
} from "lucide-react";

interface RecipeMetaProps {
  author: string;
  cookingTime: string;
  calories: string;
  rating: number;
  views: number;
  servings: string;
}

export default function RecipeMeta({
  author,
  cookingTime,
  calories,
  rating,
  views,
  servings,
}: RecipeMetaProps) {
  const items = [
    {
      icon: User,
      label: "Author",
      value: author,
    },
    {
      icon: Clock3,
      label: "Durasi",
      value: cookingTime,
    },
    {
      icon: Flame,
      label: "Kalori",
      value: calories,
    },
    {
      icon: Users,
      label: "Porsi",
      value: servings,
    },
    {
      icon: Eye,
      label: "Views",
      value: views.toLocaleString(),
    },
  ];

  return (
    <section className="grid grid-cols-2 gap-4 md:grid-cols-5">
      {/* Rating Card */}
      <div className="flex items-center gap-3 rounded-2xl border bg-white p-4 shadow-sm">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-yellow-100">
          <Star
            size={20}
            className="fill-yellow-400 text-yellow-400"
          />
        </div>

        <div>
          <p className="text-xs text-muted-foreground">
            Rating
          </p>

          <p className="font-semibold">
            {rating}
          </p>
        </div>
      </div>

      {/* Metadata */}
      {items.map((item) => {
        const Icon = item.icon;

        return (
          <div
            key={item.label}
            className="flex items-center gap-3 rounded-2xl border bg-white p-4 shadow-sm"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100">
              <Icon size={20} />
            </div>

            <div>
              <p className="text-xs text-muted-foreground">
                {item.label}
              </p>

              <p className="truncate font-semibold">
                {item.value}
              </p>
            </div>
          </div>
        );
      })}
    </section>
  );
}