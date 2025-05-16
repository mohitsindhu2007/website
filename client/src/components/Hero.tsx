import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

const Hero = () => {
  // Animation states
  const [loaded, setLoaded] = useState(false);
  const [currentBg, setCurrentBg] = useState(0);
  
  const backgrounds = [
    "url('https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=1080')",
    "url('https://images.unsplash.com/photo-1631679706909-1844bbd07221?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=1080')",
    "url('https://images.unsplash.com/photo-1586105251261-72a756497a11?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=1080')"
  ];
  
  useEffect(() => {
    setLoaded(true);
    
    // Image carousel effect
    const bgInterval = setInterval(() => {
      setCurrentBg(prev => (prev + 1) % backgrounds.length);
    }, 5000);
    
    return () => clearInterval(bgInterval);
  }, []);

  return (
    <section className="relative overflow-hidden">
      <div 
        className="w-full h-[70vh] bg-cover bg-center relative transition-all duration-1000" 
        style={{ backgroundImage: backgrounds[currentBg] }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/40"></div>
        
        {/* Decorative animated elements */}
        <div className="absolute top-[10%] left-[5%] w-24 h-24 border-2 border-white/20 rounded-full animate-float"></div>
        <div className="absolute bottom-[15%] right-[8%] w-16 h-16 border-2 border-white/10 rounded-full animate-float-delayed"></div>
        <div className="absolute top-1/3 right-1/4 w-32 h-32 border border-accent/30 rounded-full animate-pulse"></div>
        
        {/* Animated shapes */}
        <div className="absolute top-[40%] left-[15%] w-12 h-12 bg-primary/20 rounded-full blur-md animate-ping-slow"></div>
        <div className="absolute bottom-[30%] left-[25%] w-8 h-8 bg-accent/20 rounded-md rotate-45 blur-sm animate-spin-slow"></div>
        <div className="absolute top-[20%] right-[20%] w-16 h-16 bg-secondary/20 rounded-full blur-md animate-bounce-slow"></div>
        
        <div className="container mx-auto px-4 h-full flex items-center relative z-10">
          <div className="max-w-2xl text-white">
            <h1 className={`font-poppins font-bold text-4xl md:text-6xl mb-6 ${loaded ? 'animate-fade-in' : 'opacity-0'}`}>
              <span className="block transform transition-all duration-700 hover:scale-105 hover:text-accent">Mr Sindhu</span>
              <span className="block bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent transition-all duration-700 hover:from-accent hover:to-primary">Furniture & Electronics</span>
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
                  className="bg-accent hover:bg-opacity-90 text-white font-medium py-3 px-8 rounded-lg transition-all duration-300 shadow-lg hover:shadow-accent/40 transform hover:scale-105 hover:-translate-y-1"
                >
                  View Products
                </Button>
              </Link>
              <Link href="/products?category=refurbished">
                <Button 
                  className="bg-blue-600 hover:bg-opacity-90 text-white font-medium py-3 px-8 rounded-lg transition-all duration-300 shadow-lg hover:shadow-blue-600/40 transform hover:scale-105 hover:-translate-y-1"
                >
                  Refurbished Deals
                </Button>
              </Link>
              <Link href="/contact">
                <Button 
                  variant="outline"
                  className="bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white border-white/30 font-medium py-3 px-8 rounded-lg transition-all duration-300 shadow-lg transform hover:scale-105 hover:-translate-y-1"
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
