import { useEffect, useState } from "react";
import Watchlist from "./Watchlist";
import { useNavigate, Link, useLocation } from "react-router-dom";

// Premium SVG Icons matching landing page theme
const IconTrendingUp = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" /><polyline points="17 6 23 6 23 12" />
  </svg>
);

const IconDashboard = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="7" height="9" /><rect x="14" y="3" width="7" height="5" /><rect x="14" y="12" width="7" height="9" /><rect x="3" y="16" width="7" height="5" />
  </svg>
);

const IconTrade = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
  </svg>
);

const IconHistory = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
  </svg>
);

const IconLogout = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" /><polyline points="16 17 21 12 16 7" /><line x1="21" y1="12" x2="9" y2="12" />
  </svg>
);

export default function Sidebar({ prices }) {
  const navigate = useNavigate();
  const location = useLocation();
  const username = localStorage.getItem("username") || "Trader";
  const [internalPrices, setInternalPrices] = useState({});

  useEffect(() => {
    if (prices && Object.keys(prices).length > 0) return;

    // 1. Instant REST fetch for initial prices on page load
    const fetchPricesREST = async () => {
      try {
        const apiUrl = (import.meta.env.VITE_API_URL || "http://localhost:5100").replace(/\/$/, "");
        const res = await fetch(`${apiUrl}/market/prices`);
        if (res.ok) setInternalPrices(await res.json());
      } catch (err) {
        console.log("Sidebar REST price fetch error:", err.message);
      }
    };
    fetchPricesREST();

    // 2. Real-time WebSocket price stream
    const wsUrl = import.meta.env.VITE_WS_URL || "ws://localhost:5103";
    const socket = new WebSocket(wsUrl);

    socket.onmessage = (event) => {
      try {
        setInternalPrices(JSON.parse(event.data));
      } catch (err) {
        console.error("Sidebar socket error:", err);
      }
    };
    return () => socket.close();
  }, [prices]);

  const activePrices = (prices && Object.keys(prices).length > 0) ? prices : internalPrices;

  // Navigation config with path, label, and icon
  const menuItems = [
    { path: "/dashboard", label: "Dashboard", Icon: IconDashboard },
    { path: "/trade", label: "Trade", Icon: IconTrade },
    { path: "/history", label: "Trading History", Icon: IconHistory },
  ];

  return (
    <div
      className="fixed left-0 top-0 w-64 h-screen p-6 flex flex-col justify-between z-40 border-r border-white/5"
      style={{
        background: "rgba(10, 10, 15, 0.85)",
        backdropFilter: "blur(20px)",
        fontFamily: "'DM Sans', 'Segoe UI', sans-serif"
      }}
    >
      {/* TOP SECTION */}
      <div className="flex flex-col gap-6 overflow-y-auto no-scrollbar pb-4">
        {/* Brand/Logo */}
        <Link to="/" className="flex items-center gap-3 py-2">
          <div style={{
            width: 36,
            height: 36,
            borderRadius: 12,
            background: "linear-gradient(135deg, #4f46e5, #7c3aed)",
            display: "flex",
            alignItems: "center",
            justify: "center",
            alignContent: "center",
            justifyContent: "center"
          }}>
            <IconTrendingUp />
          </div>
          <span className="text-xl font-bold tracking-tight text-white">
            CryptoArena
          </span>
        </Link>

        {/* Navigation menu items */}
        <div className="space-y-1">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;
            const ItemIcon = item.Icon;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 font-medium text-sm border ${isActive
                  ? "bg-gradient-to-r from-indigo-500/20 to-purple-500/10 border-indigo-500/30 text-white shadow-[0_0_15px_rgba(99,102,241,0.15)]"
                  : "border-transparent text-gray-400 hover:bg-white/5 hover:text-white"
                  }`}
              >
                <ItemIcon />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </div>

        {/* Watchlist Section */}
        <Watchlist
          prices={activePrices}
          onSelect={(coin) => {
            localStorage.setItem("selectedCoin", coin);
            navigate("/trade");
          }}
        />
      </div>

      {/* BOTTOM SECTION - Profile & Logout */}
      <div className="flex flex-col gap-4 pt-4 border-t border-white/5">
        {/* User Profile Card */}
        <div className="flex items-center gap-3 px-2 py-1">
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold text-sm shadow-md">
            {username.charAt(0).toUpperCase()}
          </div>
          <div className="flex flex-col">
            <span className="text-xs text-gray-500 font-medium">Logged in as</span>
            <span className="text-sm font-semibold text-white truncate max-w-[140px]">
              {username}
            </span>
          </div>
        </div>

        {/* Logout Button */}
        <button
          onClick={() => {
            localStorage.removeItem("token");
            localStorage.removeItem("username");
            window.location.href = "/";
          }}
          className="w-full flex items-center justify-center gap-2 border border-red-500/30 bg-red-500/5 hover:bg-red-500/20 active:scale-[0.98] py-2.5 rounded-xl text-red-400 hover:text-red-300 font-semibold text-sm transition-all duration-300"
        >
          <IconLogout />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
}