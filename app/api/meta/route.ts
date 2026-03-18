import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  try {
    // TODO: Implement Meta Graph API integration
    // const accessToken = process.env.META_ACCESS_TOKEN;
    // const adAccountId = process.env.META_AD_ACCOUNT_ID;

    // For now, return mock data
    const mockData = {
      videos: [
        {
          id: 'meta_1',
          videoId: 'fb_123456',
          videoUrl: 'https://example.com/meta1.mp4',
          thumbnailUrl: 'https://via.placeholder.com/400x600/F59E0B',
          title: 'SYP DoubleSalary',
          creator: 'Zoe',
          platform: 'instagram',
          metrics: {
            spend: 12012,
            impressions: 98000,
            clicks: 274,
            conversions: 119,
            cpa: 100.94,
            ctr: 0.28,
            hookRate: 23.08,
            holdRate: 6.87,
          },
        },
      ],
    };

    return NextResponse.json(mockData);
  } catch (error) {
    console.error('Meta API Error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch Meta data' },
      { status: 500 }
    );
  }
}
