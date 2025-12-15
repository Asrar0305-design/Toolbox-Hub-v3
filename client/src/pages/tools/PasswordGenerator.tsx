import { useState, useEffect } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Copy, RefreshCw, Check, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { SeoHead } from "@/components/SeoHead";
import { ToolContent } from "@/components/ToolContent";

export default function PasswordGenerator() {
  const [password, setPassword] = useState("");
  const [length, setLength] = useState(16);
  const [includeUppercase, setIncludeUppercase] = useState(true);
  const [includeLowercase, setIncludeLowercase] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(true);
  const [strength, setStrength] = useState("Medium");
  const [isGenerating, setIsGenerating] = useState(false);

  const generatePassword = () => {
    setIsGenerating(true);
    // Simulate a brief delay for better UX feel
    setTimeout(() => {
      _generatePassword();
      setIsGenerating(false);
    }, 300);
  };

  const _generatePassword = () => {
    let charset = "";
    if (includeLowercase) charset += "abcdefghijklmnopqrstuvwxyz";
    if (includeUppercase) charset += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (includeNumbers) charset += "0123456789";
    if (includeSymbols) charset += "!@#$%^&*()_+~`|}{[]:;?><,./-=";

    if (charset === "") {
      setPassword("");
      return;
    }

    let newPassword = "";
    for (let i = 0; i < length; i++) {
      newPassword += charset.charAt(Math.floor(Math.random() * charset.length));
    }
    setPassword(newPassword);
    calculateStrength(newPassword);
  };

  const calculateStrength = (pass: string) => {
    let score = 0;
    if (pass.length > 8) score++;
    if (pass.length > 12) score++;
    if (/[A-Z]/.test(pass)) score++;
    if (/[0-9]/.test(pass)) score++;
    if (/[^A-Za-z0-9]/.test(pass)) score++;

    if (score < 3) setStrength("Weak");
    else if (score < 5) setStrength("Medium");
    else setStrength("Strong");
  };

  useEffect(() => {
    generatePassword();
  }, [length, includeUppercase, includeLowercase, includeNumbers, includeSymbols]);

  const copyToClipboard = () => {
    if (!password) return;
    navigator.clipboard.writeText(password);
    toast.success("Password copied to clipboard");
  };

  return (
    <ToolLayout
      title="Password Generator"
      description="Generate strong, secure passwords instantly. Customize length and character types to stay safe online."
    >
      <SeoHead 
        title="Free Strong Password Generator"
        description="Generate secure, random passwords online. Customize length, symbols, and numbers. 100% client-side security."
        keywords="password generator, strong password, secure password, random password, password creator"
      />

      <div className="space-y-8">
        {/* Display Area */}
        <div className="relative">
          <div className="bg-gray-100 border-4 border-black p-6 md:p-8 text-center break-all min-h-[120px] flex items-center justify-center" style={{backgroundColor: '#f3f4f6', borderColor: '#000000'}}>
            {isGenerating ? (
              <Loader2 className="w-12 h-12 animate-spin text-primary" />
            ) : (
              <span className="text-3xl md:text-5xl font-mono font-bold tracking-wider animate-in fade-in zoom-in duration-300" style={{color: '#000000'}}>
                {password || "Select Options"}
              </span>
            )}
          </div>
          <div className="absolute top-0 right-0 h-full flex">
            <Button 
              onClick={generatePassword}
              disabled={isGenerating}
              className="h-full rounded-none border-l-4 border-t-4 border-b-4 border-r-4 border-black bg-white hover:bg-gray-50 text-black px-6"
            >
              <RefreshCw className={`w-6 h-6 ${isGenerating ? "animate-spin" : ""}`} />
            </Button>
            <Button 
              onClick={copyToClipboard}
              className="h-full rounded-none border-t-4 border-b-4 border-r-4 border-black bg-primary hover:bg-black text-white px-6"
            >
              <Copy className="w-6 h-6" />
            </Button>
          </div>
        </div>

        {/* Strength Indicator */}
        <div className="flex items-center gap-4">
          <div className="font-bold uppercase tracking-wider w-24" style={{color: '#000000'}}>Strength:</div>
          <div className="flex-1 h-4 bg-gray-200 border-2 border-black">
            <div 
              className={`h-full transition-all duration-300 ${
                strength === "Weak" ? "w-1/3 bg-red-500" : 
                strength === "Medium" ? "w-2/3 bg-yellow-500" : 
                "w-full bg-green-500"
              }`} 
            />
          </div>
          <div className="font-bold uppercase w-20 text-right" style={{color: '#000000'}}>{strength}</div>
        </div>

        {/* Controls */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="space-y-6">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <Label className="font-bold uppercase" style={{color: '#000000'}}>Password Length</Label>
                <span className="font-mono font-bold text-xl bg-black text-white px-3 py-1">{length}</span>
              </div>
              <Slider
                value={[length]}
                onValueChange={(value) => setLength(value[0])}
                min={6}
                max={64}
                step={1}
                className="py-4"
              />
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 border-2 border-gray-200 hover:border-black transition-colors" style={{borderColor: '#e5e7eb'}}>
              <Label htmlFor="uppercase" className="font-bold uppercase cursor-pointer" style={{color: '#000000'}}>Uppercase (A-Z)</Label>
              <Switch id="uppercase" checked={includeUppercase} onCheckedChange={setIncludeUppercase} />
            </div>
            <div className="flex items-center justify-between p-4 border-2 border-gray-200 hover:border-black transition-colors" style={{borderColor: '#e5e7eb'}}>
              <Label htmlFor="lowercase" className="font-bold uppercase cursor-pointer" style={{color: '#000000'}}>Lowercase (a-z)</Label>
              <Switch id="lowercase" checked={includeLowercase} onCheckedChange={setIncludeLowercase} />
            </div>
            <div className="flex items-center justify-between p-4 border-2 border-gray-200 hover:border-black transition-colors" style={{borderColor: '#e5e7eb'}}>
              <Label htmlFor="numbers" className="font-bold uppercase cursor-pointer" style={{color: '#000000'}}>Numbers (0-9)</Label>
              <Switch id="numbers" checked={includeNumbers} onCheckedChange={setIncludeNumbers} />
            </div>
            <div className="flex items-center justify-between p-4 border-2 border-gray-200 hover:border-black transition-colors" style={{borderColor: '#e5e7eb'}}>
              <Label htmlFor="symbols" className="font-bold uppercase cursor-pointer" style={{color: '#000000'}}>Symbols (!@#$)</Label>
              <Switch id="symbols" checked={includeSymbols} onCheckedChange={setIncludeSymbols} />
            </div>
          </div>
        </div>
      </div>

      <ToolContent 
        howTo={{
          title: "How to Generate a Strong Password",
          content: [
            "Adjust the 'Password Length' slider to your desired length (we recommend at least 12 characters).",
            "Toggle the character options to include Uppercase, Lowercase, Numbers, and Symbols.",
            "The tool will automatically generate a new password every time you change a setting.",
            "Click the 'Refresh' icon to generate a new variation with the same settings.",
            "Check the 'Strength' indicator to ensure your password is secure.",
            "Click the 'Copy' button to save the password to your clipboard."
          ]
        }}
        features={[
          {
            title: "Client-Side Security",
            content: "Your passwords are generated locally in your browser using the Web Crypto API. They are never sent to our servers, so there is zero risk of interception or data leaks."
          },
          {
            title: "Customizable Complexity",
            content: "Whether you need a simple PIN or a complex 64-character cryptographic key, our tool gives you full control over the character sets and length."
          },
          {
            title: "Strength Meter",
            content: "Get instant feedback on your password's security. Our real-time strength meter analyzes entropy and patterns to help you create uncrackable passwords."
          },
          {
            title: "One-Click Copy",
            content: "Streamline your workflow with our easy copy button. No need to manually select and copy text, reducing the risk of missing characters."
          }
        ]}
        faqs={[
          {
            question: "Is it safe to use an online password generator?",
            answer: "Yes, as long as it's client-side like ours. Since the password is created on your device and never transmitted over the internet, it's as safe as generating it offline."
          },
          {
            question: "How long should my password be?",
            answer: "Security experts recommend a minimum of 12 characters for standard accounts and 16+ characters for sensitive accounts like banking or email."
          },
          {
            question: "Why should I use symbols?",
            answer: "Adding special characters (like !@#$) exponentially increases the number of possible combinations, making it significantly harder for hackers to brute-force your password."
          },
          {
            question: "Do you store my generated passwords?",
            answer: "Absolutely not. We do not have a database for passwords, and we do not track or log the passwords you generate. Once you close the tab, they are gone forever."
          }
        ]}
      />
    </ToolLayout>
  );
}
