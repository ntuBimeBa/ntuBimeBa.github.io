import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useAuthGuard } from "@/hooks/useAuthGuard";
import { UserData, Notification, DashboardLegacyFile, DashboardTodoItem } from "@/lib/Structures";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import LoadingSpinner from "@/components/LoadinigSpinner";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

// 🔧 自訂元件
import TabSwitcher from "@/components/TabSwitcher";
import NotificationItem from "@/components/Dashboard/NotificationItem";
import DashboardLegacyFileItem from "@/components/Dashboard/LegacyFile";
import TodoItemCard from "@/components/Dashboard/TodoItemCard";
import { mockNotifications } from "@/test/mockData/mockNotifications";
import { mockDashboardLegacyFile } from "@/test/mockData/mockDashboardLegacyFile";
import { mockDashboardTodos } from "@/test/mockData/mockDashboardTodos";

const DashboardPage = () => {
  // 模擬 hook 行為
  const getUserNotifications = async () => mockNotifications;
  const getUserFiles = async () => mockDashboardLegacyFile;
  const getUserTodos = async () => mockDashboardTodos;

  const authChecked = useAuthGuard("/profile");
  const { getUserData } = useAuth();
  const [userData, setUserData] = useState<UserData | null>(null);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [files, setFiles] = useState<DashboardLegacyFile[]>([]);
  const [todos, setTodos] = useState<DashboardTodoItem[]>([]);
  const [currentTab, setCurrentTab] = useState("notifications");

  const navigate = useNavigate();

  useEffect(() => {
    if (!authChecked) return;

    const fetchAllData = async () => {
      try {
        const [user, notis, files, todos] = await Promise.all([
          getUserData(),
          getUserNotifications(),
          getUserFiles(),
          getUserTodos(),
        ]);
        setUserData(user);
        setNotifications(notis);
        setFiles(files);
        setTodos(todos);
      } catch (error) {
        console.error("資料載入失敗：", error);
      }
    };

    fetchAllData();
  }, [authChecked]);

  if (!userData) return <LoadingSpinner />;

  return (
    <div className="py-16 px-4 pt-24">
      {/* 🧾 基本資料 */}
      <Card className="shadow-lg border border-border animate-fade-in w-full max-w-2xl mx-auto mb-8">
        <CardHeader>
          <CardTitle className="text-2xl text-center text-primary font-bold">帳號管理</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-foreground">
          <Detail label="姓名" value={userData.real_name ?? "未提供"} />
          <Detail label="學號" value={userData.stu_id ?? "未提供"} />
          <Detail label="帳號" value={userData.username} />
          <Detail label="Email" value={userData.email ?? "未提供"} />
          <Detail label="Discord ID" value={userData.discord ?? "未提供"} />
          <Detail label="系學會費" value={userData.sa_fee ? "已繳交" : "未繳交"} />
        </CardContent>
        <Button
          variant="destructive"
          size="lg"
          className="mx-auto mb-5 flex"
          onClick={() => navigate("/logout")}
        >
          登出
        </Button>
      </Card>

      {/* 📁 Tabs 區塊 */}
      <TabSwitcher
        tabs={[
          { key: "notifications", label: "通知列表" },
          { key: "files", label: "上傳系產" },
          { key: "todos", label: "待辦事項" },
        ]}
        activeKey={currentTab}
        onTabChange={setCurrentTab}
      />

      <div className="max-w-3xl mx-auto mt-6 space-y-4">
        {currentTab === "notifications" && (
          notifications
            .sort((a, b) => (b.unread ? 1 : 0) - (a.unread ? 1 : 0) || new Date(b.date).getTime() - new Date(a.date).getTime())
            .map(noti => <NotificationItem key={noti.id} notification={noti} />)
        )}

        {currentTab === "files" && (
          files
            .sort((a, b) => new Date(b.uploadedAt).getTime() - new Date(a.uploadedAt).getTime())
            .map(file => <DashboardLegacyFileItem key={file.id} file={file} />)
        )}

        {currentTab === "todos" && (
          todos
            .sort((a, b) => new Date(a.due).getTime() - new Date(b.due).getTime())
            .map(todo => <TodoItemCard key={todo.id} todo={todo} />)
        )}
      </div>
    </div>
  );
};

// 子元件: 欄位顯示
const Detail = ({ label, value }: { label: string; value: string }) => (
  <div className="flex justify-between border-b pb-2">
    <span className="text-muted-foreground">{label}</span>
    <span>{value}</span>
  </div>
);

export default DashboardPage;
