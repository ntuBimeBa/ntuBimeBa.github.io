import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useAuthGuard } from "@/hooks/useAuthGuard";
import { UserData } from "@/lib/Structures";

const ProfilePage = () => {
  const authChecked = useAuthGuard();  // ✅ 自動驗證登入
  const { getUserData } = useAuth();
  const [userData, setUserData] = useState<UserData | null>(null);

  useEffect(() => {
    if (!authChecked) return;  // 等待驗證完成再執行

    const fetchUserData = async () => {
      try {
        const data = await getUserData();
        setUserData(data);
        console.log("使用者資料：", data);
      } catch (error) {
        console.error("取得使用者資料失敗：", error);
      }
    };

    fetchUserData();
  }, [authChecked, getUserData]);

  if (!userData) {
    return <div>載入中...</div>;
  }

  return (
    <div>
      <h2>帳號管理頁面</h2>
      <p>姓名：{userData.real_name ?? "未提供"}</p>
      <p>學號：{userData.stu_id ?? "未提供"}</p>
      <p>帳號：{userData.username}</p>
      {/* 你可以加更多欄位 */}
    </div>
  );
};

export default ProfilePage;
