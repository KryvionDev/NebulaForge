const API=(import.meta.env.MODE==="development")?"http://localhost:4000/api/user":"/api/user";
export async function login(data){ const res=await fetch(`${API}/login`,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(data)}); return res.json(); }
export async function register(data){ const res=await fetch(`${API}/register`,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(data)}); return res.json(); }
