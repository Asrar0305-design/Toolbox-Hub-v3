import { ToolLayout } from "@/components/ToolLayout";
import { Button } from "@/components/ui/button";
import { Eraser } from "lucide-react";

export default function BackgroundRemover() {
  return (
    <ToolLayout
      title="Background Remover"
      description="Remove image backgrounds automatically with AI technology. Perfect for product photos, portraits, and graphic design."
      icon={Eraser}
    >
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="bg-white border-4 border-black p-8" style={{borderColor: '#000000', backgroundColor: '#ffffff'}}>
          <h2 className="text-2xl font-black uppercase mb-4">Coming Soon</h2>
          <p className="text-gray-600 font-medium mb-6">
            Our AI-powered background remover is currently in development. Upload your images and remove backgrounds instantly with one click.
          </p>
          <div className="bg-gray-100 border-2 border-black p-12 text-center" style={{borderColor: '#000000', backgroundColor: '#f3f4f6'}}>
            <Eraser className="w-16 h-16 mx-auto mb-4 text-purple-500" />
            <p className="text-gray-500 font-medium">Tool interface coming soon...</p>
          </div>
        </div>
        
        <div className="bg-gray-50 border-4 border-black p-8" style={{borderColor: '#000000', backgroundColor: '#f9fafb'}}>
          <h3 className="text-xl font-black uppercase mb-4">Features</h3>
          <ul className="space-y-2 text-gray-600 font-medium">
            <li>• AI-powered automatic background removal</li>
            <li>• Support for PNG, JPG, and WEBP formats</li>
            <li>• High-quality edge detection</li>
            <li>• Batch processing for multiple images</li>
            <li>• Download transparent PNG files</li>
          </ul>
        </div>
      </div>
    </ToolLayout>
  );
}
