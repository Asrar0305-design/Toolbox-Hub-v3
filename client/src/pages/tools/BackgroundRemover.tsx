import { ToolLayout } from "@/components/ToolLayout";
import { Button } from "@/components/ui/button";
import { Eraser, Upload, Download, X } from "lucide-react";
import { useState, useRef } from "react";

export default function BackgroundRemover() {
  const [originalImage, setOriginalImage] = useState<string | null>(null);
  const [processedImage, setProcessedImage] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [fileName, setFileName] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      setFileName(file.name);
      const reader = new FileReader();
      reader.onload = (event) => {
        setOriginalImage(event.target?.result as string);
        setProcessedImage(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeBackground = async () => {
    if (!originalImage) return;
    
    setIsProcessing(true);
    
    try {
      // Create canvas to process image
      const img = new Image();
      img.src = originalImage;
      
      await new Promise((resolve) => {
        img.onload = resolve;
      });
      
      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d');
      
      if (!ctx) {
        setIsProcessing(false);
        return;
      }
      
      // Draw original image
      ctx.drawImage(img, 0, 0);
      
      // Get image data
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imageData.data;
      
      // Simple background removal: make white/light pixels transparent
      // This is a basic implementation - for production, use ML models or APIs
      for (let i = 0; i < data.length; i += 4) {
        const r = data[i];
        const g = data[i + 1];
        const b = data[i + 2];
        
        // If pixel is close to white, make it transparent
        if (r > 200 && g > 200 && b > 200) {
          data[i + 3] = 0; // Set alpha to 0 (transparent)
        }
      }
      
      // Put processed image data back
      ctx.putImageData(imageData, 0, 0);
      
      // Convert to data URL
      setProcessedImage(canvas.toDataURL('image/png'));
      setIsProcessing(false);
    } catch (error) {
      console.error('Error processing image:', error);
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
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <ToolLayout
      title="Background Remover"
      description="Remove image backgrounds automatically. Perfect for product photos, portraits, and graphic design."
      icon={Eraser}
    >
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Upload Section */}
        <div className="bg-white border-4 border-black p-8" style={{borderColor: '#000000', backgroundColor: '#ffffff'}}>
          <h2 className="text-2xl font-black uppercase mb-4">Upload Image</h2>
          
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileSelect}
            className="hidden"
            id="bg-remover-upload"
          />
          
          {!originalImage ? (
            <label
              htmlFor="bg-remover-upload"
              className="flex flex-col items-center justify-center border-4 border-dashed border-black p-12 cursor-pointer hover:bg-gray-50 transition-colors"
              style={{borderColor: '#000000'}}
            >
              <Upload className="w-16 h-16 mb-4 text-purple-500" />
              <p className="text-lg font-bold mb-2">Click to upload an image</p>
              <p className="text-gray-600 font-medium">Supports PNG, JPG, WEBP</p>
            </label>
          ) : (
            <div className="space-y-4">
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
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h3 className="font-black uppercase mb-2">Original</h3>
                  <div className="border-4 border-black overflow-hidden" style={{borderColor: '#000000'}}>
                    <img src={originalImage} alt="Original" className="w-full h-auto" />
                  </div>
                </div>
                
                {processedImage && (
                  <div>
                    <h3 className="font-black uppercase mb-2">Background Removed</h3>
                    <div className="border-4 border-black overflow-hidden" style={{borderColor: '#000000', backgroundImage: 'repeating-linear-gradient(45deg, #e5e7eb 0, #e5e7eb 10px, #f3f4f6 10px, #f3f4f6 20px)'}}>
                      <img src={processedImage} alt="Processed" className="w-full h-auto" />
                    </div>
                  </div>
                )}
              </div>
              
              <div className="flex gap-4">
                {!processedImage ? (
                  <Button
                    onClick={removeBackground}
                    disabled={isProcessing}
                    className="flex-1 bg-purple-500 hover:bg-purple-600 text-white border-4 border-black font-black uppercase py-6 text-lg"
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
                  <Button
                    onClick={downloadImage}
                    className="flex-1 bg-green-500 hover:bg-green-600 text-white border-4 border-black font-black uppercase py-6 text-lg"
                    style={{borderColor: '#000000'}}
                  >
                    <Download className="w-5 h-5 mr-2" />
                    Download PNG
                  </Button>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Info Section */}
        <div className="bg-yellow-50 border-4 border-black p-6" style={{borderColor: '#000000', backgroundColor: '#fefce8'}}>
          <p className="font-bold text-gray-800">
            <strong>Note:</strong> This tool uses a basic algorithm that removes white/light backgrounds. 
            For advanced AI-powered background removal, consider integrating with services like remove.bg API.
          </p>
        </div>

        {/* Use Cases */}
        <div className="bg-white border-4 border-black p-8" style={{borderColor: '#000000', backgroundColor: '#ffffff'}}>
          <h3 className="text-xl font-black uppercase mb-4">Use Cases</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="border-2 border-black p-4" style={{borderColor: '#000000'}}>
              <h4 className="font-black mb-2">E-Commerce</h4>
              <p className="text-gray-600 font-medium">Create clean product photos with transparent backgrounds for online stores.</p>
            </div>
            <div className="border-2 border-black p-4" style={{borderColor: '#000000'}}>
              <h4 className="font-black mb-2">Graphic Design</h4>
              <p className="text-gray-600 font-medium">Extract subjects from photos for use in designs and compositions.</p>
            </div>
            <div className="border-2 border-black p-4" style={{borderColor: '#000000'}}>
              <h4 className="font-black mb-2">Social Media</h4>
              <p className="text-gray-600 font-medium">Create professional profile pictures and social media graphics.</p>
            </div>
            <div className="border-2 border-black p-4" style={{borderColor: '#000000'}}>
              <h4 className="font-black mb-2">Marketing</h4>
              <p className="text-gray-600 font-medium">Prepare images for ads, banners, and promotional materials.</p>
            </div>
          </div>
        </div>
      </div>
    </ToolLayout>
  );
}
