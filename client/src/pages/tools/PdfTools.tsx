import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { ToolLayout } from "@/components/ToolLayout";
import { Button } from "@/components/ui/button";
import { PDFDocument } from "pdf-lib";
import { saveAs } from "file-saver";
import { Loader2, Upload, FileText, Scissors, Layers, Download, X } from "lucide-react";
import { toast } from "sonner";
import { SeoHead } from "@/components/SeoHead";
import { Skeleton } from "@/components/ui/skeleton";
import { ToolContent } from "@/components/ToolContent";

type PdfAction = "merge" | "split";

export default function PdfTools() {
  const [files, setFiles] = useState<File[]>([]);
  const [action, setAction] = useState<PdfAction>("merge");
  const [isProcessing, setIsProcessing] = useState(false);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setFiles((prev) => [...prev, ...acceptedFiles]);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf']
    }
  });

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const processFiles = async () => {
    if (files.length === 0) return;
    setIsProcessing(true);

    try {
      if (action === "merge") {
        const mergedPdf = await PDFDocument.create();
        
        for (const file of files) {
          const fileBuffer = await file.arrayBuffer();
          const pdf = await PDFDocument.load(fileBuffer);
          const copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
          copiedPages.forEach((page) => mergedPdf.addPage(page));
        }

        const pdfBytes = await mergedPdf.save();
        const blob = new Blob([pdfBytes], { type: "application/pdf" });
        saveAs(blob, "merged-document.pdf");
        toast.success("PDFs merged successfully!");
      } 
      else if (action === "split") {
        // Simple split: save each page as a new PDF
        // Note: For MVP we just split the first file
        const file = files[0];
        const fileBuffer = await file.arrayBuffer();
        const pdf = await PDFDocument.load(fileBuffer);
        const pageCount = pdf.getPageCount();

        for (let i = 0; i < pageCount; i++) {
          const newPdf = await PDFDocument.create();
          const [page] = await newPdf.copyPages(pdf, [i]);
          newPdf.addPage(page);
          const pdfBytes = await newPdf.save();
          const blob = new Blob([pdfBytes], { type: "application/pdf" });
          saveAs(blob, `${file.name.replace('.pdf', '')}-page-${i + 1}.pdf`);
        }
        toast.success(`Split into ${pageCount} files successfully!`);
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to process PDF files");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <ToolLayout
      title="PDF Tools"
      description="Merge multiple PDFs into one, or split a PDF into separate pages. 100% client-side processing for privacy."
    >
      <SeoHead 
        title="Free PDF Merger & Splitter"
        description="Merge and split PDF files online for free. Secure client-side processing, no file upload limits."
        keywords="pdf merger, split pdf, combine pdf, free pdf tools, online pdf converter"
      />
      <div className="space-y-8">
        {/* Action Selection */}
        <div className="grid grid-cols-2 gap-4">
          <button
            onClick={() => setAction("merge")}
            className={`
              p-6 text-left border-4 transition-all
              ${action === "merge" 
                ? "border-primary bg-primary text-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] translate-x-[-4px] translate-y-[-4px]" 
                : "border-gray-200 hover:border-black bg-white text-black"}
            `}
            style={{borderColor: action === "merge" ? '#ff6900' : '#e5e7eb', backgroundColor: action === "merge" ? '#ff6900' : '#ffffff'}}
          >
            <Layers className="w-8 h-8 mb-4" />
            <h3 className="text-xl font-black uppercase">Merge PDF</h3>
            <p className={`text-sm mt-2 font-medium ${action === "merge" ? "text-white/90" : "text-muted-foreground"}`}>
              Combine multiple PDF files into a single document
            </p>
          </button>

          <button
            onClick={() => setAction("split")}
            className={`
              p-6 text-left border-4 transition-all
              ${action === "split" 
                ? "border-primary bg-primary text-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] translate-x-[-4px] translate-y-[-4px]" 
                : "border-gray-200 hover:border-black bg-white text-black"}
            `}
            style={{borderColor: action === "split" ? '#ff6900' : '#e5e7eb', backgroundColor: action === "split" ? '#ff6900' : '#ffffff'}}
          >
            <Scissors className="w-8 h-8 mb-4" />
            <h3 className="text-xl font-black uppercase">Split PDF</h3>
            <p className={`text-sm mt-2 font-medium ${action === "split" ? "text-white/90" : "text-muted-foreground"}`}>
              Separate a PDF file into individual pages
            </p>
          </button>
        </div>

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
                {isDragActive ? "Drop PDF files here" : "Drag & Drop PDF files here"}
              </p>
              <p className="text-muted-foreground font-medium" style={{color: '#5a5858'}}>
                or click to select files
              </p>
            </div>
          </div>
        </div>

        {/* File List */}
        {files.length > 0 && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold uppercase" style={{color: '#000000'}}>Selected Files ({files.length})</h3>
              <Button 
                onClick={() => setFiles([])}
                variant="ghost"
                className="text-red-500 hover:text-red-600 hover:bg-red-50"
              >
                Clear All
              </Button>
            </div>

            <div className="space-y-2">
              {files.map((file, index) => (
                <div key={index} className="flex items-center justify-between p-4 border-2 border-gray-100 bg-white group hover:border-black transition-colors" style={{borderColor: '#e5e7eb'}}>
                  <div className="flex items-center gap-3 overflow-hidden">
                    <div className="bg-red-50 p-2 text-red-500">
                      <FileText className="w-5 h-5" />
                    </div>
                    <div className="min-w-0">
                      <p className="font-bold truncate" style={{color: '#000000'}}>{file.name}</p>
                      <p className="text-xs text-muted-foreground" style={{color: '#6b7280'}}>{(file.size / 1024 / 1024).toFixed(2)} MB</p>
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
              {isProcessing && (
                <div className="flex items-center justify-between p-4 border-2 border-gray-100 bg-white">
                  <div className="flex items-center gap-3 w-full">
                    <Skeleton className="h-10 w-10 rounded-none" />
                    <div className="space-y-2 w-full">
                      <Skeleton className="h-4 w-3/4" />
                      <Skeleton className="h-3 w-1/2" />
                    </div>
                  </div>
                </div>
              )}
            </div>

            <Button 
              onClick={processFiles} 
              disabled={isProcessing}
              className="w-full bg-primary hover:bg-primary/90 text-white font-bold uppercase tracking-wider rounded-none border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-y-1 active:shadow-none transition-all h-14 text-lg"
            >
              {isProcessing ? (
                <>
                  <Loader2 className="mr-2 h-6 w-6 animate-spin" />
                  Processing PDF...
                </>
              ) : (
                <>
                  <Download className="mr-2 h-6 w-6" />
                  {action === "merge" ? "Merge PDFs" : "Split PDF"}
                </>
              )}
            </Button>
          </div>
        )}
      </div>

      <ToolContent 
        howTo={{
          title: "How to Merge or Split PDFs",
          content: [
            "Choose your desired action: 'Merge PDF' to combine files or 'Split PDF' to separate pages.",
            "Drag and drop your PDF files into the upload area, or click to select them from your device.",
            "For merging: Arrange your files in the order you want them to appear in the final document.",
            "For splitting: The tool will automatically separate every page into a new PDF file.",
            "Click the action button ('Merge PDFs' or 'Split PDF') to process your files instantly.",
            "Download your new PDF document(s) immediately."
          ]
        }}
        features={[
          {
            title: "Private & Secure",
            content: "Your sensitive documents never leave your computer. All PDF processing is performed locally in your browser using advanced WebAssembly technology."
          },
          {
            title: "Combine Multiple Files",
            content: "Easily merge reports, invoices, or scanned documents into a single, organized PDF file. Perfect for business and academic submissions."
          },
          {
            title: "Extract Pages Instantly",
            content: "Need just one page from a large document? Our split tool extracts every page into a separate file in seconds, saving you time and effort."
          },
          {
            title: "No File Size Limits",
            content: "Because we don't upload your files to a server, you can process large PDF documents without worrying about upload caps or slow transfer speeds."
          }
        ]}
        faqs={[
          {
            question: "Is it safe to upload confidential documents?",
            answer: "Yes, it is 100% safe. In fact, you aren't 'uploading' them at all. Our tool runs the code directly in your browser, so your data never travels over the internet."
          },
          {
            question: "Can I merge PDFs with different page sizes?",
            answer: "Yes, our tool handles PDFs with varying page dimensions (e.g., A4 and Letter) and orientations (Portrait and Landscape) seamlessly."
          },
          {
            question: "Is there a limit to how many files I can merge?",
            answer: "There is no hard limit on the number of files. You can merge as many PDFs as your computer's memory can handle."
          },
          {
            question: "Does this tool work on Mac and Windows?",
            answer: "Yes, ToolBox Hub works on all operating systems including Windows, macOS, Linux, iOS, and Android, as long as you have a modern web browser."
          }
        ]}
      />
    </ToolLayout>
  );
}
