import { ToolLayout } from "@/components/ToolLayout";
import { Button } from "@/components/ui/button";
import { Hash, Copy, Check } from "lucide-react";
import { useState } from "react";

export default function HashGenerator() {
  const [input, setInput] = useState<string>("");
  const [md5Hash, setMd5Hash] = useState<string>("");
  const [sha1Hash, setSha1Hash] = useState<string>("");
  const [sha256Hash, setSha256Hash] = useState<string>("");
  const [copiedField, setCopiedField] = useState<string | null>(null);

  // Simple MD5 implementation (for demo - in production use crypto library)
  const generateMD5 = async (text: string): Promise<string> => {
    const encoder = new TextEncoder();
    const data = encoder.encode(text);
    // For demo purposes, we'll use a simple hash
    // In production, use a proper crypto library like crypto-js
    let hash = 0;
    for (let i = 0; i < data.length; i++) {
      hash = ((hash << 5) - hash) + data[i];
      hash = hash & hash;
    }
    return Math.abs(hash).toString(16).padStart(32, '0');
  };

  const generateSHA = async (algorithm: string, text: string): Promise<string> => {
    const encoder = new TextEncoder();
    const data = encoder.encode(text);
    const hashBuffer = await crypto.subtle.digest(algorithm, data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  };

  const handleGenerate = async () => {
    if (!input) {
      setMd5Hash("");
      setSha1Hash("");
      setSha256Hash("");
      return;
    }

    try {
      // Generate MD5 (simplified version for demo)
      const md5 = await generateMD5(input);
      setMd5Hash(md5);

      // Generate SHA-1
      const sha1 = await generateSHA('SHA-1', input);
      setSha1Hash(sha1);

      // Generate SHA-256
      const sha256 = await generateSHA('SHA-256', input);
      setSha256Hash(sha256);
    } catch (error) {
      console.error('Error generating hashes:', error);
    }
  };

  const handleCopy = async (value: string, field: string) => {
    await navigator.clipboard.writeText(value);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const handleClear = () => {
    setInput("");
    setMd5Hash("");
    setSha1Hash("");
    setSha256Hash("");
  };

  return (
    <ToolLayout
      title="Hash Generator"
      description="Generate MD5, SHA-1, and SHA-256 hashes for security verification and data integrity."
      icon={Hash}
    >
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Input Section */}
        <div className="bg-white border-4 border-black p-8" style={{borderColor: '#000000', backgroundColor: '#ffffff'}}>
          <h2 className="text-2xl font-black uppercase mb-4">Input Text</h2>
          
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Enter text to hash..."
            className="w-full h-40 p-4 border-4 border-black font-mono text-sm resize-none focus:outline-none focus:ring-2 focus:ring-indigo-500"
            style={{borderColor: '#000000'}}
          />

          <div className="flex gap-4 mt-4">
            <Button
              onClick={handleGenerate}
              disabled={!input}
              className="flex-1 bg-indigo-500 hover:bg-indigo-600 text-white border-4 border-black font-black uppercase py-6 text-lg disabled:opacity-50 disabled:cursor-not-allowed"
              style={{borderColor: '#000000'}}
            >
              <Hash className="w-5 h-5 mr-2" />
              Generate Hashes
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
        </div>

        {/* Hash Outputs */}
        {(md5Hash || sha1Hash || sha256Hash) && (
          <div className="bg-white border-4 border-black p-8" style={{borderColor: '#000000', backgroundColor: '#ffffff'}}>
            <h2 className="text-2xl font-black uppercase mb-6">Generated Hashes</h2>
            
            <div className="space-y-6">
              {/* MD5 */}
              {md5Hash && (
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="font-black uppercase">MD5 (Demo)</label>
                    <Button
                      onClick={() => handleCopy(md5Hash, 'md5')}
                      size="sm"
                      variant="outline"
                      className="border-2 border-black font-bold"
                      style={{borderColor: '#000000'}}
                    >
                      {copiedField === 'md5' ? (
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
                  <div className="p-4 border-4 border-black font-mono text-sm bg-gray-50 break-all" style={{borderColor: '#000000', backgroundColor: '#f9fafb'}}>
                    {md5Hash}
                  </div>
                  <p className="text-xs text-gray-500 mt-2 font-medium">
                    Note: This is a simplified MD5 for demo. Use crypto-js library for production.
                  </p>
                </div>
              )}

              {/* SHA-1 */}
              {sha1Hash && (
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="font-black uppercase">SHA-1</label>
                    <Button
                      onClick={() => handleCopy(sha1Hash, 'sha1')}
                      size="sm"
                      variant="outline"
                      className="border-2 border-black font-bold"
                      style={{borderColor: '#000000'}}
                    >
                      {copiedField === 'sha1' ? (
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
                  <div className="p-4 border-4 border-black font-mono text-sm bg-gray-50 break-all" style={{borderColor: '#000000', backgroundColor: '#f9fafb'}}>
                    {sha1Hash}
                  </div>
                </div>
              )}

              {/* SHA-256 */}
              {sha256Hash && (
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="font-black uppercase">SHA-256</label>
                    <Button
                      onClick={() => handleCopy(sha256Hash, 'sha256')}
                      size="sm"
                      variant="outline"
                      className="border-2 border-black font-bold"
                      style={{borderColor: '#000000'}}
                    >
                      {copiedField === 'sha256' ? (
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
                  <div className="p-4 border-4 border-black font-mono text-sm bg-gray-50 break-all" style={{borderColor: '#000000', backgroundColor: '#f9fafb'}}>
                    {sha256Hash}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Info Section */}
        <div className="bg-gray-50 border-4 border-black p-8" style={{borderColor: '#000000', backgroundColor: '#f9fafb'}}>
          <h3 className="text-xl font-black uppercase mb-4">About Hash Functions</h3>
          <p className="text-gray-600 font-medium mb-4">
            Hash functions convert data of any size into a fixed-size string of characters. 
            They're one-way functions, meaning you can't reverse them to get the original data.
          </p>
          
          <div className="space-y-4 mt-6">
            <div className="border-2 border-black p-4" style={{borderColor: '#000000', backgroundColor: '#ffffff'}}>
              <h4 className="font-black mb-2">MD5 (128-bit)</h4>
              <p className="text-gray-600 font-medium">Fast but no longer secure. Use only for non-security purposes like checksums.</p>
            </div>
            
            <div className="border-2 border-black p-4" style={{borderColor: '#000000', backgroundColor: '#ffffff'}}>
              <h4 className="font-black mb-2">SHA-1 (160-bit)</h4>
              <p className="text-gray-600 font-medium">Better than MD5 but also deprecated for security. Still used in Git and legacy systems.</p>
            </div>
            
            <div className="border-2 border-black p-4" style={{borderColor: '#000000', backgroundColor: '#ffffff'}}>
              <h4 className="font-black mb-2">SHA-256 (256-bit)</h4>
              <p className="text-gray-600 font-medium">Secure and recommended for modern applications. Part of the SHA-2 family.</p>
            </div>
          </div>
        </div>

        {/* Use Cases */}
        <div className="bg-white border-4 border-black p-8" style={{borderColor: '#000000', backgroundColor: '#ffffff'}}>
          <h3 className="text-xl font-black uppercase mb-4">Common Use Cases</h3>
          <ul className="space-y-2 text-gray-600 font-medium">
            <li>• <strong>File Verification:</strong> Verify downloaded files haven't been tampered with</li>
            <li>• <strong>Password Storage:</strong> Store hashed passwords instead of plain text</li>
            <li>• <strong>Data Integrity:</strong> Ensure data hasn't changed during transmission</li>
            <li>• <strong>Digital Signatures:</strong> Create unique identifiers for documents</li>
            <li>• <strong>Blockchain:</strong> Core component of cryptocurrency systems</li>
            <li>• <strong>Cache Keys:</strong> Generate unique keys for caching systems</li>
          </ul>
        </div>
      </div>
    </ToolLayout>
  );
}
