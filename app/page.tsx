import Hero from "@/components/home/Hero";
import SearchSection from "@/components/home/SearchSection";
import FeaturedSection from "@/components/home/FeaturedSection";
import CategorySection from "@/components/home/CategorySection";
import TrendingSection from "@/components/home/TrendingSection";
import NewRecipeSection from "@/components/home/NewRecipeSection";
import PopularSection from "@/components/home/PopularSection";
import VideoTutorialSection from "@/components/home/VideoTutorialSection";
import NewsletterSection from "@/components/home/NewsletterSection";

export default function Home() {
  return (
    <>
      <Hero />
      <SearchSection />
      <FeaturedSection />
      <CategorySection />
      <TrendingSection />
      <NewRecipeSection />
      <PopularSection />
      <VideoTutorialSection />
      <NewsletterSection />
    </>
  );
}
