import { Product, Testimonial } from "@shared/schema";

// Sample products data
export const furnitureProducts: Product[] = [
  {
    id: 1,
    name: "Wooden Dining Set",
    description: "Elegant 6-seater dining table with matching chairs",
    price: 35999,
    category: "Furniture",
    imageUrl: "https://images.unsplash.com/photo-1530018607912-eff2daa1bac4?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400",
    featured: true,
  },
  {
    id: 2,
    name: "L-Shaped Sofa",
    description: "Comfortable 3-seater with premium upholstery",
    price: 42499,
    category: "Furniture",
    imageUrl: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400",
    featured: true,
  },
  {
    id: 3,
    name: "Complete Bedroom Set",
    description: "Queen size bed with side tables and wardrobe",
    price: 56999,
    category: "Furniture",
    imageUrl: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400",
    featured: true,
  },
  {
    id: 4,
    name: "Office Desk",
    description: "Spacious desk with built-in storage for your workspace",
    price: 12999,
    category: "Furniture",
    imageUrl: "https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400",
    featured: false,
  },
];

export const electronicsProducts: Product[] = [
  {
    id: 5,
    name: "55\" Smart LED TV",
    description: "4K Ultra HD Smart TV with HDR and voice control",
    price: 48990,
    category: "Electronics",
    imageUrl: "https://images.unsplash.com/photo-1593305841991-05c297ba4575?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400",
    featured: true,
  },
  {
    id: 6,
    name: "Double Door Refrigerator",
    description: "Frost-free with inverter technology for efficiency",
    price: 32990,
    category: "Electronics",
    imageUrl: "https://images.unsplash.com/photo-1571175443880-49e1d25b2bc5?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400",
    featured: true,
  },
  {
    id: 7,
    name: "Front Load Washing Machine",
    description: "8kg capacity with multiple wash programs",
    price: 28499,
    category: "Electronics",
    imageUrl: "https://images.pexels.com/photos/5816260/pexels-photo-5816260.jpeg?auto=compress&cs=tinysrgb&w=600&h=400",
    featured: true,
  },
  {
    id: 8,
    name: "Air Conditioner",
    description: "1.5 ton split AC with inverter technology",
    price: 35990,
    category: "Electronics",
    imageUrl: "https://images.pexels.com/photos/7318867/pexels-photo-7318867.jpeg?auto=compress&cs=tinysrgb&w=600&h=400",
    featured: false,
  },
];

export const specialOffers: Product[] = [
  {
    id: 9,
    name: "Living Room Set",
    description: "Complete living room furniture set including sofa, coffee table, and side tables",
    price: 119999,
    discountPrice: 89999,
    category: "Furniture",
    imageUrl: "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400",
    featured: false,
  },
  {
    id: 10,
    name: "Home Theater System",
    description: "5.1 channel surround sound system with Bluetooth connectivity",
    price: 26990,
    discountPrice: 21990,
    category: "Electronics",
    imageUrl: "https://images.unsplash.com/photo-1558403194-611308249627?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400",
    featured: false,
  },
];

// All products combined
export const allProducts: Product[] = [
  ...furnitureProducts,
  ...electronicsProducts,
  ...specialOffers,
];

// Sample testimonials data
export const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Priya Sharma",
    location: "Delhi",
    rating: 5,
    review: "Great experience shopping at Mr Sindhu. The furniture collection is extensive and of excellent quality. The staff was very helpful and delivery was prompt."
  },
  {
    id: 2,
    name: "Rajesh Kumar",
    location: "Gurgaon",
    rating: 4,
    review: "I bought a smart TV from their electronics section, and I'm really impressed with the quality and after-sales service. The installation team was professional and answered all my questions."
  },
  {
    id: 3,
    name: "Arun & Neha Gupta",
    location: "Noida",
    rating: 5,
    review: "We furnished our entire living room with pieces from Mr Sindhu. The quality is outstanding, prices are reasonable, and the customer service is exceptional. Highly recommended!"
  },
];
