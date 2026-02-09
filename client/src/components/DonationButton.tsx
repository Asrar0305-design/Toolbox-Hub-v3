import { useEffect } from 'react';
import { Coffee } from 'lucide-react';

export function DonationButton() {
  useEffect(() => {
    // Load the Buy Me a Coffee button script
    const script = document.createElement('script');
    script.src = 'https://cdnjs.buymeacoffee.com/1.0.0/button.prod.min.js';
    script.setAttribute('data-name', 'bmc-button');
    script.setAttribute('data-slug', 'ToolBoxHub');
    script.setAttribute('data-color', '#ff8e24');
    script.setAttribute('data-emoji', '☕');
    script.setAttribute('data-font', 'Cookie');
    script.setAttribute('data-text', 'Buy me a coffee');
    script.setAttribute('data-outline-color', '#000000');
    script.setAttribute('data-font-color', '#000000');
    script.setAttribute('data-coffee-color', '#FFDD00');
    script.async = true;
    
    document.body.appendChild(script);

    return () => {
      // Cleanup
      const existingScript = document.querySelector('script[data-name="bmc-button"]');
      if (existingScript) {
        existingScript.remove();
      }
    };
  }, []);

  return null;
}

export function DonationButtonInline() {
  return (
    <a 
      href="https://www.buymeacoffee.com/ToolBoxHub" 
      target="_blank" 
      rel="noopener noreferrer"
      className="w-full sm:w-auto h-16 px-8 text-lg inline-flex items-center justify-center gap-2 bg-gradient-to-r from-orange-400 to-orange-500 hover:from-orange-500 hover:to-orange-600 text-white font-bold uppercase tracking-wider rounded-none border-2 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-[4px] hover:translate-y-[4px] transition-all"
    >
      <Coffee className="w-5 h-5" />
      Buy me a coffee
    </a>
  );
}
