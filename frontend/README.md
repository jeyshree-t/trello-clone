# 🟦 Trello Clone

A full-stack Kanban board application built with React, Node.js, Express, and MongoDB — inspired by Trello.

## 🚀 Live Demo

> Coming soon after deployment

---

## 📋 Features

| Module | Feature | Tech |
|--------|---------|------|
| 7 | List Management (Create, Edit, Delete) | React + Node.js |
| 8 | Card CRUD APIs | Node.js + MongoDB |
| 9 | Task/Card UI (Priority, Due Date) | React |
| 10 | Drag & Drop between lists | React (@hello-pangea/dnd) |
| 11 | Member Assignment to Cards | React + Node.js |
| 12 | Comments & Activity Log | React + Node.js |
| 13 | Board Settings & User Profile | React + Node.js |
| 14 | Testing, Styling & Deployment | React + Node.js |

---

## 🛠️ Tech Stack

**Frontend:**
- React 18 (Vite)
- React Router DOM
- Axios
- @hello-pangea/dnd (Drag & Drop)

**Backend:**
- Node.js
- Express.js
- MongoDB + Mongoose
- bcryptjs (password hashing)
- jsonwebtoken (JWT auth)
- dotenv
- cors

---

## 📁 Project Structure

```
Trello_clone/
├── backend/
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── boardController.js
│   │   ├── listController.js
│   │   ├── cardController.js
│   │   ├── commentController.js
│   │   └── activityController.js
│   ├── models/
│   │   ├── User.js
│   │   ├── boardModel.js
│   │   ├── listModel.js
│   │   ├── cardModel.js
│   │   ├── commentModel.js
│   │   └── activityModel.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── boardRoutes.js
│   │   ├── listRoutes.js
│   │   ├── cardRoutes.js
│   │   ├── commentRoutes.js
│   │   └── activityRoutes.js
│   ├── .env
│   └── server.js
└── frontend/
    └── src/
        ├── components/
        │   ├── Navbar.jsx
        │   ├── ListColumn.jsx
        │   └── CardItem.jsx
        ├── pages/
        │   ├── Home.jsx
        │   ├── Boards.jsx
        │   ├── BoardDetails.jsx
        │   ├── Login.jsx
        │   ├── Register.jsx
        │   ├── ForgotPassword.jsx
        │   └── Profile.jsx
        ├── services/
        │   ├── api.js
        │   ├── boardService.js
        │   ├── listService.js
        │   ├── cardService.js
        │   ├── userService.js
        │   ├── commentService.js
        │   └── activityService.js
        ├── App.jsx
        ├── App.css
        └── main.jsx
```

---

## ⚙️ Setup & Installation

### Prerequisites
- Node.js (v18+)
- MongoDB Atlas account (or local MongoDB)
- Git

### 1. Clone the repository
```bash
git clone https://github.com/YOUR_USERNAME/trello-clone.git
cd trello-clone
```

### 2. Backend setup
```bash
cd backend
npm install
```

Create a `.env` file in the `backend` folder:
```
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
```

Start the backend:
```bash
node server.js
```

### 3. Frontend setup
```bash
cd frontend
npm install
npm run dev
```

### 4. Open in browser
```
http://localhost:5173
```

---

## 🔗 API Endpoints

### Auth
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /api/auth/register | Register a new user |
| POST | /api/auth/login | Login user |
| GET | /api/auth/users | Get all users |
| GET | /api/auth/users/:id | Get user by ID |
| PUT | /api/auth/users/:id | Update profile |
| PUT | /api/auth/users/:id/password | Change password |
| PUT | /api/auth/users/:id/notifications | Update notification preferences |

### Boards
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /api/boards | Create board |
| GET | /api/boards | Get all boards |
| GET | /api/boards/:id | Get board by ID |
| PUT | /api/boards/:id | Update board |
| DELETE | /api/boards/:id | Delete board |

### Lists
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /api/lists | Create list |
| GET | /api/lists/board/:boardId | Get lists by board |
| PUT | /api/lists/:id | Update list |
| DELETE | /api/lists/:id | Delete list |

### Cards
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /api/cards | Create card |
| GET | /api/cards/list/:listId | Get cards by list |
| PUT | /api/cards/:id | Update card |
| DELETE | /api/cards/:id | Delete card |
| PUT | /api/cards/:id/assign | Assign member |
| PUT | /api/cards/:id/remove | Remove member |

### Comments
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /api/comments | Add comment |
| GET | /api/comments/card/:cardId | Get comments by card |

### Activities
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/activities/card/:cardId | Get activity log by card |

---

## 👩‍💻 Developer

**Jeyshree T**
Full Stack Development — Trello Clone Project

---

## 📄 License

This project is for educational purposes.