# 🧸 SkogsNallen – E‑commerce Toy Store

SkogsNallen is a full‑stack e‑commerce web application. The platform lets visitors browse and search toys, register and log in, place orders and pay securely with Stripe. Admins get a private dashboard for managing products, orders and users.

> **Project origin**: Final thesis at **Nackademin**. Goal → simulate a real‑world toy‑shop experience using modern, open‑source tools.

---

## 🔗 Live Demo

| Layer          | URL                                                                          |
| -------------- | ---------------------------------------------------------------------------- |
| 🌐 Frontend    | [https://skogsnallen-1.onrender.com](https://skogsnallen-1.onrender.com)     |
| 🖥 Backend API | [https://skogsnallen.onrender.com/api](https://skogsnallen.onrender.com/) |

---

## 🚀 Features

### 🛍  User features

* Browse toys by category
* Filter by price, colour and keywords
* Add items to cart
* Secure register & login (JWT)
* See order history and live status
* Pay via Stripe Checkout

### 🛠  Admin features

* Create, update, delete products
* View every order and change status
* Manage users & roles
* Dashboard stats (total earnings, total users, etc.)

---

## 🧰 Tech Stack

| Layer         | Tools                                                                            |
| ------------- | -------------------------------------------------------------------------------- |
| **Frontend**  | React 18 • Redux Toolkit + RTK Query • React Router v6 • Tailwind CSS            |
| **Backend**   | Node.js 20 • Express 4 • MongoDB Atlas + Mongoose • Stripe API • JSON Web Tokens |
| **Utilities** | Multer & Base64 for image uploads                                                |

---

## 📦 Installation

### 1  Clone the repository

```bash
git clone https://github.com/Darougah/SkogsNallen.git
cd SkogsNallen
```

### 2  Install dependencies

```bash
# Backend
a cd backend
npm install

# Frontend
cd ../frontend
npm install
```

### 3  Configure environment variables ()

Create a file called `.env` inside `backend/` and add:

```env
  DB_URL=""
  JWT_SECRET_KEY=""
  STRIPE_SECRET_KEY = ""
  CLOUDINARY_CLOUD_NAME= ''
  CLOUDINARY_API_KEY= ''
  CLOUDINARY_API_SECRET= ''
```

Create a file called `.env` inside `frontend/` and add:
```env
VITE_STRIPE_PK=
```
---

## 🧪 Usage – Local development

```bash
# Start backend
a cd backend
npm run dev

# Start frontend
cd ../frontend
npm run dev
```

Visit **[http://localhost:5173](http://localhost:5173)** in your browser.

---

## 🧾 API Reference

### 👤 Users / Auth

| Method     | Endpoint                 | Description                         |
| ---------- | ------------------------ | ----------------------------------- |
| **POST**   | `/api/auth/register`     | Register new user                   |
| **POST**   | `/api/auth/login`        | Log in user                         |
| **POST**   | `/api/auth/logout`       | Log out current user                |
| **GET**    | `/api/auth/users`        | Get all users <sub>(admin)</sub>    |
| **DELETE** | `/api/auth/users/:id`    | Delete a user <sub>(admin)</sub>    |
| **PUT**    | `/api/auth/users/:id`    | Update user role <sub>(admin)</sub> |
| **PATCH**  | `/api/auth/edit-profile` | Update own profile                  |

### 🛒 Products

| Method     | Endpoint                    | Description                         |
| ---------- | --------------------------- | ----------------------------------- |
| **POST**   | `/api/products`             | Create a product <sub>(admin)</sub> |
| **GET**    | `/api/products`             | Fetch all products                  |
| **GET**    | `/api/products/:id`         | Fetch single product                |
| **PUT**    | `/api/products/:id`         | Update product <sub>(admin)</sub>   |
| **DELETE** | `/api/products/:id`         | Delete product <sub>(admin)</sub>   |
| **GET**    | `/api/products/related/:id` | Related products                    |

### ⭐ Reviews

| Method   | Endpoint       | Description     |
| -------- | -------------- | --------------- |
| **POST** | `/api/reviews` | Submit a review |

### 📦 Orders

| Method    | Endpoint                              | Description                            |
| --------- | ------------------------------------- | -------------------------------------- |
| **POST**  | `/api/orders/create-checkout-session` | Start Stripe checkout                  |
| **GET**   | `/api/orders`                         | Get all orders <sub>(admin)</sub>      |
| **PATCH** | `/api/orders/update-order-status/:id` | Update order status <sub>(admin)</sub> |

---

\| POST | /api/auth/register | Register new user |
\| POST | /api/auth/login | Log in user |
\| GET  | /api/products | Get all products |
\| GET  | /api/categories | Get all categories |
\| POST | /api/orders/create-checkout-session | Start Stripe checkout |
\| PATCH | /api/orders/update-order-status/\:id | Update order status |


---

## 🖼 Screenshots

| Home page                      | Admin dashboard                  | Product page                         |
| ------------------------------ | -------------------------------- | ------------------------------------ |
| ![Home](docs/screens/home.png) | ![Admin](docs/screens/admin.png) | ![Product](docs/screens/product.png) |



---

## 👨‍💻 Author

Developed by Daniel Darougah









