import { Link, useRoute } from "wouter";
import { blogPosts } from "@/lib/blog-data";
import { SeoHead } from "@/components/SeoHead";
import { ArrowLeft, Calendar, User, Tag } from "lucide-react";
import NotFound from "./NotFound";

export default function BlogPost() {
  const [match, params] = useRoute("/blog/:slug");
  const post = blogPosts.find(p => p.id === params?.slug);

  if (!post) return <NotFound />;

  return (
    <div className="min-h-screen bg-white text-black font-sans selection:bg-primary selection:text-white" style={{backgroundColor: '#ffffff', color: '#000000'}}>
      <SeoHead 
        title={`${post.title} - ToolBox Hub Blog`}
        description={post.excerpt}
      />
      
      <header className="border-b-4 border-black bg-white sticky top-0 z-50" style={{borderColor: '#000000', backgroundColor: '#ffffff'}}>
        <div className="container mx-auto px-4 h-20 flex items-center justify-between">
          <Link href="/blog" className="flex items-center gap-2 group font-bold uppercase tracking-tight text-sm">
            <div className="bg-black text-white p-2 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" style={{backgroundColor: '#000000', color: '#ffffff'}}>
              <ArrowLeft className="w-4 h-4" />
            </div>
            <span style={{color: '#000000'}}>Back to Blog</span>
          </Link>
          <Link href="/" className="font-bold text-xl tracking-tighter uppercase" style={{color: '#000000'}}>
            ToolBox<span className="text-primary" style={{color: '#ff6900'}}>.Hub</span>
          </Link>
        </div>
      </header>

      <main className="container mx-auto px-4 py-16">
        <article className="max-w-3xl mx-auto">
          <header className="mb-12 space-y-6 text-center">
            <div className="flex flex-wrap justify-center gap-2">
              {post.tags.map(tag => (
                <span key={tag} className="bg-primary text-white text-sm font-bold uppercase px-3 py-1 tracking-wider" style={{backgroundColor: '#ff6900', color: '#ffffff'}}>
                  {tag}
                </span>
              ))}
            </div>
            <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter leading-tight" style={{color: '#000000'}}>
              {post.title}
            </h1>
            <div className="flex items-center justify-center gap-6 text-gray-500 font-bold text-sm uppercase tracking-wide">
              <div className="flex items-center gap-2">
                <User className="w-4 h-4" />
                {post.author}
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                {post.date}
              </div>
            </div>
          </header>

          {/* AdSense Top */}
          <div className="mb-12 min-h-[100px] bg-gray-100 border-2 border-dashed border-gray-300 flex items-center justify-center text-gray-400 text-sm uppercase font-bold tracking-widest">
            AdSense Space
          </div>

          <div 
            className="prose prose-lg prose-neutral max-w-none font-medium prose-headings:font-black prose-headings:uppercase prose-headings:tracking-tight prose-a:text-primary prose-img:border-4 prose-img:border-black prose-img:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          {/* AdSense Bottom */}
          <div className="mt-12 min-h-[250px] bg-gray-100 border-2 border-dashed border-gray-300 flex items-center justify-center text-gray-400 text-sm uppercase font-bold tracking-widest">
            AdSense Space
          </div>
        </article>
      </main>

      <footer className="bg-black text-white py-12 border-t-4 border-black text-center" style={{backgroundColor: '#000000', color: '#ffffff', borderColor: '#000000'}}>
        <div className="container mx-auto px-4">
          <p className="font-medium text-gray-400">&copy; 2025 ToolBox Hub. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
