import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { 
  Sheet, 
  SheetContent, 
  SheetTrigger 
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import CartComponent from "@/components/CartComponent";

const Navbar = () => {
  const [location] = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const navigationItems = [
    { name: "Home", path: "/" },
    { name: "Products", path: "/products" },
    { name: "About Us", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header className={`sticky top-0 z-50 bg-white ${isScrolled ? 'shadow-md' : 'shadow-sm'} transition-shadow`}>
      <nav className="container mx-auto px-4 py-3 flex justify-between items-center">
        <div className="flex items-center">
          <Link href="/">
            <div className="flex items-center hover:opacity-90 transition-opacity cursor-pointer">
              <div className="relative flex flex-col items-center justify-center bg-gradient-to-r from-blue-700 to-blue-500 text-white h-14 w-14 rounded-md mr-3 shadow-lg border-2 border-blue-400 transform transition-all duration-300 hover:scale-110 animate-pulse">
                <div className="absolute inset-0 bg-blue-600 opacity-25 rounded-md animate-ping"></div>
                <span className="font-bold text-sm">MR</span>
                <span className="font-bold text-sm">SINDHU</span>
              </div>
              <span className="font-poppins font-bold text-xl md:text-2xl">
                Mr Sindhu
              </span>
            </div>
          </Link>
        </div>
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          {navigationItems.map((item) => (
            <Link key={item.name} href={item.path}>
              <div className={`font-poppins font-medium transition-colors cursor-pointer ${location === item.path ? 'text-primary' : 'hover:text-primary'}`}>
                {item.name}
              </div>
            </Link>
          ))}
          <div className="ml-2">
            <CartComponent />
          </div>
        </div>
        
        {/* Mobile Navigation */}
        <div className="md:hidden flex items-center space-x-2">
          <CartComponent />
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" className="p-2">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[250px] sm:w-[300px]">
              <div className="flex flex-col mt-8 space-y-4">
                {navigationItems.map((item) => (
                  <Link key={item.name} href={item.path}>
                    <div 
                      className={`font-poppins font-medium py-2 transition-colors cursor-pointer ${location === item.path ? 'text-primary' : 'hover:text-primary'}`}
                      onClick={() => setIsOpen(false)}
                    >
                      {item.name}
                    </div>
                  </Link>
                ))}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
