import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { 
  Award, 
  Building2, 
  Globe, 
  Shield, 
  Star,
  Users,
  BookOpen,
  Target,
  TrendingUp
} from 'lucide-react'

const partners = [
  {
    id: 1,
    name: 'ETS (Educational Testing Service)',
    type: 'Đối tác chính thức TOEIC',
    logo: 'ETS',
    color: 'from-blue-600 to-blue-700',
    description: 'Đối tác chính thức trong việc phát triển nội dung TOEIC'
  },
  {
    id: 2,
    name: 'British Council',
    type: 'Đối tác chính thức IELTS',
    logo: 'BC',
    color: 'from-red-600 to-red-700',
    description: 'Hợp tác phát triển chương trình IELTS chuẩn quốc tế'
  },
  {
    id: 3,
    name: 'Cambridge English',
    type: 'Chứng nhận chất lượng',
    logo: 'CAM',
    color: 'from-green-600 to-green-700',
    description: 'Chứng nhận chất lượng nội dung học tập'
  },
  {
    id: 4,
    name: 'PEARSON',
    type: 'Đối tác giáo dục',
    logo: 'PEA',
    color: 'from-purple-600 to-purple-700',
    description: 'Hợp tác phát triển công nghệ học tập AI'
  },
  {
    id: 5,
    name: 'Microsoft Education',
    type: 'Đối tác công nghệ',
    logo: 'MS',
    color: 'from-cyan-600 to-cyan-700',
    description: 'Đối tác công nghệ AI và cloud computing'
  },
  {
    id: 6,
    name: 'Google for Education',
    type: 'Đối tác đổi mới',
    logo: 'GG',
    color: 'from-orange-600 to-orange-700',
    description: 'Tích hợp công nghệ Google AI trong giáo dục'
  }
]

const achievements = [
  {
    title: 'Giải thưởng EdTech 2024',
    description: 'Ứng dụng học tiếng Anh tốt nhất Việt Nam',
    icon: Award,
    year: '2024'
  },
  {
    title: 'ISO 27001:2022',
    description: 'Chứng nhận bảo mật thông tin quốc tế',
    icon: Shield,
    year: '2024'
  },
  {
    title: 'Top 10 Startup EdTech',
    description: 'Được vinh danh bởi Vietnam Startup Awards',
    icon: Star,
    year: '2023'
  },
  {
    title: 'Đối tác Microsoft',
    description: 'Chứng nhận Microsoft Gold Partner',
    icon: Building2,
    year: '2023'
  }
]

const universitiesStats = [
  { name: 'ĐH Ngoại Thương', students: '2,500+', logo: 'FTU' },
  { name: 'ĐH Bách Khoa HN', students: '3,200+', logo: 'HUST' },
  { name: 'ĐH Kinh tế Quốc dân', students: '1,800+', logo: 'NEU' },
  { name: 'ĐH Ngoại ngữ', students: '4,100+', logo: 'ULIS' },
  { name: 'ĐH FPT', students: '2,700+', logo: 'FPT' },
  { name: 'ĐH RMIT', students: '1,200+', logo: 'RMIT' }
]

export default function PartnersSection() {
  return (
    <section className="py-20 bg-gradient-to-br from-slate-50 via-white to-gray-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-4 bg-blue-100 text-blue-800 border-blue-200">
            <Building2 className="w-4 h-4 mr-1" />
            Đối tác uy tín
          </Badge>
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
            Được tin tưởng bởi 
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"> hàng đầu thế giới</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Chúng tôi tự hào hợp tác với các tổ chức giáo dục và công nghệ hàng đầu để mang đến chất lượng tốt nhất
          </p>
        </div>

        {/* Official Partners */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-center text-gray-900 mb-8">
            Đối tác chính thức
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {partners.map((partner) => (
              <Card key={partner.id} className="group hover:shadow-lg transition-all duration-300 border-2 border-gray-100 hover:border-blue-200">
                <CardContent className="p-6 text-center">
                  <div className={`w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r ${partner.color} flex items-center justify-center`}>
                    <span className="text-white font-bold text-lg">{partner.logo}</span>
                  </div>
                  <h4 className="font-bold text-lg text-gray-900 mb-2">{partner.name}</h4>
                  <Badge variant="outline" className="mb-3">
                    {partner.type}
                  </Badge>
                  <p className="text-sm text-gray-600">{partner.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Achievements */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-center text-gray-900 mb-8">
            Thành tựu & Chứng nhận
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {achievements.map((achievement, index) => (
              <Card key={index} className="text-center p-6 border-2 border-gray-100 hover:border-yellow-200 hover:shadow-lg transition-all duration-300">
                <CardContent className="p-0">
                  <div className="w-12 h-12 mx-auto mb-4 p-3 bg-yellow-100 rounded-full flex items-center justify-center">
                    <achievement.icon className="w-6 h-6 text-yellow-600" />
                  </div>
                  <h4 className="font-bold text-gray-900 mb-2">{achievement.title}</h4>
                  <p className="text-sm text-gray-600 mb-2">{achievement.description}</p>
                  <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
                    {achievement.year}
                  </Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* University Partners */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-center text-gray-900 mb-8">
            Đối tác trường đại học
          </h3>
          <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {universitiesStats.map((uni, index) => (
                <div key={index} className="flex items-center space-x-4 p-4 rounded-lg bg-gray-50 hover:bg-blue-50 transition-colors">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold text-sm">{uni.logo}</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">{uni.name}</h4>
                    <p className="text-sm text-gray-600">{uni.students} sinh viên</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="text-center mt-8 p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <div className="text-3xl font-bold text-blue-600 mb-1">50+</div>
                  <div className="text-sm text-gray-600">Trường đại học</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-purple-600 mb-1">15,000+</div>
                  <div className="text-sm text-gray-600">Sinh viên sử dụng</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-green-600 mb-1">95%</div>
                  <div className="text-sm text-gray-600">Hài lòng với dịch vụ</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Global Recognition */}
        <div className="bg-gradient-to-r from-gray-900 to-blue-900 rounded-2xl p-8 lg:p-12 text-white">
          <div className="text-center mb-8">
            <Globe className="w-16 h-16 mx-auto mb-4 text-blue-300" />
            <h3 className="text-3xl font-bold mb-4">Được công nhận toàn cầu</h3>
            <p className="text-blue-100 text-lg max-w-2xl mx-auto">
              EnglishMaster đã được công nhận và sử dụng tại hơn 20 quốc gia trên thế giới
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div className="p-6 bg-white/10 rounded-lg backdrop-blur-sm">
              <Users className="w-8 h-8 mx-auto mb-3 text-blue-300" />
              <div className="text-2xl font-bold mb-1">100K+</div>
              <div className="text-blue-200 text-sm">Người dùng toàn cầu</div>
            </div>
            <div className="p-6 bg-white/10 rounded-lg backdrop-blur-sm">
              <BookOpen className="w-8 h-8 mx-auto mb-3 text-green-300" />
              <div className="text-2xl font-bold mb-1">20+</div>
              <div className="text-blue-200 text-sm">Quốc gia</div>
            </div>
            <div className="p-6 bg-white/10 rounded-lg backdrop-blur-sm">
              <Target className="w-8 h-8 mx-auto mb-3 text-purple-300" />
              <div className="text-2xl font-bold mb-1">15</div>
              <div className="text-blue-200 text-sm">Ngôn ngữ hỗ trợ</div>
            </div>
            <div className="p-6 bg-white/10 rounded-lg backdrop-blur-sm">
              <TrendingUp className="w-8 h-8 mx-auto mb-3 text-yellow-300" />
              <div className="text-2xl font-bold mb-1">99.9%</div>
              <div className="text-blue-200 text-sm">Uptime</div>
            </div>
          </div>
        </div>

        {/* Trust Indicators */}
        <div className="mt-16 text-center">
          <p className="text-gray-600 mb-6">
            Được tin tưởng bởi các tổ chức hàng đầu và hàng nghìn học viên trên toàn thế giới
          </p>
          <div className="flex flex-wrap justify-center items-center gap-8 text-gray-400">
            <div className="flex items-center space-x-2">
              <Shield className="w-5 h-5" />
              <span className="text-sm">SSL Secured</span>
            </div>
            <div className="flex items-center space-x-2">
              <Award className="w-5 h-5" />
              <span className="text-sm">ISO Certified</span>
            </div>
            <div className="flex items-center space-x-2">
              <Star className="w-5 h-5" />
              <span className="text-sm">4.9/5 Rating</span>
            </div>
            <div className="flex items-center space-x-2">
              <Users className="w-5 h-5" />
              <span className="text-sm">100K+ Users</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
