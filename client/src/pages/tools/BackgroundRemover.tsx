import { ToolLayout } from "@/components/ToolLayout";
import { Button } from "@/components/ui/button";
import { Eraser, Upload, Download, X } from "lucide-react";
import { useState, useRef } from "react";
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
  const [progressPercent, setProgressPercent] = useState<number>(0);
  const [error, setError] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const segmenterRef = useRef<any>(null);

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
    setProgressPercent(0);
    
    try {
      // Load model if not already loaded (LAZY LOADING)
      if (!segmenterRef.current) {
        setProgress("Downloading AI model...");
        segmenterRef.current = await pipeline(
          'image-segmentation',
          'briaai/RMBG-1.4',
          {
            progress_callback: (progress: any) => {
              if (progress.status === 'downloading') {
                const percent = Math.round((progress.loaded / progress.total) * 100);
                setProgressPercent(percent);
                const loadedMB = Math.round(progress.loaded / 1024 / 1024);
                const totalMB = Math.round(progress.total / 1024 / 1024);
                setProgress(`Downloading AI model: ${percent}% (${loadedMB}MB / ${totalMB}MB)`);
              } else if (progress.status === 'loading') {
                setProgressPercent(95);
                setProgress('Loading model into memory...');
              } else if (progress.status === 'ready') {
                setProgressPercent(100);
                setProgress('Model ready!');
              }
            }
          }
        );
      }

      setProgress("Processing image with AI...");
      setProgressPercent(100);
      
      // Load image
      const img = new Image();
      await new Promise((resolve, reject) => {
        img.onload = resolve;
        img.onerror = reject;
        img.src = originalImage;
      });

      // Process with AI model
      const output = await segmenterRef.current(img);
      
      setProgress("Creating transparent image...");

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
        const maskValue = maskData.data[i];
        data[i + 3] = maskValue;
      }

      ctx.putImageData(imageData, 0, 0);

      // Convert to blob
      canvas.toBlob((blob) => {
        if (blob) {
          const url = URL.createObjectURL(blob);
          setProcessedImage(url);
          setProgress("Complete!");
          setProgressPercent(100);
          setTimeout(() => {
            setProgress("");
            setProgressPercent(0);
          }, 2000);
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
      setProgressPercent(0);
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
    setProgress("");
    setProgressPercent(0);
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
              <p className="text-sm text-purple-600 mt-2 font-bold">
                ✨ AI model loads automatically when you process your first image
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

              {/* Smart Progress Bar */}
              {progress && (
                <div className="space-y-3">
                  <div className="p-4 bg-blue-50 border-2 border-blue-500 text-blue-900">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-800"></div>
                      <div className="font-bold text-lg">{progress}</div>
                    </div>
                    
                    {/* Progress Bar */}
                    {progressPercent > 0 && (
                      <div className="space-y-2">
                        <div className="w-full bg-blue-200 rounded-full h-6 border-2 border-blue-600 overflow-hidden">
                          <div 
                            className="bg-gradient-to-r from-blue-500 to-purple-500 h-full transition-all duration-300 flex items-center justify-center text-white font-black text-sm"
                            style={{width: `${progressPercent}%`}}
                          >
                            {progressPercent}%
                          </div>
                        </div>
                        <p className="text-sm text-blue-700 font-medium">
                          {progressPercent < 100 
                            ? "First-time setup - AI model is downloading and will be cached for instant future use" 
                            : "Processing your image..."}
                        </p>
                      </div>
                    )}
                  </div>
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
            This tool uses <strong>RMBG-1.4</strong>, a state-of-the-art AI model from BRIA AI. The model downloads automatically when you process your first image (~40MB, takes 2-3 minutes) and is then cached forever for instant future use!
          </p>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
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
              ✅ Any Background!
            </div>
          </div>

          <div className="p-4 bg-green-50 border-2 border-green-600">
            <p className="text-sm font-medium text-green-900">
              <strong>✨ Completely Free & Unlimited:</strong> First image takes 2-3 minutes (downloads AI model with progress bar). After that, all images process in 5-10 seconds. Unlimited usage forever!
            </p>
          </div>
        </div>
      </div>
    </ToolLayout>
  );
}
