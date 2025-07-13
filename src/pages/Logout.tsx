import { useAuth } from "@/context/AuthContext";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { DoorOpen } from "lucide-react";

const LogoutPage = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    logout();
    const timer = setTimeout(() => {
      navigate("/");
    }, 5000);

    return () => clearTimeout(timer);  // 清理 timer
  }, []);

  const handleGoHome = () => {
    navigate("/");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-100 to-indigo-200 text-center p-6">
      <div className="space-y-6 animate-fade-in">
        <DoorOpen className="w-24 h-24 text-primary mx-auto" />
        <h1 className="text-2xl md:text-4xl font-semibold text-gray-800">
          登出成功！
        </h1>
        <p className="text-gray-600 text-lg">
          下次回來幫我們帶個披薩！
        </p>
        <button
          onClick={handleGoHome}
          className="mt-4 bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary/90 transition"
        >
          回到首頁
        </button>
      </div>
    </div>
  );
};

export default LogoutPage;
