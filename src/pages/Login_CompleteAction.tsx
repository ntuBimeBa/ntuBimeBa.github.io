import { useState } from "react";

const CompleteProfileForm = () => {
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // 簡單驗證
    if (!form.real_name || !form.stu_id
    ) {
      alert("真實姓名與學號為必填欄位");
      return;
    }

    // TODO: 傳送到後端
    console.log("送出表單:", form);
    alert("資料已送出！");
  };

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
            name="name"
            value={form.real_name}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded p-2"
            required
          />
        </div>

        <div>
          <label className="block text-gray-700 mb-1">學號 *</label>
          <input
            type="text"
            name="studentId"
            value={form.stu_id}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded p-2"
            required
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
            name="phone"
            value={form.tel}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded p-2"
          />
        </div>

        <div>
          <label className="block text-gray-700 mb-1">Discord ID (Optional)</label>
          <input
            type="text"
            name="discordId"
            value={form.discord}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded p-2"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-primary text-white py-2 rounded hover:bg-primary/90 transition"
        >
          送出
        </button>
      </form>
    </div>
  );
};

export default CompleteProfileForm;
