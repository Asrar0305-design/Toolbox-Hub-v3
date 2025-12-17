import { Link } from "wouter";
import { 
  ArrowRight, 
  Zap, 
  Shield, 
  Globe, 
  Code, 
  FileText, 
  Image as ImageIcon, 
  Lock, 
  CheckCircle,
  Cpu,
  Server,
  Users
} from "lucide-react";
import { SeoHead } from "@/components/SeoHead";

export default function Home() {
  return (
    <div className="min-h-screen bg-white text-black font-sans selection:bg-primary selection:text-white" style={{backgroundColor: '#ffffff', color: '#000000'}}>
      <SeoHead title="ToolBox Hub - Free Online Tools & Utilities" description="The ultimate collection of free online utilities. Convert images, manage PDFs, generate QR codes, and more. Built for speed, privacy, and simplicity." />
      
      {/* Header */}
      <header className="border-b-4 border-black bg-white sticky top-0 z-50" style={{borderColor: '#000000', backgroundColor: '#ffffff'}}>
        <div className="container mx-auto px-4 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-black text-white p-2" style={{backgroundColor: '#000000', color: '#ffffff'}}>
              <Zap className="w-6 h-6" />
            </div>
            <span className="font-black text-2xl tracking-tighter uppercase" style={{color: '#000000'}}>
              ToolBox<span className="text-primary" style={{color: '#ff6900'}}>.Hub</span>
            </span>
          </div>
          <nav className="hidden md:flex items-center gap-8 font-bold uppercase tracking-tight text-sm">
            <a href="#tools" className="hover:text-primary transition-colors" style={{color: '#000000'}}>Tools</a>
            <a href="#features" className="hover:text-primary transition-colors" style={{color: '#000000'}}>Features</a>
            <a href="#about" className="hover:text-primary transition-colors" style={{color: '#000000'}}>About</a>
            <Link href="/blog" className="hover:text-primary transition-colors" style={{color: '#000000'}}>Blog</Link>
          </nav>
          <a href="#tools" className="bg-black text-white px-6 py-2 font-bold uppercase text-sm hover:bg-primary transition-colors" style={{backgroundColor: '#000000', color: '#ffffff'}}>
            Get Started
          </a>
        </div>
      </header>

      <main>
        {/* Hero Section */}
        <section className="border-b-4 border-black py-20 md:py-32 relative overflow-hidden" style={{borderColor: '#000000'}}>
          <div className="absolute inset-0 opacity-5 pointer-events-none" 
               style={{backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '20px 20px'}}>
          </div>
          
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-4xl">
              <div className="inline-block bg-black text-white px-4 py-1 font-bold uppercase tracking-widest text-xs mb-6" style={{backgroundColor: '#000000', color: '#ffffff'}}>
                The Swiss Army Knife of the Web
              </div>
              <h1 className="text-6xl md:text-8xl font-black uppercase tracking-tighter leading-[0.9] mb-8" style={{color: '#000000'}}>
                Digital <br/>
                <span className="text-transparent stroke-text" style={{WebkitTextStroke: '2px #000', color: 'transparent'}}>Tools</span> <br/>
                For All.
              </h1>
              <p className="text-xl md:text-2xl font-medium text-gray-600 max-w-2xl mb-10 leading-relaxed">
                A comprehensive suite of high-performance online utilities. 
                <span className="text-black font-bold"> Free. Private. Instant.</span>
                <br/>No sign-up required.
              </p>
              <div className="flex flex-wrap gap-4">
                <a href="#tools" className="bg-primary text-white px-8 py-4 font-black uppercase tracking-wide text-lg border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:translate-y-1 hover:shadow-none transition-all flex items-center gap-2" style={{backgroundColor: '#ff6900', borderColor: '#000000', color: '#ffffff'}}>
                  Explore Tools <ArrowRight className="w-5 h-5" />
                </a>
                <Link href="/blog" className="bg-white text-black px-8 py-4 font-black uppercase tracking-wide text-lg border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:translate-y-1 hover:shadow-none transition-all" style={{backgroundColor: '#ffffff', borderColor: '#000000', color: '#000000'}}>
                  Read Blog
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Tools Grid */}
        <section id="tools" className="py-20 bg-gray-50" style={{backgroundColor: '#f9fafb'}}>
          <div className="container mx-auto px-4">
            <div className="flex items-end justify-between mb-12">
              <div>
                <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter mb-4" style={{color: '#000000'}}>
                  Our <span className="text-primary" style={{color: '#ff6900'}}>Utility Belt</span>
                </h2>
                <p className="text-gray-600 font-medium max-w-xl">
                  Everything you need to convert, generate, and optimize your digital assets.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Tool Cards */}
              {[
                { 
                  icon: ImageIcon, 
                  title: "Image Converter", 
                  desc: "Convert between PNG, JPG, WEBP formats instantly.",
                  href: "/tools/image-converter",
                  tag: "Popular"
                },
                { 
                  icon: FileText, 
                  title: "PDF Tools", 
                  desc: "Merge, split, and compress PDF documents securely.",
                  href: "/tools/pdf-tools",
                  tag: "Essential"
                },
                { 
                  icon: Code, 
                  title: "QR Generator", 
                  desc: "Create custom QR codes for links, text, and Wi-Fi.",
                  href: "/tools/qr-generator",
                  tag: "New"
                },
                { 
                  icon: Code, 
                  title: "JSON Formatter", 
                  desc: "Validate, format, and minify JSON data.",
                  href: "/tools/json-formatter",
                  tag: "Dev"
                },
                { 
                  icon: Lock, 
                  title: "Password Gen", 
                  desc: "Generate strong, secure passwords locally.",
                  href: "/tools/password-generator",
                  tag: "Security"
                },
                { 
                  icon: Globe, 
                  title: "Unit Converter", 
                  desc: "Convert length, weight, temperature and more.",
                  href: "/tools/unit-converter",
                  tag: "Utility"
                },
                { 
                  icon: FileText, 
                  title: "Word Counter", 
                  desc: "Count words, characters, and reading time.",
                  href: "/tools/word-counter",
                  tag: "Writing"
                },
                { 
                  icon: ImageIcon, 
                  title: "YT Thumbnail", 
                  desc: "Download high-quality thumbnails from YouTube.",
                  href: "/tools/youtube-thumbnail",
                  tag: "Media"
                }
              ].map((tool, i) => (
                <Link key={i} href={tool.href} className="group block">
                  <div className="bg-white border-4 border-black p-8 h-full transition-all duration-300 hover:-translate-y-2 hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] relative overflow-hidden" style={{borderColor: '#000000', backgroundColor: '#ffffff'}}>
                    <div className="absolute top-4 right-4 bg-gray-100 text-xs font-bold uppercase px-2 py-1 tracking-wider" style={{backgroundColor: '#f3f4f6', color: '#000000'}}>
                      {tool.tag}
                    </div>
                    <div className="bg-black text-white w-12 h-12 flex items-center justify-center mb-6 group-hover:bg-primary transition-colors" style={{backgroundColor: '#000000', color: '#ffffff'}}>
                      <tool.icon className="w-6 h-6" />
                    </div>
                    <h3 className="text-2xl font-black uppercase mb-3" style={{color: '#000000'}}>{tool.title}</h3>
                    <p className="text-gray-600 font-medium mb-6">{tool.desc}</p>
                    <div className="flex items-center gap-2 font-bold uppercase text-sm tracking-wide group-hover:text-primary transition-colors" style={{color: '#000000'}}>
                      Launch Tool <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Why Choose Us Section (Rich Content) */}
        <section id="features" className="py-20 border-t-4 border-black" style={{borderColor: '#000000'}}>
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-8" style={{color: '#000000'}}>
                  Built for <br/>
                  <span className="text-primary" style={{color: '#ff6900'}}>Performance.</span>
                </h2>
                <div className="space-y-8">
                  <div className="flex gap-6">
                    <div className="bg-black text-white p-4 h-fit" style={{backgroundColor: '#000000', color: '#ffffff'}}>
                      <Shield className="w-8 h-8" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-black uppercase mb-2" style={{color: '#000000'}}>Privacy First</h3>
                      <p className="text-gray-600 font-medium text-lg">
                        We believe your data belongs to you. Unlike other tools, we process your files locally in your browser whenever possible. No uploads, no cloud storage, no risk.
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-6">
                    <div className="bg-black text-white p-4 h-fit" style={{backgroundColor: '#000000', color: '#ffffff'}}>
                      <Zap className="w-8 h-8" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-black uppercase mb-2" style={{color: '#000000'}}>Lightning Fast</h3>
                      <p className="text-gray-600 font-medium text-lg">
                        Powered by WebAssembly and modern browser technologies, our tools deliver desktop-class performance without the install.
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-6">
                    <div className="bg-black text-white p-4 h-fit" style={{backgroundColor: '#000000', color: '#ffffff'}}>
                      <Globe className="w-8 h-8" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-black uppercase mb-2" style={{color: '#000000'}}>Always Free</h3>
                      <p className="text-gray-600 font-medium text-lg">
                        No paywalls, no subscriptions, no hidden fees. ToolBox Hub is committed to keeping essential digital utilities accessible to everyone.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-100 border-4 border-black p-8 md:p-12 relative" style={{backgroundColor: '#f3f4f6', borderColor: '#000000'}}>
                <div className="absolute -top-4 -right-4 bg-primary text-white px-6 py-2 font-black uppercase tracking-widest border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]" style={{backgroundColor: '#ff6900', borderColor: '#000000', color: '#ffffff'}}>
                  Tech Stack
                </div>
                <h3 className="text-3xl font-black uppercase mb-8" style={{color: '#000000'}}>Under the Hood</h3>
                <div className="grid grid-cols-2 gap-6">
                  <div className="bg-white p-6 border-2 border-black" style={{backgroundColor: '#ffffff', borderColor: '#000000'}}>
                    <Cpu className="w-8 h-8 mb-4 text-primary" style={{color: '#ff6900'}} />
                    <h4 className="font-bold uppercase mb-2" style={{color: '#000000'}}>WebAssembly</h4>
                    <p className="text-sm text-gray-600">Near-native execution speed for complex tasks.</p>
                  </div>
                  <div className="bg-white p-6 border-2 border-black" style={{backgroundColor: '#ffffff', borderColor: '#000000'}}>
                    <Server className="w-8 h-8 mb-4 text-primary" style={{color: '#ff6900'}} />
                    <h4 className="font-bold uppercase mb-2" style={{color: '#000000'}}>Client-Side</h4>
                    <p className="text-sm text-gray-600">Zero server latency. Instant feedback.</p>
                  </div>
                  <div className="bg-white p-6 border-2 border-black" style={{backgroundColor: '#ffffff', borderColor: '#000000'}}>
                    <Lock className="w-8 h-8 mb-4 text-primary" style={{color: '#ff6900'}} />
                    <h4 className="font-bold uppercase mb-2" style={{color: '#000000'}}>Secure</h4>
                    <p className="text-sm text-gray-600">Your sensitive data never leaves your device.</p>
                  </div>
                  <div className="bg-white p-6 border-2 border-black" style={{backgroundColor: '#ffffff', borderColor: '#000000'}}>
                    <Users className="w-8 h-8 mb-4 text-primary" style={{color: '#ff6900'}} />
                    <h4 className="font-bold uppercase mb-2" style={{color: '#000000'}}>Accessible</h4>
                    <p className="text-sm text-gray-600">Designed for all devices and screen sizes.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section (Rich Content for SEO) */}
        <section id="about" className="py-20 bg-black text-white" style={{backgroundColor: '#000000', color: '#ffffff'}}>
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter mb-12 text-center" style={{color: '#ffffff'}}>
                Frequently Asked <span className="text-primary" style={{color: '#ff6900'}}>Questions</span>
              </h2>
              
              <div className="space-y-6">
                {[
                  {
                    q: "Is ToolBox Hub really free?",
                    a: "Yes, 100%. We believe in democratizing access to digital tools. We are supported by unobtrusive advertising, allowing us to keep the service free for all users without requiring subscriptions."
                  },
                  {
                    q: "Is my data safe?",
                    a: "Absolutely. Security is our top priority. Unlike other converters that upload your files to a remote server, ToolBox Hub processes your files directly in your browser. Your photos, PDFs, and passwords never leave your computer."
                  },
                  {
                    q: "Do I need to install anything?",
                    a: "No. ToolBox Hub is a Progressive Web App (PWA). It runs entirely in your web browser (Chrome, Safari, Firefox, Edge) on any device—desktop, tablet, or mobile."
                  },
                  {
                    q: "Can I use these tools offline?",
                    a: "Many of our tools, like the Password Generator and Unit Converter, work offline once the page is loaded, thanks to our advanced caching technology."
                  }
                ].map((faq, i) => (
                  <div key={i} className="border-2 border-gray-800 p-8 hover:border-primary transition-colors" style={{borderColor: '#333'}}>
                    <h3 className="text-xl font-bold uppercase mb-4 flex items-center gap-3" style={{color: '#ffffff'}}>
                      <span className="text-primary" style={{color: '#ff6900'}}>Q.</span> {faq.q}
                    </h3>
                    <p className="text-gray-400 font-medium leading-relaxed pl-8">
                      {faq.a}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t-4 border-black py-12" style={{backgroundColor: '#ffffff', borderColor: '#000000'}}>
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center gap-2 mb-6">
                <div className="bg-black text-white p-2" style={{backgroundColor: '#000000', color: '#ffffff'}}>
                  <Zap className="w-5 h-5" />
                </div>
                <span className="font-black text-xl tracking-tighter uppercase" style={{color: '#000000'}}>
                  ToolBox<span className="text-primary" style={{color: '#ff6900'}}>.Hub</span>
                </span>
              </div>
              <p className="text-gray-600 font-medium max-w-sm mb-6">
                The ultimate collection of free online utilities. Built for speed, privacy, and simplicity.
              </p>
              <div className="flex gap-4">
                {/* Social Icons */}
                <a href="#" className="w-10 h-10 border-2 border-black flex items-center justify-center hover:bg-black hover:text-white transition-colors" style={{borderColor: '#000000', color: '#000000'}}>
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" /></svg>
                </a>
                <a href="#" className="w-10 h-10 border-2 border-black flex items-center justify-center hover:bg-black hover:text-white transition-colors" style={{borderColor: '#000000', color: '#000000'}}>
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" /></svg>
                </a>
                <a href="#" className="w-10 h-10 border-2 border-black flex items-center justify-center hover:bg-black hover:text-white transition-colors" style={{borderColor: '#000000', color: '#000000'}}>
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.468 2.373c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" /></svg>
                </a>
              </div>
            </div>
            
            <div>
              <h4 className="font-black uppercase mb-6" style={{color: '#000000'}}>Tools</h4>
              <ul className="space-y-3 text-sm font-bold text-gray-600 uppercase">
                <li><Link href="/tools/image-converter" className="hover:text-primary transition-colors" style={{color: '#4b5563'}}>Image Converter</Link></li>
                <li><Link href="/tools/pdf-tools" className="hover:text-primary transition-colors" style={{color: '#4b5563'}}>PDF Tools</Link></li>
                <li><Link href="/tools/qr-generator" className="hover:text-primary transition-colors" style={{color: '#4b5563'}}>QR Generator</Link></li>
                <li><Link href="/tools/password-generator" className="hover:text-primary transition-colors" style={{color: '#4b5563'}}>Password Generator</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-black uppercase mb-6" style={{color: '#000000'}}>Legal</h4>
              <ul className="space-y-3 text-sm font-bold text-gray-600 uppercase">
                <li><a href="#" className="hover:text-primary transition-colors" style={{color: '#4b5563'}}>Privacy Policy</a></li>
                <li><a href="#" className="hover:text-primary transition-colors" style={{color: '#4b5563'}}>Terms of Use</a></li>
                <li><a href="#" className="hover:text-primary transition-colors" style={{color: '#4b5563'}}>Contact Us</a></li>
                <li><a href="#" className="hover:text-primary transition-colors" style={{color: '#4b5563'}}>Cookie Policy</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t-2 border-gray-100 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm font-bold text-gray-400 uppercase">
              &copy; 2025 ToolBox Hub. All rights reserved.
            </p>
            <div className="flex items-center gap-2 text-sm font-bold text-gray-400 uppercase">
              <span>Designed with</span>
              <svg className="w-4 h-4 text-red-500" fill="currentColor" viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
              <span>for the web</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
