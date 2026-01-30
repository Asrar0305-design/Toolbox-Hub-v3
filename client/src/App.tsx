import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import ImageConverter from "./pages/tools/ImageConverter";
import QRCodeGenerator from "./pages/tools/QRCodeGenerator";
import JsonFormatter from "./pages/tools/JsonFormatter";
import PdfTools from "./pages/tools/PdfTools";
import PasswordGenerator from "./pages/tools/PasswordGenerator";
import WordCounter from "./pages/tools/WordCounter";
import UnitConverter from "./pages/tools/UnitConverter";
import YoutubeThumbnail from "./pages/tools/YoutubeThumbnail";
import BackgroundRemover from "./pages/tools/BackgroundRemover";
import Base64Encoder from "./pages/tools/Base64Encoder";
import ColorPicker from "./pages/tools/ColorPicker";
import HashGenerator from "./pages/tools/HashGenerator";
import MarkdownEditor from "./pages/tools/MarkdownEditor";
import CsvJsonConverter from "./pages/tools/CsvJsonConverter";
import LoremIpsum from "./pages/tools/LoremIpsum";
import ImageResizer from "./pages/tools/ImageResizer";
import PrivacyPolicy from "./pages/legal/PrivacyPolicy";
import TermsOfUse from "./pages/legal/TermsOfUse";
import Contact from "./pages/legal/Contact";
import About from "./pages/About";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import FAQ from "./pages/FAQ";
import HelpCenter from "./pages/HelpCenter";
import { CookieConsent } from "./components/CookieConsent";
import { Analytics } from "@vercel/analytics/react";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/tools/image-converter" component={ImageConverter} />
      <Route path="/tools/qr-generator" component={QRCodeGenerator} />
      <Route path="/tools/json-formatter" component={JsonFormatter} />
      <Route path="/tools/pdf-tools" component={PdfTools} />
      <Route path="/tools/password-generator" component={PasswordGenerator} />
      <Route path="/tools/word-counter" component={WordCounter} />
      <Route path="/tools/unit-converter" component={UnitConverter} />
      <Route path="/tools/youtube-thumbnail" component={YoutubeThumbnail} />
      <Route path="/tools/background-remover" component={BackgroundRemover} />
      <Route path="/tools/base64-encoder" component={Base64Encoder} />
      <Route path="/tools/color-picker" component={ColorPicker} />
      <Route path="/tools/hash-generator" component={HashGenerator} />
      <Route path="/tools/markdown-editor" component={MarkdownEditor} />
      <Route path="/tools/csv-json-converter" component={CsvJsonConverter} />
      <Route path="/tools/lorem-ipsum" component={LoremIpsum} />
      <Route path="/tools/image-resizer" component={ImageResizer} />
      <Route path="/privacy" component={PrivacyPolicy} />
      <Route path="/terms" component={TermsOfUse} />
      <Route path="/contact" component={Contact} />
      <Route path="/about" component={About} />
      <Route path="/blog" component={Blog} />
      <Route path="/blog/:slug" component={BlogPost} />
      <Route path="/faq" component={FAQ} />
      <Route path="/help" component={HelpCenter} />
      <Route path="/404" component={NotFound} />
      {/* Final fallback route */}
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light" switchable>
        <TooltipProvider>
          <Analytics />
          <Toaster />
          <Router />
          <CookieConsent />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
