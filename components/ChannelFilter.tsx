interface ChannelFilterProps {
  selected: 'all' | 'tiktok' | 'meta' | 'snapchat';
  onChange: (channel: 'all' | 'tiktok' | 'meta' | 'snapchat') => void;
}

export default function ChannelFilter({ selected, onChange }: ChannelFilterProps) {
  const channels = [
    { id: 'all', label: 'All Channels' },
    { id: 'meta', label: 'Meta' },
    { id: 'tiktok', label: 'TikTok' },
    { id: 'snapchat', label: 'Snapchat' },
  ] as const;

  return (
    <div className="flex items-center gap-2 bg-white rounded-lg p-1 shadow-sm border border-gray-200">
      {channels.map((channel) => (
        <button
          key={channel.id}
          onClick={() => onChange(channel.id)}
          className={`
            px-4 py-2 rounded-md text-sm font-medium transition-all
            ${selected === channel.id
              ? 'bg-purple-600 text-white shadow-sm'
              : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
            }
          `}
        >
          {channel.label}
        </button>
      ))}
    </div>
  );
}
