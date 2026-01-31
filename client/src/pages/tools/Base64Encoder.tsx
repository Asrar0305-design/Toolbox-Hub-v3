import { ToolLayout } from "@/components/ToolLayout";
import { Button } from "@/components/ui/button";
import { Binary, ArrowRightLeft, Copy, Check } from "lucide-react";
import { useState } from "react";

export default function Base64Encoder() {
  const [mode, setMode] = useState<'encode' | 'decode'>('encode');
  const [input, setInput] = useState<string>("");
  const [output, setOutput] = useState<string>("");
  const [copied, setCopied] = useState(false);

  const handleEncode = () => {
    try {
      const encoded = btoa(unescape(encodeURIComponent(input)));
      setOutput(encoded);
    } catch (error) {
      setOutput("Error: Invalid input for encoding");
    }
  };

  const handleDecode = () => {
    try {
      const decoded = decodeURIComponent(escape(atob(input)));
      setOutput(decoded);
    } catch (error) {
      setOutput("Error: Invalid Base64 string");
    }
  };

  const handleConvert = () => {
    if (mode === 'encode') {
      handleEncode();
    } else {
      handleDecode();
    }
  };

  const handleCopy = async () => {
    if (output) {
      await navigator.clipboard.writeText(output);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleSwitch = () => {
    setMode(mode === 'encode' ? 'decode' : 'encode');
    setInput(output);
    setOutput("");
  };

  const handleClear = () => {
    setInput("");
    setOutput("");
  };

  return (
    <ToolLayout
      title="Base64 Encoder/Decoder"
      description="Encode and decode Base64 data for APIs, data URIs, and secure data transmission."
      icon={Binary}
    >
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Mode Selector */}
        <div className="bg-white border-4 border-black p-6" style={{borderColor: '#000000', backgroundColor: '#ffffff'}}>
          <div className="flex gap-4">
            <Button
              onClick={() => setMode('encode')}
              className={`flex-1 border-4 border-black font-black uppercase py-6 text-lg ${
                mode === 'encode' 
                  ? 'bg-cyan-500 hover:bg-cyan-600 text-white' 
                  : 'bg-white hover:bg-gray-100 text-black'
              }`}
              style={{borderColor: '#000000'}}
            >
              Encode to Base64
            </Button>
            <Button
              onClick={() => setMode('decode')}
              className={`flex-1 border-4 border-black font-black uppercase py-6 text-lg ${
                mode === 'decode' 
                  ? 'bg-cyan-500 hover:bg-cyan-600 text-white' 
                  : 'bg-white hover:bg-gray-100 text-black'
              }`}
              style={{borderColor: '#000000'}}
            >
              Decode from Base64
            </Button>
          </div>
        </div>

        {/* Input/Output Section */}
        <div className="bg-white border-4 border-black p-8" style={{borderColor: '#000000', backgroundColor: '#ffffff'}}>
          <div className="space-y-4">
            <div>
              <label className="block font-black uppercase mb-2">
                {mode === 'encode' ? 'Text to Encode' : 'Base64 to Decode'}
              </label>
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={mode === 'encode' ? 'Enter text to encode...' : 'Enter Base64 string to decode...'}
                className="w-full h-40 p-4 border-4 border-black font-mono text-sm resize-none focus:outline-none focus:ring-2 focus:ring-cyan-500"
                style={{borderColor: '#000000'}}
              />
            </div>

            <div className="flex gap-4">
              <Button
                onClick={handleConvert}
                disabled={!input}
                className="flex-1 bg-cyan-500 hover:bg-cyan-600 text-white border-4 border-black font-black uppercase py-6 text-lg disabled:opacity-50 disabled:cursor-not-allowed"
                style={{borderColor: '#000000'}}
              >
                <Binary className="w-5 h-5 mr-2" />
                {mode === 'encode' ? 'Encode' : 'Decode'}
              </Button>
              <Button
                onClick={handleSwitch}
                disabled={!output}
                variant="outline"
                className="border-4 border-black font-black uppercase py-6 px-8 disabled:opacity-50 disabled:cursor-not-allowed"
                style={{borderColor: '#000000'}}
              >
                <ArrowRightLeft className="w-5 h-5" />
              </Button>
              <Button
                onClick={handleClear}
                variant="outline"
                className="border-4 border-black font-black uppercase py-6 px-8"
                style={{borderColor: '#000000'}}
              >
                Clear
              </Button>
            </div>

            {output && (
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="font-black uppercase">
                    {mode === 'encode' ? 'Base64 Output' : 'Decoded Text'}
                  </label>
                  <Button
                    onClick={handleCopy}
                    size="sm"
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
                </div>
                <textarea
                  value={output}
                  readOnly
                  className="w-full h-40 p-4 border-4 border-black font-mono text-sm resize-none bg-gray-50 focus:outline-none"
                  style={{borderColor: '#000000', backgroundColor: '#f9fafb'}}
                />
              </div>
            )}
          </div>
        </div>

        {/* Info Section */}
        <div className="bg-gray-50 border-4 border-black p-8" style={{borderColor: '#000000', backgroundColor: '#f9fafb'}}>
          <h3 className="text-xl font-black uppercase mb-4">What is Base64?</h3>
          <p className="text-gray-600 font-medium mb-4">
            Base64 is an encoding scheme that converts binary data into ASCII text format. 
            It's commonly used for encoding data in URLs, emails, and data URIs.
          </p>
          <h4 className="font-black uppercase mb-2 mt-6">Common Use Cases:</h4>
          <ul className="space-y-2 text-gray-600 font-medium">
            <li>• Embedding images in HTML/CSS as data URIs</li>
            <li>• Encoding authentication credentials for APIs</li>
            <li>• Transmitting binary data over text-based protocols</li>
            <li>• Storing complex data in URLs or cookies</li>
            <li>• Email attachments (MIME encoding)</li>
          </ul>
        </div>

        {/* Examples */}
        <div className="bg-white border-4 border-black p-8" style={{borderColor: '#000000', backgroundColor: '#ffffff'}}>
          <h3 className="text-xl font-black uppercase mb-4">Examples</h3>
          <div className="space-y-4">
            <div className="border-2 border-black p-4" style={{borderColor: '#000000'}}>
              <h4 className="font-black mb-2">Simple Text</h4>
              <p className="text-gray-600 font-medium mb-2">Input: <code className="bg-gray-100 px-2 py-1">Hello World</code></p>
              <p className="text-gray-600 font-medium">Output: <code className="bg-gray-100 px-2 py-1">SGVsbG8gV29ybGQ=</code></p>
            </div>
            <div className="border-2 border-black p-4" style={{borderColor: '#000000'}}>
              <h4 className="font-black mb-2">API Authentication</h4>
              <p className="text-gray-600 font-medium mb-2">Input: <code className="bg-gray-100 px-2 py-1">username:password</code></p>
              <p className="text-gray-600 font-medium">Output: <code className="bg-gray-100 px-2 py-1">dXNlcm5hbWU6cGFzc3dvcmQ=</code></p>
            </div>
          </div>
        </div>
      </div>
    </ToolLayout>
  );
}
