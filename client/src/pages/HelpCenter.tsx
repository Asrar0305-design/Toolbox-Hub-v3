import { ToolLayout } from "@/components/ToolLayout";
import { SeoHead } from "@/components/SeoHead";
import { Link } from "wouter";
import { 
  BookOpen, 
  FileImage, 
  FileText, 
  QrCode, 
  Lock, 
  Calculator, 
  Youtube,
  Code,
  HelpCircle,
  Mail
} from "lucide-react";

export default function HelpCenter() {
  const toolGuides = [
    {
      icon: FileImage,
      title: "Image Converter",
      description: "Learn how to convert images between PNG, JPG, WEBP, and other formats quickly and securely.",
      link: "/tools/image-converter"
    },
    {
      icon: FileText,
      title: "PDF Tools",
      description: "Master PDF merging, splitting, and organization with our comprehensive PDF toolkit.",
      link: "/tools/pdf-tools"
    },
    {
      icon: QrCode,
      title: "QR Code Generator",
      description: "Create custom QR codes for URLs, Wi-Fi networks, contact information, and more.",
      link: "/tools/qr-generator"
    },
    {
      icon: Code,
      title: "JSON Formatter",
      description: "Validate, beautify, and minify JSON data with advanced error checking and syntax highlighting.",
      link: "/tools/json-formatter"
    },
    {
      icon: Lock,
      title: "Password Generator",
      description: "Generate strong, secure passwords with customizable length and character requirements.",
      link: "/tools/password-generator"
    },
    {
      icon: Calculator,
      title: "Unit Converter",
      description: "Convert between different units of measurement including length, weight, temperature, and data.",
      link: "/tools/unit-converter"
    },
    {
      icon: Youtube,
      title: "YouTube Thumbnail Downloader",
      description: "Download high-quality thumbnails from any YouTube video in multiple resolutions.",
      link: "/tools/youtube-thumbnail"
    },
    {
      icon: BookOpen,
      title: "Word Counter",
      description: "Count words, characters, sentences, and estimate reading time for any text.",
      link: "/tools/word-counter"
    }
  ];

  const helpTopics = [
    {
      title: "Getting Started",
      description: "New to ToolBox Hub? Start here to learn the basics of using our platform and accessing our free tools.",
      articles: [
        "How to use ToolBox Hub",
        "Understanding client-side processing",
        "Browser compatibility guide",
        "Mobile device usage tips"
      ]
    },
    {
      title: "Privacy & Security",
      description: "Learn about our commitment to your privacy and how we keep your data secure.",
      articles: [
        "How we protect your data",
        "Understanding client-side processing",
        "Cookie policy explained",
        "Third-party integrations"
      ]
    },
    {
      title: "Tool Usage",
      description: "Detailed guides on how to use each of our tools effectively.",
      articles: [
        "Image format comparison guide",
        "PDF best practices",
        "Creating effective QR codes",
        "JSON syntax basics"
      ]
    },
    {
      title: "Troubleshooting",
      description: "Having issues? Find solutions to common problems and error messages.",
      articles: [
        "Tool not loading properly",
        "File upload issues",
        "Browser compatibility problems",
        "Performance optimization tips"
      ]
    }
  ];

  return (
    <ToolLayout
      title="Help Center"
      description="Everything you need to know about using ToolBox Hub effectively."
    >
      <SeoHead 
        title="Help Center - ToolBox Hub"
        description="Comprehensive guides, tutorials, and documentation for all ToolBox Hub tools and features. Get help with image conversion, PDF tools, QR codes, and more."
      />

      <div className="space-y-16">
        {/* Introduction */}
        <div className="prose prose-lg max-w-none">
          <p className="text-xl text-muted-foreground">
            Welcome to the ToolBox Hub Help Center. Here you'll find comprehensive guides, tutorials, and answers to help you make the most of our free online utilities. 
            Whether you're a first-time user or looking to master advanced features, we've got you covered.
          </p>
        </div>

        {/* Quick Links */}
        <div className="grid gap-6 md:grid-cols-2">
          <Link href="/faq">
            <a className="block p-8 border-4 border-black bg-white hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-all group">
              <HelpCircle className="w-12 h-12 mb-4 text-primary group-hover:scale-110 transition-transform" />
              <h3 className="text-2xl font-bold uppercase mb-2 group-hover:text-primary transition-colors">FAQ</h3>
              <p className="text-muted-foreground">
                Quick answers to the most frequently asked questions about our services and tools.
              </p>
            </a>
          </Link>

          <Link href="/contact">
            <a className="block p-8 border-4 border-black bg-white hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-all group">
              <Mail className="w-12 h-12 mb-4 text-primary group-hover:scale-110 transition-transform" />
              <h3 className="text-2xl font-bold uppercase mb-2 group-hover:text-primary transition-colors">Contact Support</h3>
              <p className="text-muted-foreground">
                Can't find what you're looking for? Our support team is here to help you.
              </p>
            </a>
          </Link>
        </div>

        {/* Tool Guides */}
        <div className="space-y-6">
          <div>
            <h2 className="text-3xl font-black uppercase tracking-tighter border-b-4 border-black pb-2 inline-block mb-6">
              Tool Guides
            </h2>
            <p className="text-lg text-muted-foreground">
              Detailed documentation for each of our tools to help you work more efficiently.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {toolGuides.map((guide, index) => {
              const Icon = guide.icon;
              return (
                <Link key={index} href={guide.link}>
                  <a className="block p-6 border-4 border-black bg-white hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-all group">
                    <Icon className="w-10 h-10 mb-3 text-primary group-hover:scale-110 transition-transform" />
                    <h3 className="text-lg font-bold uppercase mb-2 group-hover:text-primary transition-colors">
                      {guide.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {guide.description}
                    </p>
                  </a>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Help Topics */}
        <div className="space-y-6">
          <div>
            <h2 className="text-3xl font-black uppercase tracking-tighter border-b-4 border-black pb-2 inline-block mb-6">
              Help Topics
            </h2>
            <p className="text-lg text-muted-foreground">
              Browse articles organized by category to find the information you need.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {helpTopics.map((topic, index) => (
              <div key={index} className="p-8 border-4 border-black bg-white">
                <h3 className="text-2xl font-bold uppercase mb-3">{topic.title}</h3>
                <p className="text-muted-foreground mb-6">{topic.description}</p>
                <ul className="space-y-3">
                  {topic.articles.map((article, articleIndex) => (
                    <li key={articleIndex} className="flex items-start gap-2">
                      <span className="text-primary font-bold mt-1">→</span>
                      <span className="text-sm hover:text-primary cursor-pointer transition-colors">
                        {article}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Common Use Cases */}
        <div className="space-y-6">
          <div>
            <h2 className="text-3xl font-black uppercase tracking-tighter border-b-4 border-black pb-2 inline-block mb-6">
              Common Use Cases
            </h2>
          </div>

          <div className="prose prose-lg max-w-none">
            <div className="grid gap-8 md:grid-cols-2">
              <div className="p-6 border-l-4 border-primary bg-gray-50">
                <h4 className="font-bold text-lg mb-2">For Designers</h4>
                <p className="text-muted-foreground text-sm">
                  Convert images for web optimization, generate QR codes for portfolios, and create secure passwords for client accounts. 
                  Our tools help designers streamline their workflow without leaving the browser.
                </p>
              </div>

              <div className="p-6 border-l-4 border-primary bg-gray-50">
                <h4 className="font-bold text-lg mb-2">For Developers</h4>
                <p className="text-muted-foreground text-sm">
                  Format and validate JSON data, generate secure API keys, convert units for calculations, and process images for applications. 
                  All tools work client-side for maximum security and speed.
                </p>
              </div>

              <div className="p-6 border-l-4 border-primary bg-gray-50">
                <h4 className="font-bold text-lg mb-2">For Content Creators</h4>
                <p className="text-muted-foreground text-sm">
                  Download YouTube thumbnails for reference, count words for articles, convert images for social media, and generate QR codes for video descriptions. 
                  Create content faster with our suite of utilities.
                </p>
              </div>

              <div className="p-6 border-l-4 border-primary bg-gray-50">
                <h4 className="font-bold text-lg mb-2">For Business Professionals</h4>
                <p className="text-muted-foreground text-sm">
                  Merge PDFs for reports, generate secure passwords for teams, create QR codes for marketing materials, and convert units for international business. 
                  Professional tools without the enterprise price tag.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Tips & Best Practices */}
        <div className="space-y-6">
          <div>
            <h2 className="text-3xl font-black uppercase tracking-tighter border-b-4 border-black pb-2 inline-block mb-6">
              Tips & Best Practices
            </h2>
          </div>

          <div className="space-y-4">
            <div className="p-6 border-4 border-black bg-white">
              <h4 className="font-bold text-lg mb-2 flex items-center gap-2">
                <span className="text-primary">💡</span> Use Modern Browsers
              </h4>
              <p className="text-muted-foreground">
                For the best experience, use the latest version of Chrome, Firefox, Safari, or Edge. Modern browsers support WebAssembly and advanced JavaScript features that power our tools.
              </p>
            </div>

            <div className="p-6 border-4 border-black bg-white">
              <h4 className="font-bold text-lg mb-2 flex items-center gap-2">
                <span className="text-primary">💡</span> Bookmark Your Favorites
              </h4>
              <p className="text-muted-foreground">
                If you use certain tools frequently, bookmark them directly for quick access. Each tool has its own URL that you can save to your browser's bookmarks bar.
              </p>
            </div>

            <div className="p-6 border-4 border-black bg-white">
              <h4 className="font-bold text-lg mb-2 flex items-center gap-2">
                <span className="text-primary">💡</span> Your Data Stays Private
              </h4>
              <p className="text-muted-foreground">
                Remember that most of our tools process data entirely in your browser. Your files never leave your device, so you can safely use our tools for sensitive documents without privacy concerns.
              </p>
            </div>

            <div className="p-6 border-4 border-black bg-white">
              <h4 className="font-bold text-lg mb-2 flex items-center gap-2">
                <span className="text-primary">💡</span> Share With Your Team
              </h4>
              <p className="text-muted-foreground">
                ToolBox Hub is completely free and requires no registration. Share our URL with colleagues, friends, and team members so they can benefit from our tools too.
              </p>
            </div>
          </div>
        </div>

        {/* Still Need Help */}
        <div className="bg-gray-100 p-8 md:p-12 text-center border-4 border-black">
          <h3 className="text-2xl font-bold uppercase mb-4">Still Need Help?</h3>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            If you can't find the answer you're looking for in our help center, our support team is ready to assist you. 
            We typically respond within 24 hours.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact">
              <a className="inline-block bg-black text-white font-bold uppercase tracking-wider py-4 px-8 hover:bg-primary transition-colors">
                Contact Support
              </a>
            </Link>
            <Link href="/faq">
              <a className="inline-block bg-white text-black font-bold uppercase tracking-wider py-4 px-8 border-4 border-black hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all">
                View FAQ
              </a>
            </Link>
          </div>
        </div>
      </div>
    </ToolLayout>
  );
}
