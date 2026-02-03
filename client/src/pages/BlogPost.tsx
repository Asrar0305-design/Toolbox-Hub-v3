import { Link, useRoute } from "wouter";
import { blogPosts } from "@/lib/blog-data";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CalendarIcon, Clock, User, ArrowLeft, Share2 } from "lucide-react";
import { Helmet } from "react-helmet";
import NotFound from "./NotFound";
import { SocialShare } from "@/components/SocialShare";

export default function BlogPost() {
  const [match, params] = useRoute("/blog/:slug");
  const slug = params?.slug;
  const post = blogPosts.find((p) => p.slug === slug);

  if (!match || !post) {
    return <NotFound />;
  }

  return (
    <div className="min-h-screen bg-background font-sans">
      <Helmet>
        <title>{post.title} - ToolBox Hub</title>
        <meta name="description" content={post.excerpt} />
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.excerpt} />
        <meta property="og:image" content={`https://www.webtoolboxhub.com${post.image}`} />
        <meta property="og:type" content="article" />
        <meta name="author" content={post.author} />
      </Helmet>

      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-md sticky top-0 z-50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/">
            <a className="flex items-center gap-2 font-bold text-xl text-primary">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-white">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-5 h-5"
                >
                  <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
                </svg>
              </div>
              ToolBox Hub
            </a>
          </Link>
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/"><a className="text-sm font-medium hover:text-primary transition-colors">Home</a></Link>
            <Link href="/about"><a className="text-sm font-medium hover:text-primary transition-colors">About</a></Link>
            <Link href="/blog"><a className="text-sm font-medium text-primary">Blog</a></Link>
          </nav>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <Link href="/blog">
            <a className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-8 transition-colors">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Blog
            </a>
          </Link>

          <article>
            <div className="mb-8">
              <Badge className="mb-4">{post.category}</Badge>
              <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-foreground mb-6 leading-tight">
                {post.title}
              </h1>
              
              <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground border-b pb-8">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                    <User className="w-4 h-4" />
                  </div>
                  <span className="font-medium text-foreground">{post.author}</span>
                </div>
                <div className="flex items-center gap-2">
                  <CalendarIcon className="w-4 h-4" />
                  {post.date}
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  {post.readTime}
                </div>
              </div>
            </div>

            <div className="aspect-video w-full overflow-hidden rounded-xl mb-10 bg-muted shadow-sm">
              <img
                src={post.image}
                alt={post.title}
                className="object-cover w-full h-full"
              />
            </div>

            <div 
              className="prose prose-lg max-w-none prose-headings:font-bold prose-headings:tracking-tight prose-a:text-primary prose-img:rounded-xl prose-strong:font-bold prose-strong:text-foreground"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          </article>

          <div className="mt-12 pt-8 border-t">
            <h3 className="text-lg font-semibold mb-4">Share this article</h3>
            <SocialShare 
              url={`https://www.webtoolboxhub.com/blog/${post.slug}`} 
              title={post.title} 
            />
          </div>

          {/* Related Posts */}
          <div className="mt-16 pt-8 border-t">
            <h3 className="text-2xl font-bold mb-8">Related Articles</h3>
            <div className="grid md:grid-cols-3 gap-6">
              {blogPosts
                .filter(p => p.slug !== post.slug && p.category === post.category)
                .slice(0, 3)
                .map(relatedPost => (
                  <Link key={relatedPost.slug} href={`/blog/${relatedPost.slug}`}>
                    <div className="group block bg-white rounded-xl border hover:shadow-lg transition-all overflow-hidden cursor-pointer">
                      <div className="aspect-video overflow-hidden">
                        <img 
                          src={relatedPost.image} 
                          alt={relatedPost.title}
                          className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <div className="p-4">
                        <Badge className="mb-2 text-xs">{relatedPost.category}</Badge>
                        <h4 className="font-bold text-sm mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                          {relatedPost.title}
                        </h4>
                        <p className="text-xs text-muted-foreground">{relatedPost.readTime}</p>
                      </div>
                    </div>
                  </Link>
                ))}
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t bg-white mt-20">
        <div className="container mx-auto px-4 py-8 text-center text-muted-foreground text-sm">
          <p>&copy; {new Date().getFullYear()} ToolBox Hub. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
