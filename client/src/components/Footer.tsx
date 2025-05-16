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
            <div className="flex items-center mb-4">
              <img 
                src="/assets/mr-sindhu-logo.png" 
                alt="Mr Sindhu Furniture and Electronics" 
                className="h-12 w-auto mr-2"
              />
              <h3 className="font-poppins font-bold text-lg">Mr Sindhu</h3>
            </div>
            <p className="text-gray-300 mb-4">
              Your one-stop destination for quality furniture and electronics. 
              We bring comfort and technology to your home.
            </p>
            <div className="flex space-x-4">
              <a href="https://www.facebook.com/share/15beMEpHtB/" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-accent transition-colors">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="https://www.instagram.com/jombir_sindhu?igsh=MXBjems5d3Z4MXVieA==" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-accent transition-colors">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="https://youtube.com/@officialowner1?si=27NuGb6T2vGVGjsE" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-accent transition-colors">
                <i className="fab fa-youtube"></i>
              </a>
              <a href="https://chat.whatsapp.com/Er8ZCz3vwJ1ATvvzMCOxUj" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-accent transition-colors">
                <i className="fab fa-whatsapp"></i>
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="font-poppins font-bold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a href="/" className="text-gray-300 hover:text-accent transition-colors">Home</a>
              </li>
              <li>
                <a href="/products" className="text-gray-300 hover:text-accent transition-colors">Products</a>
              </li>
              <li>
                <a href="/about" className="text-gray-300 hover:text-accent transition-colors">About Us</a>
              </li>
              <li>
                <a href="/contact" className="text-gray-300 hover:text-accent transition-colors">Contact</a>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-poppins font-bold text-lg mb-4">Product Categories</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/products?category=Furniture">
                  <div className="text-gray-300 hover:text-accent transition-colors cursor-pointer">Furniture</div>
                </Link>
              </li>
              <li>
                <Link href="/products?category=Electronics">
                  <div className="text-gray-300 hover:text-accent transition-colors cursor-pointer">Electronics</div>
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
                <p className="font-bold">+91 9992264440</p>
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
