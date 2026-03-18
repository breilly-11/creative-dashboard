'use client';

import { useState } from 'react';

interface Video {
  id: string;
  rank: number;
  channel: string;
  videoUrl: string | null;
  thumbnailUrl: string;
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

interface VideoCardProps {
  video: Video;
}

export default function VideoCard({ video }: VideoCardProps) {
  const [imageError, setImageError] = useState(false);

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

  const formatChange = (value?: number) => {
    if (value === undefined) return null;
    const isPositive = value > 0;
    return (
      <span className={isPositive ? 'text-green-600' : 'text-red-600'}>
        {isPositive ? '↗' : '↘'} {Math.abs(value)}%
      </span>
    );
  };

  const handlePlayClick = () => {
    if (video.videoUrl) {
      window.open(video.videoUrl, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-shadow">
      {/* Video Preview - Smaller aspect ratio container */}
      <div className="relative aspect-[9/16] bg-gradient-to-br from-gray-100 to-gray-200">
        {/* Thumbnail Image */}
        {video.thumbnailUrl && !imageError ? (
          <div className="absolute inset-0">
            <img
              src={video.thumbnailUrl}
              alt={video.campaign}
              className="w-full h-full object-cover"
              onError={() => setImageError(true)}
              crossOrigin="anonymous"
              referrerPolicy="no-referrer"
            />
            {/* Overlay gradient for better text visibility */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/30"></div>
          </div>
        ) : (
          <div className={`absolute inset-0 bg-gradient-to-br ${getChannelColor(video.channel)} opacity-90`}></div>
        )}

        {/* Play Button Overlay - Smaller */}
        <div className="absolute inset-0 flex items-center justify-center bg-black/10 hover:bg-black/20 transition-colors cursor-pointer group" onClick={handlePlayClick}>
          <div className="w-12 h-12 bg-white/95 rounded-full flex items-center justify-center group-hover:bg-white group-hover:scale-110 transition-all shadow-lg">
            <svg className="w-6 h-6 text-gray-900 ml-0.5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
        </div>

        {/* Rank Badge - Smaller */}
        <div className="absolute top-2 left-2 w-8 h-8 bg-white rounded-full flex items-center justify-center font-bold text-gray-900 shadow-md z-10 text-xs">
          #{video.rank}
        </div>

        {/* Channel Badge - Smaller */}
        <div className="absolute top-2 right-2 px-2 py-0.5 bg-blue-600 text-white rounded text-xs font-semibold shadow-md z-10 capitalize">
          {video.channel}
        </div>
      </div>

      {/* Campaign & Metrics - More compact */}
      <div className="p-2">
        <h3 className="font-semibold text-gray-900 mb-2 line-clamp-1 text-xs" title={video.campaign}>
          {video.campaign}
        </h3>

        {/* Spend & CPA */}
        <div className="grid grid-cols-2 gap-2 mb-2">
          <div>
            <div className="text-[10px] text-gray-500 mb-0.5 font-medium">Spend</div>
            <div className="text-sm font-bold text-gray-900">
              {formatCurrency(video.metrics.spend)}
            </div>
          </div>
          <div>
            <div className="text-[10px] text-gray-500 mb-0.5 font-medium">CPA</div>
            <div className="text-sm font-bold text-gray-900">
              {formatCurrency(video.metrics.cpa)}
            </div>
          </div>
        </div>

        {/* CTR, Hook, Hold */}
        <div className="grid grid-cols-3 gap-1 mb-2">
          <div className="bg-gray-50 rounded p-1 text-center">
            <div className="text-[9px] text-gray-500 mb-0.5 font-medium">CTR</div>
            <div className="text-xs font-bold text-gray-900">
              {video.metrics.ctr.toFixed(1)}%
            </div>
          </div>
          <div className="bg-gray-50 rounded p-1 text-center">
            <div className="text-[9px] text-gray-500 mb-0.5 font-medium">HOOK</div>
            <div className="text-xs font-bold text-gray-900">
              {video.metrics.hookRate.toFixed(1)}%
            </div>
          </div>
          <div className="bg-gray-50 rounded p-1 text-center">
            <div className="text-[9px] text-gray-500 mb-0.5 font-medium">HOLD</div>
            <div className="text-xs font-bold text-gray-900">
              {video.metrics.holdRate.toFixed(1)}%
            </div>
          </div>
        </div>

        {/* Video Link Button */}
        {video.videoUrl && (
          <button
            onClick={handlePlayClick}
            className="w-full text-center text-[10px] text-blue-600 hover:text-blue-700 font-medium hover:underline"
          >
            Watch →
          </button>
        )}
      </div>
    </div>
  );
}
