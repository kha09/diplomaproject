import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  // Replace 'https://yourwebsite.com' with your actual domain
  const siteUrl = 'https://www.qeatourism.com/';

  return {
    rules: {
      userAgent: '*', // Applies to all crawlers
      allow: '/',     // Allow crawling of the entire site
      // disallow: '/private/', // Example: uncomment to disallow a specific path
    },
    sitemap: `${siteUrl}/sitemap.xml`, // Location of your sitemap
  }
}
