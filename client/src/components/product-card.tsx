import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star } from "lucide-react";
import type { Product } from "@shared/schema";

interface ProductCardProps {
  product: Product;
  onClick?: () => void;
}

export function ProductCard({ product, onClick }: ProductCardProps) {
  const hasDiscount = product.discountPercentage && product.discountPercentage > 0;
  const displayPrice = product.price;
  const originalPrice = product.originalPrice || product.price;

  return (
    <Card 
      className="group cursor-pointer overflow-hidden border-none shadow-sm hover:shadow-md transition-shadow bg-white"
      onClick={onClick}
    >
      <div className="relative aspect-[3/4] overflow-hidden rounded-lg">
        <img
          src={product.images[0]}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {hasDiscount && (
          <div className="absolute top-2 right-2 bg-[#6B4423] text-white px-2 py-1 rounded-full text-xs font-medium">
            SALE
          </div>
        )}
      </div>

      <div className="p-3 space-y-2">
        {product.rating !== undefined && (
          <div className="flex items-center gap-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={`w-3 h-3 ${
                  i < Math.floor(product.rating || 0)
                    ? "fill-yellow-400 text-yellow-400"
                    : "fill-gray-200 text-gray-200"
                }`}
              />
            ))}
            {product.reviewCount !== undefined && product.reviewCount > 0 && (
              <span className="text-xs text-gray-500 ml-1">
                ({product.reviewCount})
              </span>
            )}
          </div>
        )}

        <h3 className="font-medium text-sm line-clamp-2 text-gray-800">
          {product.name}
        </h3>

        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-base font-semibold text-gray-900">
            ₹{displayPrice.toLocaleString('en-IN')}
          </span>
          {hasDiscount && (
            <>
              <span className="text-sm text-gray-400 line-through">
                ₹{originalPrice.toLocaleString('en-IN')}
              </span>
              <span className="text-xs font-medium text-red-600">
                {product.discountPercentage}% off
              </span>
            </>
          )}
        </div>
      </div>
    </Card>
  );
}
