import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import LoadingSpinner from "@/components/LoadinigSpinner";
import { FileText, File, FileImage, FileVideo, FileSpreadsheet } from "lucide-react";
import { Button } from "react-day-picker";
import axios from "axios";
import { useAuth } from "@/context/AuthContext";
import { useAuthGuard } from "@/hooks/useAuthGuard";
import { toast } from '@/components/ui/sonner';

interface FileItem {
  id: number;
  name: string;
  create_date: string;
}

interface Application {
  id: number;
  name: string;
  description: string;
  add_date: string;
  expires: string;
  files: FileItem[];
}



const ApplicationDetail = () => {
  const { id } = useParams();
  const [application, setApplication] = useState<Application | null>(null);
  const [uploadFiles, setUploadFiles] = useState([]);
  const [uploading, setUploading] = useState(false);

  const { token } = useAuth();
  const authChecked = useAuthGuard(`/application_detail/${id}`);
  const navigate = useNavigate();

  useEffect(() => {
    if (!id) return;

    fetch(`${import.meta.env.VITE_API_URL}/api/applications?detail=1&id=${id}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.application) {
          setApplication(data.application);
        }
      })
      .catch((err) => console.error("載入申請作業詳細失敗", err));
  }, [id]);

  if (!application) return <LoadingSpinner />;

  // 判斷副檔名對應的 icon
  const getFileIcon = (filename: string) => {
    const ext = filename.split(".").pop()?.toLowerCase();
    switch (ext) {
      case "pdf":
        return <FileText className="w-6 h-6 text-red-500" />; // pdf 用紅色
      case "doc":
      case "docx":
        return <FileText className="w-6 h-6 text-blue-500" />;
      case "xls":
      case "xlsx":
        return <FileSpreadsheet className="w-6 h-6 text-green-500" />;
      case "jpg":
      case "jpeg":
      case "png":
        return <FileImage className="w-6 h-6 text-yellow-500" />;
      default:
        return <File className="w-6 h-6 text-gray-400" />;
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setUploadFiles(Array.from(e.target.files));
    }
  };

  // 上傳檔案
  const handleUpload = async () => {
    setUploading(true);
    if (uploadFiles.length === 0) return alert('請先選擇檔案');
    if (!authChecked) {
      alert('請先登入');
      navigate('/login');
      return;
    }

    const formData = new FormData()

    uploadFiles.forEach((file) => {
      formData.append("files", file); // "files" 是後端接收的欄位名稱
    });

    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/api/applications`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`
        },
        params: {
          upload: true,
          applicationId: id
        },
      });
      toast.success("提交成功！");
      setUploadFiles([]);
    } catch (err) {
      toast.error("提交失敗，後臺出錯");
    } finally {
      setUploading(false);
    }
  }

  return (
    <div className="p-12 max-w-6xl mx-auto space-y-8">
      {/* 申請作業詳細資訊 */}
      <section className="bg-white shadow rounded-xl p-6 space-y-4">
        <h1 className="text-3xl font-bold">{application.name}</h1>
        <p className="text-gray-700">{application.description}</p>
        <div className="flex flex-wrap gap-4 text-gray-500 text-sm">
          <span>新增時間: {new Date(application.add_date).toLocaleString()}</span>
          <span className="text-red-500">截止時間: {new Date(application.expires).toLocaleString()}</span>
        </div>
      </section>

      {/* 檔案下載列表 */}
      <section>
        <h2 className="text-2xl font-semibold mb-4 text-center">相關檔案</h2>
        {application.files.length === 0 ? (
          <p className="text-gray-500 text-center">沒有相關附件</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 justify-items-center p-5">
            {application.files.map((file) => (
              <a
                key={file.id}
                href={`${import.meta.env.VITE_API_URL}/api/documents?get_doc=1&id=${file.id}`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white shadow rounded-xl p-6 flex flex-col items-start hover:shadow-lg transition min-w-[200px] max-w-full"
              >
                <div className="flex items-center space-x-2 mb-2">
                  {getFileIcon(file.name)}
                  <span className="font-medium break-words">{file.name}</span>
                </div>
                <span className="text-gray-400 text-sm">
                  上傳時間: {new Date(file.create_date).toLocaleString()}
                </span>
              </a>
            ))}
          </div>
        )}
      </section>
      {/* 文件繳交區 */}
      <section className="mt-8">
        <h2 className="text-2xl font-semibold mb-4 text-center">提交申請文件</h2>
        <div
          className="relative border-4 border-dashed border-gray-300 rounded-xl p-12 flex flex-col items-center justify-center cursor-pointer hover:border-gray-400 transition"
          onClick={() => document.getElementById("file-input")?.click()}
        >
          {/* 檔案圖示裝飾 */}
          <div className="flex space-x-4 mb-4">
            <FileText className="w-8 h-8 text-red-500" />
            <FileText className="w-8 h-8 text-blue-500" />
            <FileImage className="w-8 h-8 text-gray-400" />
            <FileText className="w-8 h-8 text-green-500" />
          </div>

          {/* 大 + 號 */}
          <div className="text-6xl text-gray-400 mb-2">+</div>

          {/* 說明文字 */}
          <span className="text-gray-500 font-medium">新增提交檔案</span>

          {/* 隱藏檔案 input */}
          <input
            type="file"
            id="file-input"
            multiple
            className="hidden"
            onChange={(e) => handleFileInputChange(e)}
          />

          {/* 準備上傳的檔案列表 */}
          {uploadFiles.length > 0 && (
            <div className="flex flex-wrap justify-center gap-4 p-5">
              {uploadFiles.map((file, index) => (
                <div
                  key={index}
                  className="bg-white shadow rounded-xl p-6 flex flex-col items-start min-w-[200px] max-w-[300px]"
                >
                  <div className="flex items-center space-x-2 mb-2">
                    {getFileIcon(file.name)}
                    <span className="font-medium break-words">{file.name}</span>
                  </div>
                  <span className="text-gray-400 text-sm">
                    檔案大小: {(file.size / 1024).toFixed(2)} KB
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        { uploadFiles.length > 0 && (
          <>
            {/* 提交按鈕 */}
            <div className="flex justify-center mt-6">
              <button
                className={`bg-primary text-white px-6 py-3 rounded-lg transition 
                  ${uploading ? 'opacity-50 cursor-not-allowed hover:bg-primary' : 'hover:bg-primary/80'}`}
                onClick={handleUpload}
                disabled={uploading} // 🔹 這裡禁用按鈕
              >
                {uploading ? "處理中..." : "提交檔案"}
              </button>
            </div>
          </>
        ) }

        
      </section>
    </div>
  );
};

export default ApplicationDetail;
