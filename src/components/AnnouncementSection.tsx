import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Announcement } from '@/lib/Structures';

export const announcements: Announcement[] = [
  {
    id: 1,
    title: "迎新茶會",
    content: "歡迎大一新生來參加迎新茶會！時間：9月15日下午2點，地點：系館1樓交誼廳。將有學長姐分享經驗，還有豐富的茶點招待。",
    date: "2025-01-06",
    isNew: true,
    url: "https://www.google.com",
  },
  {
    id: 2,
    title: "系烤報名開始",
    content: "請至系學會辦公室領取報名表。報名費用：100元，包含烤肉食材和飲料。活動時間：9月22日晚上6點至9點。",
    date: "2025-01-05",
    isNew: true
  },
  {
    id: 3,
    title: "學術講座通知",
    content: "邀請業界專家分享「生物機電工程的未來發展」，歡迎所有同學參與。講座將提供學習時數認證。",
    date: "2025-01-03",
    isNew: false
  },
  {
    id: 4,
    title: "學術講座通知",
    content: "邀請業界專家分享「生物機電工程的未來發展」，歡迎所有同學參與。講座將提供學習時數認證。",
    date: "2025-01-03",
    isNew: false
  },
  {
    id: 5,
    title: "學術講座通知",
    content: "邀請業界專家分享「生物機電工程的未來發展」，歡迎所有同學參與。講座將提供學習時數認證。",
    date: "2025-01-03",
    isNew: false
  },
  // 可再擴充更多公告
];

type Props = {
  mode?: 'home' | 'full'; // 預設是 full
};

const AnnouncementSection = ({ mode = 'full' }: Props) => {
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const selected = announcements.find((a) => a.id === selectedId);

  const displayList = mode === 'home' ? announcements.slice(0, 3) : announcements;

  if (selectedId !== null && selected) {
    return (
      <section className="py-16 bg-white">
        <div className="max-w-3xl mx-auto px-4">
          <Button onClick={() => setSelectedId(null)} className="mb-6">
            ← 返回公告列表
          </Button>
          <h1 className="text-3xl font-bold mb-4">{selected.title}</h1>
          <p className="text-sm text-muted-foreground mb-2">{selected.date}</p>
          <p className="text-base leading-relaxed whitespace-pre-wrap">{selected.content}</p>
          {selected.url && (
            <a
              href={selected.url}
              className="inline-block mt-4 text-blue-600 underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              延伸連結
            </a>
          )}
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-gradient-to-br from-secondary/30 to-accent/20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-primary mb-4">最新公告</h2>
          <div className="w-24 h-1 bg-primary mx-auto rounded-full"></div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {displayList.map((announcement, index) => (
            <Card
              key={announcement.id}
              className="hover:shadow-lg transition-all duration-300 hover:scale-105"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <CardTitle className="text-lg font-semibold text-primary line-clamp-2">
                    {announcement.title}
                  </CardTitle>
                  {announcement.isNew && (
                    <Badge variant="default" className="ml-2 shrink-0">
                      NEW
                    </Badge>
                  )}
                </div>
                <p className="text-sm text-muted-foreground">
                  {announcement.date}
                </p>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-foreground/80 line-clamp-3 mb-4">
                  {announcement.content}
                </p>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full"
                  onClick={() => setSelectedId(announcement.id)}
                >
                  閱讀更多
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AnnouncementSection;