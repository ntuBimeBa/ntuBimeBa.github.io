
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Routes, Route, HashRouter } from "react-router-dom";
import Index from "./pages/Index";
import Members from "./pages/Members";
import Legacy from "./pages/Legacy";
import Resources from "./pages/Resources";
import Activities from "./pages/Activities";
import Documents from "./pages/Documents";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import Layout from "./Layout";
import Announcement from "./pages/Announcement";
import { AuthProvider } from "./context/AuthContext";
import LineLogin from "./pages/LineLogin";
import ProfilePage from "./pages/Profile";
import AnnouncementSection from "./components/AnnouncementSection";
import Login from "./pages/Login";
import LogoutPage from "./pages/Logout";
import CompleteProfileForm from "./pages/Login_CompleteAction";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <HashRouter>
        <Routes>
          <Route path="/" element={<Layout />}>

            {/* 各主框架路由設置 */}
            <Route index element={<Index />} />
            <Route path="members" element={<Members />} />
            <Route path="resources" element={<Resources />} />
            <Route path="activities" element={<Activities />} />
            <Route path="documents" element={<Documents />} />
            <Route path="contact" element={<Contact />} />
            <Route path="announcement" element={<Announcement />} />
            <Route path="line-login" element={<LineLogin />} />
            <Route path="login" element={<Login />} />
            <Route path="logout" element={<LogoutPage />} />
            <Route path="profile" element={<ProfilePage />} />

            {/* 初次登入的設定頁面 */}
            <Route path="login-complete-action" element={<CompleteProfileForm />} />

            {/* 公告加入動態路由 */}
            <Route path="/announcement/:id" element={<AnnouncementSection />} />

            {/* 系產搜尋跳轉路由 */}
            <Route path="/legacy" element={<Legacy />} />

            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </HashRouter>
    </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
