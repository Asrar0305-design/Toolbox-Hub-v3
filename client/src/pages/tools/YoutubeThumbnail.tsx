import { useState } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2, Download, Youtube, Search } from "lucide-react";
import { toast } from "sonner";
import { SeoHead } from "@/components/SeoHead";
import { ToolContent } from "@/components/ToolContent";
import { saveAs } from "file-saver";

interface Thumbnail {
  quality: string;
  url: string;
  resolution: string;
}

export default function YoutubeThumbnail() {
  const [url, setUrl] = useState("");
  const [thumbnails, setThumbnails] = useState<Thumbnail[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const extractVideoId = (url: string) => {
    const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[7].length === 11) ? match[7] : false;
  };

  const getThumbnails = () => {
    if (!url) {
      toast.error("Please enter a YouTube URL");
      return;
    }

    setIsLoading(true);
    const videoId = extractVideoId(url);

    if (!videoId) {
      toast.error("Invalid YouTube URL");
      setIsLoading(false);
      return;
    }

    // Simulate loading for better UX
    setTimeout(() => {
      const newThumbnails = [
        {
          quality: "Max Resolution",
          url: `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`,
          resolution: "1280x720"
        },
        {
          quality: "High Quality",
          url: `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`,
          resolution: "480x360"
        },
        {
          quality: "Medium Quality",
          url: `https://img.youtube.com/vi/${videoId}/mqdefault.jpg`,
          resolution: "320x180"
        },
        {
          quality: "Standard Quality",
          url: `https://img.youtube.com/vi/${videoId}/sddefault.jpg`,
          resolution: "640x480"
        }
      ];
      setThumbnails(newThumbnails);
      setIsLoading(false);
      toast.success("Thumbnails extracted successfully!");
    }, 500);
  };

  const downloadThumbnail = (url: string, quality: string) => {
    saveAs(url, `youtube-thumbnail-${quality.toLowerCase().replace(" ", "-")}.jpg`);
  };

  return (
    <ToolLayout
      title="YouTube Thumbnail Grabber"
      description="Download high-quality thumbnails from any YouTube video instantly. Supports HD, SD, and Max Resolution."
    >
      <SeoHead 
        title="Free YouTube Thumbnail Downloader - HD & 4K"
        description="Download YouTube thumbnails in high quality (HD, 4K). Free online tool to extract thumbnails from any YouTube video URL."
        keywords="youtube thumbnail downloader, save youtube thumbnail, get youtube thumbnail, youtube cover image, free thumbnail grabber"
      />

      <div className="space-y-8">
        {/* Input Area */}
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Youtube className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input 
              placeholder="Paste YouTube URL here (e.g., https://www.youtube.com/watch?v=...)" 
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="pl-12 h-14 text-lg border-2 border-black rounded-none focus-visible:ring-0 focus-visible:ring-offset-0"
              style={{borderColor: '#000000', color: '#000000'}}
            />
          </div>
          <Button 
            onClick={getThumbnails}
            disabled={isLoading}
            className="h-14 px-8 bg-primary hover:bg-primary/90 text-white font-bold uppercase tracking-wider rounded-none border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-y-1 active:shadow-none transition-all"
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Fetching...
              </>
            ) : (
              <>
                <Search className="mr-2 h-5 w-5" />
                Get Thumbnails
              </>
            )}
          </Button>
        </div>

        {/* Results Grid */}
        {thumbnails.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {thumbnails.map((thumb, index) => (
              <div key={index} className="border-2 border-black bg-white p-4 space-y-4 group hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-all" style={{borderColor: '#000000', backgroundColor: '#ffffff'}}>
                <div className="relative aspect-video bg-gray-100 overflow-hidden border border-gray-200">
                  <img 
                    src={thumb.url} 
                    alt={`${thumb.quality} thumbnail`}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = "https://via.placeholder.com/640x480?text=Not+Available";
                    }}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-bold uppercase" style={{color: '#000000'}}>{thumb.quality}</h3>
                    <p className="text-sm text-muted-foreground" style={{color: '#6b7280'}}>{thumb.resolution}</p>
                  </div>
                  <Button 
                    onClick={() => downloadThumbnail(thumb.url, thumb.quality)}
                    className="rounded-none bg-black hover:bg-gray-800 text-white"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Download
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <ToolContent 
        howTo={{
          title: "How to Download YouTube Thumbnails",
          content: [
            "Go to YouTube and find the video whose thumbnail you want to download.",
            "Copy the video URL from your browser's address bar (e.g., https://www.youtube.com/watch?v=...).",
            "Paste the URL into the input box above.",
            "Click the 'Get Thumbnails' button.",
            "Choose your desired quality (Max Resolution, High, Medium, or Standard) from the results.",
            "Click the 'Download' button to save the image to your device."
          ]
        }}
        features={[
          {
            title: "4K & HD Support",
            content: "Get the highest possible resolution available. If the video was uploaded with a 4K thumbnail, you can download it in full 1280x720 (MaxRes) quality."
          },
          {
            title: "Multiple Formats",
            content: "We automatically extract all available versions of the thumbnail, from small previews (320x180) to full-size cover images, giving you options for every use case."
          },
          {
            title: "No Watermarks",
            content: "The thumbnails you download are the exact original files hosted by YouTube. We do not add any watermarks, logos, or overlays."
          },
          {
            title: "Instant Extraction",
            content: "Our tool works directly with the YouTube API structure to fetch image URLs instantly. No video conversion or long waiting times required."
          }
        ]}
        faqs={[
          {
            question: "Is it legal to download thumbnails?",
            answer: "Generally, yes, for personal use or fair use (like commentary, criticism, or news reporting). However, you should respect the copyright of the original content creator."
          },
          {
            question: "Why is the Max Resolution thumbnail missing?",
            answer: "Not all videos have a high-resolution thumbnail. If the creator uploaded a low-quality image or the video is very old, the 'Max Resolution' option might show a placeholder or be unavailable."
          },
          {
            question: "Can I download thumbnails from private videos?",
            answer: "No. Our tool can only access public videos. Private or unlisted videos may not work if their metadata is restricted."
          },
          {
            question: "Do I need to sign in?",
            answer: "No account is required. You can use this tool anonymously and for free as many times as you like."
          }
        ]}
      />
    </ToolLayout>
  );
}
