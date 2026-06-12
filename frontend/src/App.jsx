import { Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import Dashboard from "./pages/Dashboard";
import Trade from "./pages/Trade";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ProtectedRoute from "./components/ProtectedRoute";
import History from "./pages/History";

// ─── NEW IMPORTS WITH ABOUT ROUTE ADDED ────────────────────────────────────────
import About from "./pages/About";

function App() {
// ==========================================
// ORIGINAL ROUTES (COMMENTED OUT)
// ==========================================
//   return (
//     <Routes>
//       <Route path="/" element={<Landing />} />
//       <Route path="/login" element={<Login />} />
//       <Route path="/signup" element={<Signup />} />
//       <Route
//         path="/dashboard"
//         element={
//           <ProtectedRoute>
//             <Dashboard />
//           </ProtectedRoute>
//         }
//       />
//       <Route
//         path="/trade"
//         element={
//           <ProtectedRoute>
//             <Trade />
//           </ProtectedRoute>
//         }
//       />
//       <Route
//         path="/history"
//         element={
//           <ProtectedRoute>
//             <History />
//           </ProtectedRoute>
//         }
//       />
//     </Routes>
//   );

  // ─── UPGRADED ROUTES WITH ABOUT ROUTE WIRING ─────────────────────────────────
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/about" element={<About />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/trade"
        element={
          <ProtectedRoute>
            <Trade />
          </ProtectedRoute>
        }
      />
      <Route
        path="/history"
        element={
          <ProtectedRoute>
            <History />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;