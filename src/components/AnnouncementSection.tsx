
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { Announcement } from '@/lib/Structures';

const AnnouncementSection = () => {
  const announcements: Announcement[] = [
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
    }
  ];

  const navigate = useNavigate();

  return (
    <section className="py-16 bg-gradient-to-br from-secondary/30 to-accent/20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-primary mb-4 animate-fade-in-up">
            最新公告
          </h2>
          <div className="w-24 h-1 bg-primary mx-auto rounded-full"></div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {announcements.map((announcement, index) => (
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
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full hover:bg-primary hover:text-primary-foreground transition-colors"
                  onClick={announcement.url && (() => {
                    window.location.href=announcement.url;
                  })}
                >
                  閱讀更多
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button 
            variant="default" 
            size="lg"
            className="bg-primary hover:bg-primary/90 text-primary-foreground px-8"
            onClick={() => {
              navigate('announcement');
            }}
          >
            查看所有公告
          </Button>
        </div>
      </div>
    </section>
  );
};

export default AnnouncementSection;
