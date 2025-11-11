# 📌 Blog & User API

## Giới thiệu
API này cung cấp các chức năng:
- Quản lý **User** (đăng ký, đăng nhập, profile).
- Quản lý **Blog** (CRUD, thùng rác, khôi phục, xóa vĩnh viễn).
- Quản lý **Comment** (thêm, sửa, xóa, trả lời).
- Like/Dislike cho blog và comment.



---

## Base URL
```
http://localhost:3000/
```

---

## 1. User API
| Method | Endpoint       | Auth | Mô tả                  |
|--------|---------------|------|-------------------------|
| POST   | `/register`   | ❌   | Đăng ký tài khoản      |
| POST   | `/login`      | ❌   | Đăng nhập, trả về JWT  |
| GET    | `/profile`    | ✅   | Lấy thông tin người dùng|

**Ví dụ đăng ký:**
```bash
POST /register
Content-Type: application/json
{
  "username": "nam",
  "password": "123456"
}
```

**Đăng nhập trả về:**
```json
{
  "message": "Đăng nhập thành công",
  "token": "JWT_TOKEN"
}
```

---

## 2. Blog API
| Method | Endpoint                | Auth | Mô tả                     |
|--------|-------------------------|------|---------------------------|
| POST   | `/blog/create`         | ✅   | Tạo blog mới             |
| POST   | `/blog/update/:id`     | ✅   | Cập nhật blog            |
| GET    | `/blog/showAll`        | ❌   | Lấy tất cả blog          |
| GET    | `/blog/show/:id`       | ❌   | Lấy blog theo ID         |
| POST   | `/blog/delete/:id`     | ✅   | Xóa mềm blog             |
| POST   | `/blog/restore/:id`    | ✅   | Khôi phục blog           |
| POST   | `/blog/force-delete/:id`| ✅  | Xóa vĩnh viễn blog       |
| GET    | `/blog/trash`          | ✅   | Lấy danh sách blog đã xóa|

---

## 3. Comment API
| Method | Endpoint                      | Auth | Mô tả                     |
|--------|------------------------------|------|---------------------------|
| POST   | `/blog/comment/:blogid`     | ✅   | Thêm comment vào blog    |
| POST   | `/blog/reply/:blogid`       | ✅   | Trả lời comment          |
| POST   | `/blog/updateComment/:id`   | ✅   | Cập nhật comment         |
| POST   | `/blog/deleteCmt/:id`       | ✅   | Xóa comment (bao gồm reply)|
| GET    | `/blog/comment/:blogid`     | ❌   | Lấy danh sách comment    |

---

## 4. Like/Dislike API
| Method | Endpoint                  | Auth | Mô tả                     |
|--------|---------------------------|------|---------------------------|
| POST   | `/blog/liked`            | ✅   | Like/Dislike blog        |
| POST   | `/blog/comment/liked`    | ✅   | Like/Dislike comment     |

**Body ví dụ cho Like blog:**
```json
{
  "postId": "BLOG_ID",
  "status": "like" // hoặc "dislike"
}
```

---

### Yêu cầu bảo mật
Các endpoint có `Auth ✅` yêu cầu **JWT** trong header:
```
Authorization: Bearer <JWT_TOKEN>
```
