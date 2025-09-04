import { useEffect, useMemo } from 'react'
import { useSearchParams, Link } from 'react-router-dom'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { CheckCircle2, XCircle, FileUp, ArrowLeft } from 'lucide-react'

const UploadResultPage = () => {
  const [params] = useSearchParams()

  const { status, filename, url, message, ts } = useMemo(() => {
    const s = (params.get('status') || 'success').toLowerCase()
    return {
      status: s === 'error' ? 'error' : 'success',
      filename: params.get('filename') || '未命名檔案',
      url: params.get('url') || '', // 後端若回傳可公開連結可放這裡
      message: params.get('message') || (s === 'error' ? '上傳失敗，請稍後再試。' : '檔案已成功上傳！'),
      ts: params.get('ts') || new Date().toISOString(),
    }
  }, [params])

  useEffect(() => {
    // 如果需要成功後自動跳轉回某頁，可在此加入計時器
    // const timer = setTimeout(() => navigate('/documents'), 4000)
    // return () => clearTimeout(timer)
  }, [])

  const SuccessIcon = status === 'success' ? CheckCircle2 : XCircle

  return (
    <main className="min-h-[70vh] bg-white py-16">
      <div className="max-w-xl mx-auto px-4">
        <Card className="shadow-lg">
          <CardHeader className="text-center">
            <div
              className={`mx-auto mb-3 w-12 h-12 rounded-full flex items-center justify-center ${
                status === 'success' ? 'bg-green-100' : 'bg-red-100'
              }`}
            >
              <SuccessIcon
                className={`w-7 h-7 ${
                  status === 'success' ? 'text-green-600' : 'text-red-600'
                }`}
              />
            </div>
            <CardTitle className="text-2xl">
              {status === 'success' ? '上傳完成' : '上傳失敗'}
            </CardTitle>
            <p className="text-muted-foreground text-sm mt-1">
              {new Date(ts).toLocaleString()}
            </p>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-muted-foreground">檔名</p>
                <p className="font-medium break-all">{filename}</p>
              </div>

              <div className="p-3 rounded-lg bg-muted/40">
                <p className="text-sm">{message}</p>
                {status === 'success' && url && (
                  <p className="text-sm mt-2">
                    可用連結：{' '}
                    <a
                      className="underline text-primary"
                      href={url}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {url}
                    </a>
                  </p>
                )}
              </div>

              <div className="flex flex-wrap gap-2 pt-2">
                <Button variant="secondary" onClick={() => window.history.back()}>
                  <ArrowLeft className="w-4 h-4 mr-2" /> 返回上一頁
                </Button>
                <Link to="/documents">
                  <Button variant="outline">前往文件下載</Button>
                </Link>
                <Link to="/upload">
                  <Button>
                    <FileUp className="w-4 h-4 mr-2" /> 再上傳一個
                  </Button>
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  )
}

export default UploadResultPage