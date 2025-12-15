import { ArrowLeft } from "lucide-react";
import { Link } from "wouter";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/components/ThemeToggle";

interface ToolLayoutProps {
  title: string;
  description: string;
  children: React.ReactNode;
  className?: string;
}

export function ToolLayout({ title, description, children, className }: ToolLayoutProps) {
  return (
    <div className="min-h-screen bg-background text-foreground font-sans selection:bg-primary selection:text-white">
      <header className="border-b-4 border-black bg-white sticky top-0 z-50">
        <div className="container mx-auto px-4 h-20 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="bg-black text-white p-2 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1">
              <ArrowLeft className="w-6 h-6" />
            </div>
            <span className="font-bold text-xl tracking-tighter uppercase hidden sm:inline-block group-hover:underline decoration-4 decoration-primary underline-offset-4">
              Back to Hub
            </span>
          </Link>
          <div className="flex items-center gap-4">
            <ThemeToggle />
            <div className="font-bold text-2xl tracking-tighter uppercase">
              ToolBox<span className="text-primary">.Hub</span>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="mb-12 space-y-4">
            <h1 className="text-6xl md:text-8xl font-black tracking-tighter leading-[0.9] uppercase break-words">
              {title}
              <span className="text-primary">.</span>
            </h1>
            <p className="text-xl md:text-2xl font-medium text-muted-foreground max-w-2xl border-l-4 border-primary pl-6 py-2">
              {description}
            </p>
          </div>

          {/* Top Ad Unit */}
          <div className="mb-8 min-h-[100px] bg-gray-100 border-2 border-dashed border-gray-300 flex items-center justify-center text-muted-foreground text-sm uppercase font-bold tracking-widest">
            AdSense Space (Top Banner)
          </div>

          <div className={cn("bg-white border-4 border-black p-6 md:p-12 shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]", className)}>
            {children}
          </div>

          {/* Bottom Ad Unit */}
          <div className="mt-12 min-h-[250px] bg-gray-100 border-2 border-dashed border-gray-300 flex items-center justify-center text-muted-foreground text-sm uppercase font-bold tracking-widest">
            AdSense Space (Bottom Rect)
          </div>
        </div>
      </main>
    </div>
  );
}
