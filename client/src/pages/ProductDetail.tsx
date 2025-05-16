import { useState, useEffect } from "react";
import { useParams, Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import ProductCard from "@/components/ProductCard";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";
import { Product, ProductReview } from "@shared/schema";
import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';
import ProductReviewForm from "@/components/ProductReviewForm";

const ProductDetail = () => {
  const { id } = useParams();
  const { toast } = useToast();
  const productId = parseInt(id || '0');
  const [selectedImage, setSelectedImage] = useState<string>('');
  const [cartItems, setCartItems] = useState<Product[]>([]);

  const { data: product, isLoading: isProductLoading } = useQuery<Product>({
    queryKey: [`/api/products/${productId}`],
    enabled: !isNaN(productId),
  });

  const { data: relatedProducts, isLoading: isRelatedLoading } = useQuery<Product[]>({
    queryKey: ["/api/products"],
    enabled: !!product,
    select: (data) => 
      data.filter(p => 
        p.category === product?.category && 
        p.id !== product?.id
      ).slice(0, 4),
  });

  // Set up the selected image when product data loads
  useEffect(() => {
    if (product && product.imageUrl) {
      setSelectedImage(product.imageUrl);
    }
  }, [product]);

  // Load cart from localStorage
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      try {
        const parsedCart = JSON.parse(savedCart);
        setCartItems(parsedCart);
      } catch (error) {
        console.error('Failed to parse cart data:', error);
      }
    }
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (isNaN(productId)) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold mb-4">Invalid Product ID</h1>
        <p className="mb-6">The product ID provided is not valid.</p>
        <Link href="/products">
          <Button>Back to Products</Button>
        </Link>
      </div>
    );
  }

  const handleAddToCart = () => {
    if (!product) return;

    // Check if product is already in cart
    const isInCart = cartItems.some(item => item.id === product.id);
    let updatedCart;

    if (isInCart) {
      // Update quantity logic could be added here
      toast({
        title: "Already in cart",
        description: `${product.name} is already in your cart.`,
        variant: "default",
      });
      return;
    } else {
      // Add to cart
      updatedCart = [...cartItems, product];
      setCartItems(updatedCart);

      // Save to localStorage
      localStorage.setItem('cart', JSON.stringify(updatedCart));

      toast({
        title: "Added to cart!",
        description: `${product.name} has been added to your cart.`,
        variant: "default",
      });
    }
  };

  const handleContactUs = () => {
    // Navigate to contact page
    window.location.href = "/contact";
  };

  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        {isProductLoading ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <Skeleton className="w-full h-[500px] rounded-lg" />
            <div className="space-y-6">
              <Skeleton className="h-10 w-3/4" />
              <Skeleton className="h-6 w-1/4" />
              <Skeleton className="h-6 w-1/3" />
              <Skeleton className="h-32 w-full" />
              <div className="space-y-2">
                <Skeleton className="h-12 w-full" />
                <Skeleton className="h-12 w-full" />
              </div>
            </div>
          </div>
        ) : product ? (
          <>
            <div className="mb-4">
              <nav className="flex" aria-label="Breadcrumb">
                <ol className="inline-flex items-center space-x-1 md:space-x-3">
                  <li className="inline-flex items-center">
                    <Link href="/">
                      <a className="text-gray-600 hover:text-primary">Home</a>
                    </Link>
                  </li>
                  <li>
                    <div className="flex items-center">
                      <span className="mx-2 text-gray-400">/</span>
                      <Link href="/products">
                        <a className="text-gray-600 hover:text-primary">Products</a>
                      </Link>
                    </div>
                  </li>
                  <li>
                    <div className="flex items-center">
                      <span className="mx-2 text-gray-400">/</span>
                      <span className="text-gray-500">{product.name}</span>
                    </div>
                  </li>
                </ol>
              </nav>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div>
                <div className="bg-white rounded-lg overflow-hidden shadow-md">
                  {/* Main large image with zoom functionality */}
                  <div className="relative bg-gray-100 h-[400px] flex items-center justify-center overflow-hidden">
                    {(selectedImage || product.imageUrl).toLowerCase().endsWith('.mp4') ? (
                      <video 
                        src={selectedImage || product.imageUrl}
                        alt={product.name}
                        className="max-w-full max-h-[400px] object-contain"
                        controls
                        autoPlay
                        loop
                        muted
                      />
                    ) : (
                      <Zoom zoomMargin={40}>
                        <img
                          src={selectedImage || product.imageUrl}
                          alt={product.name}
                          className="max-w-full max-h-[400px] object-contain"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.src = 'https://via.placeholder.com/150?text=Image+Not+Found';
                            target.onerror = null;
                          }}
                        />
                      </Zoom>
                    )}
                  </div>

                  {/* Thumbnails for all images (main + additional) */}
                  <div className="mt-4 grid grid-cols-5 gap-2">
                    {/* Main image thumbnail */}
                    <div 
                      className={`border-2 rounded-md overflow-hidden cursor-pointer transition-all ${selectedImage === product.imageUrl ? 'border-primary' : 'border-gray-200 hover:border-gray-300'}`}
                      onClick={() => setSelectedImage(product.imageUrl)}
                    >
                      <img 
                        src={product.imageUrl} 
                        alt={`${product.name} main view`}
                        className="w-full h-16 object-cover" 
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = 'https://via.placeholder.com/150?text=Image+Not+Found';
                          target.onerror = null;
                        }}
                      />
                    </div>

                    {/* Additional images/videos thumbnails */}
                    {product.additionalImages && product.additionalImages.length > 0 && 
                      product.additionalImages.map((media, idx) => (
                        <div 
                          key={idx} 
                          className={`border-2 rounded-md overflow-hidden cursor-pointer transition-all ${selectedImage === media ? 'border-primary' : 'border-gray-200 hover:border-gray-300'}`}
                          onClick={() => setSelectedImage(media)}
                        >
                          {media.toLowerCase().endsWith('.mp4') ? (
                            <video 
                              src={media}
                              className="w-full h-16 object-cover"
                              muted
                            />
                          ) : (
                            <img 
                              src={media} 
                              alt={`${product.name} view ${idx+1}`}
                              className="w-full h-16 object-cover" 
                              onError={(e) => {
                                const target = e.target as HTMLImageElement;
                                target.src = 'https://via.placeholder.com/150?text=Image+Not+Found';
                                target.onerror = null;
                              }}
                            />
                          )}
                        </div>
                      ))
                    }
                  </div>
                </div>
              </div>

              <div>
                <div className="bg-white p-8 rounded-lg shadow-md">
                  <h1 className="font-poppins font-bold text-3xl mb-2">{product.name}</h1>

                  <Badge 
                    className={product.category === "Furniture" ? "bg-primary" : "bg-secondary"}
                  >
                    {product.category}
                  </Badge>

                  <div className="mt-6">
                    {product.discountPrice ? (
                      <div className="flex items-center">
                        <span className="font-bold text-3xl">₹{product.discountPrice.toLocaleString()}</span>
                        <span className="line-through text-lg text-gray-500 ml-3">
                          ₹{product.price.toLocaleString()}
                        </span>
                        <Badge className="ml-3 bg-accent text-white">
                          {Math.round((1 - product.discountPrice / product.price) * 100)}% OFF
                        </Badge>
                      </div>
                    ) : (
                      <span className="font-bold text-3xl">₹{product.price.toLocaleString()}</span>
                    )}
                  </div>

                  <Separator className="my-6" />

                  <div className="mb-6">
                    <h3 className="font-poppins font-semibold text-lg mb-2">Description</h3>
                    <p className="text-gray-700">{product.description}</p>
                  </div>

                  <div className="mt-8 space-y-3">
                    <Button 
                      onClick={handleAddToCart}
                      className="w-full bg-primary hover:bg-opacity-90 text-white font-medium py-3"
                      size="lg"
                    >
                      <i className="fas fa-shopping-cart mr-2"></i>
                      Add to Cart
                    </Button>

                    <Button 
                      onClick={handleContactUs}
                      variant="outline" 
                      className="w-full border-primary text-primary hover:bg-primary hover:text-white font-medium py-3"
                      size="lg"
                    >
                      <i className="fas fa-envelope mr-2"></i>
                      Inquire About This Product
                    </Button>
                  </div>

                  <div className="mt-8">
                    <div className="flex items-center space-x-6">
                      <div className="flex items-center">
                        <i className="fas fa-truck text-primary mr-2"></i>
                        <span className="text-sm">Delivery charges extra</span>
                      </div>

                      <div className="flex items-center">
                        <i className="fas fa-undo text-primary mr-2"></i>
                        <span className="text-sm">2-Day Returns</span>
                      </div>

                      <div className="flex items-center">
                        <i className="fas fa-shield-alt text-primary mr-2"></i>
                        <span className="text-sm">Warranty</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-16">
              <h2 className="font-poppins font-bold text-2xl mb-8">Related Products</h2>

              {isRelatedLoading ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {Array.from({ length: 4 }).map((_, index) => (
                    <Skeleton key={index} className="w-full h-80 rounded-lg" />
                  ))}
                </div>
              ) : relatedProducts && relatedProducts.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {relatedProducts.map((relatedProduct) => (
                    <ProductCard key={relatedProduct.id} product={relatedProduct} />
                  ))}
                </div>
              ) : (
                <Card>
                  <CardContent className="p-8 text-center">
                    <p className="text-gray-600">No related products found.</p>
                  </CardContent>
                </Card>
              )}
            {/* Product Reviews Section */}
              <div className="mt-16">
                <h2 className="font-poppins font-bold text-2xl mb-8">Customer Reviews</h2>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div className="bg-white p-8 rounded-lg shadow-md">
                    <h3 className="font-semibold text-xl mb-6">Write a Review</h3>
                    <ProductReviewForm productId={product.id} />
                  </div>

                  <div className="bg-white p-8 rounded-lg shadow-md">
                    <h3 className="font-semibold text-xl mb-6">Recent Reviews</h3>
                    {product.reviews && product.reviews.length > 0 ? (
                      <div className="space-y-4">
                        {product.reviews.map((review) => (
                          <div key={review.id} className="border-b pb-4">
                            <div className="flex justify-between items-center mb-2">
                              <span className="font-medium">{review.name}</span>
                              <span className="text-sm text-gray-500">
                                {new Date(review.createdAt).toLocaleDateString()}
                              </span>
                            </div>
                            <div className="flex items-center mb-2">
                              {Array.from({ length: review.rating }).map((_, i) => (
                                <i key={i} className="fas fa-star text-yellow-400"></i>
                              ))}
                            </div>
                            <p className="text-gray-600">{review.review}</p>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-gray-500">No reviews yet. Be the first to review this product!</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="text-center py-16">
            <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
            <p className="mb-6">The product you are looking for does not exist or has been removed.</p>
            <Link href="/products">
              <Button>Browse Our Products</Button>
            </Link>
          </div>
        )}
      </div>
    </section>
  );
};

export default ProductDetail;