import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

const Hero = () => {
  // Animation states
  const [loaded, setLoaded] = useState(false);
  
  useEffect(() => {
    setLoaded(true);
  }, []);

  return (
    <section className="relative overflow-hidden">
      <div 
        className="w-full h-[70vh] bg-cover bg-center relative transition-transform duration-20000 transform scale-105 hover:scale-100" 
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=1080')" }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/40"></div>
        
        {/* Decorative elements */}
        <div className="absolute top-20 left-10 w-20 h-20 border-2 border-white/20 rounded-full animate-float"></div>
        <div className="absolute bottom-20 right-10 w-16 h-16 border-2 border-white/10 rounded-full animate-float delay-400"></div>
        <div className="absolute top-1/3 right-1/4 w-32 h-32 border border-accent/30 rounded-full animate-pulse"></div>
        
        <div className="container mx-auto px-4 h-full flex items-center relative z-10">
          <div className="max-w-2xl text-white">
            <h1 className={`font-poppins font-bold text-4xl md:text-6xl mb-6 ${loaded ? 'animate-fade-in' : 'opacity-0'}`}>
              <span className="block">Mr Sindhu</span>
              <span className="block text-gradient">Furniture & Electronics</span>
            </h1>
            
            <p className={`text-xl md:text-2xl mb-3 ${loaded ? 'animate-slide-up delay-200' : 'opacity-0'}`}>
              Quality Meets Style
            </p>
            
            <p className={`text-lg mb-10 ${loaded ? 'animate-slide-up delay-300' : 'opacity-0'}`}>
              Shop No. 82, New Anaaj Mandi, Kalanaur, Rohtak
            </p>
            
            <div className={`flex flex-wrap gap-4 ${loaded ? 'animate-slide-up delay-400' : 'opacity-0'}`}>
              <Link href="/products">
                <Button 
                  className="bg-accent hover:bg-opacity-90 text-white font-medium py-3 px-8 rounded-lg transition-all duration-300 shadow-lg hover:shadow-accent/40 transform hover:scale-105 hover:translate-y-[-3px]"
                >
                  View Products
                </Button>
              </Link>
              <Link href="/contact">
                <Button 
                  variant="outline"
                  className="bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white border-white/30 font-medium py-3 px-8 rounded-lg transition-all duration-300 shadow-lg transform hover:scale-105 hover:translate-y-[-3px]"
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
