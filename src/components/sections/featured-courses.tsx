import Link from 'next/link'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Clock, BookOpen, Star } from 'lucide-react'
import { featuredCourses } from '@/lib/mock-data'

export default function FeaturedCourses() {
  return (
    <section className="py-16 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl mb-4">
            Khóa học nổi bật
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Chọn khóa học phù hợp với trình độ và mục tiêu của bạn. 
            Tất cả khóa học đều được thiết kế bởi các chuyên gia hàng đầu.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredCourses.map((course) => (
            <Card key={course.id} className="group hover:shadow-lg transition-shadow duration-300">
              <CardHeader className="p-0">
                <div className="relative">
                  <div className="w-full h-48 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-t-lg flex items-center justify-center">
                    <BookOpen className="h-16 w-16 text-blue-600" />
                  </div>
                  <Badge className="absolute top-4 right-4 bg-blue-600 text-white">
                    {course.level}
                  </Badge>
                </div>
              </CardHeader>
              
              <CardContent className="p-6">
                <CardTitle className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                  {course.title}
                </CardTitle>
                <CardDescription className="text-gray-600 mb-4">
                  {course.description}
                </CardDescription>
                
                <div className="space-y-2 text-sm text-gray-500">
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-2" />
                    <span>{course.duration}</span>
                  </div>
                  <div className="flex items-center">
                    <BookOpen className="h-4 w-4 mr-2" />
                    <span>{course.lessons} bài học</span>
                  </div>
                  <div className="flex items-center">
                    <Star className="h-4 w-4 mr-2 text-yellow-500 fill-current" />
                    <span>{course.rating}/5.0</span>
                  </div>
                </div>
              </CardContent>
              
              <CardFooter className="p-6 pt-0">
                <Button asChild className="w-full">
                  <Link href={`/courses/${course.id}`}>
                    Bắt đầu học
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button variant="outline" size="lg" asChild>
            <Link href="/courses">
              Xem tất cả khóa học
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
