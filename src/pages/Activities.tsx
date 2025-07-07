const activities = [
  {
    id: 1,
    title: '迎新茶會',
    date: '2025-09-10',
    location: '系館 101 教室',
    description: '歡迎大一新生參加迎新茶會，認識新同學與系學會成員！',
    link: '#',
  },
  {
    id: 2,
    title: '系烤',
    date: '2025-10-01',
    location: '大湖公園烤肉區',
    description: '一年一度的系烤活動來啦！歡迎大家踴躍參加～',
    link: '#',
  },
];

const Activities = () => {
  return (
    <main className="py-16 bg-gray-50 min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-primary mb-10 text-center">活動資訊</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8">
          {activities.map((activity) => (
            <div key={activity.id} className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition duration-300">
              <h2 className="text-xl font-semibold text-gray-800 mb-2">{activity.title}</h2>
              <p className="text-sm text-muted-foreground mb-1">📅 日期：{activity.date}</p>
              <p className="text-sm text-muted-foreground mb-1">📍 地點：{activity.location}</p>
              <p className="text-sm text-gray-600 mt-2 mb-4">{activity.description}</p>
              <a href={activity.link} className="inline-block text-sm font-medium text-white bg-primary px-4 py-2 rounded-xl hover:bg-primary/90 transition">
                查看詳情
              </a>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
};

export default Activities;
