"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import { 
  Search, 
  Filter, 
  BookOpen, 
  Users, 
  Star, 
  Clock, 
  Play,
  Sparkles,
  Brain,
  Zap,
  Target,
  GraduationCap,
  Heart,
  Crown,
  TrendingUp,
  Award,
  Globe,
  Lightbulb,
  Rocket,
  Eye,
  ArrowRight,
  CheckCircle,
  MessageCircle,
  BookMarked,
  Flame,
  AlertCircle
} from "lucide-react"
import Link from "next/link"
import { useVocabulary } from '@/hooks/useVocabulary';

export default function VocabularyPage() {
  const {
    topics,
    vocabularies,
    loading,
    error,
    getVocabulariesCountByTopic,
    getTotalVocabulariesCount,
    getVocabulariesByDifficultyCount,
    filterVocabularies
  } = useVocabulary();

  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedLevel, setSelectedLevel] = useState("all")
  const [hoveredSet, setHoveredSet] = useState<number | null>(null)

  // Transform backend data to match UI structure
  const vocabularySets = topics.map(topic => {
    const topicVocabularies = vocabularies.filter(vocab => vocab.topicId === topic.id);
    
    return {
      id: topic.id,
      title: topic.topicName,
      description: topic.description || `Học từ vựng về chủ đề ${topic.topicName}`,
      instructor: "System Generated",
      instructorAvatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
      level: topicVocabularies.length > 100 ? "Advanced" : topicVocabularies.length > 50 ? "Intermediate" : "Beginner",
      category: topic.topicName,
      wordCount: topicVocabularies.length,
      duration: `${Math.ceil(topicVocabularies.length / 20)} weeks`,
      students: Math.floor(Math.random() * 2000) + 100,
      rating: 4.5 + Math.random() * 0.5,
      reviews: Math.floor(Math.random() * 200) + 20,
      progress: Math.floor(Math.random() * 100),
      isNew: topic.createdAt > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
      isFree: topic.orderIndex <= 3,
      thumbnail: topic.image || "https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=250&fit=crop",
      features: ["Flashcards", "Audio Pronunciation", "Practice Tests", "Progress Tracking"],
      tags: [topic.topicName, "Vocabulary", "English Learning"]
    };
  });

  // Get unique categories and levels from backend data
  const categories = ["all", ...Array.from(new Set(vocabularySets.map(set => set.category)))]
  const levels = ["all", ...Array.from(new Set(vocabularySets.map(set => set.level)))]

  const filteredSets = vocabularySets.filter(set => {
    const matchesSearch = set.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         set.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "all" || set.category === selectedCategory
    const matchesLevel = selectedLevel === "all" || set.level === selectedLevel
    
    return matchesSearch && matchesCategory && matchesLevel
  })

  const getLevelColor = (level: string) => {
    switch (level) {
      case "Beginner":
        return "bg-gradient-to-r from-green-500 to-emerald-500 text-white"
      case "Intermediate":
        return "bg-gradient-to-r from-blue-500 to-cyan-500 text-white"
      case "Advanced":
        return "bg-gradient-to-r from-purple-500 to-pink-500 text-white"
      default:
        return "bg-gradient-to-r from-gray-500 to-slate-500 text-white"
    }
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "Business":
        return <Target className="h-4 w-4" />
      case "Academic":
        return <GraduationCap className="h-4 w-4" />
      case "Conversation":
        return <MessageCircle className="h-4 w-4" />
      case "Medical":
        return <Heart className="h-4 w-4" />
      case "Travel":
        return <Globe className="h-4 w-4" />
      case "Technology":
        return <Zap className="h-4 w-4" />
      default:
        return <BookOpen className="h-4 w-4" />
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Business":
        return "bg-gradient-to-r from-blue-500 to-cyan-500 text-white"
      case "Academic":
        return "bg-gradient-to-r from-purple-500 to-pink-500 text-white"
      case "Conversation":
        return "bg-gradient-to-r from-green-500 to-emerald-500 text-white"
      case "Medical":
        return "bg-gradient-to-r from-red-500 to-pink-500 text-white"
      case "Travel":
        return "bg-gradient-to-r from-amber-500 to-orange-500 text-white"
      case "Technology":
        return "bg-gradient-to-r from-indigo-500 to-purple-500 text-white"
      default:
        return "bg-gradient-to-r from-gray-500 to-slate-500 text-white"
    }
  }

  const getProgressColor = (progress: number) => {
    if (progress === 0) return "bg-gray-200"
    if (progress < 50) return "bg-red-500"
    if (progress < 100) return "bg-yellow-500"
    return "bg-green-500"
  }

  const getProgressText = (progress: number) => {
    if (progress === 0) return "Chưa bắt đầu"
    if (progress < 50) return "Đang học"
    if (progress < 100) return "Gần hoàn thành"
    return "Đã hoàn thành"
  }

  return (
    <div className="min-h-screen bg-white relative overflow-hidden">
      {/* Floating Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-40 h-40 bg-gradient-to-br from-blue-200/20 to-cyan-200/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-40 right-20 w-32 h-32 bg-gradient-to-br from-purple-200/20 to-pink-200/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-20 left-1/4 w-48 h-48 bg-gradient-to-br from-amber-200/20 to-orange-200/20 rounded-full blur-3xl animate-pulse delay-2000"></div>
        <div className="absolute top-1/2 right-1/3 w-24 h-24 bg-gradient-to-br from-green-200/20 to-emerald-200/20 rounded-full blur-3xl animate-pulse delay-1500"></div>
        <div className="absolute top-1/3 left-1/3 w-36 h-36 bg-gradient-to-br from-indigo-200/20 to-purple-200/20 rounded-full blur-3xl animate-pulse delay-3000"></div>
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
                  Vocabulary Builder
                </h1>
                <Sparkles className="h-8 w-8 text-purple-600 animate-pulse" />
              </div>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                Xây dựng vốn từ vựng tiếng Anh phong phú với các bộ từ chuyên ngành, 
                phương pháp học hiệu quả và bài tập thực hành đa dạng
              </p>
            </div>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="mb-12">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 via-purple-600/10 to-pink-600/10 rounded-3xl blur-3xl"></div>
            <div className="relative bg-white/80 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/20">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Search */}
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <Input
                    type="text"
                    placeholder="Tìm kiếm bộ từ vựng..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-12 pr-4 py-3 rounded-2xl border-0 bg-white/50 backdrop-blur-sm focus:bg-white focus:ring-2 focus:ring-blue-500 transition-all duration-300"
                  />
                </div>
                
                {/* Category Filter */}
                <div className="relative">
                  <Filter className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 rounded-2xl border-0 bg-white/50 backdrop-blur-sm focus:bg-white focus:ring-2 focus:ring-blue-500 transition-all duration-300 appearance-none cursor-pointer"
                  >
                    {categories.map(category => (
                      <option key={category} value={category}>
                        {category === "all" ? "Tất cả danh mục" : category}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Level Filter */}
                <div className="relative">
                  <Zap className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <select
                    value={selectedLevel}
                    onChange={(e) => setSelectedLevel(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 rounded-2xl border-0 bg-white/50 backdrop-blur-sm focus:bg-white focus:ring-2 focus:ring-blue-500 transition-all duration-300 appearance-none cursor-pointer"
                  >
                    {levels.map(level => (
                      <option key={level} value={level}>
                        {level === "all" ? "Tất cả cấp độ" : level}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="mb-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { icon: BookOpen, label: "Tổng bộ từ vựng", value: vocabularySets.length, color: "from-blue-500 to-cyan-500" },
              { icon: Target, label: "Tổng từ vựng", value: getTotalVocabulariesCount(), color: "from-purple-500 to-pink-500" },
              { icon: Brain, label: "Đã học", value: vocabularySets.filter(s => s.progress > 0).length, color: "from-amber-500 to-orange-500" },
              { icon: Star, label: "Điểm trung bình", value: "4.8/5.0", color: "from-green-500 to-emerald-500" }
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

        {/* Loading State */}
        {loading && (
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
       
        {/* All Sets */}
        {!loading && !error && (
          <div>
            <div className="flex items-center gap-3 mb-8">
              <BookOpen className="h-8 w-8 text-blue-500" />
              <h2 className="text-3xl font-bold text-gray-900">Tất cả bộ từ vựng</h2>
            </div>
            
            {filteredSets.length === 0 ? (
              <div className="text-center py-16">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 via-purple-600/10 to-pink-600/10 rounded-3xl blur-3xl"></div>
                  <div className="relative bg-white/80 backdrop-blur-xl rounded-3xl p-12 shadow-2xl border border-white/20">
                    <BookOpen className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Không tìm thấy bộ từ vựng</h3>
                    <p className="text-gray-600 mb-6">Thử thay đổi bộ lọc hoặc từ khóa tìm kiếm</p>
                    <Button 
                      onClick={() => {
                        setSearchTerm("")
                        setSelectedCategory("all")
                        setSelectedLevel("all")
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
                {filteredSets.map((set) => (
                  <div
                    key={set.id}
                    className="relative group"
                    onMouseEnter={() => setHoveredSet(set.id)}
                    onMouseLeave={() => setHoveredSet(null)}
                  >
                    <div className={`absolute inset-0 bg-gradient-to-r from-blue-600/10 via-purple-600/10 to-pink-600/10 rounded-3xl blur-2xl group-hover:blur-3xl transition-all duration-700`}></div>
                    <div className="relative bg-white/90 backdrop-blur-xl rounded-3xl overflow-hidden shadow-2xl border border-white/20 transform group-hover:scale-105 group-hover:-translate-y-2 transition-all duration-700">
                      {/* Free Badge */}
                      {set.isFree && (
                        <div className="absolute top-4 right-4 z-10">
                          <Badge className="bg-gradient-to-r from-blue-400 to-cyan-500 text-white px-3 py-1 rounded-full font-bold shadow-lg">
                            <CheckCircle className="h-3 w-3 mr-1" />
                            Free
                          </Badge>
                        </div>
                      )}

                      {/* Thumbnail */}
                      <div className="relative h-48 overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 via-purple-500/20 to-pink-500/20"></div>
                        <img 
                          src={set.thumbnail} 
                          alt={set.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                        />
                        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-all duration-300"></div>
                      </div>

                      {/* Content */}
                      <div className="p-6">
                        {/* Category & Level */}
                        <div className="flex items-center gap-2 mb-3">
                          <Badge className={`${getCategoryColor(set.category)} px-2 py-1 rounded-full text-xs font-medium`}>
                            {getCategoryIcon(set.category)}
                            <span className="ml-1">{set.category}</span>
                          </Badge>
                          <Badge className={`${getLevelColor(set.level)} px-2 py-1 rounded-full text-xs font-medium`}>
                            {set.level}
                          </Badge>
                        </div>

                        {/* Title */}
                        <CardTitle className="text-xl font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors duration-300">
                          {set.title}
                        </CardTitle>

                        {/* Description */}
                        <CardDescription className="text-gray-600 mb-4 line-clamp-2">
                          {set.description}
                        </CardDescription>

                        {/* Word Count & Progress */}
                        <div className="mb-4">
                          <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
                            <span>Từ vựng: {set.wordCount} từ</span>
                            <span className="font-medium">{set.progress}%</span>
                          </div>
                          <Progress value={set.progress} className="h-2 bg-gray-200">
                            <div 
                              className="h-2 rounded-full transition-all duration-500"
                              style={{ 
                                width: `${set.progress}%`,
                                backgroundColor: set.progress === 0 ? '#e5e7eb' : 
                                               set.progress < 50 ? '#ef4444' : 
                                               set.progress < 100 ? '#f59e0b' : '#10b981'
                              }}
                            />
                          </Progress>
                          <div className="text-xs text-gray-500 mt-1">{getProgressText(set.progress)}</div>
                        </div>

                        {/* Instructor */}
                        <div className="flex items-center gap-3 mb-4">
                          <img 
                            src={set.instructorAvatar} 
                            alt={set.instructor}
                            className="w-8 h-8 rounded-full object-cover"
                          />
                          <span className="text-sm text-gray-700 font-medium">{set.instructor}</span>
                        </div>

                        {/* Set Details */}
                        <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                          <div className="flex items-center gap-2">
                            <Clock className="h-4 w-4" />
                            <span>{set.duration}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Users className="h-4 w-4" />
                            <span>{set.students.toLocaleString()}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Star className="h-4 w-4 text-yellow-500 fill-current" />
                            <span>{set.rating}</span>
                          </div>
                        </div>

                        {/* Action Button */}
                        <Button 
                          asChild
                          variant="outline"
                          className="w-full border-2 border-blue-200 text-blue-600 hover:bg-blue-50 hover:border-blue-300 rounded-2xl py-3 transform hover:scale-105 transition-all duration-300"
                        >
                          <Link href={`/vocabulary/${set.id}`}>
                            {set.progress === 0 ? 'Bắt đầu học' : 
                             set.progress < 100 ? 'Tiếp tục học' : 'Đã hoàn thành'}
                            <ArrowRight className="h-4 w-4 ml-2" />
                          </Link>
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
