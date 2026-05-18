# 🚀 PerformAI — Employee Performance Analytics & Recommendation System

A production-quality full-stack web application that helps managers add employees, define performance requirements, and evaluate employees using **rule-based matching** + **AI-enhanced performance recommendations** via the OpenRouter API.

---

## 🌐 Live Demo
- **Frontend (Vercel):** *Deploying Soon (See Deployment Guide)*
- **Backend Health Check (Render):** *Deploying Soon (See Deployment Guide)*

---

## 🏗️ Architecture

```text
├── client/          → React + Vite + TailwindCSS frontend
├── server/          → Node.js + Express backend
├── .env             → Environment variables
└── package.json     → Root scripts (concurrently)
```

**Backend Pattern:** Controller → Service → Model (clean architecture)  
**Frontend Pattern:** Pages → Components → Hooks → Services → Context (Auth)

---

## ⚙️ Tech Stack

| Layer      | Technology                          |
|------------|--------------------------------------|
| Frontend   | React 19, Vite, TailwindCSS 3, Axios, Recharts, Lucide Icons |
| Backend    | Node.js, Express 4, Mongoose 8      |
| Database   | MongoDB (Atlas or local)             |
| Security   | JWT (JSON Web Tokens), Bcryptjs      |
| AI         | OpenRouter API (configurable model)  |
| Dev Tools  | Nodemon, Concurrently                |

---

## 🚀 Setup Instructions

### Prerequisites

- **Node.js** v18+
- **MongoDB** (Atlas cluster or local installation)
- **OpenRouter API Key** from [openrouter.ai](https://openrouter.ai)

### 1. Clone & Install

```bash
# Install all dependencies (root + server + client)
npm run install:all
```

### 2. Configure Environment

Edit `.env` in the project root:

```env
PORT=5000
MONGO_URI=mongodb+srv://<user>:<password>@cluster.mongodb.net/performai
OPENROUTER_API_KEY=sk-or-v1-your-actual-key
OPENROUTER_MODEL=deepseek/deepseek-v4-flash:free
CLIENT_URL=http://localhost:5173
JWT_SECRET=your_super_secret_jwt_key_here
```

### 3. Run Development Servers

```bash
npm run dev
```

This starts both:
- **Backend:** http://localhost:5000
- **Frontend:** http://localhost:5173

*(Note: Upon opening the frontend, you will be redirected to the Login page. Create a new account to access the dashboard).*

---

## 📡 API Documentation

### Authentication APIs
*All subsequent APIs require the `Authorization: Bearer <token>` header.*

| Method | Endpoint                      | Description                    |
|--------|-------------------------------|--------------------------------|
| POST   | `/api/auth/signup`            | Register a new manager         |
| POST   | `/api/auth/login`             | Login to receive JWT token     |

### Employee APIs

| Method | Endpoint                      | Description                    |
|--------|-------------------------------|--------------------------------|
| POST   | `/api/candidates`             | Register a new employee        |
| GET    | `/api/candidates`             | List employees (search/filter) |
| GET    | `/api/candidates/:id`         | Get single employee            |
| PUT    | `/api/candidates/:id`         | Update employee                |
| DELETE | `/api/candidates/:id`         | Delete employee                |
| GET    | `/api/candidates/stats/count` | Get total count                |

**Query Parameters for GET /api/candidates:**
- `search` — Search by name or performance notes
- `skills` — Filter by skills (comma-separated)
- `minExp` — Minimum performance rating (1-10)
- `maxExp` — Maximum performance rating (1-10)
- `page` — Page number (default: 1)
- `limit` — Items per page (default: 10)

### Performance Matching APIs

| Method | Endpoint       | Description                   |
|--------|----------------|-------------------------------|
| POST   | `/api/match`   | Rule-based performance eval   |

### AI APIs

| Method | Endpoint                      | Description                     |
|--------|-------------------------------|---------------------------------|
| POST   | `/api/ai/shortlist`           | AI-powered employee evaluation  |
| POST   | `/api/ai/interview-questions` | Generate growth/review questions|

---

## 🧮 Matching Algorithm

### Scoring Formula

```text
Required Score  = (matchedRequired / totalRequired) × 70
Preferred Score = (matchedPreferred / totalPreferred) × 20
Performance Rating Score = meetsMinimumRating ? 10 : (employeeRating / minRating) × 10
Total Score     = Required + Preferred + Performance Rating (max 100)
```

### Match Levels

| Score    | Level   |
|----------|---------|
| ≥ 75     | High    |
| 50 – 74  | Medium  |
| < 50     | Low     |

---

## 🤖 AI Features

- **Intelligent Evaluation** — AI analyzes employees beyond simple keyword matching
- **Suitability Explanations** — Detailed reasoning for each employee's performance
- **Missing Skills Detection** — What employees lack for promotion
- **Review Recommendations** — Strongly Recommend / Recommend / Consider / Needs Improvement
- **Growth Focus Areas** — Suggested topics for 1-on-1 performance reviews

---

## 📁 Project Structure

```text
server/
├── config/db.js              → MongoDB connection
├── models/
│   ├── Candidate.js          → Employee schema
│   └── User.js               → Auth schema (Bcrypt)
├── services/
│   ├── candidateService.js   → CRUD business logic
│   ├── matchService.js       → Scoring algorithm
│   └── aiService.js          → OpenRouter integration
├── controllers/              → HTTP handlers (Auth, AI, Candidates, Match)
├── routes/                   → Express routers
├── middleware/               
│   ├── authMiddleware.js     → JWT Protection
│   └── errorHandler.js       → Error handling
└── index.js                  → App entry point

client/src/
├── pages/                    → Dashboard, CandidateList, AddCandidate, JobMatch, Login, Signup
├── components/               → Sidebar, Navbar, ProtectedRoute, etc.
├── context/                  
│   └── AuthContext.jsx       → LocalStorage + JWT state
└── services/api.js           → Axios API client (with JWT interceptor)
```

---

## 🚢 Deployment

See the [Deployment Guide](./deployment_guide.md) for step-by-step instructions on deploying the frontend to Vercel and the backend to Render.

---

## 📄 License

MIT
