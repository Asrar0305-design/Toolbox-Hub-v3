import { Link } from "wouter";
import { blogPosts } from "@/lib/blog-data";
import { SeoHead } from "@/components/SeoHead";
import { ArrowRight, Calendar, User } from "lucide-react";

export default function Blog() {
  return (
    <div className="min-h-screen bg-white text-black font-sans selection:bg-primary selection:text-white" style={{backgroundColor: '#ffffff', color: '#000000'}}>
      <SeoHead 
        title="Tech Tips & Digital Guides - ToolBox Hub Blog"
        description="Read our latest articles on web productivity, digital security, and file optimization. Expert guides to help you get the most out of online tools."
      />
      
      <header className="border-b-4 border-black bg-white sticky top-0 z-50" style={{borderColor: '#000000', backgroundColor: '#ffffff'}}>
        <div className="container mx-auto px-4 h-20 flex items-center justify-between">
          <Link href="/" className="font-bold text-2xl tracking-tighter uppercase flex items-center gap-2" style={{color: '#000000'}}>
            ToolBox<span className="text-primary" style={{color: '#ff6900'}}>.Hub</span>
          </Link>
          <nav className="flex items-center gap-8 font-bold uppercase tracking-tight text-sm">
            <Link href="/" className="hover:text-primary transition-colors" style={{color: '#000000'}}>Home</Link>
            <Link href="/#tools" className="hover:text-primary transition-colors" style={{color: '#000000'}}>Tools</Link>
          </nav>
        </div>
      </header>

      <main className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto mb-16 text-center">
          <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter mb-6" style={{color: '#000000'}}>
            Our <span className="text-primary" style={{color: '#ff6900'}}>Blog</span>
          </h1>
          <p className="text-xl text-gray-600 font-medium max-w-2xl mx-auto">
            Insights, tutorials, and tips to boost your digital productivity and security.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <Link key={post.slug} href={`/blog/${post.slug}`} className="group block h-full">
              <article className="h-full bg-white border-4 border-black p-6 flex flex-col justify-between transition-all duration-300 hover:-translate-y-2 hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]" style={{borderColor: '#000000', backgroundColor: '#ffffff'}}>
                <div className="space-y-4">
                  <div className="flex flex-wrap gap-2">
                    {post.tags.map(tag => (
                      <span key={tag} className="bg-gray-100 text-xs font-bold uppercase px-2 py-1 tracking-wider" style={{backgroundColor: '#f3f4f6', color: '#000000'}}>
                        {tag}
                      </span>
                    ))}
                  </div>
                  <h2 className="text-2xl font-black uppercase leading-tight group-hover:text-primary transition-colors" style={{color: '#000000'}}>
                    {post.title}
                  </h2>
                  <p className="text-gray-600 line-clamp-3 font-medium">
                    {post.excerpt}
                  </p>
                </div>
                
                <div className="mt-6 pt-6 border-t-2 border-gray-100 flex items-center justify-between text-sm font-bold text-gray-500">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    {post.date}
                  </div>
                  <div className="flex items-center gap-1 uppercase text-black group-hover:text-primary transition-colors" style={{color: '#000000'}}>
                    Read <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </article>
            </Link>
          ))}
        </div>
      </main>

      <footer className="bg-black text-white py-12 border-t-4 border-black text-center" style={{backgroundColor: '#000000', color: '#ffffff', borderColor: '#000000'}}>
        <div className="container mx-auto px-4">
          <p className="font-medium text-gray-400">&copy; 2025 ToolBox Hub. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
