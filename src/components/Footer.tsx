import { useTranslation } from 'react-i18next';

const Footer = () => {
  const { t } = useTranslation();
  return (
    <footer className="bg-primary text-primary-foreground py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* 聯絡資訊 */}
          <div>
            <h3 className="text-lg font-semibold mb-4">{t('footer.contact')}</h3>
            <div className="space-y-2 text-sm opacity-90">
              <a href="https://www.bime.ntu.edu.tw/Default.html" target="_blank" className="block">
                {t('footer.bime_ntu')}
              </a>
              <a href="https://maps.app.goo.gl/afsLf3jHHbn7BKfP8" target="_blank" className="block">
                {t('footer.address')}
              </a>
              <a href="tel:0233665339" target="_blank" className="block">
                {t('footer.phone')}
              </a>
              <a href="mailto:bimestudy2024@gmail.com" target="_blank" className="block">
                {t('footer.email')}
              </a>
            </div>
          </div>

          {/* 快速連結 */}
          <div>
            <h3 className="text-lg font-semibold mb-4">{t('footer.quick_links')}</h3>
            <div className="space-y-2 text-sm opacity-90">
              <a href="/#/members" className="block hover:opacity-100 transition-opacity">{t('navigation.members')}</a>
              <a href="/#/activities" className="block hover:opacity-100 transition-opacity">{t('navigation.activities')}</a>
              <a href="/#/documents" className="block hover:opacity-100 transition-opacity">{t('navigation.documents')}</a>
              <a href="/#/resources" className="block hover:opacity-100 transition-opacity">{t('navigation.resources')}</a>
            </div>
          </div>

          {/* 關於我們 */}
          <div>
            <h3 className="text-lg font-semibold mb-4">{t('footer.about_us')}</h3>
            <p className="text-sm opacity-90 leading-relaxed">
              {t('footer.description')}
            </p>
          </div>
        </div>

        {/* 版權資訊 */}
        <div className="border-t border-primary-foreground/20 pt-8 text-center">
          <p className="text-sm opacity-75">
            {t('footer.copyright')}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
