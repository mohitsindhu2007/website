import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

const WhatsAppButton = () => {
  const phoneNumber = "919992264440"; // Mr Sindhu's contact number

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <a 
            href="https://chat.whatsapp.com/Er8ZCz3vwJ1ATvvzMCOxUj" 
            target="_blank" 
            rel="noopener noreferrer"
            className="fixed bottom-6 right-6 z-50"
          >
            <Button
              className="h-14 w-14 rounded-full bg-green-500 hover:bg-green-600 flex items-center justify-center shadow-lg transition-colors"
            >
              <i className="fab fa-whatsapp text-2xl"></i>
            </Button>
          </a>
        </TooltipTrigger>
        <TooltipContent>
          <p>Chat with us on WhatsApp</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default WhatsAppButton;
