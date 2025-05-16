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
            <a className="flex items-center hover:opacity-90 transition-opacity cursor-pointer">
              <div className="relative h-14 w-14 mr-3">
                <img 
                  src="/assets/mr-sindhu-logo.png"
                  alt="Mr Sindhu Logo"
                  className="h-full w-full object-contain transform transition-all duration-300 hover:scale-110"
                />
                <div className="absolute inset-0 bg-blue-500 opacity-20 rounded-md animate-pulse"></div>
              </div>
              <span className="font-poppins font-bold text-xl md:text-2xl">
                Mr Sindhu
              </span>
            </a>
          </Link>
        </div>
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          {navigationItems.map((item) => (
            <Link key={item.name} href={item.path}>
              <a className={`font-poppins font-medium transition-colors ${location === item.path ? 'text-primary' : 'hover:text-primary'}`}>
                {item.name}
              </a>
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
                    <a 
                      className={`font-poppins font-medium py-2 transition-colors ${location === item.path ? 'text-primary' : 'hover:text-primary'}`}
                      onClick={() => setIsOpen(false)}
                    >
                      {item.name}
                    </a>
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
