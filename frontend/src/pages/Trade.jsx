import { useState, useEffect } from "react";
import Chart from "../components/Chart";
import Sidebar from "../components/Sidebar";
import { buyCrypto, sellCrypto } from "../services/api";
import Ticker from "../components/Ticker";
import TopCards from "../components/TopCards";
import { getPortfolio } from "../services/api";

// ==========================================
// ORIGINAL TRADE LOGIC (COMMENTED OUT)
// ==========================================
// export default function Trade() {
//     const [prices, setPrices] = useState({});
//     const [selectedCoin, setSelectedCoin] = useState(
//         localStorage.getItem("selectedCoin") || "BTC"
//     );
//     const [quantity, setQuantity] = useState("");
//     const [message, setMessage] = useState("");
//     const [balance, setBalance] = useState(0);
//     const [assestsCount, setAssestsCount] = useState(0);
// 
//     
//     const handleBuy = async () => {
//         if (!quantity || quantity <= 0) return;
// 
//         const res = await buyCrypto({
//             symbol: selectedCoin,
//             quantity: Number(quantity),
//             price: prices[selectedCoin], // 🔥 VERY IMPORTANT
//         });
//         setMessage(res.message);
//         setQuantity("");
//     };
// 
//     const handleSell = async () => {
//         if (!quantity || quantity <= 0) return;
// 
//         const res = await sellCrypto({
//             symbol: selectedCoin,
//             quantity: Number(quantity),
//             price: prices[selectedCoin],
//         });
//         setMessage(res.message);
//         setQuantity("");
//     };
// 
//     useEffect(() => {
//         const socket = new WebSocket("ws://localhost:5102");
// 
//         socket.onmessage = (event) => {
//             setPrices(JSON.parse(event.data));
//         };
// 
//         return () => socket.close();
//     }, []);
//     
//     //----------------------- Load Portfolio on mount to get balance and assets count for cards ------------------//
//     useEffect(() => {
//         loadPortfolio();
// 
//         const socket = new WebSocket("ws://localhost:5102");
// 
//         socket.onmessage = (event) => {
//             const prices = JSON.parse(event.data);
// 
//             setPortfolio(prev =>
//                 prev.map(asset => {
//                     const currentPrice = prices[asset.symbol] || asset.avgPrice;
//                     const profit =
//                         (currentPrice - asset.avgPrice) * asset.quantity;
// 
//                     return { ...asset, currentPrice, profit };
//                 })
//             );
//         };
//     }, []);
// 
//     const loadPortfolio = async () => {
//         const data = await getPortfolio();
//         //setPortfolio(data.assets);
//         setBalance(data.balance.toFixed(2));
//         setAssestsCount(data.assets?.length || 0);
//     };

// ─── NEW REVISED TRADE LOGIC (PORTFOLIO STATS & SIMULATED ORDER BOOK) ───
export default function Trade() {
  const [prices, setPrices] = useState({});
  const [portfolio, setPortfolio] = useState([]);
  const [selectedCoin, setSelectedCoin] = useState(
    localStorage.getItem("selectedCoin") || "BTC"
  );
  const [quantity, setQuantity] = useState("");
  const [message, setMessage] = useState("");
  const [balance, setBalance] = useState("0.00");
  const [assestsCount, setAssestsCount] = useState(0);
  const [tradeType, setTradeType] = useState("BUY");
  const [orderBook, setOrderBook] = useState({ bids: [], asks: [] });

  const fallbackPrices = {
    BTC: 63567.00,
    ETH: 1684.43,
    DOGE: 0.09,
    SOL: 67.01,
    BNB: 605.34,
    LTC: 42.22,
    XRP: 1.15
  };

  const handleBuy = async () => {
    if (!quantity || quantity <= 0) return;
    const rate = prices[selectedCoin] || fallbackPrices[selectedCoin];

    const res = await buyCrypto({
      symbol: selectedCoin,
      quantity: Number(quantity),
      price: rate,
    });
    setMessage(res.message);
    setQuantity("");
    loadPortfolio(); // reload cash balance and assets
  };

  const handleSell = async () => {
    if (!quantity || quantity <= 0) return;
    const rate = prices[selectedCoin] || fallbackPrices[selectedCoin];

    const res = await sellCrypto({
      symbol: selectedCoin,
      quantity: Number(quantity),
      price: rate,
    });
    setMessage(res.message);
    setQuantity("");
    loadPortfolio(); // reload cash balance and assets
  };

  // Live price feeds socket
  useEffect(() => {
    // const socket = new WebSocket("ws://localhost:5102");
    const wsUrl = import.meta.env.VITE_WS_URL || "ws://localhost:5102";
    const socket = new WebSocket(wsUrl);
    socket.onmessage = (event) => {
      const livePrices = JSON.parse(event.data);
      setPrices(livePrices);

      // Keep portfolio updated with current prices
      setPortfolio((prev) =>
        prev.map((asset) => {
          const currentPrice = livePrices[asset.symbol] || asset.avgPrice;
          const profit = (currentPrice - asset.avgPrice) * asset.quantity;
          return { ...asset, currentPrice, profit };
        })
      );
    };
    return () => socket.close();
  }, []);

  // Load portfolio stats on mount & selectedCoin changes
  useEffect(() => {
    loadPortfolio();
  }, [selectedCoin]);

  const loadPortfolio = async () => {
    const data = await getPortfolio();
    setPortfolio(data.assets || []);
    setBalance(Number(data.balance).toFixed(2));
    setAssestsCount(data.assets?.length || 0);
  };

  // Generate dynamic live order book simulator based on price ticks
  useEffect(() => {
    const generateOrderBook = () => {
      const base = prices[selectedCoin] || fallbackPrices[selectedCoin] || 100;
      
      // Bids (Buy orders below current price, sorted high to low)
      const newBids = Array.from({ length: 5 }, (_, i) => {
        const factor = 1 - (i + 1) * 0.0006;
        const bidPrice = base * factor;
        const qty = Math.random() * 5 + 0.05;
        return {
          price: bidPrice,
          qty: qty.toFixed(4),
          total: (bidPrice * qty).toFixed(2)
        };
      });

      // Asks (Sell orders above current price, sorted high to low)
      const newAsks = Array.from({ length: 5 }, (_, i) => {
        const factor = 1 + (5 - i) * 0.0006;
        const askPrice = base * factor;
        const qty = Math.random() * 5 + 0.05;
        return {
          price: askPrice,
          qty: qty.toFixed(4),
          total: (askPrice * qty).toFixed(2)
        };
      });

      setOrderBook({ bids: newBids, asks: newAsks });
    };

    generateOrderBook();
    const interval = setInterval(generateOrderBook, 1500); // refresh simulated book every 1.5s
    return () => clearInterval(interval);
  }, [selectedCoin, prices[selectedCoin]]);

// ==========================================
// ORIGINAL LAYOUT RENDER (COMMENTED OUT)
// ==========================================
//     return (
//         <div className="flex bg-gradient-to-br from-[#020617] to-[#0f172a] text-white min-h-screen">
//             {/* <Sidebar /> */}
//             <Sidebar prices={prices} />
//             
//             <div className="flex-1 p-5 ml-60">
//                 <div>
//                     <h1 className="text-4xl font-bold mb-5 bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text">
//                         Trade
//                     </h1>
//                     <p className="text-gray-400 mb-1">Overview of your portfolio</p>
//                 </div>
// 
//                 {/* Live Prices */}
//                 <div className="bg-white/5 p-2 rounded-2xl backdrop-blur mb-2 mt-3">
//                     <Ticker prices={prices} setPrices={setPrices} />
//                 </div>
// 
//                 {/* Coin Selector */}
//                 <div className="flex gap-3 mt-4">
//                     {["BTC", "ETH", "DOGE", "SOL", "BNB", "LTC", "XRP"].map((coin) => (
//                         <button
//                             key={coin}
//                             onClick={() => {
//                                 setSelectedCoin(coin);
//                                 localStorage.setItem("selectedCoin", coin);
//                             }}
//                             className={`px-4 py-1 rounded-lg text-sm transition ${selectedCoin === coin
//                                 ? "bg-green-500 text-black"
//                                 : "bg-white/10 text-gray-300 hover:bg-white/20"
//                                 }`}
//                         >
//                             {coin}
//                         </button>
//                     ))}
//                 </div>
// 
//                 {/* Chart */}
//                 <Chart prices={prices} coin={selectedCoin} />
// 
//                 {/* Cards */}
//                 <div className="mt-4">
//                     <TopCards balance={balance} assestsCount={assestsCount} />
//                 </div>
// 
//                 <div className="mt-0 bg-white/5 p-4 rounded-2xl backdrop-blur-xl max-w-md">
//                     <h2 className="text-xl font-semibold mb-4">Trade {selectedCoin}</h2>
// 
//                     {/* Quantity Input */}
//                     <input
//                         type="number"
//                         placeholder="Enter quantity"
//                         value={quantity}
//                         onChange={(e) => setQuantity(e.target.value)}
//                         className="w-full p-3 rounded-lg bg-black/40 border border-white/10 mb-4"
//                     />
// 
//                     {/* Buttons */}
//                     <div className="flex gap-4">
//                         <button
//                             onClick={handleBuy}
//                             className="flex-1 bg-green-500 text-black py-2 rounded-xl font-semibold"
//                         >
//                             Buy
//                         </button>
// 
//                         <button
//                             onClick={handleSell}
//                             className="flex-1 bg-red-500 text-black py-2 rounded-xl font-semibold"
//                         >
//                             Sell
//                         </button>
//                     </div>
// 
//                     {/* Message */}
//                     {message && (
//                         <p className="mt-4 text-green-400 text-sm">{message}</p>
//                     )}
//                 </div>
// 
//             </div>
//         </div>
//     );
// 
// }

// ==========================================
// ORIGINAL LAYOUT RENDER (COMMENTED OUT)
// ==========================================
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
//             <Sidebar prices={prices} />
//             
//             {/* Main content area (removed flex-1 and parent flex layout to fix overflow, added ml-64 matching sidebar) */}
//             <div className="p-8 ml-64 z-10 animate-fadeIn flex flex-col gap-6 max-w-[1400px]">
//                 {/* Header Block */}
//                 <div className="flex flex-col gap-1 py-2">
//                     <h1 className="text-4xl font-black tracking-tight text-white">
//                         Trade{" "}
//                         <span style={{ background: "linear-gradient(90deg,#818cf8,#c084fc)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
//                             Simulator
//                         </span>
//                     </h1>
//                     <p className="text-xs text-white/35 font-bold tracking-widest uppercase">
//                         Instant virtual buy and sell execution
//                     </p>
//                 </div>
// 
//                 {/* Live Prices */}
//                 <div className="bg-white/[0.02] border border-white/5 p-2.5 rounded-2xl backdrop-blur-xl shadow-lg">
//                     <Ticker prices={prices} setPrices={setPrices} />
//                 </div>
// 
//                 {/* Coin Selector */}
//                 <div className="flex flex-wrap gap-2.5 mt-2">
//                     {["BTC", "ETH", "DOGE", "SOL", "BNB", "LTC", "XRP"].map((coin) => (
//                         <button
//                             key={coin}
//                             onClick={() => {
//                                 setSelectedCoin(coin);
//                                 localStorage.setItem("selectedCoin", coin);
//                             }}
//                             className={`px-5 py-2.5 rounded-xl text-sm font-semibold tracking-tight transition-all duration-300 border ${
//                                 selectedCoin === coin
//                                     ? "bg-gradient-to-r from-indigo-500 to-purple-600 border-indigo-500 text-white shadow-[0_0_15px_rgba(99,102,241,0.25)]"
//                                     : "bg-white/[0.02] border-white/5 text-gray-400 hover:bg-white/5 hover:text-white"
//                             }`}
//                         >
//                             {coin}
//                         </button>
//                     ))}
//                 </div>
// 
//                 {/* Chart Wrapper Card */}
//                 <div className="bg-white/[0.02] border border-white/5 p-6 rounded-3xl backdrop-blur-xl shadow-lg mt-2">
//                     <div className="flex items-center justify-between mb-4 px-2">
//                         <span className="text-sm font-bold text-gray-300">
//                             {selectedCoin} Market Chart (24h)
//                         </span>
//                         <span className="text-xs text-white/30 font-medium">
//                             Powered by TradingView
//                         </span>
//                     </div>
//                     <Chart prices={prices} coin={selectedCoin} />
//                 </div>
// 
//                 {/* Metrics Cards */}
//                 <div className="w-full mt-2">
//                     <TopCards balance={balance} assestsCount={assestsCount} />
//                 </div>
// 
//                 {/* Buy / Sell Order Desk Form */}
//                 <div className="bg-white/[0.02] border border-white/5 p-6 rounded-3xl backdrop-blur-xl shadow-lg max-w-md mt-2">
//                     <h2 className="text-lg font-bold text-white mb-4">Order Desk: {selectedCoin}</h2>
// 
//                     {/* Quantity Input */}
//                     <div className="flex flex-col gap-2 mb-4">
//                         <label className="text-xs text-gray-500 font-bold uppercase tracking-wider px-1">Order Quantity</label>
//                         <input
//                             type="number"
//                             placeholder="Enter quantity to trade"
//                             value={quantity}
//                             onChange={(e) => setQuantity(e.target.value)}
//                             className="w-full p-3.5 rounded-xl bg-black/40 border border-white/5 text-white font-semibold font-mono placeholder-gray-600 focus:outline-none focus:border-indigo-500/50 transition-colors duration-200"
//                         />
//                     </div>
// 
//                     {/* Buttons */}
//                     <div className="flex gap-4">
//                         <button
//                             onClick={handleBuy}
//                             className="flex-1 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 active:scale-[0.98] text-white py-3 rounded-xl font-bold transition-all duration-300 shadow-lg"
//                         >
//                             Buy Order
//                         </button>
// 
//                         <button
//                             onClick={handleSell}
//                             className="flex-1 bg-gradient-to-r from-rose-500 to-red-600 hover:from-rose-400 hover:to-red-500 active:scale-[0.98] text-white py-3 rounded-xl font-bold transition-all duration-300 shadow-lg"
//                         >
//                             Sell Order
//                         </button>
//                     </div>
// 
//                     {/* Message Response */}
//                     {message && (
//                         <div className="mt-4 p-3 bg-white/[0.02] border border-white/5 rounded-xl text-center">
//                             <p className="text-indigo-400 text-sm font-semibold">{message}</p>
//                         </div>
//                     )}
//                 </div>
// 
//             </div>
//         </div>
//     );
// 
// }

  // ─── NEW REVISED TRADE RENDER (FIXED OVERFLOW, GRID LAYOUT & LIVE ORDER BOOK) ───
  const currentAsset = portfolio.find((asset) => asset.symbol === selectedCoin);
  const ownedQty = currentAsset ? currentAsset.quantity : 0;
  const currentPrice = prices[selectedCoin] || fallbackPrices[selectedCoin] || 0;
  const estimatedTotal = (Number(quantity) * currentPrice) || 0;

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

      {/* Sidebar */}
      <Sidebar prices={prices} />

      {/* Main dashboard content container */}
      <div className="p-8 ml-64 z-10 animate-fadeIn flex flex-col gap-6 max-w-[1400px]">
        {/* Header Block */}
        <div className="flex flex-col gap-1 py-1">
          <h1 className="text-4xl font-black tracking-tight text-white">
            Trade{" "}
            <span style={{ background: "linear-gradient(90deg,#818cf8,#c084fc)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              Simulator
            </span>
          </h1>
          <p className="text-xs text-white/35 font-bold tracking-widest uppercase">
            Instant virtual buy and sell order execution desk
          </p>
        </div>

        {/* Live Prices moving marquee ticker */}
        <div className="bg-white/[0.02] border border-white/5 p-2.5 rounded-2xl backdrop-blur-xl shadow-lg">
          <Ticker prices={prices} setPrices={setPrices} />
        </div>

        {/* Grid Workspace */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 items-start">
          
          {/* LEFT: Coin Selector, Chart, and TopCards */}
          <div className="xl:col-span-2 flex flex-col gap-6 w-full">
            
            {/* Coin Selector Tab Bar */}
            <div className="flex flex-wrap gap-2">
              {["BTC", "ETH", "DOGE", "SOL", "BNB", "LTC", "XRP"].map((coin) => (
                <button
                  key={coin}
                  onClick={() => {
                    setSelectedCoin(coin);
                    localStorage.setItem("selectedCoin", coin);
                  }}
                  className={`px-5 py-2.5 rounded-xl text-sm font-semibold tracking-tight transition-all duration-300 border ${
                    selectedCoin === coin
                      ? "bg-gradient-to-r from-indigo-500 to-purple-600 border-indigo-500 text-white shadow-[0_0_15px_rgba(99,102,241,0.25)]"
                      : "bg-white/[0.02] border-white/5 text-gray-400 hover:bg-white/5 hover:text-white"
                  }`}
                >
                  {coin}
                </button>
              ))}
            </div>

            {/* TradingView Live Price Chart */}
            <div className="bg-white/[0.02] border border-white/5 p-6 rounded-3xl backdrop-blur-xl shadow-lg w-full">
              <div className="flex items-center justify-between mb-4 px-2">
                <div className="flex items-center gap-3">
                  <span className="text-sm font-bold text-gray-300">
                    {selectedCoin} / USD
                  </span>
                  <span className="text-xs bg-indigo-500/10 text-indigo-400 font-bold border border-indigo-500/10 px-2.5 py-0.5 rounded-lg uppercase tracking-wider">
                    24h Chart
                  </span>
                </div>
                <span className="text-[10px] text-white/30 font-bold uppercase tracking-widest">
                  Real-time coingecko API feed
                </span>
              </div>
              <Chart prices={prices} coin={selectedCoin} />
            </div>

            {/* Metrics cards row */}
            <div className="w-full">
              <TopCards balance={balance} assestsCount={assestsCount} />
            </div>

          </div>

          {/* RIGHT: Order Desk Form & Simulated Order Book */}
          <div className="xl:col-span-1 flex flex-col gap-6 w-full xl:sticky xl:top-8">
            
            {/* Buy / Sell Order Desk Form */}
            <div className="bg-white/[0.02] border border-white/5 rounded-3xl backdrop-blur-xl shadow-[0_20px_40px_rgba(0,0,0,0.3)] overflow-hidden">
              {/* Buy / Sell Tab Toggles */}
              <div className="flex border-b border-white/5">
                <button
                  onClick={() => setTradeType("BUY")}
                  className={`flex-1 py-4 text-center text-sm font-bold tracking-wider uppercase transition-all duration-300 ${
                    tradeType === "BUY"
                      ? "bg-emerald-500/10 text-emerald-400 border-b-2 border-emerald-500"
                      : "text-gray-500 hover:text-white hover:bg-white/[0.01]"
                  }`}
                >
                  Buy {selectedCoin}
                </button>
                <button
                  onClick={() => setTradeType("SELL")}
                  className={`flex-1 py-4 text-center text-sm font-bold tracking-wider uppercase transition-all duration-300 ${
                    tradeType === "SELL"
                      ? "bg-rose-500/10 text-rose-400 border-b-2 border-rose-500"
                      : "text-gray-500 hover:text-white hover:bg-white/[0.01]"
                  }`}
                >
                  Sell {selectedCoin}
                </button>
              </div>

              {/* Form Content */}
              <div className="p-6 flex flex-col gap-5">
                
                {/* Available Balance Details */}
                <div className="flex items-center justify-between text-xs font-semibold px-1">
                  <span className="text-gray-500">Available Funds</span>
                  <span className="text-white font-mono">
                    {tradeType === "BUY" ? `$${balance}` : `${ownedQty.toFixed(4)} ${selectedCoin}`}
                  </span>
                </div>

                {/* Quantity input box */}
                <div className="flex flex-col gap-2">
                  <label className="text-[10px] text-gray-500 font-bold uppercase tracking-wider px-1">
                    Order Quantity
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      placeholder="0.00"
                      value={quantity}
                      onChange={(e) => setQuantity(e.target.value)}
                      className="w-full p-3.5 pr-12 rounded-xl bg-black/40 border border-white/5 text-white font-semibold font-mono placeholder-gray-600 focus:outline-none focus:border-indigo-500/50 transition-colors duration-200"
                    />
                    <span className="absolute right-4 top-3.5 text-xs font-bold text-gray-500 select-none">
                      {selectedCoin}
                    </span>
                  </div>
                </div>

                {/* Quick Quantity Shortcuts */}
                <div className="grid grid-cols-4 gap-2">
                  {[1, 5, 10, 25].map((qtyVal) => (
                    <button
                      key={qtyVal}
                      onClick={() => setQuantity(String(qtyVal))}
                      className="py-1.5 rounded-lg bg-white/[0.02] border border-white/5 text-[10px] font-bold text-gray-400 hover:bg-indigo-500/10 hover:border-indigo-500/20 hover:text-white transition-all duration-200"
                    >
                      {qtyVal} Qty
                    </button>
                  ))}
                </div>

                {/* Transaction details estimation */}
                <div className="bg-black/30 border border-white/5 rounded-2xl p-4 flex flex-col gap-2 text-xs">
                  <div className="flex justify-between">
                    <span className="text-gray-500 font-medium">Execution Price</span>
                    <span className="text-gray-300 font-bold font-mono">${currentPrice.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between border-t border-white/5 pt-2 mt-1">
                    <span className="text-gray-400 font-bold">Estimated Total</span>
                    <span className="text-indigo-400 font-extrabold font-mono">${estimatedTotal.toFixed(2)}</span>
                  </div>
                </div>

                {/* Primary Action Executer Button */}
                <button
                  onClick={tradeType === "BUY" ? handleBuy : handleSell}
                  className={`w-full py-3.5 rounded-xl font-bold transition-all duration-300 active:scale-[0.98] shadow-lg ${
                    tradeType === "BUY"
                      ? "bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white shadow-emerald-500/10"
                      : "bg-gradient-to-r from-rose-500 to-red-600 hover:from-rose-400 hover:to-red-500 text-white shadow-rose-500/10"
                  }`}
                >
                  {tradeType === "BUY" ? "Place Buy Order" : "Place Sell Order"}
                </button>

                {/* Status message banners */}
                {message && (
                  <div className={`p-3 rounded-xl text-center border text-xs font-bold ${
                    message.toLowerCase().includes("successfully") || message.toLowerCase().includes("bought") || message.toLowerCase().includes("sold")
                      ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-400 shadow-sm"
                      : "bg-rose-500/10 border-rose-500/20 text-rose-400 shadow-sm"
                  }`}>
                    {message}
                  </div>
                )}

              </div>
            </div>

            {/* Simulated Live Order Book Widget */}
            <div className="bg-white/[0.02] border border-white/5 rounded-3xl p-5 backdrop-blur-xl shadow-lg flex flex-col gap-3">
              <div className="flex items-center justify-between px-1">
                <span className="text-xs font-bold text-gray-300 uppercase tracking-wider">Order Book</span>
                <span className="text-[10px] text-emerald-400 font-bold bg-emerald-500/10 px-2 py-0.5 rounded-md flex items-center gap-1">
                  <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" /> Live Feed
                </span>
              </div>

              {/* Order Book Grid */}
              <div className="flex flex-col gap-1 text-[11px] font-mono select-none">
                
                {/* Header labels */}
                <div className="grid grid-cols-3 text-white/30 font-bold pb-2 border-b border-white/5">
                  <span>Price (USD)</span>
                  <span className="text-right">Size ({selectedCoin})</span>
                  <span className="text-right">Total (USD)</span>
                </div>

                {/* Ask Orders (Red, top down) */}
                <div className="flex flex-col gap-1 py-1">
                  {orderBook.asks.map((ask, idx) => (
                    <div key={`ask-${idx}`} className="grid grid-cols-3 text-rose-400 hover:bg-rose-500/5 py-0.5 rounded px-0.5 transition-colors">
                      <span className="font-bold">${ask.price.toFixed(2)}</span>
                      <span className="text-right text-gray-400">{ask.qty}</span>
                      <span className="text-right text-gray-500">${ask.total}</span>
                    </div>
                  ))}
                </div>

                {/* Spread Display row */}
                <div className="flex items-center justify-between bg-white/[0.02] border-y border-white/5 py-2 px-1.5 rounded-lg my-1.5">
                  <span className="text-xs font-black text-white/40">Spread Rate</span>
                  <span className="text-sm font-extrabold text-white font-mono">
                    ${currentPrice.toFixed(2)}
                  </span>
                </div>

                {/* Bid Orders (Green, top down) */}
                <div className="flex flex-col gap-1 py-1">
                  {orderBook.bids.map((bid, idx) => (
                    <div key={`bid-${idx}`} className="grid grid-cols-3 text-emerald-400 hover:bg-emerald-500/5 py-0.5 rounded px-0.5 transition-colors">
                      <span className="font-bold">${bid.price.toFixed(2)}</span>
                      <span className="text-right text-gray-400">{bid.qty}</span>
                      <span className="text-right text-gray-500">${bid.total}</span>
                    </div>
                  ))}
                </div>

              </div>
            </div>

          </div>
          
        </div>
      </div>
    </div>
  );
}