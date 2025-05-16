import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import Hero from "@/components/Hero";
import AboutBrief from "@/components/AboutBrief";
import ProductCard from "@/components/ProductCard";
import SpecialOffers from "@/components/SpecialOffers";
import Testimonials from "@/components/Testimonials";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Link } from "wouter";
import { Product } from "@shared/schema";
import { Skeleton } from "@/components/ui/skeleton";

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

const Home = () => {
  const { data: products, isLoading } = useQuery<Product[]>({
    queryKey: ["/api/products"],
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Hero />
      <AboutBrief />

      {/* Featured Products */}
      <section id="products" className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-poppins font-bold text-3xl mb-2">Featured Products</h2>
            <p className="text-gray-600">Explore our best-selling furniture and electronics</p>
          </div>
          
          <Tabs defaultValue="all" className="w-full">
            <div className="flex justify-center mb-10">
              <TabsList className="inline-flex rounded-md shadow-sm">
                <TabsTrigger 
                  value="all" 
                  className="px-6 py-2 text-sm font-medium rounded-l-lg"
                >
                  All
                </TabsTrigger>
                <TabsTrigger 
                  value="furniture" 
                  className="px-6 py-2 text-sm font-medium"
                >
                  Furniture
                </TabsTrigger>
                <TabsTrigger 
                  value="electronics" 
                  className="px-6 py-2 text-sm font-medium"
                >
                  Electronics
                </TabsTrigger>
                <TabsTrigger 
                  value="refurbished" 
                  className="px-6 py-2 text-sm font-medium rounded-r-lg"
                >
                  Refurbished
                </TabsTrigger>
              </TabsList>
            </div>
            
            <TabsContent value="all">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {isLoading ? (
                  Array.from({ length: 8 }).map((_, index) => (
                    <ProductCardSkeleton key={index} />
                  ))
                ) : (
                  products?.slice(0, 8).map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))
                )}
              </div>
            </TabsContent>
            
            <TabsContent value="furniture">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {isLoading ? (
                  Array.from({ length: 4 }).map((_, index) => (
                    <ProductCardSkeleton key={index} />
                  ))
                ) : (
                  products?.filter(p => p.category === "Furniture").slice(0, 8).map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))
                )}
              </div>
            </TabsContent>
            
            <TabsContent value="electronics">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {isLoading ? (
                  Array.from({ length: 4 }).map((_, index) => (
                    <ProductCardSkeleton key={index} />
                  ))
                ) : (
                  products?.filter(p => p.category === "Electronics").slice(0, 8).map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))
                )}
              </div>
            </TabsContent>
            
            <TabsContent value="refurbished">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {isLoading ? (
                  Array.from({ length: 4 }).map((_, index) => (
                    <ProductCardSkeleton key={index} />
                  ))
                ) : (
                  products?.filter(p => p.condition === "Refurbished").slice(0, 8).map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))
                )}
              </div>
            </TabsContent>
          </Tabs>
          
          <div className="text-center mt-10">
            <Link href="/products">
              <Button variant="link" className="inline-flex items-center font-medium text-primary hover:underline">
                View All Products
                <svg className="ml-2 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"></path>
                </svg>
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Refurbished Products Highlight Section */}
      <section className="py-16 bg-gradient-to-r from-blue-50 to-blue-100">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 animate-fade-in">
            <h2 className="font-poppins font-bold text-3xl mb-3">Refurbished Products</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Quality refurbished products at affordable prices. All items are professionally restored and come with warranty.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {isLoading ? (
              Array.from({ length: 3 }).map((_, index) => (
                <ProductCardSkeleton key={index} />
              ))
            ) : (
              products?.filter(p => p.condition === "Refurbished").slice(0, 3).map((product, index) => (
                <div key={product.id} className="transform transition-all duration-500 hover:-translate-y-2 hover:shadow-xl" style={{animationDelay: `${index * 150}ms`}}>
                  <ProductCard product={product} />
                </div>
              ))
            )}
          </div>
          
          <div className="text-center mt-10">
            <Link href="/products?category=refurbished">
              <Button 
                className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-8 rounded-lg transition-all duration-300 shadow-lg transform hover:scale-105"
              >
                View All Refurbished Products
                <svg className="ml-2 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"></path>
                </svg>
              </Button>
            </Link>
          </div>
        </div>
      </section>
      
      <SpecialOffers />
      <Testimonials />

      {/* Contact Us Brief Section */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-poppins font-bold text-3xl mb-4">Need Help Choosing the Right Product?</h2>
          <p className="text-gray-600 max-w-2xl mx-auto mb-8">
            Our team of experts is ready to help you find the perfect furniture or electronic product for your home.
            Get in touch with us today!
          </p>
          <Link href="/contact">
            <Button className="bg-primary hover:bg-opacity-90 text-white font-medium py-3 px-6">
              Contact Us Now
            </Button>
          </Link>
        </div>
      </section>
    </>
  );
};

export default Home;
