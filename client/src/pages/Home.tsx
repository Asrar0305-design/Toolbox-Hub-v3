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
    <div className="min-h-screen bg-white text-black font-sans selection:bg-primary selection:text-white" style={{backgroundColor: '#ffffff', color: '#000000'}}>
      <SeoHead 
        title="Free Online Utilities & Developer Tools"
        description="ToolBox Hub offers free, secure, and instant online tools including Image Converter, PDF Tools, QR Generator, and JSON Formatter. No sign-up required."
      />
      {/* Header */}
      <header className="border-b-4 border-black bg-white sticky top-0 z-50" style={{borderColor: '#000000', backgroundColor: '#ffffff'}}>
        <div className="container mx-auto px-4 h-20 flex items-center justify-between">
          <div className="font-bold text-2xl tracking-tighter uppercase flex items-center gap-2" style={{color: '#000000'}}>
            <div className="w-8 h-8 bg-primary flex items-center justify-center text-white" style={{backgroundColor: '#ff6900'}}>
              <Zap className="w-5 h-5 fill-current" />
            </div>
            ToolBox<span className="text-primary" style={{color: '#ff6900'}}>.Hub</span>
          </div>
          <nav className="hidden md:flex items-center gap-8 font-bold uppercase tracking-tight text-sm">
            <a href="#tools" className="hover:text-primary transition-colors" style={{color: '#000000'}}>Tools</a>
            <Link href="/about" className="hover:text-primary transition-colors" style={{color: '#000000'}}>About</Link>
            <a href="#tools">
              <Button className="bg-black hover:bg-primary text-white font-bold uppercase rounded-none border-2 border-transparent hover:border-black transition-all" style={{backgroundColor: '#000000', color: '#ffffff'}}>
                Get Started
              </Button>
            </a>
          </nav>
        </div>
      </header>

      <main>
        {/* Hero Section */}
        <section className="relative border-b-4 border-black overflow-hidden" style={{borderColor: '#000000'}}>
          <div className="container mx-auto px-4 py-24 md:py-32 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="max-w-4xl mx-auto text-center lg:text-left space-y-8 mb-20 lg:mb-0 animate-in fade-in slide-in-from-bottom-8 duration-700">
              <div className="inline-block bg-black text-white px-4 py-1 font-bold uppercase tracking-widest text-sm mb-4" style={{backgroundColor: '#000000', color: '#ffffff'}}>
                The Swiss Army Knife of the Web
              </div>
              <h1 className="text-7xl md:text-9xl font-black tracking-tighter leading-[0.85] uppercase" style={{color: '#000000', borderStyle: 'groove', borderColor: '#ff6900', borderRadius: '6px', borderWidth: '4px'}}>
                Digital<br />
                <span className="text-primary" style={{color: '#ff6900'}}>Tools</span><br />
                For All.
              </h1>
              <p className="text-xl md:text-2xl font-medium text-muted-foreground max-w-xl border-l-4 border-primary pl-6 py-2" style={{color: '#6b7280', borderColor: '#ff6900'}}>
                Free, secure, and instant online utilities. No sign-ups, no nonsense. Just pure functionality.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <a href="#tools">
                  <Button className="w-full sm:w-auto h-16 px-8 text-lg bg-primary hover:bg-black text-white font-bold uppercase tracking-wider rounded-none border-2 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-[4px] hover:translate-y-[4px] transition-all" style={{backgroundColor: '#ff6900', color: '#ffffff', borderColor: '#000000'}}>
                    Explore Tools
                  </Button>
                </a>
                <Button variant="outline" className="w-full sm:w-auto h-16 px-8 text-lg bg-white text-black font-bold uppercase tracking-wider rounded-none border-2 border-black hover:bg-gray-50" style={{backgroundColor: '#ffffff', color: '#000000', borderColor: '#000000'}}>
                  Learn More
                </Button>
              </div>
            </div>
            
            <div className="relative z-0 hidden lg:block">
              <div className="relative w-full aspect-square border-4 border-black bg-white p-4 shadow-[16px_16px_0px_0px_rgba(0,0,0,1)]" style={{borderColor: '#000000', backgroundColor: '#ffffff'}}>
                <img 
                  src="/images/hero-swiss-tools.png" 
                  alt="Digital Tools Abstract Art" 
                  className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500"
                />
                <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-primary border-4 border-black flex items-center justify-center animate-bounce" style={{backgroundColor: '#ff6900', borderColor: '#000000'}}>
                  <ArrowRight className="w-12 h-12 text-white -rotate-45" />
                </div>
              </div>
            </div>
          </div>
          
          {/* Decorative Grid Background */}
          <div className="absolute inset-0 grid grid-cols-[repeat(20,minmax(0,1fr))] opacity-[0.03] pointer-events-none">
            {Array.from({ length: 400 }).map((_, i) => (
              <div key={i} className="border-r border-b border-black aspect-square" style={{borderColor: '#000000'}} />
            ))}
          </div>
        </section>

        {/* Tools Grid */}
        <section id="tools" className="py-24 bg-gray-50" style={{backgroundColor: '#f9fafb'}}>
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
              <div>
                <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter mb-4" style={{color: '#000000'}}>
                  Our <span className="text-primary" style={{color: '#ff6900'}}>Toolkit</span>
                </h2>
                <p className="text-xl text-muted-foreground font-medium max-w-lg" style={{color: '#6b7280'}}>
                  Everything you need to convert, generate, and format your digital assets.
                </p>
              </div>
              <div className="hidden md:block w-32 h-4 bg-black" style={{backgroundColor: '#000000'}} />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {tools.map((tool, index) => (
                <Link key={tool.id} href={tool.href} className="group block h-full">
                  <div 
                    className="h-full bg-white border-4 border-black p-6 flex flex-col justify-between transition-all duration-300 hover:-translate-y-2 hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] animate-in fade-in slide-in-from-bottom-4 duration-500 fill-mode-backwards"
                    style={{ animationDelay: `${index * 100}ms`, borderColor: '#000000', backgroundColor: '#ffffff' }}
                  >
                      <div className="space-y-6">
                        <div className="relative aspect-square border-2 border-black overflow-hidden bg-gray-100" style={{borderColor: '#000000', backgroundColor: '#f3f4f6'}}>
                          <img 
                            src={tool.image} 
                            alt={tool.title}
                            className="w-full h-full object-cover mix-blend-multiply group-hover:scale-110 transition-transform duration-500"
                          />
                          <div className={`absolute top-0 right-0 p-3 ${tool.color} text-white border-l-2 border-b-2 border-black`} style={{borderColor: '#000000'}}>
                            <tool.icon className="w-6 h-6" />
                          </div>
                        </div>
                        
                        <div>
                          <h3 className="text-2xl font-black uppercase tracking-tight mb-2 group-hover:text-primary transition-colors" style={{color: '#000000'}}>
                            {tool.title}
                          </h3>
                          <p className="text-muted-foreground font-medium leading-relaxed" style={{color: '#6b7280'}}>
                            {tool.description}
                          </p>
                        </div>
                      </div>

                      <div className="mt-8 flex items-center gap-2 font-bold uppercase text-sm tracking-wider group-hover:gap-4 transition-all" style={{color: '#000000'}}>
                        Launch Tool <ArrowRight className="w-4 h-4" />
                      </div>
                    </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Features / Trust Section */}
        <section className="border-y-4 border-black bg-primary text-white overflow-hidden" style={{borderColor: '#000000', backgroundColor: '#ff6900', color: '#ffffff'}}>
          <div className="container mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 divide-y-4 md:divide-y-0 md:divide-x-4 divide-black" style={{borderColor: '#000000'}}>
              <div className="p-12 text-center space-y-4">
                <div className="w-16 h-16 bg-black mx-auto flex items-center justify-center rounded-full mb-6" style={{backgroundColor: '#000000'}}>
                  <Zap className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-black uppercase">Lightning Fast</h3>
                <p className="font-medium opacity-90">Processed instantly in your browser. No server uploads, no waiting queues.</p>
              </div>
              <div className="p-12 text-center space-y-4">
                <div className="w-16 h-16 bg-black mx-auto flex items-center justify-center rounded-full mb-6" style={{backgroundColor: '#000000'}}>
                  <Code2 className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-black uppercase">Developer Friendly</h3>
                <p className="font-medium opacity-90">Clean output, valid code, and precise formatting for professionals.</p>
              </div>
              <div className="p-12 text-center space-y-4">
                <div className="w-16 h-16 bg-black mx-auto flex items-center justify-center rounded-full mb-6" style={{backgroundColor: '#000000'}}>
                  <FileJson className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-black uppercase">Always Free</h3>
                <p className="font-medium opacity-90">No subscriptions, no hidden fees. Just open source utilities for everyone.</p>
              </div>
            </div>
          </div>
        </section>

        <SocialShare />
      </main>

      {/* Footer */}
      <footer className="bg-black text-white py-16 border-t-4 border-black" style={{backgroundColor: '#000000', color: '#ffffff', borderColor: '#000000'}}>
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            <div className="space-y-6">
              <div className="font-bold text-2xl tracking-tighter uppercase flex items-center gap-2">
                <div className="w-8 h-8 bg-white flex items-center justify-center text-black">
                  <Zap className="w-5 h-5 fill-current" />
                </div>
                ToolBox<span className="text-primary" style={{color: '#ff6900'}}>.Hub</span>
              </div>
              <p className="text-gray-400 font-medium">
                The ultimate collection of free online utilities. Built for speed, privacy, and simplicity.
              </p>
            </div>
            
            <div>
              <h4 className="font-bold uppercase tracking-wider mb-6 text-lg">Tools</h4>
              <ul className="space-y-3 text-gray-400 font-medium">
                <li><Link href="/tools/image-converter" className="hover:text-white transition-colors">Image Converter</Link></li>
                <li><Link href="/tools/pdf-tools" className="hover:text-white transition-colors">PDF Tools</Link></li>
                <li><Link href="/tools/qr-generator" className="hover:text-white transition-colors">QR Generator</Link></li>
                <li><Link href="/tools/json-formatter" className="hover:text-white transition-colors">JSON Formatter</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold uppercase tracking-wider mb-6 text-lg">Legal</h4>
              <ul className="space-y-3 text-gray-400 font-medium">
                <li><Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
                <li><Link href="/terms" className="hover:text-white transition-colors">Terms of Use</Link></li>
                <li><Link href="/contact" className="hover:text-white transition-colors">Contact Us</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold uppercase tracking-wider mb-6 text-lg">Connect</h4>
              <p className="text-gray-400 font-medium mb-4">
                Questions or suggestions? We'd love to hear from you.
              </p>
              <Link href="/contact">
                <Button className="w-full bg-white text-black hover:bg-primary hover:text-white font-bold uppercase rounded-none border-2 border-transparent transition-all">
                  Get in Touch
                </Button>
              </Link>
            </div>
          </div>
          
          <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm font-medium text-gray-500">
            <p>&copy; 2025 ToolBox Hub. All rights reserved.</p>
            <p>Designed with ♥ for the web.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
