import { ToolLayout } from "@/components/ToolLayout";
import { Button } from "@/components/ui/button";
import { Eraser, Upload, Download, X } from "lucide-react";
import { useState, useRef } from "react";
import { AutoModel, AutoProcessor, RawImage, env } from "@xenova/transformers";

env.allowLocalModels = false;

export default function BackgroundRemover() {
  const [originalImage, setOriginalImage] = useState<string | null>(null);
  const [processedImage, setProcessedImage] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string>("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState<string>("");
  const [progressPercent, setProgressPercent] = useState<number>(0);
  const [error, setError] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const modelRef = useRef<any>(null);
  const processorRef = useRef<any>(null);

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
      if (!modelRef.current || !processorRef.current) {
        setProgress("Loading AI model...");
        
        const progressCallback = (progress: any) => {
          if (progress.status === 'downloading') {
            const percent = Math.round((progress.loaded / progress.total) * 100);
            setProgressPercent(percent);
            const loadedMB = Math.round(progress.loaded / 1024 / 1024);
            const totalMB = Math.round(progress.total / 1024 / 1024);
            setProgress(`Downloading: ${percent}% (${loadedMB}/${totalMB}MB)`);
          } else if (progress.status === 'loading') {
            setProgressPercent(95);
            setProgress('Loading model...');
          }
        };

        modelRef.current = await AutoModel.from_pretrained('briaai/RMBG-1.4', {
          device: 'webgpu',
          progress_callback: progressCallback
        });
        
        processorRef.current = await AutoProcessor.from_pretrained('briaai/RMBG-1.4', {
          progress_callback: progressCallback
        });
      }

      setProgress("Processing image...");
      setProgressPercent(100);
      
      const image = await RawImage.fromURL(originalImage);
      const { pixel_values } = await processorRef.current(image);
      const { output } = await modelRef.current({ input: pixel_values });

      const mask = await RawImage.fromTensor(output[0].mul(255).to('uint8')).resize(image.width, image.height);

      const canvas = document.createElement('canvas');
      canvas.width = image.width;
      canvas.height = image.height;
      const ctx = canvas.getContext('2d');
      if (!ctx) throw new Error('Could not get canvas context');

      const img = new Image();
      await new Promise((resolve) => {
        img.onload = resolve;
        img.src = originalImage;
      });

      ctx.drawImage(img, 0, 0);
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < mask.data.length; ++i) {
        imageData.data[4 * i + 3] = mask.data[i];
      }

      ctx.putImageData(imageData, 0, 0);

      canvas.toBlob((blob) => {
        if (blob) {
          const url = URL.createObjectURL(blob);
          setProcessedImage(url);
          setProgress("Complete!");
          setTimeout(() => {
            setProgress("");
            setProgressPercent(0);
          }, 2000);
        }
        setIsProcessing(false);
      }, 'image/png');

    } catch (err: any) {
      console.error('Error:', err);
      setError(err.message || 'Failed to remove background');
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
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <ToolLayout
      title="Background Remover"
      description="Remove backgrounds from ANY image using professional AI. Completely free and unlimited."
      icon={Eraser}
    >
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="bg-white border-4 border-black p-8">
          <h2 className="text-2xl font-black uppercase mb-4">Upload Image</h2>
          
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileSelect}
            className="hidden"
            id="bg-upload"
          />
          
          {!originalImage ? (
            <label
              htmlFor="bg-upload"
              className="flex flex-col items-center justify-center border-4 border-dashed border-black p-12 cursor-pointer hover:bg-gray-50"
            >
              <Upload className="w-16 h-16 mb-4 text-purple-500" />
              <p className="text-lg font-bold mb-2">Click to upload</p>
              <p className="text-gray-600 font-medium">PNG, JPG, WEBP</p>
              <p className="text-sm text-purple-600 mt-2 font-bold">
                ✨ AI loads when you process first image
              </p>
            </label>
          ) : (
            <div className="space-y-6">
              <div className="flex items-center justify-between bg-gray-100 border-2 border-black p-4">
                <span className="font-bold truncate">{fileName}</span>
                <Button onClick={reset} variant="outline" size="sm" className="border-2 border-black font-bold">
                  <X className="w-4 h-4 mr-2" />
                  Remove
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h3 className="font-black uppercase mb-2">Original</h3>
                  <div className="border-4 border-black overflow-hidden bg-gray-100">
                    <img src={originalImage} alt="Original" className="w-full h-auto" />
                  </div>
                </div>
                
                {processedImage && (
                  <div>
                    <h3 className="font-black uppercase mb-2">Result</h3>
                    <div className="border-4 border-black overflow-hidden" style={{background: 'repeating-conic-gradient(#ddd 0% 25%, white 0% 50%) 50% / 20px 20px'}}>
                      <img src={processedImage} alt="Processed" className="w-full h-auto" />
                    </div>
                  </div>
                )}
              </div>

              {progress && (
                <div className="p-4 bg-blue-50 border-2 border-blue-500">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-800"></div>
                    <div className="font-bold text-lg">{progress}</div>
                  </div>
                  
                  {progressPercent > 0 && (
                    <div className="w-full bg-blue-200 rounded-full h-6 border-2 border-blue-600 overflow-hidden">
                      <div 
                        className="bg-gradient-to-r from-blue-500 to-purple-500 h-full transition-all duration-300 flex items-center justify-center text-white font-black text-sm"
                        style={{width: `${progressPercent}%`}}
                      >
                        {progressPercent}%
                      </div>
                    </div>
                  )}
                </div>
              )}
              
              {error && (
                <div className="p-4 bg-red-50 border-2 border-red-500 text-red-700 font-medium">
                  {error}
                </div>
              )}
              
              <div className="flex gap-4">
                {!processedImage ? (
                  <Button
                    onClick={removeBackground}
                    disabled={isProcessing}
                    className="flex-1 bg-purple-500 hover:bg-purple-600 text-white border-4 border-black font-black uppercase py-6 text-lg disabled:opacity-50"
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
                    >
                      <Download className="w-5 h-5 mr-2" />
                      Download
                    </Button>
                    <Button
                      onClick={removeBackground}
                      disabled={isProcessing}
                      variant="outline"
                      className="border-4 border-black font-black uppercase py-6 px-8"
                    >
                      Process Again
                    </Button>
                  </>
                )}
              </div>
            </div>
          )}
        </div>

        <div className="bg-gradient-to-r from-purple-50 to-blue-50 border-4 border-black p-8">
          <h3 className="text-xl font-black uppercase mb-4">🤖 Professional AI</h3>
          <p className="text-gray-700 font-medium mb-4">
            Uses <strong>RMBG-1.4</strong> from BRIA AI. First use downloads ~40MB (2-3 min), then cached forever. Unlimited usage!
          </p>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <div className="bg-white border-2 border-black p-3 text-center font-bold">✅ People</div>
            <div className="bg-white border-2 border-black p-3 text-center font-bold">✅ Products</div>
            <div className="bg-white border-2 border-black p-3 text-center font-bold">✅ Animals</div>
            <div className="bg-white border-2 border-black p-3 text-center font-bold">✅ Any BG!</div>
          </div>
        </div>
      </div>
    </ToolLayout>
  );
}
