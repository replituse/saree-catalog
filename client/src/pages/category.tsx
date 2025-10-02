import { useQuery } from "@tanstack/react-query";
import { useLocation, useRoute } from "wouter";
import { ProductCard } from "@/components/product-card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Menu } from "lucide-react";
import { useState } from "react";
import ProductModal from "@/components/product-modal";
import type { Product } from "@shared/schema";

export default function CategoryPage() {
  const [, params] = useRoute("/category/:slug");
  const [, setLocation] = useLocation();
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  
  const slug = params?.slug || "";
  
  const isCollection = ["new-arrival", "trending", "exclusive"].includes(slug);
  
  const { data: products, isLoading } = useQuery<Product[]>({
    queryKey: [isCollection ? `/api/collections/${slug}` : `/api/products/category/${slug}`],
    queryFn: async () => {
      const url = isCollection 
        ? `/api/collections/${slug}?limit=100`
        : `/api/products/category/${slug}`;
      const response = await fetch(url);
      if (!response.ok) throw new Error("Failed to fetch products");
      return response.json();
    },
    enabled: !!slug,
  });

  const getCategoryTitle = (slug: string) => {
    switch (slug) {
      case "new-arrival":
        return "New Arrival";
      case "trending":
        return "Trending Collection";
      case "exclusive":
        return "Exclusive Collection";
      default:
        return slug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="sticky top-0 z-10 bg-white border-b px-4 py-4">
          <div className="flex items-center justify-between max-w-screen-xl mx-auto">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setLocation("/")}
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <h1 className="text-lg font-serif text-[#6B4E8D] absolute left-1/2 transform -translate-x-1/2">
              {getCategoryTitle(slug)}
            </h1>
            <Button variant="ghost" size="icon">
              <Menu className="w-5 h-5" />
            </Button>
          </div>
        </div>
        <div className="container mx-auto px-4 py-6">
          <div className="grid grid-cols-2 gap-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="h-96 bg-gray-100 animate-pulse rounded-lg" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="min-h-screen bg-gray-50">
        <div className="sticky top-0 z-10 bg-white border-b px-4 py-4">
          <div className="flex items-center justify-between max-w-screen-xl mx-auto">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setLocation("/")}
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <h1 className="text-lg font-serif text-[#6B4E8D] absolute left-1/2 transform -translate-x-1/2">
              {getCategoryTitle(slug)}
            </h1>
            <Button variant="ghost" size="icon">
              <Menu className="w-5 h-5" />
            </Button>
          </div>
        </div>

        <div className="container mx-auto px-4 py-6">
          {products && products.length > 0 ? (
            <div className="grid grid-cols-2 gap-4">
              {products.map((product) => (
                <ProductCard
                  key={product._id}
                  product={product}
                  onClick={() => setSelectedProduct(product)}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500">No products found in this collection</p>
            </div>
          )}
        </div>
      </div>

      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}
    </>
  );
}
