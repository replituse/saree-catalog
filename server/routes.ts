import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { productSearchSchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  await storage.connect();

  app.get("/api/categories", async (req, res) => {
    try {
      const categories = await storage.getCategories();
      res.json(categories);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch categories" });
    }
  });

  app.get("/api/categories/:slug", async (req, res) => {
    try {
      const { slug } = req.params;
      const category = await storage.getCategoryBySlug(slug);
      
      if (!category) {
        return res.status(404).json({ error: "Category not found" });
      }
      
      res.json(category);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch category" });
    }
  });

  app.get("/api/products", async (req, res) => {
    try {
      const searchParams = productSearchSchema.parse({
        search: req.query.search as string,
        category: req.query.category as string,
        priceMin: req.query.priceMin ? Number(req.query.priceMin) : undefined,
        priceMax: req.query.priceMax ? Number(req.query.priceMax) : undefined,
        material: req.query.material as string,
        collectionType: req.query.collectionType as string,
      });

      const products = await storage.getProducts(searchParams);
      res.json(products);
    } catch (error: any) {
      if (error.name === 'ZodError') {
        return res.status(400).json({ error: "Invalid query parameters" });
      }
      res.status(500).json({ error: "Failed to fetch products" });
    }
  });

  app.get("/api/products/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const product = await storage.getProductById(id);
      
      if (!product) {
        return res.status(404).json({ error: "Product not found" });
      }
      
      res.json(product);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch product" });
    }
  });

  app.get("/api/collections/:collectionType", async (req, res) => {
    try {
      const { collectionType } = req.params;
      const limit = req.query.limit ? Number(req.query.limit) : 6;
      const products = await storage.getProductsByCollection(collectionType, limit);
      res.json(products);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch collection products" });
    }
  });

  app.get("/api/products/category/:category", async (req, res) => {
    try {
      const { category } = req.params;
      const products = await storage.getProductsByCategory(category);
      res.json(products);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch products by category" });
    }
  });

  app.get("/api/search", async (req, res) => {
    try {
      const { q } = req.query;
      if (!q || typeof q !== 'string') {
        return res.status(400).json({ error: "Search query is required" });
      }
      
      const products = await storage.searchProducts(q);
      res.json(products);
    } catch (error) {
      res.status(500).json({ error: "Failed to search products" });
    }
  });

  const httpServer = createServer(app);

  process.on('SIGINT', async () => {
    await storage.disconnect();
    process.exit(0);
  });

  return httpServer;
}
