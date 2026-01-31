import { ToolLayout } from "@/components/ToolLayout";
import { Button } from "@/components/ui/button";
import { FileEdit, Copy, Check, Download } from "lucide-react";
import { useState } from "react";

export default function MarkdownEditor() {
  const [markdown, setMarkdown] = useState<string>(`# Welcome to Markdown Editor

## What is Markdown?

Markdown is a **lightweight markup language** that you can use to add formatting elements to plaintext text documents.

### Features

- Easy to learn and use
- Clean and readable syntax
- Widely supported across platforms
- Perfect for documentation

### Code Example

\`\`\`javascript
function hello() {
  console.log("Hello, World!");
}
\`\`\`

### Links and Images

[Visit ToolBox Hub](https://www.webtoolboxhub.com)

> This is a blockquote. Great for highlighting important information!

**Try editing this text to see the live preview!**
`);
  const [copied, setCopied] = useState(false);

  // Simple markdown to HTML converter
  const convertMarkdownToHTML = (md: string): string => {
    let html = md;

    // Headers
    html = html.replace(/^### (.*$)/gim, '<h3 class="text-xl font-bold mb-2 mt-4">$1</h3>');
    html = html.replace(/^## (.*$)/gim, '<h2 class="text-2xl font-bold mb-3 mt-6">$1</h2>');
    html = html.replace(/^# (.*$)/gim, '<h1 class="text-3xl font-bold mb-4 mt-8">$1</h1>');

    // Bold
    html = html.replace(/\*\*(.*?)\*\*/g, '<strong class="font-bold">$1</strong>');
    html = html.replace(/__(.*?)__/g, '<strong class="font-bold">$1</strong>');

    // Italic
    html = html.replace(/\*(.*?)\*/g, '<em class="italic">$1</em>');
    html = html.replace(/_(.*?)_/g, '<em class="italic">$1</em>');

    // Links
    html = html.replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" class="text-blue-600 underline" target="_blank" rel="noopener">$1</a>');

    // Inline code
    html = html.replace(/`([^`]+)`/g, '<code class="bg-gray-200 px-2 py-1 rounded font-mono text-sm">$1</code>');

    // Code blocks
    html = html.replace(/```(\w+)?\n([\s\S]*?)```/g, '<pre class="bg-gray-900 text-gray-100 p-4 rounded my-4 overflow-x-auto"><code>$2</code></pre>');

    // Blockquotes
    html = html.replace(/^&gt; (.*$)/gim, '<blockquote class="border-l-4 border-gray-400 pl-4 italic my-4">$1</blockquote>');
    html = html.replace(/^> (.*$)/gim, '<blockquote class="border-l-4 border-gray-400 pl-4 italic my-4">$1</blockquote>');

    // Lists
    html = html.replace(/^\* (.*$)/gim, '<li class="ml-4">• $1</li>');
    html = html.replace(/^- (.*$)/gim, '<li class="ml-4">• $1</li>');

    // Line breaks
    html = html.replace(/\n\n/g, '</p><p class="mb-4">');
    html = '<p class="mb-4">' + html + '</p>';

    return html;
  };

  const handleCopy = async () => {
    await navigator.clipboard.writeText(markdown);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([markdown], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'document.md';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleClear = () => {
    setMarkdown("");
  };

  return (
    <ToolLayout
      title="Markdown Editor"
      description="Write and preview Markdown with live rendering. Perfect for documentation and README files."
      icon={FileEdit}
    >
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Toolbar */}
        <div className="bg-white border-4 border-black p-4" style={{borderColor: '#000000', backgroundColor: '#ffffff'}}>
          <div className="flex gap-4">
            <Button
              onClick={handleCopy}
              variant="outline"
              className="border-2 border-black font-bold"
              style={{borderColor: '#000000'}}
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 mr-2" />
                  Copied!
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 mr-2" />
                  Copy Markdown
                </>
              )}
            </Button>
            <Button
              onClick={handleDownload}
              variant="outline"
              className="border-2 border-black font-bold"
              style={{borderColor: '#000000'}}
            >
              <Download className="w-4 h-4 mr-2" />
              Download .md
            </Button>
            <Button
              onClick={handleClear}
              variant="outline"
              className="border-2 border-black font-bold"
              style={{borderColor: '#000000'}}
            >
              Clear
            </Button>
          </div>
        </div>

        {/* Editor and Preview */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Editor */}
          <div className="bg-white border-4 border-black p-6" style={{borderColor: '#000000', backgroundColor: '#ffffff'}}>
            <h2 className="text-xl font-black uppercase mb-4">Markdown Editor</h2>
            <textarea
              value={markdown}
              onChange={(e) => setMarkdown(e.target.value)}
              placeholder="Enter your markdown here..."
              className="w-full h-[600px] p-4 border-4 border-black font-mono text-sm resize-none focus:outline-none focus:ring-2 focus:ring-orange-500"
              style={{borderColor: '#000000'}}
            />
          </div>

          {/* Preview */}
          <div className="bg-white border-4 border-black p-6" style={{borderColor: '#000000', backgroundColor: '#ffffff'}}>
            <h2 className="text-xl font-black uppercase mb-4">Live Preview</h2>
            <div 
              className="w-full h-[600px] p-4 border-4 border-black overflow-y-auto bg-gray-50 prose prose-sm max-w-none"
              style={{borderColor: '#000000', backgroundColor: '#f9fafb'}}
              dangerouslySetInnerHTML={{ __html: convertMarkdownToHTML(markdown) }}
            />
          </div>
        </div>

        {/* Syntax Guide */}
        <div className="bg-gray-50 border-4 border-black p-8" style={{borderColor: '#000000', backgroundColor: '#f9fafb'}}>
          <h3 className="text-xl font-black uppercase mb-4">Markdown Syntax Guide</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-black mb-3">Headers</h4>
              <pre className="bg-white border-2 border-black p-3 font-mono text-sm" style={{borderColor: '#000000'}}>
{`# H1 Header
## H2 Header
### H3 Header`}
              </pre>
            </div>

            <div>
              <h4 className="font-black mb-3">Emphasis</h4>
              <pre className="bg-white border-2 border-black p-3 font-mono text-sm" style={{borderColor: '#000000'}}>
{`**bold text**
*italic text*
***bold and italic***`}
              </pre>
            </div>

            <div>
              <h4 className="font-black mb-3">Lists</h4>
              <pre className="bg-white border-2 border-black p-3 font-mono text-sm" style={{borderColor: '#000000'}}>
{`- Item 1
- Item 2
  - Nested item`}
              </pre>
            </div>

            <div>
              <h4 className="font-black mb-3">Links & Code</h4>
              <pre className="bg-white border-2 border-black p-3 font-mono text-sm" style={{borderColor: '#000000'}}>
{`[Link text](https://url.com)
\`inline code\`
> Blockquote`}
              </pre>
            </div>
          </div>
        </div>

        {/* Use Cases */}
        <div className="bg-white border-4 border-black p-8" style={{borderColor: '#000000', backgroundColor: '#ffffff'}}>
          <h3 className="text-xl font-black uppercase mb-4">Perfect For</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="border-2 border-black p-4" style={{borderColor: '#000000'}}>
              <h4 className="font-black mb-2">Documentation</h4>
              <p className="text-gray-600 font-medium">Create README files, API docs, and technical guides.</p>
            </div>
            <div className="border-2 border-black p-4" style={{borderColor: '#000000'}}>
              <h4 className="font-black mb-2">Blogging</h4>
              <p className="text-gray-600 font-medium">Write blog posts with clean, readable syntax.</p>
            </div>
            <div className="border-2 border-black p-4" style={{borderColor: '#000000'}}>
              <h4 className="font-black mb-2">Note-Taking</h4>
              <p className="text-gray-600 font-medium">Organize notes with headers, lists, and formatting.</p>
            </div>
          </div>
        </div>
      </div>
    </ToolLayout>
  );
}
