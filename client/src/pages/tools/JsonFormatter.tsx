import { useState } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Copy, Trash2, Check, FileJson, AlertCircle } from "lucide-react";
import { toast } from "sonner";
import { SeoHead } from "@/components/SeoHead";
import { ToolContent } from "@/components/ToolContent";

export default function JsonFormatter() {
  const [input, setInput] = useState("");
  const [error, setError] = useState<string | null>(null);

  const formatJson = () => {
    if (!input.trim()) return;
    try {
      const parsed = JSON.parse(input);
      setInput(JSON.stringify(parsed, null, 2));
      setError(null);
      toast.success("JSON formatted successfully");
    } catch (e) {
      setError((e as Error).message);
      toast.error("Invalid JSON");
    }
  };

  const minifyJson = () => {
    if (!input.trim()) return;
    try {
      const parsed = JSON.parse(input);
      setInput(JSON.stringify(parsed));
      setError(null);
      toast.success("JSON minified successfully");
    } catch (e) {
      setError((e as Error).message);
      toast.error("Invalid JSON");
    }
  };

  const copyToClipboard = () => {
    if (!input) return;
    navigator.clipboard.writeText(input);
    toast.success("Copied to clipboard");
  };

  const clearAll = () => {
    setInput("");
    setError(null);
  };

  return (
    <ToolLayout
      title="JSON Formatter"
      description="Validate, format, and minify your JSON data. Features syntax highlighting and error detection."
    >
      <SeoHead 
        title="Free JSON Formatter & Validator"
        description="Format, validate, and minify JSON online. Fix syntax errors, beautify code, and copy to clipboard instantly."
        keywords="json formatter, json validator, json beautifier, json minify, free json tool"
      />
      <div className="space-y-4">
        {/* Toolbar */}
        <div className="flex flex-wrap gap-2 items-center justify-between bg-gray-50 p-2 border-2 border-gray-100" style={{backgroundColor: '#f9fafb', borderColor: '#e5e7eb'}}>
          <div className="flex gap-2">
            <Button 
              onClick={formatJson}
              className="bg-black hover:bg-gray-800 text-white font-bold uppercase text-xs tracking-wider rounded-none h-10 px-4"
            >
              <FileJson className="mr-2 h-4 w-4" />
              Beautify
            </Button>
            <Button 
              onClick={minifyJson}
              variant="outline"
              className="bg-white hover:bg-gray-50 text-black font-bold uppercase text-xs tracking-wider rounded-none border-2 border-black h-10 px-4"
            >
              Minify
            </Button>
          </div>
          
          <div className="flex gap-2">
            <Button 
              onClick={copyToClipboard}
              variant="ghost"
              className="hover:bg-primary/10 hover:text-primary font-bold uppercase text-xs tracking-wider rounded-none h-10 px-4"
            >
              <Copy className="mr-2 h-4 w-4" />
              Copy
            </Button>
            <Button 
              onClick={clearAll}
              variant="ghost"
              className="hover:bg-red-50 hover:text-red-600 font-bold uppercase text-xs tracking-wider rounded-none h-10 px-4"
            >
              <Trash2 className="mr-2 h-4 w-4" />
              Clear
            </Button>
          </div>
        </div>

        {/* Editor Area */}
        <div className="relative">
          <Textarea
            value={input}
            onChange={(e) => {
              setInput(e.target.value);
              setError(null);
            }}
            placeholder="Paste your JSON here..."
            className={`
              min-h-[600px] font-mono text-sm p-6 rounded-none border-2 resize-y focus-visible:ring-0
              ${error ? "border-red-500 bg-red-50/10" : "border-black focus-visible:border-primary"}
            `}
            spellCheck={false}
            style={{borderColor: error ? '#ef4444' : '#000000', backgroundColor: error ? '#fef2f2' : '#ffffff', color: '#000000'}}
          />
          
          {error && (
            <div className="absolute bottom-4 left-4 right-4 bg-red-100 border-l-4 border-red-500 p-4 flex items-start gap-3 animate-in slide-in-from-bottom-2">
              <AlertCircle className="w-5 h-5 text-red-600 mt-0.5" />
              <div className="text-sm text-red-800 font-medium">
                <p className="font-bold uppercase text-xs mb-1">Syntax Error</p>
                {error}
              </div>
            </div>
          )}

          {!error && input && (
            <div className="absolute bottom-4 right-4 bg-green-100 border-l-4 border-green-500 px-4 py-2 flex items-center gap-2 animate-in fade-in">
              <Check className="w-4 h-4 text-green-600" />
              <span className="text-xs font-bold text-green-800 uppercase">Valid JSON</span>
            </div>
          )}
        </div>
      </div>

      <ToolContent 
        howTo={{
          title: "How to Format and Validate JSON",
          content: [
            "Paste your raw JSON code into the large text editor area.",
            "Click 'Beautify' to format the JSON with proper indentation and spacing (pretty-print).",
            "Click 'Minify' to remove all unnecessary whitespace and reduce the file size.",
            "If there are any syntax errors, they will be highlighted in red at the bottom of the editor.",
            "Once satisfied, click 'Copy' to save the formatted JSON to your clipboard."
          ]
        }}
        features={[
          {
            title: "Instant Error Detection",
            content: "Don't let a missing comma break your application. Our tool automatically validates your JSON syntax and provides clear, actionable error messages to help you fix issues fast."
          },
          {
            title: "Beautify & Minify",
            content: "Switch between human-readable 'Pretty' mode for debugging and compact 'Minified' mode for production deployment with a single click."
          },
          {
            title: "Privacy Focused",
            content: "Your data never leaves your browser. All formatting and validation happen locally on your device, so you can safely paste sensitive configuration files or API responses."
          },
          {
            title: "Large File Support",
            content: "Our optimized editor can handle large JSON payloads without freezing or crashing, making it perfect for inspecting massive API dumps or database exports."
          }
        ]}
        faqs={[
          {
            question: "What is JSON?",
            answer: "JSON (JavaScript Object Notation) is a lightweight data-interchange format that is easy for humans to read and write and easy for machines to parse and generate."
          },
          {
            question: "Why is my JSON invalid?",
            answer: "Common reasons include missing quotes around keys, trailing commas, or using single quotes instead of double quotes. Our tool highlights the exact position of the error to help you fix it."
          },
          {
            question: "Is my data sent to a server?",
            answer: "No. ToolBox Hub processes all data client-side using JavaScript. Your JSON code is never transmitted over the internet or stored on our servers."
          },
          {
            question: "Can I format other languages?",
            answer: "This specific tool is optimized for JSON only. However, since JSON is a subset of JavaScript, it can often help format JavaScript object literals as well."
          }
        ]}
      />
    </ToolLayout>
  );
}
