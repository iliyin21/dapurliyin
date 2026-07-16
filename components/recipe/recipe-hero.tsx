import Image from "next/image";

import RecipeBadge from "./RecipeBadge";

interface RecipeHeroProps {
  title: string;
  image: string;
  category: string;
}

export default function RecipeHero({
  title,
  image,
  category,
}: RecipeHeroProps) {
  return (
    <section className="overflow-hidden rounded-3xl">
      <div className="relative h-64 w-full sm:h-80 md:h-[26rem]">
        <Image
          src={image}
          alt={title}
          fill
          priority
          className="object-cover"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

        <div className="absolute inset-x-0 bottom-0 p-6 md:p-10">
          <RecipeBadge label={category} variant="featured" />

          <h1 className="mt-3 font-heading text-3xl font-bold text-white md:text-5xl">
            {title}
          </h1>
        </div>
      </div>
    </section>
  );
}
