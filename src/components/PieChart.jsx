import React from "react";
import "../styles/chart.css";

function polarToCartesian(cx, cy, r, angle) {
  const rad = (angle - 90) * (Math.PI / 180.0);
  return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
}

export default function PieChart({ data = [] }) {
  const total = data.reduce((s, d) => s + d.count, 0);
  const colors = ["#4f46e5", "#06b6d4", "#f97316", "#ef4444", "#10b981", "#a78bfa"];
  let startAngle = 0;
  const cx = 100, cy = 100, r = 80;

  return (
    <svg viewBox="0 0 200 200" className="pie-chart" role="img" aria-label="Gráfico de pastel">
      {data.map((d, i) => {
        const angle = (d.count / total) * 360;
        const endAngle = startAngle + angle;
        const start = polarToCartesian(cx, cy, r, endAngle);
        const end = polarToCartesian(cx, cy, r, startAngle);
        const large = angle > 180 ? 1 : 0;
        const pathData = `M ${cx} ${cy} L ${start.x} ${start.y} A ${r} ${r} 0 ${large} 0 ${end.x} ${end.y} Z`;
        const color = colors[i % colors.length];
        startAngle += angle;
        return <path key={d.type} d={pathData} fill={color} stroke="#fff" strokeWidth="1" />;
      })}
      <circle cx={cx} cy={cy} r={40} fill="#fff" />
      <text x={cx} y={cy} textAnchor="middle" dy="5" className="pie-center">
        {total}
      </text>
    </svg>
  );
}