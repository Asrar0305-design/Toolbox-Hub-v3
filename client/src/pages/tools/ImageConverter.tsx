import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { ToolLayout } from "@/components/ToolLayout";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Loader2, Upload, Download, X, Image as ImageIcon } from "lucide-react";
import JSZip from "jszip";
import { saveAs } from "file-saver";
import { SeoHead } from "@/components/SeoHead";
import { Skeleton } from "@/components/ui/skeleton";
import { ToolContent } from "@/components/ToolContent";

interface ProcessedFile {
  originalName: string;
  convertedName: string;
  blob: Blob;
  url: string;
}

export default function ImageConverter() {
  const [files, setFiles] = useState<File[]>([]);
  const [targetFormat, setTargetFormat] = useState<string>("png");
  const [isProcessing, setIsProcessing] = useState(false);
  const [processedFiles, setProcessedFiles] = useState<ProcessedFile[]>([]);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setFiles((prev) => [...prev, ...acceptedFiles]);
    setProcessedFiles([]); // Reset processed files when new files are added
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.png', '.jpg', '.jpeg', '.webp', '.gif', '.bmp', '.tiff']
    }
  });

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const convertImages = async () => {
    setIsProcessing(true);
    setProcessedFiles([]);
    
    const results: ProcessedFile[] = [];

    try {
      for (const file of files) {
        const bitmap = await createImageBitmap(file);
        const canvas = document.createElement('canvas');
        canvas.width = bitmap.width;
        canvas.height = bitmap.height;
        
        const ctx = canvas.getContext('2d');
        if (!ctx) continue;
        
        ctx.drawImage(bitmap, 0, 0);
        
        const mimeType = `image/${targetFormat}`;
        const blob = await new Promise<Blob | null>((resolve) => 
          canvas.toBlob(resolve, mimeType, 0.9)
        );

        if (blob) {
          const nameWithoutExt = file.name.substring(0, file.name.lastIndexOf('.'));
          results.push({
            originalName: file.name,
            convertedName: `${nameWithoutExt}.${targetFormat}`,
            blob,
            url: URL.createObjectURL(blob)
          });
        }
      }
      setProcessedFiles(results);
    } catch (error) {
      console.error("Conversion failed", error);
    } finally {
      setIsProcessing(false);
    }
  };

  const downloadAll = async () => {
    if (processedFiles.length === 0) return;

    if (processedFiles.length === 1) {
      saveAs(processedFiles[0].blob, processedFiles[0].convertedName);
    } else {
      const zip = new JSZip();
      processedFiles.forEach(file => {
        zip.file(file.convertedName, file.blob);
      });
      const content = await zip.generateAsync({ type: "blob" });
      saveAs(content, "converted_images.zip");
    }
  };

  return (
    <ToolLayout
      title="Image Converter"
      description="Convert your images to PNG, JPG, WEBP, and more. Fast, free, and secure - processed entirely in your browser."
    >
      <SeoHead 
        title="Free Image Converter - PNG, JPG, WEBP"
        description="Convert images online for free. Support for PNG, JPG, WEBP, BMP. Batch processing, no upload required, 100% secure."
        keywords="image converter, png to jpg, jpg to png, webp converter, free image tool"
      />
      <div className="space-y-8">
        {/* Upload Area */}
        <div
          {...getRootProps()}
          className={`
            border-4 border-dashed p-12 text-center cursor-pointer transition-all
            ${isDragActive ? "border-primary bg-primary/5" : "border-gray-200 hover:border-gray-900"}
          `}
          style={{borderColor: '#000000', backgroundColor: '#ffffff'}}
        >
          <input {...getInputProps()} />
          <div className="flex flex-col items-center gap-4">
            <div className={`p-4 rounded-full ${isDragActive ? "bg-primary text-white" : "bg-black text-white"}`}>
              <Upload className="w-8 h-8" />
            </div>
            <div className="space-y-2">
              <p className="text-xl font-bold uppercase tracking-tight" style={{color: '#000000'}}>
                {isDragActive ? "Drop files here" : "Drag & Drop images here"}
              </p>
              <p className="text-muted-foreground font-medium" style={{color: '#5a5858'}}>
                or click to select files
              </p>
            </div>
          </div>
        </div>

        {/* File List & Controls */}
        {files.length > 0 && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-gray-50 p-6 border-2 border-gray-100" style={{backgroundColor: '#f9fafb', borderColor: '#e5e7eb'}}>
              <div className="flex items-center gap-4 w-full md:w-auto">
                <span className="font-bold uppercase whitespace-nowrap" style={{color: '#000000'}}>Convert to:</span>
                <Select value={targetFormat} onValueChange={setTargetFormat}>
                  <SelectTrigger className="w-full md:w-[180px] bg-white border-2 border-black rounded-none font-bold focus:ring-0 focus:ring-offset-0 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-y-1 active:shadow-none transition-all">
                    <SelectValue placeholder="Format" />
                  </SelectTrigger>
                  <SelectContent className="rounded-none border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                    <SelectItem value="png" className="font-medium focus:bg-primary focus:text-white rounded-none cursor-pointer">PNG</SelectItem>
                    <SelectItem value="jpeg" className="font-medium focus:bg-primary focus:text-white rounded-none cursor-pointer">JPG</SelectItem>
                    <SelectItem value="webp" className="font-medium focus:bg-primary focus:text-white rounded-none cursor-pointer">WEBP</SelectItem>
                    <SelectItem value="bmp" className="font-medium focus:bg-primary focus:text-white rounded-none cursor-pointer">BMP</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <Button 
                onClick={convertImages} 
                disabled={isProcessing}
                className="w-full md:w-auto bg-primary hover:bg-primary/90 text-white font-bold uppercase tracking-wider rounded-none border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-y-1 active:shadow-none transition-all h-12 px-8"
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Processing...
                  </>
                ) : (
                  "Convert Now"
                )}
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {files.map((file, index) => (
                <div key={index} className="flex items-center justify-between p-4 border-2 border-gray-100 bg-white group hover:border-black transition-colors" style={{borderColor: '#e5e7eb'}}>
                  <div className="flex items-center gap-3 overflow-hidden">
                    <div className="bg-gray-100 p-2">
                      <ImageIcon className="w-5 h-5 text-gray-500" />
                    </div>
                    <div className="min-w-0">
                      <p className="font-bold truncate" style={{color: '#000000'}}>{file.name}</p>
                      <p className="text-xs text-muted-foreground" style={{color: '#6b7280'}}>{(file.size / 1024).toFixed(1)} KB</p>
                    </div>
                  </div>
                  <button 
                    onClick={() => removeFile(index)}
                    className="p-2 hover:bg-red-50 text-gray-400 hover:text-red-500 transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              ))}
              {isProcessing && Array.from({ length: files.length }).map((_, i) => (
                <div key={`skeleton-${i}`} className="flex items-center justify-between p-4 border-2 border-gray-100 bg-white">
                  <div className="flex items-center gap-3 w-full">
                    <Skeleton className="h-10 w-10 rounded-none" />
                    <div className="space-y-2 w-full">
                      <Skeleton className="h-4 w-3/4" />
                      <Skeleton className="h-3 w-1/2" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Results */}
        {processedFiles.length > 0 && (
          <div className="space-y-6 pt-8 border-t-4 border-black animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-black uppercase tracking-tight" style={{color: '#000000'}}>Results</h2>
              <Button 
                onClick={downloadAll}
                className="bg-black hover:bg-gray-800 text-white font-bold uppercase tracking-wider rounded-none h-12 px-6"
              >
                <Download className="mr-2 h-5 w-5" />
                Download All
              </Button>
            </div>

            <div className="grid grid-cols-1 gap-4">
              {processedFiles.map((file, index) => (
                <div key={index} className="flex items-center justify-between p-4 border-2 border-primary/20 bg-primary/5">
                  <div className="flex items-center gap-3">
                    <div className="bg-white p-2 border border-primary/20">
                      <img src={file.url} alt="preview" className="w-10 h-10 object-cover" />
                    </div>
                    <div>
                      <p className="font-bold text-primary">{file.convertedName}</p>
                      <p className="text-xs text-muted-foreground" style={{color: '#6b7280'}}>Ready to download</p>
                    </div>
                  </div>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => saveAs(file.blob, file.convertedName)}
                    className="hover:bg-primary hover:text-white rounded-none"
                  >
                    <Download className="w-5 h-5" />
                  </Button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <ToolContent 
        howTo={{
          title: "How to Convert Images Online",
          content: [
            "Drag and drop your image files (PNG, JPG, WEBP, etc.) into the upload area above.",
            "Select your desired output format from the dropdown menu (e.g., Convert to PNG, JPG, WEBP).",
            "Click the 'Convert Now' button to start the batch processing.",
            "Wait for the conversion to finish - it usually takes less than a second per image.",
            "Download your converted images individually or as a single ZIP file."
          ]
        }}
        features={[
          {
            title: "100% Secure & Private",
            content: "All conversions happen directly in your browser. Your images are never uploaded to any server, ensuring complete privacy and security for your sensitive files."
          },
          {
            title: "Lightning Fast Batch Processing",
            content: "Convert hundreds of images at once without waiting for uploads or downloads. Our local processing engine utilizes your device's power for maximum speed."
          },
          {
            title: "Support for All Major Formats",
            content: "Seamlessly convert between PNG, JPG/JPEG, WEBP, BMP, and TIFF formats. Perfect for optimizing images for web, print, or social media."
          },
          {
            title: "No Quality Loss",
            content: "Our advanced conversion algorithms maintain the highest possible quality while optimizing file size. You get crisp, clear images every time."
          }
        ]}
        faqs={[
          {
            question: "Is this image converter free to use?",
            answer: "Yes, ToolBox Hub is completely free to use. There are no hidden fees, subscriptions, or daily limits. You can convert as many images as you need."
          },
          {
            question: "Do I need to install any software?",
            answer: "No, this is a web-based tool that works in your browser (Chrome, Firefox, Safari, Edge). You don't need to download or install any plugins or software."
          },
          {
            question: "Can I convert images on my phone?",
            answer: "Absolutely! Our tool is fully responsive and works perfectly on iPhone, Android, and tablets. You can convert images directly from your photo gallery."
          },
          {
            question: "What is the maximum file size limit?",
            answer: "Since files are processed locally on your device, there is no strict server-side limit. However, for optimal browser performance, we recommend keeping individual files under 50MB."
          }
        ]}
      />
    </ToolLayout>
  );
}
