import { useLocation } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import Header from "@/components/header";
import Carousel from "@/components/carousel";
import CategoryNav from "@/components/category-nav";
import AnimatedBorder from "@/components/animated-border";
import { CollectionSection } from "@/components/collection-section";
import type { Category } from "@shared/schema";

export default function Home() {
  const [, setLocation] = useLocation();
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const { data: categories, isLoading: categoriesLoading } = useQuery<Category[]>({
    queryKey: ["/api/categories"],
    queryFn: async () => {
      const response = await fetch("/api/categories");
      if (!response.ok) throw new Error("Failed to fetch categories");
      return response.json();
    },
  });

  const handleCategoryChange = (categorySlug: string) => {
    setSelectedCategory(categorySlug);
    setLocation(`/category/${categorySlug}`);
  };

  return (
    <div className="min-h-screen bg-white" data-testid="home-page">
      <Header />
      
      <main className="animate-fade-in">
        <Carousel />
        
        <AnimatedBorder borderNumber={1} />
        
        <CategoryNav
          categories={categories || []}
          selectedCategory={selectedCategory}
          onCategoryChange={handleCategoryChange}
          isLoading={categoriesLoading}
        />
        
        <AnimatedBorder borderNumber={2} />
        
        <div className="container mx-auto px-4 py-12 space-y-12">
          <CollectionSection
            title="New Arrival"
            collectionType="new-arrival"
            onViewAll={() => setLocation("/category/new-arrival")}
          />

          <AnimatedBorder borderNumber={3} />

          <CollectionSection
            title="Trending Collection"
            collectionType="trending"
            onViewAll={() => setLocation("/category/trending")}
          />

          <AnimatedBorder borderNumber={4} />

          <CollectionSection
            title="Exclusive Collection"
            collectionType="exclusive"
            onViewAll={() => setLocation("/category/exclusive")}
          />
          
          <AnimatedBorder borderNumber={5} />
        </div>
      </main>
    </div>
  );
}
