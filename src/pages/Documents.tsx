import Footer from '@/components/Footer'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { DownloadIcon, UploadIcon } from 'lucide-react'

interface DocumentItem {
  id: number
  name: string
  url: string
  type: string
}

const documents: DocumentItem[] = [
  {
    id: 1,
    name: '系學會活動申請表',
    url: 'https://example.com/documents/activity-form.pdf',
    type: 'PDF',
  },
  {
    id: 2,
    name: '器材借用申請單',
    url: 'https://example.com/documents/equipment-rent.docx',
    type: 'Word',
  },
  {
    id: 3,
    name: '出席證明單',
    url: 'https://example.com/documents/attendance-proof.pdf',
    type: 'PDF',
  },
  {
    id: 4,
    name: '公文範本',
    url: 'https://example.com/documents/official-template.docx',
    type: 'Word',
  },
]

const Documents = () => {
  return (
    <div>
      <main className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-primary mb-6 text-center">文件下載</h1>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {documents.map((doc) => (
              <Card key={doc.id} className="hover:shadow-md transition duration-300">
                <CardHeader>
                  <CardTitle className="text-lg font-semibold text-primary">{doc.name}</CardTitle>
                </CardHeader>
                <CardContent className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <DownloadIcon className="w-5 h-5 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">{doc.type} 檔案</span>
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
            ))}
          </div>

          <div className="text-center mt-12">
            <Button
              className="bg-primary text-white hover:bg-primary/90 px-6 py-2"
              onClick={() => window.location.href = 'https://www.google.com'}
            >
              <UploadIcon className="w-4 h-4 mr-2" />
              上傳已簽名文件
            </Button>
            <p className="text-muted-foreground text-sm mt-2">
              尚未開放實際上傳功能，請先點選進行模擬。
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default Documents
