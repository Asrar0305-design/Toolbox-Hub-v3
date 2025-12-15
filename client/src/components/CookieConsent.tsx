import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

export function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookie-consent");
    if (!consent) {
      setIsVisible(true);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem("cookie-consent", "accepted");
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6 animate-in slide-in-from-bottom-full duration-500">
      <div className="container mx-auto max-w-4xl">
        <div className="bg-black text-white border-4 border-primary p-6 shadow-[8px_8px_0px_0px_rgba(255,79,0,1)] flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2">
            <h3 className="text-xl font-black uppercase tracking-tight text-primary">
              We use cookies
            </h3>
            <p className="text-sm text-gray-300 max-w-xl">
              We use cookies to enhance your browsing experience, serve personalized ads or content, and analyze our traffic. 
              By clicking "Accept All", you consent to our use of cookies.
            </p>
          </div>
          
          <div className="flex gap-4 w-full md:w-auto">
            <Button 
              onClick={acceptCookies}
              className="flex-1 md:flex-none bg-primary hover:bg-white hover:text-black text-white font-bold uppercase tracking-wider rounded-none border-2 border-transparent hover:border-primary transition-all h-12 px-8"
            >
              Accept All
            </Button>
            <Button 
              onClick={() => setIsVisible(false)}
              variant="outline"
              className="flex-1 md:flex-none bg-transparent text-white border-2 border-white hover:bg-white hover:text-black font-bold uppercase tracking-wider rounded-none h-12 px-8"
            >
              Decline
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
