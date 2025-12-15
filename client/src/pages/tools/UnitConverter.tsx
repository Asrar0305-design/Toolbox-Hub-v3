import { useState, useEffect } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowRightLeft, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { SeoHead } from "@/components/SeoHead";
import { ToolContent } from "@/components/ToolContent";

const categories = {
  length: {
    units: {
      m: 1,
      km: 1000,
      cm: 0.01,
      mm: 0.001,
      mi: 1609.34,
      yd: 0.9144,
      ft: 0.3048,
      in: 0.0254
    },
    labels: {
      m: "Meters",
      km: "Kilometers",
      cm: "Centimeters",
      mm: "Millimeters",
      mi: "Miles",
      yd: "Yards",
      ft: "Feet",
      in: "Inches"
    }
  },
  weight: {
    units: {
      kg: 1,
      g: 0.001,
      mg: 0.000001,
      lb: 0.453592,
      oz: 0.0283495,
      t: 1000
    },
    labels: {
      kg: "Kilograms",
      g: "Grams",
      mg: "Milligrams",
      lb: "Pounds",
      oz: "Ounces",
      t: "Metric Tons"
    }
  },
  temperature: {
    // Temperature requires special handling
    labels: {
      c: "Celsius",
      f: "Fahrenheit",
      k: "Kelvin"
    }
  },
  data: {
    units: {
      b: 1,
      kb: 1024,
      mb: 1048576,
      gb: 1073741824,
      tb: 1099511627776
    },
    labels: {
      b: "Bytes",
      kb: "Kilobytes",
      mb: "Megabytes",
      gb: "Gigabytes",
      tb: "Terabytes"
    }
  }
};

export default function UnitConverter() {
  const [category, setCategory] = useState("length");
  const [fromUnit, setFromUnit] = useState("m");
  const [toUnit, setToUnit] = useState("ft");
  const [fromValue, setFromValue] = useState("1");
  const [toValue, setToValue] = useState("");

  // Reset units when category changes
  useEffect(() => {
    const defaultUnits = {
      length: ["m", "ft"],
      weight: ["kg", "lb"],
      temperature: ["c", "f"],
      data: ["mb", "gb"]
    };
    setFromUnit(defaultUnits[category as keyof typeof defaultUnits][0]);
    setToUnit(defaultUnits[category as keyof typeof defaultUnits][1]);
  }, [category]);

  // Perform conversion
  useEffect(() => {
    if (fromValue === "" || isNaN(Number(fromValue))) {
      setToValue("");
      return;
    }

    const val = Number(fromValue);

    if (category === "temperature") {
      let result = 0;
      // Convert to Celsius first
      let celsius = val;
      if (fromUnit === "f") celsius = (val - 32) * 5/9;
      if (fromUnit === "k") celsius = val - 273.15;

      // Convert from Celsius to target
      if (toUnit === "c") result = celsius;
      if (toUnit === "f") result = (celsius * 9/5) + 32;
      if (toUnit === "k") result = celsius + 273.15;

      setToValue(result.toFixed(2));
    } else {
      // Standard linear conversion
      const cat = categories[category as keyof typeof categories] as any;
      const baseValue = val * cat.units[fromUnit];
      const result = baseValue / cat.units[toUnit];
      
      // Format output to avoid floating point errors but keep precision
      setToValue(Number(result.toPrecision(6)).toString());
    }
  }, [fromValue, fromUnit, toUnit, category]);

  const swapUnits = () => {
    setFromUnit(toUnit);
    setToUnit(fromUnit);
    setFromValue(toValue);
  };

  const copyResult = () => {
    if (!toValue) return;
    navigator.clipboard.writeText(toValue);
    toast.success("Result copied to clipboard");
  };

  return (
    <ToolLayout
      title="Unit Converter"
      description="Convert between common units of measurement. Length, weight, temperature, and data storage."
    >
      <SeoHead 
        title="Free Online Unit Converter"
        description="Convert length, weight, temperature, and data units instantly. Supports metric and imperial systems."
        keywords="unit converter, metric converter, imperial converter, length converter, weight converter"
      />

      <div className="space-y-8">
        <Tabs defaultValue="length" onValueChange={setCategory} className="w-full">
          <TabsList className="w-full grid grid-cols-4 bg-gray-100 p-1 rounded-none border-2 border-black h-auto" style={{backgroundColor: '#f3f4f6', borderColor: '#000000'}}>
            <TabsTrigger value="length" className="rounded-none data-[state=active]:bg-black data-[state=active]:text-white py-3 font-bold uppercase">Length</TabsTrigger>
            <TabsTrigger value="weight" className="rounded-none data-[state=active]:bg-black data-[state=active]:text-white py-3 font-bold uppercase">Weight</TabsTrigger>
            <TabsTrigger value="temperature" className="rounded-none data-[state=active]:bg-black data-[state=active]:text-white py-3 font-bold uppercase hidden md:inline-flex">Temp</TabsTrigger>
            <TabsTrigger value="temperature" className="rounded-none data-[state=active]:bg-black data-[state=active]:text-white py-3 font-bold uppercase md:hidden">°C</TabsTrigger>
            <TabsTrigger value="data" className="rounded-none data-[state=active]:bg-black data-[state=active]:text-white py-3 font-bold uppercase">Data</TabsTrigger>
          </TabsList>
        </Tabs>

        <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-6 items-end">
          {/* From Section */}
          <div className="space-y-4">
            <Label className="font-bold uppercase" style={{color: '#000000'}}>From</Label>
            <div className="flex gap-2">
              <Input 
                type="number" 
                value={fromValue}
                onChange={(e) => setFromValue(e.target.value)}
                className="h-14 text-lg border-2 border-black rounded-none focus-visible:ring-0 focus-visible:border-primary"
                style={{borderColor: '#000000', color: '#000000'}}
              />
              <Select value={fromUnit} onValueChange={setFromUnit}>
                <SelectTrigger className="w-[140px] h-14 border-2 border-black rounded-none bg-gray-50 font-bold" style={{borderColor: '#000000', backgroundColor: '#f9fafb'}}>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries((categories as any)[category].labels).map(([key, label]) => (
                    <SelectItem key={key} value={key}>{label as string}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Swap Button */}
          <div className="flex justify-center pb-2">
            <Button 
              onClick={swapUnits}
              variant="outline" 
              className="h-10 w-10 p-0 rounded-full border-2 border-black hover:bg-primary hover:text-white hover:border-primary transition-colors"
              style={{borderColor: '#000000'}}
            >
              <ArrowRightLeft className="w-4 h-4" />
            </Button>
          </div>

          {/* To Section */}
          <div className="space-y-4">
            <Label className="font-bold uppercase" style={{color: '#000000'}}>To</Label>
            <div className="flex gap-2">
              <Input 
                readOnly
                value={toValue}
                className="h-14 text-lg border-2 border-black rounded-none bg-gray-100 font-bold"
                style={{borderColor: '#000000', backgroundColor: '#f3f4f6', color: '#000000'}}
              />
              <Select value={toUnit} onValueChange={setToUnit}>
                <SelectTrigger className="w-[140px] h-14 border-2 border-black rounded-none bg-gray-50 font-bold" style={{borderColor: '#000000', backgroundColor: '#f9fafb'}}>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries((categories as any)[category].labels).map(([key, label]) => (
                    <SelectItem key={key} value={key}>{label as string}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Copy Result */}
        <div className="flex justify-end">
          <Button 
            onClick={copyResult}
            className="bg-black hover:bg-primary text-white font-bold uppercase rounded-none h-12 px-8 border-2 border-transparent hover:border-black transition-all"
          >
            <Copy className="w-4 h-4 mr-2" />
            Copy Result
          </Button>
        </div>
      </div>

      <ToolContent 
        howTo={{
          title: "How to Convert Units",
          content: [
            "Select the category of measurement you want to convert (Length, Weight, Temperature, or Data) from the tabs at the top.",
            "Enter the value you want to convert in the 'From' input field.",
            "Choose the starting unit from the dropdown menu next to the input field.",
            "Select the target unit from the dropdown menu in the 'To' section.",
            "The converted result will appear instantly in the 'To' field.",
            "Click the 'Copy Result' button to save the converted value to your clipboard."
          ]
        }}
        features={[
          {
            title: "Multi-Category Support",
            content: "Why use multiple websites? Our all-in-one converter handles Length (meters, feet), Weight (kilograms, pounds), Temperature (Celsius, Fahrenheit), and Digital Data (bytes, gigabytes)."
          },
          {
            title: "Instant Calculation",
            content: "No waiting for page reloads. Our tool performs calculations in real-time as you type, providing immediate feedback for a seamless user experience."
          },
          {
            title: "High Precision",
            content: "We use advanced floating-point arithmetic to ensure accuracy up to 6 decimal places, making this tool suitable for scientific and engineering calculations."
          },
          {
            title: "Smart Unit Swapping",
            content: "Need to reverse the conversion? Just click the swap arrow button to instantly switch your 'From' and 'To' units without losing your input value."
          }
        ]}
        faqs={[
          {
            question: "What is the difference between Metric and Imperial?",
            answer: "The Metric system (meters, grams) is used by most of the world and is based on powers of 10. The Imperial system (feet, pounds) is primarily used in the United States."
          },
          {
            question: "How accurate are the conversions?",
            answer: "Our conversions are mathematically precise. However, for display purposes, we round very long decimal numbers to 6 significant digits to keep the interface clean."
          },
          {
            question: "Can I convert negative temperatures?",
            answer: "Yes, our temperature converter fully supports negative values, which is essential for converting below-freezing temperatures in Celsius and Fahrenheit."
          },
          {
            question: "Do you support cooking units?",
            answer: "Currently, we focus on scientific and standard units. We plan to add volume (cups, tablespoons) and cooking-specific conversions in a future update."
          }
        ]}
      />
    </ToolLayout>
  );
}
