# SEO System Documentation

## Tổng quan
Hệ thống SEO được thiết kế chuyên nghiệp giống các dự án thực tế, bao gồm:

## Cấu trúc Files

### 1. `/src/lib/seo.ts`
- **SEO Configuration**: Cấu hình chung cho toàn bộ website
- **Utility Functions**: Các hàm tiện ích để tạo metadata
- **Structured Data**: Schema.org markup cho SEO
- **Page Metadata**: Metadata cho từng loại trang

### 2. `/src/app/robots.ts`
- Tạo file `robots.txt` tự động
- Cấu hình cho các search engine bots
- Disallow các trang private/admin

### 3. `/src/app/sitemap.ts`
- Tạo file `sitemap.xml` tự động
- Bao gồm tất cả static và dynamic pages
- Cập nhật lastModified và priority

### 4. `/src/app/manifest.ts`
- PWA manifest cho Progressive Web App
- Icons, shortcuts, và screenshots
- Cấu hình cho mobile app experience

### 5. Icon Files
- `/src/app/icon.tsx` - Favicon 32x32
- `/src/app/apple-icon.tsx` - Apple touch icon 180x180
- `/src/app/opengraph-image.tsx` - OpenGraph image 1200x630
- `/src/app/twitter-image.tsx` - Twitter card image 1200x630

## Cách sử dụng

### 1. Trong các trang detail (Blog, Vocabulary, Grammar, Exams)
```typescript
import { generatePageMetadata, generateArticleStructuredData } from '@/lib/seo'

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  return generatePageMetadata({
    title: 'Page Title',
    description: 'Page description',
    keywords: ['keyword1', 'keyword2'],
    type: 'article',
    publishedTime: '2024-01-01',
    author: 'Author Name',
  })
}
```

### 2. Structured Data
```typescript
const structuredData = generateArticleStructuredData({
  title: 'Article Title',
  description: 'Article description',
  url: '/article/1',
  publishedTime: '2024-01-01',
  author: 'Author Name',
})

// Trong component
<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{
    __html: JSON.stringify(structuredData),
  }}
/>
```

### 3. Breadcrumb Navigation
```typescript
const breadcrumbData = generateBreadcrumbStructuredData([
  { name: 'Trang chủ', url: '/' },
  { name: 'Blog', url: '/blog' },
  { name: 'Article Title', url: '/blog/1' },
])
```

## Environment Variables

Thêm vào `.env.local`:
```env
NEXT_PUBLIC_SITE_URL=https://your-domain.com
GOOGLE_SITE_VERIFICATION=your_verification_code
YANDEX_VERIFICATION=your_verification_code
YAHOO_VERIFICATION=your_verification_code
```

## Features

### ✅ SEO Features
- [x] Dynamic metadata generation
- [x] OpenGraph tags
- [x] Twitter Card tags
- [x] Structured data (Schema.org)
- [x] Breadcrumb navigation
- [x] Canonical URLs
- [x] Robots.txt
- [x] Sitemap.xml
- [x] PWA manifest

### ✅ Performance
- [x] Static generation với `generateStaticParams`
- [x] Server-side rendering
- [x] Image optimization
- [x] Lazy loading

### ✅ Accessibility
- [x] Semantic HTML
- [x] Alt text cho images
- [x] ARIA labels
- [x] Keyboard navigation

## Testing SEO

### 1. Google Search Console
- Submit sitemap: `https://your-domain.com/sitemap.xml`
- Monitor indexing status
- Check for crawl errors

### 2. SEO Tools
- [Google Rich Results Test](https://search.google.com/test/rich-results)
- [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/)
- [Twitter Card Validator](https://cards-dev.twitter.com/validator)

### 3. Lighthouse
- Run Lighthouse audit
- Check Performance, SEO, Accessibility scores
- Optimize based on recommendations

## Best Practices

1. **Unique Titles**: Mỗi trang có title duy nhất
2. **Meta Descriptions**: 150-160 ký tự, hấp dẫn
3. **Keywords**: Tự nhiên, không spam
4. **Images**: Alt text và proper sizing
5. **URLs**: Clean, descriptive URLs
6. **Loading Speed**: Optimize images và code
7. **Mobile-First**: Responsive design
8. **HTTPS**: Secure connection

## Monitoring

### Analytics
- Google Analytics 4
- Google Search Console
- Core Web Vitals

### Metrics to Track
- Organic traffic
- Keyword rankings
- Click-through rates
- Bounce rates
- Page load speed
- Mobile usability

## Troubleshooting

### Common Issues
1. **Metadata not showing**: Check if `generateMetadata` is exported
2. **Images not loading**: Verify image paths và sizes
3. **Structured data errors**: Use Google's Rich Results Test
4. **Sitemap not updating**: Check API responses và error handling

### Debug Tools
- Next.js built-in metadata viewer
- Browser DevTools
- SEO browser extensions
- Google Search Console
