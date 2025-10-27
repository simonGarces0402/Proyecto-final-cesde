import React, { useMemo } from "react";
import PieChart from "./PieChart";
import "../styles/card.css";
import "../api/Client";

function groupByType(requests) {
  return requests.reduce((acc, r) => {
    acc[r.type] = (acc[r.type] || 0) + 1;
    return acc;
  }, {});
}

export default function HUPAW1({ requests = [] }) {
  const { groups, top3 } = useMemo(() => {
    const grouped = groupByType(requests);
    const entries = Object.entries(grouped).map(([type, count]) => ({ type, count }));
    entries.sort((a, b) => b.count - a.count);
    return { groups: entries, top3: entries.slice(0, 3) };
  }, [requests]);

  return (
    <div className="card card-anim">
      <div className="card-grid">
        <div className="chart-area">
          <PieChart data={groups} />
        </div>
        <div className="info-area">
          <h3>Top 3 apoyos</h3>
          <ol>
            {top3.map((t) => (
              <li key={t.type}>
                <strong>{t.type}</strong> — {t.count} solicitudes
              </li>
            ))}
          </ol>

          <h4>Detalle por tipo</h4>
          <ul className="type-list">
            {groups.map((g) => (
              <li key={g.type}>
                {g.type} <span className="muted">({g.count})</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
  
}

