import { useState, useMemo } from 'react'
import Footer from '@/components/Footer'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { LockIcon } from 'lucide-react'

interface LegacyFile {
  id: number
  title: string
  subject: string
  date: string // 格式：YYYY-MM-DD
}

const mockFiles: LegacyFile[] = [
  { id: 1, title: '生物力學期中考', subject: '生物力學', date: '2024-11-01' },
  { id: 2, title: '線性代數歷屆考題', subject: '線性代數', date: '2023-06-15' },
  { id: 3, title: '電路學筆記', subject: '電路學', date: '2025-01-10' },
  { id: 4, title: '生醫訊號報告範例', subject: '生醫訊號', date: '2024-03-20' },
  { id: 5, title: '普通物理實驗記錄', subject: '普物實驗', date: '2022-12-02' },
]

const Legacy = () => {
  const [search, setSearch] = useState('')
  const [sortOption, setSortOption] = useState('newest')

  const filteredFiles = useMemo(() => {
    let filtered = mockFiles.filter(
      (file) =>
        file.title.includes(search) || file.subject.includes(search)
    )

    switch (sortOption) {
      case 'newest':
        return filtered.sort((a, b) => b.date.localeCompare(a.date))
      case 'oldest':
        return filtered.sort((a, b) => a.date.localeCompare(b.date))
      case 'subject':
        return filtered.sort((a, b) => a.subject.localeCompare(b.subject))
      default:
        return filtered
    }
  }, [search, sortOption])

  return (
    <div>
      <main className="py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-primary text-center mb-6">系產服務</h1>
          <p className="text-center text-muted-foreground mb-8">
            本服務需登入才能檢視詳細內容。資料僅供系內使用，請勿外流或任意下載。
          </p>

          <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-6">
            <Input
              placeholder="搜尋文件標題或科目..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="max-w-sm"
            />
            <Select value={sortOption} onValueChange={setSortOption}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="排序方式" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">由新到舊</SelectItem>
                <SelectItem value="oldest">由舊到新</SelectItem>
                <SelectItem value="subject">依科目排序</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredFiles.map((file) => (
              <Card key={file.id} className="hover:shadow-md transition-all">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg text-primary">{file.title}</CardTitle>
                </CardHeader>
                <CardContent className="flex items-center justify-between text-muted-foreground">
                  <span className="text-sm">{file.subject}</span>
                  <span className="text-sm">{file.date}</span>
                </CardContent>
                <CardContent className="flex justify-center mt-2">
                  <LockIcon className="w-5 h-5 text-gray-400" />
                  <span className="text-sm ml-2 text-muted-foreground">不可下載</span>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default Legacy
