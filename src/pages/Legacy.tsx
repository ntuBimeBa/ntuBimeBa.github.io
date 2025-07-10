import { useEffect, useState } from "react";
import axios from "axios";
import { useAuthGuard } from "@/hooks/useAuthGuard";
import { useAuth } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Legacy() {
  const authChecked = useAuthGuard();
  const { token } = useAuth();
  const navigate = useNavigate();
  const [enable, setEnable] = useState(false);

  // 載入器
  const [tagsLoading, setTagsLoading] = useState(true);
  
  const [documents, setDocuments] = useState([]);
  const [tags, setTags] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);
  const [filters, setFilters] = useState({
    subject: "",
    grade: "",
    year: "",
    type: "",  // ✅ 新增 type 篩選
    sortBy: "created_at_desc",
  });

  // 檢查使用者是否有存取系產的權限
  useEffect(() => {
    if (!authChecked) return;

    const checkAccess = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/legacy`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: {
            check_access: true,
          },
        });

        // console.log("狀態碼：", response.status);
        if (response.status === 200) {
          console.log("存取權確認成功", response.data.message);
          setEnable(true);
        } else {
          console.warn("未通過存取權", response.data.message);
          setEnable(false);
        }
      } catch (error) {
        // 這邊要小心，error.response 才有 status
        if (error.response) {
          console.warn("未通過存取權", error.response.data.message);
          setEnable(false);
        } else {
          console.error("無法連線或其他錯誤", error);
        }
        setEnable(false);
      }
    };

    checkAccess();
  }, [authChecked]);

  useEffect(() => {
    if(enable && token) {
      fetchDocuments();
      fetchTags();
    }
  }, [enable, token]);

  const fetchDocuments = async () => {
    const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/legacy`, {
      params: {
        list_documents: true,
        tags: selectedTags.join(","),
        subject: filters.subject,
        grade: filters.grade,
        year: filters.year,
        type: filters.type, // ✅ 傳入類型
        sortBy: filters.sortBy,
      },
      headers: {
        Authorization: `Bearer ${token}`,
      }
    });
    setDocuments(Array.isArray(res.data) ? res.data : []);
  };

  const fetchTags = async () => {
    setTagsLoading(true);
    console.log("Fetching tags...");
    try {
      console.log(token);
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/legacy`, {
        params: { list_tags: true },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setTags(Array.isArray(res.data) ? res.data : []);
    } catch (error) {
      console.error("載入標籤失敗", error);
    } finally {
      setTagsLoading(false);  // 結束載入
    }
  };

  const toggleTag = (tagName) => {
    const newTags = selectedTags.includes(tagName)
      ? selectedTags.filter((t) => t !== tagName)
      : [...selectedTags, tagName];
    setSelectedTags(newTags);
  };

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const handleSearch = () => {
    fetchDocuments();
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">系產資料庫查詢</h1>

      <div className="space-y-4 mb-6">
        <div>
          <label className="block mb-2 font-medium">標籤搜尋：</label>
          <div className="flex flex-wrap gap-2">
            {tagsLoading ? (
              <span className="text-gray-500">Loading...</span>  // ✅ 載入中文字樣
            ) : (
              tags.map((tag) => (
                <button
                  key={tag.id}
                  className={`px-3 py-1 rounded-full border ${
                    selectedTags.includes(tag.name)
                      ? "bg-blue-500 text-white"
                      : "bg-gray-200 text-gray-700"
                  }`}
                  onClick={() => toggleTag(tag.name)}
                >
                  {tag.name}
                </button>
              ))
            )}
          </div>
        </div>

        <div>
          <label className="block mb-2 font-medium">科目</label>
          <input
            type="text"
            name="subject"
            value={filters.subject}
            onChange={handleFilterChange}
            className="p-2 border rounded w-full"
            placeholder="輸入科目名稱"
          />
        </div>

        <div className="flex gap-4">
          <div className="flex-1">
            <label className="block mb-2 font-medium">年級</label>
            <input
              type="number"
              name="grade"
              value={filters.grade}
              onChange={handleFilterChange}
              className="p-2 border rounded w-full"
              placeholder="輸入年級"
            />
          </div>
          <div className="flex-1">
            <label className="block mb-2 font-medium">屆數</label>
            <input
              type="number"
              name="year"
              value={filters.year}
              onChange={handleFilterChange}
              className="p-2 border rounded w-full"
              placeholder="輸入屆數"
            />
          </div>
          <div>
          <label className="block mb-2 font-medium">類型</label>
            <select
              name="type"
              value={filters.type}
              onChange={handleFilterChange}
              className="p-2 border rounded w-full"
            >
              <option value="">不限類型</option>
              <option value="homework">作業</option>
              <option value="exam">考試</option>
              <option value="solution">解答</option>
              <option value="handout">講義</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block mb-2 font-medium">排序方式</label>
          <select
            name="sortBy"
            value={filters.sortBy}
            onChange={handleFilterChange}
            className="p-2 border rounded w-full"
          >
            <option value="created_at_desc">新增時間（新 → 舊）</option>
            <option value="created_at_asc">新增時間（舊 → 新）</option>
            <option value="year_desc">屆數（大 → 小）</option>
            <option value="year_asc">屆數（小 → 大）</option>
          </select>
        </div>

        <button
          onClick={handleSearch}
          className="px-4 py-2 bg-blue-600 text-white rounded"
        >
          查詢
        </button>
      </div>

      <ul className="space-y-4">
        {documents.map((doc) => (
          <li key={doc.id} className="border p-4 rounded shadow">
            <h2 className="text-xl font-semibold">{doc.name}</h2>
            <p>科目: {doc.subject}</p>
            <p>授課教師: {doc.teacher}</p>
            <p>
              學年: {doc.year} 年級: {doc.grade} 學期: {doc.semester}
            </p>
            <p>類型: {doc.type}</p>
            <p>標籤: {doc.tags}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
