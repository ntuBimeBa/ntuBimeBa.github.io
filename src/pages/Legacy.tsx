// 後端找資料指令: GET https://your-backend.com/api/legacy


import { useAuth } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { Input } from "@/components/ui/input";
import { Select, SelectItem, SelectContent, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAuthGuard } from "@/hooks/useAuthGuard";
import LoadingSpinner from "@/components/LoadinigSpinner";

type LegacyFile = {
  id: number;
  title: string;
  subject: string;
  date: string;
  url: string;
};

const Legacy = () => {
  const authChecked = useAuthGuard();
  const { token } = useAuth();
  const navigate = useNavigate();
  const [files, setFiles] = useState<LegacyFile[]>([]);
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("newest");

  useEffect(() => {
    if(!authChecked) return;

    const fetchFiles = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/legacy`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setFiles(Array.isArray(response.data.legacy) ? response.data.legacy : []);
      } catch (error) {
        console.error("無法取得系產資料：", error);
      }
    };

    fetchFiles();
  }, [authChecked, token, navigate]);

  // 篩選與排序
  const filtered = files
    .filter(f => f.title.includes(search) || f.subject.includes(search))
    .sort((a, b) => {
      if (sortBy === "newest") return b.date.localeCompare(a.date);
      if (sortBy === "oldest") return a.date.localeCompare(b.date);
      return a.subject.localeCompare(b.subject);
    });

  if (!authChecked || !token) {
    return(<LoadingSpinner />);
  }

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">系產服務資源</h1>

      <div className="flex gap-4 mb-6">
        <Input
          placeholder="搜尋標題或科目..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Select value={sortBy} onValueChange={setSortBy}>
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="選擇排序" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="newest">由新到舊</SelectItem>
            <SelectItem value="oldest">由舊到新</SelectItem>
            <SelectItem value="subject">按科目排序</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {filtered.length === 0 ? (
        <p className="text-muted-foreground">找不到符合條件的資源。</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((file) => (
            <Card key={file.id} className="transition hover:shadow-md">
              <CardHeader>
                <h2 className="text-lg font-semibold">{file.title}</h2>
                <p className="text-sm text-muted-foreground">{file.subject}</p>
                <p className="text-xs text-muted-foreground">{file.date}</p>
              </CardHeader>
              <CardContent>
                <Button
                  variant="link"
                  className="text-primary p-0"
                  onClick={() => window.open(file.url, "_blank")}
                >
                  查看檔案（不可下載）
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default Legacy;
