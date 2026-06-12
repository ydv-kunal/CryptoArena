// ==========================================
// ORIGINAL PORTFOLIOTABLE IMPLEMENTATION (COMMENTED OUT)
// ==========================================
// export default function PortfolioTable({ portfolio }) {
//     return (
//         <table className="w-full bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden shadow-2xl">
// 
//             <thead className="bg-gray-800 text-gray-200">
//                 <tr>
//                     <th className="p-4 w-[15%]">Symbol</th>
//                     <th className="w-[15%]">Qty</th>
//                     <th className="w-[23%]">Avg Price</th>
//                     <th className="w-[23%]">Invested Amount</th>
//                     <th className="w-[24%] text-right pr-10">Profit / Loss</th>
//                 </tr>
//             </thead>
// 
//             <tbody>
//                 {portfolio?.map((a, i) => {
// 
//                     const profitPercentage =
//                         ((a.profit / (a.avgPrice * a.quantity)) * 100);
// 
//                     return (
//                         <tr
//                             key={i}
//                             className="border-b border-white/10 hover:bg-white/10 transition"
//                         >
// 
//                             {/* Symbol */}
//                             <td className="p-4 text-center font-medium">
//                                 {a.symbol}
//                             </td>
// 
//                             {/* Quantity */}
//                             <td className="text-center">
//                                 {a.quantity}
//                             </td>
// 
//                             {/* Avg Price */}
//                             <td className="text-center">
//                                 ${a.avgPrice?.toFixed(2)}
//                             </td>
// 
//                             {/* Invested Amount */}
//                             <td className="text-center">
//                                 ${(a.avgPrice * a.quantity).toFixed(2)}
//                             </td>
// 
//                             {/* Profit */}
//                             <td
//                                 className={`pr-10 text-right ${
//                                     a.profit >= 0
//                                         ? "text-green-400"
//                                         : "text-red-400"
//                                 }`}
//                             >
//                                 <div className="flex items-center justify-end gap-3">
// 
//                                     {/* Amount */}
//                                     <span className="font-semibold text-lg">
//                                         ${a.profit?.toFixed(2)}
//                                     </span>
// 
//                                     {/* Percentage */}
//                                     <span className="text-sm opacity-80">
//                                         ({profitPercentage.toFixed(2)}%)
//                                     </span>
// 
//                                 </div>
//                             </td>
// 
//                         </tr>
//                     );
//                 })}
//             </tbody>
// 
//         </table>
//     );
// }

// ─── NEW PREMIUM PORTFOLIOTABLE IMPLEMENTATION ─────────────────────
import { motion } from "framer-motion";

// Helper function to return unique gradient styles and characters for each coin
const getCoinBadgeStyles = (symbol) => {
  const styles = {
    BTC: { bg: "linear-gradient(135deg, #f7a330, #e8650a)", shadow: "rgba(247,163,48,0.25)", char: "₿" },
    ETH: { bg: "linear-gradient(135deg, #627eea, #3b5ee8)", shadow: "rgba(98,126,234,0.25)", char: "Ξ" },
    SOL: { bg: "linear-gradient(135deg, #9945ff, #14f195)", shadow: "rgba(153,69,255,0.25)", char: "S" },
    BNB: { bg: "linear-gradient(135deg, #f3ba2f, #dca018)", shadow: "rgba(243,186,47,0.25)", char: "B" },
    DOGE: { bg: "linear-gradient(135deg, #c2a633, #a2871b)", shadow: "rgba(194,166,51,0.25)", char: "Ð" },
    LTC: { bg: "linear-gradient(135deg, #345d9d, #224273)", shadow: "rgba(52,93,157,0.25)", char: "Ł" },
    XRP: { bg: "linear-gradient(135deg, #23292f, #0f1215)", shadow: "rgba(35,41,47,0.25)", char: "X" }
  };
  return styles[symbol] || { bg: "linear-gradient(135deg, #4f46e5, #7c3aed)", shadow: "rgba(79,70,229,0.25)", char: symbol.charAt(0) };
};

export default function PortfolioTable({ portfolio }) {
  return (
    <div 
      className="w-full overflow-x-auto"
      style={{ fontFamily: "'DM Sans', 'Segoe UI', sans-serif" }}
    >
      <table className="w-full border-collapse">
        {/* Table Header */}
        <thead>
          <tr className="border-b border-white/5 bg-white/[0.01]">
            <th className="py-4 px-6 text-left text-xs font-black text-white/30 tracking-widest uppercase">
              Asset
            </th>
            <th className="py-4 px-6 text-right text-xs font-black text-white/30 tracking-widest uppercase">
              Quantity
            </th>
            <th className="py-4 px-6 text-right text-xs font-black text-white/30 tracking-widest uppercase">
              Avg Purchase Price
            </th>
            <th className="py-4 px-6 text-right text-xs font-black text-white/30 tracking-widest uppercase">
              Total Investment
            </th>
            <th className="py-4 px-6 text-right text-xs font-black text-white/30 tracking-widest uppercase">
              Net Profit / Loss
            </th>
          </tr>
        </thead>

        {/* Table Body */}
        <tbody className="divide-y divide-white/5">
          {portfolio && portfolio.length > 0 ? (
            portfolio.map((asset, i) => {
              const profitPercentage = ((asset.profit / (asset.avgPrice * asset.quantity)) * 100) || 0;
              const isProfit = asset.profit >= 0;
              const badge = getCoinBadgeStyles(asset.symbol);

              return (
                <motion.tr
                  key={asset.symbol || i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: i * 0.05 }}
                  className="group hover:bg-white/[0.02] transition-colors duration-200"
                >
                  {/* Coin Badge & Symbol */}
                  <td className="py-4 px-6 text-left">
                    <div className="flex items-center gap-3">
                      {/* Round Gradient Icon Badge */}
                      <div 
                        style={{
                          background: badge.bg,
                          boxShadow: `0 0 15px ${badge.shadow}`
                        }}
                        className="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-sm select-none"
                      >
                        {badge.char}
                      </div>
                      <div className="flex flex-col">
                        <span className="text-sm font-semibold text-white">
                          {asset.symbol}
                        </span>
                        <span className="text-[10px] text-gray-500 font-medium">
                          Crypto Asset
                        </span>
                      </div>
                    </div>
                  </td>

                  {/* Quantity */}
                  <td className="py-4 px-6 text-right text-sm font-bold text-gray-300 font-mono">
                    {asset.quantity}
                  </td>

                  {/* Average Price */}
                  <td className="py-4 px-6 text-right text-sm font-semibold text-gray-300 font-mono">
                    ${asset.avgPrice?.toFixed(2)}
                  </td>

                  {/* Invested Amount */}
                  <td className="py-4 px-6 text-right text-sm font-semibold text-white font-mono">
                    ${(asset.avgPrice * asset.quantity).toFixed(2)}
                  </td>

                  {/* Profit or Loss */}
                  <td className="py-4 px-6 text-right">
                    <div className="flex justify-end items-center">
                      <span
                        className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold font-mono border ${
                          isProfit
                            ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-400 shadow-[0_0_12px_rgba(16,185,129,0.05)]"
                            : "bg-rose-500/10 border-rose-500/20 text-rose-400 shadow-[0_0_12px_rgba(244,63,94,0.05)]"
                        }`}
                      >
                        <span>{isProfit ? "▲" : "▼"}</span>
                        <span>${Math.abs(asset.profit || 0).toFixed(2)}</span>
                        <span className="opacity-70 text-[10px]">
                          ({isProfit ? "+" : ""}{profitPercentage.toFixed(2)}%)
                        </span>
                      </span>
                    </div>
                  </td>
                </motion.tr>
              );
            })
          ) : (
            <tr>
              <td colSpan="5" className="py-8 text-center text-sm text-gray-500 font-medium">
                No active assets in your portfolio. Go to trade page to buy some!
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
















// export default function PortfolioTable({ portfolio }) {
//     return (
//         <table className="w-full bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden shadow-2xl">
//             <thead className="bg-gray-800">
//                 <tr>
//                     <th className="p-3">Symbol</th>
//                     <th>Qty</th>
//                     <th>Average Price</th>
//                     <th>Profit</th>
//                 </tr>
//             </thead>

//             <tbody>
//                 {portfolio?.map((a, i) => (
//                     <tr
//                         key={i}
//                         className="text-center border-b border-white/10 hover:bg-white/10 transition"
//                     >
//                         <td className="p-3">{a.symbol}</td>
//                         <td>{a.quantity}</td>
//                         {/* <td>${a.currentPrice?.toFixed(2)}</td> */}
//                         <td>${a.avgPrice?.toFixed(2)}</td>
//                         {/* <td
//                             className={
//                                 a.profit >= 0 ? "text-green-400" : "text-red-400"
//                             }
//                         >
//                             ${a.profit?.toFixed(2)}
//                         </td> */}
//                         <td
//                             className={
//                                 a.profit >= 0 ? "text-green-400" : "text-red-400"
//                             }
//                         >
//                             <div className="flex items-center justify-end gap-3 pr-4">

//                                 {/* Profit Amount */}
//                                 <span className="font-semibold">
//                                     ${a.profit?.toFixed(2)}
//                                 </span>

//                                 {/* Profit Percentage */}
//                                 <span className="text-sm opacity-80 min-w-[70px] text-right">
//                                     ( {((a.profit / (a.avgPrice * a.quantity)) * 100).toFixed(2)}% )
                                        
//                                 </span>

//                             </div>
//                         </td>
//                     </tr>
//                 ))}
//             </tbody>
//         </table>
//     );
// }