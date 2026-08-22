import { Helmet } from "react-helmet-async";

export default function Seo({
  title,
  description,
  keywords,
  image,
  url,
  type = "website",
}) {
  const siteTitle = "Shine Tech Academy (STA)";
  const fullTitle = title ? `${title} | ${siteTitle}` : siteTitle;
  const defaultImage = "https://shinetechacademy.com/og-image.jpg";
  const defaultDescription =
    "Learn. Build. Earn. — Pakistan's most practical tech academy.";

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description || defaultDescription} />
      {keywords && <meta name="keywords" content={keywords} />}
      <link rel="canonical" href={url || "https://shinetechacademy.com"} />

      {/* Open Graph */}
      <meta property="og:title" content={fullTitle} />
      <meta
        property="og:description"
        content={description || defaultDescription}
      />
      <meta property="og:image" content={image || defaultImage} />
      <meta property="og:url" content={url || "https://shinetechacademy.com"} />
      <meta property="og:type" content={type} />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta
        name="twitter:description"
        content={description || defaultDescription}
      />
      <meta name="twitter:image" content={image || defaultImage} />

      {/* Additional */}
      <meta name="robots" content="index, follow" />
      <meta name="theme-color" content="#0956fc" />
    </Helmet>
  );
}
