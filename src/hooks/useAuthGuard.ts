import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";

export const useAuthGuard = (ref?: string | "/", redirect: boolean=true) => {
  const { verifyToken, loading, setReferrer } = useAuth();
  const [checked, setChecked] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (loading) return;

    const checkAuth = async () => {
      const verified = await verifyToken();
      if (!verified) {
        alert("您尚未登入，將跳轉至登入頁");
        setReferrer(ref);
        if (redirect) navigate('/login');
      } else {
        setChecked(true);
      }
    };

    checkAuth();
  }, [loading, verifyToken]);

  return checked;  // ✅ 回傳驗證狀態
};