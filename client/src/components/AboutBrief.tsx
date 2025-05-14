import { Card, CardContent } from "@/components/ui/card";

const AboutBrief = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="font-poppins font-bold text-3xl mb-4">Welcome to Mr Sindhu Furniture and Electronics</h2>
          <p className="text-gray-600">
            Established by Mr. Jombir Sindhu, we are a premier destination for quality furniture and cutting-edge electronics 
            in Kalanaur, Rohtak. With a commitment to excellence and customer satisfaction, we offer a wide range of 
            products to make your home comfortable and smart.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card className="bg-light p-8 rounded-lg shadow-md">
            <CardContent className="p-0 flex flex-col items-center text-center">
              <i className="fas fa-couch text-5xl text-primary mb-4"></i>
              <h3 className="font-poppins font-semibold text-xl mb-3">Furniture Collection</h3>
              <p className="text-gray-600">
                Explore our vast collection of premium furniture pieces, from elegant living room sets to 
                comfortable bedroom solutions, all designed to enhance your living space.
              </p>
            </CardContent>
          </Card>
          
          <Card className="bg-light p-8 rounded-lg shadow-md">
            <CardContent className="p-0 flex flex-col items-center text-center">
              <i className="fas fa-tv text-5xl text-secondary mb-4"></i>
              <h3 className="font-poppins font-semibold text-xl mb-3">Electronics Range</h3>
              <p className="text-gray-600">
                Discover the latest in electronic innovations with our carefully curated collection 
                of TVs, home appliances, and smart devices from leading brands.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default AboutBrief;
