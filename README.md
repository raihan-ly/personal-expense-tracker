# Personal Expense & Finance Insights Dashboard

A full-stack financial tracking and analytics platform built with **React** and **Supabase** that enables users to manage their personal expenses while providing **admin-level financial intelligence** across the entire platform.

The system supports:
- Google OAuth & email/password authentication  
- Secure user-level data ownership  
- Budget vs actual tracking  
- Category & time-based analytics  
- Admin-only financial oversight  
- PostgreSQL Row Level Security (RLS)  

---

## 🧱 Tech Stack

| Layer | Technology |
|------|-----------|
| Frontend | React, JavaScript, Tailwind CSS |
| Backend / Auth | Supabase (PostgreSQL + Auth + RLS) |
| Database | PostgreSQL (via Supabase) |
| Charts | Recharts |

---

## 🧠 System Architecture

<img src="https://github.com/user-attachments/assets/fc95752e-4f4c-4e76-ab2c-9d63e6b67444" alt="System Architecture" width="600" />

---

## 🔐 Authentication Flow

1. User signs in using **Google OAuth** or email/password  
2. Supabase creates an authenticated session  
3. A database trigger automatically creates a `profiles` row  
4. A role (`user` or `admin`) is assigned  
5. User is redirected to the correct dashboard  
6. Every request is validated at the database level via RLS  

---

## 🗄️ Database Design

### `profiles`
Stores user roles and identity mapping.

| Column | Purpose |
|-------|--------|
| id | Supabase Auth user ID |
| role | `user` or `admin` |
| created_at | Account creation time |

---

### `expenses`
Stores all expense records.

| Column | Purpose |
|-------|--------|
| id | Unique expense ID |
| user_id | Owner of the expense |
| item_name | What was purchased |
| category | Expense category |
| amount | Amount spent |
| expense_date | When it occurred |
| note | Optional description |
| created_at | Record creation time |

---

### `budgets`
Stores category budgets per month.

| Column | Purpose |
|-------|--------|
| id | Unique budget ID |
| user_id | Budget owner |
| month | Budget month |
| category | Category |
| amount | Budgeted amount |
| created_at | When the budget was created |

---

## 🔒 Security Model (Row Level Security)

### Users
- Can access **only their own expenses and budgets**
- Cannot view or modify any other user’s data

### Admins
- Can **read all expense data**
- Cannot modify user records

All permissions are enforced directly by **PostgreSQL RLS**, preventing:
- Data leaks  
- UI bypass attacks  
- Unauthorized updates  

---

## 🚀 Features

### 👤 User Capabilities

- Secure authentication (Email/Password + Google OAuth)
- Add, edit, and delete expenses with:
  - Item name  
  - Category  
  - Amount  
  - Date  
  - Notes  
- Categorized expense tracking  
- Monthly filtering  
- Budget vs Actual tracking per category  
- Smart insights:
  - Overspending / Under-budget  
  - Top overspent & underspent categories  
- Interactive charts:
  - Category-wise spending (Pie chart)  
  - Monthly trend (Line chart)  

---

### 🛠️ Admin Capabilities

- View all users’ expenses  
- Switch between:
  - Monthly analytics  
  - All-time analytics  
- Platform-wide insights:
  - Total spend  
  - Category distribution  
  - Monthly spending trends  

---

## 🧠 Business Logic

The app computes:

- Monthly totals  
- Category-wise totals  
- Budget vs Actual variance  
- Overspending / underspending  
- Trends across time  

All calculations are done in the frontend using **normalized SQL data** fetched securely from Supabase.

---

## 🖥️ Application Pages

| Route | Access | Purpose |
|------|--------|--------|
| `/login` | Public | Authentication |
| `/dashboard` | User | Personal finance dashboard |
| `/admin` | Admin | Platform-wide analytics |

---

## 📸 Screenshots

<details>
  <summary><strong>Login</strong></summary>
  <br />
  <p align="center">
    <img
      src="https://github.com/user-attachments/assets/ec2be6f7-f29d-4983-afaa-d29ba35a3fe7"
      alt="Login Page"
      width="700"
    />
  </p>
</details>

<details>
  <summary><strong>User Dashboard</strong></summary>
  <br />
  <p align="center">
    <img
      src="https://github.com/user-attachments/assets/8586b066-17fb-4c90-9cb5-06011a1912cb"
      alt="User Dashboard"
      width="700"
    />
  </p>
</details>

<details>
  <summary><strong>Budget vs Actual</strong></summary>
  <br />
  <p align="center">
    <img
      src="https://github.com/user-attachments/assets/a767dd9b-dad9-4b1a-8550-5f9ba3b3e67d"
      alt="Budget vs Actual"
      width="700"
    />
  </p>
</details>

<details>
  <summary><strong>Admin Dashboard</strong></summary>
  <br />
  <p align="center">
    <img
      src="https://github.com/user-attachments/assets/a9be16c3-305b-4b0a-ac77-6b97fd73236b"
      alt="Admin Dashboard"
      width="700"
    />
  </p>
</details>
