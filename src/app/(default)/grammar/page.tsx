"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Pagination from "@/components/Pagination"
import usePagination from "@/hooks/usePagination"
import useSWR from "swr"
import { 
  Search, 
  BookOpen, 
  CheckCircle, 
  Brain, 
  Star, 
  Sparkles, 
  Crown,
  ArrowRight,
  Clock,
  Users,
  AlertCircle
} from "lucide-react"
import { grammarApi } from '@/lib/api'

export default function GrammarPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedDifficulty, setSelectedDifficulty] = useState("all")
  
  // Use pagination hook
  const { page, limit, setPage } = usePagination('/grammar', 6, 1);

  // SWR fetcher with pagination
  const fetcher = async (url: string) => {
    const params = new URLSearchParams();
    params.append('page', page.toString());
    params.append('limit', limit.toString());
    if (searchTerm) params.append('search', searchTerm);
    if (selectedDifficulty && selectedDifficulty !== "all") params.append('difficultyLevel', selectedDifficulty);
    
    const response = await grammarApi.getAll(params.toString());
    return response.data;
  };

  // Use SWR with dynamic key
  const { data, error, isLoading } = useSWR(
    `grammar-lessons?page=${page}&limit=${limit}&search=${searchTerm}&difficulty=${selectedDifficulty}`,
    fetcher
  );

  // Transform data
  const grammarLessons = data?.data || [];

  // Get pagination info from backend
  const total = data?.meta?.total || 0;

  // Reset page when filters change
  useEffect(() => {
    setPage(1)
  }, [searchTerm, selectedDifficulty])

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Easy":
        return "bg-gradient-to-r from-green-500 to-emerald-500 text-white"
      case "Medium":
        return "bg-gradient-to-r from-blue-500 to-cyan-500 text-white"
      case "Hard":
        return "bg-gradient-to-r from-purple-500 to-pink-500 text-white"
      default:
        return "bg-gradient-to-r from-gray-500 to-slate-500 text-white"
    }
  }

  return (
    <div className="min-h-screen bg-white relative overflow-hidden">
      {/* Floating Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-40 h-40 bg-gradient-to-br from-blue-200/20 to-cyan-200/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-40 right-20 w-32 h-32 bg-gradient-to-br from-purple-200/20 to-pink-200/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-20 left-1/4 w-48 h-48 bg-gradient-to-br from-amber-200/20 to-orange-200/20 rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 via-purple-600/10 to-pink-600/10 rounded-3xl blur-3xl"></div>
            <div className="relative bg-white/80 backdrop-blur-xl rounded-3xl p-12 shadow-2xl border border-white/20">
              <div className="flex items-center justify-center gap-3 mb-6">
                <Sparkles className="h-8 w-8 text-blue-600 animate-pulse" />
                <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 bg-clip-text text-transparent">
                  Grammar Mastery
                </h1>
                <Sparkles className="h-8 w-8 text-purple-600 animate-pulse" />
              </div>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                Làm chủ ngữ pháp tiếng Anh với các bài học tương tác, ví dụ thực tế và bài tập thực hành 
                từ cơ bản đến nâng cao
              </p>
            </div>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="mb-12">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 via-purple-600/10 to-pink-600/10 rounded-3xl blur-3xl"></div>
            <div className="relative bg-white/80 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/20">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Search */}
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <Input
                    type="text"
                    placeholder="Tìm kiếm bài học..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-12 pr-4 py-3 border-2 border-gray-200 rounded-2xl focus:outline-none focus:border-blue-500 text-lg"
                  />
                </div>

                {/* Difficulty Filter */}
                <div>
                  <select
                    value={selectedDifficulty}
                    onChange={(e) => setSelectedDifficulty(e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-2xl focus:outline-none focus:border-blue-500 text-lg"
                  >
                    <option value="all">Tất cả mức độ</option>
                    <option value="Easy">Dễ</option>
                    <option value="Medium">Trung bình</option>
                    <option value="Hard">Khó</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="mb-16">
            <div className="flex items-center gap-3 mb-8">
              <Crown className="h-8 w-8 text-amber-500" />
              <h2 className="text-3xl font-bold text-gray-900">Đang tải...</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="relative group animate-pulse">
                  <div className="bg-white/90 backdrop-blur-xl rounded-3xl overflow-hidden shadow-2xl border border-white/20">
                    <div className="h-48 bg-gray-200"></div>
                    <div className="p-6">
                      <div className="h-4 bg-gray-200 rounded mb-4 w-3/4"></div>
                      <div className="h-6 bg-gray-200 rounded mb-2"></div>
                      <div className="h-4 bg-gray-200 rounded mb-4 w-1/2"></div>
                      <div className="h-4 bg-gray-200 rounded mb-4"></div>
                      <div className="h-10 bg-gray-200 rounded"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="mb-16">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-red-600/10 via-pink-600/10 to-red-600/10 rounded-3xl blur-3xl"></div>
              <div className="relative bg-white/80 backdrop-blur-xl rounded-3xl p-12 shadow-2xl border border-white/20 text-center">
                <div className="text-red-500 mb-4">
                  <AlertCircle className="h-16 w-16 mx-auto" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Lỗi khi tải dữ liệu</h3>
                <p className="text-gray-600 mb-6">{error}</p>
                <Button
                  onClick={() => window.location.reload()}
                  className="bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700 text-white rounded-2xl px-6 py-2"
                >
                  Thử lại
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Stats Section */}
        {!isLoading && !error && (
          <div className="mb-16">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { icon: BookOpen, label: "Tổng bài học", value: total, color: "from-blue-500 to-cyan-500" },
                { icon: CheckCircle, label: "Đã hoàn thành", value: grammarLessons.filter(l => l.userProgress?.[0]?.status === "Mastered").length, color: "from-green-500 to-emerald-500" },
                { icon: Brain, label: "Đang học", value: grammarLessons.filter(l => l.userProgress?.[0]?.status === "Learning").length, color: "from-amber-500 to-orange-500" },
                { icon: Star, label: "Điểm trung bình", value: "4.8/5.0", color: "from-purple-500 to-pink-500" }
              ].map((stat, index) => (
                <div key={index} className="relative group">
                  <div className={`absolute inset-0 bg-gradient-to-r ${stat.color} rounded-3xl blur-2xl group-hover:blur-3xl transition-all duration-700 opacity-30`}></div>
                  <div className="relative bg-white/90 backdrop-blur-xl rounded-3xl p-6 text-center shadow-2xl border border-white/20 transform group-hover:scale-105 transition-all duration-500">
                    <div className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r ${stat.color} text-white rounded-2xl mb-4 shadow-lg`}>
                      <stat.icon className="h-8 w-8" />
                    </div>
                    <div className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</div>
                    <div className="text-sm text-gray-600">{stat.label}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* All Lessons */}
        {!isLoading && !error && (
          <div>
            <div className="flex items-center gap-3 mb-8">
              <BookOpen className="h-8 w-8 text-blue-500" />
              <h2 className="text-3xl font-bold text-gray-900">Tất cả bài học</h2>
            </div>
            
            {grammarLessons.length === 0 ? (
              <div className="text-center py-16">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 via-purple-600/10 to-pink-600/10 rounded-3xl blur-3xl"></div>
                  <div className="relative bg-white/80 backdrop-blur-xl rounded-3xl p-12 shadow-2xl border border-white/20">
                    <BookOpen className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Không tìm thấy bài học</h3>
                    <p className="text-gray-600 mb-6">Thử thay đổi bộ lọc hoặc từ khóa tìm kiếm</p>
                    <Button 
                      onClick={() => {
                        setSearchTerm("")
                        setSelectedDifficulty("all")
                        setPage(1)
                      }}
                      className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white rounded-2xl px-6 py-2"
                    >
                      Xóa bộ lọc
                    </Button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {grammarLessons.map((lesson) => (
                  <div
                    key={lesson.id}
                    className="relative group"
                  >
                    <div className={`absolute inset-0 bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-pink-600/20 rounded-3xl blur-2xl group-hover:blur-3xl transition-all duration-700`}></div>
                    <div className="relative bg-white/90 backdrop-blur-xl rounded-3xl overflow-hidden shadow-2xl border border-white/20 transform group-hover:scale-105 group-hover:-translate-y-2 transition-all duration-700">
                      {/* Order Badge */}
                      <div className="absolute top-4 left-4 z-10">
                        <Badge className="bg-gradient-to-r from-purple-400 to-pink-500 text-white px-3 py-1 rounded-full font-bold shadow-lg">
                          #{lesson.orderIndex}
                        </Badge>
                      </div>

                      {/* Difficulty Badge */}
                      <div className="absolute top-4 right-4 z-10">
                        <Badge className={`${getDifficultyColor(lesson.difficultyLevel)} px-3 py-1 rounded-full font-bold shadow-lg`}>
                          {lesson.difficultyLevel}
                        </Badge>
                      </div>

                      {/* Content Placeholder */}
                      <div className="relative h-48 overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 via-purple-500/20 to-pink-500/20"></div>
                        <div className="w-full h-full flex items-center justify-center">
                          <BookOpen className="h-16 w-16 text-blue-600" />
                        </div>
                        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-all duration-300"></div>
                      </div>

                      {/* Content */}
                      <div className="p-6">
                        {/* Difficulty & Examples */}
                        <div className="flex items-center gap-2 mb-3">
                          <Badge className={`${getDifficultyColor(lesson.difficultyLevel)} px-2 py-1 rounded-full text-xs font-medium`}>
                            {lesson.difficultyLevel}
                          </Badge>
                          <Badge className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                            {lesson._count?.examples || 0} ví dụ
                          </Badge>
                        </div>

                        {/* Title */}
                        <CardTitle className="text-xl font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors duration-300">
                          {lesson.title}
                        </CardTitle>

                        {/* Description */}
                        <CardDescription className="text-gray-600 mb-4 line-clamp-2">
                          {lesson.content}
                        </CardDescription>

                        {/* Progress Bar */}
                        <div className="mb-4">
                          <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
                            <span>Tiến độ học tập</span>
                            <span className="font-medium">{lesson.userProgress?.[0]?.masteryLevel || 0}%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div 
                              className="h-2 rounded-full transition-all duration-500"
                              style={{ 
                                width: `${lesson.userProgress?.[0]?.masteryLevel || 0}%`,
                                backgroundColor: (lesson.userProgress?.[0]?.masteryLevel || 0) === 0 ? '#e5e7eb' : 
                                               (lesson.userProgress?.[0]?.masteryLevel || 0) < 50 ? '#ef4444' : 
                                               (lesson.userProgress?.[0]?.masteryLevel || 0) < 100 ? '#f59e0b' : '#10b981'
                              }}
                            />
                          </div>
                          <div className="text-xs text-gray-500 mt-1">
                            {lesson.userProgress?.[0]?.status === "Mastered" ? "Đã hoàn thành" : 
                             lesson.userProgress?.[0]?.status === "Learning" ? "Đang học" : "Chưa bắt đầu"}
                          </div>
                        </div>

                        {/* Lesson Details */}
                        <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                          <div className="flex items-center gap-2">
                            <Clock className="h-4 w-4" />
                            <span>#{lesson.orderIndex}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <BookOpen className="h-4 w-4" />
                            <span>{lesson._count?.examples || 0} ví dụ</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Star className="h-4 w-4 text-yellow-500 fill-current" />
                            <span>{lesson.difficultyLevel}</span>
                          </div>
                        </div>

                        {/* Action Button */}
                        <Button 
                          asChild
                          className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white rounded-2xl py-3 transform hover:scale-105 transition-all duration-300 shadow-lg"
                        >
                          <Link href={`/grammar/${lesson.id}`}>
                            {!lesson.userProgress?.[0] ? 'Bắt đầu học' : 
                             lesson.userProgress[0].status === "Learning" ? 'Tiếp tục học' : 'Đã hoàn thành'}
                            <ArrowRight className="h-4 w-4 ml-2" />
                          </Link>
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Pagination */}
            {total > 0 && (
              <div className="mt-12">
                <Pagination
                  page={page}
                  limit={limit}
                  setPage={setPage}
                  total={total}
                />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}