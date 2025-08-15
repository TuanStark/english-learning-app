import Link from 'next/link'
import { BookOpen, Mail, Phone, MapPin, Github, Twitter, Facebook } from 'lucide-react'

const footerNavigation = {
  main: [
    { name: 'Trang chủ', href: '/' },
    { name: 'Luyện đề', href: '/exams' },
    { name: 'Từ vựng', href: '/vocabulary' },
    { name: 'Ngữ pháp', href: '/grammar' },
  ],
  support: [
    { name: 'Hướng dẫn sử dụng', href: '/guide' },
    { name: 'Câu hỏi thường gặp', href: '/faq' },
    { name: 'Liên hệ', href: '/contact' },
    { name: 'Báo lỗi', href: '/report' },
  ],
  legal: [
    { name: 'Điều khoản sử dụng', href: '/terms' },
    { name: 'Chính sách bảo mật', href: '/privacy' },
    { name: 'Cookie', href: '/cookies' },
  ],
  social: [
    { name: 'Facebook', href: '#', icon: Facebook },
    { name: 'Twitter', href: '#', icon: Twitter },
    { name: 'GitHub', href: '#', icon: Github },
  ],
}

export default function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-200">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Main footer content */}
        <div className="py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company info */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              <BookOpen className="h-8 w-8 text-blue-600" />
              <span className="text-xl font-bold text-gray-900">EnglishMaster</span>
            </div>
            <p className="text-gray-600 text-sm mb-4">
              Nền tảng luyện thi TOEIC và IELTS hàng đầu Việt Nam. 
              Giúp bạn nâng cao trình độ tiếng Anh một cách hiệu quả.
            </p>
            <div className="space-y-2 text-sm text-gray-600">
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4" />
                <span>contact@englishmaster.vn</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4" />
                <span>+84 123 456 789</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4" />
                <span>Hà Nội, Việt Nam</span>
              </div>
            </div>
          </div>

          {/* Main navigation */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase mb-4">
              Tính năng
            </h3>
            <ul className="space-y-2">
              {footerNavigation.main.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-sm text-gray-600 hover:text-blue-600 transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase mb-4">
              Hỗ trợ
            </h3>
            <ul className="space-y-2">
              {footerNavigation.support.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-sm text-gray-600 hover:text-blue-600 transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase mb-4">
              Pháp lý
            </h3>
            <ul className="space-y-2 mb-6">
              {footerNavigation.legal.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-sm text-gray-600 hover:text-blue-600 transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
            {/* Social links */}
            <div className="flex space-x-4">
              {footerNavigation.social.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-gray-400 hover:text-blue-600 transition-colors"
                >
                  <span className="sr-only">{item.name}</span>
                  <item.icon className="h-5 w-5" />
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-gray-200 py-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <p className="text-sm text-gray-600">
              © 2024 EnglishMaster. Tất cả quyền được bảo lưu.
            </p>
            <p className="text-sm text-gray-600 mt-2 md:mt-0">
              Được phát triển với TuanStark
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
