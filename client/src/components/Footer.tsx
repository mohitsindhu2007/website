import { Link } from "wouter";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

const Footer = () => {
  const { toast } = useToast();
  const [email, setEmail] = useState("");

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      toast({
        title: "Subscribed!",
        description: "Thank you for subscribing to our newsletter.",
      });
      setEmail("");
    }
  };

  return (
    <footer className="bg-secondary text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <i className="fas fa-couch text-accent text-2xl"></i>
              <i className="fas fa-tv text-accent text-2xl"></i>
              <h3 className="font-poppins font-bold text-lg">Mr Sindhu</h3>
            </div>
            <p className="text-gray-300 mb-4">
              Your one-stop destination for quality furniture and electronics. 
              We bring comfort and technology to your home.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-300 hover:text-accent transition-colors">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="#" className="text-gray-300 hover:text-accent transition-colors">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="#" className="text-gray-300 hover:text-accent transition-colors">
                <i className="fab fa-youtube"></i>
              </a>
              <a href="#" className="text-gray-300 hover:text-accent transition-colors">
                <i className="fab fa-whatsapp"></i>
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="font-poppins font-bold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/">
                  <a className="text-gray-300 hover:text-accent transition-colors">Home</a>
                </Link>
              </li>
              <li>
                <Link href="/products">
                  <a className="text-gray-300 hover:text-accent transition-colors">Products</a>
                </Link>
              </li>
              <li>
                <Link href="/about">
                  <a className="text-gray-300 hover:text-accent transition-colors">About Us</a>
                </Link>
              </li>
              <li>
                <Link href="/contact">
                  <a className="text-gray-300 hover:text-accent transition-colors">Contact</a>
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-poppins font-bold text-lg mb-4">Product Categories</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/products?category=Furniture">
                  <a className="text-gray-300 hover:text-accent transition-colors">Furniture</a>
                </Link>
              </li>
              <li>
                <Link href="/products?category=Electronics">
                  <a className="text-gray-300 hover:text-accent transition-colors">Electronics</a>
                </Link>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-accent transition-colors">Living Room</a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-accent transition-colors">Bedroom</a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-accent transition-colors">Dining & Kitchen</a>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-poppins font-bold text-lg mb-4">Newsletter</h3>
            <p className="text-gray-300 mb-4">
              Subscribe to receive updates on new products and special offers.
            </p>
            <form className="mb-4" onSubmit={handleSubscribe}>
              <div className="flex">
                <Input
                  type="email"
                  placeholder="Your email address"
                  className="flex-grow px-4 py-2 rounded-l-lg focus:outline-none text-gray-800"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <Button 
                  type="submit"
                  className="bg-accent hover:bg-opacity-90 text-white px-4 py-2 rounded-r-lg"
                >
                  <i className="fas fa-paper-plane"></i>
                </Button>
              </div>
            </form>
            <div className="flex items-center">
              <i className="fas fa-headset text-accent text-2xl mr-3"></i>
              <div>
                <p className="text-sm">Customer Support</p>
                <p className="font-bold">+91 98765 43210</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-10 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm mb-4 md:mb-0">
            © {new Date().getFullYear()} Mr Sindhu Furniture and Electronics. All rights reserved.
          </p>
          <div className="flex space-x-4">
            <a href="#" className="text-gray-400 text-sm hover:text-accent transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-gray-400 text-sm hover:text-accent transition-colors">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
