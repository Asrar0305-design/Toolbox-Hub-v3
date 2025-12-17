import { Facebook, Twitter, Linkedin, Link2, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";
import { toast } from "sonner";

interface SocialShareProps {
  title?: string;
  description?: string;
  url?: string;
  className?: string;
}

export function SocialShare({ 
  title = "ToolBox Hub - Free Online Utilities", 
  description = "Check out this amazing collection of free online tools!",
  url,
  className = ""
}: SocialShareProps) {
  const [location] = useLocation();
  // Ensure we're running in browser environment
  const currentUrl = url || (typeof window !== 'undefined' ? window.location.href : '');
  const encodedUrl = encodeURIComponent(currentUrl);
  const encodedTitle = encodeURIComponent(title);
  const encodedDesc = encodeURIComponent(description);

  const shareLinks = [
    {
      name: "Facebook",
      icon: Facebook,
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      color: "hover:bg-[#1877F2] hover:text-white hover:border-[#1877F2]"
    },
    {
      name: "Twitter",
      icon: Twitter,
      url: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
      color: "hover:bg-[#1DA1F2] hover:text-white hover:border-[#1DA1F2]"
    },
    {
      name: "LinkedIn",
      icon: Linkedin,
      url: `https://www.linkedin.com/shareArticle?mini=true&url=${encodedUrl}&title=${encodedTitle}&summary=${encodedDesc}`,
      color: "hover:bg-[#0A66C2] hover:text-white hover:border-[#0A66C2]"
    },
    {
      name: "Email",
      icon: Mail,
      url: `mailto:?subject=${encodedTitle}&body=${encodedDesc}%0A%0A${encodedUrl}`,
      color: "hover:bg-gray-600 hover:text-white hover:border-gray-600"
    }
  ];

  const handleShare = (e: React.MouseEvent<HTMLAnchorElement>, url: string) => {
    e.preventDefault();
    if (url.startsWith('mailto:')) {
      window.location.href = url;
      return;
    }
    window.open(url, '_blank', 'width=600,height=400,noopener,noreferrer');
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(currentUrl);
      toast.success("Link copied to clipboard!");
    } catch (err) {
      toast.error("Failed to copy link");
    }
  };

  return (
    <div className={`flex flex-wrap gap-2 ${className}`}>
      {shareLinks.map((platform) => (
        <a
          key={platform.name}
          href={platform.url}
          onClick={(e) => handleShare(e, platform.url)}
          className="no-underline"
          aria-label={`Share on ${platform.name}`}
        >
          <Button
            variant="outline"
            size="icon"
            className={`w-10 h-10 rounded-md border border-input bg-background hover:bg-accent hover:text-accent-foreground transition-colors`}
          >
            <platform.icon className="w-4 h-4" />
          </Button>
        </a>
      ))}
      <Button
        variant="outline"
        size="icon"
        onClick={copyToClipboard}
        className="w-10 h-10 rounded-md border border-input bg-background hover:bg-accent hover:text-accent-foreground transition-colors"
        aria-label="Copy link"
      >
        <Link2 className="w-4 h-4" />
      </Button>
    </div>
  );
}
