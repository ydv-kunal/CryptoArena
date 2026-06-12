import { useState } from "react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

const handleLogin = async () => {
  // const res = await fetch("http://localhost:5100/auth/login", {
  const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:5100";
  const res = await fetch(`${apiUrl}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  const data = await res.json();

  if (data.token) {
    //console.log("Login successful, token:", data.token); // 🔥 DEBUGGING
    localStorage.setItem("token", data.token); 
    localStorage.setItem("username", data.username); // <-- STORE USERNAME
    window.location.href = "/";
  }else {
      //alert("Login failed");
      setMessage(data.message || "Login failed"); // <-- SHOW ERROR MESSAGE
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
          className="w-full bg-green-500 p-3 rounded-xl"
        >
          Login
        </button>

        {message && (
          <p className="mt-4 text-green-400 text-sm">{message}</p>
        )}

        <div className="mt-6 p-4 rounded-xl bg-indigo-950/40 border border-indigo-900/50 text-xs text-gray-400">
          <p className="font-semibold text-white mb-1">⚡ Quick Demo Access:</p>
          <p>Email: <code className="text-indigo-300">jack01@gmail.com</code></p>
          <p>Password: <code className="text-indigo-300">123456</code></p>
        </div>
      </div>
    </div>
  );
}