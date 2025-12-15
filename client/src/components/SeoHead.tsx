import { Helmet } from "react-helmet";

interface SeoHeadProps {
  title: string;
  description: string;
  keywords?: string;
  image?: string;
  url?: string;
}

export function SeoHead({ 
  title, 
  description, 
  keywords = "online tools, free utilities, image converter, pdf tools, qr code generator, json formatter",
  image = "/images/hero-swiss-tools.png",
  url = "https://toolbox.hub"
}: SeoHeadProps) {
  const fullTitle = `${title} | ToolBox Hub`;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={url} />
      <meta property="twitter:title" content={fullTitle} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={image} />
      
      {/* Canonical */}
      <link rel="canonical" href={url} />
    </Helmet>
  );
}
