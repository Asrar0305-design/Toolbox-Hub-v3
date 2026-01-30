import { ToolLayout } from "@/components/ToolLayout";
import { Binary } from "lucide-react";

export default function Base64Encoder() {
  return (
    <ToolLayout
      title="Base64Encoder"
      description="Tool description coming soon."
      icon={Binary}
    >
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="bg-white border-4 border-black p-8" style={{borderColor: '#000000', backgroundColor: '#ffffff'}}>
          <h2 className="text-2xl font-black uppercase mb-4">Coming Soon</h2>
          <p className="text-gray-600 font-medium mb-6">
            This tool is currently in development and will be available soon.
          </p>
          <div className="bg-gray-100 border-2 border-black p-12 text-center" style={{borderColor: '#000000', backgroundColor: '#f3f4f6'}}>
            <Binary className="w-16 h-16 mx-auto mb-4 text-cyan-500" />
            <p className="text-gray-500 font-medium">Tool interface coming soon...</p>
          </div>
        </div>
      </div>
    </ToolLayout>
  );
}
