import { MetadataRoute } from 'next';
import { EventModel } from '@/lib/models/Event';
import connectToDatabase from '@/lib/db';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  await connectToDatabase();
  const events = await EventModel.find({}).lean();
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://beyondwork.site';
  
  const eventUrls = events.map((e: any) => ({
    url: `${siteUrl}/events/${e.slug}`,
    lastModified: e.updatedAt || new Date(),
    changeFrequency: 'daily' as const,
    priority: 0.8,
  }));

  return [
    {
      url: siteUrl,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 1,
    },
    ...eventUrls
  ];
}
