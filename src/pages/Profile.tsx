import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useAuthGuard } from "@/hooks/useAuthGuard";
import { UserData } from "@/lib/Structures";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import LoadingSpinner from "@/components/LoadinigSpinner";

const ProfilePage = () => {
  const authChecked = useAuthGuard('/profile');
  const { getUserData } = useAuth();
  const [userData, setUserData] = useState<UserData | null>(null);

  useEffect(() => {
    if (!authChecked) return;

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
    return(<LoadingSpinner />);
  }

  return (
    <div className="py-16 px-4 pt-24">
      <Card className="shadow-lg border border-border animate-fade-in w-full max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl text-center text-primary font-bold">
            帳號管理
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-foreground">
          <div className="flex justify-between border-b pb-2">
            <span className="text-muted-foreground">姓名</span>
            <span>{userData.real_name ?? "未提供"}</span>
          </div>
          <div className="flex justify-between border-b pb-2">
            <span className="text-muted-foreground">學號</span>
            <span>{userData.stu_id ?? "未提供"}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">帳號</span>
            <span>{userData.username}</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProfilePage;
