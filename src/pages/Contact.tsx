
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

const Contact = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <main className="py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-primary mb-8 text-center">連絡我們</h1>
          <p className="text-center text-muted-foreground">連絡我們頁面正在建置中...</p>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Contact;
