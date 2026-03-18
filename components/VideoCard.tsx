'use client';

import { useState } from 'react';

interface Video {
  id: string;
  rank: number;
  channel: string;
  videoUrl: string;
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
    change: number;
  };
}

interface VideoCardProps {
  video: Video;
}

export default function VideoCard({ video }: VideoCardProps) {
  const [isPlaying, setIsPlaying] = useState(false);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const getChannelColor = (channel: string) => {
    switch (channel) {
      case 'tiktok':
        return 'from-purple-500 to-purple-600';
      case 'meta':
        return 'from-blue-500 to-blue-600';
      case 'snapchat':
        return 'from-yellow-400 to-yellow-500';
      default:
        return 'from-gray-500 to-gray-600';
    }
  };

  const formatChange = (value: number) => {
    const isPositive = value > 0;
    return (
      <span className={isPositive ? 'text-green-600' : 'text-red-600'}>
        {isPositive ? '↗' : '↘'} {Math.abs(value)}% vs previous period
      </span>
    );
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-shadow">
      {/* Video Preview */}
      <div className="relative aspect-[9/16] bg-gradient-to-br from-gray-100 to-gray-200">
        <div className={`absolute inset-0 bg-gradient-to-br ${getChannelColor(video.channel)} opacity-90`}>
          <div className="absolute inset-0 flex items-center justify-center">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center hover:bg-white transition-all hover:scale-110"
            >
              <svg className="w-8 h-8 text-gray-900 ml-1" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
            </button>
          </div>

          {/* Rank Badge */}
          <div className="absolute top-4 left-4 w-10 h-10 bg-white rounded-full flex items-center justify-center font-bold text-gray-900">
            #{video.rank}
          </div>

          {/* Format Badge */}
          <div className="absolute top-4 right-4 px-3 py-1 bg-white/90 rounded-full text-xs font-medium text-gray-900">
            {video.format}
          </div>

          {/* Creator */}
          <div className="absolute bottom-4 left-4 right-4 text-center">
            <div className="text-white font-semibold text-lg">{video.creator}</div>
          </div>
        </div>
      </div>

      {/* Campaign & Metrics */}
      <div className="p-4">
        <h3 className="font-semibold text-gray-900 mb-3">{video.campaign}</h3>

        {/* Spend & CPA */}
        <div className="grid grid-cols-2 gap-4 mb-3">
          <div>
            <div className="text-xs text-gray-500 mb-1">Spend</div>
            <div className="text-lg font-bold text-gray-900">
              {formatCurrency(video.metrics.spend)}
            </div>
          </div>
          <div>
            <div className="text-xs text-gray-500 mb-1">CPA</div>
            <div className="text-lg font-bold text-gray-900">
              {formatCurrency(video.metrics.cpa)}
            </div>
          </div>
        </div>

        {/* CTR, Hook, Hold */}
        <div className="grid grid-cols-3 gap-2 mb-3">
          <div className="bg-gray-50 rounded-lg p-2 text-center">
            <div className="text-xs text-gray-500 mb-1">CTR</div>
            <div className="text-sm font-semibold text-gray-900">
              {video.metrics.ctr}%
            </div>
          </div>
          <div className="bg-gray-50 rounded-lg p-2 text-center">
            <div className="text-xs text-gray-500 mb-1">HOOK</div>
            <div className="text-sm font-semibold text-gray-900">
              {video.metrics.hookRate}%
            </div>
          </div>
          <div className="bg-gray-50 rounded-lg p-2 text-center">
            <div className="text-xs text-gray-500 mb-1">HOLD</div>
            <div className="text-sm font-semibold text-gray-900">
              {video.metrics.holdRate}%
            </div>
          </div>
        </div>

        {/* Change */}
        <div className="text-xs">
          {formatChange(video.metrics.change)}
        </div>
      </div>
    </div>
  );
}
