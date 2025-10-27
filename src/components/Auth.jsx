import React, { useState, useEffect } from "react";
import "../styles/auth.css";
import api from "../api/Client";

const USERS_KEY = "app_users";

function getUsers() {
  const raw = localStorage.getItem(USERS_KEY);
  return raw ? JSON.parse(raw) : [];
}
function saveUser(user) {
  const users = getUsers();
  users.push(user);
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}


export default function Auth({ onLogin }) {
  const [isRegisterMode, setIsRegisterMode] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [bgChoice, setBgChoice] = useState(() => localStorage.getItem("auth_bg") || "#0f172a");
  const [error, setError] = useState("");

  useEffect(() => {
    localStorage.setItem("auth_bg", bgChoice);
  }, [bgChoice]);

  function handleChange(e) {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function register(e) {
    e.preventDefault();
    setError("");
    if (!form.email || !form.password || !form.name) {
      setError("Completa todos los campos");
      return;
    }
    const users = getUsers();
    if (users.some(u => u.email === form.email)) {
      setError("Ya existe un usuario con ese email");
      return;
    }
    const newUser = { id: Date.now(), name: form.name, email: form.email, password: form.password };
    saveUser(newUser);
    setForm({ name: "", email: "", password: "" });
    setIsRegisterMode(false);
    setTimeout(() => onLogin({ id: newUser.id, name: newUser.name, email: newUser.email }), 300);
  }

  function login(e) {
    e.preventDefault();
    setError("");
    const users = getUsers();
    const found = users.find(u => u.email === form.email && u.password === form.password);
    if (!found) {
      setError("Credenciales incorrectas");
      return;
    }
    onLogin({ id: found.id, name: found.name, email: found.email });
  }

  return (
    <div className="auth-page" style={{ background: bgChoice }}>
      <div className="auth-card card-anim">
        <h2 className="auth-title">{isRegisterMode ? "Registro" : "Iniciar sesión"}</h2>

        <form onSubmit={isRegisterMode ? register : login} className="auth-form">
          {isRegisterMode && (
            <label className="field">
              <span>Nombre</span>
              <input name="name" value={form.name} onChange={handleChange} />
            </label>
          )}
          <label className="field">
            <span>Email</span>
            <input name="email" type="email" value={form.email} onChange={handleChange} />
          </label>
          <label className="field">
            <span>Contraseña</span>
            <input name="password" type="password" value={form.password} onChange={handleChange} />
          </label>

          {error && <div className="auth-error">{error}</div>}

          <div className="auth-actions">
            <button type="submit" className="btn primary">
              {isRegisterMode ? "Registrar" : "Iniciar sesión"}
            </button>
            <button
              type="button"
              className="btn ghost"
              onClick={() => {
                setIsRegisterMode(!isRegisterMode);
                setError("");
              }}
            >
              {isRegisterMode ? "¿Ya tienes cuenta? Iniciar" : "¿No tienes cuenta? Registrar"}
            </button>
          </div>


        </form>
      </div>
    </div>
  );
}