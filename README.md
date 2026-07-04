# Mission 02 — Project 02

A REST API built with **TypeScript**, **Express**, and **PostgreSQL**. It includes JWT-based authentication, role-based authorization, password hashing, and cookie support.

Built as part of the **Next Level Web Development Bootcamp** by Programming Hero (Level 02, Modules 7–8).

---

## Tech Stack

- **Runtime** — Node.js
- **Language** — TypeScript
- **Framework** — Express 5
- **Database** — PostgreSQL (via `pg` pool)
- **Authentication** — JWT (jsonwebtoken) + HTTP-only cookies
- **Password hashing** — bcryptjs
- **Other** — cors, cookie-parser, dotenv

---

## Project Structure

```
mission-02-project-02/
├── src/
│   └── server.ts       # Entry point
├── package.json
├── tsconfig.json
└── .env                # Environment variables (not committed)
```

---

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/rafiul-neti/mission-02-project-02.git
cd mission-02-project-02
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

Create a `.env` file in the root of the project:

```env
PORT=5000
DB_HOST=localhost
DB_PORT=5432
DB_NAME=your_database_name
DB_USER=your_database_user
DB_PASSWORD=your_database_password
JWT_SECRET=your_jwt_secret_key
NODE_ENV=development
```

### 4. Set up the database

Make sure PostgreSQL is running on your machine, then create the database:

```bash
psql -U your_database_user -c "CREATE DATABASE your_database_name;"
```

### 5. Run the development server

```bash
npm run dev
```

The server will start at `http://localhost:5000` and automatically restart on file changes.

---

## Available Scripts

| Script | Description |
|---|---|
| `npm run dev` | Starts the server in watch mode using `tsx` |

---

## API Overview

| Method | Endpoint | Description | Auth Required |
|---|---|---|---|
| POST | `/api/auth/register` | Register a new user | No |
| POST | `/api/auth/login` | Login and receive JWT cookie | No |
| POST | `/api/auth/logout` | Clear the auth cookie | Yes |
| GET | `/api/users` | Get all users | Yes (Admin) |
| GET | `/api/users/:id` | Get a single user | Yes |

> Routes may vary depending on final implementation.

---

## Authentication

This API uses **JWT tokens stored in HTTP-only cookies**. After a successful login, the server sets a cookie on the client. Protected routes read and verify the token from this cookie.

Passwords are hashed using **bcryptjs** before being stored in the database. Plain text passwords are never saved.

---

## Notes

- This project uses **ES Modules** (`"type": "module"` in package.json)
- TypeScript is compiled on the fly using `tsx` — no separate build step needed for development
- Database connections are managed through a **pg connection pool** for better performance
