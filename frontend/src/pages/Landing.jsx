// import { motion } from "framer-motion";
// import { useNavigate } from "react-router-dom";
// import { useState } from "react";

// export default function Landing() {
//     const navigate = useNavigate();
//     const [showMenu, setShowMenu] = useState(false);

//     const token = localStorage.getItem("token");
//     const username = localStorage.getItem("username");

//     return (
//         <div className="bg-black text-white min-h-screen">

//             {/* Navbar */}
//             <div className="flex justify-between items-center p-6 relative">

//                 {/* LEFT */}
//                 <h1 className="text-xl font-bold">CryptoArena</h1>

//                 {/* CENTER */}
//                 {token && (
//                     <div className="absolute left-1/2 transform -translate-x-1/2">
//                         <button
//                             onClick={() => navigate("/dashboard")}
//                             className="bg-green-500 px-6 py-3 rounded-xl"
//                         >
//                             Dashboard
//                         </button>
//                     </div>
//                 )}

//                 {/* RIGHT */}
//                 {!token ? (
//                     <div className="flex space-x-4">
//                         <button
//                             onClick={() => navigate("/login")}
//                             className="bg-green-500 px-6 py-3 rounded-xl text-lg"
//                         >
//                             Login
//                         </button>

//                         <button
//                             onClick={() => navigate("/signup")}
//                             className="bg-green-500 px-6 py-3 rounded-xl text-lg"
//                         >
//                             Signup
//                         </button>
//                     </div>
//                 ) : (
//                     <div className="relative">
//                         <button
//                             onClick={() => setShowMenu(!showMenu)}
//                             className="flex items-center gap-4 bg-gray-900/80 border border-gray-700 hover:border-green-500 px-5 py-3 rounded-2xl transition-all duration-300 shadow-lg"
//                         >
//                             {/* Profile Circle */}
//                             <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center text-black font-bold">
//                                 {username?.charAt(0).toUpperCase()}
//                             </div>

//                             {/* Username */}
//                             <span className="text-lg font-medium text-white">
//                                 Hey, {username}
//                             </span>

//                             {/* Arrow */}
//                             <span
//                                 className={`text-sm transition-transform duration-300 ${showMenu ? "rotate-180" : ""
//                                     }`}
//                             >
//                                 ▼
//                             </span>
//                         </button>

//                         {showMenu && (
//                             <div className="absolute right-0 mt-3 w-48 bg-gray-900 border border-gray-700 rounded-2xl shadow-2xl overflow-hidden">

//                                 <button
//                                     onClick={() => navigate("/dashboard")}
//                                     className="w-full text-left px-5 py-4 hover:bg-gray-800 transition"
//                                 >
//                                     Dashboard
//                                 </button>

//                                 <button
//                                     onClick={() => {
//                                         localStorage.removeItem("token");
//                                         localStorage.removeItem("username");
//                                         window.location.reload();
//                                     }}
//                                     className="w-full text-left px-5 py-4 text-red-400 hover:bg-red-500 hover:text-white transition"
//                                 >
//                                     Logout
//                                 </button>
//                             </div>
//                         )}
//                     </div>
//                 )}
//             </div>


//             {/* Hero Section */}
//             <div className="text-center mt-20">
//                 <motion.h1
//                     initial={{ opacity: 0, y: -50 }}
//                     animate={{ opacity: 1, y: 0, transition: { duration: 1.5 } }}
//                     className="text-5xl font-bold"
//                 >
//                     Trade Crypto Without Risk 🚀
//                 </motion.h1>

//                 <p className="mt-4 text-gray-400">
//                     Real-time trading simulator with live prices
//                 </p>

//                 <button
//                     //onClick={() => navigate("/dashboard")}
//                     onClick={() => navigate("/dashboard")}
//                     className="mt-6 bg-green-500 px-6 py-3 rounded-xl text-lg"
//                 >
//                     Start Trading
//                 </button>
//             </div>

//             {/* Features */}
//             <div className="grid grid-cols-3 gap-6 p-10 mt-20">
//                 <Feature title="Live Prices" />
//                 <Feature title="Instant Trades" />
//                 <Feature title="Real-time Profit" />
//             </div>

//         </div>
//     );
// }

// function Feature({ title }) {
//     return (
//         <div className="bg-gray-900 p-6 rounded-xl text-center">
//             <h2 className="text-xl font-semibold">{title}</h2>
//         </div>
//     );
// }










import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

// ─── Ticker Data (Commented out, now using live websocket pricing) ───────────
// const TICKER_COINS = [
//   { symbol: "BTC", price: "$64,234.50", change: "+2.34%", up: true },
//   { symbol: "ETH", price: "$3,456.78", change: "+1.89%", up: true },
//   { symbol: "SOL", price: "$142.67", change: "+5.23%", up: true },
//   { symbol: "BNB", price: "$589.23", change: "-0.45%", up: false },
//   { symbol: "XRP", price: "$0.5234", change: "+3.12%", up: true },
//   { symbol: "ADA", price: "$0.4567", change: "-1.23%", up: false },
//   { symbol: "DOGE", price: "$0.1234", change: "+4.56%", up: true },
//   { symbol: "MATIC", price: "$0.8934", change: "+2.67%", up: true },
// ];

// ─── Inline SVG Icons (no lucide-react needed) ────────────────────────────────
const IconTrendingUp = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" /><polyline points="17 6 23 6 23 12" />
  </svg>
);
const IconTrendingUpSm = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" /><polyline points="17 6 23 6 23 12" />
  </svg>
);
const IconBarChart = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="20" x2="18" y2="10" /><line x1="12" y1="20" x2="12" y2="4" /><line x1="6" y1="20" x2="6" y2="14" />
  </svg>
);
const IconShield = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
  </svg>
);
const IconZap = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
  </svg>
);
const IconBell = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" /><path d="M13.73 21a2 2 0 0 1-3.46 0" />
  </svg>
);
const IconLineChart = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
  </svg>
);
const IconUsers = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" />
    <path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);
const IconUserPlus = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="8.5" cy="7" r="4" />
    <line x1="20" y1="8" x2="20" y2="14" /><line x1="23" y1="11" x2="17" y2="11" />
  </svg>
);
const IconWallet = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 12V8H6a2 2 0 0 1-2-2c0-1.1.9-2 2-2h12v4" /><path d="M4 6v12c0 1.1.9 2 2 2h14v-4" />
    <circle cx="18" cy="12" r="1" fill="white" />
  </svg>
);
const IconStepChart = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="20" x2="18" y2="10" /><line x1="12" y1="20" x2="12" y2="4" /><line x1="6" y1="20" x2="6" y2="14" />
  </svg>
);
const IconTrophy = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="8 17 4 17 4 6 20 6 20 17 16 17" /><path d="M12 17v4" /><line x1="8" y1="21" x2="16" y2="21" />
    <path d="M4 10a2 2 0 0 1-2-2V6h2" />
    <path d="M20 10a2 2 0 0 0 2-2V6h-2" />
  </svg>
);
const IconArrowRight = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
  </svg>
);
const IconCheck = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);
const IconSparkle = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z" />
  </svg>
);

// ─── Features data ─────────────────────────────────────────────────────────────
const FEATURES = [
  { Icon: IconBarChart, gradient: "linear-gradient(135deg,#3b82f6,#06b6d4)", title: "Real-Time Market Data", desc: "Access live cryptocurrency prices and charts from major exchanges. Trade with real market conditions." },
  { Icon: IconShield, gradient: "linear-gradient(135deg,#a855f7,#ec4899)", title: "100% Risk-Free", desc: "Practice with virtual money. Make mistakes, learn strategies, and build confidence without losing real capital." },
  { Icon: IconZap, gradient: "linear-gradient(135deg,#f97316,#ef4444)", title: "Instant Execution", desc: "Lightning-fast order execution that mirrors real trading platforms. Experience realistic trading conditions." },
  { Icon: IconBell, gradient: "linear-gradient(135deg,#10b981,#14b8a6)", title: "Smart Alerts", desc: "Set custom price alerts and get notified when your target prices are hit. Never miss an opportunity." },
  { Icon: IconLineChart, gradient: "linear-gradient(135deg,#6366f1,#2563eb)", title: "Advanced Analytics", desc: "Track your performance with detailed analytics. Understand your strengths and areas for improvement." },
  { Icon: IconUsers, gradient: "linear-gradient(135deg,#eab308,#f97316)", title: "Community Leaderboard", desc: "Compete with other traders on our global leaderboard. Learn from top performers and share strategies." },
];

const STEPS = [
  { Icon: IconUserPlus, label: "Create Your Account", desc: "Sign up in seconds with just your email. No credit card required." },
  { Icon: IconWallet, label: "Get Virtual Funds", desc: "Start with $100,000 in virtual cash to practice trading." },
  { Icon: IconStepChart, label: "Start Trading", desc: "Buy and sell cryptocurrencies with real-time market data." },
  { Icon: IconTrophy, label: "Track Your Progress", desc: "Analyze your performance and refine your strategies." },
];

// ─── Ticker (Commented out, replaced with live Ticker version below) ─────────
// function Ticker() {
//   const repeated = [...TICKER_COINS, ...TICKER_COINS, ...TICKER_COINS];
//   return (
//     <div className="overflow-hidden border-b border-white/5 bg-black/40 py-2" style={{ backdropFilter: "blur(8px)" }}>
//       <motion.div
//         className="flex gap-10 whitespace-nowrap"
//         animate={{ x: ["0%", "-33.33%"] }}
//         transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
//       >
//         {repeated.map((coin, i) => (
//           <span key={i} className="flex items-center gap-2 text-sm font-mono">
//             <span style={{ color: "rgba(255,255,255,0.5)" }}>{coin.symbol}</span>
//             <span className="text-white font-semibold">{coin.price}</span>
//             <span style={{ color: coin.up ? "#34d399" : "#f87171", fontSize: 12, fontWeight: 700 }}>
//               {coin.up ? "▲" : "▼"} {coin.change}
//             </span>
//           </span>
//         ))}
//       </motion.div>
//     </div>
//   );
// }

// ─── NEW LIVE WS TICKER FOR LANDING PAGE ───────────────────────────────────────
// Establish connection to live WebSocket server and display real-time asset pricing
// ─── Ticker Prop Consuming Version (Commented out, replaced with version below) ───
// function Ticker() {
//   const [prices, setPrices] = useState({});
// 
//   useEffect(() => {
//     const socket = new WebSocket("ws://localhost:5102");
//     socket.onmessage = (event) => {
//       try {
//         setPrices(JSON.parse(event.data));
//       } catch (err) {
//         console.error("Error parsing socket data in landing page Ticker:", err);
//       }
//     };
//     return () => socket.close();
//   }, []);
// 
//   // Consistent 24h market price changes matching Ticker.jsx
//   const percentageData = {
//     BTC: { val: "+2.45%", up: true },
//     ETH: { val: "-1.12%", up: false },
//     DOGE: { val: "+5.31%", up: true },
//     SOL: { val: "+3.87%", up: true },
//     BNB: { val: "-0.74%", up: false },
//     LTC: { val: "+1.24%", up: true },
//     XRP: { val: "-2.11%", up: false },
//   };
// 
//   // Safe pricing fallback dictionary so the ticker always scrolls on mount
//   const fallbackPrices = {
//     BTC: 63567.00,
//     ETH: 1684.43,
//     DOGE: 0.09,
//     SOL: 67.01,
//     BNB: 605.34,
//     LTC: 42.22,
//     XRP: 1.15
//   };
// 
//   const activePrices = Object.keys(prices).length > 0 ? prices : fallbackPrices;
//   const entries = Object.entries(activePrices);
// 
//   // Duplicate 4 times to ensure seamless looping without empty space gaps
//   const repeated = [...entries, ...entries, ...entries, ...entries];
// 
//   return (
//     <div className="overflow-hidden border-b border-white/5 bg-black/40 py-2" style={{ backdropFilter: "blur(8px)" }}>
//       <motion.div
//         className="flex gap-10 whitespace-nowrap"
//         animate={{ x: ["0%", "-50%"] }}
//         transition={{ duration: 32, repeat: Infinity, ease: "linear" }}
//       >
//         {repeated.map(([coin, price], i) => {
//           const changeInfo = percentageData[coin] || { val: "+0.00%", up: true };
//           return (
//             <span key={i} className="flex items-center gap-2 text-sm font-mono">
//               <span style={{ color: "rgba(255,255,255,0.5)" }}>{coin}</span>
//               <span className="text-white font-semibold">${price.toFixed(price < 1 ? 4 : 2)}</span>
//               <span style={{ color: changeInfo.up ? "#34d399" : "#f87171", fontSize: 12, fontWeight: 700 }}>
//                 {changeInfo.up ? "▲" : "▼"} {changeInfo.val}
//               </span>
//             </span>
//           );
//         })}
//       </motion.div>
//     </div>
//   );
// }

// ─── NEW LIVE TICKER PROP-CONSUMING VERSION ──────────────────────────────────
// Receives the live pricing dictionary state directly from parent Landing component
function Ticker({ prices }) {
  // Consistent 24h market price changes matching Ticker.jsx
  const percentageData = {
    BTC: { val: "+2.45%", up: true },
    ETH: { val: "-1.12%", up: false },
    DOGE: { val: "+5.31%", up: true },
    SOL: { val: "+3.87%", up: true },
    BNB: { val: "-0.74%", up: false },
    LTC: { val: "+1.24%", up: true },
    XRP: { val: "-2.11%", up: false },
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

  const activePrices = Object.keys(prices).length > 0 ? prices : fallbackPrices;
  const entries = Object.entries(activePrices);

  // Duplicate 4 times to ensure seamless looping without empty space gaps
  const repeated = [...entries, ...entries, ...entries, ...entries];

  return (
    <div className="overflow-hidden border-b border-white/5 bg-black/40 py-2" style={{ backdropFilter: "blur(8px)", position: "relative", zIndex: 1 }}>
      <motion.div
        className="flex gap-10 whitespace-nowrap"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 32, repeat: Infinity, ease: "linear" }}
      >
        {repeated.map(([coin, price], i) => {
          const changeInfo = percentageData[coin] || { val: "+0.00%", up: true };
          return (
            <span key={i} className="flex items-center gap-2 text-sm font-mono">
              <span style={{ color: "rgba(255,255,255,0.5)" }}>{coin}</span>
              <span className="text-white font-semibold">${price.toFixed(price < 1 ? 4 : 2)}</span>
              <span style={{ color: changeInfo.up ? "#34d399" : "#f87171", fontSize: 12, fontWeight: 700 }}>
                {changeInfo.up ? "▲" : "▼"} {changeInfo.val}
              </span>
            </span>
          );
        })}
      </motion.div>
    </div>
  );
}

// ─── Coins ─────────────────────────────────────────────────────────────────────
function BitcoinCoin({ size = 220, delay = 0 }) {
  return (
    <motion.div
      animate={{ y: [0, -18, 0] }}
      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay }}
      style={{ width: size, height: size, flexShrink: 0 }}
    >
      <div style={{
        width: size, height: size, borderRadius: "50%",
        background: "linear-gradient(135deg,#f7a330 0%,#e8650a 60%,#f7a330 100%)",
        boxShadow: "0 0 60px rgba(247,163,48,0.5),inset 0 4px 12px rgba(255,255,255,0.2),inset 0 -4px 12px rgba(0,0,0,0.3)",
        display: "flex", alignItems: "center", justifyContent: "center",
      }}>
        <span style={{ fontSize: size * 0.42, color: "rgba(255,255,255,0.95)", fontWeight: 900, lineHeight: 1, userSelect: "none" }}>₿</span>
      </div>
    </motion.div>
  );
}

function EthCoin({ size = 100, delay = 0 }) {
  return (
    <motion.div
      animate={{ y: [0, -12, 0] }}
      transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay }}
      style={{
        width: size, height: size, borderRadius: "50%", flexShrink: 0,
        background: "linear-gradient(135deg,#627eea 0%,#3b5ee8 100%)",
        boxShadow: "0 0 40px rgba(98,126,234,0.6),inset 0 2px 8px rgba(255,255,255,0.2)",
        display: "flex", alignItems: "center", justifyContent: "center",
      }}
    >
      <span style={{ fontSize: size * 0.42, color: "white", fontWeight: 700 }}>Ξ</span>
    </motion.div>
  );
}

// ─── Main ──────────────────────────────────────────────────────────────────────
export default function Landing() {
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);
  const token = localStorage.getItem("token");
  const username = localStorage.getItem("username");

  // Lifted prices state for landing page illustration and ticker sync
  const [prices, setPrices] = useState({});

  useEffect(() => {
    // const socket = new WebSocket("ws://localhost:5102");
    const wsUrl = import.meta.env.VITE_WS_URL || "ws://localhost:5102";
    const socket = new WebSocket(wsUrl);
    socket.onmessage = (event) => {
      try {
        setPrices(JSON.parse(event.data));
      } catch (err) {
        console.error("Error parsing socket data in landing page main state:", err);
      }
    };
    return () => socket.close();
  }, []);

  return (
    <div style={{ background: "#0a0a0f", fontFamily: "'DM Sans','Segoe UI',sans-serif", color: "white", minHeight: "100vh" }}>

      {/* Background orbs */}
      <div style={{ position: "fixed", inset: 0, pointerEvents: "none", overflow: "hidden", zIndex: 0 }}>
        <div style={{ position: "absolute", width: 600, height: 600, top: -100, left: -200, borderRadius: "50%", background: "radial-gradient(circle,#4f46e5,transparent 70%)", filter: "blur(80px)", opacity: 0.2 }} />
        <div style={{ position: "absolute", width: 500, height: 500, top: 200, right: -150, borderRadius: "50%", background: "radial-gradient(circle,#7c3aed,transparent 70%)", filter: "blur(80px)", opacity: 0.15 }} />
        <div style={{ position: "absolute", width: 400, height: 400, bottom: 300, left: "30%", borderRadius: "50%", background: "radial-gradient(circle,#2563eb,transparent 70%)", filter: "blur(80px)", opacity: 0.1 }} />
      </div>

      {/* ── Navbar ── */}
      <div style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 50 }}>
        <nav style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "16px 24px", borderBottom: "1px solid rgba(255,255,255,0.05)", backdropFilter: "blur(20px)", background: "rgba(10,10,15,0.85)", position: "relative", zIndex: 10 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{ width: 36, height: 36, borderRadius: 12, background: "linear-gradient(135deg,#4f46e5,#7c3aed)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <IconTrendingUp />
            </div>
            <span style={{ fontSize: 18, fontWeight: 700, letterSpacing: "-0.02em" }}>CryptoArena</span>
          </div>

          <div style={{ display: "flex", gap: 32, fontSize: 14, color: "rgba(255,255,255,0.45)" }} className="hidden md:flex">
            {[
              { label: "Features", id: "features" },
              { label: "How it Works", id: "how-it-works" },
              { label: "About Us", id: null },
              ...(token ? [{ label: "Dashboard", id: "__dashboard__" }] : []),
            ].map(({ label, id }) => (
              <span
                key={label}
                style={{ cursor: "pointer", transition: "color 0.2s", color: "rgba(255,255,255,0.45)" }}
//                 onClick={() => {
//                   if (id === "__dashboard__") { navigate("/dashboard"); return; }
//                   if (id) document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
//                 }}
                onClick={() => {
                  if (id === "__dashboard__") { navigate("/dashboard"); return; }
                  if (label === "About Us") { navigate("/about"); return; }
                  if (id) document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
                }}
                onMouseEnter={e => e.currentTarget.style.color = "#fff"}
                onMouseLeave={e => e.currentTarget.style.color = "rgba(255,255,255,0.45)"}
              >{label}</span>
            ))}
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 12, position: "relative" }}>
            {!token ? (
              <>
                <button onClick={() => navigate("/login")} style={{ background: "none", border: "none", color: "rgba(255,255,255,0.6)", fontSize: 14, cursor: "pointer", padding: "8px 16px" }}>
                  Log In
                </button>
                <button onClick={() => navigate("/signup")} style={{ background: "linear-gradient(135deg,#4f46e5,#7c3aed)", border: "none", color: "white", fontSize: 14, fontWeight: 600, padding: "8px 20px", borderRadius: 12, cursor: "pointer" }}>
                  Sign Up
                </button>
              </>
            ) : (
              <div style={{ position: "relative" }}>
                <button
                  onClick={() => setShowMenu(!showMenu)}
                  style={{ display: "flex", alignItems: "center", gap: 12, background: "rgba(17,17,30,0.85)", border: "1px solid rgba(255,255,255,0.1)", padding: "8px 16px 8px 8px", borderRadius: 16, cursor: "pointer", transition: "border-color 0.2s" }}
                  onMouseEnter={e => e.currentTarget.style.borderColor = "#4f46e5"}
                  onMouseLeave={e => e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)"}
                >
                  {/* Avatar */}
                  <div style={{ width: 36, height: 36, borderRadius: "50%", background: "linear-gradient(135deg,#4f46e5,#7c3aed)", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: 16, color: "white" }}>
                    {username?.charAt(0).toUpperCase()}
                  </div>
                  <span style={{ color: "white", fontSize: 14, fontWeight: 500 }}>Hey, {username}</span>
                  <span style={{ color: "rgba(255,255,255,0.45)", fontSize: 11, display: "inline-block", transition: "transform 0.2s", transform: showMenu ? "rotate(180deg)" : "rotate(0deg)" }}>▼</span>
                </button>

                {showMenu && (
                  <div style={{ position: "absolute", right: 0, top: "calc(100% + 8px)", width: 180, backgroundColor: "#0d0d1a", border: "1px solid #333", borderRadius: 16, boxShadow: "0 20px 60px #000", zIndex: 999, padding: "6px", isolation: "isolate" }}>
                    <button
                      onClick={() => { setShowMenu(false); navigate("/dashboard"); }}
                      style={{ width: "100%", textAlign: "left", padding: "12px 16px", backgroundColor: "#0d0d1a", border: "none", color: "#fff", fontSize: 15, fontWeight: 600, cursor: "pointer", borderRadius: 10, display: "block", letterSpacing: 0.2 }}
                      onMouseEnter={e => e.currentTarget.style.backgroundColor = "#22224a"}
                      onMouseLeave={e => e.currentTarget.style.backgroundColor = "#0d0d1a"}
                    >
                      Dashboard
                    </button>
                    <button
                      onClick={() => { localStorage.removeItem("token"); localStorage.removeItem("username"); window.location.reload(); }}
                      style={{ width: "100%", textAlign: "left", padding: "12px 16px", backgroundColor: "#0d0d1a", border: "none", color: "#f87171", fontSize: 15, fontWeight: 600, cursor: "pointer", borderRadius: 10, display: "block", letterSpacing: 0.2 }}
                      onMouseEnter={e => { e.currentTarget.style.backgroundColor = "#ef4444"; e.currentTarget.style.color = "#fff"; }}
                      onMouseLeave={e => { e.currentTarget.style.backgroundColor = "#0d0d1a"; e.currentTarget.style.color = "#f87171"; }}
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </nav>
        <Ticker prices={prices} />
      </div>

      {/* Spacer */}
      <div style={{ height: 112 }} />

      {/* ── Hero ── */}
      <section style={{ position: "relative", zIndex: 1, padding: "64px 24px", maxWidth: 1280, margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48, alignItems: "center" }} className="hero-grid">
          {/* Left */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
              style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "8px 16px", borderRadius: 999, fontSize: 14, marginBottom: 24, background: "rgba(79,70,229,0.15)", border: "1px solid rgba(79,70,229,0.4)", color: "#818cf8" }}
            >
              <IconSparkle /> Practice Trading Without Risk
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1 }}
              style={{ fontSize: "clamp(2.5rem,5vw,3.75rem)", fontWeight: 900, lineHeight: 1.1, letterSpacing: "-0.03em", marginBottom: 24 }}
            >
              Master Crypto<br />Trading{" "}
              <span style={{ background: "linear-gradient(90deg,#818cf8,#c084fc)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>With Virtual</span>
              <br />Money
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.2 }}
              style={{ color: "rgba(255,255,255,0.45)", fontSize: 18, lineHeight: 1.7, marginBottom: 32, maxWidth: 480 }}
            >
              Learn, practice, and perfect your trading strategies in a risk-free environment. Real-time market data, zero financial risk.
            </motion.p>

            {/* <motion.div */}
            {/*   initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }} */}
            {/*   style={{ display: "flex", flexWrap: "wrap", gap: 16, marginBottom: 32 }} */}
            {/* > */}
            <motion.div
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }}
              style={{ display: "flex", flexWrap: "wrap", gap: 16, marginBottom: 16 }}
            >
              <button
                onClick={() => navigate("/dashboard")}
                style={{ display: "flex", alignItems: "center", gap: 8, background: "linear-gradient(135deg,#4f46e5,#7c3aed)", border: "none", color: "white", fontSize: 16, fontWeight: 700, padding: "14px 28px", borderRadius: 14, cursor: "pointer" }}
              >
                Start Trading Free <IconArrowRight />
              </button>
            </motion.div>

            {/* Quick Demo Credentials Box */}
            <motion.div
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.35 }}
              style={{ padding: "12px 18px", borderRadius: 16, border: "1px solid rgba(129,140,248,0.15)", background: "rgba(129,140,248,0.05)", display: "inline-block", marginBottom: 32, backdropFilter: "blur(8px)" }}
            >
              <p style={{ margin: 0, fontSize: 13, color: "rgba(255,255,255,0.7)", fontWeight: 500 }} className="flex items-center gap-2">
                <span style={{ color: "#34d399" }}>⚡</span> <strong>Quick Demo Access:</strong>
              </p>
              <div style={{ marginTop: 6, display: "flex", gap: 16, fontSize: 12, color: "rgba(255,255,255,0.5)", fontFamily: "monospace" }}>
                <span>Email: <strong style={{ color: "#fff" }}>jack01@gmail.com</strong></span>
                <span>Pass: <strong style={{ color: "#fff" }}>123456</strong></span>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
              style={{ display: "flex", flexWrap: "wrap", gap: 24, fontSize: 14, color: "rgba(255,255,255,0.45)" }}
            >
              {[{ color: "#10b981", label: "Real-time Data" }, { color: "#818cf8", label: "$100,000 Virtual Cash" }, { color: "#c084fc", label: "No Credit Card Required" }].map(({ color, label }) => (
                <span key={label} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <span style={{ width: 6, height: 6, borderRadius: "50%", background: color, display: "inline-block" }} />
                  {label}
                </span>
              ))}
            </motion.div>
          </div>

          {/* Right — coins */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, delay: 0.2 }}
            style={{ position: "relative", height: 420, display: "flex", alignItems: "center", justifyContent: "center" }}
            className="hero-right"
          >
            <div style={{ position: "absolute", width: 360, height: 360, borderRadius: "50%", background: "radial-gradient(circle,#f7a330,#7c3aed 60%,transparent)", filter: "blur(80px)", opacity: 0.35 }} />
            <div style={{ position: "relative", zIndex: 10 }}><BitcoinCoin size={220} delay={0} /></div>
            <div style={{ position: "absolute", top: 16, right: 32, zIndex: 20 }}><BitcoinCoin size={90} delay={0.8} /></div>
            <div style={{ position: "absolute", bottom: 48, left: 40, zIndex: 20 }}><EthCoin size={80} delay={0.4} /></div>
            {/* Original Static BTC price card (Commented out) */}
            {/* <motion.div */}
            {/*   animate={{ y: [0, -8, 0] }} transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1 }} */}
            {/*   style={{ position: "absolute", bottom: 32, right: 16, zIndex: 30, padding: "8px 16px", borderRadius: 12, background: "rgba(30,30,60,0.9)", border: "1px solid rgba(129,140,248,0.3)", backdropFilter: "blur(10px)" }} */}
            {/* > */}
            {/*   <span style={{ color: "rgba(255,255,255,0.45)", fontSize: 11, display: "block" }}>BTC/USD</span> */}
            {/*   <span style={{ color: "white", fontWeight: 700, fontSize: 15 }}>$64,234</span> */}
            {/* </motion.div> */}
            {/* <motion.div */}
            {/*   animate={{ y: [0, -10, 0] }} transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }} */}
            {/*   style={{ position: "absolute", top: 56, left: 24, zIndex: 30, padding: "6px 12px", borderRadius: 10, background: "rgba(16,185,129,0.15)", border: "1px solid rgba(16,185,129,0.3)", color: "#34d399", fontWeight: 700, fontSize: 14 }} */}
            {/* > */}
            {/*   +15.3% ▲ */}
            {/* </motion.div> */}

            {/* Dynamic BTC price card with live websocket pricing */}
            <motion.div
              animate={{ y: [0, -8, 0] }} transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              style={{ position: "absolute", bottom: 32, right: 16, zIndex: 30, padding: "8px 16px", borderRadius: 12, background: "rgba(30,30,60,0.9)", border: "1px solid rgba(129,140,248,0.3)", backdropFilter: "blur(10px)" }}
            >
              <span style={{ color: "rgba(255,255,255,0.45)", fontSize: 11, display: "block" }}>BTC/USD</span>
              <span style={{ color: "white", fontWeight: 700, fontSize: 15 }} className="font-mono">
                ${prices.BTC ? prices.BTC.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : "63,567.00"}
              </span>
            </motion.div>
            <motion.div
              animate={{ y: [0, -10, 0] }} transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
              style={{ position: "absolute", top: 56, left: 24, zIndex: 30, padding: "6px 12px", borderRadius: 10, background: "rgba(16,185,129,0.15)", border: "1px solid rgba(16,185,129,0.3)", color: "#34d399", fontWeight: 700, fontSize: 14 }}
            >
              {prices.BTC ? "+2.45% ▲" : "+15.3% ▲"}
            </motion.div>
            <motion.svg
              style={{ position: "absolute", bottom: 80, right: 8, zIndex: 20 }}
              width="70" height="60" viewBox="0 0 70 60"
            >
              <motion.path
                d="M5 55 Q20 40 35 25 Q50 10 65 5"
                stroke="url(#ag)" strokeWidth="3" fill="none" strokeLinecap="round"
                initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 2, delay: 1 }}
              />
              <defs>
                <linearGradient id="ag" x1="0%" y1="100%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#4f46e5" /><stop offset="100%" stopColor="#10b981" />
                </linearGradient>
              </defs>
            </motion.svg>
          </motion.div>
        </div>
      </section>

      {/* ── Stats ── */}
      <section style={{ position: "relative", zIndex: 1, borderTop: "1px solid rgba(255,255,255,0.05)", borderBottom: "1px solid rgba(255,255,255,0.05)", padding: "56px 24px", background: "rgba(255,255,255,0.02)" }}>
        <div style={{ maxWidth: 1000, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 32, textAlign: "center" }}>
          {[{ value: "50K+", label: "Active Traders" }, { value: "$2.5B", label: "Virtual Volume Traded" }, { value: "200+", label: "Crypto Assets" }, { value: "99.9%", label: "Uptime" }].map(({ value, label }, i) => (
            <motion.div key={label} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
              <div style={{ fontSize: "clamp(2rem,4vw,3rem)", fontWeight: 900, background: "linear-gradient(90deg,#818cf8,#c084fc)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", marginBottom: 4 }}>{value}</div>
              <div style={{ color: "rgba(255,255,255,0.35)", fontSize: 14 }}>{label}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── Features ── */}
      <section id="features" style={{ position: "relative", zIndex: 1, padding: "96px 24px", maxWidth: 1280, margin: "0 auto" }}>
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} style={{ textAlign: "center", marginBottom: 56 }}>
          <h2 style={{ fontSize: "clamp(2rem,4vw,3rem)", fontWeight: 900, marginBottom: 16 }}>Everything You Need to Succeed</h2>
          <p style={{ color: "rgba(255,255,255,0.35)", fontSize: 18 }}>Professional-grade tools and features to help you become a better trader</p>
        </motion.div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))", gap: 20 }}>
          {FEATURES.map(({ Icon, gradient, title, desc }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
              whileHover={{ scale: 1.02, y: -4 }}
              style={{ padding: 24, borderRadius: 20, border: "1px solid rgba(255,255,255,0.06)", background: "rgba(255,255,255,0.03)", cursor: "default" }}
            >
              <div style={{ width: 48, height: 48, borderRadius: 16, background: gradient, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 20 }}>
                <Icon />
              </div>
              <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 8 }}>{title}</h3>
              <p style={{ color: "rgba(255,255,255,0.38)", fontSize: 14, lineHeight: 1.7 }}>{desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── How It Works ── */}
      <section id="how-it-works" style={{ position: "relative", zIndex: 1, padding: "96px 24px", maxWidth: 1152, margin: "0 auto" }}>
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} style={{ textAlign: "center", marginBottom: 64 }}>
          <h2 style={{ fontSize: "clamp(2rem,4vw,3rem)", fontWeight: 900, marginBottom: 16 }}>Start Trading in 4 Simple Steps</h2>
          <p style={{ color: "rgba(255,255,255,0.35)", fontSize: 18 }}>Get started with paper trading in minutes</p>
        </motion.div>
        <div style={{ position: "relative", display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 32 }}>
          <div style={{ position: "absolute", top: 40, left: "12.5%", right: "12.5%", height: 1, background: "linear-gradient(90deg,transparent,#4f46e5,#7c3aed,transparent)" }} />
          {STEPS.map(({ Icon, label, desc }, i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.12 }}
              style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", position: "relative" }}
            >
              <div style={{ position: "relative", marginBottom: 20 }}>
                <div style={{ width: 80, height: 80, borderRadius: "50%", background: "linear-gradient(135deg,#4f46e5,#7c3aed)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <Icon />
                </div>
                <span style={{ position: "absolute", top: -4, right: -4, width: 24, height: 24, borderRadius: "50%", background: "#1a1a2e", border: "2px solid #4f46e5", color: "#818cf8", fontSize: 10, fontWeight: 900, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>
              <h3 style={{ fontWeight: 700, fontSize: 15, marginBottom: 8 }}>{label}</h3>
              <p style={{ color: "rgba(255,255,255,0.38)", fontSize: 13, lineHeight: 1.7 }}>{desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── CTA ── */}
      <section style={{ position: "relative", zIndex: 1, padding: "0 24px 96px", maxWidth: 960, margin: "0 auto" }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          style={{ borderRadius: 28, padding: 64, textAlign: "center", position: "relative", overflow: "hidden", background: "linear-gradient(135deg,rgba(79,70,229,0.2),rgba(124,58,237,0.2))", border: "1px solid rgba(129,140,248,0.2)" }}
        >
          <div style={{ position: "absolute", inset: 0, borderRadius: 28, background: "linear-gradient(135deg,#4f46e5,#7c3aed)", filter: "blur(60px)", opacity: 0.15 }} />
          <div style={{ position: "relative", zIndex: 1 }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "8px 16px", borderRadius: 999, fontSize: 14, marginBottom: 24, background: "rgba(79,70,229,0.2)", border: "1px solid rgba(129,140,248,0.3)", color: "#818cf8" }}>
              <IconSparkle /> Join 50,000+ Traders
            </div>
            <h2 style={{ fontSize: "clamp(2rem,4vw,3rem)", fontWeight: 900, marginBottom: 16, lineHeight: 1.2 }}>Ready to Start Your<br />Trading Journey?</h2>
            <p style={{ color: "rgba(255,255,255,0.45)", fontSize: 18, marginBottom: 32, maxWidth: 520, margin: "0 auto 32px" }}>
              Create your free account today and get $100,000 in virtual funds to practice trading. No credit card required.
            </p>
            <button
              onClick={() => navigate("/signup")}
              style={{ display: "inline-flex", alignItems: "center", gap: 12, background: "linear-gradient(135deg,#4f46e5,#7c3aed)", border: "none", color: "white", fontSize: 18, fontWeight: 700, padding: "16px 40px", borderRadius: 18, cursor: "pointer", marginBottom: 24 }}
            >
              Get Started Free <IconArrowRight />
            </button>
            <div style={{ display: "flex", justifyContent: "center", gap: 32, fontSize: 14, color: "rgba(255,255,255,0.38)" }}>
              {["Free forever", "No credit card", "Cancel anytime"].map(item => (
                <span key={item} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <IconCheck /> {item}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      </section>

      {/* ── Footer ── */}
      <footer style={{ position: "relative", zIndex: 1, borderTop: "1px solid rgba(255,255,255,0.05)", padding: "32px 24px", background: "rgba(255,255,255,0.01)" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: 16 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{ width: 32, height: 32, borderRadius: 10, background: "linear-gradient(135deg,#4f46e5,#7c3aed)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <IconTrendingUpSm />
            </div>
            <span style={{ fontWeight: 700 }}>CryptoArena</span>
          </div>
          <div style={{ display: "flex", gap: 24, fontSize: 14, color: "rgba(255,255,255,0.28)" }}>
            {["Privacy", "Terms", "Support"].map(l => <span key={l} style={{ cursor: "pointer" }}>{l}</span>)}
          </div>
          <p style={{ color: "rgba(255,255,255,0.18)", fontSize: 14 }}>© 2026 CryptoArena. All rights reserved.</p>
        </div>
      </footer>

      <style>{`
        @media (max-width: 768px) {
          .hero-grid { grid-template-columns: 1fr !important; }
          .hero-right { display: none !important; }
        }
      `}</style>
    </div>
  );
}



