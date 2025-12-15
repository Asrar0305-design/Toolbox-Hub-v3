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
  const currentUrl = url || window.location.origin + location;
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
          target="_blank"
          rel="noopener noreferrer"
          className="no-underline"
          aria-label={`Share on ${platform.name}`}
        >
          <Button
            variant="outline"
            size="icon"
            className={`w-10 h-10 rounded-none border-2 border-white bg-transparent text-white hover:bg-white hover:text-black transition-all duration-200`}
          >
            <platform.icon className="w-4 h-4" />
          </Button>
        </a>
      ))}
      <Button
        variant="outline"
        size="icon"
        onClick={copyToClipboard}
        className="w-10 h-10 rounded-none border-2 border-white bg-transparent text-white hover:bg-white hover:text-black transition-all duration-200"
        aria-label="Copy link"
      >
        <Link2 className="w-4 h-4" />
      </Button>
    </div>
  );
}
