import { Pool, neonConfig } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-serverless';
import { eq } from 'drizzle-orm';
import ws from 'ws';
import * as schema from '@shared/schema';
import { 
  Product, InsertProduct, 
  ContactMessage, InsertContactMessage, 
  Testimonial, InsertTestimonial,
  User, InsertUser,
  products, testimonials, contactMessages, users
} from "@shared/schema";

neonConfig.webSocketConstructor = ws;

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL must be set. Did you forget to provision a database?");
}

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const db = drizzle({ client: pool, schema });

export interface IStorage {
  // Products
  getAllProducts(): Promise<Product[]>;
  getProductById(id: number): Promise<Product | undefined>;
  getProductsByCategory(category: string): Promise<Product[]>;
  getFeaturedProducts(): Promise<Product[]>;
  createProduct(product: InsertProduct): Promise<Product>;
  updateProduct(id: number, product: Partial<InsertProduct>): Promise<Product | undefined>;
  deleteProduct(id: number): Promise<boolean>;
  
  // Contact Messages
  getAllContactMessages(): Promise<ContactMessage[]>;
  createContactMessage(message: InsertContactMessage): Promise<ContactMessage>;
  
  // Testimonials
  getAllTestimonials(): Promise<Testimonial[]>;
  createTestimonial(testimonial: InsertTestimonial): Promise<Testimonial>;
  
  // User
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
}

export class DatabaseStorage implements IStorage {
  // Products
  async getAllProducts(): Promise<Product[]> {
    return await db.select().from(products);
  }

  async getProductById(id: number): Promise<Product | undefined> {
    const [product] = await db.select().from(products).where(eq(products.id, id));
    return product;
  }

  async getProductsByCategory(category: string): Promise<Product[]> {
    return await db.select().from(products).where(eq(products.category, category));
  }

  async getFeaturedProducts(): Promise<Product[]> {
    return await db.select().from(products).where(eq(products.featured, true));
  }

  async createProduct(insertProduct: InsertProduct): Promise<Product> {
    const [product] = await db.insert(products).values(insertProduct).returning();
    return product;
  }

  async updateProduct(id: number, productData: Partial<InsertProduct>): Promise<Product | undefined> {
    const [updatedProduct] = await db
      .update(products)
      .set(productData)
      .where(eq(products.id, id))
      .returning();
    return updatedProduct;
  }

  async deleteProduct(id: number): Promise<boolean> {
    const result = await db.delete(products).where(eq(products.id, id));
    return result.rowCount !== null && result.rowCount > 0;
  }

  // Contact Messages
  async getAllContactMessages(): Promise<ContactMessage[]> {
    return await db.select().from(contactMessages);
  }

  async createContactMessage(insertMessage: InsertContactMessage): Promise<ContactMessage> {
    const [message] = await db
      .insert(contactMessages)
      .values({
        ...insertMessage,
        createdAt: new Date().toISOString()
      })
      .returning();
    return message;
  }

  // Testimonials
  async getAllTestimonials(): Promise<Testimonial[]> {
    return await db.select().from(testimonials);
  }

  async createTestimonial(insertTestimonial: InsertTestimonial): Promise<Testimonial> {
    const [testimonial] = await db
      .insert(testimonials)
      .values(insertTestimonial)
      .returning();
    return testimonial;
  }

  // User
  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(insertUser)
      .returning();
    return user;
  }

  // Initialize database with sample data
  async initializeDatabase() {
    // Check if products table is empty
    const existingProducts = await db.select().from(products);
    
    if (existingProducts.length === 0) {
      // Furniture products
      await this.createProduct({
        name: "Wooden Dining Table",
        description: "Handcrafted wooden dining table for 6 people, made with premium quality wood",
        price: 32000,
        category: "Furniture",
        imageUrl: "https://images.unsplash.com/photo-1530018607912-eff2daa1bac4?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400",
        featured: true,
      });

      await this.createProduct({
        name: "Executive Office Chair",
        description: "Comfortable executive chair with ergonomic design and premium upholstery",
        price: 15000,
        category: "Furniture",
        imageUrl: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400",
        featured: true,
      });

      await this.createProduct({
        name: "Sofa Set 3+1+1",
        description: "Premium quality sofa set with comfortable cushions and durable upholstery",
        price: 55000,
        category: "Furniture",
        imageUrl: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400",
        featured: true,
      });

      await this.createProduct({
        name: "Bedroom Set",
        description: "Complete bedroom set with king size bed, wardrobe, and side tables",
        price: 85000,
        category: "Furniture",
        imageUrl: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400",
        featured: true,
        discountPrice: 75000,
      });

      // Electronics products
      await this.createProduct({
        name: "Samsung Smart TV 55\"",
        description: "4K Ultra HD Smart TV with HDR and voice control features",
        price: 58000,
        category: "Electronics",
        imageUrl: "https://images.unsplash.com/photo-1593305841991-05c297ba4575?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400",
        featured: true,
      });

      await this.createProduct({
        name: "LG Double Door Refrigerator",
        description: "Energy-efficient double door refrigerator with inverter technology",
        price: 42000,
        category: "Electronics",
        imageUrl: "https://images.unsplash.com/photo-1571175443880-49e1d25b2bc5?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400",
        featured: true,
      });

      await this.createProduct({
        name: "Panasonic Washing Machine",
        description: "7.5 kg fully automatic top load washing machine with multiple wash programs",
        price: 23000,
        category: "Electronics",
        imageUrl: "https://images.pexels.com/photos/5816260/pexels-photo-5816260.jpeg?auto=compress&cs=tinysrgb&w=600&h=400",
        featured: true,
        discountPrice: 19999,
      });

      // Initialize testimonials
      const existingTestimonials = await db.select().from(testimonials);
      
      if (existingTestimonials.length === 0) {
        await this.createTestimonial({
          name: "Sunil Kumar",
          location: "Rohtak",
          rating: 5,
          review: "Jombir bhai ne humein bahut accha furniture provide kiya, quality ekdum top class hai aur delivery time par hui."
        });

        await this.createTestimonial({
          name: "Mohan Singh",
          location: "Kalanaur",
          rating: 5,
          review: "Maine Mr Sindhu se Samsung ka TV kharida, installation team ne sab kuch achhe se set karke diya aur product bhi badhiya hai."
        });

        await this.createTestimonial({
          name: "Poonam & Rajesh",
          location: "Rohtak",
          rating: 4,
          review: "Humne apne naye ghar ke liye saara furniture Mr Sindhu se liya. Daam thik hai aur quality acchi hai. Highly recommended!"
        });
      }
    }
  }
}

// Initialize the database storage
export const storage = new DatabaseStorage();

// Run initialization (this will populate the database if it's empty)
storage.initializeDatabase().catch(console.error);
