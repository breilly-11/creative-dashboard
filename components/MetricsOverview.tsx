interface MetricsOverviewProps {
  metrics: {
    totalSpend: number;
    spendChange: number;
    avgCPA: number;
    cpaChange: number;
    avgCTR: number;
    ctrChange: number;
    avgHookRate: number;
    hookChange: number;
  };
}

export default function MetricsOverview({ metrics }: MetricsOverviewProps) {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const formatPercent = (value: number) => {
    return `${value.toFixed(2)}%`;
  };

  const formatChange = (value: number) => {
    const isPositive = value > 0;
    return (
      <span className={isPositive ? 'text-green-600' : 'text-red-600'}>
        {isPositive ? '↑' : '↓'} {Math.abs(value)}%
      </span>
    );
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {/* Total Spend */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <div className="text-gray-500 text-sm font-medium mb-2">Total Spend</div>
        <div className="text-3xl font-bold text-gray-900 mb-1">
          {formatCurrency(metrics.totalSpend)}
        </div>
        <div className="text-sm">{formatChange(metrics.spendChange)}</div>
      </div>

      {/* Avg. CPA */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <div className="text-gray-500 text-sm font-medium mb-2">Avg. CPA</div>
        <div className="text-3xl font-bold text-gray-900 mb-1">
          {formatCurrency(metrics.avgCPA)}
        </div>
        <div className="text-sm">{formatChange(metrics.cpaChange)}</div>
      </div>

      {/* Avg. CTR */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <div className="text-gray-500 text-sm font-medium mb-2">Avg. CTR</div>
        <div className="text-3xl font-bold text-gray-900 mb-1">
          {formatPercent(metrics.avgCTR)}
        </div>
        <div className="text-sm">{formatChange(metrics.ctrChange)}</div>
      </div>

      {/* Avg. Hook Rate */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <div className="text-gray-500 text-sm font-medium mb-2">Avg. Hook Rate</div>
        <div className="text-3xl font-bold text-gray-900 mb-1">
          {formatPercent(metrics.avgHookRate)}
        </div>
        <div className="text-sm">{formatChange(metrics.hookChange)}</div>
      </div>
    </div>
  );
}
