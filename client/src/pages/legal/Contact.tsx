import { ToolLayout } from "@/components/ToolLayout";
import { SeoHead } from "@/components/SeoHead";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Mail, MapPin } from "lucide-react";
import { useState } from "react";

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMessage('');

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          access_key: '63618d8c-ef4d-47c1-932a-14bd01bc6e4d',
          name: formData.name,
          email: formData.email,
          message: formData.message,
          subject: 'New Contact Form Submission from ToolBox Hub'
        })
      });

      const result = await response.json();

      if (result.success) {
        setStatus('success');
        setFormData({ name: '', email: '', message: '' });
        setTimeout(() => setStatus('idle'), 5000);
      } else {
        setStatus('error');
        setErrorMessage(result.message || 'Failed to send message');
      }
    } catch (error) {
      setStatus('error');
      setErrorMessage('Network error. Please try again.');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.id]: e.target.value }));
  };

  return (
    <ToolLayout
      title="Contact Us"
      description="Get in touch with the ToolBox Hub team. We're here to help."
    >
      <SeoHead 
        title="Contact Us"
        description="Contact ToolBox Hub support team for inquiries, feedback, or assistance."
      />
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div className="space-y-8">
          <div className="space-y-4">
            <h3 className="text-2xl font-black uppercase">Get in Touch</h3>
            <p className="text-muted-foreground">
              Have a question about our tools? Want to report a bug or suggest a feature? 
              Fill out the form and we'll get back to you as soon as possible.
            </p>
          </div>

          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="bg-black text-white p-3">
                <Mail className="w-6 h-6" />
              </div>
              <div>
                <p className="font-bold uppercase text-sm">Email Us</p>
                <p className="text-muted-foreground">asrar0305@gmail.com</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="bg-black text-white p-3">
                <MapPin className="w-6 h-6" />
              </div>
              <div>
                <p className="font-bold uppercase text-sm">Location</p>
                <p className="text-muted-foreground">San Francisco, CA</p>
              </div>
            </div>
          </div>
        </div>

        <form className="space-y-6 bg-gray-50 p-8 border-2 border-gray-100" onSubmit={handleSubmit}>
          <div className="space-y-2">
            <Label htmlFor="name" className="font-bold uppercase">Name</Label>
            <Input id="name" value={formData.name} onChange={handleChange} placeholder="Your name" className="bg-white border-2 border-black rounded-none h-12" required />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="email" className="font-bold uppercase">Email</Label>
            <Input id="email" type="email" value={formData.email} onChange={handleChange} placeholder="your@email.com" className="bg-white border-2 border-black rounded-none h-12" required />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="message" className="font-bold uppercase">Message</Label>
            <Textarea id="message" value={formData.message} onChange={handleChange} placeholder="How can we help?" className="bg-white border-2 border-black rounded-none min-h-[150px]" required />
          </div>

          {status === 'success' && (
            <div className="bg-green-100 border-2 border-green-500 text-green-700 p-4 font-bold">
              ✓ Message sent successfully! We'll get back to you soon.
            </div>
          )}
          
          {status === 'error' && (
            <div className="bg-red-100 border-2 border-red-500 text-red-700 p-4 font-bold">
              ✗ {errorMessage}
            </div>
          )}

          <Button 
            type="submit"
            disabled={status === 'loading'}
            className="w-full bg-primary hover:bg-black text-white font-bold uppercase tracking-wider rounded-none h-14 text-lg border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-y-1 active:shadow-none transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {status === 'loading' ? 'Sending...' : 'Send Message'}
          </Button>
        </form>
      </div>
    </ToolLayout>
  );
}
