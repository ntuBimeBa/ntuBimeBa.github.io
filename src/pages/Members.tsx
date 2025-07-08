import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

interface Member {
  id: number
  name: string
  role: string
  email: string
  imageUrl?: string
}

const members: Member[] = [
  {
    id: 1,
    name: '林小綠',
    role: '會長',
    email: 'president@ntu-bimeba.tw',
    imageUrl: 'https://i.pravatar.cc/150?img=10',
  },
  {
    id: 2,
    name: '張大偉',
    role: '副會長',
    email: 'vp@ntu-bimeba.tw',
    imageUrl: 'https://i.pravatar.cc/150?img=12',
  },
  {
    id: 3,
    name: '李美青',
    role: '活動組長',
    email: 'events@ntu-bimeba.tw',
    imageUrl: 'https://i.pravatar.cc/150?img=8',
  },
  {
    id: 4,
    name: '陳柏叡',
    role: '財務長',
    email: 'finance@ntu-bimeba.tw',
    imageUrl: 'https://i.pravatar.cc/150?img=15',
  },
  {
    id: 5,
    name: '王子翔',
    role: '學術組長',
    email: 'academic@ntu-bimeba.tw',
    imageUrl: 'https://i.pravatar.cc/150?img=5',
  },
]

const Members = () => {
  return (
    <div>
      <main className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-primary mb-8 text-center">系學會成員</h1>

          <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {members.map((member) => (
              <Card key={member.id} className="shadow-sm hover:shadow-lg transition duration-300">
                <CardHeader className="flex flex-col items-center justify-center text-center">
                  <Avatar className="w-24 h-24 mb-4">
                    <AvatarImage src={member.imageUrl} />
                    <AvatarFallback>{member.name[0]}</AvatarFallback>
                  </Avatar>
                  <CardTitle className="text-xl font-semibold">{member.name}</CardTitle>
                  <p className="text-muted-foreground">{member.role}</p>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-sm text-muted-foreground break-words">{member.email}</p>
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

export default Members
