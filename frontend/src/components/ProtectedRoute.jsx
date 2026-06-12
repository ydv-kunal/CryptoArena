import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const [loading, setLoading] = useState(true);
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    const verifyToken = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        setLoading(false);
        return;
      }

      try {
        // const res = await fetch("http://localhost:5100/auth/verify", {
        const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:5100";
        const res = await fetch(`${apiUrl}/auth/verify`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (res.ok) {
          setIsValid(true);
        } else {
          localStorage.removeItem("token");
          localStorage.removeItem("username");
        }
      } catch (err) {
        localStorage.removeItem("token");
        localStorage.removeItem("username");
      }

      setLoading(false);
    };

    verifyToken();
  }, []);

  if (loading) return <div>Loading...</div>;

  return isValid ? children : <Navigate to="/login" />;
}



// import { Navigate } from "react-router-dom";

// export default function ProtectedRoute({ children }) {
//   const token = localStorage.getItem("token");

//   if (!token) {
//     return <Navigate to="/login" />;
//   }

//   return children;
// }