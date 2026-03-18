'use client';

import { useState, useEffect } from 'react';
import MetricsOverview from '@/components/MetricsOverview';
import ChannelFilter from '@/components/ChannelFilter';
import VideoCard from '@/components/VideoCard';

interface Video {
  id: string;
  rank: number;
  channel: string;
  videoUrl: string | null;
  thumbnail: string;
  format: string;
  creator: string;
  campaign: string;
  metrics: {
    spend: number;
    cpa: number;
    ctr: number;
    hookRate: number;
    holdRate: number;
    change?: number;
  };
}

export default function Dashboard() {
  const [selectedChannel, setSelectedChannel] = useState<'all' | 'tiktok' | 'meta' | 'snapchat'>('all');
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const responses = await Promise.all([
          fetch('/api/meta').then(r => r.json()),
          // fetch('/api/tiktok').then(r => r.json()),
          // fetch('/api/snapchat').then(r => r.json()),
        ]);

        const allVideos: Video[] = [];

        // Process Meta data
        if (responses[0].videos) {
          const metaVideos = responses[0].videos.map((video: any, index: number) => ({
            id: video.id,
            rank: index + 1,
            channel: 'meta',
            videoUrl: video.videoUrl,
            thumbnail: video.thumbnailUrl,
            format: '9x16 Video',
            creator: video.creator,
            campaign: video.title,
            metrics: {
              spend: video.metrics.spend,
              cpa: video.metrics.cpa,
              ctr: video.metrics.ctr,
              hookRate: video.metrics.hookRate,
              holdRate: video.metrics.holdRate,
            }
          }));
          allVideos.push(...metaVideos);
        }

        // Sort by spend
        allVideos.sort((a, b) => b.metrics.spend - a.metrics.spend);

        // Update ranks after sorting
        allVideos.forEach((video, index) => {
          video.rank = index + 1;
        });

        setVideos(allVideos);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  // Calculate overall metrics
  const overallMetrics = videos.reduce(
    (acc, video) => ({
      totalSpend: acc.totalSpend + video.metrics.spend,
      avgCPA: acc.avgCPA + video.metrics.cpa,
      avgCTR: acc.avgCTR + video.metrics.ctr,
      avgHookRate: acc.avgHookRate + video.metrics.hookRate,
      count: acc.count + 1,
    }),
    { totalSpend: 0, avgCPA: 0, avgCTR: 0, avgHookRate: 0, count: 0 }
  );

  const metrics = {
    totalSpend: Math.round(overallMetrics.totalSpend),
    spendChange: 0, // TODO: Calculate from previous period
    avgCPA: overallMetrics.count > 0 ? overallMetrics.avgCPA / overallMetrics.count : 0,
    cpaChange: 0,
    avgCTR: overallMetrics.count > 0 ? overallMetrics.avgCTR / overallMetrics.count : 0,
    ctrChange: 0,
    avgHookRate: overallMetrics.count > 0 ? overallMetrics.avgHookRate / overallMetrics.count : 0,
    hookChange: 0,
  };

  const filteredVideos = selectedChannel === 'all'
    ? videos
    : videos.filter(v => v.channel === selectedChannel);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-8 py-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Creative Performance</h1>
            <p className="text-gray-500 mt-1">Executive overview · Last 30 days</p>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 bg-purple-50 text-purple-600 rounded-lg font-medium">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            Live Data
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="px-8 py-8">
        {/* Metrics Overview */}
        <MetricsOverview metrics={metrics} />

        {/* Channel Filter & Sort */}
        <div className="flex items-center justify-between mt-8 mb-6">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-purple-600 font-medium">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
              Creatives
            </div>
            <span className="text-gray-400">Ranked by spend</span>
          </div>

          <ChannelFilter selected={selectedChannel} onChange={setSelectedChannel} />
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex items-center justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
          </div>
        )}

        {/* Video Grid */}
        {!loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredVideos.length > 0 ? (
              filteredVideos.map((video) => (
                <VideoCard key={video.id} video={video} />
              ))
            ) : (
              <div className="col-span-4 text-center py-20">
                <p className="text-gray-500">No videos found for this channel.</p>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
