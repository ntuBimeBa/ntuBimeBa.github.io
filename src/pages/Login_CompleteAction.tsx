import LoadingSpinner from "@/components/LoadinigSpinner";
import { useAuth } from "@/context/AuthContext";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "@/components/ui/sonner";

const CompleteProfileForm = () => {

  const { token, loading, referrer } = useAuth();
  const [ formReady, setFormReady ] = useState(false);
  const [ formSubmitting, setFormSubmitting ] = useState(false);
  const navigate = useNavigate();

  const [form, setForm] = useState({
    real_name: "",
    stu_id: "",
    email: "",
    address: "",
    tel: "",
    discord: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.real_name || !form.stu_id) {
      toast.error("真實姓名與學號為必填欄位");
      return;
    }

    try {
      setFormSubmitting(true);
      const { data } = await axios.post(`${import.meta.env.VITE_API_URL}/user_information`, form, {
        headers: {
          Authorization: `Bearer ${token}`, // 如果需要
        },
      });
      console.log("API 回傳資料:", data);
      if(data.success) {
        // 可以跳轉
        toast.message(`歡迎${form.real_name}成為尊貴的會員🎉`);
        setFormSubmitting(false);
        const timer = setTimeout(() => {
          navigate(referrer);
        }, 2000);
        return () => clearTimeout(timer);
      }
    } catch (error) {
      console.error("送出表單錯誤:", error);
      alert("送出失敗，請稍後再試");
    }
  };

  useEffect(() => {
    if(loading) return;
    console.log("驗證載入完畢");
    setFormReady(true);
  }, [loading]);

  if (!formReady) {
    return (
      <LoadingSpinner text="正在載入表單" />
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-green-100 to-blue-100 p-6">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-xl shadow-lg space-y-4 w-full max-w-md"
      >
        <h2 className="text-2xl font-bold text-center text-gray-800">
          初めまして
        </h2>
        <h4 className="text-s text-center text-gray-500">
          請填一下這份表單讓我們能夠進一步了解你/妳
        </h4>

        <div>
          <label className="block text-gray-700 mb-1">真實姓名 *</label>
          <input
            type="text"
            name="real_name"
            value={form.real_name}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded p-2"
          />
        </div>

        <div>
          <label className="block text-gray-700 mb-1">學號 *</label>
          <input
            type="text"
            name="stu_id"
            value={form.stu_id}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded p-2"
          />
        </div>

        <div>
          <label className="block text-gray-700 mb-1">Email (Optional)</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded p-2"
          />
        </div>

        <div>
          <label className="block text-gray-700 mb-1">地址 (Optional)</label>
          <input
            type="text"
            name="address"
            value={form.address}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded p-2"
          />
        </div>

        <div>
          <label className="block text-gray-700 mb-1">電話號碼 (Optional)</label>
          <input
            type="tel"
            name="tel"
            value={form.tel}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded p-2"
          />
        </div>

        <div>
          <label className="block text-gray-700 mb-1">Discord ID (Optional)</label>
          <input
            type="text"
            name="discord"
            value={form.discord}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded p-2"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-primary text-white py-2 rounded hover:bg-primary/90 transition"
        >
          {(formSubmitting && "Processing Data...") || "送出"}
        </button>
      </form>
    </div>
  );
};

export default CompleteProfileForm;
