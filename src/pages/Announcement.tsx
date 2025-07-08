// AnnouncementPage.tsx
import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { announcements } from '@/components/AnnouncementSection'; // 引入公告資料

const Announcement = () => {
  const [allAnnouncements, setAllAnnouncements] = useState(announcements);

  useEffect(() => {
    // 這裡可以從後端獲取公告資料（例如 fetch('/api/announcements')）
    // 假設目前使用的是靜態資料
    setAllAnnouncements(announcements);
  }, []);

  return (
    <section className="py-16 bg-gradient-to-br from-secondary/30 to-accent/20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-primary mb-4 animate-fade-in-up">
            所有公告
          </h2>
          <div className="w-24 h-1 bg-primary mx-auto rounded-full"></div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {allAnnouncements.map((announcement, index) => (
            <Card
              key={announcement.id}
              className="hover:shadow-lg transition-all duration-300 hover:scale-105 animate-slide-in-right"
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
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Announcement;
