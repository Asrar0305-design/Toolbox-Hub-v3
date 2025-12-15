import { Link } from "wouter";
import { ArrowRight, Image as ImageIcon, FileText, QrCode, FileJson, Code2, Zap, Lock, Type, Scale, Youtube } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SocialShare } from "@/components/SocialShare";
import { SeoHead } from "@/components/SeoHead";

const tools = [
  {
    id: "image-converter",
    title: "Image Converter",
    description: "Convert images between PNG, JPG, WEBP formats instantly.",
    icon: ImageIcon,
    href: "/tools/image-converter",
    color: "bg-orange-500",
    image: "/images/category-image-processing.png"
  },
  {
    id: "pdf-tools",
    title: "PDF Tools",
    description: "Merge, split, and organize PDF documents securely in browser.",
    icon: FileText,
    href: "/tools/pdf-tools",
    color: "bg-blue-600",
    image: "/images/category-pdf-tools.png"
  },
  {
    id: "qr-generator",
    title: "QR Generator",
    description: "Create custom QR codes for URLs, Wi-Fi, and text.",
    icon: QrCode,
    href: "/tools/qr-generator",
    color: "bg-black",
    image: "/images/category-dev-tools.png"
  },
  {
    id: "json-formatter",
    title: "JSON Formatter",
    description: "Validate, beautify, and minify JSON data with error checking.",
    icon: FileJson,
    href: "/tools/json-formatter",
    color: "bg-green-600",
    image: "/images/category-text-tools.png"
  },
  {
    id: "password-generator",
    title: "Password Generator",
    description: "Generate strong, secure passwords to protect your accounts.",
    icon: Lock,
    href: "/tools/password-generator",
    color: "bg-red-600",
    image: "/images/category-password-tools.png"
  },
  {
    id: "word-counter",
    title: "Word Counter",
    description: "Count words, characters, and estimate reading time instantly.",
    icon: Type,
    href: "/tools/word-counter",
    color: "bg-purple-600",
    image: "/images/category-word-counter.png"
  },
  {
    id: "unit-converter",
    title: "Unit Converter",
    description: "Convert length, weight, temperature, and data units instantly.",
    icon: Scale,
    href: "/tools/unit-converter",
    color: "bg-orange-600",
    image: "/images/category-unit-converter.png"
  },
  {
    id: "youtube-thumbnail",
    title: "YouTube Thumbnail",
    description: "Download high-quality thumbnails from any YouTube video instantly.",
    icon: Youtube,
    href: "/tools/youtube-thumbnail",
    color: "bg-red-600",
    image: "/images/category-youtube-tools.png"
  }
];

export default function Home() {
  return (
    <div className="min-h-screen bg-white text-black font-sans selection:bg-primary selection:text-white">
      <SeoHead 
        title="Free Online Utilities & Developer Tools"
        description="ToolBox Hub offers free, secure, and instant online tools including Image Converter, PDF Tools, QR Generator, and JSON Formatter. No sign-up required."
      />
      {/* Header */}
      <header className="border-b-4 border-black bg-white sticky top-0 z-50">
        <div className="container mx-auto px-4 h-20 flex items-center justify-between">
          <div className="font-bold text-2xl tracking-tighter uppercase flex items-center gap-2" style={{backgroundColor: '#000000'}}>
            <div className="w-8 h-8 bg-primary flex items-center justify-center text-white">
              <Zap className="w-5 h-5 fill-current" />
            </div>
            ToolBox<span className="text-primary">.Hub</span>
          </div>
          <nav className="hidden md:flex items-center gap-8 font-bold uppercase tracking-tight text-sm">
            <a href="#tools" className="hover:text-primary transition-colors">Tools</a>
            <Link href="/about" className="hover:text-primary transition-colors">About</Link>
            <a href="#tools">
              <Button className="bg-black hover:bg-primary text-white font-bold uppercase rounded-none border-2 border-transparent hover:border-black transition-all">
                Get Started
              </Button>
            </a>
          </nav>
        </div>
      </header>

      <main>
        {/* Hero Section */}
        <section className="relative border-b-4 border-black overflow-hidden">
          <div className="container mx-auto px-4 py-24 md:py-32 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="max-w-4xl mx-auto text-center lg:text-left space-y-8 mb-20 lg:mb-0 animate-in fade-in slide-in-from-bottom-8 duration-700">
              <div className="inline-block bg-black text-white px-4 py-1 font-bold uppercase tracking-widest text-sm mb-4">
                The Swiss Army Knife of the Web
              </div>
              <h1 className="text-7xl md:text-9xl font-black tracking-tighter leading-[0.85] uppercase" style={{borderStyle: 'groove', borderColor: '#ff6900', borderRadius: '6px', borderWidth: '4px'}}>
                Digital<br />
                <span className="text-primary">Tools</span><br />
                For All.
              </h1>
              <p className="text-xl md:text-2xl font-medium text-muted-foreground max-w-xl border-l-4 border-primary pl-6 py-2">
                Free, secure, and instant online utilities. No sign-ups, no nonsense. Just pure functionality.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <a href="#tools">
                  <Button className="w-full sm:w-auto h-16 px-8 text-lg bg-primary hover:bg-black text-white font-bold uppercase tracking-wider rounded-none border-2 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-[4px] hover:translate-y-[4px] transition-all">
                    Explore Tools
                  </Button>
                </a>
                <Button variant="outline" className="w-full sm:w-auto h-16 px-8 text-lg bg-white text-black font-bold uppercase tracking-wider rounded-none border-2 border-black hover:bg-gray-50">
                  Learn More
                </Button>
              </div>
            </div>
            
            <div className="relative z-0 hidden lg:block">
              <div className="relative w-full aspect-square border-4 border-black bg-white p-4 shadow-[16px_16px_0px_0px_rgba(0,0,0,1)]">
                <img 
                  src="/images/hero-swiss-tools.png" 
                  alt="Digital Tools Abstract Art" 
                  className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500"
                />
                <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-primary border-4 border-black flex items-center justify-center animate-bounce">
                  <ArrowRight className="w-12 h-12 text-white -rotate-45" />
                </div>
              </div>
            </div>
          </div>
          
          {/* Decorative Grid Background */}
          <div className="absolute inset-0 grid grid-cols-[repeat(20,minmax(0,1fr))] opacity-[0.03] pointer-events-none">
            {Array.from({ length: 400 }).map((_, i) => (
              <div key={i} className="border-r border-b border-black aspect-square" />
            ))}
          </div>
        </section>

        {/* Tools Grid */}
        <section id="tools" className="py-24 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
              <div>
                <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter mb-4">
                  Our <span className="text-primary">Toolkit</span>
                </h2>
                <p className="text-xl text-muted-foreground font-medium max-w-lg">
                  Everything you need to convert, generate, and format your digital assets.
                </p>
              </div>
              <div className="hidden md:block w-32 h-4 bg-black" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {tools.map((tool, index) => (
                <Link key={tool.id} href={tool.href} className="group block h-full">
                  <div 
                    className="h-full bg-white border-4 border-black p-6 flex flex-col justify-between transition-all duration-300 hover:-translate-y-2 hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] animate-in fade-in slide-in-from-bottom-4 duration-500 fill-mode-backwards"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                      <div className="space-y-6">
                        <div className="relative aspect-square border-2 border-black overflow-hidden bg-gray-100">
                          <img 
                            src={tool.image} 
                            alt={tool.title}
                            className="w-full h-full object-cover mix-blend-multiply group-hover:scale-110 transition-transform duration-500"
                          />
                          <div className={`absolute top-0 right-0 p-3 ${tool.color} text-white border-l-2 border-b-2 border-black`}>
                            <tool.icon className="w-6 h-6" />
                          </div>
                        </div>
                        
                        <div>
                          <h3 className="text-2xl font-black uppercase tracking-tight mb-2 group-hover:text-primary transition-colors">
                            {tool.title}
                          </h3>
                          <p className="text-muted-foreground font-medium leading-relaxed">
                            {tool.description}
                          </p>
                        </div>
                      </div>

                      <div className="mt-8 flex items-center gap-2 font-bold uppercase text-sm tracking-wider group-hover:gap-4 transition-all">
                        Launch Tool <ArrowRight className="w-4 h-4" />
                      </div>
                    </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Features / Trust Section */}
        <section className="border-y-4 border-black bg-primary text-white overflow-hidden">
          <div className="container mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 divide-y-4 md:divide-y-0 md:divide-x-4 divide-black">
              <div className="p-12 text-center space-y-4">
                <div className="w-16 h-16 bg-black mx-auto flex items-center justify-center rounded-full mb-6">
                  <Zap className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-black uppercase">Lightning Fast</h3>
                <p className="font-medium opacity-90">Processed instantly in your browser. No server uploads, no waiting queues.</p>
              </div>
              <div className="p-12 text-center space-y-4">
                <div className="w-16 h-16 bg-black mx-auto flex items-center justify-center rounded-full mb-6">
                  <Code2 className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-black uppercase">Developer Friendly</h3>
                <p className="font-medium opacity-90">Clean output, valid code, and precise formatting for professionals.</p>
              </div>
              <div className="p-12 text-center space-y-4">
                <div className="w-16 h-16 bg-black mx-auto flex items-center justify-center rounded-full mb-6">
                  <FileJson className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-black uppercase">Always Free</h3>
                <p className="font-medium opacity-90">No credit cards, no hidden fees. Just powerful tools available 24/7.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Why Choose Us Section (RICH CONTENT FOR ADSENSE) */}
        <section className="py-24 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto" style={{backgroundColor: '#000000'}}>
              <div className="mb-12 border-l-8 border-primary pl-8">
                <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-6">
                  Why Choose <span className="bg-primary text-white px-2">ToolBox Hub?</span>
                </h2>
                <p className="text-xl font-medium text-muted-foreground">
                  We are building the web's most reliable utility collection. Here is why thousands of users trust us daily.
                </p>
              </div>

              <div className="space-y-16">
                <div className="grid md:grid-cols-[1fr_2fr] gap-8 items-start">
                  <div className="bg-black text-white p-6 font-bold uppercase text-xl tracking-wider border-4 border-primary shadow-[8px_8px_0px_0px_#ff6b00]">
                    Privacy By Design
                  </div>
                  <div className="prose prose-lg max-w-none">
                    <p className="text-lg leading-relaxed text-gray-700">
                      In today's fast-paced digital world, efficiency is key. ToolBox Hub was created with a single mission: to provide a comprehensive suite of high-quality, free online utilities that respect your time and privacy. Unlike other platforms that clutter their interfaces with intrusive ads or require lengthy sign-up processes, we focus on delivering pure, unadulterated functionality.
                    </p>
                    <p className="text-lg leading-relaxed text-gray-700 mt-4">
                      Security is not an afterthought; it's our foundation. Most online converters upload your files to a remote server for processing, creating a potential risk for data breaches. At ToolBox Hub, we leverage advanced WebAssembly technology to process your files <strong>locally within your browser</strong>. Your sensitive documents, images, and data never leave your device.
                    </p>
                  </div>
                </div>

                <div className="grid md:grid-cols-[1fr_2fr] gap-8 items-start">
                  <div className="bg-black text-white p-6 font-bold uppercase text-xl tracking-wider border-4 border-primary shadow-[8px_8px_0px_0px_#ff6b00]">
                    Always Free, Always Fast
                  </div>
                  <div className="prose prose-lg max-w-none">
                    <p className="text-lg leading-relaxed text-gray-700">
                      We believe that essential digital tools should be accessible to everyone, regardless of budget. That's why ToolBox Hub is and will always be free to use. There are no premium tiers, no hidden paywalls, and no "pro" features locked behind a subscription. Whether you are a student, a freelancer, or a business professional, you get access to the same high-performance tools.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-black text-white border-t-4 border-primary py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            <div className="space-y-6">
              <div className="font-bold text-2xl tracking-tighter uppercase flex items-center gap-2">
                <div className="w-8 h-8 bg-primary flex items-center justify-center text-white">
                  <Zap className="w-5 h-5 fill-current" />
                </div>
                ToolBox<span className="text-primary" style={{borderWidth: '6px', borderStyle: 'outset'}}>.Hub</span>
              </div>
              <p className="text-muted-foreground font-medium max-w-sm" style={{color: '#121212'}}>
                The ultimate collection of free online utilities. Built for speed, privacy, and simplicity.
              </p>
              <SocialShare />
            </div>
            
            <div className="space-y-4" style={{color: '#ff6900'}}>
              <h4 className="font-black uppercase tracking-wider" style={{color: '#0f0f0f'}}>Tools</h4>
              <ul className="space-y-2 font-medium text-muted-foreground">
                <li><Link href="/tools/image-converter" className="hover:text-primary transition-colors">Image Converter</Link></li>
                <li><Link href="/tools/pdf-tools" className="hover:text-primary transition-colors">PDF Tools</Link></li>
                <li><Link href="/tools/qr-generator" className="hover:text-primary transition-colors">QR Generator</Link></li>
                <li style={{borderWidth: '6px', borderStyle: 'outset'}}><Link href="/tools/json-formatter" className="hover:text-primary transition-colors" style={{borderWidth: '6px', borderStyle: 'outset'}}>JSON Formatter</Link></li>
              </ul>
            </div>
            
            <div className="space-y-4">
              <h4 className="font-black uppercase tracking-wider">Legal</h4>
              <ul className="space-y-2 font-medium text-muted-foreground">
                <li><Link href="/privacy" className="hover:text-primary transition-colors">Privacy Policy</Link></li>
                <li><Link href="/terms" className="hover:text-primary transition-colors">Terms of Use</Link></li>
                <li><Link href="/contact" className="hover:text-primary transition-colors">Contact Us</Link></li>
              </ul>
            </div>

            <div className="space-y-4">
              <h4 className="font-black uppercase tracking-wider">Connect</h4>
              <p className="text-muted-foreground font-medium">
                Questions or suggestions? We'd love to hear from you.
              </p>
              <Link href="/contact">
                <Button variant="outline" className="w-full border-2 border-white text-white hover:bg-white hover:text-black uppercase font-bold tracking-wider rounded-none">
                  Get in Touch
                </Button>
              </Link>
            </div>
          </div>
          
          <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm font-medium text-muted-foreground">
            <p>&copy; {new Date().getFullYear()} ToolBox Hub. All rights reserved.</p>
            <p>Designed with <span className="text-primary">♥</span> for the web.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
