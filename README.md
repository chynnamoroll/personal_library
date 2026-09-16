# Personal Book Library

ระบบจัดการคลังหนังสือส่วนตัว — ดูรายชื่อหนังสือ เพิ่ม ค้นหา/กรอง และลบหนังสือ โดยหนังสือแต่ละเล่มมีความสัมพันธ์กับผู้แต่ง (Author, many-to-many) และหมวดหมู่ (Category, one-to-many) พร้อมระบบยืนยันตัวตนด้วย JWT

## Stack ที่เลือกใช้

| ส่วน | เทคโนโลยี |
| --- | --- |
| Backend | Node.js + Express (MVC/Layered: Controller → Service → Repository) |
| Database | PostgreSQL + Knex (query builder + migrations/seeds) |
| Auth | JSON Web Token (`jsonwebtoken`) + `bcryptjs` สำหรับ hash password |
| Frontend | Next.js (App Router) + React + Tailwind CSS v4 |

โครงสร้างโปรเจกต์:

```
backend/
  app.js                # ตั้งค่า express, cors, mount routes
  server.js              # entry point, listen port
  config/db.js           # knex instance
  controllers/           # รับ request, ตอบ response + status code
  services/               # business logic + validation
  repositories/           # เข้าถึงฐานข้อมูลผ่าน knex
  middleware/             # authMiddleware (ตรวจ JWT)
  routes/                 # ผูก path เข้ากับ controller
  migrations/             # schema (users, categories, authors, books, book_authors)
  seeds/                  # ข้อมูลตัวอย่าง (admin user + 50 เล่ม)
frontend/
  src/app/                # หน้า login, หน้าแรก (protected)
  src/components/         # Navbar, BookCard, AddBookModal, ProtectedRoute, Select
  src/lib/                # apiClient (fetch wrapper + token), auth (localStorage helpers)
  src/services/           # เรียก backend API แยกจาก component
```

## ติดตั้ง Dependency

```bash
cd backend && npm install
cd ../frontend && npm install
```

## ตั้งค่า Environment Variables

### backend/.env

สร้างไฟล์ `backend/.env` ตามตัวอย่างนี้ (ต้องมี PostgreSQL รันอยู่แล้วตามค่า `DB_*`):

```env
PORT=3030

DB_CLIENT=pg
DB_HOST=<host ของ Postgres>
DB_PORT=<port ของ Postgres>
DB_USER=<username>
DB_PASSWORD=<password>
DB_NAME=personal_library

JWT_SECRET=<สุ่มค่าความยาว ๆ ไว้ เช่น openssl rand -hex 32>
JWT_EXPIRES_IN=1h
```

- `DB_*` ใช้เชื่อมต่อ PostgreSQL (ต้องมีฐานข้อมูลชื่อตาม `DB_NAME` อยู่แล้ว ยังไม่ต้องมีตาราง — migration จะสร้างให้)
- `JWT_SECRET` ใช้เซ็นและตรวจสอบ token ห้ามใช้ค่าเดียวกับตัวอย่างในการใช้งานจริง

### frontend/.env.local

```env
NEXT_PUBLIC_API_URL=http://localhost:3030
```

ชี้ไปยัง URL ของ backend (เปลี่ยนถ้า backend รันคนละ host/port)

## รัน Migration และ Seed

```bash
cd backend
npm run migrate   # สร้างตาราง users, categories, authors, books, book_authors
npm run seed      # ใส่ข้อมูลตัวอย่าง: user สำหรับ login + หนังสือ 50 เล่ม/6 หมวดหมู่/16 ผู้แต่ง
```

คำสั่งอื่นที่มีให้:

```bash
npm run migrate:rollback   # ย้อน migration ล่าสุด
```

## วิธีรัน

**Backend** (default port 3030):

```bash
cd backend
npm run dev     # ใช้ nodemon, restart อัตโนมัติเมื่อแก้โค้ด
# หรือ
npm start       # รันปกติแบบ node
```

เมื่อรันสำเร็จจะเห็น log: `Book library server is up and ready to roll on port 3030`

**Frontend** (default port 3000):

```bash
cd frontend
npm run dev
```

เปิดเบราว์เซอร์ที่ `http://localhost:3000` — ระบบจะพาไปหน้า `/login` ก่อนถ้ายังไม่ได้เข้าสู่ระบบ

## รันด้วย Docker (ทางเลือก)

มี `docker-compose.yml` ให้รันครบทั้ง 3 ส่วน (PostgreSQL + backend + frontend) ด้วยคำสั่งเดียว โดยไม่ต้องติดตั้ง Node/PostgreSQL เองเลย:

```bash
docker compose up -d --build
```

- Backend container จะรัน migration ให้อัตโนมัติทุกครั้งที่ start (idempotent ปลอดภัย รันซ้ำได้)
- ต้องรัน seed เองครั้งแรก (รันครั้งเดียวพอ ไม่รันอัตโนมัติเพราะจะลบข้อมูลเดิมทุกครั้งที่ container restart):

  ```bash
  docker compose exec backend npm run seed
  ```

- เปิดใช้งานที่ `http://localhost:3000` (frontend) และ `http://localhost:3030` (backend API) เหมือนรันแบบปกติ
- ปรับค่า credential/secret ได้โดย copy `.env.example` เป็น `.env` ที่ root แล้วแก้ค่า (ไม่จำเป็นต้องทำ มี default ให้พร้อมใช้)
- หยุดการทำงาน: `docker compose down` (ข้อมูลใน DB ยังอยู่ เพราะเก็บใน named volume) หรือ `docker compose down -v` ถ้าต้องการล้างข้อมูลด้วย

## Username / Password สำหรับทดสอบ Login

```
username: admin
password: admin123
```

(สร้างจาก `npm run seed` — ดูที่ `backend/seeds/01_users.js`)

## API Endpoints โดยสรุป

| Method | Path | Auth | คำอธิบาย |
| --- | --- | --- | --- |
| POST | `/api/login` | - | เข้าสู่ระบบ รับ JWT |
| GET | `/api/books` | - | รายการหนังสือทั้งหมด รองรับ `?categoryId=&authorId=` |
| GET | `/api/books/:id` | - | หนังสือเล่มเดียว (404 ถ้าไม่พบ) |
| POST | `/api/books` | ✅ Bearer token | สร้างหนังสือใหม่ |
| DELETE | `/api/books/:id` | ✅ Bearer token | ลบหนังสือ |
| GET | `/api/authors` | - | รายชื่อผู้แต่งทั้งหมด |
| GET | `/api/categories` | - | รายชื่อหมวดหมู่ทั้งหมด |

ดูตัวอย่างการเรียกทุก endpoint ได้ที่ [`backend/api-collection.http`](backend/api-collection.http) (เปิดด้วย VS Code extension "REST Client" หรือ copy คำสั่ง curl ในไฟล์ไปรันตรง ๆ ก็ได้)

## ER Diagram / Schema

ดูโครงสร้างตารางและความสัมพันธ์ทั้งหมดได้จาก migration files ใน `backend/migrations/` (เรียงตามลำดับการสร้าง):

1. `enable_uuid_extension` — เปิดใช้ `uuid-ossp` สำหรับ primary key ของ `books`
2. `create_categories_table`
3. `create_authors_table`
4. `create_books_table` — FK ไปยัง `categories` (`ON DELETE RESTRICT`), มี CHECK constraint ของ `status`/`rating`/`publication_year`/`total_pages`
5. `create_book_authors_table` — ตารางเชื่อม many-to-many ระหว่าง `books` และ `authors`

ความสัมพันธ์: `Category 1—N Book`, `Book N—N Author` (ผ่าน `book_authors`)
