import { ToolLayout } from "@/components/ToolLayout";
import { Button } from "@/components/ui/button";
import { Maximize2, Upload, Download, X } from "lucide-react";
import { useState, useRef } from "react";

export default function ImageResizer() {
  const [originalImage, setOriginalImage] = useState<string | null>(null);
  const [resizedImage, setResizedImage] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string>("");
  const [originalDimensions, setOriginalDimensions] = useState<{ width: number; height: number } | null>(null);
  const [targetWidth, setTargetWidth] = useState<number>(800);
  const [targetHeight, setTargetHeight] = useState<number>(600);
  const [maintainAspectRatio, setMaintainAspectRatio] = useState<boolean>(true);
  const [isProcessing, setIsProcessing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      setFileName(file.name);
      const reader = new FileReader();
      reader.onload = (event) => {
        const img = new Image();
        img.onload = () => {
          setOriginalDimensions({ width: img.width, height: img.height });
          setTargetWidth(img.width);
          setTargetHeight(img.height);
        };
        img.src = event.target?.result as string;
        setOriginalImage(event.target?.result as string);
        setResizedImage(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleWidthChange = (width: number) => {
    setTargetWidth(width);
    if (maintainAspectRatio && originalDimensions) {
      const aspectRatio = originalDimensions.height / originalDimensions.width;
      setTargetHeight(Math.round(width * aspectRatio));
    }
  };

  const handleHeightChange = (height: number) => {
    setTargetHeight(height);
    if (maintainAspectRatio && originalDimensions) {
      const aspectRatio = originalDimensions.width / originalDimensions.height;
      setTargetWidth(Math.round(height * aspectRatio));
    }
  };

  const resizeImage = async () => {
    if (!originalImage) return;
    
    setIsProcessing(true);
    
    try {
      const img = new Image();
      img.src = originalImage;
      
      await new Promise((resolve) => {
        img.onload = resolve;
      });
      
      const canvas = document.createElement('canvas');
      canvas.width = targetWidth;
      canvas.height = targetHeight;
      const ctx = canvas.getContext('2d');
      
      if (!ctx) {
        setIsProcessing(false);
        return;
      }
      
      // Use high-quality image smoothing
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = 'high';
      
      // Draw resized image
      ctx.drawImage(img, 0, 0, targetWidth, targetHeight);
      
      // Convert to data URL
      setResizedImage(canvas.toDataURL('image/png'));
      setIsProcessing(false);
    } catch (error) {
      console.error('Error resizing image:', error);
      setIsProcessing(false);
    }
  };

  const downloadImage = () => {
    if (!resizedImage) return;
    
    const link = document.createElement('a');
    link.href = resizedImage;
    link.download = fileName.replace(/\.[^/.]+$/, '') + `_${targetWidth}x${targetHeight}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const reset = () => {
    setOriginalImage(null);
    setResizedImage(null);
    setFileName("");
    setOriginalDimensions(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const presets = [
    { name: "Instagram Square", width: 1080, height: 1080 },
    { name: "Instagram Story", width: 1080, height: 1920 },
    { name: "Facebook Post", width: 1200, height: 630 },
    { name: "Twitter Post", width: 1200, height: 675 },
    { name: "YouTube Thumbnail", width: 1280, height: 720 },
    { name: "HD (720p)", width: 1280, height: 720 },
    { name: "Full HD (1080p)", width: 1920, height: 1080 },
    { name: "4K", width: 3840, height: 2160 },
  ];

  return (
    <ToolLayout
      title="Image Resizer"
      description="Resize images to specific dimensions for web, social media, and print."
      icon={Maximize2}
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
            id="image-resizer-upload"
          />
          
          {!originalImage ? (
            <label
              htmlFor="image-resizer-upload"
              className="flex flex-col items-center justify-center border-4 border-dashed border-black p-12 cursor-pointer hover:bg-gray-50 transition-colors"
              style={{borderColor: '#000000'}}
            >
              <Upload className="w-16 h-16 mb-4 text-indigo-500" />
              <p className="text-lg font-bold mb-2">Click to upload an image</p>
              <p className="text-gray-600 font-medium">Supports PNG, JPG, WEBP</p>
            </label>
          ) : (
            <div className="space-y-6">
              <div className="flex items-center justify-between bg-gray-100 border-2 border-black p-4" style={{borderColor: '#000000', backgroundColor: '#f3f4f6'}}>
                <div>
                  <span className="font-bold truncate block">{fileName}</span>
                  {originalDimensions && (
                    <span className="text-sm text-gray-600 font-medium">
                      Original: {originalDimensions.width} × {originalDimensions.height} px
                    </span>
                  )}
                </div>
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

              {/* Dimension Controls */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block font-black uppercase mb-2">Width (px)</label>
                  <input
                    type="number"
                    value={targetWidth}
                    onChange={(e) => handleWidthChange(Number(e.target.value))}
                    min="1"
                    max="10000"
                    className="w-full p-4 border-4 border-black font-bold text-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    style={{borderColor: '#000000'}}
                  />
                </div>
                <div>
                  <label className="block font-black uppercase mb-2">Height (px)</label>
                  <input
                    type="number"
                    value={targetHeight}
                    onChange={(e) => handleHeightChange(Number(e.target.value))}
                    min="1"
                    max="10000"
                    className="w-full p-4 border-4 border-black font-bold text-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    style={{borderColor: '#000000'}}
                  />
                </div>
              </div>

              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  id="aspect-ratio"
                  checked={maintainAspectRatio}
                  onChange={(e) => setMaintainAspectRatio(e.target.checked)}
                  className="w-5 h-5 border-2 border-black"
                  style={{borderColor: '#000000'}}
                />
                <label htmlFor="aspect-ratio" className="font-bold cursor-pointer">
                  Maintain aspect ratio
                </label>
              </div>

              {/* Preview */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h3 className="font-black uppercase mb-2">Original</h3>
                  <div className="border-4 border-black overflow-hidden bg-gray-100" style={{borderColor: '#000000', backgroundColor: '#f3f4f6'}}>
                    <img src={originalImage} alt="Original" className="w-full h-auto" />
                  </div>
                </div>
                
                {resizedImage && (
                  <div>
                    <h3 className="font-black uppercase mb-2">Resized ({targetWidth} × {targetHeight})</h3>
                    <div className="border-4 border-black overflow-hidden bg-gray-100" style={{borderColor: '#000000', backgroundColor: '#f3f4f6'}}>
                      <img src={resizedImage} alt="Resized" className="w-full h-auto" />
                    </div>
                  </div>
                )}
              </div>
              
              <div className="flex gap-4">
                {!resizedImage ? (
                  <Button
                    onClick={resizeImage}
                    disabled={isProcessing}
                    className="flex-1 bg-indigo-500 hover:bg-indigo-600 text-white border-4 border-black font-black uppercase py-6 text-lg"
                    style={{borderColor: '#000000'}}
                  >
                    {isProcessing ? (
                      <>Processing...</>
                    ) : (
                      <>
                        <Maximize2 className="w-5 h-5 mr-2" />
                        Resize Image
                      </>
                    )}
                  </Button>
                ) : (
                  <Button
                    onClick={downloadImage}
                    className="flex-1 bg-green-500 hover:bg-green-600 text-white border-4 border-black font-black uppercase py-6 text-lg"
                    style={{borderColor: '#000000'}}
                  >
                    <Download className="w-5 h-5 mr-2" />
                    Download Resized
                  </Button>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Presets */}
        <div className="bg-white border-4 border-black p-8" style={{borderColor: '#000000', backgroundColor: '#ffffff'}}>
          <h3 className="text-xl font-black uppercase mb-4">Quick Presets</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {presets.map((preset) => (
              <Button
                key={preset.name}
                onClick={() => {
                  setTargetWidth(preset.width);
                  setTargetHeight(preset.height);
                  setMaintainAspectRatio(false);
                }}
                variant="outline"
                className="border-2 border-black font-bold text-left flex-col items-start h-auto py-3"
                style={{borderColor: '#000000'}}
                disabled={!originalImage}
              >
                <span className="font-black">{preset.name}</span>
                <span className="text-xs text-gray-600">{preset.width} × {preset.height}</span>
              </Button>
            ))}
          </div>
        </div>

        {/* Info Section */}
        <div className="bg-gray-50 border-4 border-black p-8" style={{borderColor: '#000000', backgroundColor: '#f9fafb'}}>
          <h3 className="text-xl font-black uppercase mb-4">Tips for Best Results</h3>
          <ul className="space-y-2 text-gray-600 font-medium">
            <li>• <strong>Maintain aspect ratio</strong> to avoid image distortion</li>
            <li>• <strong>Don't upscale</strong> too much - it will reduce quality</li>
            <li>• <strong>Use presets</strong> for social media to get perfect dimensions</li>
            <li>• <strong>Download as PNG</strong> for best quality (no compression)</li>
            <li>• <strong>Start with high-resolution</strong> images for better results</li>
          </ul>
        </div>

        {/* Use Cases */}
        <div className="bg-white border-4 border-black p-8" style={{borderColor: '#000000', backgroundColor: '#ffffff'}}>
          <h3 className="text-xl font-black uppercase mb-4">Common Use Cases</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="border-2 border-black p-4" style={{borderColor: '#000000'}}>
              <h4 className="font-black mb-2">Social Media</h4>
              <p className="text-gray-600 font-medium">Resize images for Instagram, Facebook, Twitter, and LinkedIn posts.</p>
            </div>
            <div className="border-2 border-black p-4" style={{borderColor: '#000000'}}>
              <h4 className="font-black mb-2">Web Optimization</h4>
              <p className="text-gray-600 font-medium">Reduce image dimensions for faster website loading times.</p>
            </div>
            <div className="border-2 border-black p-4" style={{borderColor: '#000000'}}>
              <h4 className="font-black mb-2">Email Marketing</h4>
              <p className="text-gray-600 font-medium">Optimize images for email newsletters and campaigns.</p>
            </div>
          </div>
        </div>
      </div>
    </ToolLayout>
  );
}
