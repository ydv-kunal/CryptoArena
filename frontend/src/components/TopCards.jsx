// ==========================================
// ORIGINAL TOPCARDS IMPLEMENTATION (COMMENTED OUT)
// ==========================================
// export default function TopCards({ balance, assestsCount }) {
//   
//   const isActive = assestsCount > 0;
//   const status = isActive ? "Active" : "Inactive";
// 
//   
//   return (
//     <div className="flex items-center  gap-8 mb-6 px-4 py-2 bg-white/5 rounded-xl backdrop-blur">
//       <span>
//         <span className="text-gray-500">Balance:</span>{" "}
//         <span className="text-white font-semibold">${balance}</span>
//       </span>
// 
//       <span>
//         <span className="text-gray-500">Assets:</span>{" "}
//         <span className="text-white font-semibold">{assestsCount}</span>
//       </span>
// 
//       <span>
//         <span className="text-gray-500">Status:</span>{" "}
//         {/* <span className="text-green-400 font-semibold">{status}</span> */}
//         <span
//           className={`font-semibold ${isActive ? "text-green-400" : "text-red-400"
//             }`}
//         >
//           {status}
//         </span>
//       </span>
//     </div>
//   );
// }

// ─── NEW PREMIUM TOPCARDS IMPLEMENTATION ───────────────────────────
import { motion } from "framer-motion";

// Custom SVG Icons
const IconWallet = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 12V8H6a2 2 0 0 1-2-2c0-1.1.9-2 2-2h12v4" />
    <path d="M4 6v12c0 1.1.9 2 2 2h14v-4" />
    <circle cx="18" cy="12" r="1" fill="currentColor" />
  </svg>
);

const IconBriefcase = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
    <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
  </svg>
);

const IconActivity = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
  </svg>
);

export default function TopCards({ balance, assestsCount }) {
  const isActive = assestsCount > 0;
  const status = isActive ? "Active" : "Inactive";

  // Card layouts configuration
  const cardData = [
    {
      title: "Available Balance",
      value: `$${balance}`,
      subtext: "Virtual trading funds",
      icon: <IconWallet />,
      colorClass: "text-indigo-400",
      glowBg: "bg-indigo-500/10",
      iconBg: "bg-indigo-500/10 text-indigo-400 border-indigo-500/20"
    },
    {
      title: "Portfolio Assets",
      value: assestsCount,
      subtext: "Unique assets held",
      icon: <IconBriefcase />,
      colorClass: "text-purple-400",
      glowBg: "bg-purple-500/10",
      iconBg: "bg-purple-500/10 text-purple-400 border-purple-500/20"
    },
    {
      title: "Simulator Status",
      value: status,
      subtext: isActive ? "Live connection OK" : "No portfolio assets",
      icon: <IconActivity />,
      colorClass: isActive ? "text-emerald-400" : "text-rose-400",
      glowBg: isActive ? "bg-emerald-500/10" : "bg-rose-500/10",
      iconBg: isActive
        ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
        : "bg-rose-500/10 text-rose-400 border-rose-500/20"
    }
  ];

  return (
    <div
      className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-6"
      style={{ fontFamily: "'DM Sans', 'Segoe UI', sans-serif" }}
    >
      {cardData.map((card, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: i * 0.1 }}
          whileHover={{ y: -4, scale: 1.01 }}
          className="relative overflow-hidden bg-white/[0.02] border border-white/5 rounded-2xl p-5 backdrop-blur-xl flex items-center justify-between shadow-xl transition-all duration-300"
        >
          {/* Subtle accent corner glow */}
          <div className={`absolute top-0 right-0 w-24 h-24 ${card.glowBg} rounded-full blur-2xl pointer-events-none`} />

          {/* Left Contents */}
          <div className="flex flex-col gap-1.5 z-10">
            <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
              {card.title}
            </span>
            <span className={`text-2xl font-black ${card.colorClass} font-mono tracking-tight`}>
              {card.value}
            </span>
            <span className="text-xs text-gray-400 font-medium">
              {card.subtext}
            </span>
          </div>

          {/* Right Icon Block */}
          <div className={`w-12 h-12 rounded-xl border flex items-center justify-center z-10 ${card.iconBg}`}>
            {card.icon}
          </div>
        </motion.div>
      ))}
    </div>
  );
}


