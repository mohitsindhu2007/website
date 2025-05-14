import { 
  Product, InsertProduct, 
  ContactMessage, InsertContactMessage, 
  Testimonial, InsertTestimonial,
  User, InsertUser 
} from "@shared/schema";

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

export class MemStorage implements IStorage {
  private products: Map<number, Product>;
  private contactMessages: Map<number, ContactMessage>;
  private testimonials: Map<number, Testimonial>;
  private users: Map<number, User>;
  private productCurrentId: number;
  private messageCurrentId: number;
  private testimonialCurrentId: number;
  private userCurrentId: number;

  constructor() {
    this.products = new Map();
    this.contactMessages = new Map();
    this.testimonials = new Map();
    this.users = new Map();
    this.productCurrentId = 1;
    this.messageCurrentId = 1;
    this.testimonialCurrentId = 1;
    this.userCurrentId = 1;
    
    // Initialize with some sample products
    this.initializeProducts();
    this.initializeTestimonials();
  }

  // Products
  async getAllProducts(): Promise<Product[]> {
    return Array.from(this.products.values());
  }

  async getProductById(id: number): Promise<Product | undefined> {
    return this.products.get(id);
  }

  async getProductsByCategory(category: string): Promise<Product[]> {
    return Array.from(this.products.values()).filter(
      (product) => product.category === category
    );
  }

  async getFeaturedProducts(): Promise<Product[]> {
    return Array.from(this.products.values()).filter(
      (product) => product.featured
    );
  }

  async createProduct(insertProduct: InsertProduct): Promise<Product> {
    const id = this.productCurrentId++;
    const product: Product = { ...insertProduct, id };
    this.products.set(id, product);
    return product;
  }

  async updateProduct(id: number, productData: Partial<InsertProduct>): Promise<Product | undefined> {
    const existingProduct = this.products.get(id);
    if (!existingProduct) return undefined;

    const updatedProduct: Product = { ...existingProduct, ...productData };
    this.products.set(id, updatedProduct);
    return updatedProduct;
  }

  async deleteProduct(id: number): Promise<boolean> {
    return this.products.delete(id);
  }

  // Contact Messages
  async getAllContactMessages(): Promise<ContactMessage[]> {
    return Array.from(this.contactMessages.values());
  }

  async createContactMessage(insertMessage: InsertContactMessage): Promise<ContactMessage> {
    const id = this.messageCurrentId++;
    const createdAt = new Date().toISOString();
    const message: ContactMessage = { ...insertMessage, id, createdAt };
    this.contactMessages.set(id, message);
    return message;
  }

  // Testimonials
  async getAllTestimonials(): Promise<Testimonial[]> {
    return Array.from(this.testimonials.values());
  }

  async createTestimonial(insertTestimonial: InsertTestimonial): Promise<Testimonial> {
    const id = this.testimonialCurrentId++;
    const testimonial: Testimonial = { ...insertTestimonial, id };
    this.testimonials.set(id, testimonial);
    return testimonial;
  }

  // User
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.userCurrentId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  private initializeProducts() {
    // Furniture products
    this.createProduct({
      name: "Wooden Dining Set",
      description: "Elegant 6-seater dining table with matching chairs",
      price: 35999,
      category: "Furniture",
      imageUrl: "https://images.unsplash.com/photo-1530018607912-eff2daa1bac4?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400",
      featured: true,
    });

    this.createProduct({
      name: "L-Shaped Sofa",
      description: "Comfortable 3-seater with premium upholstery",
      price: 42499,
      category: "Furniture",
      imageUrl: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400",
      featured: true,
    });

    this.createProduct({
      name: "Complete Bedroom Set",
      description: "Queen size bed with side tables and wardrobe",
      price: 56999,
      category: "Furniture",
      imageUrl: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400",
      featured: true,
    });

    this.createProduct({
      name: "Office Desk",
      description: "Spacious desk with built-in storage for your workspace",
      price: 12999,
      category: "Furniture",
      imageUrl: "https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400",
      featured: false,
    });

    this.createProduct({
      name: "Bookshelf",
      description: "Modern bookshelf with adjustable shelves",
      price: 8999,
      category: "Furniture",
      imageUrl: "https://images.unsplash.com/photo-1594620302200-9a0cc02cbc6a?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400",
      featured: false,
    });

    this.createProduct({
      name: "Coffee Table",
      description: "Stylish coffee table with storage compartment",
      price: 5999,
      category: "Furniture",
      imageUrl: "https://images.unsplash.com/photo-1565374395542-0ce18882c857?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400",
      featured: false,
    });

    this.createProduct({
      name: "Lounge Chair",
      description: "Comfortable lounge chair for your living room",
      price: 15999,
      category: "Furniture",
      imageUrl: "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400",
      featured: false,
    });

    // Electronics products
    this.createProduct({
      name: "55\" Smart LED TV",
      description: "4K Ultra HD Smart TV with HDR and voice control",
      price: 48990,
      category: "Electronics",
      imageUrl: "https://images.unsplash.com/photo-1593305841991-05c297ba4575?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400",
      featured: true,
    });

    this.createProduct({
      name: "Double Door Refrigerator",
      description: "Frost-free with inverter technology for efficiency",
      price: 32990,
      category: "Electronics",
      imageUrl: "https://images.unsplash.com/photo-1571175443880-49e1d25b2bc5?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400",
      featured: true,
    });

    this.createProduct({
      name: "Front Load Washing Machine",
      description: "8kg capacity with multiple wash programs",
      price: 28499,
      category: "Electronics",
      imageUrl: "https://images.pexels.com/photos/5816260/pexels-photo-5816260.jpeg?auto=compress&cs=tinysrgb&w=600&h=400",
      featured: true,
    });

    this.createProduct({
      name: "Air Conditioner",
      description: "1.5 ton split AC with inverter technology",
      price: 35990,
      category: "Electronics",
      imageUrl: "https://images.pexels.com/photos/7318867/pexels-photo-7318867.jpeg?auto=compress&cs=tinysrgb&w=600&h=400",
      featured: false,
    });

    this.createProduct({
      name: "Microwave Oven",
      description: "Convection microwave with multiple cooking modes",
      price: 12499,
      category: "Electronics",
      imageUrl: "https://images.pexels.com/photos/3847756/pexels-photo-3847756.jpeg?auto=compress&cs=tinysrgb&w=600&h=400",
      featured: false,
    });

    this.createProduct({
      name: "Home Theater System",
      description: "5.1 channel surround sound system",
      price: 26990,
      category: "Electronics",
      imageUrl: "https://images.unsplash.com/photo-1558403194-611308249627?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400",
      featured: false,
      discountPrice: 21990,
    });

    this.createProduct({
      name: "Living Room Set",
      description: "Complete living room furniture set including sofa, coffee table, and side tables",
      price: 119999,
      category: "Furniture",
      imageUrl: "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400",
      featured: false,
      discountPrice: 89999,
    });
  }

  private initializeTestimonials() {
    this.createTestimonial({
      name: "Priya Sharma",
      location: "Delhi",
      rating: 5,
      review: "Great experience shopping at Mr Sindhu. The furniture collection is extensive and of excellent quality. The staff was very helpful and delivery was prompt."
    });

    this.createTestimonial({
      name: "Rajesh Kumar",
      location: "Gurgaon",
      rating: 4,
      review: "I bought a smart TV from their electronics section, and I'm really impressed with the quality and after-sales service. The installation team was professional and answered all my questions."
    });

    this.createTestimonial({
      name: "Arun & Neha Gupta",
      location: "Noida",
      rating: 5,
      review: "We furnished our entire living room with pieces from Mr Sindhu. The quality is outstanding, prices are reasonable, and the customer service is exceptional. Highly recommended!"
    });
  }
}

export const storage = new MemStorage();
