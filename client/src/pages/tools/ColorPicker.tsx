import { ToolLayout } from "@/components/ToolLayout";
import { Button } from "@/components/ui/button";
import { Palette, Copy, Check } from "lucide-react";
import { useState, useEffect } from "react";

export default function ColorPicker() {
  const [color, setColor] = useState<string>("#3b82f6");
  const [hex, setHex] = useState<string>("#3b82f6");
  const [rgb, setRgb] = useState<string>("rgb(59, 130, 246)");
  const [hsl, setHsl] = useState<string>("hsl(217, 91%, 60%)");
  const [copiedField, setCopiedField] = useState<string | null>(null);

  useEffect(() => {
    updateFormats(color);
  }, [color]);

  const hexToRgb = (hex: string): { r: number; g: number; b: number } => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
      ? {
          r: parseInt(result[1], 16),
          g: parseInt(result[2], 16),
          b: parseInt(result[3], 16),
        }
      : { r: 0, g: 0, b: 0 };
  };

  const rgbToHsl = (r: number, g: number, b: number): { h: number; s: number; l: number } => {
    r /= 255;
    g /= 255;
    b /= 255;

    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h = 0;
    let s = 0;
    const l = (max + min) / 2;

    if (max !== min) {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

      switch (max) {
        case r:
          h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
          break;
        case g:
          h = ((b - r) / d + 2) / 6;
          break;
        case b:
          h = ((r - g) / d + 4) / 6;
          break;
      }
    }

    return {
      h: Math.round(h * 360),
      s: Math.round(s * 100),
      l: Math.round(l * 100),
    };
  };

  const updateFormats = (hexColor: string) => {
    setHex(hexColor);
    const rgbValues = hexToRgb(hexColor);
    setRgb(`rgb(${rgbValues.r}, ${rgbValues.g}, ${rgbValues.b})`);
    const hslValues = rgbToHsl(rgbValues.r, rgbValues.g, rgbValues.b);
    setHsl(`hsl(${hslValues.h}, ${hslValues.s}%, ${hslValues.l}%)`);
  };

  const handleCopy = async (value: string, field: string) => {
    await navigator.clipboard.writeText(value);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const presetColors = [
    "#ef4444", "#f97316", "#f59e0b", "#eab308", "#84cc16", "#22c55e",
    "#10b981", "#14b8a6", "#06b6d4", "#0ea5e9", "#3b82f6", "#6366f1",
    "#8b5cf6", "#a855f7", "#d946ef", "#ec4899", "#f43f5e", "#000000",
    "#374151", "#6b7280", "#9ca3af", "#d1d5db", "#e5e7eb", "#ffffff",
  ];

  return (
    <ToolLayout
      title="Color Picker"
      description="Pick colors and convert between HEX, RGB, and HSL formats instantly."
      icon={Palette}
    >
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Color Picker Section */}
        <div className="bg-white border-4 border-black p-8" style={{borderColor: '#000000', backgroundColor: '#ffffff'}}>
          <h2 className="text-2xl font-black uppercase mb-6">Pick a Color</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <label className="block font-black uppercase mb-4">Color Selector</label>
              <input
                type="color"
                value={color}
                onChange={(e) => setColor(e.target.value)}
                className="w-full h-64 border-4 border-black cursor-pointer"
                style={{borderColor: '#000000'}}
              />
            </div>
            
            <div>
              <label className="block font-black uppercase mb-4">Preview</label>
              <div
                className="w-full h-64 border-4 border-black flex items-center justify-center"
                style={{borderColor: '#000000', backgroundColor: color}}
              >
                <div className="bg-white bg-opacity-90 px-6 py-3 border-2 border-black">
                  <p className="font-black text-2xl" style={{color: color}}>{hex}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Format Outputs */}
        <div className="bg-white border-4 border-black p-8" style={{borderColor: '#000000', backgroundColor: '#ffffff'}}>
          <h2 className="text-2xl font-black uppercase mb-6">Color Formats</h2>
          
          <div className="space-y-4">
            {/* HEX */}
            <div>
              <label className="block font-black uppercase mb-2">HEX</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={hex}
                  readOnly
                  className="flex-1 p-4 border-4 border-black font-mono text-lg bg-gray-50"
                  style={{borderColor: '#000000', backgroundColor: '#f9fafb'}}
                />
                <Button
                  onClick={() => handleCopy(hex, 'hex')}
                  className="border-4 border-black font-bold px-6"
                  style={{borderColor: '#000000'}}
                  variant="outline"
                >
                  {copiedField === 'hex' ? (
                    <Check className="w-5 h-5" />
                  ) : (
                    <Copy className="w-5 h-5" />
                  )}
                </Button>
              </div>
            </div>

            {/* RGB */}
            <div>
              <label className="block font-black uppercase mb-2">RGB</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={rgb}
                  readOnly
                  className="flex-1 p-4 border-4 border-black font-mono text-lg bg-gray-50"
                  style={{borderColor: '#000000', backgroundColor: '#f9fafb'}}
                />
                <Button
                  onClick={() => handleCopy(rgb, 'rgb')}
                  className="border-4 border-black font-bold px-6"
                  style={{borderColor: '#000000'}}
                  variant="outline"
                >
                  {copiedField === 'rgb' ? (
                    <Check className="w-5 h-5" />
                  ) : (
                    <Copy className="w-5 h-5" />
                  )}
                </Button>
              </div>
            </div>

            {/* HSL */}
            <div>
              <label className="block font-black uppercase mb-2">HSL</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={hsl}
                  readOnly
                  className="flex-1 p-4 border-4 border-black font-mono text-lg bg-gray-50"
                  style={{borderColor: '#000000', backgroundColor: '#f9fafb'}}
                />
                <Button
                  onClick={() => handleCopy(hsl, 'hsl')}
                  className="border-4 border-black font-bold px-6"
                  style={{borderColor: '#000000'}}
                  variant="outline"
                >
                  {copiedField === 'hsl' ? (
                    <Check className="w-5 h-5" />
                  ) : (
                    <Copy className="w-5 h-5" />
                  )}
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Preset Colors */}
        <div className="bg-white border-4 border-black p-8" style={{borderColor: '#000000', backgroundColor: '#ffffff'}}>
          <h2 className="text-2xl font-black uppercase mb-6">Preset Colors</h2>
          <div className="grid grid-cols-6 md:grid-cols-12 gap-2">
            {presetColors.map((presetColor) => (
              <button
                key={presetColor}
                onClick={() => setColor(presetColor)}
                className="w-full aspect-square border-4 border-black hover:scale-110 transition-transform cursor-pointer"
                style={{borderColor: '#000000', backgroundColor: presetColor}}
                title={presetColor}
              />
            ))}
          </div>
        </div>

        {/* Info Section */}
        <div className="bg-gray-50 border-4 border-black p-8" style={{borderColor: '#000000', backgroundColor: '#f9fafb'}}>
          <h3 className="text-xl font-black uppercase mb-4">Color Format Guide</h3>
          <div className="space-y-4 text-gray-600 font-medium">
            <div>
              <h4 className="font-black text-black mb-2">HEX (Hexadecimal)</h4>
              <p>Most common format for web design. Format: #RRGGBB where each pair represents Red, Green, and Blue values in hexadecimal (00-FF).</p>
            </div>
            <div>
              <h4 className="font-black text-black mb-2">RGB (Red, Green, Blue)</h4>
              <p>Uses decimal values from 0-255 for each color channel. Format: rgb(red, green, blue). Widely supported in CSS.</p>
            </div>
            <div>
              <h4 className="font-black text-black mb-2">HSL (Hue, Saturation, Lightness)</h4>
              <p>More intuitive for humans. Hue is 0-360 degrees, Saturation and Lightness are 0-100%. Format: hsl(hue, saturation%, lightness%).</p>
            </div>
          </div>
        </div>
      </div>
    </ToolLayout>
  );
}
