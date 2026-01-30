import { ArrowLeft } from "lucide-react";
import { Link } from "wouter";
import { cn } from "@/lib/utils";

interface ToolLayoutProps {
  title: string;
  description: string;
  children: React.ReactNode;
  className?: string;
}

export function ToolLayout({ title, description, children, className }: ToolLayoutProps) {
  return (
    <div className="min-h-screen bg-white text-black font-sans selection:bg-primary selection:text-white" style={{backgroundColor: '#ffffff', color: '#000000'}}>
      <header className="border-b-4 border-black bg-white sticky top-0 z-50" style={{borderColor: '#000000', backgroundColor: '#ffffff'}}>
        <div className="container mx-auto px-4 h-20 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="bg-black text-white p-2 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" style={{backgroundColor: '#000000', color: '#ffffff'}}>
              <ArrowLeft className="w-6 h-6" />
            </div>
            <span className="font-bold text-xl tracking-tighter uppercase hidden sm:inline-block group-hover:underline decoration-4 decoration-primary underline-offset-4" style={{color: '#000000'}}>
              Back to Hub
            </span>
          </Link>
          <div className="flex items-center gap-4">
            {/* ThemeToggle removed to enforce light mode */}
            <div className="font-bold text-2xl tracking-tighter uppercase" style={{color: '#000000'}}>
              ToolBox<span className="text-primary" style={{color: '#ff6900'}}>.Hub</span>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="mb-12 space-y-4">
            <h1 className="text-6xl md:text-8xl font-black tracking-tighter leading-[0.9] uppercase break-words" style={{color: '#000000'}}>
              {title}
              <span className="text-primary" style={{color: '#ff6900'}}>.</span>
            </h1>
            <p className="text-xl md:text-2xl font-medium text-muted-foreground max-w-2xl border-l-4 border-primary pl-6 py-2" style={{color: '#6b7280', borderColor: '#ff6900'}}>
              {description}
            </p>
          </div>

          {/* Top Ad Unit */}
          <div className="mb-8" id="top-ad-banner">
            {/* AdSense ad unit will be placed here */}
          </div>

          <div className={cn("bg-white border-4 border-black p-6 md:p-12 shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]", className)} style={{backgroundColor: '#ffffff', borderColor: '#000000'}}>
            {children}
          </div>

          {/* Bottom Ad Unit */}
          <div className="mt-12" id="bottom-ad-rect">
            {/* AdSense ad unit will be placed here */}
          </div>
        </div>
      </main>
    </div>
  );
}
