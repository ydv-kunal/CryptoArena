import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
// Imported motion from framer-motion for smooth list page transitions
import { motion } from "framer-motion";

// Helper function to return unique gradient styles and characters for each coin, matching the dashboard/portfolio styling
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
    return styles[symbol] || { bg: "linear-gradient(135deg, #4f46e5, #7c3aed)", shadow: "rgba(79,70,229,0.25)", char: symbol ? symbol.charAt(0) : "T" };
};

export default function History() {
    const [transactions, setTransactions] = useState([]);

    useEffect(() => {
        // fetch("http://localhost:5100/trade/transactions", {
        const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:5100";
        fetch(`${apiUrl}/trade/transactions`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        })
            .then((res) => res.json())
            .then((data) => {
                setTransactions(data.transactions);
            });
    }, []);

    // ==========================================
    // ORIGINAL LAYOUT RENDER (COMMENTED OUT)
    // ==========================================
    //     return (
    //         <div className="flex min-h-screen bg-black text-white">
    //             <Sidebar />
    // 
    //             <div className="ml-60 flex-1 p-8">
    //                 <h1 className="text-5xl font-bold text-blue-500 mb-2">
    //                     Transaction History
    //                 </h1>
    // 
    //                 <p className="text-gray-400 mb-8">
    //                     All your buy and sell activities
    //                 </p>
    // 
    //                 <div className="bg-white/5 backdrop-blur-xl rounded-3xl overflow-hidden border border-white/10">
    //                     <table className="w-full">
    //                         <thead className="bg-white/10">
    //                             <tr>
    //                                 <th className="p-4">Date</th>
    //                                 <th>Type</th>
    //                                 <th>Coin</th>
    //                                 <th>Qty</th>
    //                                 <th>Price</th>
    //                                 <th>Total</th>
    //                             </tr>
    //                         </thead>
    // 
    //                         <tbody>
    //                             {transactions.map((tx) => (
    //                                 <tr
    //                                     key={tx._id}
    //                                     className="text-center border-b border-white/10"
    //                                 >
    //                                     <td className="p-4">
    //                                         {new Date(tx.createdAt).toLocaleString()}
    //                                     </td>
    // 
    //                                     <td
    //                                         className={
    //                                             tx.type === "BUY"
    //                                                 ? "text-green-400 font-semibold"
    //                                                 : "text-red-400 font-semibold"
    //                                         }
    //                                     >
    //                                         {tx.type}
    //                                     </td>
    // 
    //                                     <td>{tx.symbol}</td>
    // 
    //                                     <td>{tx.quantity}</td>
    // 
    //                                     <td>${tx.price.toFixed(2)}</td>
    // 
    //                                     <td>${tx.total.toFixed(2)}</td>
    // 
    //                                 </tr>
    //                             ))}
    //                         </tbody>
    //                     </table>
    //                 </div>
    //             </div>
    //         </div>
    //     );
    // }

    //     // ─── NEW REVISED HISTORY RENDER (FIXED OVERFLOW & UNIFIED DESIGN) (COMMENTED OUT AS PER INSTRUCTIONS) ───
    //     return (
    //         <div 
    //             className="relative min-h-screen text-white overflow-x-hidden"
    //             style={{ 
    //                 background: "#0a0a0f", 
    //                 fontFamily: "'DM Sans','Segoe UI',sans-serif" 
    //             }}
    //         >
    //             {/* Background glow orbs matching landing page */}
    //             <div style={{ position: "fixed", inset: 0, pointerEvents: "none", overflow: "hidden", zIndex: 0 }}>
    //                 <div style={{ position: "absolute", width: 600, height: 600, top: -100, left: -200, borderRadius: "50%", background: "radial-gradient(circle,#4f46e5,transparent 70%)", filter: "blur(80px)", opacity: 0.15 }} />
    //                 <div style={{ position: "absolute", width: 500, height: 500, top: 200, right: -150, borderRadius: "50%", background: "radial-gradient(circle,#7c3aed,transparent 70%)", filter: "blur(80px)", opacity: 0.1 }} />
    //                 <div style={{ position: "absolute", width: 400, height: 400, bottom: 100, left: "30%", borderRadius: "50%", background: "radial-gradient(circle,#2563eb,transparent 70%)", filter: "blur(80px)", opacity: 0.08 }} />
    //             </div>
    // 
    //             {/* Sidebar */}
    //             <Sidebar />
    // 
    //             {/* Main content area (removed flex-1 and parent flex layout to fix overflow, added ml-64 matching sidebar) */}
    //             <div className="p-8 ml-64 z-10 animate-fadeIn flex flex-col gap-6 max-w-[1400px]">
    //                 {/* Header Block */}
    //                 <div className="flex flex-col gap-1 py-2">
    //                     <h1 className="text-4xl font-black tracking-tight text-white">
    //                         Transaction{" "}
    //                         <span style={{ background: "linear-gradient(90deg,#818cf8,#c084fc)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
    //                             History
    //                         </span>
    //                     </h1>
    //                     <p className="text-xs text-white/35 font-bold tracking-widest uppercase">
    //                         All your virtual buy and sell activities
    //                     </p>
    //                 </div>
    // 
    //                 {/* Table wrapper card */}
    //                 <div className="bg-white/[0.02] border border-white/5 p-6 rounded-3xl backdrop-blur-xl shadow-[0_15px_35px_rgba(0,0,0,0.4)] mt-2">
    //                     <table className="w-full border-collapse">
    //                         <thead>
    //                             <tr className="border-b border-white/5 bg-white/[0.01]">
    //                                 <th className="py-4 px-6 text-left text-xs font-black text-white/30 tracking-widest uppercase">Date</th>
    //                                 <th className="py-4 px-6 text-center text-xs font-black text-white/30 tracking-widest uppercase">Type</th>
    //                                 <th className="py-4 px-6 text-center text-xs font-black text-white/30 tracking-widest uppercase">Coin</th>
    //                                 <th className="py-4 px-6 text-right text-xs font-black text-white/30 tracking-widest uppercase">Qty</th>
    //                                 <th className="py-4 px-6 text-right text-xs font-black text-white/30 tracking-widest uppercase">Price</th>
    //                                 <th className="py-4 px-6 text-right text-xs font-black text-white/30 tracking-widest uppercase">Total</th>
    //                             </tr>
    //                         </thead>
    // 
    //                         <tbody className="divide-y divide-white/5">
    //                             {transactions && transactions.length > 0 ? (
    //                                 transactions.map((tx) => (
    //                                     <tr
    //                                         key={tx._id}
    //                                         className="hover:bg-white/[0.02] transition-colors duration-200"
    //                                     >
    //                                         <td className="py-4 px-6 text-left text-sm text-gray-300 font-mono">
    //                                             {new Date(tx.createdAt).toLocaleString()}
    //                                         </td>
    // 
    //                                         <td className="py-4 px-6 text-center text-sm font-bold">
    //                                             <span className={`inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-bold ${
    //                                                 tx.type === "BUY"
    //                                                     ? "bg-emerald-500/10 border border-emerald-500/10 text-emerald-400"
    //                                                     : "bg-rose-500/10 border border-rose-500/10 text-rose-400"
    //                                             }`}>
    //                                                 {tx.type}
    //                                             </span>
    //                                         </td>
    // 
    //                                         <td className="py-4 px-6 text-center text-sm font-bold text-white">
    //                                             {tx.symbol}
    //                                         </td>
    // 
    //                                         <td className="py-4 px-6 text-right text-sm text-gray-300 font-mono font-bold">
    //                                             {tx.quantity}
    //                                         </td>
    // 
    //                                         <td className="py-4 px-6 text-right text-sm text-gray-300 font-mono">
    //                                             ${tx.price.toFixed(2)}
    //                                         </td>
    // 
    //                                         <td className="py-4 px-6 text-right text-sm text-white font-mono font-bold">
    //                                             ${tx.total.toFixed(2)}
    //                                         </td>
    //                                     </tr>
    //                                 ))
    //                             ) : (
    //                                 <tr>
    //                                     <td colSpan="6" className="py-8 text-center text-sm text-gray-500 font-medium">
    //                                         No transactions recorded. Make some trades to see them here!
    //                                     </td>
    //                                 </tr>
    //                             )}
    //                         </tbody>
    //                     </table>
    //                 </div>
    //             </div>
    //         </div>
    //     );
    // }

    // ─── UPGRADED PREMIUM GLASSMORPHIC HISTORY RENDER ───────────────────
    // Added metrics header cards, Framer Motion animations, custom token badges, and glowing status pills

    // Safety calculations for the stats grid
    const safeTx = transactions || [];
    const totalTrades = safeTx.length;
    const buyTrades = safeTx.filter((t) => t.type === "BUY").length;
    const sellTrades = safeTx.filter((t) => t.type === "SELL").length;

    // Find most traded coin
    const coinCounts = safeTx.reduce((acc, t) => {
        if (t.symbol) {
            acc[t.symbol] = (acc[t.symbol] || 0) + 1;
        }
        return acc;
    }, {});
    let mostTradedAsset = "-";
    let maxCount = 0;
    Object.entries(coinCounts).forEach(([symbol, count]) => {
        if (count > maxCount) {
            maxCount = count;
            mostTradedAsset = symbol;
        }
    });

    const mostTradedBadge = mostTradedAsset !== "-" ? getCoinBadgeStyles(mostTradedAsset) : null;

    return (
        <div
            className="relative min-h-screen text-white overflow-x-hidden pb-12"
            style={{
                background: "#0a0a0f",
                fontFamily: "'DM Sans','Segoe UI',sans-serif"
            }}
        >
            {/* Ambient Background Glows */}
            <div style={{ position: "fixed", inset: 0, pointerEvents: "none", overflow: "hidden", zIndex: 0 }}>
                <div style={{ position: "absolute", width: 600, height: 600, top: -100, left: -200, borderRadius: "50%", background: "radial-gradient(circle,#4f46e5,transparent 70%)", filter: "blur(80px)", opacity: 0.15 }} />
                <div style={{ position: "absolute", width: 500, height: 500, top: 200, right: -150, borderRadius: "50%", background: "radial-gradient(circle,#7c3aed,transparent 70%)", filter: "blur(80px)", opacity: 0.1 }} />
                <div style={{ position: "absolute", width: 400, height: 400, bottom: 100, left: "30%", borderRadius: "50%", background: "radial-gradient(circle,#2563eb,transparent 70%)", filter: "blur(80px)", opacity: 0.08 }} />
            </div>

            {/* Sidebar Navigation */}
            <Sidebar />

            {/* Main Content (matches workspace margins) */}
            <div className="p-8 ml-64 z-10 relative flex flex-col gap-8 max-w-[1400px]">

                {/* Heading Block */}
                <div className="flex flex-col gap-1.5">
                    <h1 className="text-4xl font-black tracking-tight text-white">
                        Transaction{" "}
                        <span style={{ background: "linear-gradient(90deg,#818cf8,#c084fc)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                            History
                        </span>
                    </h1>
                    <p className="text-xs text-white/35 font-bold tracking-widest uppercase">
                        All your virtual buy and sell activities
                    </p>
                </div>

                {/* Dashboard-Style Stats Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Stat Card 1: Total Trades */}
                    <div className="bg-white/[0.02] border border-white/5 p-6 rounded-3xl backdrop-blur-xl shadow-lg flex items-center justify-between hover:border-white/10 transition-all duration-300">
                        <div>
                            <p className="text-xs font-black tracking-widest text-white/30 uppercase mb-1">Total Executed</p>
                            <h3 className="text-3xl font-black text-white">{totalTrades}</h3>
                            <p className="text-xs text-white/40 mt-1">Completed orders</p>
                        </div>
                        <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 flex items-center justify-center border border-indigo-500/20 text-indigo-400">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                            </svg>
                        </div>
                    </div>

                    {/* Stat Card 2: Order Activity */}
                    <div className="bg-white/[0.02] border border-white/5 p-6 rounded-3xl backdrop-blur-xl shadow-lg flex items-center justify-between hover:border-white/10 transition-all duration-300">
                        <div>
                            <p className="text-xs font-black tracking-widest text-white/30 uppercase mb-1">Order Activity</p>
                            <h3 className="text-2xl font-black text-white flex items-center gap-2">
                                <span className="text-emerald-400">{buyTrades} <span className="text-xs font-medium text-white/40">Buys</span></span>
                                <span className="text-white/20">/</span>
                                <span className="text-rose-400">{sellTrades} <span className="text-xs font-medium text-white/40">Sells</span></span>
                            </h3>
                            <p className="text-xs text-white/40 mt-2">Trade direction mix</p>
                        </div>
                        <div className="w-12 h-12 rounded-2xl bg-purple-500/10 flex items-center justify-center border border-purple-500/20 text-purple-400">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                            </svg>
                        </div>
                    </div>

                    {/* Stat Card 3: Most Traded Coin */}
                    <div className="bg-white/[0.02] border border-white/5 p-6 rounded-3xl backdrop-blur-xl shadow-lg flex items-center justify-between hover:border-white/10 transition-all duration-300">
                        <div>
                            <p className="text-xs font-black tracking-widest text-white/30 uppercase mb-1">Most Traded</p>
                            {mostTradedAsset !== "-" ? (
                                <div className="flex items-center gap-2 mt-1">
                                    <span
                                        className="w-7 h-7 rounded-full flex items-center justify-center text-xs text-white font-bold shadow-md"
                                        style={{
                                            background: mostTradedBadge?.bg,
                                            boxShadow: `0 2px 8px ${mostTradedBadge?.shadow}`,
                                            border: "1px solid rgba(255, 255, 255, 0.1)"
                                        }}
                                    >
                                        {mostTradedBadge?.char}
                                    </span>
                                    <span className="text-2xl font-black text-white">{mostTradedAsset}</span>
                                </div>
                            ) : (
                                <h3 className="text-3xl font-black text-white">-</h3>
                            )}
                            <p className="text-xs text-white/40 mt-1">
                                {mostTradedAsset !== "-" ? `Activity frequency: ${maxCount} orders` : "No trades yet"}
                            </p>
                        </div>
                        <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20 text-emerald-400">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                            </svg>
                        </div>
                    </div>
                </div>

                {/* Table wrapper card */}
                <div className="bg-white/[0.02] border border-white/5 p-6 rounded-3xl backdrop-blur-xl shadow-[0_15px_35px_rgba(0,0,0,0.4)]">
                    <table className="w-full border-collapse">
                        <thead>
                            <tr className="border-b border-white/5 bg-white/[0.01]">
                                <th className="py-4 px-6 text-left text-xs font-black text-white/30 tracking-widest uppercase">Date</th>
                                <th className="py-4 px-6 text-center text-xs font-black text-white/30 tracking-widest uppercase">Type</th>
                                <th className="py-4 px-6 text-center text-xs font-black text-white/30 tracking-widest uppercase">Coin</th>
                                <th className="py-4 px-6 text-right text-xs font-black text-white/30 tracking-widest uppercase">Qty</th>
                                <th className="py-4 px-6 text-right text-xs font-black text-white/30 tracking-widest uppercase">Price</th>
                                <th className="py-4 px-6 text-right text-xs font-black text-white/30 tracking-widest uppercase">Total</th>
                            </tr>
                        </thead>

                        <tbody className="divide-y divide-white/5">
                            {safeTx.length > 0 ? (
                                safeTx.map((tx, index) => {
                                    const badge = getCoinBadgeStyles(tx.symbol);
                                    return (
                                        <motion.tr
                                            key={tx._id || index}
                                            initial={{ opacity: 0, y: 12 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ duration: 0.35, delay: Math.min(index * 0.04, 0.8) }}
                                            className="hover:bg-white/[0.02] transition-colors duration-200"
                                        >
                                            {/* Date info styled nicely with mono */}
                                            <td className="py-4 px-6 text-left text-sm text-gray-300 font-mono">
                                                {new Date(tx.createdAt).toLocaleString(undefined, {
                                                    year: 'numeric',
                                                    month: 'short',
                                                    day: '2-digit',
                                                    hour: '2-digit',
                                                    minute: '2-digit',
                                                    second: '2-digit'
                                                })}
                                            </td>

                                            {/* Transaction Type Pill */}
                                            <td className="py-4 px-6 text-center text-sm font-bold">
                                                <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black tracking-wider uppercase ${tx.type === "BUY"
                                                        ? "bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 shadow-[0_0_12px_rgba(16,185,129,0.1)]"
                                                        : "bg-rose-500/10 border border-rose-500/20 text-rose-400 shadow-[0_0_12px_rgba(244,63,94,0.1)]"
                                                    }`}>
                                                    <span className={`w-1.5 h-1.5 rounded-full ${tx.type === "BUY" ? "bg-emerald-400" : "bg-rose-400"}`} />
                                                    {tx.type}
                                                </span>
                                            </td>

                                            {/* Coin Badge & Symbol */}
                                            <td className="py-4 px-6 text-center text-sm font-bold text-white">
                                                <div className="inline-flex items-center gap-2.5">
                                                    <span
                                                        className="w-7 h-7 rounded-full flex items-center justify-center text-xs text-white font-bold shadow-lg"
                                                        style={{
                                                            background: badge.bg,
                                                            boxShadow: `0 4px 10px ${badge.shadow}`,
                                                            border: "1px solid rgba(255, 255, 255, 0.15)"
                                                        }}
                                                    >
                                                        {badge.char}
                                                    </span>
                                                    <span className="font-semibold text-white tracking-wide">{tx.symbol}</span>
                                                </div>
                                            </td>

                                            {/* Quantity */}
                                            <td className="py-4 px-6 text-right text-sm text-gray-300 font-mono font-bold">
                                                {tx.quantity}
                                            </td>

                                            {/* Price */}
                                            <td className="py-4 px-6 text-right text-sm text-gray-400 font-mono">
                                                ${(tx.price || 0).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                            </td>

                                            {/* Total cost */}
                                            <td className="py-4 px-6 text-right text-sm text-white font-mono font-bold">
                                                ${(tx.total || 0).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                            </td>
                                        </motion.tr>
                                    );
                                })
                            ) : (
                                <tr>
                                    <td colSpan="6" className="py-16 text-center text-sm text-white/30 font-medium">
                                        <div className="flex flex-col items-center gap-3">
                                            <svg className="w-10 h-10 text-white/10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                            <span>No transactions recorded yet. Make some trades to populate this view!</span>
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}



