import { Mail, Facebook, Instagram, MessageCircleMore } from 'lucide-react';
import { Card, CardHeader, CardContent } from '@/components/ui/card';

const Contact = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-16 bg-gradient-to-br from-secondary/20 to-accent/20">
      <Card className="max-w-xl w-full shadow-lg">
        <CardHeader>
          <h2 className="text-3xl font-bold text-primary text-center mb-4">聯絡我們</h2>
          <p className="text-muted-foreground text-center">
            有任何問題、建議或合作意願，歡迎透過以下方式聯絡我們。
          </p>
        </CardHeader>
        <CardContent className="space-y-6 px-16">
          <div className="flex items-center space-x-4">
            <Mail className="text-primary" />
            <span className="text-base break-all">
              <a href="mailto:ntubimeba@gmail.com" className="hover:underline">
                ntu.bimeba@gmail.com
              </a>
            </span>
          </div>

          <div className="flex items-center space-x-4">
            <Facebook className="text-blue-600" />
            <a
              href="https://www.facebook.com/ntubimecamp"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline text-primary"
            >
              Facebook 粉專 @臺大生機系學會
            </a>
          </div>

          <div className="flex items-center space-x-4">
            <Instagram className="text-pink-500" />
            <a
              href="https://www.instagram.com/ntubimeba"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline text-primary"
            >
              Instagram @ntubimeba
            </a>
          </div>

          <div className="flex items-center space-x-4">
            <MessageCircleMore className="text-neutral-700" />
            <a
              href="https://www.threads.net/@ntubimeba"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline text-primary"
            >
              Threads @ntubimeba
            </a>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Contact;
