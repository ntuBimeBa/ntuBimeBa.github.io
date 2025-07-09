/*

注意：必須有以下後端 API：

GET /api/activities：回傳簡略資訊（id, title, date, summary）

GET /api/activities/:id：回傳詳細資訊（title, date, description, imageUrl）

若 React 專案沒裝 @/components/ui/dialog，這些 Dialog 元件是 shadcn/ui 套件中的，可以自行改用 <Modal>。

這份程式碼是完全與 Node.js 後端串接為主，不依賴任何本地 JSON 或 hardcoded 資料。

*/

import { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription
} from '@/components/ui/dialog';
import { Loader } from 'lucide-react';

interface Activity {
  id: number;
  title: string;
  date: string;
  summary: string;
}

interface ActivityDetail extends Activity {
  description: string;
  imageUrl?: string;
}

const Activities = () => {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [selectedActivity, setSelectedActivity] = useState<ActivityDetail | null>(null);
  const [loading, setLoading] = useState(false);

  // 取得所有活動列表
  useEffect(() => {
    axios.get('/api/activities')
      .then((res) => setActivities(res.data))
      .catch((err) => console.error('Failed to fetch activities', err));
  }, []);

  // 當選擇某活動時，fetch 詳細資料
  const handleCardClick = async (id: number) => {
    setSelectedId(id);
    setLoading(true);
    try {
      const res = await axios.get(`/api/activities/${id}`);
      setSelectedActivity(res.data);
    } catch (err) {
      console.error('Failed to fetch activity detail', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen py-16 px-6 bg-gradient-to-br from-secondary/30 to-accent/20">
      <h1 className="text-3xl font-bold text-primary text-center mb-8">活動資訊</h1>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
        {activities.map((activity) => (
          <Dialog key={activity.id}>
            <DialogTrigger asChild>
              <Card
                onClick={() => handleCardClick(activity.id)}
                className="hover:shadow-lg transition hover:scale-105 cursor-pointer"
              >
                <CardHeader>
                  <CardTitle className="text-xl font-semibold">{activity.title}</CardTitle>
                  <p className="text-sm text-muted-foreground">{activity.date}</p>
                </CardHeader>
                <CardContent>
                  <p className="text-foreground/80 line-clamp-3">{activity.summary}</p>
                </CardContent>
              </Card>
            </DialogTrigger>

            <DialogContent className="max-w-xl">
              {loading || selectedActivity?.id !== activity.id ? (
                <div className="flex justify-center items-center h-40">
                  <Loader className="animate-spin" />
                </div>
              ) : (
                <>
                  <DialogHeader>
                    <DialogTitle>{selectedActivity.title}</DialogTitle>
                    <DialogDescription className="text-sm text-muted-foreground">
                      {selectedActivity.date}
                    </DialogDescription>
                  </DialogHeader>
                  {selectedActivity.imageUrl && (
                    <img
                      src={selectedActivity.imageUrl}
                      alt={selectedActivity.title}
                      className="w-full rounded-md mb-4"
                    />
                  )}
                  <p className="whitespace-pre-line leading-relaxed text-foreground/90">
                    {selectedActivity.description}
                  </p>
                </>
              )}
            </DialogContent>
          </Dialog>
        ))}
      </div>
    </div>
  );
};

export default Activities;
