import { useQuery } from "@tanstack/react-query";
import { ProductCard } from "./product-card";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import { useState } from "react";
import ProductModal from "./product-modal";
import type { Product } from "@shared/schema";

interface CollectionSectionProps {
  title: string;
  collectionType: "new-arrival" | "trending" | "exclusive";
  onViewAll?: () => void;
}

export function CollectionSection({ title, collectionType, onViewAll }: CollectionSectionProps) {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const { data: products, isLoading } = useQuery<Product[]>({
    queryKey: [`/api/collections/${collectionType}`],
  });

  if (isLoading) {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-serif text-gray-900">{title}</h2>
        </div>
        <div className="flex gap-4 overflow-x-auto pb-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="flex-none w-64 h-96 bg-gray-100 animate-pulse rounded-lg" />
          ))}
        </div>
      </div>
    );
  }

  if (!products || products.length === 0) {
    return null;
  }

  return (
    <>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-serif text-gray-900">{title}</h2>
          <Button
            onClick={onViewAll}
            variant="outline"
            size="sm"
            className="bg-[#6B4423] text-white hover:bg-[#5a3a1e] border-none"
          >
            view all
          </Button>
        </div>
        <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
          {products.map((product) => (
            <div key={product._id} className="flex-none w-64">
              <ProductCard
                product={product}
                onClick={() => setSelectedProduct(product)}
              />
            </div>
          ))}
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
