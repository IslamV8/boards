# 🧠 Task Management API

هذا المشروع هو RESTful API كامل لإدارة المهام واللوحات باستخدام **Node.js**, **Express**, و **MongoDB**.  
تم تبسيط نظام المصادقة بدون استخدام JWT، ويعتمد فقط على التحقق من `userId` المرسل مع الطلبات.

---

## ✅ المميزات

- تسجيل مستخدم جديد + تسجيل دخول بباسورد مشفر.
- CRUD كامل للـ Boards و Tasks.
- دعم كامل للـ Validation باستخدام Joi.
- دعم `custom status` للمهام.
- فلترة + بحث + Pagination.
- حماية الراوتات باستخدام Middleware بسيط مبني على userId فقط.
- مشروع مناسب للتطبيقات التعليمية أو MVPs.

---

## 📦 Tech Stack

- Node.js + Express
- MongoDB + Mongoose
- Joi (Validation)
- bcryptjs (لتشفير الباسورد)
- Vercel (لنشر المشروع)
- Postman (للتجربة)

---

## 📁 هيكل المشروع

```
.
├── controllers
│   ├── authController.js
│   ├── boardController.js
│   └── taskController.js
├── models
│   ├── User.js
│   ├── Board.js
│   └── Task.js
├── routes
│   ├── authRoutes.js
│   ├── boardRoutes.js
│   └── taskRoutes.js
├── validations
│   ├── authValidation.js
│   ├── boardValidation.js
│   └── taskValidation.js
├── middleware
│   └── authMiddleware.js
└── server.js
```

---

## 🧾 Endpoints

### 🧍 Auth

| Endpoint | Method | Body | وصف |
|---------|--------|------|------|
| `/api/auth/signup` | POST | `{ username, password }` | إنشاء مستخدم جديد |
| `/api/auth/login` | POST | `{ username, password }` | تسجيل دخول، يرجع `userId` |

---

### 📋 Boards

كل الـ requests لازم تحتوي على `userId`.

| Endpoint | Method | Body / Params | وصف |
|----------|--------|----------------|------|
| `/api/boards` | GET | `?page=1&limit=10&userId=...` | جلب كل اللوحات |
| `/api/boards` | POST | `{ name, description, userId }` | إنشاء لوحة |
| `/api/boards/:id` | GET | `?userId=...` | جلب لوحة واحدة |
| `/api/boards/:id` | PUT | `{ name?, description?, userId }` | تعديل لوحة |
| `/api/boards/:id` | DELETE | `?userId=...` | حذف لوحة |

---

### ✅ Tasks

| Endpoint | Method | Body / Params | وصف |
|----------|--------|----------------|------|
| `/api/tasks` | GET | `?search=...&status=...&page=1&limit=10&userId=...` | جلب المهام مع فلترة |
| `/api/tasks` | POST | `{ title, status, boardId, userId }` | إنشاء مهمة |
| `/api/tasks/:id` | PUT | `{ title?, status?, userId }` | تعديل مهمة |
| `/api/tasks/:id` | DELETE | `?userId=...` | حذف مهمة |

---

## 🛡️ الحماية

- كل الراوتات محمية بـ Middleware بيتأكد من وجود `userId`.
- المستخدم لا يستطيع تعديل أو حذف بيانات غيره.

---

## 🧪 تجربة الـ API

تقدر تستخدم **Postman** وتبعت `userId` مع كل طلب في:
- Body
- أو Query
- أو Header (مثل: `x-user-id`)

---

## 🌐 النشر

تم نشر التطبيق على Vercel. تأكد من إعداد:
- ملف `vercel.json`
- `MONGO_URI` في Vercel Environment Variables

---

## ✨ أفكار للتوسعة

- رفع صور (Cloudinary أو Multer)
- علاقات بين الـ Boards (Members)
- إضافة Priorities و Tags للمهام
- Dashboard و frontend بواجهة جميلة

---

🎉 بالتوفيق!