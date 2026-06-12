const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5100";

const getToken = () => {
  return localStorage.getItem("token"); // or wherever you store it
};

// BUY API CALL
export const buyCrypto = async (data) => {
  // const res = await fetch("http://localhost:5100/trade/buy", {
  const res = await fetch(`${API_URL}/trade/buy`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`,
    },
    body: JSON.stringify(data),
  });

  return res.json();
};

// SELL API CALL
export const sellCrypto = async (data) => {
  // const res = await fetch("http://localhost:5100/trade/sell", {
  const res = await fetch(`${API_URL}/trade/sell`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`,
    },
    body: JSON.stringify(data),
  });

  return res.json();
};


// GET PORTFOLIO API CALL
export const getPortfolio = async () => {
  // const res = await fetch("http://localhost:5100/trade/portfolio", {
  const res = await fetch(`${API_URL}/trade/portfolio`, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });
  return res.json();
};