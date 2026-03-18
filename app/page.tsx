'use client';

import { useState } from 'react';
import MetricsOverview from '@/components/MetricsOverview';
import ChannelFilter from '@/components/ChannelFilter';
import VideoCard from '@/components/VideoCard';

export default function Dashboard() {
  const [selectedChannel, setSelectedChannel] = useState<'all' | 'tiktok' | 'meta' | 'snapchat'>('all');
  const [sortBy, setSortBy] = useState<'spend' | 'engagement'>('spend');

  // Mock data - will be replaced with real API data
  const mockVideos = [
    {
      id: '1',
      rank: 1,
      channel: 'tiktok',
      videoUrl: 'https://example.com/video1.mp4',
      thumbnail: 'https://via.placeholder.com/400x600/8B5CF6/FFFFFF?text=Video+1',
      format: '9x16 Video',
      creator: 'Zak',
      campaign: 'SYP 5vs100',
      metrics: {
        spend: 14243,
        cpa: 99.60,
        ctr: 0.31,
        hookRate: 14,
        holdRate: 22,
        change: -13.2
      }
    },
    {
      id: '2',
      rank: 2,
      channel: 'tiktok',
      videoUrl: 'https://example.com/video2.mp4',
      thumbnail: 'https://via.placeholder.com/400x600/14B8A6/FFFFFF?text=Video+2',
      format: '9x16 Video',
      creator: 'Zak',
      campaign: 'SYP MoneyHack',
      metrics: {
        spend: 14178,
        cpa: 117.17,
        ctr: 0.22,
        hookRate: 18.62,
        holdRate: 38.67,
        change: -16.5
      }
    },
    {
      id: '3',
      rank: 3,
      channel: 'meta',
      videoUrl: 'https://example.com/video3.mp4',
      thumbnail: 'https://via.placeholder.com/400x600/F59E0B/FFFFFF?text=Video+3',
      format: '9x16 Video',
      creator: 'Zoe',
      campaign: 'SYP DoubleSalary',
      metrics: {
        spend: 12012,
        cpa: 100.94,
        ctr: 0.28,
        hookRate: 23.08,
        holdRate: 6.87,
        change: -7.8
      }
    },
    {
      id: '4',
      rank: 4,
      channel: 'snapchat',
      videoUrl: 'https://example.com/video4.mp4',
      thumbnail: 'https://via.placeholder.com/400x600/EF4444/FFFFFF?text=Video+4',
      format: '9x16 Video',
      creator: 'Henry',
      campaign: 'SYP FinanceBro',
      metrics: {
        spend: 7282,
        cpa: 99.75,
        ctr: 0.55,
        hookRate: 12.57,
        holdRate: 20.46,
        change: 3.8
      }
    },
  ];

  const overallMetrics = {
    totalSpend: 63578,
    spendChange: -4.2,
    avgCPA: 138.63,
    cpaChange: 2.1,
    avgCTR: 0.46,
    ctrChange: -1.8,
    avgHookRate: 18.4,
    hookChange: 5.3
  };

  const filteredVideos = selectedChannel === 'all'
    ? mockVideos
    : mockVideos.filter(v => v.channel === selectedChannel);

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
        <MetricsOverview metrics={overallMetrics} />

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

        {/* Video Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredVideos.map((video) => (
            <VideoCard key={video.id} video={video} />
          ))}
        </div>
      </main>
    </div>
  );
}
