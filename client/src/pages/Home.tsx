import { Link } from "wouter";
import { ArrowRight, Image as ImageIcon, FileText, QrCode, FileJson, Code2, Zap, Lock, Type, Scale, Youtube, CheckCircle2, ShieldCheck, Globe2, Eraser, Binary, Palette, Hash, FileEdit, Table, AlignLeft, Maximize2 } from "lucide-react";
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
  },
  {
    id: "background-remover",
    title: "Background Remover",
    description: "Remove image backgrounds automatically with AI technology.",
    icon: Eraser,
    href: "/tools/background-remover",
    color: "bg-purple-500",
    image: "/images/category-image-processing.png"
  },
  {
    id: "base64-encoder",
    title: "Base64 Encoder",
    description: "Encode and decode Base64 data for APIs and data URIs.",
    icon: Binary,
    href: "/tools/base64-encoder",
    color: "bg-cyan-600",
    image: "/images/category-dev-tools.png"
  },
  {
    id: "color-picker",
    title: "Color Picker",
    description: "Pick colors from images and convert HEX, RGB, HSL formats.",
    icon: Palette,
    href: "/tools/color-picker",
    color: "bg-pink-600",
    image: "/images/category-image-processing.png"
  },
  {
    id: "hash-generator",
    title: "Hash Generator",
    description: "Generate MD5, SHA-1, SHA-256 hashes for security verification.",
    icon: Hash,
    href: "/tools/hash-generator",
    color: "bg-indigo-700",
    image: "/images/category-dev-tools.png"
  },
  {
    id: "markdown-editor",
    title: "Markdown Editor",
    description: "Write and preview Markdown with live rendering instantly.",
    icon: FileEdit,
    href: "/tools/markdown-editor",
    color: "bg-orange-500",
    image: "/images/category-text-tools.png"
  },
  {
    id: "csv-json-converter",
    title: "CSV to JSON",
    description: "Convert between CSV and JSON formats for data processing.",
    icon: Table,
    href: "/tools/csv-json-converter",
    color: "bg-green-600",
    image: "/images/category-dev-tools.png"
  },
  {
    id: "lorem-ipsum",
    title: "Lorem Ipsum",
    description: "Generate placeholder text for design mockups and layouts.",
    icon: AlignLeft,
    href: "/tools/lorem-ipsum",
    color: "bg-gray-600",
    image: "/images/category-text-tools.png"
  },
  {
    id: "image-resizer",
    title: "Image Resizer",
    description: "Resize images to specific dimensions for web and social media.",
    icon: Maximize2,
    href: "/tools/image-resizer",
    color: "bg-indigo-600",
    image: "/images/category-image-processing.png"
  }
];

export default function Home() {
  return (
    <div className="min-h-screen bg-white text-black font-sans selection:bg-primary selection:text-white" style={{backgroundColor: '#ffffff', color: '#000000'}}>
      <SeoHead 
        title="Free Online Utilities & Developer Tools - ToolBox Hub"
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
            <Link href="/blog" className="hover:text-primary transition-colors" style={{color: '#000000'}}>Blog</Link>
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
                <Link href="/blog">
                  <Button variant="outline" className="w-full sm:w-auto h-16 px-8 text-lg bg-white text-black font-bold uppercase tracking-wider rounded-none border-2 border-black hover:bg-gray-50" style={{backgroundColor: '#ffffff', color: '#000000', borderColor: '#000000'}}>
                    Read Blog
                  </Button>
                </Link>
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

        {/* Why Choose Us Section (Rich Content for SEO) */}
        <section className="py-24 border-t-4 border-black bg-white" style={{borderColor: '#000000', backgroundColor: '#ffffff'}}>
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center mb-16">
              <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-6" style={{color: '#000000'}}>
                Why Use <span className="text-primary" style={{color: '#ff6900'}}>ToolBox Hub?</span>
              </h2>
              <p className="text-xl text-gray-600 font-medium">
                We are redefining online utilities with a focus on privacy, speed, and user experience.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              <div className="space-y-4">
                <div className="w-16 h-16 bg-primary text-white flex items-center justify-center border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]" style={{backgroundColor: '#ff6900', borderColor: '#000000'}}>
                  <ShieldCheck className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-black uppercase" style={{color: '#000000'}}>100% Secure & Private</h3>
                <p className="text-gray-600 font-medium leading-relaxed">
                  Unlike other sites, we process your files locally in your browser using WebAssembly. Your sensitive data never leaves your device.
                </p>
              </div>
              <div className="space-y-4">
                <div className="w-16 h-16 bg-black text-white flex items-center justify-center border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]" style={{backgroundColor: '#000000', borderColor: '#000000'}}>
                  <Zap className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-black uppercase" style={{color: '#000000'}}>Blazing Fast Speed</h3>
                <p className="text-gray-600 font-medium leading-relaxed">
                  No queueing, no uploading, no waiting. Get instant results whether you are converting images or generating passwords.
                </p>
              </div>
              <div className="space-y-4">
                <div className="w-16 h-16 bg-white text-black flex items-center justify-center border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]" style={{backgroundColor: '#ffffff', borderColor: '#000000'}}>
                  <Globe2 className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-black uppercase" style={{color: '#000000'}}>Universal Access</h3>
                <p className="text-gray-600 font-medium leading-relaxed">
                  Works on any device—Windows, Mac, Linux, iOS, or Android. No software installation or registration required.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="py-24 bg-gray-50 border-t-4 border-black" style={{backgroundColor: '#f9fafb', borderColor: '#000000'}}>
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row gap-16 items-center">
              <div className="flex-1 space-y-8">
                <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter" style={{color: '#000000'}}>
                  How It <span className="text-primary" style={{color: '#ff6900'}}>Works</span>
                </h2>
                <div className="space-y-6">
                  <div className="flex gap-6">
                    <div className="text-6xl font-black text-gray-200">01</div>
                    <div>
                      <h3 className="text-2xl font-bold uppercase mb-2" style={{color: '#000000'}}>Select Your Tool</h3>
                      <p className="text-gray-600 font-medium">Browse our collection of free utilities and choose the one you need.</p>
                    </div>
                  </div>
                  <div className="flex gap-6">
                    <div className="text-6xl font-black text-gray-200">02</div>
                    <div>
                      <h3 className="text-2xl font-bold uppercase mb-2" style={{color: '#000000'}}>Input Your Data</h3>
                      <p className="text-gray-600 font-medium">Upload your file or paste your text. Everything happens instantly.</p>
                    </div>
                  </div>
                  <div className="flex gap-6">
                    <div className="text-6xl font-black text-gray-200">03</div>
                    <div>
                      <h3 className="text-2xl font-bold uppercase mb-2" style={{color: '#000000'}}>Get Results</h3>
                      <p className="text-gray-600 font-medium">Download your converted file or copy the result. Simple as that.</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex-1 relative">
                <div className="aspect-square bg-white border-4 border-black p-8 shadow-[16px_16px_0px_0px_rgba(0,0,0,1)] flex items-center justify-center" style={{borderColor: '#000000', backgroundColor: '#ffffff'}}>
                  <div className="text-center space-y-4">
                    <CheckCircle2 className="w-24 h-24 text-primary mx-auto" style={{color: '#ff6900'}} />
                    <h3 className="text-3xl font-black uppercase" style={{color: '#000000'}}>Ready to Start?</h3>
                    <p className="text-gray-600 font-medium">Join thousands of users who trust ToolBox Hub daily.</p>
                    <a href="#tools">
                      <Button className="bg-black text-white font-bold uppercase px-8 py-6 text-lg hover:bg-primary transition-colors" style={{backgroundColor: '#000000', color: '#ffffff'}}>
                        Try Now
                      </Button>
                    </a>
                  </div>
                </div>
              </div>
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

        {/* Popular Use Cases Section - Rich Content for SEO */}
        <section className="py-24 bg-white border-t-4 border-black" style={{backgroundColor: '#ffffff', borderColor: '#000000'}}>
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center mb-16">
              <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-6" style={{color: '#000000'}}>
                Popular <span className="text-primary" style={{color: '#ff6900'}}>Use Cases</span>
              </h2>
              <p className="text-xl text-gray-600 font-medium">
                Discover how professionals use ToolBox Hub to streamline their workflows and boost productivity.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-gray-50 border-4 border-black p-8 space-y-4" style={{borderColor: '#000000', backgroundColor: '#f9fafb'}}>
                <div className="w-12 h-12 bg-primary text-white flex items-center justify-center border-2 border-black" style={{backgroundColor: '#ff6900', borderColor: '#000000'}}>
                  <ImageIcon className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-black uppercase" style={{color: '#000000'}}>E-Commerce Sellers</h3>
                <p className="text-gray-600 font-medium leading-relaxed">
                  Convert product images to WebP for faster loading, remove backgrounds for clean listings, and resize images for different marketplaces like Amazon and eBay.
                </p>
              </div>

              <div className="bg-gray-50 border-4 border-black p-8 space-y-4" style={{borderColor: '#000000', backgroundColor: '#f9fafb'}}>
                <div className="w-12 h-12 bg-black text-white flex items-center justify-center border-2 border-black" style={{backgroundColor: '#000000', borderColor: '#000000'}}>
                  <Code2 className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-black uppercase" style={{color: '#000000'}}>Web Developers</h3>
                <p className="text-gray-600 font-medium leading-relaxed">
                  Format and validate JSON APIs, generate secure passwords for databases, convert CSV data to JSON, and encode Base64 for data URIs in CSS.
                </p>
              </div>

              <div className="bg-gray-50 border-4 border-black p-8 space-y-4" style={{borderColor: '#000000', backgroundColor: '#f9fafb'}}>
                <div className="w-12 h-12 bg-purple-600 text-white flex items-center justify-center border-2 border-black" style={{backgroundColor: '#9333ea', borderColor: '#000000'}}>
                  <FileText className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-black uppercase" style={{color: '#000000'}}>Content Creators</h3>
                <p className="text-gray-600 font-medium leading-relaxed">
                  Count words for SEO optimization, download YouTube thumbnails for inspiration, generate QR codes for social media, and merge PDFs for digital products.
                </p>
              </div>

              <div className="bg-gray-50 border-4 border-black p-8 space-y-4" style={{borderColor: '#000000', backgroundColor: '#f9fafb'}}>
                <div className="w-12 h-12 bg-green-600 text-white flex items-center justify-center border-2 border-black" style={{backgroundColor: '#16a34a', borderColor: '#000000'}}>
                  <Type className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-black uppercase" style={{color: '#000000'}}>Designers</h3>
                <p className="text-gray-600 font-medium leading-relaxed">
                  Pick colors from images for brand consistency, generate Lorem Ipsum for mockups, resize images for responsive designs, and create QR codes for print materials.
                </p>
              </div>

              <div className="bg-gray-50 border-4 border-black p-8 space-y-4" style={{borderColor: '#000000', backgroundColor: '#f9fafb'}}>
                <div className="w-12 h-12 bg-red-600 text-white flex items-center justify-center border-2 border-black" style={{backgroundColor: '#dc2626', borderColor: '#000000'}}>
                  <Lock className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-black uppercase" style={{color: '#000000'}}>Security Professionals</h3>
                <p className="text-gray-600 font-medium leading-relaxed">
                  Generate strong passwords for clients, create SHA-256 hashes for file verification, encode sensitive data in Base64, and secure documents with PDF tools.
                </p>
              </div>

              <div className="bg-gray-50 border-4 border-black p-8 space-y-4" style={{borderColor: '#000000', backgroundColor: '#f9fafb'}}>
                <div className="w-12 h-12 bg-orange-600 text-white flex items-center justify-center border-2 border-black" style={{backgroundColor: '#ea580c', borderColor: '#000000'}}>
                  <Scale className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-black uppercase" style={{color: '#000000'}}>Students & Educators</h3>
                <p className="text-gray-600 font-medium leading-relaxed">
                  Convert units for science projects, count words for essays, merge PDFs for assignments, write Markdown for documentation, and generate QR codes for presentations.
                </p>
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
              {/* Social Icons in Footer */}
              <div className="flex gap-4">
                <a href="#" className="w-10 h-10 bg-gray-800 flex items-center justify-center hover:bg-primary transition-colors text-white">
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/></svg>
                </a>
                <a href="#" className="w-10 h-10 bg-gray-800 flex items-center justify-center hover:bg-primary transition-colors text-white">
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                </a>
                <a href="#" className="w-10 h-10 bg-gray-800 flex items-center justify-center hover:bg-primary transition-colors text-white">
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                </a>
              </div>
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
