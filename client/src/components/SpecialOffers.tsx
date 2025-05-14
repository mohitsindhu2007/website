import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useQuery } from "@tanstack/react-query";

const SpecialOffers = () => {
  const { data: specialOffers } = useQuery({
    queryKey: ["/api/products"],
    select: (products) => products.filter((product: any) => product.discountPrice),
  });

  // Fallback if there are no special offers
  if (!specialOffers || specialOffers.length === 0) {
    return null;
  }

  // Get the first two special offers
  const offers = specialOffers.slice(0, 2);

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-poppins font-bold text-3xl mb-2">Special Offers</h2>
          <p className="text-gray-600">Limited time deals you don't want to miss</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {offers.map((offer: any) => (
            <div 
              key={offer.id}
              className="relative rounded-xl overflow-hidden shadow-lg h-72"
            >
              <img 
                src={offer.imageUrl} 
                alt={offer.name} 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent"></div>
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <Badge className="bg-accent px-3 py-1 rounded-full text-sm font-bold mb-2 inline-block">
                  SALE
                </Badge>
                <h3 className="font-poppins font-bold text-2xl mb-1">{offer.name}</h3>
                <p className="mb-2">{offer.description.substring(0, 50)}</p>
                <p className="font-bold text-xl mb-3">
                  ₹{offer.discountPrice.toLocaleString()} 
                  <span className="line-through text-sm text-gray-300 ml-2">
                    ₹{offer.price.toLocaleString()}
                  </span>
                </p>
                <Link href={`/product/${offer.id}`}>
                  <Button 
                    className="bg-white text-dark py-2 px-4 rounded font-medium hover:bg-gray-100 transition-colors"
                  >
                    Shop Now
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SpecialOffers;
