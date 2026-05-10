import { MetadataRoute } from 'next';

import { physicalDevelopments } from '@Constants/constants';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://mlnbk.com';

  const projectUrls: MetadataRoute.Sitemap = physicalDevelopments.map((p) => ({
    url: `${baseUrl}/developments/${p.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    ...projectUrls,
  ];
}
