import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuthGuard } from '@/hooks/useAuthGuard';
import { useAuth } from '@/context/AuthContext';

interface Tag {
  id: number;
  name: string;
}

const LegacyDocumentUploadForm: React.FC = () => {
  const authChecked = useAuthGuard('/legacy-upload');
  const { token } = useAuth();
  const [enable, setEnable] = useState(false);

  // 載入器
  const [tagsLoading, setTagsLoading] = useState(true);
  
  const [tags, setTags] = useState<Tag[]>([]);
  const [selectedTags, setSelectedTags] = useState<number[]>([]);
  const [file, setFile] = useState<File | null>(null);
  const [form, setForm] = useState({
    name: '',
    year: '',
    grade: '',
    semester: '1',
    teacher: '',
    subject: '',
    course_code: '',
    type: 'homework',
    description: '',
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
      fetchTags();
    }
  }, [enable, token]);

  const fetchTags = async () => {
    setTagsLoading(true);
    console.log("Fetching tags...");
    try {
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleTagToggle = (id: number) => {
    setSelectedTags(prev =>
      prev.includes(id) ? prev.filter(tag => tag !== id) : [...prev, id]
    );
  };

  const handleAddTag = async () => {
    const name = prompt('輸入新標籤名稱：');
    if (name) {
      try {
        const res = await axios.post(
          `${import.meta.env.VITE_API_URL}/api/legacy`,
          { name },  // <-- 放在 POST 的 body 中
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            params: {
              insert_tag: true,
            },
          }
        );

        if (res.data.success) {
          setTags(prev => [...prev, res.data]);
          setSelectedTags(prev => [...prev, res.data.id]);
        } else {
          alert(res.data.message || '新增失敗');
        }
      } catch (err) {
        console.error('新增標籤失敗:', err);
        alert('新增標籤時發生錯誤');
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    Object.entries(form).forEach(([key, value]) => formData.append(key, value));
    selectedTags.forEach(tagId => formData.append('tags[]', tagId.toString()));
    if (file) formData.append('file', file);

    try {
      await axios.post('/api/submit_document.php', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      alert('提交成功！');
    } catch (err) {
      alert('提交失敗');
    }
  };

  // basic styles
  const inputBaseStyle =
    "w-full border-0 p-2 border-b-2 border-gray-300 bg-transparent focus:outline-none focus:border-blue-600 transition-colors duration-200";

  return (
    <div className="max-w-2xl mx-auto p-4 bg-white shadow-md rounded-xl">
      <h1 className="text-2xl font-semibold mb-4">上傳系產文件</h1>
      <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-xl shadow-md border border-gray-200">
        <input type="text" name="name" required placeholder="名稱" className={inputBaseStyle} onChange={handleChange} />
        <input type="number" name="year" required placeholder="屆數/學年" className={inputBaseStyle} onChange={handleChange} />
        <input type="number" name="grade" required placeholder="年級" className={inputBaseStyle} onChange={handleChange} />
        <select name="semester" required className={`${inputBaseStyle} bg-gray-50`} onChange={handleChange}>
          <option value="1">上</option>
          <option value="2">下</option>
          <option value="3">暑修</option>
        </select>
        <input type="text" name="teacher" placeholder="授課教師" className={inputBaseStyle} onChange={handleChange} />
        <input type="text" name="subject" required placeholder="科目" className={inputBaseStyle} onChange={handleChange} />
        <input type="text" name="course_code" placeholder="課程代碼" className={inputBaseStyle} onChange={handleChange} />
        <select name="type" required className={`${inputBaseStyle} bg-gray-50`} onChange={handleChange}>
          <option value="homework">作業</option>
          <option value="exam">考卷</option>
          <option value="solution">解答</option>
          <option value="handout">講義</option>
        </select>
        <textarea
          name="description"
          placeholder="簡單描述"
          className="w-full resize-none overflow-hidden min-h-[3rem] p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-300 transition-all duration-200"
          onChange={(e) => {
            handleChange(e);
            e.currentTarget.style.height = 'auto'; // 先重設高度
            e.currentTarget.style.height = `${e.currentTarget.scrollHeight}px`; // 設成內文高度
          }}
        />
        <input type="file" required onChange={(e) => setFile(e.target.files?.[0] || null)} className={inputBaseStyle} />

        <fieldset className="border p-2 rounded-md">
          <legend className="text-sm font-medium">標籤</legend>
          <div className="flex flex-wrap gap-2">
            {tagsLoading ? (
                <span className="text-gray-500">Loading...</span>
                ) : Array.isArray(tags) ? (
                tags.map(tag => (
                    <label key={tag.id} className="inline-flex items-center">
                    <input
                        type="checkbox"
                        checked={selectedTags.includes(tag.id)}
                        onChange={() => handleTagToggle(tag.id)}
                    />
                    <span className="ml-1">{tag.name}</span>
                    </label>
                ))
                ) : (
                <span className="text-red-500">載入失敗或資料格式錯誤</span>
                )}

          </div>
          <button type="button" onClick={handleAddTag} className="mt-2 text-blue-500 underline">
            + 新增標籤
          </button>
        </fieldset>

        <button type="submit" className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700">
          新增系產
        </button>
      </form>
    </div>
  );
};

export default LegacyDocumentUploadForm;

// CSS (可放入全局或元件樣式中)
// .input {
//   @apply w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-500;
// }
