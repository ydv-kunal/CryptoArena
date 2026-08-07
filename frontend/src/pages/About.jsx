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

        {/* Section 2: Key Simulator Features */}
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

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

            {/* Tech Pillar 1: Frontend Client */}
            <div className="bg-white/[0.01] border border-white/5 p-6 rounded-3xl backdrop-blur-xl flex flex-col gap-4">
              <div className="flex items-center gap-3 border-b border-white/5 pb-3">
                <span className="text-indigo-400"><IconCode /></span>
                <span className="font-bold text-white">Frontend (Client)</span>
              </div>
              <ul className="flex flex-col gap-2.5 text-sm text-white/50">
                <li className="flex items-start gap-2">
                  <span className="text-indigo-400 font-bold">•</span>
                  <span>React framework for single-page routing & state management.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-indigo-400 font-bold">•</span>
                  <span>Tailwind CSS dark mode styling system & dynamic layouts.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-indigo-400 font-bold">•</span>
                  <span>Framer Motion for smooth page transitions & marquee tickers.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-indigo-400 font-bold">•</span>
                  <span>Recharts library for interactive portfolio analytics.</span>
                </li>
              </ul>
            </div>

            {/* Tech Pillar 2: Microservices Backend */}
            <div className="bg-white/[0.01] border border-white/5 p-6 rounded-3xl backdrop-blur-xl flex flex-col gap-4">
              <div className="flex items-center gap-3 border-b border-white/5 pb-3">
                <span className="text-purple-400"><IconServer /></span>
                <span className="font-bold text-white">Microservices</span>
              </div>
              <ul className="flex flex-col gap-2.5 text-sm text-white/50">
                <li className="flex items-start gap-2">
                  <span className="text-purple-400 font-bold">•</span>
                  <span><strong>API Gateway (:5100)</strong>: Single entry proxy for REST routes & WebSockets.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-400 font-bold">•</span>
                  <span><strong>Auth Service (:5101)</strong>: Signup, bcrypt hashing & JWT verification.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-400 font-bold">•</span>
                  <span><strong>Trading Service (:5102)</strong>: Portfolio calculations, buy/sell executions.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-400 font-bold">•</span>
                  <span><strong>Market Service (:5103)</strong>: Live price polling & WebSocket broadcaster.</span>
                </li>
              </ul>
            </div>

            {/* Tech Pillar 3: Persistence Database */}
            <div className="bg-white/[0.01] border border-white/5 p-6 rounded-3xl backdrop-blur-xl flex flex-col gap-4">
              <div className="flex items-center gap-3 border-b border-white/5 pb-3">
                <span className="text-emerald-400"><IconDatabase /></span>
                <span className="font-bold text-white">Database</span>
              </div>
              <ul className="flex flex-col gap-2.5 text-sm text-white/50">
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">•</span>
                  <span>MongoDB Atlas Cloud cluster hosting users & portfolios.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">•</span>
                  <span>Protected user records with salted bcrypt password hashes.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">•</span>
                  <span>Transaction ledger logging all BUY & SELL execution histories.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">•</span>
                  <span>Real-time Mongoose updates syncing balances post-trade.</span>
                </li>
              </ul>
            </div>

            {/* Tech Pillar 4: DevOps & Cloud Infrastructure */}
            <div className="bg-white/[0.01] border border-white/5 p-6 rounded-3xl backdrop-blur-xl flex flex-col gap-4">
              <div className="flex items-center gap-3 border-b border-white/5 pb-3">
                <span className="text-pink-400">
                  <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                </span>
                <span className="font-bold text-white">Cloud & DevOps</span>
              </div>
              <ul className="flex flex-col gap-2.5 text-sm text-white/50">
                <li className="flex items-start gap-2">
                  <span className="text-pink-400 font-bold">•</span>
                  <span>Automated CI/CD git-push deployments across Vercel (Frontend) & Render (Backend microservices).</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-pink-400 font-bold">•</span>
                  <span>Render cloud platform deploying individual microservices seamlessly.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-pink-400 font-bold">•</span>
                  <span>Automatic SSL/HTTPS termination & secure WebSocket (WSS) routing.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-pink-400 font-bold">•</span>
                  <span>Vercel global CDN hosting the production React frontend app.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-pink-400 font-bold">•</span>
                  <span>Docker Compose container orchestrations & environment security.</span>
                </li>
              </ul>
            </div>

          </div>
        </motion.div>

        {/* Section 4: Key Project Learnings */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col gap-8"
        >
          <h2 className="text-2xl font-black text-white/95 border-l-4 border-indigo-500 pl-4 tracking-tight">
            Key Project Learnings
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            <div className="bg-white/[0.01] border border-white/5 p-6 rounded-3xl backdrop-blur-xl hover:border-white/10 transition-all duration-300">
              <h3 className="text-base font-bold text-white mb-2 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-indigo-400" />
                Building Independent Microservices
              </h3>
              <p className="text-sm text-white/40 leading-relaxed">
                Separating live price feeds into a dedicated <code className="text-indigo-300">market-service</code> taught me how microservices keep apps fast. Continuous price updates won't slow down database buy/sell orders on <code className="text-indigo-300">trading-service</code>.
              </p>
            </div>

            <div className="bg-white/[0.01] border border-white/5 p-6 rounded-3xl backdrop-blur-xl hover:border-white/10 transition-all duration-300">
              <h3 className="text-base font-bold text-white mb-2 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-purple-400" />
                Cloud Setup & Networking
              </h3>
              <p className="text-sm text-white/40 leading-relaxed">
                Deploying servers on AWS EC2 gave me real experience with cloud networking—configuring web proxies, security groups, CORS, SSL certificates (<code className="text-purple-300">https://</code>), and live WebSocket streams.
              </p>
            </div>

            <div className="bg-white/[0.01] border border-white/5 p-6 rounded-3xl backdrop-blur-xl hover:border-white/10 transition-all duration-300">
              <h3 className="text-base font-bold text-white mb-2 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                Reliable Real-Time Data Streaming
              </h3>
              <p className="text-sm text-white/40 leading-relaxed">
                I learned how to keep live price streams active smoothly. By combining instant REST fetches with real-time WebSockets and price fallbacks, the live ticker tape stays updated even if external APIs rate-limit.
              </p>
            </div>

            <div className="bg-white/[0.01] border border-white/5 p-6 rounded-3xl backdrop-blur-xl hover:border-white/10 transition-all duration-300">
              <h3 className="text-base font-bold text-white mb-2 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-pink-400" />
                Docker Containers & Auto-Deployments
              </h3>
              <p className="text-sm text-white/40 leading-relaxed">
                Using Docker Compose helped me run all microservices locally in containers. Setting up CI/CD auto-deployments means pushing code to GitHub automatically updates both the frontend and backend live.
              </p>
            </div>

          </div>
        </motion.div>

        {/* Section 5: Visual System Architecture Diagram */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col gap-8"
        >
          <h2 className="text-2xl font-black text-white/95 border-l-4 border-indigo-500 pl-4 tracking-tight">
            System Architecture Diagram
          </h2>

          <div className="bg-white/[0.01] border border-white/5 p-6 md:p-8 rounded-3xl backdrop-blur-xl relative overflow-hidden flex flex-col items-center gap-6">

            {/* Layer 1: Client Application */}
            <div className="w-full max-w-md bg-indigo-950/40 border border-indigo-500/30 p-4 rounded-2xl flex items-center justify-between shadow-lg shadow-indigo-500/5">
              <div className="flex items-center gap-3">
                <span className="w-10 h-10 rounded-xl bg-indigo-500/20 flex items-center justify-center text-indigo-300 font-bold">
                  <IconCode />
                </span>
                <div>
                  <h4 className="font-bold text-white text-sm">React Frontend Client</h4>
                  <p className="text-xs text-indigo-300/60">Hosted on Vercel CDN</p>
                </div>
              </div>
              <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                Client Layer
              </span>
            </div>

            {/* Connection Arrow 1 */}
            <div className="flex flex-col items-center gap-1 text-white/30 text-xs font-mono">
              <span className="px-3 py-0.5 rounded-full bg-white/5 border border-white/10 text-[11px] text-white/60">
                HTTP / HTTPS & WebSocket (WSS)
              </span>
              <svg width="16" height="24" viewBox="0 0 16 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8 0v20M3 15l5 5 5-5" />
              </svg>
            </div>

            {/* Layer 2: API Gateway */}
            <div className="w-full max-w-lg bg-purple-950/40 border border-purple-500/30 p-4 rounded-2xl flex items-center justify-between shadow-lg shadow-purple-500/5">
              <div className="flex items-center gap-3">
                <span className="w-10 h-10 rounded-xl bg-purple-500/20 flex items-center justify-center text-purple-300 font-bold">
                  <IconServer />
                </span>
                <div>
                  <h4 className="font-bold text-white text-sm">API Gateway Microservice</h4>
                  <p className="text-xs text-purple-300/60">Port 5100 • Express Proxy & Route Stripping</p>
                </div>
              </div>
              <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30">
                Gateway Layer
              </span>
            </div>

            {/* Connection Arrow 2 */}
            <div className="flex flex-col items-center gap-1 text-white/30 text-xs font-mono">
              <span className="px-3 py-0.5 rounded-full bg-white/5 border border-white/10 text-[11px] text-white/60">
                Internal Microservice Routing
              </span>
              <svg width="16" height="24" viewBox="0 0 16 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8 0v20M3 15l5 5 5-5" />
              </svg>
            </div>

            {/* Layer 3: Independent Microservices Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full">

              {/* Auth Service */}
              <div className="bg-white/[0.02] border border-white/10 p-4 rounded-2xl flex flex-col gap-2 relative">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-indigo-400">Auth Service</span>
                  <span className="text-[10px] font-mono bg-indigo-500/10 text-indigo-300 px-2 py-0.5 rounded border border-indigo-500/20">:5101</span>
                </div>
                <p className="text-xs text-white/40">Handles Signup, Login, Bcrypt Password Hashing & JWT Verification.</p>
                <div className="mt-2 pt-2 border-t border-white/5 text-[11px] text-emerald-400/80 flex items-center gap-1.5">
                  <IconDatabase /> MongoDB Atlas (Users)
                </div>
              </div>

              {/* Trading Service */}
              <div className="bg-white/[0.02] border border-white/10 p-4 rounded-2xl flex flex-col gap-2 relative">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-purple-400">Trading Service</span>
                  <span className="text-[10px] font-mono bg-purple-500/10 text-purple-300 px-2 py-0.5 rounded border border-purple-500/20">:5102</span>
                </div>
                <p className="text-xs text-white/40">Processes Buy/Sell Trades, Portfolio Balances & Transaction Logs.</p>
                <div className="mt-2 pt-2 border-t border-white/5 text-[11px] text-emerald-400/80 flex items-center gap-1.5">
                  <IconDatabase /> MongoDB Atlas (Portfolios)
                </div>
              </div>

              {/* Market Service */}
              <div className="bg-white/[0.02] border border-white/10 p-4 rounded-2xl flex flex-col gap-2 relative">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-pink-400">Market Service</span>
                  <span className="text-[10px] font-mono bg-pink-500/10 text-pink-300 px-2 py-0.5 rounded border border-pink-500/20">:5103</span>
                </div>
                <p className="text-xs text-white/40">Live CoinGecko Polling Engine & Real-Time WebSocket Broadcaster.</p>
                <div className="mt-2 pt-2 border-t border-white/5 text-[11px] text-amber-400/80 flex items-center gap-1.5">
                  <IconActivity /> CoinGecko Crypto API
                </div>
              </div>

            </div>

          </div>
        </motion.div>

        {/* Section 6: Mission / Educational Context */}
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
