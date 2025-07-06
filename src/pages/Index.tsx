
import Navigation from '@/components/Navigation';
import HeroSection from '@/components/HeroSection';
import AnnouncementSection from '@/components/AnnouncementSection';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <HeroSection />
      <AnnouncementSection />
      <Footer />
    </div>
  );
};

export default Index;
