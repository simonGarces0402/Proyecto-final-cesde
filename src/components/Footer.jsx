import React from "react";
import "../styles/footer.css";

export default function Footer() {
  return (
    <footer className="app-footer">
      <div className="footer-inner">
        <div className="footer-left">PROYECTO-FINAL-CESDE</div>
        <div className="footer-center">Analítica de solicitudes · HUPAW1 · HUPAW2</div>
        <div className="footer-right">© {new Date().getFullYear()}</div>
      </div>
    </footer>
  );
}