
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const HeroSection = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  return (
    <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden">
      {/* 背景圖片 */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url('/placeholder.svg')`
        }}
      >
        {/* 可替換的圖片佔位符 */}
        <div className="absolute inset-0 bg-gradient-to-r from-primary/80 to-accent/60 flex items-center justify-center">
          <div className="text-center text-white p-8 bg-black/20 rounded-lg backdrop-blur-sm">
            <img
            src="https://webpageprod-ws.ntu.edu.tw/001/Upload/1109/relpic/63989/99773/c153b887-112a-44c7-a72b-01c245f1621e.jpg"  // 這邊放你的圖片 URL
            alt="橫幅圖片"
            className="w-full h-full object-cover rounded-lg opacity-40" // 可在此調整圖片顯示效果
            />
          </div>
        </div>
      </div>

      {/* 內容覆蓋層 */}
      <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-fade-in-up">
          {t('hero.title')}
        </h1>
        <p className="text-lg md:text-xl mb-8 opacity-90 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
          {t('hero.subtitle')}
        </p>
        <p className="text-base md:text-lg mb-12 opacity-80 max-w-2xl mx-auto animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
          {t('hero.description')}
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
          <Button
            size="lg"
            className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-3 text-lg"
            onClick={() => navigate('/members')}
          >
            {t('hero.learn_more')}
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="border-white text-black hover:bg-white hover:text-primary px-8 py-3 text-lg"
            onClick={() => navigate('/contact')}
          >
            {t('hero.contact_us')}
          </Button>
        </div>
      </div>

      {/* 裝飾性波浪 */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1200 120" className="w-full h-12 fill-background">
          <path d="M0,60 C300,120 900,0 1200,60 L1200,120 L0,120 Z" />
        </svg>
      </div>
    </section>
  );
};

export default HeroSection;
