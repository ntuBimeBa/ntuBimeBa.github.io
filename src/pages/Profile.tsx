import { useAuthGuard } from "@/hooks/useAuthGuard";  // 假設你放在 hooks 資料夾

const ProfilePage = () => {
  useAuthGuard();  // ✅ 自動驗證登入

  return (
    <div>
      <h2>帳號管理頁面</h2>
    </div>
  );
};

export default ProfilePage;
