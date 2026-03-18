import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  try {
    // TODO: Implement TikTok Marketing API integration
    // const accessToken = process.env.TIKTOK_ACCESS_TOKEN;
    // const advertiserId = process.env.TIKTOK_ADVERTISER_ID;

    // For now, return mock data
    const mockData = {
      videos: [
        {
          id: 'tiktok_1',
          videoId: '7123456789',
          videoUrl: 'https://example.com/tiktok1.mp4',
          thumbnailUrl: 'https://via.placeholder.com/400x600/8B5CF6',
          title: 'SYP 5vs100',
          creator: 'Zak',
          metrics: {
            spend: 14243,
            impressions: 125000,
            clicks: 387,
            conversions: 143,
            cpa: 99.60,
            ctr: 0.31,
            hookRate: 14,
            holdRate: 22,
          },
        },
      ],
    };

    return NextResponse.json(mockData);
  } catch (error) {
    console.error('TikTok API Error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch TikTok data' },
      { status: 500 }
    );
  }
}
