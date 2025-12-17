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
import PrivacyPolicy from "./pages/legal/PrivacyPolicy";
import TermsOfUse from "./pages/legal/TermsOfUse";
import Contact from "./pages/legal/Contact";
import About from "./pages/About";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import { CookieConsent } from "./components/CookieConsent";

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
      <Route path="/privacy" component={PrivacyPolicy} />
      <Route path="/terms" component={TermsOfUse} />
      <Route path="/contact" component={Contact} />
      <Route path="/about" component={About} />
      <Route path="/blog" component={Blog} />
      <Route path="/blog/:slug" component={BlogPost} />
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
          <Toaster />
          <Router />
          <CookieConsent />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
