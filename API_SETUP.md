# Cấu hình API cho Hệ thống Authentication

## 📝 Tạo file .env

Tạo file `.env` trong thư mục gốc của project (`sonit-custom/.env`):

```env
# API Configuration
VITE_API_BASE_URL=http://localhost:3000/api
```

## 🔧 Cấu hình API URL

Thay đổi `VITE_API_BASE_URL` theo server của bạn:

### Development:
```env
VITE_API_BASE_URL=http://localhost:3000/api
```

### Production:
```env
VITE_API_BASE_URL=https://your-api-domain.com/api
```

## 🎯 API Endpoints cần thiết

Server của bạn cần có các endpoint sau:

### 1. Login
```
POST /auth/login
Content-Type: application/json

Body:
{
  "email": "user@example.com",
  "password": "password123"
}

Response:
{
  "user": {
    "id": 1,
    "email": "user@example.com",
    "name": "User Name"
  },
  "accessToken": "jwt-access-token-here",
  "refreshToken": "jwt-refresh-token-here"
}
```

### 2. Refresh Token
```
POST /auth/refresh
Content-Type: application/json

Body:
{
  "refreshToken": "jwt-refresh-token-here"
}

Response:
{
  "accessToken": "new-jwt-access-token",
  "refreshToken": "new-jwt-refresh-token"
}
```

### 3. Logout
```
POST /auth/logout
Authorization: Bearer jwt-access-token

Response:
{
  "message": "Logged out successfully"
}
```

### 4. Get Profile
```
GET /auth/profile
Authorization: Bearer jwt-access-token

Response:
{
  "id": 1,
  "email": "user@example.com",
  "name": "User Name"
}
```

## ❌ Error Response Format

Khi có lỗi, server nên trả về:

```json
{
  "message": "Email hoặc mật khẩu không đúng"
}
```

## 🔒 JWT Token Requirements

- **Access Token**: Thời gian sống ngắn (15-30 phút)
- **Refresh Token**: Thời gian sống dài hơn (7-30 ngày)
- **Format**: JWT standard
- **Algorithm**: HS256 hoặc RS256

## 🚀 Cách test

1. **Tạo file .env** với API URL đúng
2. **Khởi động server** API của bạn
3. **Chạy frontend**: `npm run dev`
4. **Test đăng nhập** với tài khoản thật

## 📋 Checklist

- [ ] Server API đang chạy
- [ ] File .env đã tạo với URL đúng
- [ ] Các endpoint đã implement
- [ ] JWT tokens được generate đúng format
- [ ] CORS đã cấu hình cho frontend domain
- [ ] Error handling đã implement

## 🔧 Troubleshooting

### Lỗi CORS:
```javascript
// Trong server, thêm CORS middleware
app.use(cors({
  origin: 'http://localhost:5173', // Frontend URL
  credentials: true
}));
```

### Lỗi 404:
- Kiểm tra API URL trong .env
- Đảm bảo server đang chạy
- Kiểm tra endpoint paths

### Lỗi 401:
- Kiểm tra JWT token format
- Đảm bảo Authorization header đúng
- Kiểm tra token expiration 