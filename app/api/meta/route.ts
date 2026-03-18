import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  try {
    const accessToken = process.env.META_ACCESS_TOKEN;
    let adAccountId = process.env.META_AD_ACCOUNT_ID || '';

    if (!accessToken || !adAccountId) {
      return NextResponse.json(
        { error: 'Meta API credentials not configured' },
        { status: 401 }
      );
    }

    // Ensure account ID has 'act_' prefix
    if (!adAccountId.startsWith('act_')) {
      adAccountId = `act_${adAccountId}`;
    }

    // Fetch ads with video creatives and performance data
    const fields = 'id,name,creative{id,name,title,thumbnail_url,video_id,object_story_spec},insights.date_preset(last_30d){spend,impressions,clicks,ctr,actions,cost_per_action_type,video_thruplay_watched_actions,video_30_sec_watched_actions}';

    const adsUrl = `https://graph.facebook.com/v21.0/${adAccountId}/ads?access_token=${accessToken}&fields=${encodeURIComponent(fields)}&limit=100`;

    const response = await fetch(adsUrl);
    const data = await response.json();

    if (data.error) {
      console.error('Meta API Error:', data.error);
      return NextResponse.json(
        { error: data.error.message || 'Failed to fetch Meta data' },
        { status: 400 }
      );
    }

    // Transform API data to our format
    const videos = (data.data || [])
      .filter((ad: any) => ad.creative?.video_id)
      .map((ad: any, index: number) => {
        const insights = ad.insights?.data?.[0] || {};
        const spend = parseFloat(insights.spend || 0);
        const impressions = parseInt(insights.impressions || 0);
        const clicks = parseInt(insights.clicks || 0);
        const ctr = parseFloat(insights.ctr || 0);

        // Calculate conversions and CPA
        const conversions = insights.actions?.find((a: any) =>
          a.action_type === 'purchase' || a.action_type === 'lead'
        )?.value || 0;

        const costPerAction = insights.cost_per_action_type?.find((a: any) =>
          a.action_type === 'purchase' || a.action_type === 'lead'
        )?.value || 0;

        // Video engagement metrics
        const videoThruPlay = insights.video_thruplay_watched_actions?.[0]?.value || 0;
        const video30SecWatched = insights.video_30_sec_watched_actions?.[0]?.value || 0;

        // Calculate hook and hold rates (approximations)
        const hookRate = impressions > 0 ? ((video30SecWatched / impressions) * 100) : 0;
        const holdRate = video30SecWatched > 0 ? ((videoThruPlay / video30SecWatched) * 100) : 0;

        const videoId = ad.creative?.video_id;
        // Use original thumbnail URL without modification to preserve signature
        const thumbnailUrl = ad.creative?.thumbnail_url || 'https://via.placeholder.com/400x600/1877F2';

        return {
          id: ad.id,
          videoId: videoId,
          videoUrl: videoId ? `https://www.facebook.com/video.php?v=${videoId}` : null,
          thumbnailUrl: thumbnailUrl,
          title: ad.name || ad.creative?.title || `Ad ${index + 1}`,
          creator: 'Unknown',
          platform: 'meta',
          metrics: {
            spend: Math.round(spend),
            impressions,
            clicks,
            conversions: parseInt(conversions),
            cpa: parseFloat(costPerAction) || (conversions > 0 ? spend / conversions : 0),
            ctr: parseFloat(ctr.toFixed(2)),
            hookRate: parseFloat(hookRate.toFixed(2)),
            holdRate: parseFloat(holdRate.toFixed(2)),
          },
        };
      });

    return NextResponse.json({
      success: true,
      count: videos.length,
      videos
    });

  } catch (error) {
    console.error('Meta API Error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch Meta data', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
