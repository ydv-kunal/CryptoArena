import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip, Legend, BarChart, Bar, XAxis, YAxis, CartesianGrid } from "recharts";

// Unique brand colors for each asset
const COIN_COLORS = {
  BTC: "#f7a330",
  ETH: "#627eea",
  SOL: "#9945ff",
  BNB: "#f3ba2f",
  DOGE: "#c2a633",
  LTC: "#345d9d",
  XRP: "#23292f",
  Cash: "#10b981", // Emerald green for cash
  Default: "#6366f1"
};

// Custom Tooltip for the Pie Chart
const AllocationTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-[#0b0b14]/90 border border-white/10 p-3 rounded-xl shadow-2xl backdrop-blur-md text-xs">
        <p className="font-black text-white/40 uppercase mb-1 tracking-wider">{data.name}</p>
        <p className="font-bold text-white font-mono text-sm">
          ${data.value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
        </p>
      </div>
    );
  }
  return null;
};

// Custom Tooltip for the Performance Bar Chart
const PerformanceTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-[#0b0b14]/90 border border-white/10 p-3 rounded-xl shadow-2xl backdrop-blur-md flex flex-col gap-1.5 text-xs">
        <p className="font-black text-white/40 uppercase mb-1 tracking-wider">{payload[0].payload.name}</p>
        {payload.map((item, index) => (
          <div key={index} className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: item.color }} />
            <span className="text-gray-400 font-medium">{item.name}:</span>
            <span className="font-bold text-white font-mono">${Number(item.value).toFixed(2)}</span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

export default function DashboardCharts({ portfolio, balance }) {
  // Convert balance prop to a numeric value
  const cashValue = Number(balance) || 0;

  // 1. Prepare Pie Chart Allocation Data
  const holdingsData = (portfolio || []).map((asset) => {
    // Current valuation = current price * quantity (fallback to avg purchase price if socket is quiet)
    const currentPrice = asset.currentPrice !== undefined ? asset.currentPrice : asset.avgPrice;
    const value = currentPrice * asset.quantity;
    return {
      name: asset.symbol,
      value: Number(value.toFixed(2))
    };
  });

  // Combine coin holdings + Cash into total allocation data
  const allocationData = [...holdingsData];
  if (cashValue > 0 || holdingsData.length === 0) {
    allocationData.push({
      name: "Cash",
      value: cashValue || 1000 // Placeholder if total empty
    });
  }

  // Calculate total portfolio value for percentages
  const totalValue = allocationData.reduce((acc, curr) => acc + curr.value, 0) || 1;

  // 2. Prepare Bar Chart Performance Data
  const performanceData = (portfolio || []).map((asset) => {
    const currentPrice = asset.currentPrice !== undefined ? asset.currentPrice : asset.avgPrice;
    const invested = asset.avgPrice * asset.quantity;
    const currentVal = currentPrice * asset.quantity;

    return {
      name: asset.symbol,
      Invested: Number(invested.toFixed(2)),
      "Current Value": Number(currentVal.toFixed(2))
    };
  });

  // Check if holdings exist to display empty state gracefully
  const hasHoldings = portfolio && portfolio.length > 0;

  return (
    <div 
      className="grid grid-cols-1 lg:grid-cols-2 gap-6"
      style={{ fontFamily: "'DM Sans', 'Segoe UI', sans-serif" }}
    >
      {/* ─── Allocation Doughnut/Pie Chart ─── */}
      <div className="bg-white/[0.02] border border-white/5 p-6 rounded-3xl backdrop-blur-xl flex flex-col shadow-[0_15px_35px_rgba(0,0,0,0.3)]">
        <h3 className="text-sm font-bold text-gray-300 mb-4 px-1">
          Asset Allocation
        </h3>
        
        <div className="h-64 relative flex items-center justify-center">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={allocationData}
                cx="50%"
                cy="50%"
                innerRadius={65}
                outerRadius={85}
                paddingAngle={4}
                dataKey="value"
              >
                {allocationData.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={COIN_COLORS[entry.name] || COIN_COLORS.Default} 
                  />
                ))}
              </Pie>
              <Tooltip content={<AllocationTooltip />} />
            </PieChart>
          </ResponsiveContainer>

          {/* Centered Portfolio Summary Text */}
          <div className="absolute flex flex-col items-center justify-center text-center">
            <span className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">
              Total Portfolio
            </span>
            <span className="text-xl font-black text-white font-mono mt-0.5">
              ${totalValue.toLocaleString(undefined, { maximumFractionDigits: 0 })}
            </span>
          </div>
        </div>

        {/* Legend Indicator Pills */}
        <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 mt-4 px-2">
          {allocationData.map((entry, i) => {
            const percentage = ((entry.value / totalValue) * 100).toFixed(1);
            return (
              <div key={i} className="flex items-center gap-2 bg-white/[0.01] border border-white/5 py-1 px-2.5 rounded-xl text-xs select-none">
                <span 
                  className="w-2.5 h-2.5 rounded-full" 
                  style={{ backgroundColor: COIN_COLORS[entry.name] || COIN_COLORS.Default }}
                />
                <span className="text-gray-400 font-semibold">{entry.name}</span>
                <span className="text-white font-bold font-mono">{percentage}%</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* ─── Performance Comparison Bar Chart ─── */}
      <div className="bg-white/[0.02] border border-white/5 p-6 rounded-3xl backdrop-blur-xl flex flex-col shadow-[0_15px_35px_rgba(0,0,0,0.3)]">
        <h3 className="text-sm font-bold text-gray-300 mb-4 px-1">
          Invested vs Current Valuation
        </h3>

        {hasHoldings ? (
          <div className="h-64 w-full pr-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={performanceData}
                margin={{ top: 10, right: 0, left: -15, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.03)" vertical={false} />
                <XAxis 
                  dataKey="name" 
                  stroke="rgba(255,255,255,0.2)" 
                  tick={{ fill: "rgba(255,255,255,0.4)", fontSize: 11, fontWeight: 700 }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis 
                  stroke="rgba(255,255,255,0.2)"
                  tick={{ fill: "rgba(255,255,255,0.4)", fontSize: 10, fontWeight: 700 }}
                  axisLine={false}
                  tickLine={false}
                  tickFormatter={(val) => `$${val}`}
                />
                <Tooltip content={<PerformanceTooltip />} cursor={{ fill: "rgba(255,255,255,0.02)" }} />
                <Bar dataKey="Invested" fill="#4f46e5" radius={[4, 4, 0, 0]} maxBarSize={30} />
                <Bar dataKey="Current Value" fill="#a855f7" radius={[4, 4, 0, 0]} maxBarSize={30} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        ) : (
          <div className="h-64 flex flex-col items-center justify-center text-center text-xs text-gray-500 font-medium">
            <svg className="w-12 h-12 text-white/10 mb-3" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6a7.5 7.5 0 1 0 7.5 7.5h-7.5V6Z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 10.5H21A7.5 7.5 0 0 0 13.5 3v7.5Z" />
            </svg>
            No active portfolio positions yet.<br />
            Once you execute buy orders, performance bars will plot here.
          </div>
        )}

        {/* Legend Indicators for Bar Chart */}
        {hasHoldings && (
          <div className="flex items-center justify-center gap-6 mt-4 text-xs select-none">
            <div className="flex items-center gap-2">
              <span className="w-3 h-1.5 rounded-sm bg-[#4f46e5]" />
              <span className="text-gray-400 font-semibold">Total Invested Amount</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-1.5 rounded-sm bg-[#a855f7]" />
              <span className="text-gray-400 font-semibold">Current Value</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
