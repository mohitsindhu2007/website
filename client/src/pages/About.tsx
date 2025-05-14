import { useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const About = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      {/* Hero for About Page */}
      <div className="bg-secondary py-16">
        <div className="container mx-auto px-4 text-center text-white">
          <h1 className="font-poppins font-bold text-4xl mb-4">About Us</h1>
          <p className="max-w-2xl mx-auto">
            Get to know our story and our mission
          </p>
        </div>
      </div>
      
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <img 
                src="https://images.unsplash.com/photo-1581783898377-1c85bf937427?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600" 
                alt="Mr Sindhu Furniture Showroom" 
                className="rounded-xl shadow-lg w-full"
              />
            </div>
            
            <div>
              <h3 className="font-poppins font-bold text-2xl mb-4">Our Story</h3>
              <p className="text-gray-700 mb-4">
                Founded in 2005 by Mr. Rajinder Sindhu, our store began as a small furniture shop with a vision 
                to provide quality furniture at reasonable prices. Over the years, we expanded our product range 
                to include electronics, becoming a one-stop destination for all home needs.
              </p>
              <p className="text-gray-700 mb-6">
                With over 15 years of experience in the industry, we pride ourselves on our exceptional customer 
                service, product knowledge, and commitment to quality. Our team of experts is always ready to help 
                you find the perfect furniture or electronic product for your home.
              </p>
              
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="flex items-center">
                  <div className="mr-3 text-primary text-2xl">
                    <i className="fas fa-certificate"></i>
                  </div>
                  <div>
                    <h4 className="font-poppins font-semibold">Quality Products</h4>
                    <p className="text-gray-600 text-sm">Carefully selected items</p>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <div className="mr-3 text-primary text-2xl">
                    <i className="fas fa-truck"></i>
                  </div>
                  <div>
                    <h4 className="font-poppins font-semibold">Free Delivery</h4>
                    <p className="text-gray-600 text-sm">Within city limits</p>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <div className="mr-3 text-primary text-2xl">
                    <i className="fas fa-tools"></i>
                  </div>
                  <div>
                    <h4 className="font-poppins font-semibold">Installation</h4>
                    <p className="text-gray-600 text-sm">Professional setup</p>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <div className="mr-3 text-primary text-2xl">
                    <i className="fas fa-headset"></i>
                  </div>
                  <div>
                    <h4 className="font-poppins font-semibold">After Sales</h4>
                    <p className="text-gray-600 text-sm">Dedicated support</p>
                  </div>
                </div>
              </div>
              
              <h3 className="font-poppins font-bold text-xl mb-3">Meet The Owner</h3>
              <div className="flex items-center">
                <div className="w-16 h-16 rounded-full overflow-hidden mr-4 bg-gray-300 flex items-center justify-center">
                  <i className="fas fa-user text-gray-500 text-2xl"></i>
                </div>
                <div>
                  <h4 className="font-poppins font-semibold">Mr. Rajinder Sindhu</h4>
                  <p className="text-gray-600">Founder & Owner</p>
                </div>
              </div>
            </div>
          </div>
          
          <Separator className="my-16" />
          
          <div className="max-w-4xl mx-auto">
            <h2 className="font-poppins font-bold text-3xl mb-8 text-center">Our Vision & Mission</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <Card>
                <CardContent className="p-6">
                  <div className="mb-4 text-primary text-4xl text-center">
                    <i className="fas fa-eye"></i>
                  </div>
                  <h3 className="font-poppins font-semibold text-xl mb-3 text-center">Our Vision</h3>
                  <p className="text-gray-700">
                    To be the preferred destination for home furniture and electronics, known for 
                    quality, innovation, and customer satisfaction across the region.
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <div className="mb-4 text-primary text-4xl text-center">
                    <i className="fas fa-bullseye"></i>
                  </div>
                  <h3 className="font-poppins font-semibold text-xl mb-3 text-center">Our Mission</h3>
                  <p className="text-gray-700">
                    To provide high-quality furniture and electronics at reasonable prices, 
                    with exceptional customer service and after-sales support.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
          
          <div className="mt-16 text-center">
            <h2 className="font-poppins font-bold text-3xl mb-8">Our Store</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <img 
                src="https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400" 
                alt="Store Interior" 
                className="rounded-lg shadow-md"
              />
              <img 
                src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400" 
                alt="Furniture Section" 
                className="rounded-lg shadow-md"
              />
              <img 
                src="https://images.unsplash.com/photo-1593305841991-05c297ba4575?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400" 
                alt="Electronics Section" 
                className="rounded-lg shadow-md"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default About;
