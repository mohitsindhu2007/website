import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { Product } from "@shared/schema";

interface OfferCardProps {
  offer: Product;
  index: number;
}

const OfferCard = ({ offer, index }: OfferCardProps) => {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, index * 200); // Staggered animation
    
    return () => clearTimeout(timer);
  }, [index]);

  const getDiscountPercentage = () => {
    if (!offer.price || !offer.discountPrice) return null;
    const discount = Math.round(((offer.price - offer.discountPrice) / offer.price) * 100);
    return discount;
  };

  const discountPercentage = getDiscountPercentage();

  return (
    <div 
      className={`relative rounded-xl overflow-hidden shadow-xl h-80 transform transition-all duration-700 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
    >
      <div className="absolute top-0 right-0 z-10 p-4">
        {discountPercentage && (
          <div className="bg-accent text-white font-bold rounded-full h-16 w-16 flex items-center justify-center animate-pulse shadow-lg">
            <div className="text-center">
              <span className="text-xl">{discountPercentage}%</span>
              <span className="block text-xs">OFF</span>
            </div>
          </div>
        )}
      </div>
      
      <div className="absolute inset-0 overflow-hidden group">
        <img 
          src={offer.imageUrl} 
          alt={offer.name} 
          className="w-full h-full object-cover transition-transform duration-5000 group-hover:scale-110"
        />
      </div>
      
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent opacity-90"></div>
      
      <div className="absolute inset-x-0 bottom-0 p-6 text-white z-10">
        <Badge className="bg-accent px-3 py-1 rounded-full text-sm font-bold mb-3 inline-block animate-bounce-in shadow-md">
          LIMITED OFFER
        </Badge>
        
        <h3 className="font-poppins font-bold text-2xl mb-2 animate-slide-in-left">{offer.name}</h3>
        
        <p className="mb-2 text-gray-200 animate-slide-in-left delay-100">
          {offer.description.substring(0, 60)}...
        </p>
        
        <div className="flex items-center mb-4 animate-slide-in-left delay-200">
          <p className="font-bold text-2xl text-accent">
            ₹{offer.discountPrice?.toLocaleString()} 
          </p>
          <span className="line-through text-sm text-gray-400 ml-3">
            ₹{offer.price.toLocaleString()}
          </span>
        </div>
        
        <Link href={`/product/${offer.id}`}>
          <Button 
            className="bg-white text-dark py-2 px-6 rounded-full font-medium hover:bg-accent hover:text-white transition-all duration-300 transform hover:scale-105 shadow-lg animate-slide-in-left delay-300"
          >
            Shop Now
          </Button>
        </Link>
      </div>
      
      {/* Decorative elements */}
      <div className="absolute top-5 left-5 h-12 w-12 border-t-2 border-l-2 border-white/20"></div>
      <div className="absolute bottom-5 right-5 h-12 w-12 border-b-2 border-r-2 border-white/20"></div>
    </div>
  );
};

const SpecialOffers = () => {
  const { data: specialOffers } = useQuery<Product[]>({
    queryKey: ["/api/products"],
    select: (products: Product[] | undefined) => products?.filter((product) => product.discountPrice) || [],
  });

  // Fallback if there are no special offers
  if (!specialOffers || specialOffers.length === 0) {
    return null;
  }

  // Get the first two special offers
  const offers = specialOffers.slice(0, 2);

  return (
    <section className="py-20 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-fade-in">
          <span className="inline-block px-4 py-1 bg-accent/10 text-accent rounded-full text-sm font-semibold mb-3">
            Limited Time
          </span>
          <h2 className="font-poppins font-bold text-4xl mb-3">Special Offers</h2>
          <p className="text-gray-600 max-w-xl mx-auto">Exclusive deals and discounts on our premium furniture and electronics collection that you don't want to miss</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {offers.map((offer, index) => (
            <OfferCard key={offer.id} offer={offer} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default SpecialOffers;
