import { ToolLayout } from "@/components/ToolLayout";
import { SeoHead } from "@/components/SeoHead";
import { CheckCircle2, Zap, Shield, Globe } from "lucide-react";

export default function About() {
  return (
    <ToolLayout
      title="About ToolBox Hub"
      description="The Swiss Army Knife of the Web. Built for speed, privacy, and precision."
    >
      <SeoHead 
        title="About ToolBox Hub - Free Online Utilities"
        description="Learn about ToolBox Hub, the free, secure, and fast online utility platform. We provide image tools, PDF tools, and more with zero server-side processing."
      />

      <div className="space-y-12 max-w-4xl mx-auto animate-in fade-in slide-in-from-bottom-8 duration-700">
        {/* Mission Statement */}
        <div className="text-center space-y-6">
          <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter">
            Digital Tools <br/>
            <span className="text-primary">For Everyone</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            ToolBox Hub is your premier destination for high-quality, free online utilities. 
            Founded with the mission to democratize digital productivity, we provide a suite of 
            professional-grade tools accessible to students, developers, designers, and business owners worldwide.
            We believe essential digital tools should be free, fast, and accessible to everyone. 
            No sign-ups, no paywalls, no nonsense. Just pure functionality.
          </p>
        </div>

        {/* Core Values Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="p-8 border-4 border-black bg-white hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-all group">
            <Zap className="w-12 h-12 mb-4 text-primary group-hover:scale-110 transition-transform" />
            <h3 className="text-2xl font-bold uppercase mb-2">Lightning Fast</h3>
            <p className="text-muted-foreground">
              Our tools run directly in your browser. No file uploads, no server waiting times. 
              Everything happens instantly on your device.
            </p>
          </div>

          <div className="p-8 border-4 border-black bg-white hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-all group">
            <Shield className="w-12 h-12 mb-4 text-primary group-hover:scale-110 transition-transform" />
            <h3 className="text-2xl font-bold uppercase mb-2">100% Secure</h3>
            <p className="text-muted-foreground">
              Your files never leave your computer. Since we process everything client-side, 
              your data remains completely private and secure.
            </p>
          </div>

          <div className="p-8 border-4 border-black bg-white hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-all group">
            <Globe className="w-12 h-12 mb-4 text-primary group-hover:scale-110 transition-transform" />
            <h3 className="text-2xl font-bold uppercase mb-2">Always Free</h3>
            <p className="text-muted-foreground">
              We are committed to keeping our core tools free forever. We are supported by 
              unobtrusive ads, so you don't have to pay a dime.
            </p>
          </div>

          <div className="p-8 border-4 border-black bg-white hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-all group">
            <CheckCircle2 className="w-12 h-12 mb-4 text-primary group-hover:scale-110 transition-transform" />
            <h3 className="text-2xl font-bold uppercase mb-2">Swiss Precision</h3>
            <p className="text-muted-foreground">
              Designed with clarity and precision in mind. Our interface is clean, 
              distraction-free, and focused on getting the job done.
            </p>
          </div>
        </div>

        {/* Our Story Section */}
        <div className="space-y-6">
          <h2 className="text-3xl font-black uppercase tracking-tighter border-b-4 border-black pb-2 inline-block">
            Our Story
          </h2>
          <div className="prose prose-lg text-muted-foreground">
            <p>
              In an internet filled with subscription-based services and ad-cluttered pages, finding a simple, 
              reliable tool to convert a file or generate a QR code can be frustrating. That's why we built ToolBox Hub.
            </p>
            <p>
              What started as a small project to help friends convert images quickly has grown into a comprehensive 
              platform serving thousands of users daily. Our team of passionate developers works tirelessly to 
              optimize every line of code, ensuring that our tools are not just free, but also faster and more 
              secure than paid alternatives.
            </p>
          </div>
        </div>

        {/* Technology Stack Section */}
        <div className="space-y-6">
          <h2 className="text-3xl font-black uppercase tracking-tighter border-b-4 border-black pb-2 inline-block">
            Powered by Modern Tech
          </h2>
          <div className="prose prose-lg text-muted-foreground">
            <p>
              We leverage cutting-edge web technologies like WebAssembly (Wasm) and modern JavaScript frameworks 
              to bring desktop-class performance to your browser. This means:
            </p>
            <ul className="list-disc list-inside space-y-2 mt-4">
              <li><strong>Zero Latency:</strong> Tools load instantly and process data in milliseconds.</li>
              <li><strong>Privacy First:</strong> Data processing happens on your device, not on our servers.</li>
              <li><strong>Cross-Platform:</strong> Whether you're on a Windows PC, a Mac, an iPad, or an Android phone, our tools work perfectly.</li>
            </ul>
          </div>
        </div>

        {/* Contact Section */}
        <div className="bg-gray-100 p-8 md:p-12 text-center border-4 border-black">
          <h3 className="text-2xl font-bold uppercase mb-4">Join Our Community</h3>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            We are constantly adding new tools based on user feedback. If you have a suggestion, found a bug, 
            or just want to say hello, we'd love to hear from you. Your input helps us make the web a more productive place.
          </p>
          <a 
            href="/contact" 
            className="inline-block bg-black text-white font-bold uppercase tracking-wider py-4 px-8 hover:bg-primary transition-colors"
          >
            Contact Us
          </a>
        </div>
      </div>
    </ToolLayout>
  );
}
