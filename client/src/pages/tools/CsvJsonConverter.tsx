import { ToolLayout } from "@/components/ToolLayout";
import { Button } from "@/components/ui/button";
import { Table, ArrowRightLeft, Copy, Check, Download } from "lucide-react";
import { useState } from "react";

export default function CsvJsonConverter() {
  const [mode, setMode] = useState<'csvToJson' | 'jsonToCsv'>('csvToJson');
  const [input, setInput] = useState<string>("");
  const [output, setOutput] = useState<string>("");
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState<string>("");

  const csvToJson = (csv: string): string => {
    try {
      const lines = csv.trim().split('\n');
      if (lines.length < 2) {
        throw new Error('CSV must have at least a header row and one data row');
      }

      const headers = lines[0].split(',').map(h => h.trim());
      const result = [];

      for (let i = 1; i < lines.length; i++) {
        const obj: any = {};
        const currentLine = lines[i].split(',');

        for (let j = 0; j < headers.length; j++) {
          const value = currentLine[j]?.trim() || '';
          // Try to parse as number if possible
          obj[headers[j]] = isNaN(Number(value)) ? value : Number(value);
        }

        result.push(obj);
      }

      return JSON.stringify(result, null, 2);
    } catch (err) {
      throw new Error(`CSV parsing error: ${err instanceof Error ? err.message : 'Unknown error'}`);
    }
  };

  const jsonToCsv = (json: string): string => {
    try {
      const data = JSON.parse(json);
      
      if (!Array.isArray(data)) {
        throw new Error('JSON must be an array of objects');
      }

      if (data.length === 0) {
        throw new Error('JSON array is empty');
      }

      // Get headers from first object
      const headers = Object.keys(data[0]);
      
      // Create CSV header row
      let csv = headers.join(',') + '\n';

      // Add data rows
      for (const row of data) {
        const values = headers.map(header => {
          const value = row[header];
          // Wrap in quotes if contains comma
          return typeof value === 'string' && value.includes(',') 
            ? `"${value}"` 
            : value;
        });
        csv += values.join(',') + '\n';
      }

      return csv.trim();
    } catch (err) {
      throw new Error(`JSON parsing error: ${err instanceof Error ? err.message : 'Unknown error'}`);
    }
  };

  const handleConvert = () => {
    setError("");
    try {
      if (!input.trim()) {
        setError("Please enter some data to convert");
        return;
      }

      if (mode === 'csvToJson') {
        const result = csvToJson(input);
        setOutput(result);
      } else {
        const result = jsonToCsv(input);
        setOutput(result);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Conversion failed');
      setOutput("");
    }
  };

  const handleSwitch = () => {
    setMode(mode === 'csvToJson' ? 'jsonToCsv' : 'csvToJson');
    setInput(output);
    setOutput("");
    setError("");
  };

  const handleCopy = async () => {
    if (output) {
      await navigator.clipboard.writeText(output);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleDownload = () => {
    if (!output) return;
    
    const blob = new Blob([output], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = mode === 'csvToJson' ? 'data.json' : 'data.csv';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleClear = () => {
    setInput("");
    setOutput("");
    setError("");
  };

  const exampleCSV = `name,age,city
John,30,New York
Jane,25,Los Angeles
Bob,35,Chicago`;

  const exampleJSON = `[
  {
    "name": "John",
    "age": 30,
    "city": "New York"
  },
  {
    "name": "Jane",
    "age": 25,
    "city": "Los Angeles"
  }
]`;

  const loadExample = () => {
    setInput(mode === 'csvToJson' ? exampleCSV : exampleJSON);
    setOutput("");
    setError("");
  };

  return (
    <ToolLayout
      title="CSV to JSON Converter"
      description="Convert between CSV and JSON formats for data processing and APIs."
      icon={Table}
    >
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Mode Selector */}
        <div className="bg-white border-4 border-black p-6" style={{borderColor: '#000000', backgroundColor: '#ffffff'}}>
          <div className="flex gap-4">
            <Button
              onClick={() => setMode('csvToJson')}
              className={`flex-1 border-4 border-black font-black uppercase py-6 text-lg ${
                mode === 'csvToJson' 
                  ? 'bg-green-500 hover:bg-green-600 text-white' 
                  : 'bg-white hover:bg-gray-100 text-black'
              }`}
              style={{borderColor: '#000000'}}
            >
              CSV → JSON
            </Button>
            <Button
              onClick={() => setMode('jsonToCsv')}
              className={`flex-1 border-4 border-black font-black uppercase py-6 text-lg ${
                mode === 'jsonToCsv' 
                  ? 'bg-green-500 hover:bg-green-600 text-white' 
                  : 'bg-white hover:bg-gray-100 text-black'
              }`}
              style={{borderColor: '#000000'}}
            >
              JSON → CSV
            </Button>
          </div>
        </div>

        {/* Converter */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Input */}
          <div className="bg-white border-4 border-black p-6" style={{borderColor: '#000000', backgroundColor: '#ffffff'}}>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-black uppercase">
                {mode === 'csvToJson' ? 'CSV Input' : 'JSON Input'}
              </h2>
              <Button
                onClick={loadExample}
                size="sm"
                variant="outline"
                className="border-2 border-black font-bold"
                style={{borderColor: '#000000'}}
              >
                Load Example
              </Button>
            </div>
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={mode === 'csvToJson' ? 'Paste CSV data here...' : 'Paste JSON array here...'}
              className="w-full h-[400px] p-4 border-4 border-black font-mono text-sm resize-none focus:outline-none focus:ring-2 focus:ring-green-500"
              style={{borderColor: '#000000'}}
            />
          </div>

          {/* Output */}
          <div className="bg-white border-4 border-black p-6" style={{borderColor: '#000000', backgroundColor: '#ffffff'}}>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-black uppercase">
                {mode === 'csvToJson' ? 'JSON Output' : 'CSV Output'}
              </h2>
              {output && (
                <div className="flex gap-2">
                  <Button
                    onClick={handleCopy}
                    size="sm"
                    variant="outline"
                    className="border-2 border-black font-bold"
                    style={{borderColor: '#000000'}}
                  >
                    {copied ? (
                      <>
                        <Check className="w-4 h-4 mr-2" />
                        Copied!
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4 mr-2" />
                        Copy
                      </>
                    )}
                  </Button>
                  <Button
                    onClick={handleDownload}
                    size="sm"
                    variant="outline"
                    className="border-2 border-black font-bold"
                    style={{borderColor: '#000000'}}
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Download
                  </Button>
                </div>
              )}
            </div>
            <textarea
              value={output}
              readOnly
              placeholder="Converted data will appear here..."
              className="w-full h-[400px] p-4 border-4 border-black font-mono text-sm resize-none bg-gray-50 focus:outline-none"
              style={{borderColor: '#000000', backgroundColor: '#f9fafb'}}
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="bg-white border-4 border-black p-6" style={{borderColor: '#000000', backgroundColor: '#ffffff'}}>
          <div className="flex gap-4">
            <Button
              onClick={handleConvert}
              disabled={!input}
              className="flex-1 bg-green-500 hover:bg-green-600 text-white border-4 border-black font-black uppercase py-6 text-lg disabled:opacity-50 disabled:cursor-not-allowed"
              style={{borderColor: '#000000'}}
            >
              <Table className="w-5 h-5 mr-2" />
              Convert
            </Button>
            <Button
              onClick={handleSwitch}
              disabled={!output}
              variant="outline"
              className="border-4 border-black font-black uppercase py-6 px-8 disabled:opacity-50 disabled:cursor-not-allowed"
              style={{borderColor: '#000000'}}
            >
              <ArrowRightLeft className="w-5 h-5" />
            </Button>
            <Button
              onClick={handleClear}
              variant="outline"
              className="border-4 border-black font-black uppercase py-6 px-8"
              style={{borderColor: '#000000'}}
            >
              Clear
            </Button>
          </div>
          
          {error && (
            <div className="mt-4 p-4 bg-red-50 border-2 border-red-500 text-red-700 font-medium">
              {error}
            </div>
          )}
        </div>

        {/* Info Section */}
        <div className="bg-gray-50 border-4 border-black p-8" style={{borderColor: '#000000', backgroundColor: '#f9fafb'}}>
          <h3 className="text-xl font-black uppercase mb-4">Format Requirements</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-black mb-2">CSV Format</h4>
              <ul className="space-y-2 text-gray-600 font-medium">
                <li>• First row must be headers</li>
                <li>• Comma-separated values</li>
                <li>• One record per line</li>
                <li>• Numbers are auto-detected</li>
              </ul>
            </div>
            <div>
              <h4 className="font-black mb-2">JSON Format</h4>
              <ul className="space-y-2 text-gray-600 font-medium">
                <li>• Must be an array of objects</li>
                <li>• Valid JSON syntax required</li>
                <li>• All objects should have same keys</li>
                <li>• Supports nested values</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Use Cases */}
        <div className="bg-white border-4 border-black p-8" style={{borderColor: '#000000', backgroundColor: '#ffffff'}}>
          <h3 className="text-xl font-black uppercase mb-4">Common Use Cases</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="border-2 border-black p-4" style={{borderColor: '#000000'}}>
              <h4 className="font-black mb-2">API Development</h4>
              <p className="text-gray-600 font-medium">Convert CSV data exports to JSON for API consumption.</p>
            </div>
            <div className="border-2 border-black p-4" style={{borderColor: '#000000'}}>
              <h4 className="font-black mb-2">Data Migration</h4>
              <p className="text-gray-600 font-medium">Transform data between database formats and spreadsheets.</p>
            </div>
            <div className="border-2 border-black p-4" style={{borderColor: '#000000'}}>
              <h4 className="font-black mb-2">Data Analysis</h4>
              <p className="text-gray-600 font-medium">Convert JSON responses to CSV for Excel analysis.</p>
            </div>
          </div>
        </div>
      </div>
    </ToolLayout>
  );
}
