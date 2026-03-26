# Universal Printers

Modern e-commerce printing platform for **Universal Printers** with CMYK brand identity and full-stack architecture.

## Tagline

**Quality & Service is Our Motto**

## Stack

- Frontend: React + Vite
- Backend: Spring Boot (Java 17)
- Database: MySQL
- Storage: Local uploads (easy path to AWS S3 migration)
- Auth: JWT-ready backend structure
- Payments: Razorpay/Stripe integration points prepared in checkout flow

## Project Structure

```
universal-printers/
├── frontend/
├── backend/
├── database/
├── assets/
└── README.md
```

## Frontend Highlights

- Premium CMYK-inspired design language
- Hero with curved arc decorations and gradients
- Service cards with hover glow animation
- How-it-works flow and featured products
- Product page with drag-and-drop style upload and live pricing
- Upload & Print quick flow
- WhatsApp floating CTA
- Google Maps integration in footer/contact
- Mobile sticky bottom CTA: Upload & Print
- Order tracking screen

## Backend Highlights

- REST APIs for products, orders, pricing, auth, uploads
- Spring Security baseline config
- JWT filter placeholder for extension
- MySQL entities/repositories aligned to required schema

## Run Instructions

### 1. Database

1. Create MySQL database and tables:
   - Run `database/schema.sql`
2. Seed products:
   - Run `database/seed.sql`

### 2. Backend

```bash
cd backend
mvn spring-boot:run
```

API base URL: `http://localhost:8080/api`

### 3. Frontend

```bash
cd frontend
npm install
npm run dev
```

Frontend URL: `http://localhost:5173`

## Key Endpoints

- `GET /api/products`
- `POST /api/orders`
- `GET /api/orders/{id}`
- `POST /api/orders/price`
- `POST /api/uploads`
- `POST /api/auth/login`

## Branding Note

- Current logo file: `frontend/public/logo.svg` (CMYK-inspired placeholder)
- Replace with your uploaded official logo at:
  - `frontend/public/logo.svg` or `frontend/public/logo.png`

## Development Order Followed

1. Built premium UI and design system
2. Added React routing and page flows
3. Added live pricing logic + upload UX
4. Scaffolded Spring Boot APIs
5. Added SQL schema + seed data

