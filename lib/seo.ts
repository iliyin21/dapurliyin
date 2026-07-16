import type { Recipe } from "@/data/recipes";

const BASE_URL = "https://dapurliyin21-phi.vercel.app";

/**
 * Converts a free-text duration like "30 Menit" or "1 Jam 15 Menit"
 * into an ISO 8601 duration string (e.g. "PT30M", "PT1H15M") as
 * required by schema.org's `cookTime` / `totalTime` properties.
 * Returns undefined if no number can be parsed, so the field can be
 * safely omitted from the JSON-LD instead of sending bad data.
 */
function toISODuration(text: string | undefined | null): string | undefined {
  if (!text) return undefined;

  const hoursMatch = text.match(/(\d+)\s*jam/i);
  const minutesMatch = text.match(/(\d+)\s*menit/i);

  const hours = hoursMatch ? parseInt(hoursMatch[1], 10) : 0;
  const minutes = minutesMatch ? parseInt(minutesMatch[1], 10) : 0;

  if (!hours && !minutes) {
    // Fallback: if it's just a bare number, assume minutes.
    const bare = text.match(/(\d+)/);
    if (!bare) return undefined;
    return `PT${parseInt(bare[1], 10)}M`;
  }

  let iso = "PT";
  if (hours) iso += `${hours}H`;
  if (minutes) iso += `${minutes}M`;
  return iso;
}

/** Ensures an image path becomes an absolute URL for structured data. */
function toAbsoluteUrl(path: string | undefined | null): string | undefined {
  if (!path) return undefined;
  if (path.startsWith("http://") || path.startsWith("https://")) return path;
  return `${BASE_URL}${path.startsWith("/") ? "" : "/"}${path}`;
}

/**
 * Builds a schema.org Recipe JSON-LD object for a given recipe.
 * Render it on the recipe detail page inside:
 *   <script type="application/ld+json"
 *           dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
 */
export function buildRecipeJsonLd(recipe: Recipe) {
  const cookTime = toISODuration(recipe.cookingTime);

  const caloriesNumberMatch = recipe.calories?.match(/(\d+)/);
  const calories = caloriesNumberMatch
    ? `${caloriesNumberMatch[1]} calories`
    : undefined;

  return {
    "@context": "https://schema.org",
    "@type": "Recipe",
    name: recipe.title,
    image: toAbsoluteUrl(recipe.image) ? [toAbsoluteUrl(recipe.image)] : undefined,
    author: {
      "@type": "Person",
      name: recipe.author,
    },
    datePublished: recipe.createdAt,
    description: recipe.description,
    recipeCategory: recipe.category,
    recipeCuisine: "Indonesian",
    keywords: [recipe.category, ...recipe.tags].filter(Boolean).join(", "),
    recipeYield: recipe.servings,
    cookTime,
    totalTime: cookTime,
    nutrition: calories
      ? {
          "@type": "NutritionInformation",
          calories,
        }
      : undefined,
    recipeIngredient: recipe.ingredients,
    recipeInstructions: recipe.steps.map((step, index) => ({
      "@type": "HowToStep",
      position: index + 1,
      text: step,
    })),
    aggregateRating:
      recipe.rating && recipe.rating > 0
        ? {
            "@type": "AggregateRating",
            ratingValue: recipe.rating,
            // We don't currently store a separate review count, so we use
            // favorites as a reasonable proxy signal. Swap this out if a
            // real review count field is added later.
            ratingCount: Math.max(recipe.favorites, 1),
          }
        : undefined,
  };
}
