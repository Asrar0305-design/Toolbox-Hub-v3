import { ToolLayout } from "@/components/ToolLayout";
import { SeoHead } from "@/components/SeoHead";
import { CheckCircle2, Zap, Shield, Globe } from "lucide-react";
import { DonationButtonInline } from "@/components/DonationButton";

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

        {/* Our Mission Section */}
        <div className="space-y-6">
          <h2 className="text-3xl font-black uppercase tracking-tighter border-b-4 border-black pb-2 inline-block">
            Our Mission
          </h2>
          <div className="prose prose-lg text-muted-foreground">
            <p>
              At ToolBox Hub, we believe that access to quality digital tools should be a right, not a privilege. 
              Too often, simple tasks like converting an image or formatting JSON require expensive software subscriptions, 
              complicated installations, or compromising your privacy by uploading sensitive files to unknown servers.
            </p>
            <p>
              Our mission is to change that. We're building a comprehensive platform of professional-grade utilities that are:
            </p>
            <ul className="list-disc list-inside space-y-2 mt-4">
              <li><strong>Free Forever:</strong> No subscriptions, no premium tiers, no hidden costs.</li>
              <li><strong>Privacy-First:</strong> Your data never leaves your device with our client-side processing.</li>
              <li><strong>Accessible to All:</strong> No registration required, works on any device with a browser.</li>
              <li><strong>Fast and Reliable:</strong> Instant processing with no upload queues or waiting times.</li>
              <li><strong>Open and Transparent:</strong> We believe in honest communication about how our tools work.</li>
            </ul>
          </div>
        </div>

        {/* Who We Serve Section */}
        <div className="space-y-6">
          <h2 className="text-3xl font-black uppercase tracking-tighter border-b-4 border-black pb-2 inline-block">
            Who We Serve
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 border-4 border-black bg-white">
              <h3 className="text-xl font-bold uppercase mb-3">Students & Educators</h3>
              <p className="text-muted-foreground">
                From formatting research data to creating QR codes for classroom materials, 
                our tools help students and teachers work more efficiently without budget constraints.
              </p>
            </div>
            <div className="p-6 border-4 border-black bg-white">
              <h3 className="text-xl font-bold uppercase mb-3">Developers & Designers</h3>
              <p className="text-muted-foreground">
                Professional-grade tools for image optimization, JSON validation, and code formatting 
                that integrate seamlessly into your workflow without leaving the browser.
              </p>
            </div>
            <div className="p-6 border-4 border-black bg-white">
              <h3 className="text-xl font-bold uppercase mb-3">Small Businesses</h3>
              <p className="text-muted-foreground">
                Enterprise-quality utilities without enterprise prices. Generate QR codes for marketing, 
                merge PDFs for reports, and manage digital assets efficiently.
              </p>
            </div>
            <div className="p-6 border-4 border-black bg-white">
              <h3 className="text-xl font-bold uppercase mb-3">Content Creators</h3>
              <p className="text-muted-foreground">
                Streamline your content production with tools for image conversion, thumbnail downloading, 
                word counting, and more—all optimized for creative workflows.
              </p>
            </div>
          </div>
        </div>

        {/* Why Trust Us Section */}
        <div className="space-y-6">
          <h2 className="text-3xl font-black uppercase tracking-tighter border-b-4 border-black pb-2 inline-block">
            Why Trust Us
          </h2>
          <div className="prose prose-lg text-muted-foreground">
            <p>
              In a world where data breaches and privacy violations make headlines daily, trust is earned, not given. 
              Here's how we've built ToolBox Hub with your trust in mind:
            </p>
            <ul className="list-disc list-inside space-y-2 mt-4">
              <li><strong>Transparent Processing:</strong> Most of our tools use WebAssembly to process data entirely in your browser. Your files never touch our servers.</li>
              <li><strong>No Data Collection:</strong> We don't require accounts, so we don't collect personal information. No email addresses, no passwords, no tracking beyond basic analytics.</li>
              <li><strong>Open Communication:</strong> We clearly explain how each tool works and what happens to your data in our comprehensive privacy policy.</li>
              <li><strong>Regular Updates:</strong> We continuously improve our tools based on user feedback and emerging security best practices.</li>
              <li><strong>Community-Driven:</strong> Our roadmap is shaped by real user needs, not corporate agendas or profit maximization.</li>
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
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="/contact" 
              className="inline-block bg-black text-white font-bold uppercase tracking-wider py-4 px-8 hover:bg-primary transition-colors"
            >
              Contact Us
            </a>
            <a 
              href="/help" 
              className="inline-block bg-white text-black font-bold uppercase tracking-wider py-4 px-8 border-4 border-black hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all"
            >
              Help Center
            </a>
            <DonationButtonInline />
          </div>
        </div>
      </div>
    </ToolLayout>
  );
}
