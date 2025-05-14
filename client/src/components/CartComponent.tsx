import { useState, useEffect } from "react";
import { Link } from "wouter";
import { 
  Popover, 
  PopoverContent, 
  PopoverTrigger 
} from "@/components/ui/popover";
import { 
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogHeader,
  DialogFooter
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart, X } from "lucide-react";
import { Product } from "@shared/schema";
import { useToast } from "@/hooks/use-toast";

const CartComponent = () => {
  const [cartItems, setCartItems] = useState<Product[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [showCart, setShowCart] = useState(false);
  const { toast } = useToast();

  // Load cart from localStorage
  useEffect(() => {
    const loadCart = () => {
      const savedCart = localStorage.getItem('cart');
      if (savedCart) {
        try {
          const parsedCart = JSON.parse(savedCart);
          setCartItems(parsedCart);
        } catch (error) {
          console.error('Failed to parse cart data:', error);
        }
      }
    };

    // Initial load
    loadCart();

    // Set up event listener to update cart when it changes from other components
    window.addEventListener('storage', loadCart);
    
    // Custom event listener for cart updates
    const handleCartUpdate = () => loadCart();
    window.addEventListener('cartUpdated', handleCartUpdate);

    return () => {
      window.removeEventListener('storage', loadCart);
      window.removeEventListener('cartUpdated', handleCartUpdate);
    };
  }, []);

  const removeFromCart = (productId: number) => {
    const updatedCart = cartItems.filter(item => item.id !== productId);
    setCartItems(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    
    // Trigger custom event to notify other components
    window.dispatchEvent(new Event('cartUpdated'));
    
    toast({
      title: "Removed from cart",
      description: "Product has been removed from your cart.",
      variant: "default",
    });
  };

  const clearCart = () => {
    setCartItems([]);
    localStorage.setItem('cart', JSON.stringify([]));
    
    // Trigger custom event to notify other components
    window.dispatchEvent(new Event('cartUpdated'));
    
    setShowCart(false);
    
    toast({
      title: "Cart cleared",
      description: "All items have been removed from your cart.",
      variant: "default",
    });
  };

  const totalItems = cartItems.length;
  const totalPrice = cartItems.reduce((total, item) => {
    return total + (item.discountPrice || item.price);
  }, 0);

  return (
    <>
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <Button 
            variant="outline" 
            size="icon" 
            className="relative"
            onClick={() => setIsOpen(true)}
          >
            <ShoppingCart className="h-[1.2rem] w-[1.2rem]" />
            {totalItems > 0 && (
              <Badge 
                className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 bg-primary text-white text-xs rounded-full"
              >
                {totalItems}
              </Badge>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-80 p-0" align="end">
          <div className="p-4 border-b">
            <div className="flex items-center justify-between">
              <h3 className="font-medium">Shopping Cart</h3>
              <span className="text-sm text-gray-500">{totalItems} items</span>
            </div>
          </div>
          
          <div className="max-h-[300px] overflow-auto">
            {cartItems.length === 0 ? (
              <div className="p-4 text-center text-gray-500">
                <div className="py-4">Your cart is empty</div>
              </div>
            ) : (
              <div>
                {cartItems.map((item) => (
                  <div key={item.id} className="flex p-3 border-b hover:bg-gray-50">
                    <div className="h-16 w-16 mr-3 rounded overflow-hidden border flex-shrink-0">
                      <img 
                        src={item.imageUrl} 
                        alt={item.name} 
                        className="h-full w-full object-cover"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = 'https://via.placeholder.com/150?text=No+Image';
                          target.onerror = null;
                        }}
                      />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-sm font-medium truncate">{item.name}</h4>
                      <div className="text-sm text-gray-500 mt-1">
                        {item.discountPrice ? (
                          <div className="flex space-x-1">
                            <span>₹{item.discountPrice.toLocaleString()}</span>
                            <span className="line-through text-xs mt-0.5">₹{item.price.toLocaleString()}</span>
                          </div>
                        ) : (
                          <span>₹{item.price.toLocaleString()}</span>
                        )}
                      </div>
                    </div>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-8 w-8"
                      onClick={() => removeFromCart(item.id)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </div>
          
          <div className="p-4 border-t">
            <div className="flex justify-between mb-3">
              <span className="font-medium">Total:</span>
              <span className="font-bold">₹{totalPrice.toLocaleString()}</span>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => {
                  setIsOpen(false);
                  setShowCart(true);
                }}
                disabled={cartItems.length === 0}
              >
                View Cart
              </Button>
              <Button 
                variant="default" 
                size="sm"
                className="bg-primary hover:bg-primary/90"
                disabled={cartItems.length === 0}
              >
                Checkout
              </Button>
            </div>
          </div>
        </PopoverContent>
      </Popover>

      {/* Full cart dialog */}
      <Dialog open={showCart} onOpenChange={setShowCart}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Your Shopping Cart</DialogTitle>
            <DialogDescription>
              You have {totalItems} item{totalItems !== 1 ? 's' : ''} in your cart.
            </DialogDescription>
          </DialogHeader>

          {cartItems.length === 0 ? (
            <div className="text-center py-8">
              <p className="mb-4">Your cart is empty</p>
              <Link href="/products">
                <Button 
                  variant="outline" 
                  onClick={() => setShowCart(false)}
                >
                  Browse Products
                </Button>
              </Link>
            </div>
          ) : (
            <>
              <div className="border rounded-md">
                <div className="grid grid-cols-12 p-3 bg-gray-50 border-b font-medium">
                  <div className="col-span-6">Product</div>
                  <div className="col-span-2 text-center">Price</div>
                  <div className="col-span-2 text-center">Discount</div>
                  <div className="col-span-2 text-right">Subtotal</div>
                </div>
                <div className="divide-y max-h-[400px] overflow-auto">
                  {cartItems.map((item) => (
                    <div key={item.id} className="grid grid-cols-12 p-3 items-center">
                      <div className="col-span-6 flex items-center">
                        <div className="h-16 w-16 mr-3 rounded overflow-hidden border flex-shrink-0">
                          <img 
                            src={item.imageUrl} 
                            alt={item.name} 
                            className="h-full w-full object-cover"
                            onError={(e) => {
                              const target = e.target as HTMLImageElement;
                              target.src = 'https://via.placeholder.com/150?text=No+Image';
                              target.onerror = null;
                            }}
                          />
                        </div>
                        <div>
                          <h4 className="font-medium">{item.name}</h4>
                          <p className="text-sm text-gray-500">{item.category}</p>
                        </div>
                      </div>
                      <div className="col-span-2 text-center">₹{item.price.toLocaleString()}</div>
                      <div className="col-span-2 text-center">
                        {item.discountPrice ? (
                          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                            {Math.round((1 - item.discountPrice / item.price) * 100)}% OFF
                          </Badge>
                        ) : (
                          <span className="text-gray-400">-</span>
                        )}
                      </div>
                      <div className="col-span-2 text-right font-medium">
                        ₹{(item.discountPrice || item.price).toLocaleString()}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex justify-between items-center mt-4">
                <Button 
                  variant="outline" 
                  className="text-red-600"
                  onClick={clearCart}
                >
                  Clear Cart
                </Button>
                <div className="text-right">
                  <div className="text-sm text-gray-500 mb-1">Total ({totalItems} item{totalItems !== 1 ? 's' : ''})</div>
                  <div className="text-2xl font-bold">₹{totalPrice.toLocaleString()}</div>
                </div>
              </div>

              <DialogFooter className="mt-4">
                <Button 
                  variant="outline" 
                  onClick={() => setShowCart(false)}
                >
                  Continue Shopping
                </Button>
                <Button 
                  className="bg-primary hover:bg-primary/90"
                >
                  Proceed to Checkout
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default CartComponent;