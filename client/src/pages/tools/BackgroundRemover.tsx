import { ToolLayout } from "@/components/ToolLayout";
import { Button } from "@/components/ui/button";
import { Eraser, Upload, Download, X, Settings } from "lucide-react";
import { useState, useRef } from "react";

export default function BackgroundRemover() {
  const [originalImage, setOriginalImage] = useState<string | null>(null);
  const [processedImage, setProcessedImage] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string>("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string>("");
  const [threshold, setThreshold] = useState(30);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

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
    if (!originalImage || !canvasRef.current) return;
    
    setIsProcessing(true);
    setError("");
    
    try {
      const img = new Image();
      img.crossOrigin = "anonymous";
      
      await new Promise((resolve, reject) => {
        img.onload = resolve;
        img.onerror = reject;
        img.src = originalImage;
      });

      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d', { willReadFrequently: true });
      if (!ctx) throw new Error('Could not get canvas context');

      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);

      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imageData.data;

      // Sample the corner pixels to determine background color
      const corners = [
        [0, 0], // top-left
        [canvas.width - 1, 0], // top-right
        [0, canvas.height - 1], // bottom-left
        [canvas.width - 1, canvas.height - 1] // bottom-right
      ];

      let bgR = 0, bgG = 0, bgB = 0;
      corners.forEach(([x, y]) => {
        const idx = (y * canvas.width + x) * 4;
        bgR += data[idx];
        bgG += data[idx + 1];
        bgB += data[idx + 2];
      });
      bgR = Math.round(bgR / 4);
      bgG = Math.round(bgG / 4);
      bgB = Math.round(bgB / 4);

      // Remove background based on color similarity
      for (let i = 0; i < data.length; i += 4) {
        const r = data[i];
        const g = data[i + 1];
        const b = data[i + 2];

        // Calculate color difference
        const diff = Math.sqrt(
          Math.pow(r - bgR, 2) +
          Math.pow(g - bgG, 2) +
          Math.pow(b - bgB, 2)
        );

        // If color is similar to background, make it transparent
        if (diff < threshold) {
          data[i + 3] = 0; // Set alpha to 0 (transparent)
        }
      }

      ctx.putImageData(imageData, 0, 0);

      // Convert canvas to blob
      canvas.toBlob((blob) => {
        if (blob) {
          const url = URL.createObjectURL(blob);
          setProcessedImage(url);
          setIsProcessing(false);
        } else {
          throw new Error('Failed to create image blob');
        }
      }, 'image/png');

    } catch (err) {
      console.error('Error removing background:', err);
      setError(err instanceof Error ? err.message : 'Failed to remove background');
      setIsProcessing(false);
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
      description="Remove solid color backgrounds from images instantly - works best with uniform backgrounds like white, green screen, or studio backdrops."
      icon={Eraser}
    >
      <canvas ref={canvasRef} style={{ display: 'none' }} />
      
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
              <p className="text-sm text-gray-500 mt-2">Works instantly - no AI model download needed!</p>
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

              {/* Sensitivity Control */}
              <div className="bg-gray-50 border-2 border-black p-4" style={{borderColor: '#000000', backgroundColor: '#f9fafb'}}>
                <div className="flex items-center gap-2 mb-2">
                  <Settings className="w-5 h-5" />
                  <label className="font-black uppercase">Sensitivity: {threshold}</label>
                </div>
                <input
                  type="range"
                  min="10"
                  max="100"
                  value={threshold}
                  onChange={(e) => setThreshold(Number(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
                <p className="text-sm text-gray-600 mt-2">
                  Lower = removes less (keeps more detail) | Higher = removes more (aggressive)
                </p>
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
        <div className="bg-yellow-50 border-4 border-yellow-500 p-8">
          <h3 className="text-xl font-black uppercase mb-4">⚡ How This Works</h3>
          <p className="text-gray-700 font-medium mb-4">
            This tool uses <strong>chroma key technology</strong> (like green screens in movies) to remove solid color backgrounds. 
            It analyzes the corners of your image to detect the background color and removes it instantly!
          </p>
          
          <h4 className="font-black uppercase mb-2 mt-6">Best For:</h4>
          <ul className="space-y-2 text-gray-700 font-medium">
            <li>• <strong>White backgrounds</strong> - Product photos, documents</li>
            <li>• <strong>Green screens</strong> - Video thumbnails, content creation</li>
            <li>• <strong>Solid color backdrops</strong> - Studio photos, portraits</li>
            <li>• <strong>Uniform backgrounds</strong> - Clean, consistent colors</li>
          </ul>

          <div className="mt-6 p-4 bg-yellow-100 border-2 border-yellow-600">
            <p className="text-sm font-medium text-yellow-900">
              <strong>💡 Tip:</strong> For complex backgrounds (patterns, multiple colors, natural scenes), 
              this tool may not work perfectly. It's optimized for solid, uniform backgrounds like white, green, or studio backdrops.
              Adjust the sensitivity slider to fine-tune results!
            </p>
          </div>
        </div>

        {/* Use Cases */}
        <div className="bg-white border-4 border-black p-8" style={{borderColor: '#000000', backgroundColor: '#ffffff'}}>
          <h3 className="text-xl font-black uppercase mb-4">Perfect For</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="border-2 border-black p-4" style={{borderColor: '#000000'}}>
              <h4 className="font-black mb-2">Product Photos</h4>
              <p className="text-gray-600 font-medium">Remove white backgrounds from product images for e-commerce listings.</p>
            </div>
            <div className="border-2 border-black p-4" style={{borderColor: '#000000'}}>
              <h4 className="font-black mb-2">Green Screen</h4>
              <p className="text-gray-600 font-medium">Remove green screen backgrounds from video thumbnails and photos.</p>
            </div>
            <div className="border-2 border-black p-4" style={{borderColor: '#000000'}}>
              <h4 className="font-black mb-2">Studio Photos</h4>
              <p className="text-gray-600 font-medium">Remove solid color backdrops from professional portraits and headshots.</p>
            </div>
          </div>
        </div>

        {/* Tips */}
        <div className="bg-white border-4 border-black p-8" style={{borderColor: '#000000', backgroundColor: '#ffffff'}}>
          <h3 className="text-xl font-black uppercase mb-4">Tips for Best Results</h3>
          <ul className="space-y-2 text-gray-600 font-medium">
            <li>• Use images with <strong>solid, uniform backgrounds</strong> (white, green, blue, etc.)</li>
            <li>• Ensure <strong>good lighting</strong> - evenly lit backgrounds work best</li>
            <li>• Avoid <strong>shadows</strong> on the background for cleaner results</li>
            <li>• Adjust the <strong>sensitivity slider</strong> if too much or too little is removed</li>
            <li>• Works <strong>instantly</strong> - no waiting, no AI model downloads!</li>
            <li>• <strong>100% private</strong> - everything happens in your browser</li>
          </ul>
        </div>
      </div>
    </ToolLayout>
  );
}
