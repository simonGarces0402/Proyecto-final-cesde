import React, { useEffect, useState } from "react";
import Auth from "./components/Auth";
import Dashboard from "./components/Dashboard";
import { mockRequests } from "./data/mockRequests";
import "./styles/dashboard.css";
import "./components/Footer.jsx";

export default function App() {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem("app_current_user");
    return saved ? JSON.parse(saved) : null;
  });

  const [requests, setRequests] = useState(() => {
    const saved = localStorage.getItem("app_requests");
    if (saved) return JSON.parse(saved);
    localStorage.setItem("app_requests", JSON.stringify(mockRequests));
    return mockRequests;
  });

  useEffect(() => {
    if (user) localStorage.setItem("app_current_user", JSON.stringify(user));
    else localStorage.removeItem("app_current_user");
  }, [user]);

  return (
    <div className="app-root">
      {!user ? (
        <Auth onLogin={(u) => setUser(u)} />
      ) : (
        <Dashboard user={user} requests={requests} onLogout={() => setUser(null)} />
      )}
    </div>
  );
}
