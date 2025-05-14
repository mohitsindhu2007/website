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
    <Card className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow">
      <div className="relative">
        <img 
          src={imageUrl} 
          alt={name} 
          className="w-full h-56 object-cover"
        />
        {discountPrice && (
          <Badge 
            className="absolute top-2 right-2 bg-accent text-white font-bold" 
            variant="outline"
          >
            SALE
          </Badge>
        )}
      </div>
      <CardContent className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-poppins font-semibold text-lg">{name}</h3>
          <Badge className={category === "Furniture" ? "bg-primary" : "bg-secondary"}>
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
              className="bg-accent text-white hover:bg-opacity-90 transition-colors"
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
