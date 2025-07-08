import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";

export const useAuthGuard = () => {
  const { verifyToken, loading } = useAuth();
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    if (loading) return;

    const checkAuth = async () => {
      const verified = await verifyToken();
      if (!verified) {
        alert("您尚未登入，將跳轉至登入頁");
        window.location.href = import.meta.env.VITE_LINE_LOGIN_URI;
      } else {
        setChecked(true);
      }
    };

    checkAuth();
  }, [loading, verifyToken]);

  return checked;  // ✅ 回傳驗證狀態
};