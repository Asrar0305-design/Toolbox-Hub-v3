import { ToolLayout } from "@/components/ToolLayout";
import { Button } from "@/components/ui/button";
import { Eraser, Upload, Download, X } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { pipeline, env } from "@xenova/transformers";

// Configure transformers.js
env.allowLocalModels = false;
env.allowRemoteModels = true;

export default function BackgroundRemover() {
  const [originalImage, setOriginalImage] = useState<string | null>(null);
  const [processedImage, setProcessedImage] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string>("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [isModelLoaded, setIsModelLoaded] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const segmenterRef = useRef<any>(null);

  // Initialize the model
  useEffect(() => {
    const loadModel = async () => {
      try {
        setProgress("Initializing AI model (first time only)...");
        // Load the image segmentation pipeline with RMBG-1.4 model
        segmenterRef.current = await pipeline(
          'image-segmentation',
          'briaai/RMBG-1.4',
          {
            progress_callback: (progress: any) => {
              if (progress.status === 'downloading') {
                const percent = Math.round((progress.loaded / progress.total) * 100);
                setProgress(`Downloading model: ${percent}% (${Math.round(progress.loaded / 1024 / 1024)}MB / ${Math.round(progress.total / 1024 / 1024)}MB)`);
              } else if (progress.status === 'loading') {
                setProgress('Loading model into memory...');
              }
            }
          }
        );
        setIsModelLoaded(true);
        setProgress("");
      } catch (err) {
        console.error('Error loading model:', err);
        setError('Failed to load AI model. Please refresh the page and try again.');
      }
    };

    loadModel();
  }, []);

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
    if (!originalImage || !segmenterRef.current) return;
    
    setIsProcessing(true);
    setError("");
    setProgress("Processing image with AI...");
    
    try {
      // Load image
      const img = new Image();
      await new Promise((resolve, reject) => {
        img.onload = resolve;
        img.onerror = reject;
        img.src = originalImage;
      });

      // Process with AI model
      const output = await segmenterRef.current(img);
      
      setProgress("Finalizing...");

      // Create canvas to combine mask with original image
      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d');
      
      if (!ctx) throw new Error('Could not get canvas context');

      // Draw original image
      ctx.drawImage(img, 0, 0);
      
      // Get image data
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imageData.data;

      // Apply mask from AI model
      // The output contains a mask - we need to use it to make background transparent
      const mask = output[0].mask;
      
      // Create a temporary canvas for the mask
      const maskCanvas = document.createElement('canvas');
      maskCanvas.width = canvas.width;
      maskCanvas.height = canvas.height;
      const maskCtx = maskCanvas.getContext('2d');
      
      if (!maskCtx) throw new Error('Could not get mask canvas context');
      
      // Draw and resize mask to match image dimensions
      maskCtx.drawImage(mask, 0, 0, canvas.width, canvas.height);
      const maskData = maskCtx.getImageData(0, 0, canvas.width, canvas.height);

      // Apply mask to make background transparent
      for (let i = 0; i < data.length; i += 4) {
        // Use the red channel of the mask (they're all the same for grayscale)
        const maskValue = maskData.data[i];
        // Set alpha channel based on mask value
        data[i + 3] = maskValue;
      }

      ctx.putImageData(imageData, 0, 0);

      // Convert to blob
      canvas.toBlob((blob) => {
        if (blob) {
          const url = URL.createObjectURL(blob);
          setProcessedImage(url);
          setProgress("Complete!");
          setTimeout(() => setProgress(""), 2000);
        } else {
          throw new Error('Failed to create image blob');
        }
        setIsProcessing(false);
      }, 'image/png');

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
    setError("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <ToolLayout
      title="Background Remover"
      description="Remove backgrounds from ANY image using professional AI - works with complex backgrounds, patterns, and natural scenes. Completely free and unlimited."
      icon={Eraser}
    >
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Model Loading Status */}
        {!isModelLoaded && !error && (
          <div className="bg-blue-50 border-4 border-blue-500 p-6">
            <div className="flex items-center gap-3">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-800"></div>
              <div>
                <div className="font-black text-lg">{progress || "Initializing AI model..."}</div>
                <p className="text-sm text-blue-800 mt-1">
                  First-time setup: Downloading professional AI model (~40MB). This happens once and will be cached for future use.
                </p>
              </div>
            </div>
          </div>
        )}

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
            disabled={!isModelLoaded}
          />
          
          {!originalImage ? (
            <label
              htmlFor="background-remover-upload"
              className={`flex flex-col items-center justify-center border-4 border-dashed border-black p-12 transition-colors ${
                isModelLoaded ? 'cursor-pointer hover:bg-gray-50' : 'cursor-not-allowed opacity-50'
              }`}
              style={{borderColor: '#000000'}}
            >
              <Upload className="w-16 h-16 mb-4 text-purple-500" />
              <p className="text-lg font-bold mb-2">
                {isModelLoaded ? 'Click to upload an image' : 'Loading AI model...'}
              </p>
              <p className="text-gray-600 font-medium">Supports PNG, JPG, WEBP</p>
              <p className="text-sm text-gray-500 mt-2">
                {isModelLoaded 
                  ? '✅ AI model ready - Unlimited usage, 100% free!' 
                  : 'Please wait while the AI model loads...'}
              </p>
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

              {/* Progress */}
              {progress && (
                <div className="p-4 bg-blue-50 border-2 border-blue-500 text-blue-800 font-medium flex items-center gap-3">
                  {isProcessing && (
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-800"></div>
                  )}
                  <div className="font-bold">{progress}</div>
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
                    disabled={isProcessing || !isModelLoaded}
                    className="flex-1 bg-purple-500 hover:bg-purple-600 text-white border-4 border-black font-black uppercase py-6 text-lg disabled:opacity-50 disabled:cursor-not-allowed"
                    style={{borderColor: '#000000'}}
                  >
                    {isProcessing ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                        Processing...
                      </>
                    ) : (
                      <>
                        <Eraser className="w-5 h-5 mr-2" />
                        Remove Background with AI
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
        <div className="bg-gradient-to-r from-purple-50 to-blue-50 border-4 border-black p-8" style={{borderColor: '#000000'}}>
          <h3 className="text-xl font-black uppercase mb-4">🤖 Professional AI Technology</h3>
          <p className="text-gray-700 font-medium mb-4">
            This tool uses <strong>RMBG-1.4</strong>, a state-of-the-art AI model from BRIA AI, specifically designed for professional background removal. 
            It intelligently detects and separates foreground subjects from ANY background - whether simple or complex!
          </p>
          
          <h4 className="font-black uppercase mb-2 mt-6">Works With:</h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <div className="bg-white border-2 border-black p-3 text-center font-bold" style={{borderColor: '#000000'}}>
              ✅ People & Portraits
            </div>
            <div className="bg-white border-2 border-black p-3 text-center font-bold" style={{borderColor: '#000000'}}>
              ✅ Products & Objects
            </div>
            <div className="bg-white border-2 border-black p-3 text-center font-bold" style={{borderColor: '#000000'}}>
              ✅ Animals & Pets
            </div>
            <div className="bg-white border-2 border-black p-3 text-center font-bold" style={{borderColor: '#000000'}}>
              ✅ Vehicles & Cars
            </div>
            <div className="bg-white border-2 border-black p-3 text-center font-bold" style={{borderColor: '#000000'}}>
              ✅ Complex Backgrounds
            </div>
            <div className="bg-white border-2 border-black p-3 text-center font-bold" style={{borderColor: '#000000'}}>
              ✅ Natural Scenes
            </div>
            <div className="bg-white border-2 border-black p-3 text-center font-bold" style={{borderColor: '#000000'}}>
              ✅ Patterns & Textures
            </div>
            <div className="bg-white border-2 border-black p-3 text-center font-bold" style={{borderColor: '#000000'}}>
              ✅ Any Background!
            </div>
          </div>

          <div className="mt-6 p-4 bg-green-50 border-2 border-green-600">
            <p className="text-sm font-medium text-green-900">
              <strong>✨ Completely Free & Unlimited:</strong> The AI model downloads once (~40MB) and is cached in your browser forever. 
              After the first load, you can use it unlimited times with no restrictions, no API calls, and no costs!
            </p>
          </div>
        </div>

        {/* Use Cases */}
        <div className="bg-white border-4 border-black p-8" style={{borderColor: '#000000', backgroundColor: '#ffffff'}}>
          <h3 className="text-xl font-black uppercase mb-4">Perfect For</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="border-2 border-black p-4" style={{borderColor: '#000000'}}>
              <h4 className="font-black mb-2">E-Commerce</h4>
              <p className="text-gray-600 font-medium">Create professional product photos with clean, transparent backgrounds for online stores.</p>
            </div>
            <div className="border-2 border-black p-4" style={{borderColor: '#000000'}}>
              <h4 className="font-black mb-2">Content Creation</h4>
              <p className="text-gray-600 font-medium">Remove backgrounds from photos for social media, YouTube thumbnails, and marketing materials.</p>
            </div>
            <div className="border-2 border-black p-4" style={{borderColor: '#000000'}}>
              <h4 className="font-black mb-2">Graphic Design</h4>
              <p className="text-gray-600 font-medium">Extract subjects for use in posters, flyers, presentations, and composite images.</p>
            </div>
          </div>
        </div>

        {/* Tips */}
        <div className="bg-white border-4 border-black p-8" style={{borderColor: '#000000', backgroundColor: '#ffffff'}}>
          <h3 className="text-xl font-black uppercase mb-4">Tips for Best Results</h3>
          <ul className="space-y-2 text-gray-600 font-medium">
            <li>• <strong>Any background works</strong> - The AI handles complex scenes automatically</li>
            <li>• <strong>Higher resolution = better quality</strong> - Use the best quality images you have</li>
            <li>• <strong>Clear subjects</strong> - Make sure your subject is in focus</li>
            <li>• <strong>Good lighting</strong> - Well-lit photos produce cleaner results</li>
            <li>• <strong>First use takes longer</strong> - Model downloads once (~40MB), then it's instant</li>
            <li>• <strong>100% private</strong> - Everything processes in your browser, no uploads</li>
            <li>• <strong>Unlimited usage</strong> - Use as many times as you want, completely free!</li>
          </ul>
        </div>
      </div>
    </ToolLayout>
  );
}
