
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useTranslation } from 'react-i18next';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { t, i18n } = useTranslation();

  const toggleLanguage = () => {
    i18n.changeLanguage(i18n.language.startsWith('zh') ? 'en' : 'zh');
  };

  const navItems = [
    { label: t('navigation.home'), path: '/' },
    { label: t('navigation.members'), path: '/members' },
    { label: t('navigation.legacy'), path: '/legacy' },
    { label: t('navigation.resources'), path: '/resources' },
    { label: t('navigation.activities'), path: '/activities' },
    { label: t('navigation.documents'), path: '/documents' },
    { label: t('navigation.contact'), path: '/contact' },
    { label: t('navigation.profile'), path: '/profile' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="bg-primary shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link 
              to="/" 
              className="text-primary-foreground text-xl font-bold hover:opacity-80 transition-opacity"
            >
              {t('navigation.title')}
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "px-3 py-2 rounded-md text-sm font-medium transition-all duration-200",
                  isActive(item.path)
                    ? "bg-primary-foreground/20 text-primary-foreground"
                    : "text-primary-foreground/80 hover:bg-primary-foreground/10 hover:text-primary-foreground"
                )}
              >
                {item.label}
              </Link>
            ))}
            
            <button
              onClick={toggleLanguage}
              className="ml-2 px-3 py-2 rounded-md text-sm font-medium text-primary-foreground/80 hover:bg-primary-foreground/10 hover:text-primary-foreground transition-all duration-200"
            >
              {i18n.language.startsWith('zh') ? 'English' : '中文'}
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-primary-foreground hover:bg-primary-foreground/10 p-2 rounded-md"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-primary/95 rounded-b-lg">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsOpen(false)}
                  className={cn(
                    "block px-3 py-2 rounded-md text-base font-medium transition-all duration-200",
                    isActive(item.path)
                      ? "bg-primary-foreground/20 text-primary-foreground"
                      : "text-primary-foreground/80 hover:bg-primary-foreground/10 hover:text-primary-foreground"
                  )}
                >
                  {item.label}
                </Link>
              ))}
              <button
                onClick={() => { toggleLanguage(); setIsOpen(false); }}
                className="w-full text-left block px-3 py-2 rounded-md text-base font-medium text-primary-foreground/80 hover:bg-primary-foreground/10 hover:text-primary-foreground transition-all duration-200"
              >
                {i18n.language.startsWith('zh') ? 'English' : '中文'}
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
