import React, { useMemo } from "react";
import MonthlyChart from "./MonthlyChart";
import "../styles/card.css";
import "../api/Client";

function monthName(m) {
  return ["Ene","Feb","Mar","Abr","May","Jun","Jul","Ago","Sep","Oct","Nov","Dic"][m - 1];
}

export default function HUPAW2({ requests = [] }) {
  const grouped = useMemo(() => {
    const map = {};
    requests.forEach(r => {
      const dt = new Date(r.timestamp);
      const key = `${dt.getUTCFullYear()}-${String(dt.getUTCMonth() + 1).padStart(2,"0")}`;
      map[key] = (map[key] || 0) + 1;
    });
    const arr = Object.entries(map).map(([k, count]) => {
      const [y, m] = k.split("-");
      return { key: k, year: Number(y), month: Number(m), label: `${monthName(Number(m))} ${y}`, count };
    });
    arr.sort((a,b) => (a.year - b.year) || (a.month - b.month));
    return arr;
  }, [requests]);
  return (
    <div className="card card-anim">
      <div className="section-content">
        <MonthlyChart data={grouped} />
        <div className="month-list">
          <h4>Conteo por mes</h4>
          <ul>
            {grouped.map(g => (
              <li key={g.key}>
                {g.label} <span className="muted">({g.count})</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}