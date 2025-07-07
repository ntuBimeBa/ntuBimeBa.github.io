import { useAuth } from "@/context/AuthContext";
import { useState } from "react";

const Login = () => {
  const { setToken } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch(`${import.meta.env.VITE_API_URL}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    if (res.ok) {
      const data = await res.json();
      setToken(data.token); // 存 token
      alert("登入成功");
    } else {
      alert("登入失敗");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" className="border" />
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" className="border" />
      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">登入</button>
    </form>
  );
};

export default Login;
