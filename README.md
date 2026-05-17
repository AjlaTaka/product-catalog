# 🛍️ Clothify — Simple Product Catalog

A clean full-stack product catalog built with React, Node.js/Express, and SQLite.

## Tech Stack

| Layer    | Technology              |
|----------|-------------------------|
| Frontend | React + Vite + Tailwind |
| Backend  | Node.js + Express       |
| Database | SQLite (via better-sqlite3) |

## Features
- ✅ View all products in a grid
- ✅ Search products by name/description
- ✅ Filter by category
- ✅ Add new products
- ✅ Edit existing products
- ✅ Delete products
- ✅ Stock level indicators
- ✅ Image previews

## Project Structure

```
product-catalog/
├── backend/
│   ├── server.js        ← Express API + SQLite logic
│   ├── package.json
│   └── catalog.db       ← Auto-created on first run
└── frontend/
    ├── src/
    │   ├── api.js           ← Axios API calls
    │   ├── App.jsx          ← Routes
    │   ├── components/
    │   │   ├── Navbar.jsx
    │   │   ├── ProductCard.jsx
    │   │   └── ProductForm.jsx
    │   └── pages/
    │       ├── Home.jsx
    │       ├── AddProduct.jsx
    │       └── EditProduct.jsx
    └── package.json
```

## Setup & Run

### 1. Start the Backend
```bash
cd backend
npm install
npm run dev
```
Backend runs at → http://localhost:4000

### 2. Start the Frontend
```bash
cd frontend
npm install
npm run dev
```
Frontend runs at → http://localhost:5173

## API Endpoints

| Method | Endpoint             | Description          |
|--------|----------------------|----------------------|
| GET    | /api/products        | Get all products     |
| GET    | /api/products/:id    | Get single product   |
| GET    | /api/categories      | Get all categories   |
| POST   | /api/products        | Create product       |
| PUT    | /api/products/:id    | Update product       |
| DELETE | /api/products/:id    | Delete product       |

The SQLite database (`catalog.db`) is created automatically on first run with 6 sample products.
