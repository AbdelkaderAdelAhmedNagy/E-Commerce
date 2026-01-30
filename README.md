# 🛒 Frontend E-Commerce Project

## 📖 Project Overview
A **frontend e-commerce application** built with **React** and **React Bootstrap**, integrated with the **DummyJSON API**.  
The app includes:

- User authentication (login/register)
- Product browsing, filtering, sorting, and pagination
- Cart management
- User management
- A functional dashboard with full CRUD operations

---

## 🎯 Objectives
- Build a responsive frontend using React + React Bootstrap.
- Implement authentication with DummyJSON endpoints.
- Persist tokens across reloads.
- Integrate CRUD for Products, Carts, and Users.
- Provide a dashboard for managing all resources.

---

## 🔐 Authentication Module
- **Login Page**: Authenticate via DummyJSON login endpoint, validate inputs.
- **Register Page**: Mock registration flow (DummyJSON placeholder).
- **Token Persistence**: Store token in localStorage, auto-detect login state.
- **Authenticated User Data**: Fetch and display logged-in user info.

---

## 🛍️ Products Module
### Core Features
- List all products (`/products`).
- View product details (`/products/:id`).
- Search products (`/products/search`).
- Pagination (`limit` & `skip`).
- Category filtering (`/products/category/:category`).
- Sorting (price, rating, title).

### CRUD
- Add product.
- Update product.
- Delete product.

### Categories
- Display all categories.
- Filter products by category.

---

## 🛒 Carts Module
### Core Features
- Display all carts.
- View single cart details.
- Fetch carts by user ID.

### CRUD
- Add cart.
- Update cart.
- Delete cart.

UI must show cart contents, totals, and items clearly.

---

## 👥 Users Module
### Core Features
- Display all users.
- View single user details.
- Search users.
- Filter users (optional).
- Pagination (`limit` & `skip`).

### Authentication-Related
- User login.
- Fetch authenticated user data (`/auth/me`).

---

## 📊 Dashboard
- Navigation for Products, Carts, Users, Authentication.
- Sections for viewing, adding, editing, deleting data.
- Tables/cards for lists.
- Forms for CRUD.
- Optional summary widgets (e.g., product/user/cart counts).
- Clean, organized layout.

---

## 🎨 Design
- Built entirely with **React Bootstrap**.
- Modern, responsive, consistent design.
- Clean UI/UX practices.
- Accessibility: readability, contrast, clear buttons.

---

## ⚙️ Installation
```bash
# Clone repo
git clone https://github.com/your-username/frontend-ecommerce.git

# Navigate
cd frontend-ecommerce

# Install dependencies
npm install

# Run dev server
npm start

```
##**🛠️ Tech Stack**

- **React** – Frontend framework
- **React Bootstrap** – UI components and styling
- **DummyJSON API** – External API for products, carts, and users
- **Axios / Fetch API** – For API calls
- **JavaScript (ES6+)**
- **LocalStorage** – Token persistence

##** 🚀 Demo**

👉 [Live Demo](https://e-commerceproject-orcin.vercel.app/)

**## Notes/Known Issues**
- Registration is **mock only** (DummyJSON limitation).
- API data is **static/placeholder**.
- Token persistence uses **localStorage** (not secure for production).
- Deployment link updated to **Vercel**.
