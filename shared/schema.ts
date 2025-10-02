import { z } from "zod";

export const categorySchema = z.object({
  _id: z.string().optional(),
  name: z.string().min(1, "Category name is required"),
  slug: z.string().min(1, "Category slug is required"),
  description: z.string().min(1, "Category description is required"),
  imageUrl: z.string().url().optional(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});

export const productSchema = z.object({
  _id: z.string().optional(),
  name: z.string().min(1, "Product name is required"),
  category: z.string().min(1, "Category is required"),
  price: z.number().min(0, "Price must be positive"),
  originalPrice: z.number().min(0, "Original price must be positive").optional(),
  discountPercentage: z.number().min(0).max(100).optional(),
  material: z.string().min(1, "Material is required"),
  description: z.string().min(1, "Description is required"),
  images: z.array(z.string().url()).min(1, "At least one image is required"),
  colors: z.array(z.string()).min(1, "At least one color is required"),
  inStock: z.boolean().default(true),
  collectionType: z.enum(["new-arrival", "trending", "exclusive"]).optional(),
  rating: z.number().min(0).max(5).optional(),
  reviewCount: z.number().min(0).optional(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});

export const insertCategorySchema = categorySchema.omit({
  _id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertProductSchema = productSchema.omit({
  _id: true,
  createdAt: true,
  updatedAt: true,
});

export type Category = z.infer<typeof categorySchema>;
export type Product = z.infer<typeof productSchema>;
export type InsertCategory = z.infer<typeof insertCategorySchema>;
export type InsertProduct = z.infer<typeof insertProductSchema>;

export const productSearchSchema = z.object({
  search: z.string().optional(),
  category: z.string().optional(),
  priceMin: z.number().optional(),
  priceMax: z.number().optional(),
  material: z.string().optional(),
  collectionType: z.enum(["new-arrival", "trending", "exclusive"]).optional(),
});

export type ProductSearch = z.infer<typeof productSearchSchema>;
