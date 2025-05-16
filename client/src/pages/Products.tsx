import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useLocation } from "wouter";
import ProductCard from "@/components/ProductCard";
import { Separator } from "@/components/ui/separator";
import { 
  Select, 
  SelectTrigger, 
  SelectValue, 
  SelectContent, 
  SelectItem 
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { Product } from "@shared/schema";

const ProductCardSkeleton = () => (
  <div className="bg-white rounded-lg overflow-hidden shadow-md">
    <Skeleton className="w-full h-56" />
    <div className="p-4">
      <div className="flex justify-between items-start mb-2">
        <Skeleton className="h-6 w-1/2" />
        <Skeleton className="h-5 w-20" />
      </div>
      <Skeleton className="h-4 w-full mb-3" />
      <div className="flex justify-between items-center">
        <Skeleton className="h-6 w-24" />
        <Skeleton className="h-9 w-28" />
      </div>
    </div>
  </div>
);

const Products = () => {
  const [location] = useLocation();
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("default");
  const [activeCategory, setActiveCategory] = useState("all");

  const { data: products, isLoading } = useQuery<Product[]>({
    queryKey: ["/api/products"],
  });

  useEffect(() => {
    window.scrollTo(0, 0);

    // Extract category from URL query params
    const params = new URLSearchParams(location.split('?')[1]);
    const category = params.get('category');
    
    if (category) {
      setActiveCategory(category.toLowerCase());
    }
  }, [location]);

  const filteredProducts = products ? products.filter(product => {
    // Handle special case for refurbished category
    if (activeCategory === "refurbished") {
      if (product.condition !== "Refurbished") {
        return false;
      }
    } else if (activeCategory !== "all" && product.category.toLowerCase() !== activeCategory) {
      return false;
    }
    
    if (searchTerm && !product.name.toLowerCase().includes(searchTerm.toLowerCase()) && 
        !product.description.toLowerCase().includes(searchTerm.toLowerCase())) {
      return false;
    }
    
    return true;
  }) : [];

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case "price-asc":
        return (a.discountPrice || a.price) - (b.discountPrice || b.price);
      case "price-desc":
        return (b.discountPrice || b.price) - (a.discountPrice || a.price);
      case "name-asc":
        return a.name.localeCompare(b.name);
      case "name-desc":
        return b.name.localeCompare(a.name);
      default:
        return 0;
    }
  });

  return (
    <>
      {/* Hero for Products Page */}
      <div className="bg-secondary py-16">
        <div className="container mx-auto px-4 text-center text-white">
          <h1 className="font-poppins font-bold text-4xl mb-4">Our Products</h1>
          <p className="max-w-2xl mx-auto">
            Explore our wide range of furniture and electronics designed to enhance your living space.
          </p>
        </div>
      </div>
      
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Filters Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="font-poppins font-semibold text-lg mb-4">Filters</h3>
                
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-2">Search</label>
                  <Input
                    type="text"
                    placeholder="Search products..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full"
                  />
                </div>
                
                <Separator className="my-4" />
                
                <div>
                  <label className="block text-sm font-medium mb-2">Category</label>
                  <div className="space-y-2">
                    <label className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="radio"
                        name="category"
                        checked={activeCategory === "all"}
                        onChange={() => setActiveCategory("all")}
                        className="text-primary"
                      />
                      <span>All Products</span>
                    </label>
                    <label className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="radio"
                        name="category"
                        checked={activeCategory === "furniture"}
                        onChange={() => setActiveCategory("furniture")}
                        className="text-primary"
                      />
                      <span>Furniture</span>
                    </label>
                    <label className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="radio"
                        name="category"
                        checked={activeCategory === "electronics"}
                        onChange={() => setActiveCategory("electronics")}
                        className="text-primary"
                      />
                      <span>Electronics</span>
                    </label>
                    <label className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="radio"
                        name="category"
                        checked={activeCategory === "refurbished"}
                        onChange={() => setActiveCategory("refurbished")}
                        className="text-primary"
                      />
                      <span>Refurbished</span>
                    </label>
                  </div>
                </div>
                
                <Separator className="my-4" />
                
                <div>
                  <label className="block text-sm font-medium mb-2">Sort By</label>
                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger>
                      <SelectValue placeholder="Default" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="default">Default</SelectItem>
                      <SelectItem value="price-asc">Price: Low to High</SelectItem>
                      <SelectItem value="price-desc">Price: High to Low</SelectItem>
                      <SelectItem value="name-asc">Name: A to Z</SelectItem>
                      <SelectItem value="name-desc">Name: Z to A</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
            
            {/* Product Grid */}
            <div className="lg:col-span-3">
              <div className="bg-white p-6 rounded-lg shadow-md mb-6">
                <div className="flex justify-between items-center">
                  <h2 className="font-poppins font-semibold text-xl">
                    {activeCategory === "all" 
                      ? "All Products" 
                      : activeCategory === "furniture" 
                        ? "Furniture" 
                        : activeCategory === "electronics"
                          ? "Electronics"
                          : "Refurbished Products"}
                  </h2>
                  <p className="text-gray-500">
                    {sortedProducts.length} {sortedProducts.length === 1 ? "product" : "products"} found
                  </p>
                </div>
              </div>
              
              {isLoading ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {Array.from({ length: 6 }).map((_, index) => (
                    <ProductCardSkeleton key={index} />
                  ))}
                </div>
              ) : sortedProducts.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {sortedProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 bg-white rounded-lg shadow-md">
                  <i className="fas fa-search text-gray-400 text-4xl mb-3"></i>
                  <h3 className="font-poppins font-semibold text-lg mb-2">No Products Found</h3>
                  <p className="text-gray-500">
                    Try adjusting your search or filter criteria
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Products;
