import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Resource } from "@/lib/Structures";

// Images import
import makerspace_rsv_img from "@/assets/maker_space_reservation_entry_background.png";
import book_rsv_img from "@/assets/Book_example.png";

interface Application {
  id: number;
  name: string;
  description: string;
  add_date: Date;
  expires: Date;
};

const Resources = () => {
  const resources: Resource[] = [
    {
      id: 1,
      title: "201 原創中心預約系統",
      description:
        "想要進 201 盡情發揮您的創客精神的話，請先到這裡預約，好讓我們知道喔~",
      enable: true,
      url: "https://example.com", // 記得填網址
      img: makerspace_rsv_img,
      button_str: "前往預約",
    },
    {
      id: 2,
      title: "教科書代購登記系統",
      description:
        "需要系學會代購教科書的同學請點此登記，代購持續至 2025/08/25 喔！",
      enable: true,
      url: "https://example.com", // 記得填網址
      img: book_rsv_img,
      button_str: "前往訂購",
    },
  ];

  const [applications, setApplications] = useState<Application[]>([]);

  useEffect(() => {
    // 這裡請改成你的後端 API
    fetch(`${import.meta.env.VITE_API_URL}/api/applications?list=1`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success !== false) {
          console.log(data.applications);
          setApplications(Array.isArray(data.applications) ? data.applications : []);
        }
      })
      .catch((err) => console.error("載入申請作業失敗", err));
  }, []);

  return (
    <div>
      <main className="py-16 px-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {resources.map((resource) => (
          <div
            key={resource.id}
            className="rounded-2xl overflow-hidden shadow-lg border border-gray-200"
          >
            <div className="relative h-48">
              <img
                src={resource.img}
                alt={resource.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-[linear-gradient(to_bottom,_rgba(255,255,255,0)_60%,_rgba(255,255,255,1)_100%)]"></div>
            </div>
            <div className="p-6">
              <h2 className="text-xl font-semibold mb-2">{resource.title}</h2>
              <p className="text-gray-700 mb-4">{resource.description}</p>
              <a
                href={resource.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/80 transition"
              >
                {(resource.button_str && resource.button_str) || "前往"}
              </a>
            </div>
          </div>
        ))}
      </main>

      {/* 新增的申請作業列表 */}
      <section className="mt-12 px-6 mb-12">
        <h2 className="text-2xl font-bold mb-4">申請作業列表</h2>
        {applications.length === 0 ? (
          <p className="text-gray-500">目前沒有進行中的申請作業</p>
        ) : (
          <ul className="space-y-4">
            {applications.map((app) => (
              <li
                key={app.id}
                className="p-4 border rounded-xl shadow hover:bg-gray-50 transition"
              >
                <Link to={`/application_detail/${app.id}`}>
                  <h3 className="text-lg font-semibold text-primary hover:underline">
                    {app.name}
                  </h3>
                </Link>
                <p className="text-gray-600 mt-1">{app.description}</p>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
};

export default Resources;
