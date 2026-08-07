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

        // 1. Instant REST fetch for initial prices on page load
        const fetchPricesREST = async () => {
            try {
                const apiUrl = (import.meta.env.VITE_API_URL || "http://localhost:5100").replace(/\/$/, "");
                const res = await fetch(`${apiUrl}/market/prices`);
                if (res.ok) setPrices(await res.json());
            } catch (err) {
                console.log("REST initial price fetch error:", err.message);
            }
        };
        fetchPricesREST();

        // 2. Real-time WebSocket price stream
        const wsUrl = import.meta.env.VITE_WS_URL || "ws://localhost:5103";
        const socket = new WebSocket(wsUrl);

        socket.onmessage = (event) => {
            const livePrices = JSON.parse(event.data);
            setPrices(livePrices);

            setPortfolio(prev =>
                prev.map(asset => {
                    const currentPrice = livePrices[asset.symbol] || asset.avgPrice;
                    const profit = (currentPrice - asset.avgPrice) * asset.quantity;
                    return { ...asset, currentPrice, profit };
                })
            );
        };
        return () => socket.close();
    }, []);

    const loadPortfolio = async () => {
        const data = await getPortfolio();
        //setPortfolio(data.assets);
        setPortfolio(data.assets || []);
        setBalance(data.balance.toFixed(2));
        setAssestsCount(data.assets?.length || 0);
    };


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
                    {/* <TopCards balance={balance} assestsCount={assestsCount} /> */}
                    <TopCards balance={balance} assestsCount={assestsCount} portfolio={portfolio} />
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