import { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { DownloadIcon } from 'lucide-react'
import axios from 'axios'

interface DocumentItem {
  name: string
  url: string
  id: Number
}

const Documents = () => {
  const [documents, setDocuments] = useState<DocumentItem[]>([])

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
        </div>
      </main>
    </div>
  )
}

export default Documents