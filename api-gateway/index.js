const express = require("express");
const { createProxyMiddleware } = require("http-proxy-middleware");

const app = express();
// REMOVE express.json()
// AUTH SERVICE ROUTES 
// app.use(
//   "/auth",
//   createProxyMiddleware({
//     target: "http://localhost:5101/auth",
//     changeOrigin: true,
//     pathRewrite: {
//       "^/auth": "", // Remove /auth prefix when forwarding to auth service
//     }
//   })
// );
app.use(
  "/auth",
  createProxyMiddleware({
    target: `${process.env.AUTH_SERVICE_URL || "http://localhost:5101"}/auth`,
    changeOrigin: true,
    pathRewrite: {
      "^/auth": "", // Remove /auth prefix when forwarding to auth service
    }
  })
);

// TRADING SERVICE ROUTES
//   app.use(
//   "/trade",
//   createProxyMiddleware({
//     target: "http://localhost:5102/trade",
//     changeOrigin: true,
//     pathRewrite: {
//       "^/trade": "", // Remove /trade prefix when forwarding to trading service
//     },
//   })
// );
app.use(
  "/trade",
  createProxyMiddleware({
    target: `${process.env.TRADING_SERVICE_URL || "http://localhost:5102"}/trade`,
    changeOrigin: true,
    pathRewrite: {
      "^/trade": "", // Remove /trade prefix when forwarding to trading service
    },
  })
);

app.get("/", (req, res) => {
  res.send("API Gateway Running");
});

app.listen(5100, "0.0.0.0", () => {
  console.log("Gateway running on 5100");
});