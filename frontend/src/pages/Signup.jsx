import { useState } from "react";
export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");       // <-- ADDED USERNAME STATE
  const [message, setMessage] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      // const res = await fetch("http://localhost:5100/auth/signup", {
      const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:5100";
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

      //alert(data.message);
      setMessage(data.message); // <-- SHOW SUCCESS MESSAGE

      // After successful signup, redirect to login page after a short delay
      setTimeout(() => {
        window.location.href = "/login";
      }, 5000); // 5-second delay to show message before redirecting

      // redirect to login page
      //window.location.href = "/login";

    } catch (err) {
      console.log(err);
      //alert("Signup failed");
      setMessage("Signup failed"); // <-- SHOW ERROR MESSAGE
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black">
      <form
        onSubmit={handleSignup}
        className="bg-gray-900 p-8 rounded-xl w-[400px]"
      >
        <h1 className="text-3xl font-bold text-white mb-6">
          Signup
        </h1>

        <input                                // <-- ADDED USERNAME INPUT FIELD
          type="text"
          placeholder="Enter First Name"
          className="w-full p-3 mb-4 rounded bg-black text-white border border-gray-700"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />


        <input
          type="email"
          placeholder="Enter email"
          className="w-full p-3 mb-4 rounded bg-black text-white border border-gray-700"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Enter password"
          className="w-full p-3 mb-6 rounded bg-black text-white border border-gray-700"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          type="submit"
          className="w-full bg-green-500 hover:bg-green-600 text-white p-3 rounded"
        >
          Signup
        </button>

        {message && (
          <p className="mt-4 text-green-400 text-sm">{message}</p>
        )}
      </form>
    </div>
  );
}