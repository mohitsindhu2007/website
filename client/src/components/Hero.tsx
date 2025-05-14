import { Link } from "wouter";
import { Button } from "@/components/ui/button";

const Hero = () => {
  return (
    <section className="relative">
      <div 
        className="w-full h-[60vh] bg-cover bg-center relative" 
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=1080')" }}
      >
        <div className="absolute inset-0 bg-dark opacity-50"></div>
        <div className="container mx-auto px-4 h-full flex items-center relative z-10">
          <div className="max-w-2xl text-white">
            <h1 className="font-poppins font-bold text-4xl md:text-5xl mb-4 animate-fade-in">
              Mr Sindhu Furniture and Electronics
            </h1>
            <p className="text-xl md:text-2xl mb-2 animate-slide-up">Quality Meets Style</p>
            <p className="text-lg mb-8 animate-slide-up">Shop No. 82, New Anaaj Mandi, Kalanaur, Rohtak</p>
            <div className="flex flex-wrap gap-4">
              <Link href="/products">
                <Button 
                  className="bg-accent hover:bg-opacity-90 text-white font-medium py-3 px-6 rounded-lg transition-all shadow-lg transform hover:scale-105"
                >
                  View Products
                </Button>
              </Link>
              <Link href="/contact">
                <Button 
                  variant="outline"
                  className="bg-white hover:bg-opacity-90 text-dark font-medium py-3 px-6 rounded-lg transition-all shadow-lg transform hover:scale-105"
                >
                  Contact Us
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
