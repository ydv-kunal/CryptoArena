import { useState } from "react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

const handleLogin = async () => {
  try {
    setMessage("");
    const apiUrl = import.meta.env.VITE_API_URL || "http://3.108.215.35:5100";
    const res = await fetch(`${apiUrl}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (res.ok && data.token) {
      localStorage.setItem("token", data.token); 
      localStorage.setItem("username", data.username); 
      window.location.href = "/";
    } else {
      setMessage(data.message || "Login failed");
    }
  } catch (err) {
    console.error("Login Error:", err);
    setMessage("Connection error. Unable to reach authentication server.");
  }
};

return (
    <div className="flex items-center justify-center min-h-screen bg-black text-white">
      <div className="bg-gray-900 p-8 rounded-xl w-96">
        <h1 className="text-2xl mb-6">Login</h1>

        <input
          type="email"
          placeholder="Email"
          className="w-full p-3 mb-4 rounded bg-black border border-gray-700"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full p-3 mb-4 rounded bg-black border border-gray-700"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={handleLogin}
          className="w-full bg-green-500 hover:bg-green-400 text-black font-semibold p-3 rounded-xl transition-colors"
        >
          Login
        </button>

        {message && (
          <p className={`mt-4 text-sm font-semibold ${message.toLowerCase().includes("unable") || message.toLowerCase().includes("invalid") || message.toLowerCase().includes("failed") ? "text-rose-400" : "text-green-400"}`}>{message}</p>
        )}

        <div 
          onClick={() => {
            setEmail("jack01@gmail.com");
            setPassword("123456");
            setMessage("");
          }}
          className="mt-6 p-4 rounded-xl bg-indigo-950/40 border border-indigo-900/50 hover:border-indigo-500/50 cursor-pointer text-xs text-gray-400 transition-colors"
          title="Click to fill demo credentials"
        >
          <p className="font-semibold text-white mb-1">⚡ Quick Demo Access (Click to fill):</p>
          <p>Email: <code className="text-indigo-300">jack01@gmail.com</code></p>
          <p>Password: <code className="text-indigo-300">123456</code></p>
        </div>
      </div>
    </div>
  );
}