// src/user/auth.js
const API = (import.meta.env.MODE === "development")
  ? "http://localhost:4000/api/user"
  : "/api/user";

export class UserAuth {
  static API = API;

  static async login(data) {
    const res = await fetch(`${API}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    return res.json();
  }

  static async register(data) {
    const res = await fetch(`${API}/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    return res.json();
  }

  static logout() {
    localStorage.removeItem("token");
  }

  static isLogged() {
    return !!localStorage.getItem("token");
  }
}
