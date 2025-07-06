
const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* 聯絡資訊 */}
          <div>
            <h3 className="text-lg font-semibold mb-4">聯絡資訊</h3>
            <div className="space-y-2 text-sm opacity-90">
              <p>國立臺灣大學生物機電工程學系</p>
              <p>台北市大安區羅斯福路四段一號</p>
              <p>電話：(02) 3366-xxxx</p>
              <p>Email: bioengineer@ntu.edu.tw</p>
            </div>
          </div>

          {/* 快速連結 */}
          <div>
            <h3 className="text-lg font-semibold mb-4">快速連結</h3>
            <div className="space-y-2 text-sm opacity-90">
              <a href="#" className="block hover:opacity-100 transition-opacity">系學會成員</a>
              <a href="#" className="block hover:opacity-100 transition-opacity">活動資訊</a>
              <a href="#" className="block hover:opacity-100 transition-opacity">文件下載</a>
              <a href="#" className="block hover:opacity-100 transition-opacity">資源申請</a>
            </div>
          </div>

          {/* 關於我們 */}
          <div>
            <h3 className="text-lg font-semibold mb-4">關於我們</h3>
            <p className="text-sm opacity-90 leading-relaxed">
              臺大生機系學會致力於促進同學間的交流互動，
              舉辦各類學術與休閒活動，為大家創造美好的大學回憶。
            </p>
          </div>
        </div>

        {/* 版權資訊 */}
        <div className="border-t border-primary-foreground/20 pt-8 text-center">
          <p className="text-sm opacity-75">
            © 2025 臺大生機系學會，保留所有權利。
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
