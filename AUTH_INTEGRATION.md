# Authentication System Integration

## Tổng quan

Hệ thống xác thực đã được tích hợp với backend API và localStorage để quản lý thông tin người dùng một cách hiệu quả.

## Các thành phần chính

### 1. API Integration (`src/lib/api.ts`)

- **API Base URL**: `${process.env.NEXT_PUBLIC_BACKEND_URL}`
- **Endpoints**:
  - `POST /auth/register` - Đăng ký người dùng mới
  - `POST /auth/login` - Đăng nhập
  - `GET /user/profile` - Lấy thông tin profile người dùng

- **Error Handling**: Xử lý lỗi HTTP với thông báo chi tiết
- **TypeScript Support**: Interface đầy đủ cho tất cả API calls

### 2. Authentication Configuration (`src/lib/auth.ts`)

- **NextAuth Integration**: Sử dụng NextAuth với credentials provider
- **Backend API Calls**: Tự động gọi API khi đăng nhập
- **Profile Fetching**: Lấy thông tin profile sau khi đăng nhập thành công
- **LocalStorage Management**: Tự động lưu và xóa dữ liệu người dùng

### 3. LocalStorage Management (`src/hooks/use-local-storage.ts`)

- **Custom Hook**: `useUserData()` để quản lý dữ liệu người dùng
- **Utility Functions**: Các hàm tiện ích để truy cập localStorage
- **Error Handling**: Xử lý lỗi khi localStorage không khả dụng
- **Cross-tab Sync**: Đồng bộ dữ liệu giữa các tab

### 4. Authentication Hook (`src/hooks/use-auth.ts`)

- **Role Management**: Hỗ trợ cấu trúc role object phức tạp
- **Role Checks**: `isAdmin`, `isTeacher`, `isStudent` với logic thông minh
- **Access Token**: Truy cập access token từ session
- **Provider Info**: Thông tin về provider đăng nhập

### 4. Registration Form (`src/app/auth/page.tsx`)

- **API Integration**: Sử dụng `authApi.register()` thay vì fetch trực tiếp
- **Error Handling**: Hiển thị lỗi validation và server errors
- **Data Preparation**: Loại bỏ `confirmPassword` trước khi gửi API

## Cách sử dụng

### Đăng ký người dùng mới

```typescript
import { authApi } from '@/lib/api'

try {
  const result = await authApi.register({
    fullName: "John Doe",
    email: "john@example.com",
    password: "password123"
  })
  console.log("Registration successful:", result)
} catch (error) {
  if (error instanceof ApiError) {
    console.error(`Error ${error.status}:`, error.message)
  }
}
```

### Quản lý dữ liệu localStorage

```typescript
import { useUserData, localStorageUtils } from '@/hooks/use-local-storage'

function MyComponent() {
  const [userData, setUserData, removeUserData] = useUserData()
  
  // Lưu dữ liệu
  setUserData({ id: "1", name: "John", email: "john@example.com" })
  
  // Xóa dữ liệu
  removeUserData()
  
  // Truy cập trực tiếp
  const data = localStorageUtils.getItem('userData')
}
```

### Kiểm tra trạng thái đăng nhập

```typescript
import { useAuth } from '@/hooks/use-auth'

function MyComponent() {
  const { 
    user, 
    isLoading, 
    isAuthenticated, 
    isAdmin, 
    isTeacher, 
    isStudent,
    roleName,
    accessToken 
  } = useAuth()
  
  if (isLoading) return <div>Loading...</div>
  if (!isAuthenticated) return <div>Please sign in</div>
  
  return (
    <div>
      <h1>Welcome, {user?.name}!</h1>
      <p>Role: {roleName}</p>
      {isAdmin && <p>You have admin privileges</p>}
      {isTeacher && <p>You can access teacher features</p>}
    </div>
  )
}
```

## Luồng xác thực

1. **Đăng ký**:
   - User nhập thông tin → Form validation → API call → Success/Error message

2. **Đăng nhập**:
   - User nhập credentials → NextAuth authorize → Backend API call → Profile fetch → LocalStorage storage → Session creation

3. **Quản lý session**:
   - NextAuth quản lý JWT token
   - User data được lưu trong localStorage
   - Profile data được fetch từ backend

4. **Đăng xuất**:
   - NextAuth signOut → LocalStorage clear → Session destroy

## Error Handling

### Registration Errors
- **400 Bad Request**: Validation errors hoặc dữ liệu không hợp lệ
- **409 Conflict**: Email đã tồn tại
- **500 Server Error**: Lỗi server

### Login Errors
- **401 Unauthorized**: Credentials không đúng
- **500 Server Error**: Lỗi server

### Network Errors
- Connection timeout
- Server không phản hồi
- CORS issues

## Development

### Demo Credentials (Fallback)
- `demo@example.com` / `demo123` - Student user
- `admin@englishpro.com` / `admin123` - Admin user  
- `teacher@englishpro.com` / `teacher123` - Teacher user

### Testing LocalStorage
Sử dụng component `LocalStorageDemo` để test localStorage functionality:

```typescript
import { LocalStorageDemo } from '@/components/auth/local-storage-demo'

// Trong component của bạn
<LocalStorageDemo />
```

## Environment Variables

```bash
# Backend API
NEXT_PUBLIC_API_BASE_URL=${process.env.NEXT_PUBLIC_BACKEND_URL}

# NextAuth (nếu cần)
NEXTAUTH_SECRET=your-secret-key
NEXTAUTH_URL=http://localhost:3000
```

## Troubleshooting

### Lỗi 400 Bad Request
- Kiểm tra format dữ liệu gửi lên API
- Đảm bảo tất cả required fields được điền
- Kiểm tra validation rules trên backend

### LocalStorage Errors
- Kiểm tra browser support
- Kiểm tra storage quota
- Xử lý private browsing mode

### API Connection Issues
- Kiểm tra backend server có đang chạy không
- Kiểm tra CORS configuration
- Kiểm tra network connectivity

## Security Considerations

- **Token Storage**: Access token được lưu trong session, không phải localStorage
- **Data Validation**: Validation được thực hiện cả client và server
- **Error Messages**: Không expose sensitive information trong error messages
- **HTTPS**: Sử dụng HTTPS trong production
