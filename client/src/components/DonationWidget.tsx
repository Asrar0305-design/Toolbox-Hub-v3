import { useEffect } from 'react';

export function DonationWidget() {
  useEffect(() => {
    // Load the Buy Me a Coffee widget script
    const script = document.createElement('script');
    script.src = 'https://cdnjs.buymeacoffee.com/1.0.0/widget.prod.min.js';
    script.setAttribute('data-name', 'BMC-Widget');
    script.setAttribute('data-cfasync', 'false');
    script.setAttribute('data-id', 'ToolBoxHub');
    script.setAttribute('data-description', 'Support me on Buy me a coffee!');
    script.setAttribute('data-message', 'Need Some Caffeine To Keep it up. Appreciate it.');
    script.setAttribute('data-color', '#FF813F');
    script.setAttribute('data-position', 'Right');
    script.setAttribute('data-x_margin', '18');
    script.setAttribute('data-y_margin', '18');
    script.async = true;
    
    document.body.appendChild(script);

    return () => {
      // Cleanup if needed
      const existingScript = document.querySelector('script[data-name="BMC-Widget"]');
      if (existingScript) {
        existingScript.remove();
      }
    };
  }, []);

  return null;
}
