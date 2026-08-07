// ─── NEW PREMIUM WATCHLIST IMPLEMENTATION ──────────────────────────
export default function Watchlist({ onSelect, prices }) {
  const coins = ["BTC", "ETH", "DOGE", "SOL", "BNB", "LTC", "XRP"];

  // Fake realistic 24h changes
  const percentageData = {
    BTC: 2.45,
    ETH: -1.12,
    DOGE: 5.31,
    SOL: 3.87,
    BNB: -0.74,
    LTC: 1.24,
    XRP: -2.11,
  };

  return (
    <div className="mt-2" style={{ fontFamily: "'DM Sans', 'Segoe UI', sans-serif" }}>
      {/* Watchlist Section Label */}
      <h3 className="text-white/30 text-xs font-black tracking-widest uppercase mb-3 px-1">
        Watchlist
      </h3>

      {/* Styled List Container */}
      <div className="flex flex-col gap-1">
        {coins.map((coin) => {
          const percentage = percentageData[coin];
          const isPositive = percentage >= 0;
          const livePrice = prices?.[coin];

          return (
            <div
              key={coin}
              onClick={() => onSelect(coin)}
              className="group flex items-center justify-between cursor-pointer px-3 py-2.5 rounded-xl border border-transparent hover:bg-white/[0.03] hover:border-white/5 hover:translate-x-1.5 transition-all duration-300"
            >
              {/* Left Side: Indicator & Ticker */}
              <div className="flex items-center gap-2.5">
                {/* Glowing status indicator dot */}
                <div
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${isPositive
                    ? "bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.5)]"
                    : "bg-rose-400 shadow-[0_0_8px_rgba(244,63,94,0.5)]"
                    }`}
                  style={{
                    animation: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite"
                  }}
                />
                <span className="text-sm font-semibold text-gray-300 group-hover:text-white transition-colors duration-200">
                  {coin}
                </span>
              </div>

              {/* Right Side: Price & Change badge */}
              <div className="flex flex-col items-end">
                <span className="text-sm font-bold text-white font-mono">
                  {livePrice !== undefined ? `$${livePrice.toFixed(2)}` : "$--.--"}
                </span>
                <span
                  className={`text-[10px] font-bold mt-0.5 ${isPositive ? "text-emerald-400" : "text-rose-400"
                    }`}
                >
                  {isPositive ? "▲" : "▼"} {Math.abs(percentage).toFixed(2)}%
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}