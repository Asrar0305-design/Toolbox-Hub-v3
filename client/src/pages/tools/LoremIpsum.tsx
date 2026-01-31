import { ToolLayout } from "@/components/ToolLayout";
import { Button } from "@/components/ui/button";
import { AlignLeft, Copy, Check, RefreshCw } from "lucide-react";
import { useState } from "react";

export default function LoremIpsum() {
  const [paragraphs, setParagraphs] = useState<number>(3);
  const [wordsPerParagraph, setWordsPerParagraph] = useState<number>(50);
  const [output, setOutput] = useState<string>("");
  const [copied, setCopied] = useState(false);

  const loremWords = [
    "lorem", "ipsum", "dolor", "sit", "amet", "consectetur", "adipiscing", "elit",
    "sed", "do", "eiusmod", "tempor", "incididunt", "ut", "labore", "et", "dolore",
    "magna", "aliqua", "enim", "ad", "minim", "veniam", "quis", "nostrud",
    "exercitation", "ullamco", "laboris", "nisi", "aliquip", "ex", "ea", "commodo",
    "consequat", "duis", "aute", "irure", "in", "reprehenderit", "voluptate",
    "velit", "esse", "cillum", "fugiat", "nulla", "pariatur", "excepteur", "sint",
    "occaecat", "cupidatat", "non", "proident", "sunt", "culpa", "qui", "officia",
    "deserunt", "mollit", "anim", "id", "est", "laborum", "semper", "tellus",
    "integer", "feugiat", "scelerisque", "varius", "morbi", "enim", "nunc",
    "faucibus", "vitae", "aliquet", "nec", "ullamcorper", "mattis", "pellentesque",
    "diam", "volutpat", "commodo", "viverra", "maecenas", "accumsan", "lacus",
    "vel", "facilisis", "volutpat", "est", "velit", "egestas", "dui", "sapien",
    "eget", "mi", "proin", "sed", "libero", "enim", "sed", "faucibus", "turpis"
  ];

  const generateParagraph = (wordCount: number): string => {
    const words: string[] = [];
    for (let i = 0; i < wordCount; i++) {
      const randomWord = loremWords[Math.floor(Math.random() * loremWords.length)];
      words.push(randomWord);
    }
    
    // Capitalize first letter
    if (words.length > 0) {
      words[0] = words[0].charAt(0).toUpperCase() + words[0].slice(1);
    }
    
    return words.join(' ') + '.';
  };

  const handleGenerate = () => {
    const paragraphArray: string[] = [];
    for (let i = 0; i < paragraphs; i++) {
      paragraphArray.push(generateParagraph(wordsPerParagraph));
    }
    setOutput(paragraphArray.join('\n\n'));
  };

  const handleCopy = async () => {
    if (output) {
      await navigator.clipboard.writeText(output);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleClear = () => {
    setOutput("");
  };

  return (
    <ToolLayout
      title="Lorem Ipsum Generator"
      description="Generate placeholder text for design mockups and layouts instantly."
      icon={AlignLeft}
    >
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Controls */}
        <div className="bg-white border-4 border-black p-8" style={{borderColor: '#000000', backgroundColor: '#ffffff'}}>
          <h2 className="text-2xl font-black uppercase mb-6">Generate Text</h2>
          
          <div className="space-y-6">
            {/* Paragraphs */}
            <div>
              <label className="block font-black uppercase mb-3">
                Number of Paragraphs: {paragraphs}
              </label>
              <input
                type="range"
                min="1"
                max="10"
                value={paragraphs}
                onChange={(e) => setParagraphs(Number(e.target.value))}
                className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer border-4 border-black"
                style={{borderColor: '#000000'}}
              />
              <div className="flex justify-between text-sm font-bold text-gray-600 mt-2">
                <span>1</span>
                <span>10</span>
              </div>
            </div>

            {/* Words per Paragraph */}
            <div>
              <label className="block font-black uppercase mb-3">
                Words per Paragraph: {wordsPerParagraph}
              </label>
              <input
                type="range"
                min="10"
                max="200"
                step="10"
                value={wordsPerParagraph}
                onChange={(e) => setWordsPerParagraph(Number(e.target.value))}
                className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer border-4 border-black"
                style={{borderColor: '#000000'}}
              />
              <div className="flex justify-between text-sm font-bold text-gray-600 mt-2">
                <span>10</span>
                <span>200</span>
              </div>
            </div>

            {/* Generate Button */}
            <Button
              onClick={handleGenerate}
              className="w-full bg-gray-700 hover:bg-gray-800 text-white border-4 border-black font-black uppercase py-6 text-lg"
              style={{borderColor: '#000000'}}
            >
              <RefreshCw className="w-5 h-5 mr-2" />
              Generate Lorem Ipsum
            </Button>
          </div>
        </div>

        {/* Output */}
        {output && (
          <div className="bg-white border-4 border-black p-8" style={{borderColor: '#000000', backgroundColor: '#ffffff'}}>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-black uppercase">Generated Text</h2>
              <div className="flex gap-2">
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
                      Copy
                    </>
                  )}
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
            
            <div className="p-6 border-4 border-black bg-gray-50 max-h-96 overflow-y-auto" style={{borderColor: '#000000', backgroundColor: '#f9fafb'}}>
              <div className="whitespace-pre-wrap font-medium text-gray-700 leading-relaxed">
                {output}
              </div>
            </div>

            <div className="mt-4 p-4 bg-blue-50 border-2 border-blue-500 text-blue-800 font-medium">
              <strong>Stats:</strong> {paragraphs} paragraph{paragraphs > 1 ? 's' : ''}, 
              ~{paragraphs * wordsPerParagraph} words, 
              ~{Math.round(paragraphs * wordsPerParagraph * 6)} characters
            </div>
          </div>
        )}

        {/* Info Section */}
        <div className="bg-gray-50 border-4 border-black p-8" style={{borderColor: '#000000', backgroundColor: '#f9fafb'}}>
          <h3 className="text-xl font-black uppercase mb-4">What is Lorem Ipsum?</h3>
          <p className="text-gray-600 font-medium mb-4">
            Lorem Ipsum is placeholder text commonly used in the graphic, print, and publishing industries 
            for previewing layouts and visual mockups. It's been the industry standard since the 1500s.
          </p>
          
          <h4 className="font-black uppercase mb-3 mt-6">Why Use Lorem Ipsum?</h4>
          <ul className="space-y-2 text-gray-600 font-medium">
            <li>• <strong>Focus on Design:</strong> Prevents readers from being distracted by readable content</li>
            <li>• <strong>Realistic Layout:</strong> Shows how text will look in the final design</li>
            <li>• <strong>Industry Standard:</strong> Universally recognized as placeholder text</li>
            <li>• <strong>Neutral Content:</strong> Doesn't distract from the visual design elements</li>
            <li>• <strong>Variable Length:</strong> Can be generated in any length needed</li>
          </ul>
        </div>

        {/* Use Cases */}
        <div className="bg-white border-4 border-black p-8" style={{borderColor: '#000000', backgroundColor: '#ffffff'}}>
          <h3 className="text-xl font-black uppercase mb-4">Perfect For</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="border-2 border-black p-4" style={{borderColor: '#000000'}}>
              <h4 className="font-black mb-2">Web Design</h4>
              <p className="text-gray-600 font-medium">Fill website mockups and prototypes with realistic text.</p>
            </div>
            <div className="border-2 border-black p-4" style={{borderColor: '#000000'}}>
              <h4 className="font-black mb-2">Print Design</h4>
              <p className="text-gray-600 font-medium">Preview brochures, magazines, and print layouts.</p>
            </div>
            <div className="border-2 border-black p-4" style={{borderColor: '#000000'}}>
              <h4 className="font-black mb-2">App Development</h4>
              <p className="text-gray-600 font-medium">Test UI components with placeholder content.</p>
            </div>
          </div>
        </div>

        {/* Quick Presets */}
        <div className="bg-white border-4 border-black p-8" style={{borderColor: '#000000', backgroundColor: '#ffffff'}}>
          <h3 className="text-xl font-black uppercase mb-4">Quick Presets</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button
              onClick={() => {
                setParagraphs(1);
                setWordsPerParagraph(30);
              }}
              variant="outline"
              className="border-2 border-black font-bold"
              style={{borderColor: '#000000'}}
            >
              Short
            </Button>
            <Button
              onClick={() => {
                setParagraphs(3);
                setWordsPerParagraph(50);
              }}
              variant="outline"
              className="border-2 border-black font-bold"
              style={{borderColor: '#000000'}}
            >
              Medium
            </Button>
            <Button
              onClick={() => {
                setParagraphs(5);
                setWordsPerParagraph(80);
              }}
              variant="outline"
              className="border-2 border-black font-bold"
              style={{borderColor: '#000000'}}
            >
              Long
            </Button>
            <Button
              onClick={() => {
                setParagraphs(10);
                setWordsPerParagraph(100);
              }}
              variant="outline"
              className="border-2 border-black font-bold"
              style={{borderColor: '#000000'}}
            >
              Very Long
            </Button>
          </div>
        </div>
      </div>
    </ToolLayout>
  );
}
