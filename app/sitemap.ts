import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  // Replace 'https://yourwebsite.com' with your actual domain
  const siteUrl = 'https://www.qeatourism.com/';

  // Add more URLs here, fetching dynamic routes if necessary
  const staticRoutes = [
    {
      url: siteUrl,
      lastModified: new Date(),
      changeFrequency: 'yearly' as 'yearly', // Correct type assertion
      priority: 1, // Priority 0.0 to 1.0
    },
    // Add other static pages like /about, /contact etc.
    // {
    //   url: `${siteUrl}/about`,
    //   lastModified: new Date(),
    //   changeFrequency: 'monthly',
    //   priority: 0.8,
    // },
  ];

  // Example: Fetch dynamic routes (e.g., blog posts)
  // const dynamicRoutes = await fetchDynamicRoutes(); // Implement this function

  return [
    ...staticRoutes,
    // ...dynamicRoutes,
  ]
}
