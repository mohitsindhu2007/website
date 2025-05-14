import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { insertContactMessageSchema } from "@shared/schema";
import { useToast } from "@/hooks/use-toast";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Loader2 } from "lucide-react";

// Extend the schema with validation
const formSchema = insertContactMessageSchema.extend({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  phone: z.string().min(10, { message: "Please enter a valid phone number" }),
  message: z.string().min(10, { message: "Message must be at least 10 characters" })
});

const ContactForm = () => {
  const { toast } = useToast();
  const [submitted, setSubmitted] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      message: ""
    }
  });

  const mutation = useMutation({
    mutationFn: async (values: z.infer<typeof formSchema>) => {
      const response = await apiRequest("POST", "/api/contact", values);
      return response.json();
    },
    onSuccess: (data) => {
      toast({
        title: "Message sent!",
        description: data.message || "We'll get back to you soon.",
        variant: "default",
      });
      setSubmitted(true);
      form.reset();
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive",
      });
    }
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    mutation.mutate(values);
  }

  return (
    <Card className="bg-white p-8 rounded-lg shadow-md">
      <CardContent className="p-0">
        <h3 className="font-poppins font-bold text-xl mb-6">Send Us a Message</h3>
        
        {submitted ? (
          <div className="text-center py-8">
            <div className="bg-green-50 text-green-800 p-4 rounded-lg mb-4">
              <i className="fas fa-check-circle text-2xl mb-2"></i>
              <h4 className="font-medium text-lg">Message Sent!</h4>
              <p>Thank you for contacting us. We'll get back to you shortly.</p>
            </div>
            <Button 
              onClick={() => setSubmitted(false)}
              className="mt-4"
            >
              Send Another Message
            </Button>
          </div>
        ) : (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-700">Full Name</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="Your name" 
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" 
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-700">Email Address</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="Your email" 
                        type="email"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" 
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-700">Phone Number</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="Your phone number" 
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" 
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-700">Message</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Your message" 
                        rows={4}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary resize-none" 
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <Button 
                type="submit" 
                className="w-full bg-primary hover:bg-opacity-90 text-white font-medium py-3 px-4 rounded-lg transition-colors"
                disabled={mutation.isPending}
              >
                {mutation.isPending ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Sending...
                  </>
                ) : (
                  "Send Message"
                )}
              </Button>
            </form>
          </Form>
        )}
      </CardContent>
    </Card>
  );
};

export default ContactForm;
