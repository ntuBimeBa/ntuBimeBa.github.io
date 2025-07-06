
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const HeroSection = () => {
  const navigate = useNavigate();
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
            <div className="text-6xl mb-4">🎓</div>
            <p className="text-lg opacity-90">學生活動與系學會形象</p>
            <p className="text-sm opacity-75 mt-2">請上傳您的橫幅圖片來替換此佔位符</p>
          </div>
        </div>
      </div>

      {/* 內容覆蓋層 */}
      <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-fade-in-up">
          臺大生機系學會
        </h1>
        <p className="text-lg md:text-xl mb-8 opacity-90 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
          國立臺灣大學生物機電工程學系學生會
        </p>
        <p className="text-base md:text-lg mb-12 opacity-80 max-w-2xl mx-auto animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
          連結同學情誼，促進學術交流，創造豐富精彩的大學生活體驗
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
          <Button 
            size="lg" 
            className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-3 text-lg"
            onClick={() => navigate('/members')}
          >
            了解更多
          </Button>
          <Button 
            variant="outline" 
            size="lg"
            className="border-white text-black hover:bg-white hover:text-primary px-8 py-3 text-lg"
            onClick={() => navigate('/contact')}
          >
            聯絡我們
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
