import { useEffect, useRef } from "react";
import { createChart, LineSeries } from "lightweight-charts";

export default function Chart({ prices, coin }) {
    const chartContainerRef = useRef(null);
    const chartRef = useRef(null);
    const lineSeriesRef = useRef(null);

    useEffect(() => {
        if (!chartContainerRef.current) return;

        const chart = createChart(chartContainerRef.current, {
            width: chartContainerRef.current.clientWidth,
            height: 300,
            layout: {
                background: { color: "#0f172a" },
                textColor: "#d1d5db",
            },
            grid: {
                vertLines: { color: "rgba(255,255,255,0.05)" },
                horzLines: { color: "rgba(255,255,255,0.05)" },
            },
        });

        const lineSeries = chart.addSeries(LineSeries, {
            color: "#22c55e",
            lineWidth: 2,
        });

        async function loadHistory() {
            const coinMap = {
                BTC: "bitcoin",
                ETH: "ethereum",
                DOGE: "dogecoin",
                SOL: "solana",
                BNB: "binancecoin",
                LTC: "litecoin",
                XRP: "ripple",
            };
            const res = await fetch(
                `https://api.coingecko.com/api/v3/coins/${coinMap[coin]}/market_chart?vs_currency=usd&days=1`
            );

            const data = await res.json();
            const formatted = data.prices.map((item) => ({
                time: Math.floor(item[0] / 1000),
                value: item[1],
            }));

            lineSeries.setData(formatted); // 🔥 THIS IS IMPORTANT
        }

        loadHistory();
        // store references
        chartRef.current = chart;
        lineSeriesRef.current = lineSeries;

        return () => chart.remove();
    }, [coin]);

    useEffect(() => {
        if (!prices?.[coin] || !lineSeriesRef.current) return;

        const time = Math.floor(Date.now() / 1000);

        lineSeriesRef.current.update({
            time,
            value: prices[coin],
        });
        //chartRef.current.timeScale().fitContent();
    }, [prices, coin]);

    return (
        <div
            ref={chartContainerRef}
            className="w-full h-[300px] bg-white/5 backdrop-blur-xl rounded-2xl mt-6"
        />
    );
}