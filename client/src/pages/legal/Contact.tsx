import { ToolLayout } from "@/components/ToolLayout";
import { SeoHead } from "@/components/SeoHead";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Mail, MapPin, Phone } from "lucide-react";

export default function Contact() {
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
                <p className="text-muted-foreground">support@toolbox.hub</p>
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

        <form className="space-y-6 bg-gray-50 p-8 border-2 border-gray-100" onSubmit={(e) => e.preventDefault()}>
          <div className="space-y-2">
            <Label htmlFor="name" className="font-bold uppercase">Name</Label>
            <Input id="name" placeholder="Your name" className="bg-white border-2 border-black rounded-none h-12" />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="email" className="font-bold uppercase">Email</Label>
            <Input id="email" type="email" placeholder="your@email.com" className="bg-white border-2 border-black rounded-none h-12" />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="message" className="font-bold uppercase">Message</Label>
            <Textarea id="message" placeholder="How can we help?" className="bg-white border-2 border-black rounded-none min-h-[150px]" />
          </div>

          <Button className="w-full bg-primary hover:bg-black text-white font-bold uppercase tracking-wider rounded-none h-14 text-lg border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-y-1 active:shadow-none transition-all">
            Send Message
          </Button>
        </form>
      </div>
    </ToolLayout>
  );
}
