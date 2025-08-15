import { Trophy, Users, BookOpen, Clock, CheckCircle, Award } from 'lucide-react'

const stats = [
  {
    id: 1,
    name: 'Học viên đã tham gia',
    value: '10,000+',
    icon: Users,
    description: 'Tin tưởng và lựa chọn nền tảng của chúng tôi',
    color: 'text-blue-600'
  },
  {
    id: 2,
    name: 'Đề thi chất lượng',
    value: '500+',
    icon: BookOpen,
    description: 'Được cập nhật liên tục theo xu hướng mới',
    color: 'text-green-600'
  },
  {
    id: 3,
    name: 'Giờ học trực tuyến',
    value: '50,000+',
    icon: Clock,
    description: 'Thời gian học tập hiệu quả của học viên',
    color: 'text-purple-600'
  },
  {
    id: 4,
    name: 'Tỷ lệ đỗ cao',
    value: '95%',
    icon: Trophy,
    description: 'Học viên đạt điểm mục tiêu sau khóa học',
    color: 'text-yellow-600'
  },
  {
    id: 5,
    name: 'Câu hỏi được giải',
    value: '1M+',
    icon: CheckCircle,
    description: 'Lượng bài tập đã được hoàn thành',
    color: 'text-indigo-600'
  },
  {
    id: 6,
    name: 'Chứng chỉ đã cấp',
    value: '5,000+',
    icon: Award,
    description: 'Được công nhận bởi các tổ chức uy tín',
    color: 'text-red-600'
  }
]

const features = [
  {
    title: 'Luyện đề miễn phí',
    description: 'Truy cập không giới hạn các đề thi TOEIC và IELTS chất lượng cao',
    icon: BookOpen
  },
  {
    title: 'Chấm điểm tự động',
    description: 'Hệ thống chấm điểm thông minh với kết quả chi tiết ngay lập tức',
    icon: CheckCircle
  },
  {
    title: 'Giải thích đáp án',
    description: 'Mỗi câu hỏi đều có lời giải chi tiết giúp bạn hiểu sâu hơn',
    icon: Award
  },
  {
    title: 'Theo dõi tiến độ',
    description: 'Thống kê chi tiết về quá trình học tập và cải thiện điểm số',
    icon: Trophy
  }
]

export default function StatsSection() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Stats Grid */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl mb-4">
              Con số ấn tượng
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Hàng nghìn học viên đã tin tưởng và đạt được mục tiêu của mình cùng EnglishMaster
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {stats.map((stat) => (
              <div key={stat.id} className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center mb-4">
                  <div className={`p-3 rounded-lg bg-gray-100 ${stat.color}`}>
                    <stat.icon className="h-6 w-6" />
                  </div>
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-1">
                  {stat.value}
                </div>
                <div className="text-lg font-semibold text-gray-700 mb-2">
                  {stat.name}
                </div>
                <p className="text-sm text-gray-600">
                  {stat.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Features Grid */}
        <div>
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl mb-4">
              Tính năng nổi bật
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Những tính năng độc đáo giúp bạn học tiếng Anh hiệu quả hơn
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature) => (
              <div key={feature.title} className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 text-blue-600 rounded-full mb-4">
                  <feature.icon className="h-8 w-8" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600 text-sm">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
