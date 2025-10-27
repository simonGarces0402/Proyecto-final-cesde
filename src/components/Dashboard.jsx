import React from "react";
import HUPAW1 from "./Hupaw1";
import HUPAW2 from "./Hupaw2";
import "../styles/dashboard.css";

export default function Dashboard({ user, requests, onLogout }) {
  return (
    <div className="dashboard-root">
      <header className="dashboard-header">
        <div>
          <h1>Dashboard</h1>
          <p className="muted">Analítica de solicitudes</p>
        </div>
        <div className="header-actions">
          <div className="user-pill">Hola, {user.name}</div>
          <button className="btn danger" onClick={onLogout}>Cerrar sesión</button>
        </div>
      </header>

      <main className="dashboard-main">
        <section className="section hupaw-card">
          <h2>HUPAW1 — Tipos de apoyo</h2>
          <HUPAW1 requests={requests} />
        </section>

        <section className="section hupaw-card">
          <h2>HUPAW2 — Frecuencia por mes</h2>
          <HUPAW2 requests={requests} />
        </section>
      </main>
    </div>
  );
}