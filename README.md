# FinanceHub — Finance Dashboard Backend

A role-based finance dashboard system built as part of a backend engineering assessment. The system supports financial record management, user role administration, and dashboard analytics with JWT-based authentication and access control.

---

## Live Demo
- Frontend: https://your-vercel-url.vercel.app
- Backend API: https://finance-dashboard-1zfe.onrender.com

## Tech Stack

- **Backend:** Node.js, Express.js
- **Database:** MongoDB with Mongoose
- **Authentication:** JWT (JSON Web Tokens)
- **Password Hashing:** bcryptjs
- **Frontend:** React + Vite, Tailwind CSS

---

## Features

- JWT-based authentication (register, login)
- Role-based access control (Admin, Analyst, Viewer)
- Financial records CRUD with soft delete
- Dashboard summary APIs using MongoDB aggregation pipelines
- User management (activate/deactivate, role assignment)
- Protected routes via middleware

---

## Roles & Access

| Action | Viewer | Analyst | Admin |
|---|---|---|---|
| View dashboard | ✅ | ✅ | ✅ |
| View records | ❌ | ✅ | ✅ |
| Create record | ❌ | ❌ | ✅ |
| Update/Delete record | ❌ | ❌ | ✅ |
| Manage users | ❌ | ❌ | ✅ |

---

## Project Structure

backend/
├── config/         → Database connection
├── models/         → User, FinancialRecord schemas
├── middlewares/    → authMiddleware, roleMiddleware
├── controllers/    → auth, records, dashboard, user logic
├── routes/         → auth, records, dashboard, admin routes
└── server.js
frontend/
├── src/
│   ├── context/    → AuthContext (JWT + user state)
│   ├── pages/      → Login, Register, Dashboard, Records, Users, AddRecord
│   ├── components/ → Sidebar
│   └── App.jsx

---

## Setup Instructions

### Backend
```bash
cd backend
npm install
```

Create a `.env` file:

MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
PORT=8080

```bash
node server.js
```

### Frontend
```bash
cd frontend
npm install
npm run dev
```

---

## API Documentation

### Auth Routes
| Method | Endpoint | Description | Auth |
|---|---|---|---|
| POST | /api/auth/register | Register new user | None |
| POST | /api/auth/login | Login, returns JWT token | None |

### Record Routes
| Method | Endpoint | Description | Role |
|---|---|---|---|
| GET | /api/records/allrecords | Get all records | Admin, Analyst |
| POST | /api/records/create | Create a record | Admin |
| PUT | /api/records/update/:id | Update a record | Admin |
| DELETE | /api/records/delete/:id | Soft delete a record | Admin |

### Dashboard Routes
| Method | Endpoint | Description | Role |
|---|---|---|---|
| GET | /api/dashboard/summary | Total income, expenses, net balance | All |
| GET | /api/dashboard/categories | Category-wise totals | All |
| GET | /api/dashboard/trends | Monthly income vs expense | All |
| GET | /api/dashboard/recent | Last 5 transactions | All |

### Admin Routes
| Method | Endpoint | Description | Role |
|---|---|---|---|
| GET | /api/admin/users | Get all users | Admin |
| PUT | /api/admin/update/:id | Update user role/status | Admin |
| PUT | /api/admin/deactivate/:id | Toggle user active status | Admin |

---

## Assumptions Made

- Role is assigned at registration. In a production system this would be admin-controlled only.
- Soft delete is used for financial records — deleted records are never permanently removed from the database, which is standard practice in fintech systems.
- Token expiry is set to 7 days.
- All monetary values are stored as numbers without currency conversion.

---

## Design Decisions

- **Controllers + Services separation** — controllers handle request/response, business logic is kept clean and separate.
- **Soft delete** — `isDeleted: true` flag instead of permanent deletion, preserving data integrity.
- **JWT over sessions** — stateless authentication scales better and suits API-first design.
- **MongoDB aggregation pipelines** — used for dashboard summary APIs instead of fetching and computing on the application layer, keeping responses fast and efficient.