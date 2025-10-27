import React from "react";
import "../styles/chart.css";

export default function MonthlyChart({ data = [] }) {
  const max = Math.max(...data.map(d => d.count), 1);
  const w = 500, h = 120;
  const barWidth = data.length ? Math.floor(w / data.length) - 8 : 0;

  return (
    <div className="monthly-chart">
      <svg viewBox={`0 0 ${w} ${h}`} className="bar-chart" role="img" aria-label="Gráfico mensual">
        {data.map((d, i) => {
          const barH = (d.count / max) * (h - 30);
          const x = i * (barWidth + 8) + 20;
          const y = h - barH - 20;
          const color = `hsl(${(i * 45) % 360} 75% 50%)`;
          return (
            <g key={d.key}>
              <rect x={x} y={y} width={barWidth} height={barH} rx="6" fill={color} />
              <text x={x + barWidth / 2} y={h - 5} fontSize="10" textAnchor="middle">{d.label}</text>
              <text x={x + barWidth / 2} y={y - 4} fontSize="10" textAnchor="middle" className="muted">{d.count}</text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}