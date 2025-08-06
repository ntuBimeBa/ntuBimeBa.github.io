import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useAuthGuard } from "@/hooks/useAuthGuard";
import { UserData } from "@/lib/Structures";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import LoadingSpinner from "@/components/LoadinigSpinner";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const ProfilePage = () => {
  const authChecked = useAuthGuard('/profile');
  const { getUserData } = useAuth();
  const [userData, setUserData] = useState<UserData | null>(null);

  const navigate = useNavigate();

  useEffect(() => {
    if (!authChecked) return;

    const fetchUserData = async () => {
      try {
        const data = await getUserData();
        setUserData(data);
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
      <Card className="shadow-lg border border-border animate-fade-in w-full max-w-2xl mx-auto flex flex-col flex-wrap content-stretch">
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
        <Button 
          variant="destructive"
          size="lg"
          className="bg-destructive hover:bg-destructive/80 text-primary-foreground px-8 py-3 text-lg mx-auto mb-5"
          onClick={() => navigate('/logout')}
        >登出</Button>
      </Card>
    </div>
  );
};

export default ProfilePage;
