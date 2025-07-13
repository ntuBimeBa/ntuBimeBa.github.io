import { useState } from "react";
import { toast } from "@/components/ui/sonner";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // 表單功能暫時停用，不會真的送出
  };

  const handleFormInteraction = () => {
    console.error("Email 登入功能開發中");
    toast.error("Email 登入功能開發中");
  };

  const handleLineLogin = () => {
    window.location.href = import.meta.env.VITE_LINE_LOGIN_URI;
  };

  return (
    <div className="space-y-6 flex flex-col w-1/4 my-20 mx-auto">
      <button
        onClick={handleLineLogin}
        className="bg-green-500 text-white px-8 py-5 rounded"
      >
        以 LINE 登入
      </button>

      <div
        onClick={handleFormInteraction}
        onMouseEnter={handleFormInteraction}
        className="space-y-4 opacity-50 cursor-not-allowed"
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="border w-full p-2"
            disabled
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="border w-full p-2"
            disabled
          />
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded w-full"
            disabled
          >
            登入
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
