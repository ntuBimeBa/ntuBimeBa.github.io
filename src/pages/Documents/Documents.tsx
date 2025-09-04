import { useEffect, useState } from 'react'
import Footer from '@/components/Footer'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { DownloadIcon, UploadIcon } from 'lucide-react'
import axios from 'axios'
import { useAuth } from '@/context/AuthContext'
import { useAuthGuard } from '@/hooks/useAuthGuard'
import { redirect, useNavigate } from 'react-router-dom'

interface DocumentItem {
  name: string
  url: string
  id: Number
}

const Documents = () => {
  const [documents, setDocuments] = useState<DocumentItem[]>([])
  const [selectedFile, setSelectedFile] = useState<File | null>(null)

  const [uploadFiles, setUploadFiles] = useState([]);
  const [uploading, setUploading] = useState(false);

  const { token } = useAuth();
  const authChecked = useAuthGuard("", false);
  const navigate = useNavigate();

  // 取得下載清單
  useEffect(() => {
    getDocList();
  }, [])

  const getDocList = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/documents`, {
        params: { list: true },
      });
      setDocuments(Array.isArray(res.data.documents) ? res.data.documents : [])
    } catch (error) {
      console.error("載入文件失敗", error);
    } finally {
      // 結束載入
    }
  }

  const handleFileChange = (e) => {
    setUploadFiles([...e.target.files]); // 將多個檔案存進 state
  };

  // 上傳檔案
  const handleUpload = async () => {
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
          applicationId: 8
        },
      });
      alert('提交成功！');
    } catch (err) {
      alert('提交失敗');
    }
  }

  return (
    <div>
      <main className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-primary mb-6 text-center">文件下載</h1>

          {/* 下載清單 */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {documents.map((doc, idx) => {
              doc.url= `${import.meta.env.VITE_API_URL}/api/documents?get_doc=1&id=${doc.id}`;
              return (
                <Card key={idx} className="hover:shadow-md transition duration-300">
                  <CardHeader>
                    <CardTitle className="text-lg font-semibold text-primary">{doc.name}</CardTitle>
                  </CardHeader>
                  <CardContent className="flex items-center justify-between">
                    <div className="flex items-center gap-2" onClick={() => window.open(doc.url, '_blank')}>
                      <DownloadIcon className="w-5 h-5 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">下載檔案</span>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => window.open(doc.url, '_blank')}
                    >
                      下載
                    </Button>
                  </CardContent>
                </Card>
              )
            })}
          </div>

          {/* 上傳區 */}
          <div className="text-center mt-12">
            <input
              type="file"
              multiple
              className="mb-4"
              onChange={handleFileChange}
            />
            <Button
              className="bg-primary text-white hover:bg-primary/90 px-6 py-2"
              onClick={handleUpload}
            >
              <UploadIcon className="w-4 h-4 mr-2" />
              上傳已簽名文件
            </Button>
            <p className="text-muted-foreground text-sm mt-2">
              上傳文件僅供申請程序單次使用，系學會保證所有用戶資料安全，請勿濫用本服務！
            </p>
          </div>
        </div>
      </main>
    </div>
  )
}

export default Documents