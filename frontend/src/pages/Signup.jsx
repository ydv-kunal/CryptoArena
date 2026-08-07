import { useState } from "react";
export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");       // <-- ADDED USERNAME STATE
  const [message, setMessage] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      // const res = await fetch("http://3.108.215.35:5100/auth/signup", {
      const apiUrl = (import.meta.env.VITE_API_URL || "http://localhost:5100").replace(/\/$/, "");
      const res = await fetch(`${apiUrl}/auth/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,                                    // <-- INCLUDE USERNAME IN REQUEST BODY
          email,
          password,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage(data.message || "Signup successful! Redirecting to login...");
        setTimeout(() => {
          window.location.href = "/login";
        }, 1500);
      } else {
        setMessage(data.message || "Signup failed");
      }
    } catch (err) {
      console.log("Signup error:", err);
      setMessage("Signup failed. Unable to reach server.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white">
      <form
        onSubmit={handleSignup}
        className="bg-gray-900 p-8 rounded-xl w-[400px]"
      >
        <h1 className="text-3xl font-bold text-white mb-6">
          Signup
        </h1>

        <input
          type="text"
          placeholder="Enter Username"
          className="w-full p-3 mb-4 rounded bg-black text-white border border-gray-700"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />

        <input
          type="email"
          placeholder="Enter Email"
          className="w-full p-3 mb-4 rounded bg-black text-white border border-gray-700"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Enter Password"
          className="w-full p-3 mb-6 rounded bg-black text-white border border-gray-700"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button
          type="submit"
          className="w-full bg-green-500 hover:bg-green-600 font-semibold text-black p-3 rounded-xl transition-colors"
        >
          Signup
        </button>

        {message && (
          <p className={`mt-4 text-sm font-semibold ${message.toLowerCase().includes("failed") || message.toLowerCase().includes("unable") ? "text-rose-400" : "text-green-400"}`}>{message}</p>
        )}

        <p className="mt-6 text-center text-xs text-gray-400">
          Already have an account?{" "}
          <a href="/login" className="text-green-400 hover:underline font-semibold">
            Log in here
          </a>
        </p>
      </form>
    </div>
  );
}