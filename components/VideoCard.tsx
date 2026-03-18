'use client';

import { useState } from 'react';

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
        {isPositive ? '↗' : '↘'} {Math.abs(value)}% vs previous period
      </span>
    );
  };

  const handlePlayClick = () => {
    if (video.videoUrl) {
      window.open(video.videoUrl, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-shadow">
      {/* Video Preview */}
      <div className="relative aspect-[9/16] bg-gradient-to-br from-gray-100 to-gray-200">
        {/* Thumbnail Image */}
        {video.thumbnail && !imageError ? (
          <div className="absolute inset-0">
            <img
              src={video.thumbnail}
              alt={video.campaign}
              className="w-full h-full object-cover"
              onError={() => setImageError(true)}
            />
            {/* Overlay gradient for better text visibility */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/30"></div>
          </div>
        ) : (
          <div className={`absolute inset-0 bg-gradient-to-br ${getChannelColor(video.channel)} opacity-90`}></div>
        )}

        {/* Play Button Overlay */}
        <div className="absolute inset-0 flex items-center justify-center bg-black/10 hover:bg-black/20 transition-colors cursor-pointer group" onClick={handlePlayClick}>
          <div className="w-20 h-20 bg-white/95 rounded-full flex items-center justify-center group-hover:bg-white group-hover:scale-110 transition-all shadow-2xl">
            <svg className="w-10 h-10 text-gray-900 ml-1.5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
        </div>

        {/* Rank Badge */}
        <div className="absolute top-4 left-4 w-11 h-11 bg-white rounded-full flex items-center justify-center font-bold text-gray-900 shadow-lg z-10 text-sm">
          #{video.rank}
        </div>

        {/* Format Badge */}
        <div className="absolute top-4 right-4 px-3 py-1.5 bg-white/95 rounded-full text-xs font-semibold text-gray-900 shadow-lg z-10">
          {video.format}
        </div>

        {/* Channel Badge */}
        <div className="absolute top-16 right-4 px-2.5 py-1 bg-blue-600 text-white rounded-md text-xs font-semibold shadow-lg z-10 capitalize">
          {video.channel}
        </div>

        {/* Creator */}
        {video.creator && video.creator !== 'Unknown' && (
          <div className="absolute bottom-4 left-4 right-4 text-center z-10">
            <div className="text-white font-bold text-lg drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">{video.creator}</div>
          </div>
        )}
      </div>

      {/* Campaign & Metrics */}
      <div className="p-4">
        <h3 className="font-semibold text-gray-900 mb-3 line-clamp-2 text-sm" title={video.campaign}>
          {video.campaign}
        </h3>

        {/* Spend & CPA */}
        <div className="grid grid-cols-2 gap-4 mb-3">
          <div>
            <div className="text-xs text-gray-500 mb-1 font-medium">Spend</div>
            <div className="text-lg font-bold text-gray-900">
              {formatCurrency(video.metrics.spend)}
            </div>
          </div>
          <div>
            <div className="text-xs text-gray-500 mb-1 font-medium">CPA</div>
            <div className="text-lg font-bold text-gray-900">
              {formatCurrency(video.metrics.cpa)}
            </div>
          </div>
        </div>

        {/* CTR, Hook, Hold */}
        <div className="grid grid-cols-3 gap-2 mb-3">
          <div className="bg-gray-50 rounded-lg p-2 text-center">
            <div className="text-xs text-gray-500 mb-1 font-medium">CTR</div>
            <div className="text-sm font-bold text-gray-900">
              {video.metrics.ctr.toFixed(2)}%
            </div>
          </div>
          <div className="bg-gray-50 rounded-lg p-2 text-center">
            <div className="text-xs text-gray-500 mb-1 font-medium">HOOK</div>
            <div className="text-sm font-bold text-gray-900">
              {video.metrics.hookRate.toFixed(2)}%
            </div>
          </div>
          <div className="bg-gray-50 rounded-lg p-2 text-center">
            <div className="text-xs text-gray-500 mb-1 font-medium">HOLD</div>
            <div className="text-sm font-bold text-gray-900">
              {video.metrics.holdRate.toFixed(2)}%
            </div>
          </div>
        </div>

        {/* Video Link Button */}
        {video.videoUrl && (
          <button
            onClick={handlePlayClick}
            className="w-full text-center text-sm text-blue-600 hover:text-blue-700 font-medium hover:underline"
          >
            Watch Video →
          </button>
        )}

        {/* Change */}
        {video.metrics.change !== undefined && (
          <div className="text-xs mt-2">
            {formatChange(video.metrics.change)}
          </div>
        )}
      </div>
    </div>
  );
}
