import { useEffect } from "react";
import { useAuth } from "@/context/AuthContext";

export const useAuthGuard = () => {
  const { verifyToken } = useAuth();

  useEffect(() => {
    const checkAuth = async () => {
      const verified = await verifyToken();
      if (!verified) {
        alert("您尚未登入，將跳轉至登入頁");
        window.location.href = import.meta.env.VITE_LINE_LOGIN_URI;
      }
    };

    checkAuth();
  }, [verifyToken]);
};
