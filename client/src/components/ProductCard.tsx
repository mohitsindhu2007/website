import { Link } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Product } from "@shared/schema";

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const { id, name, description, price, category, imageUrl, discountPrice } = product;

  return (
    <Card className="bg-white rounded-lg overflow-hidden shadow-md hover-lift animate-fade-in">
      <div className="relative overflow-hidden group">
        <img 
          src={imageUrl} 
          alt={name} 
          className="w-full h-56 object-cover transition-transform duration-500 group-hover:scale-110"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = 'https://via.placeholder.com/150?text=Image+Not+Found';
            target.onerror = null;
          }}
        />
        {discountPrice && (
          <Badge 
            className="absolute top-2 right-2 bg-accent text-white font-bold animate-pulse" 
            variant="outline"
          >
            SALE
          </Badge>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </div>
      <CardContent className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-poppins font-semibold text-lg">{name}</h3>
          <Badge className={`${category === "Furniture" ? "bg-primary" : "bg-secondary"} animate-pop`}>
            {category}
          </Badge>
        </div>
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">{description}</p>
        <div className="flex justify-between items-center">
          {discountPrice ? (
            <div>
              <span className="font-bold text-lg">₹{discountPrice.toLocaleString()}</span>
              <span className="line-through text-sm text-gray-400 ml-2">₹{price.toLocaleString()}</span>
            </div>
          ) : (
            <span className="font-bold text-lg">₹{price.toLocaleString()}</span>
          )}
          <Link href={`/product/${id}`}>
            <Button 
              size="sm" 
              className="bg-accent text-white hover:bg-opacity-90 transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
            >
              View Details
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
