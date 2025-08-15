# EnglishMaster - Nền tảng luyện thi TOEIC & IELTS

Website luyện đề và làm bài tập tiếng Anh được xây dựng với Next.js 14, TailwindCSS và TypeScript.

## ✨ Tính năng

### 🎯 Giai đoạn 1 - Hoàn thành 100%
- **🏠 Trang chủ hiện đại**: 
  - Hero section với gradient text và animations
  - Section testimonials với carousel tương tác
  - Features chi tiết với demo tương tác
  - Pricing plans với toggle annual/monthly
  - Partners & certifications để tăng độ uy tín
  - Newsletter signup với form validation
  - Stats section với counter animations
- **📚 Luyện đề**: Danh sách đề thi với bộ lọc theo loại và độ khó
- **⏱️ Làm bài thi**: Timer đếm ngược, progress bar, navigation câu hỏi
- **📊 Kết quả**: Chấm điểm tự động, xem đáp án, giải thích chi tiết
- **📖 Từ vựng**: Flashcard với phát âm và ví dụ
- **📝 Ngữ pháp**: Bài học có hệ thống với ví dụ và bài tập

### 🛠️ Công nghệ sử dụng
- **Framework**: Next.js 14 (App Router)
- **Styling**: TailwindCSS với dark mode
- **Language**: TypeScript (strict mode)
- **Icons**: Lucide React
- **UI Components**: Custom components với TailwindCSS
- **State Management**: React Hooks

### 🎨 Thiết kế UX/UI 2025
- **Phong cách**: Modern, minimal, thân thiện với UX/UI trends 2025
- **Màu sắc**: Gradient backgrounds, glass morphism effects
- **Typography**: Inter font với hierarchy rõ ràng
- **Responsive**: Mobile-first design hoàn hảo
- **Dark Mode**: Toggle theme mượt mà
- **Animation**: 
  - Stagger animations cho lists
  - Micro-interactions trên buttons
  - Parallax scrolling effects
  - Morphing backgrounds
  - Shine effects và glowing buttons
  - Typing effects và reveal animations

## 🚀 Cài đặt và chạy

### Prerequisites
- Node.js 18+ 
- npm hoặc yarn

### Cài đặt
```bash
# Clone repository
git clone <repository-url>
cd english-learning-app

# Cài đặt dependencies
npm install

# Chạy development server
npm run dev
```

Mở [http://localhost:3000](http://localhost:3000) để xem ứng dụng.

### Scripts có sẵn
```bash
npm run dev          # Chạy development server
npm run build        # Build cho production
npm run start        # Chạy production server
npm run lint         # Kiểm tra ESLint
```

## 📁 Cấu trúc thư mục

```
src/
├── app/                    # App Router pages
│   ├── (auth)/            # Auth layout group (no header/footer)
│   │   ├── login/         # Trang đăng nhập
│   │   ├── register/      # Trang đăng ký
│   │   ├── forgot-password/ # Quên mật khẩu
│   │   └── layout.tsx     # Auth layout riêng
│   ├── dashboard/         # Dashboard sau đăng nhập
│   ├── profile/           # Trang hồ sơ cá nhân
│   ├── exams/             # Trang luyện đề
│   ├── vocabulary/        # Trang từ vựng
│   ├── grammar/           # Trang ngữ pháp
│   └── layout.tsx         # Root layout (có header/footer)
├── components/
│   ├── ui/                # UI components cơ bản
│   ├── layout/            # Header, Footer
│   ├── sections/          # Sections cho trang chủ
│   ├── auth/              # Auth components và guards
│   └── exam/              # Components cho exam
├── lib/
│   ├── utils.ts           # Utility functions
│   └── mock-data.ts       # Mock data
└── types/
    └── index.ts           # TypeScript types
```

## 🎮 Hướng dẫn sử dụng

### Luyện đề thi
1. Vào trang "Luyện đề" từ menu
2. Lọc theo loại thi (TOEIC/IELTS) và độ khó
3. Chọn đề thi và nhấn "Làm bài ngay"
4. Làm bài với timer đếm ngược
5. Nộp bài và xem kết quả chi tiết

### Học từ vựng
1. Vào trang "Từ vựng"
2. Lọc theo chủ đề và mức độ
3. Nhấn vào flashcard để xem nghĩa
4. Đánh dấu từ đã học

### Học ngữ pháp
1. Vào trang "Ngữ pháp"
2. Chọn bài học theo mức độ
3. Đọc nội dung và ví dụ
4. Làm bài tập thực hành

## 🔮 Kế hoạch phát triển (Giai đoạn 2)

- [ ] **Hệ thống tài khoản**: Đăng ký/đăng nhập
- [ ] **Lưu tiến trình**: Database integration
- [ ] **Thống kê cá nhân**: Tracking progress
- [ ] **Lịch sử làm bài**: Xem lại kết quả cũ
- [ ] **Flashcard nâng cao**: Spaced repetition
- [ ] **Discussion forum**: Cộng đồng học tập
- [ ] **Mobile app**: React Native version

## 📊 Mock Data

Ứng dụng sử dụng mock data cho:
- 4 đề thi mẫu (TOEIC & IELTS)
- 5 câu hỏi trắc nghiệm
- 3 từ vựng với flashcard
- 2 bài ngữ pháp với ví dụ

## 🎨 UI/UX Features

- **Responsive Design**: Tối ưu cho mọi thiết bị
- **Dark Mode**: Chuyển đổi theme sáng/tối
- **Loading States**: Skeleton và spinner
- **Error Handling**: Graceful error messages
- **Accessibility**: Screen reader friendly
- **Performance**: Optimized components

## 📝 License

Dự án này được phát triển cho mục đích học tập và giáo dục.

## 👥 Đóng góp

Hoan nghênh mọi đóng góp! Hãy tạo issue hoặc pull request.

---

**Phát triển bởi**: EnglishMaster Team  
**Email**: contact@englishmaster.vn  
**Website**: [englishmaster.vn](https://englishmaster.vn)