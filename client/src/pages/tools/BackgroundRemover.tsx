import { ToolLayout } from "@/components/ToolLayout";
import { Button } from "@/components/ui/button";
import { Eraser, Upload, Download, X } from "lucide-react";
import { useState, useRef } from "react";
import { removeBackground } from "@imgly/background-removal";

export default function BackgroundRemover() {
  const [originalImage, setOriginalImage] = useState<string | null>(null);
  const [processedImage, setProcessedImage] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string>("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState<string>("");
  const [error, setError] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      setFileName(file.name);
      const reader = new FileReader();
      reader.onload = (event) => {
        setOriginalImage(event.target?.result as string);
        setProcessedImage(null);
        setError("");
      };
      reader.readAsDataURL(file);
    }
  };

  const removeBackground = async () => {
    if (!originalImage) return;
    
    setIsProcessing(true);
    setError("");
    setProgress("Loading AI model...");
    
    try {
      // Convert data URL to Blob
      const response = await fetch(originalImage);
      const blob = await response.blob();
      
      setProgress("Processing image...");
      
      // Remove background using @imgly/background-removal
      const resultBlob = await removeBackground(blob, {
        progress: (key, current, total) => {
          const percentage = Math.round((current / total) * 100);
          setProgress(`${key}: ${percentage}%`);
        }
      });
      
      // Convert result blob to data URL
      const resultUrl = URL.createObjectURL(resultBlob);
      setProcessedImage(resultUrl);
      setProgress("Complete!");
      setIsProcessing(false);
    } catch (err) {
      console.error('Error removing background:', err);
      setError(err instanceof Error ? err.message : 'Failed to remove background');
      setIsProcessing(false);
      setProgress("");
    }
  };

  const downloadImage = () => {
    if (!processedImage) return;
    
    const link = document.createElement('a');
    link.href = processedImage;
    link.download = fileName.replace(/\.[^/.]+$/, '') + '_no_bg.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const reset = () => {
    setOriginalImage(null);
    setProcessedImage(null);
    setFileName("");
    setProgress("");
    setError("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <ToolLayout
      title="Background Remover"
      description="Remove backgrounds from images using AI - completely free and runs in your browser."
      icon={Eraser}
    >
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Upload Section */}
        <div className="bg-white border-4 border-black p-8" style={{borderColor: '#000000', backgroundColor: '#ffffff'}}>
          <h2 className="text-2xl font-black uppercase mb-4">Upload Image</h2>
          
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileSelect}
            className="hidden"
            id="background-remover-upload"
          />
          
          {!originalImage ? (
            <label
              htmlFor="background-remover-upload"
              className="flex flex-col items-center justify-center border-4 border-dashed border-black p-12 cursor-pointer hover:bg-gray-50 transition-colors"
              style={{borderColor: '#000000'}}
            >
              <Upload className="w-16 h-16 mb-4 text-purple-500" />
              <p className="text-lg font-bold mb-2">Click to upload an image</p>
              <p className="text-gray-600 font-medium">Supports PNG, JPG, WEBP</p>
              <p className="text-sm text-gray-500 mt-2">Processing happens in your browser - 100% private</p>
            </label>
          ) : (
            <div className="space-y-6">
              <div className="flex items-center justify-between bg-gray-100 border-2 border-black p-4" style={{borderColor: '#000000', backgroundColor: '#f3f4f6'}}>
                <span className="font-bold truncate">{fileName}</span>
                <Button
                  onClick={reset}
                  variant="outline"
                  size="sm"
                  className="border-2 border-black font-bold"
                  style={{borderColor: '#000000'}}
                >
                  <X className="w-4 h-4 mr-2" />
                  Remove
                </Button>
              </div>

              {/* Preview */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h3 className="font-black uppercase mb-2">Original</h3>
                  <div className="border-4 border-black overflow-hidden bg-gray-100" style={{borderColor: '#000000', backgroundColor: '#f3f4f6'}}>
                    <img src={originalImage} alt="Original" className="w-full h-auto" />
                  </div>
                </div>
                
                {processedImage && (
                  <div>
                    <h3 className="font-black uppercase mb-2">Background Removed</h3>
                    <div className="border-4 border-black overflow-hidden" style={{borderColor: '#000000', background: 'repeating-conic-gradient(#ddd 0% 25%, white 0% 50%) 50% / 20px 20px'}}>
                      <img src={processedImage} alt="Processed" className="w-full h-auto" />
                    </div>
                  </div>
                )}
              </div>

              {/* Progress/Error */}
              {progress && (
                <div className="p-4 bg-blue-50 border-2 border-blue-500 text-blue-800 font-medium">
                  {progress}
                </div>
              )}
              
              {error && (
                <div className="p-4 bg-red-50 border-2 border-red-500 text-red-700 font-medium">
                  Error: {error}
                </div>
              )}
              
              {/* Action Buttons */}
              <div className="flex gap-4">
                {!processedImage ? (
                  <Button
                    onClick={removeBackground}
                    disabled={isProcessing}
                    className="flex-1 bg-purple-500 hover:bg-purple-600 text-white border-4 border-black font-black uppercase py-6 text-lg disabled:opacity-50 disabled:cursor-not-allowed"
                    style={{borderColor: '#000000'}}
                  >
                    {isProcessing ? (
                      <>Processing...</>
                    ) : (
                      <>
                        <Eraser className="w-5 h-5 mr-2" />
                        Remove Background
                      </>
                    )}
                  </Button>
                ) : (
                  <>
                    <Button
                      onClick={downloadImage}
                      className="flex-1 bg-green-500 hover:bg-green-600 text-white border-4 border-black font-black uppercase py-6 text-lg"
                      style={{borderColor: '#000000'}}
                    >
                      <Download className="w-5 h-5 mr-2" />
                      Download Image
                    </Button>
                    <Button
                      onClick={removeBackground}
                      disabled={isProcessing}
                      variant="outline"
                      className="border-4 border-black font-black uppercase py-6 px-8"
                      style={{borderColor: '#000000'}}
                    >
                      Process Again
                    </Button>
                  </>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Info Section */}
        <div className="bg-gray-50 border-4 border-black p-8" style={{borderColor: '#000000', backgroundColor: '#f9fafb'}}>
          <h3 className="text-xl font-black uppercase mb-4">How It Works</h3>
          <p className="text-gray-600 font-medium mb-4">
            This tool uses advanced AI (machine learning) to automatically detect and remove backgrounds from your images. 
            Everything runs directly in your browser - no uploads to servers, completely private and free!
          </p>
          
          <h4 className="font-black uppercase mb-2 mt-6">Key Features:</h4>
          <ul className="space-y-2 text-gray-600 font-medium">
            <li>• <strong>100% Free</strong> - No limits, no API keys, no subscriptions</li>
            <li>• <strong>Privacy First</strong> - All processing happens in your browser</li>
            <li>• <strong>AI-Powered</strong> - Uses state-of-the-art machine learning models</li>
            <li>• <strong>High Quality</strong> - Professional results for people, products, and objects</li>
            <li>• <strong>No Uploads</strong> - Your images never leave your device</li>
          </ul>

          <div className="mt-6 p-4 bg-yellow-50 border-2 border-yellow-500">
            <p className="text-sm font-medium text-yellow-800">
              <strong>Note:</strong> The first time you use this tool, it needs to download the AI model (~50MB). 
              This happens once and is cached in your browser for future use.
            </p>
          </div>
        </div>

        {/* Use Cases */}
        <div className="bg-white border-4 border-black p-8" style={{borderColor: '#000000', backgroundColor: '#ffffff'}}>
          <h3 className="text-xl font-black uppercase mb-4">Perfect For</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="border-2 border-black p-4" style={{borderColor: '#000000'}}>
              <h4 className="font-black mb-2">E-Commerce</h4>
              <p className="text-gray-600 font-medium">Create clean product photos with transparent or white backgrounds.</p>
            </div>
            <div className="border-2 border-black p-4" style={{borderColor: '#000000'}}>
              <h4 className="font-black mb-2">Profile Pictures</h4>
              <p className="text-gray-600 font-medium">Remove distracting backgrounds from portraits and headshots.</p>
            </div>
            <div className="border-2 border-black p-4" style={{borderColor: '#000000'}}>
              <h4 className="font-black mb-2">Graphic Design</h4>
              <p className="text-gray-600 font-medium">Extract subjects for use in posters, flyers, and social media.</p>
            </div>
          </div>
        </div>

        {/* Tips */}
        <div className="bg-white border-4 border-black p-8" style={{borderColor: '#000000', backgroundColor: '#ffffff'}}>
          <h3 className="text-xl font-black uppercase mb-4">Tips for Best Results</h3>
          <ul className="space-y-2 text-gray-600 font-medium">
            <li>• Use images with <strong>clear subjects</strong> (people, products, animals, cars)</li>
            <li>• Ensure <strong>good contrast</strong> between subject and background</li>
            <li>• Higher resolution images produce <strong>better quality</strong> results</li>
            <li>• Works best with <strong>well-lit photos</strong></li>
            <li>• First use may take longer while downloading the AI model</li>
          </ul>
        </div>
      </div>
    </ToolLayout>
  );
}
