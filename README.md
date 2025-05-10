# 📝 Task Management API

This is a simple **Task Management API** built with **Node.js**, **Express**, and **MongoDB**. It allows you to create task boards, add tasks, manage user authentication with JWT, and deploy easily to platforms like Vercel or Render.

---

## 🚀 Features

- User authentication (signup / login)
- JWT-protected routes
- CRUD operations for:
  - Boards
  - Tasks
- Task filtering by status and search
- Organized folder structure (MVC)
- Compatible with serverless deployment

---

## 📁 Folder Structure

```
.
├── controllers       # Logic for auth, boards, tasks
├── models            # Mongoose schemas
├── routes            # Express routers
├── middleware        # JWT auth middleware
├── server.js         # App entry point
└── package.json      # App config
```

---

## 🛠️ Setup Instructions

### 1. Clone the repository

```
git clone <your-repo-url>
cd task-management-backend
```

### 2. Install dependencies

```
npm install
```

### 3. Create a `.env` file

```
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
PORT=5000
```

### 4. Run the app locally

```
npm start
```

The server will run on `http://localhost:5000`

---

## 📡 API Endpoints

### Authentication
| Method | Endpoint       | Description       |
|--------|----------------|-------------------|
| POST   | /api/auth/signup | Register new user |
| POST   | /api/auth/login  | Login & get token |

### Boards
| Method | Endpoint            | Description              |
|--------|---------------------|--------------------------|
| POST   | /api/boards         | Create a board           |
| GET    | /api/boards/:id     | Get a board              |
| PUT    | /api/boards/:id     | Update board info        |
| DELETE | /api/boards/:id     | Delete board and tasks   |

### Tasks
| Method | Endpoint        | Description              |
|--------|-----------------|--------------------------|
| GET    | /api/tasks      | Get all tasks (filterable) |
| PUT    | /api/tasks/:id  | Update task              |
| DELETE | /api/tasks/:id  | Delete task              |

---

## 🧪 Test it with Postman

1. Signup or login to get a JWT token.
2. Use that token in the `Authorization` header for all other routes:
   ```
   Authorization: Bearer <your-token>
   ```

---

## 🌐 Deploy

You can deploy this project to:

- [Vercel](https://vercel.com)
- [Render](https://render.com)

Make sure to set the environment variables in the deployment settings.

---

## 📄 License

MIT