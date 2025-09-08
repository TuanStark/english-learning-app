# Logo Usage Guide

## Logo Files Created

### Main Logo
- **`/public/images/logo.png`** - Main logo file (from logo3.jpg)
- **`/public/images/logo3.jpg`** - Original logo file

### SEO & Social Media
- **`/public/images/seo-default.jpg`** - Default SEO image
- **`/public/favicon.ico`** - Browser favicon

### PWA & Mobile Icons
- **`/public/images/logo-192x192.png`** - PWA icon 192x192
- **`/public/images/logo-512x512.png`** - PWA icon 512x512
- **`/public/images/apple-touch-icon.png`** - Apple touch icon 180x180

## Usage in Code

### 1. SEO Configuration
```typescript
// In /src/lib/seo.ts
export const SEO_CONFIG = {
  image: '/images/logo.png', // Default SEO image
  // ... other config
}
```

### 2. Icon Generation
- **`/src/app/icon.tsx`** - Generates favicon using logo
- **`/src/app/apple-icon.tsx`** - Generates Apple touch icon using logo
- **`/src/app/opengraph-image.tsx`** - Generates OpenGraph image with logo
- **`/src/app/twitter-image.tsx`** - Generates Twitter card image with logo

### 3. PWA Manifest
```typescript
// In /src/app/manifest.ts
icons: [
  {
    src: '/images/logo-192x192.png',
    sizes: '192x192',
    type: 'image/png',
    purpose: 'maskable',
  },
  // ... other sizes
]
```

### 4. Structured Data
```typescript
// In SEO functions
publisher: {
  '@type': 'Organization',
  name: 'English Learning App',
  logo: {
    '@type': 'ImageObject',
    url: '/images/logo.png',
  },
}
```

## Logo Description

The logo features:
- **Design**: Modern, abstract open book/shield shape
- **Colors**: Blue-to-purple gradient (electric blue to deep purple)
- **Symbol**: Stylized letter 'E' in light color
- **Style**: Soft UI/neumorphic design with subtle shadows
- **Meaning**: Represents education, knowledge, and English learning

## Where Logo Appears

### Browser
- ✅ **Favicon** - Browser tab icon
- ✅ **Bookmark** - When users bookmark the site

### Social Media
- ✅ **Facebook** - OpenGraph image when sharing
- ✅ **Twitter** - Twitter card image when sharing
- ✅ **LinkedIn** - Preview image when sharing

### Mobile
- ✅ **iOS** - Apple touch icon when adding to home screen
- ✅ **Android** - PWA icon when installing as app
- ✅ **PWA** - App icon in app stores and home screen

### SEO
- ✅ **Google** - Rich snippets and search results
- ✅ **Structured Data** - Organization logo in schema markup
- ✅ **Sitemap** - Referenced in meta tags

## File Sizes & Formats

| File | Size | Format | Purpose |
|------|------|--------|---------|
| logo.png | Original | PNG | Main logo, SEO |
| logo-192x192.png | 192x192 | PNG | PWA icon |
| logo-512x512.png | 512x512 | PNG | PWA icon |
| apple-touch-icon.png | 180x180 | PNG | iOS home screen |
| favicon.ico | 32x32 | ICO | Browser tab |
| seo-default.jpg | Original | JPG | Default SEO image |

## Best Practices

1. **Consistency**: Use the same logo across all platforms
2. **Quality**: Maintain high resolution for all sizes
3. **Accessibility**: Always include alt text for images
4. **Performance**: Optimize file sizes for web delivery
5. **Branding**: Ensure logo represents the English learning theme

## Maintenance

- **Updates**: Replace all logo files when updating the brand
- **Testing**: Test logo display across different devices and browsers
- **Validation**: Use SEO tools to verify logo appears correctly
- **Backup**: Keep original logo files in version control
