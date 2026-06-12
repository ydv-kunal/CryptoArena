import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import TopCards from "../components/TopCards";
import PortfolioTable from "../components/PortfolioTable";
import Ticker from "../components/Ticker";
import { getPortfolio } from "../services/api";
// Import the new professional Recharts analytics graphs component
import DashboardCharts from "../components/DashboardCharts";

export default function Dashboard() {
    const [portfolio, setPortfolio] = useState([]);
    const [balance, setBalance] = useState(0);
    const [prices, setPrices] = useState({});
    //const [selectedCoin, setSelectedCoin] = useState("BTC");
    const token = localStorage.getItem("token");
    const [assestsCount, setAssestsCount] = useState(0);

    useEffect(() => {
        loadPortfolio();

        // const socket = new WebSocket("ws://localhost:5102");
        const wsUrl = import.meta.env.VITE_WS_URL || "ws://localhost:5102";
        const socket = new WebSocket(wsUrl);

        socket.onmessage = (event) => {
            const prices = JSON.parse(event.data);

            setPortfolio(prev =>
                prev.map(asset => {
                    const currentPrice = prices[asset.symbol] || asset.avgPrice;
                    const profit =
                        (currentPrice - asset.avgPrice) * asset.quantity;

                    return { ...asset, currentPrice, profit };
                })
            );
        };

    }, []);

    const loadPortfolio = async () => {
        const data = await getPortfolio();
        //setPortfolio(data.assets);
        setPortfolio(data.assets || []);
        setBalance(data.balance.toFixed(2));
        setAssestsCount(data.assets?.length || 0);
    };

    // ==========================================
    // ORIGINAL LAYOUT RENDER (COMMENTED OUT)
    // ==========================================
    // return (
    //     <div className="relative flex min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white">
    //         {/* Background Glow */}
    //         <div className="absolute inset-0 -z-10">
    //             <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500 opacity-20 blur-3xl rounded-full"></div>
    //             <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500 opacity-20 blur-3xl rounded-full"></div>
    //         </div>
    //
    //         {/* <Sidebar /> */}
    //         <Sidebar prices={prices} />
    //
    //         <div className="flex-1 p-5 ml-60 animate-fadeIn">
    //
    //             {/* Header */}
    //             <div>
    //                 <h1 className="text-4xl font-bold mb-5 bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text">
    //                     Dashboard
    //                 </h1>
    //                 <p className="text-gray-400 mb-1">Overview of your portfolio</p>
    //             </div>
    //
    //             {/* Live Prices */}
    //             <div className="bg-white/5 p-2 rounded-2xl backdrop-blur mb-2 mt-3">
    //                 <Ticker prices={prices} setPrices={setPrices} />
    //             </div>
    //
    //             {/* Coin Selector */}
    //             {/* <div className="flex gap-3 mt-4">
    //                 {["BTC", "ETH", "DOGE", "SOL", "BNB", "LTC", "XRP"].map((coin) => (
    //                     <button
    //                         key={coin}
    //                         onClick={() => setSelectedCoin(coin)}
    //                         className={`px-4 py-1 rounded-lg text-sm transition ${selectedCoin === coin
    //                                 ? "bg-green-500 text-black"
    //                                 : "bg-white/10 text-gray-300 hover:bg-white/20"
    //                             }`}
    //                     >
    //                         {coin}
    //                     </button>
    //                 ))}
    //             </div> */}
    //
    //             {/* Chart */}
    //             {/* <Chart prices={prices} coin={selectedCoin} /> */}
    //
    //             {/* Cards */}
    //             <div className="mt-4">
    //                 <TopCards balance={balance} assestsCount={assestsCount} />
    //             </div>
    //
    //             {/* Table */}
    //             <div className="bg-white/5 p-6 rounded-2xl backdrop-blur">
    //                 <PortfolioTable portfolio={portfolio} />
    //             </div>
    //
    //         </div>
    //     </div>
    // );

    // ─── NEW PREMIUM DASHBOARD RENDER (OLD RENDER WITH OVERFLOW BUG - COMMENTED OUT) ──────────────────────────────────
    // return (
    //     <div 
    //       className="relative flex min-h-screen text-white overflow-x-hidden"
    //       style={{ 
    //         background: "#0a0a0f", 
    //         fontFamily: "'DM Sans','Segoe UI',sans-serif" 
    //       }}
    //     >
    //       {/* Background glow orbs matching landing page */}
    //       <div style={{ position: "fixed", inset: 0, pointerEvents: "none", overflow: "hidden", zIndex: 0 }}>
    //         <div style={{ position: "absolute", width: 600, height: 600, top: -100, left: -200, borderRadius: "50%", background: "radial-gradient(circle,#4f46e5,transparent 70%)", filter: "blur(80px)", opacity: 0.15 }} />
    //         <div style={{ position: "absolute", width: 500, height: 500, top: 200, right: -150, borderRadius: "50%", background: "radial-gradient(circle,#7c3aed,transparent 70%)", filter: "blur(80px)", opacity: 0.1 }} />
    //         <div style={{ position: "absolute", width: 400, height: 400, bottom: 100, left: "30%", borderRadius: "50%", background: "radial-gradient(circle,#2563eb,transparent 70%)", filter: "blur(80px)", opacity: 0.08 }} />
    //       </div>
    // 
    //       {/* Glassmorphic Sidebar (prices pass triggers live updates) */}
    //       <Sidebar prices={prices} />
    // 
    //       {/* Main dashboard content container */}
    //       <div className="flex-1 p-8 ml-64 z-10 animate-fadeIn flex flex-col gap-6 max-w-[1400px]">
    //         {/* Header Block */}
    //         <div className="flex flex-col gap-1 py-2">
    //           <h1 className="text-4xl font-black tracking-tight text-white">
    //             Dashboard{" "}
    //             <span style={{ background: "linear-gradient(90deg,#818cf8,#c084fc)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
    //               Overview
    //             </span>
    //           </h1>
    //           <p className="text-xs text-white/35 font-bold tracking-widest uppercase">
    //             Real-time Paper Trading Portfolio Simulator
    //           </p>
    //         </div>
    // 
    //         {/* Live Market Price Scrolling Ticker Row */}
    //         <div className="bg-white/[0.02] border border-white/5 p-2.5 rounded-2xl backdrop-blur-xl shadow-lg">
    //           <Ticker prices={prices} setPrices={setPrices} />
    //         </div>
    // 
    //         {/* Portfolio Stats/Metrics Cards Grid */}
    //         <div className="w-full">
    //           <TopCards balance={balance} assestsCount={assestsCount} />
    //         </div>
    // 
    //         {/* Holdings Table Section */}
    //         <div className="flex flex-col gap-3">
    //           <div className="flex items-center justify-between px-2">
    //             <span className="text-sm font-bold text-gray-300">
    //               Active Holdings
    //             </span>
    //             <span className="text-xs text-gray-500 font-medium">
    //               Auto-updates in real time
    //             </span>
    //           </div>
    //           
    //           <div className="bg-white/[0.02] border border-white/5 p-6 rounded-3xl backdrop-blur-xl shadow-[0_15px_35px_rgba(0,0,0,0.4)]">
    //             <PortfolioTable portfolio={portfolio} />
    //           </div>
    //         </div>
    //       </div>
    //     </div>
    //   );
    // }

    // ─── NEW REVISED DASHBOARD RENDER (FIXED OVERFLOW & ADDED CHARTS) ───
    return (
        <div 
            className="relative min-h-screen text-white overflow-x-hidden"
            style={{ 
                background: "#0a0a0f", 
                fontFamily: "'DM Sans','Segoe UI',sans-serif" 
            }}
        >
            {/* Background glow orbs matching landing page */}
            <div style={{ position: "fixed", inset: 0, pointerEvents: "none", overflow: "hidden", zIndex: 0 }}>
                <div style={{ position: "absolute", width: 600, height: 600, top: -100, left: -200, borderRadius: "50%", background: "radial-gradient(circle,#4f46e5,transparent 70%)", filter: "blur(80px)", opacity: 0.15 }} />
                <div style={{ position: "absolute", width: 500, height: 500, top: 200, right: -150, borderRadius: "50%", background: "radial-gradient(circle,#7c3aed,transparent 70%)", filter: "blur(80px)", opacity: 0.1 }} />
                <div style={{ position: "absolute", width: 400, height: 400, bottom: 100, left: "30%", borderRadius: "50%", background: "radial-gradient(circle,#2563eb,transparent 70%)", filter: "blur(80px)", opacity: 0.08 }} />
            </div>

            {/* Glassmorphic Sidebar (prices pass triggers live updates) */}
            <Sidebar prices={prices} />

            {/* Main dashboard content container (removed flex-1 and parent flex layout to fix right-side overflow) */}
            <div className="p-8 ml-64 z-10 animate-fadeIn flex flex-col gap-6 max-w-[1400px]">
                {/* Header Block */}
                <div className="flex flex-col gap-1 py-2">
                    <h1 className="text-4xl font-black tracking-tight text-white">
                        Dashboard{" "}
                        <span style={{ background: "linear-gradient(90deg,#818cf8,#c084fc)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                            Overview
                        </span>
                    </h1>
                    <p className="text-xs text-white/35 font-bold tracking-widest uppercase">
                        Real-time Paper Trading Portfolio Simulator
                    </p>
                </div>

                {/* Live Market Price Scrolling Ticker Row */}
                <div className="bg-white/[0.02] border border-white/5 p-2.5 rounded-2xl backdrop-blur-xl shadow-lg">
                    <Ticker prices={prices} setPrices={setPrices} />
                </div>

                {/* Portfolio Stats/Metrics Cards Grid */}
                <div className="w-full">
                    <TopCards balance={balance} assestsCount={assestsCount} />
                </div>

                {/* Analytics Graphs (Pie & Bar Charts) */}
                <div className="w-full mt-2">
                    <DashboardCharts portfolio={portfolio} balance={balance} />
                </div>

                {/* Holdings Table Section */}
                <div className="flex flex-col gap-3 mt-2">
                    <div className="flex items-center justify-between px-2">
                        <span className="text-sm font-bold text-gray-300">
                            Active Holdings
                        </span>
                        <span className="text-xs text-gray-500 font-medium">
                            Auto-updates in real time
                        </span>
                    </div>
                    
                    <div className="bg-white/[0.02] border border-white/5 p-6 rounded-3xl backdrop-blur-xl shadow-[0_15px_35px_rgba(0,0,0,0.4)]">
                        <PortfolioTable portfolio={portfolio} />
                    </div>
                </div>
            </div>
        </div>
    );
}