import { useState, useRef } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { QRCodeCanvas } from "qrcode.react";
import { Download, Share2, Copy } from "lucide-react";
import { toast } from "sonner";
import { SeoHead } from "@/components/SeoHead";
import { ToolContent } from "@/components/ToolContent";

export default function QRCodeGenerator() {
  const [text, setText] = useState("https://toolbox.hub");
  const [size, setSize] = useState(256);
  const [fgColor, setFgColor] = useState("#000000");
  const [bgColor, setBgColor] = useState("#ffffff");
  const qrRef = useRef<HTMLDivElement>(null);

  const downloadQR = () => {
    const canvas = qrRef.current?.querySelector("canvas");
    if (canvas) {
      const url = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.download = "qrcode.png";
      link.href = url;
      link.click();
      toast.success("QR Code downloaded successfully!");
    }
  };

  const copyToClipboard = () => {
    const canvas = qrRef.current?.querySelector("canvas");
    if (canvas) {
      canvas.toBlob((blob) => {
        if (blob) {
          navigator.clipboard.write([
            new ClipboardItem({ "image/png": blob })
          ]).then(() => {
            toast.success("QR Code copied to clipboard!");
          });
        }
      });
    }
  };

  return (
    <ToolLayout
      title="QR Code Generator"
      description="Create custom QR codes for URLs, text, Wi-Fi, and more. Customize colors and size instantly."
    >
      <SeoHead 
        title="Free QR Code Generator"
        description="Generate custom QR codes for free. Add colors, adjust size, and download as PNG. No sign-up needed."
        keywords="qr code generator, free qr code, create qr code, custom qr code"
      />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Controls */}
        <div className="space-y-8">
          <div className="space-y-4">
            <Label className="text-lg font-bold uppercase" style={{color: '#000000'}}>Content</Label>
            <Input
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Enter URL or text..."
              className="h-14 text-lg border-2 border-black rounded-none focus-visible:ring-0 focus-visible:border-primary shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all"
              style={{borderColor: '#000000', color: '#000000'}}
            />
          </div>

          <div className="space-y-6">
            <div className="space-y-4">
              <div className="flex justify-between">
                <Label className="font-bold uppercase" style={{color: '#000000'}}>Size</Label>
                <span className="font-mono text-muted-foreground" style={{color: '#6b7280'}}>{size}px</span>
              </div>
              <Slider
                value={[size]}
                onValueChange={(v) => setSize(v[0])}
                min={128}
                max={512}
                step={8}
                className="py-4"
              />
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label className="font-bold uppercase" style={{color: '#000000'}}>Foreground</Label>
                <div className="flex gap-2">
                  <input
                    type="color"
                    value={fgColor}
                    onChange={(e) => setFgColor(e.target.value)}
                    className="w-12 h-12 p-1 border-2 border-black cursor-pointer"
                    style={{borderColor: '#000000'}}
                  />
                  <Input
                    value={fgColor}
                    onChange={(e) => setFgColor(e.target.value)}
                    className="font-mono uppercase border-2 border-gray-200 rounded-none focus-visible:ring-0 focus-visible:border-black"
                    style={{borderColor: '#e5e7eb', color: '#000000'}}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label className="font-bold uppercase" style={{color: '#000000'}}>Background</Label>
                <div className="flex gap-2">
                  <input
                    type="color"
                    value={bgColor}
                    onChange={(e) => setBgColor(e.target.value)}
                    className="w-12 h-12 p-1 border-2 border-black cursor-pointer"
                    style={{borderColor: '#000000'}}
                  />
                  <Input
                    value={bgColor}
                    onChange={(e) => setBgColor(e.target.value)}
                    className="font-mono uppercase border-2 border-gray-200 rounded-none focus-visible:ring-0 focus-visible:border-black"
                    style={{borderColor: '#e5e7eb', color: '#000000'}}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Preview */}
        <div className="flex flex-col items-center justify-center space-y-8 bg-gray-50 p-8 border-2 border-gray-100" style={{backgroundColor: '#f9fafb', borderColor: '#e5e7eb'}}>
          <div 
            ref={qrRef}
            className="bg-white p-4 shadow-xl"
          >
            <QRCodeCanvas
              value={text}
              size={size}
              fgColor={fgColor}
              bgColor={bgColor}
              level={"H"}
              includeMargin={true}
            />
          </div>

          <div className="flex gap-4 w-full max-w-xs">
            <Button 
              onClick={downloadQR}
              className="flex-1 bg-primary hover:bg-primary/90 text-white font-bold uppercase tracking-wider rounded-none border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-y-1 active:shadow-none transition-all h-12"
            >
              <Download className="mr-2 h-5 w-5" />
              Save
            </Button>
            <Button 
              onClick={copyToClipboard}
              variant="outline"
              className="flex-1 bg-white hover:bg-gray-50 text-black font-bold uppercase tracking-wider rounded-none border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-y-1 active:shadow-none transition-all h-12"
            >
              <Copy className="mr-2 h-5 w-5" />
              Copy
            </Button>
          </div>
        </div>
      </div>

      <ToolContent 
        howTo={{
          title: "How to Create a Custom QR Code",
          content: [
            "Enter your destination URL or text content in the input field.",
            "Watch the QR code preview update instantly as you type.",
            "Customize the appearance by adjusting the size slider (128px to 512px).",
            "Personalize the colors: Choose a foreground color for the code and a background color to match your brand.",
            "Click 'Save' to download the high-resolution PNG file, or 'Copy' to paste it directly into your design."
          ]
        }}
        features={[
          {
            title: "Fully Customizable Design",
            content: "Break away from boring black-and-white QR codes. Our tool allows you to customize foreground and background colors to align perfectly with your brand identity."
          },
          {
            title: "High-Resolution Output",
            content: "Generate crisp, professional-quality QR codes up to 512px in size. Perfect for printing on business cards, flyers, posters, or product packaging."
          },
          {
            title: "Instant Preview",
            content: "See your changes in real-time. No need to click a 'Generate' button every time you make a small adjustment. What you see is exactly what you get."
          },
          {
            title: "Universal Compatibility",
            content: "Our QR codes are 100% standard-compliant and can be scanned by any QR code reader app or smartphone camera (iOS and Android)."
          }
        ]}
        faqs={[
          {
            question: "Do these QR codes expire?",
            answer: "No, never. The QR codes generated here are static, meaning the data is encoded directly into the image. They will work forever as long as your destination URL is active."
          },
          {
            question: "Is there a scan limit?",
            answer: "Absolutely not. Since these are static QR codes, there are no servers involved in the redirection process. You can have unlimited scans for free."
          },
          {
            question: "Can I use these QR codes for commercial purposes?",
            answer: "Yes! You are free to use the QR codes generated by ToolBox Hub for any personal or commercial projects, including marketing materials and product labels."
          },
          {
            question: "What kind of content can I store?",
            answer: "You can encode website URLs, plain text, Wi-Fi network details, email addresses, phone numbers, or vCard contact information."
          }
        ]}
      />
    </ToolLayout>
  );
}
