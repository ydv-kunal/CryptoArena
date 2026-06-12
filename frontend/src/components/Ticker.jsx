// ==========================================
// ORIGINAL STATIC TICKER IMPLEMENTATION (COMMENTED OUT)
// ==========================================
// import { useEffect } from "react";
// 
// export default function Ticker({ prices, setPrices }) {
//   // Establish connection to WebSocket on mount
//   useEffect(() => {
//     const socket = new WebSocket("ws://localhost:5102");
// 
//     socket.onmessage = (event) => {
//       setPrices(JSON.parse(event.data));
//     };
//     return () => socket.close();
//   }, [setPrices]);
// 
//   // Consistent 24h market price changes matching Watchlist
//   const percentageData = {
//     BTC: 2.45,
//     ETH: -1.12,
//     DOGE: 5.31,
//     SOL: 3.87,
//     BNB: -0.74,
//     LTC: 1.24,
//     XRP: -2.11,
//   };
// 
//   return (
//     <div 
//       className="flex items-center gap-4 py-1.5 px-2 overflow-x-auto no-scrollbar scroll-smooth"
//       style={{ fontFamily: "'DM Sans', 'Segoe UI', sans-serif" }}
//     >
//       {Object.entries(prices).map(([coin, price]) => {
//         const percentage = percentageData[coin] || 0;
//         const isPositive = percentage >= 0;
// 
//         return (
//           <div 
//             key={coin}
//             className="flex items-center gap-3 bg-white/[0.02] border border-white/5 px-4 py-2 rounded-xl hover:bg-white/[0.05] transition-all duration-300 shrink-0 select-none shadow-sm cursor-default"
//           >
//             {/* Coin name badge */}
//             <span className="text-xs font-black text-white/40 tracking-wider">
//               {coin}
//             </span>
//             
//             {/* Live price details */}
//             <span className="text-sm font-bold text-white font-mono tracking-tight">
//               ${price.toFixed(2)}
//             </span>
//             
//             {/* 24h percentage badge */}
//             <span className={`text-[10px] font-black ${isPositive ? "text-emerald-400" : "text-rose-400"}`}>
//               {isPositive ? "▲" : "▼"} {Math.abs(percentage).toFixed(2)}%
//             </span>
//           </div>
//         );
//       })}
//     </div>
//   );
// }
// ========================================== */

// ─── NEW MOVING MARQUEE TICKER TAPE IMPLEMENTATION ───────────────────
import { useEffect } from "react";
import { motion } from "framer-motion";

export default function Ticker({ prices, setPrices }) {
  // Establish connection to WebSocket on mount
  useEffect(() => {
    // const socket = new WebSocket("ws://localhost:5102");
    const wsUrl = import.meta.env.VITE_WS_URL || "ws://localhost:5102";
    const socket = new WebSocket(wsUrl);

    socket.onmessage = (event) => {
      setPrices(JSON.parse(event.data));
    };
    return () => socket.close();
  }, [setPrices]);

  // Consistent 24h market price changes matching Watchlist
  const percentageData = {
    BTC: 2.45,
    ETH: -1.12,
    DOGE: 5.31,
    SOL: 3.87,
    BNB: -0.74,
    LTC: 1.24,
    XRP: -2.11,
  };

  // Safe pricing fallback dictionary so the ticker always scrolls on mount
  const fallbackPrices = {
    BTC: 63567.00,
    ETH: 1684.43,
    DOGE: 0.09,
    SOL: 67.01,
    BNB: 605.34,
    LTC: 42.22,
    XRP: 1.15
  };

  // Merge live and fallback prices
  const activePrices = Object.keys(prices).length > 0 ? prices : fallbackPrices;
  const entries = Object.entries(activePrices);

  // Duplicate entries 4 times to ensure enough width for seamless looping
  const repeatedEntries = [...entries, ...entries, ...entries, ...entries];

  return (
    <div 
      className="overflow-hidden w-full relative select-none"
      style={{ fontFamily: "'DM Sans', 'Segoe UI', sans-serif" }}
    >
      <motion.div
        className="flex gap-6 whitespace-nowrap w-max"
        animate={{ x: ["0%", "-50%"] }} // Loops seamlessly at 50% translation
        transition={{ 
          duration: 35, 
          repeat: Infinity, 
          ease: "linear" 
        }}
      >
        {repeatedEntries.map(([coin, price], i) => {
          const percentage = percentageData[coin] || 0;
          const isPositive = percentage >= 0;

          return (
            <div 
              key={`${coin}-${i}`}
              className="flex items-center gap-3 bg-white/[0.01] hover:bg-white/[0.04] border border-white/5 px-4 py-2 rounded-xl transition-colors duration-300 shrink-0 shadow-sm cursor-default"
            >
              {/* Coin name badge */}
              <span className="text-xs font-black text-white/40 tracking-wider">
                {coin}
              </span>
              
              {/* Live price details */}
              <span className="text-sm font-bold text-white font-mono tracking-tight">
                ${price.toFixed(2)}
              </span>
              
              {/* 24h percentage badge */}
              <span className={`text-[10px] font-black ${isPositive ? "text-emerald-400" : "text-rose-400"}`}>
                {isPositive ? "▲" : "▼"} {Math.abs(percentage).toFixed(2)}%
              </span>
            </div>
          );
        })}
      </motion.div>
    </div>
  );
}