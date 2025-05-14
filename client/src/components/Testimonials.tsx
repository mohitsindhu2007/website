import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Testimonial } from "@shared/schema";
import { useEffect, useState } from "react";

const StarRating = ({ rating }: { rating: number }) => {
  const [animated, setAnimated] = useState(Array(5).fill(false));
  
  useEffect(() => {
    const timers: NodeJS.Timeout[] = [];
    for (let i = 0; i < 5; i++) {
      const timer = setTimeout(() => {
        setAnimated(prev => {
          const newState = [...prev];
          newState[i] = true;
          return newState;
        });
      }, i * 150);
      timers.push(timer);
    }
    
    return () => timers.forEach(timer => clearTimeout(timer));
  }, []);

  return (
    <div className="flex items-center mb-4">
      <div className="text-accent flex">
        {[...Array(5)].map((_, index) => (
          <i 
            key={index} 
            className={`
              fas ${index < rating ? 'fa-star' : index + 0.5 === rating ? 'fa-star-half-alt' : 'fa-star-o'}
              transition-all duration-300
              ${animated[index] ? 'scale-100 opacity-100' : 'scale-0 opacity-0'}
            `}
          ></i>
        ))}
      </div>
      <span className="ml-2 text-gray-500">{rating.toFixed(1)}</span>
    </div>
  );
};

const TestimonialSkeleton = () => (
  <Card className="bg-light p-6 rounded-lg shadow-md">
    <CardContent className="p-0">
      <div className="flex items-center mb-4">
        <Skeleton className="h-5 w-24" />
      </div>
      <Skeleton className="h-20 w-full mb-4" />
      <div className="flex items-center">
        <Skeleton className="w-10 h-10 rounded-full mr-3" />
        <div>
          <Skeleton className="h-4 w-32 mb-2" />
          <Skeleton className="h-3 w-16" />
        </div>
      </div>
    </CardContent>
  </Card>
);

const TestimonialCard = ({ testimonial, index }: { testimonial: Testimonial, index: number }) => {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, index * 200); // Staggered animation
    
    return () => clearTimeout(timer);
  }, [index]);

  // Generate a soft background color
  const bgColors = [
    "bg-primary/5 hover:bg-primary/10",
    "bg-secondary/5 hover:bg-secondary/10",
    "bg-accent/5 hover:bg-accent/10"
  ];
  
  const bgColor = bgColors[index % bgColors.length];

  return (
    <Card 
      className={`p-6 rounded-xl ${bgColor} border border-gray-100 hover-lift transition-all duration-500 overflow-hidden ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
      }`}
    >
      <CardContent className="p-0 relative">
        {/* Decorative quote mark */}
        <div className="absolute -top-6 -left-6 text-8xl text-primary/10 font-serif">❝</div>
        
        <StarRating rating={testimonial.rating} />
        
        <p className="text-gray-700 mb-6 relative z-10">{`"${testimonial.review}"`}</p>
        
        <div className="flex items-center">
          <div className="w-12 h-12 rounded-full overflow-hidden mr-4 bg-primary/20 flex items-center justify-center shadow-sm">
            <i className="fas fa-user text-primary/50 text-xl"></i>
          </div>
          <div>
            <h4 className="font-poppins font-semibold text-primary">{testimonial.name}</h4>
            <p className="text-gray-500 text-sm">{testimonial.location}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const Testimonials = () => {
  const { data: testimonials, isLoading } = useQuery<Testimonial[]>({
    queryKey: ["/api/testimonials"],
  });

  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-fade-in">
          <span className="inline-block px-4 py-1 bg-primary/10 text-primary rounded-full text-sm font-semibold mb-3">
            Testimonials
          </span>
          <h2 className="font-poppins font-bold text-4xl mb-3">What Our Customers Say</h2>
          <p className="text-gray-600 max-w-xl mx-auto">Our commitment to quality and service has earned us the trust of our valued customers</p>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute -left-20 top-1/4 w-40 h-40 bg-accent/5 rounded-full animate-float"></div>
        <div className="absolute right-0 bottom-1/4 w-64 h-64 bg-primary/5 rounded-full animate-float delay-300"></div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative z-10">
          {isLoading ? (
            <>
              <TestimonialSkeleton />
              <TestimonialSkeleton />
              <TestimonialSkeleton />
            </>
          ) : (
            testimonials?.map((testimonial, index) => (
              <TestimonialCard 
                key={testimonial.id} 
                testimonial={testimonial} 
                index={index} 
              />
            ))
          )}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
