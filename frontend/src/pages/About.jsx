import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

// ─── Inline SVG Icons (matching premium landing design) ───────────────────────
const IconArrowLeft = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="19" y1="12" x2="5" y2="12" /><polyline points="12 19 5 12 12 5" />
  </svg>
);
const IconCode = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" />
  </svg>
);
const IconServer = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="8" rx="2" ry="2" />
    <rect x="2" y="14" width="20" height="8" rx="2" ry="2" />
    <line x1="6" y1="6" x2="6.01" y2="6" /><line x1="6" y1="18" x2="6.01" y2="18" />
  </svg>
);
const IconDatabase = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <ellipse cx="12" cy="5" rx="9" ry="3" />
    <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
    <path d="M3 12c0 1.66 4 3 9 3s9-1.34 9-3" />
  </svg>
);
const IconActivity = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
  </svg>
);
const IconTrendingUp = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" /><polyline points="17 6 23 6 23 12" />
  </svg>
);

export default function About() {
  const navigate = useNavigate();

  return (
    <div 
      style={{ 
        background: "#0a0a0f", 
        fontFamily: "'DM Sans','Segoe UI',sans-serif", 
        color: "white", 
        minHeight: "100vh" 
      }}
      className="relative overflow-x-hidden pb-24"
    >
      {/* Background glow orbs matching landing page */}
      <div style={{ position: "fixed", inset: 0, pointerEvents: "none", overflow: "hidden", zIndex: 0 }}>
        <div style={{ position: "absolute", width: 600, height: 600, top: -100, left: -200, borderRadius: "50%", background: "radial-gradient(circle,#4f46e5,transparent 70%)", filter: "blur(80px)", opacity: 0.15 }} />
        <div style={{ position: "absolute", width: 500, height: 500, top: 200, right: -150, borderRadius: "50%", background: "radial-gradient(circle,#7c3aed,transparent 70%)", filter: "blur(80px)", opacity: 0.12 }} />
        <div style={{ position: "absolute", width: 400, height: 400, bottom: 100, left: "30%", borderRadius: "50%", background: "radial-gradient(circle,#2563eb,transparent 70%)", filter: "blur(80px)", opacity: 0.08 }} />
      </div>

      {/* ── Navbar ── */}
      <div style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 50 }}>
        <nav style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "16px 24px", borderBottom: "1px solid rgba(255,255,255,0.05)", backdropFilter: "blur(20px)", background: "rgba(10,10,15,0.85)", position: "relative", zIndex: 10 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, cursor: "pointer" }} onClick={() => navigate("/")}>
            <div style={{ width: 36, height: 36, borderRadius: 12, background: "linear-gradient(135deg,#4f46e5,#7c3aed)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <IconTrendingUp />
            </div>
            <span style={{ fontSize: 18, fontWeight: 700, letterSpacing: "-0.02em" }}>CryptoArena</span>
          </div>

          <button 
            onClick={() => navigate("/")} 
            style={{ 
              display: "flex", 
              alignItems: "center", 
              gap: 8, 
              background: "rgba(255,255,255,0.02)", 
              border: "1px solid rgba(255,255,255,0.08)", 
              color: "rgba(255,255,255,0.8)", 
              fontSize: 14, 
              fontWeight: 600, 
              padding: "10px 18px", 
              borderRadius: 12, 
              cursor: "pointer",
              transition: "all 0.3s"
            }}
            onMouseEnter={e => {
              e.currentTarget.style.background = "rgba(255,255,255,0.06)";
              e.currentTarget.style.borderColor = "rgba(255,255,255,0.2)";
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = "rgba(255,255,255,0.02)";
              e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)";
            }}
          >
            <IconArrowLeft /> Back to Home
          </button>
        </nav>
      </div>

      {/* Spacer */}
      <div style={{ height: 120 }} />

      {/* Main Container */}
      <div className="max-w-[1200px] mx-auto px-6 z-10 relative flex flex-col gap-16">
        
        {/* Section 1: Hero Intro */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-[800px] mx-auto mt-6"
        >
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "8px 16px", borderRadius: 999, fontSize: 13, marginBottom: 20, background: "rgba(79,70,229,0.15)", border: "1px solid rgba(79,70,229,0.4)", color: "#818cf8", fontWeight: 700, letterSpacing: "0.05em", textTransform: "uppercase" }}>
            PROJECT OVERVIEW
          </div>
          <h1 className="text-4xl md:text-5xl font-black tracking-tight text-white mb-6 leading-tight">
            About{" "}
            <span style={{ background: "linear-gradient(90deg,#818cf8,#c084fc)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              CryptoArena
            </span>
          </h1>
          <p className="text-lg text-white/50 leading-relaxed">
            CryptoArena is a free cryptocurrency paper trading simulator. It uses real-time live market prices to let you practice trading without using real money. You can test your buying and selling strategies with zero financial risk.
          </p>
        </motion.div>

        {/* Section 2: Core Platform Capabilities Grid */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="flex flex-col gap-8"
        >
          <h2 className="text-2xl font-black text-white/95 border-l-4 border-indigo-500 pl-4 tracking-tight">
            Key Simulator Features
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Feature 1: Real-Time WebSockets */}
            <div className="bg-white/[0.02] border border-white/5 p-6 rounded-3xl backdrop-blur-xl hover:border-white/10 transition-all duration-300">
              <h3 className="text-lg font-bold text-white mb-2 flex items-center gap-3">
                <span className="w-8 h-8 rounded-lg bg-indigo-500/10 flex items-center justify-center text-indigo-400">
                  <IconActivity />
                </span>
                Live Price Feeds
              </h3>
              <p className="text-sm text-white/40 leading-relaxed">
                The application connects directly to a live price server using WebSockets. This updates the prices on the scrolling ticker tape and trading desk instantly so you can trade under real-world market conditions.
              </p>
            </div>

            {/* Feature 2: Interactive Candlestick Charting */}
            <div className="bg-white/[0.02] border border-white/5 p-6 rounded-3xl backdrop-blur-xl hover:border-white/10 transition-all duration-300">
              <h3 className="text-lg font-bold text-white mb-2 flex items-center gap-3">
                <span className="w-8 h-8 rounded-lg bg-purple-500/10 flex items-center justify-center text-purple-400">
                  <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v18M18 7v10M6 9v6M9 5h6M9 19h6" />
                  </svg>
                </span>
                Interactive Charts
              </h3>
              <p className="text-sm text-white/40 leading-relaxed">
                We integrate real-time TradingView charts. You can view candlestick patterns, select different timeframes, and use technical indicators to study cryptocurrency price movements and historical trends.
              </p>
            </div>

            {/* Feature 3: Order Matching Desk & Book */}
            <div className="bg-white/[0.02] border border-white/5 p-6 rounded-3xl backdrop-blur-xl hover:border-white/10 transition-all duration-300">
              <h3 className="text-lg font-bold text-white mb-2 flex items-center gap-3">
                <span className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-400">
                  <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                </span>
                Live Order Book Simulation
              </h3>
              <p className="text-sm text-white/40 leading-relaxed">
                The trade room simulates a live order matching book that updates every 1.5 seconds. It displays queues of buy orders (bids) and sell orders (asks), helping you learn how order queues and spreads function in real exchanges.
              </p>
            </div>

            {/* Feature 4: Portfolio Recharts Analytics */}
            <div className="bg-white/[0.02] border border-white/5 p-6 rounded-3xl backdrop-blur-xl hover:border-white/10 transition-all duration-300">
              <h3 className="text-lg font-bold text-white mb-2 flex items-center gap-3">
                <span className="w-8 h-8 rounded-lg bg-pink-500/10 flex items-center justify-center text-pink-400">
                  <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M11 3.055A9.003 9.003 0 1020.945 13H11V3.055z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
                  </svg>
                </span>
                Portfolio Analytics
              </h3>
              <p className="text-sm text-white/40 leading-relaxed">
                Keep track of your virtual assets and wallet balances using responsive charts. It includes Pie charts showing your asset split and Bar charts comparing your total investment values with current market valuations.
              </p>
            </div>

          </div>
        </motion.div>

        {/* Section 3: Technical Stack Architecture */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col gap-8"
        >
          <h2 className="text-2xl font-black text-white/95 border-l-4 border-indigo-500 pl-4 tracking-tight">
            How the Technology Works
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Tech Pillar 1: Frontend Client */}
            <div className="bg-white/[0.01] border border-white/5 p-6 rounded-3xl backdrop-blur-xl flex flex-col gap-4">
              <div className="flex items-center gap-3 border-b border-white/5 pb-3">
                <span className="text-indigo-400"><IconCode /></span>
                <span className="font-bold text-white">Frontend (Client)</span>
              </div>
              <ul className="flex flex-col gap-2.5 text-sm text-white/50">
                <li className="flex items-start gap-2">
                  <span className="text-indigo-400 font-bold">•</span>
                  <span>React framework for managing clean layouts and page routing.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-indigo-400 font-bold">•</span>
                  <span>Tailwind CSS configuration for a beautiful dark mode UI theme.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-indigo-400 font-bold">•</span>
                  <span>Framer Motion to handle smooth slide-in page transitions.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-indigo-400 font-bold">•</span>
                  <span>Recharts library for rendering user portfolio dashboards.</span>
                </li>
              </ul>
            </div>

            {/* Tech Pillar 2: Core Backend */}
            <div className="bg-white/[0.01] border border-white/5 p-6 rounded-3xl backdrop-blur-xl flex flex-col gap-4">
              <div className="flex items-center gap-3 border-b border-white/5 pb-3">
                <span className="text-purple-400"><IconServer /></span>
                <span className="font-bold text-white">Backend (Server)</span>
              </div>
              <ul className="flex flex-col gap-2.5 text-sm text-white/50">
                <li className="flex items-start gap-2">
                  <span className="text-purple-400 font-bold">•</span>
                  <span>Node.js and Express.js hosting the application backend server.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-400 font-bold">•</span>
                  <span>WebSockets streaming real-time price feeds straight to the browser.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-400 font-bold">•</span>
                  <span>Secure JWT authentication tokens for signup, login, and session safety.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-400 font-bold">•</span>
                  <span>Simulated matching queues simulating order execution intervals.</span>
                </li>
              </ul>
            </div>

            {/* Tech Pillar 3: Persistence Database */}
            <div className="bg-white/[0.01] border border-white/5 p-6 rounded-3xl backdrop-blur-xl flex flex-col gap-4">
              <div className="flex items-center gap-3 border-b border-white/5 pb-3">
                <span className="text-emerald-400"><IconDatabase /></span>
                <span className="font-bold text-white">Database (Storage)</span>
              </div>
              <ul className="flex flex-col gap-2.5 text-sm text-white/50">
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">•</span>
                  <span>MongoDB Atlas database to record user profiles and balance histories.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">•</span>
                  <span>Protected user credentials secured with encrypted password hashing.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">•</span>
                  <span>Completed order logs displaying detailed transaction logs.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">•</span>
                  <span>Database query triggers updating assets immediately after a trade.</span>
                </li>
              </ul>
            </div>

          </div>
        </motion.div>

        {/* Section 4: Mission / Educational Context */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="bg-white/[0.02] border border-white/5 p-8 rounded-3xl text-center backdrop-blur-xl"
        >
          <h3 className="text-xl font-bold text-white mb-3">Project Mission</h3>
          <p className="text-sm text-white/40 leading-relaxed max-w-[720px] mx-auto">
            CryptoArena was created as a demonstration project to combine modern web development techniques with premium UI designs. It provides a safe, virtual environment to learn how crypto trading works, study charting layouts, and practice without any real-world financial risk.
          </p>
        </motion.div>

      </div>
    </div>
  );
}
