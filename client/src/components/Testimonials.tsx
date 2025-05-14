import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Testimonial } from "@shared/schema";

const StarRating = ({ rating }: { rating: number }) => {
  return (
    <div className="flex items-center mb-4">
      <div className="text-accent">
        {[...Array(5)].map((_, index) => (
          <i 
            key={index} 
            className={`fas ${index < rating ? 'fa-star' : index + 0.5 === rating ? 'fa-star-half-alt' : 'fa-star-o'}`}
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

const Testimonials = () => {
  const { data: testimonials, isLoading } = useQuery<Testimonial[]>({
    queryKey: ["/api/testimonials"],
  });

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-poppins font-bold text-3xl mb-2">What Our Customers Say</h2>
          <p className="text-gray-600">Hear from our satisfied customers</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {isLoading ? (
            <>
              <TestimonialSkeleton />
              <TestimonialSkeleton />
              <TestimonialSkeleton />
            </>
          ) : (
            testimonials?.map((testimonial) => (
              <Card key={testimonial.id} className="bg-light p-6 rounded-lg shadow-md">
                <CardContent className="p-0">
                  <StarRating rating={testimonial.rating} />
                  <p className="text-gray-700 mb-4">{`"${testimonial.review}"`}</p>
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full overflow-hidden mr-3 bg-gray-300 flex items-center justify-center">
                      <i className="fas fa-user text-gray-500"></i>
                    </div>
                    <div>
                      <h4 className="font-poppins font-semibold">{testimonial.name}</h4>
                      <p className="text-gray-500 text-sm">{testimonial.location}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
