import { useState, useEffect } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Copy, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { SeoHead } from "@/components/SeoHead";
import { ToolContent } from "@/components/ToolContent";

export default function WordCounter() {
  const [text, setText] = useState("");
  const [stats, setStats] = useState({
    words: 0,
    characters: 0,
    sentences: 0,
    paragraphs: 0,
    readingTime: 0,
    speakingTime: 0
  });

  useEffect(() => {
    const words = text.trim() === "" ? 0 : text.trim().split(/\s+/).length;
    const characters = text.length;
    const sentences = text.trim() === "" ? 0 : text.split(/[.!?]+/).filter(Boolean).length;
    const paragraphs = text.trim() === "" ? 0 : text.split(/\n+/).filter(Boolean).length;
    
    // Average reading speed: 200 wpm, Speaking speed: 130 wpm
    const readingTime = Math.ceil(words / 200);
    const speakingTime = Math.ceil(words / 130);

    setStats({ words, characters, sentences, paragraphs, readingTime, speakingTime });
  }, [text]);

  const copyToClipboard = () => {
    if (!text) return;
    navigator.clipboard.writeText(text);
    toast.success("Text copied to clipboard");
  };

  const clearText = () => {
    setText("");
    toast.success("Text cleared");
  };

  return (
    <ToolLayout
      title="Word Counter"
      description="Count words, characters, sentences, and paragraphs in real-time. Estimate reading and speaking time."
    >
      <SeoHead 
        title="Free Word Counter & Character Count"
        description="Online word counter and character counter. Check text statistics, reading time, and sentence count instantly."
        keywords="word counter, character count, letter count, sentence counter, reading time calculator"
      />

      <div className="space-y-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-black text-white p-6 text-center border-4 border-black shadow-[4px_4px_0px_0px_rgba(255,79,0,1)]">
            <div className="text-4xl md:text-5xl font-black tracking-tighter">{stats.words}</div>
            <div className="text-sm font-bold uppercase tracking-widest text-primary mt-2" style={{color: '#ff6900'}}>Words</div>
          </div>
          <div className="bg-white p-6 text-center border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            <div className="text-4xl md:text-5xl font-black tracking-tighter" style={{color: '#000000'}}>{stats.characters}</div>
            <div className="text-sm font-bold uppercase tracking-widest text-gray-500 mt-2" style={{color: '#6b7280'}}>Characters</div>
          </div>
          <div className="bg-white p-6 text-center border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            <div className="text-4xl md:text-5xl font-black tracking-tighter" style={{color: '#000000'}}>{stats.sentences}</div>
            <div className="text-sm font-bold uppercase tracking-widest text-gray-500 mt-2" style={{color: '#6b7280'}}>Sentences</div>
          </div>
          <div className="bg-white p-6 text-center border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            <div className="text-4xl md:text-5xl font-black tracking-tighter" style={{color: '#000000'}}>{stats.paragraphs}</div>
            <div className="text-sm font-bold uppercase tracking-widest text-gray-500 mt-2" style={{color: '#6b7280'}}>Paragraphs</div>
          </div>
        </div>

        {/* Time Estimates */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-gray-100 p-4 border-2 border-gray-200 flex justify-between items-center" style={{backgroundColor: '#f3f4f6', borderColor: '#e5e7eb'}}>
            <span className="font-bold uppercase text-sm" style={{color: '#000000'}}>Reading Time</span>
            <span className="font-mono font-bold text-primary" style={{color: '#ff6900'}}>~{stats.readingTime} min</span>
          </div>
          <div className="bg-gray-100 p-4 border-2 border-gray-200 flex justify-between items-center" style={{backgroundColor: '#f3f4f6', borderColor: '#e5e7eb'}}>
            <span className="font-bold uppercase text-sm" style={{color: '#000000'}}>Speaking Time</span>
            <span className="font-mono font-bold text-primary" style={{color: '#ff6900'}}>~{stats.speakingTime} min</span>
          </div>
        </div>

        {/* Editor */}
        <div className="relative">
          <div className="absolute top-0 right-0 flex border-l-2 border-b-2 border-black z-10">
            <Button 
              onClick={copyToClipboard}
              variant="ghost"
              className="h-10 w-10 p-0 rounded-none hover:bg-primary hover:text-white transition-colors"
              title="Copy Text"
            >
              <Copy className="w-4 h-4" />
            </Button>
            <Button 
              onClick={clearText}
              variant="ghost"
              className="h-10 w-10 p-0 rounded-none hover:bg-red-500 hover:text-white transition-colors border-l border-gray-200"
              title="Clear Text"
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
          <Textarea 
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Type or paste your text here..."
            className="min-h-[400px] p-6 text-lg leading-relaxed resize-y border-4 border-black rounded-none focus-visible:ring-0 focus-visible:border-primary"
            style={{borderColor: '#000000', color: '#000000'}}
          />
        </div>
      </div>

      <ToolContent 
        howTo={{
          title: "How to Use the Word Counter",
          content: [
            "Start typing directly into the text box, or paste your document from another source.",
            "The counters above the text box will update instantly as you type.",
            "Check the 'Words' and 'Characters' boxes for basic length constraints.",
            "Review 'Sentences' and 'Paragraphs' to analyze the structure of your writing.",
            "Consult the 'Reading Time' and 'Speaking Time' estimates to gauge how long it will take to consume your content.",
            "Use the 'Copy' button to save your text, or 'Clear' to start over."
          ]
        }}
        features={[
          {
            title: "Real-Time Analysis",
            content: "No need to click a 'Count' button. Our tool analyzes your text keystroke-by-keystroke, giving you instant feedback on your writing progress."
          },
          {
            title: "Comprehensive Metrics",
            content: "Go beyond simple word counts. We track characters (with and without spaces), sentences, paragraphs, and even estimate reading/speaking times based on average human speeds."
          },
          {
            title: "Privacy Guaranteed",
            content: "Your text is processed entirely within your browser. We never store, save, or transmit your writing to any server, ensuring your drafts remain 100% private."
          },
          {
            title: "Distraction-Free Interface",
            content: "Our clean, minimalist design lets you focus on your writing. The large, readable typography and high-contrast layout make editing a breeze."
          }
        ]}
        faqs={[
          {
            question: "How is reading time calculated?",
            answer: "We calculate reading time based on an average reading speed of 200 words per minute. This is the standard metric used by most publishing platforms like Medium."
          },
          {
            question: "Does character count include spaces?",
            answer: "Yes, the main character count includes spaces. This is the standard metric for social media posts (like Tweets) and SMS messages."
          },
          {
            question: "Is there a limit to how much text I can check?",
            answer: "There is no hard limit imposed by our tool. You can paste entire book chapters or long essays. Performance depends only on your device's memory."
          },
          {
            question: "Can I use this for SEO content?",
            answer: "Absolutely. Word count is a key factor in SEO. Use our tool to ensure your blog posts and articles meet the recommended length requirements for search engines."
          }
        ]}
      />
    </ToolLayout>
  );
}
