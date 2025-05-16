import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertContactMessageSchema, insertProductSchema } from "@shared/schema";
import { z } from "zod";
import { upload } from "./uploads.js";
import path from "path";
import express from "express";
import { fileURLToPath } from 'url';

// Get directory name in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export async function registerRoutes(app: Express): Promise<Server> {
  // Set up storage of uploaded images
  app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')));
  
  // Image upload endpoint
  app.post('/api/upload', upload.array('images', 5), (req, res) => {
    try {
      if (!req.files || (Array.isArray(req.files) && req.files.length === 0)) {
        return res.status(400).json({ success: false, message: 'No files uploaded' });
      }
      
      const files = Array.isArray(req.files) ? req.files : [req.files];
      const fileUrls = files.map(file => `/uploads/${file.filename}`);
      
      return res.status(200).json({
        success: true,
        message: 'Files uploaded successfully',
        files: fileUrls
      });
    } catch (error) {
      console.error('Upload error:', error);
      return res.status(500).json({
        success: false,
        message: 'Error uploading files'
      });
    }
  });
  // Get all products
  app.get("/api/products", async (req, res) => {
    try {
      const products = await storage.getAllProducts();
      return res.json(products);
    } catch (error) {
      return res.status(500).json({ message: "Failed to fetch products" });
    }
  });

  // Get product by ID
  app.get("/api/products/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid product ID" });
      }

      const product = await storage.getProductById(id);
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }

      return res.json(product);
    } catch (error) {
      return res.status(500).json({ message: "Failed to fetch product" });
    }
  });

  // Get products by category
  app.get("/api/products/category/:category", async (req, res) => {
    try {
      const category = req.params.category;
      const products = await storage.getProductsByCategory(category);
      return res.json(products);
    } catch (error) {
      return res.status(500).json({ message: "Failed to fetch products by category" });
    }
  });

  // Get featured products
  app.get("/api/products/featured", async (req, res) => {
    try {
      const featuredProducts = await storage.getFeaturedProducts();
      return res.json(featuredProducts);
    } catch (error) {
      return res.status(500).json({ message: "Failed to fetch featured products" });
    }
  });

  // Create a product
  app.post("/api/products", async (req, res) => {
    try {
      const productData = insertProductSchema.parse(req.body);
      const newProduct = await storage.createProduct(productData);
      return res.status(201).json(newProduct);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid product data", errors: error.errors });
      }
      return res.status(500).json({ message: "Failed to create product" });
    }
  });

  // Update a product
  app.put("/api/products/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid product ID" });
      }

      const productData = insertProductSchema.partial().parse(req.body);
      const updatedProduct = await storage.updateProduct(id, productData);
      
      if (!updatedProduct) {
        return res.status(404).json({ message: "Product not found" });
      }

      return res.json(updatedProduct);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid product data", errors: error.errors });
      }
      return res.status(500).json({ message: "Failed to update product" });
    }
  });

  // Get product reviews
  app.get("/api/products/:id/reviews", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid product ID" });
      }
      const reviews = await storage.getProductReviews(id);
      return res.json(reviews);
    } catch (error) {
      return res.status(500).json({ message: "Failed to fetch reviews" });
    }
  });

  // Add product review
  app.post("/api/products/:id/reviews", async (req, res) => {
    try {
      const productId = parseInt(req.params.id);
      if (isNaN(productId)) {
        return res.status(400).json({ message: "Invalid product ID" });
      }
      
      const reviewData = insertProductReviewSchema.parse({
        ...req.body,
        productId,
        createdAt: new Date().toISOString()
      });
      
      const newReview = await storage.createProductReview(reviewData);
      return res.status(201).json(newReview);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid review data", errors: error.errors });
      }
      console.error("Review creation error:", error);
      return res.status(500).json({ message: "Failed to create review" });
    }
  });

  // Delete a product
  app.delete("/api/products/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid product ID" });
      }

      const success = await storage.deleteProduct(id);
      if (!success) {
        return res.status(404).json({ message: "Product not found" });
      }

      return res.json({ message: "Product deleted successfully" });
    } catch (error) {
      return res.status(500).json({ message: "Failed to delete product" });
    }
  });

  // Get all testimonials
  app.get("/api/testimonials", async (req, res) => {
    try {
      const testimonials = await storage.getAllTestimonials();
      return res.json(testimonials);
    } catch (error) {
      return res.status(500).json({ message: "Failed to fetch testimonials" });
    }
  });

  // Submit a contact message
  app.post("/api/contact", async (req, res) => {
    try {
      const messageData = insertContactMessageSchema.parse(req.body);
      const newMessage = await storage.createContactMessage(messageData);
      return res.status(201).json({ 
        success: true, 
        message: "Your message has been sent successfully. We'll get back to you soon.",
        data: newMessage
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ 
          success: false,
          message: "Invalid contact form data", 
          errors: error.errors 
        });
      }
      return res.status(500).json({ 
        success: false,
        message: "Failed to send message. Please try again later." 
      });
    }
  });

  // Get all contact messages (admin only)
  app.get("/api/contact/messages", async (req, res) => {
    try {
      const messages = await storage.getAllContactMessages();
      return res.json(messages);
    } catch (error) {
      return res.status(500).json({ message: "Failed to fetch contact messages" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
