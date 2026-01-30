Frontend E-Commerce Project

📖 Project Overview

This project is a frontend e-commerce application built using React and React Bootstrap. It integrates the DummyJSON API to provide essential e-commerce features, including:

🔐 User authentication (Login & Register)

📦 Product browsing, filtering, sorting, and pagination

🛒 Cart management

👤 Basic user management

📊 A functional dashboard covering all CRUD operations

The goal is to create a clean, responsive, and fully interactive frontend application that communicates with an external API.

🎯 Main Objectives

Build a complete and responsive frontend using React and React Bootstrap.

Implement Login and Register functionality using DummyJSON authentication endpoints.

Ensure token persistence, so the user remains logged in across page reloads.

Integrate all CRUD operations for Products, Carts, and Users.

Use available API routes to implement real e-commerce interactions.

Create a functional dashboard to manage all resources.

⚙️ Installation Steps

Clone the repository

git clone https://github.com/your-username/frontend-ecommerce.git
cd frontend-ecommerce

Install dependencies

npm install

Run the development server

npm run dev

Build for production

npm run build

Preview production build

npm run preview

🛠️ Tech Stack

React – Component-based UI library

React Bootstrap – UI components and responsive design

React Router – Routing and navigation

Axios / Fetch API – API communication

DummyJSON API – Mock backend for authentication, products, carts, and users

LocalStorage – Token persistence

🚀 Demo

Once deployed, the project will be available at:

👉 Live Demo Link

📦 Features Implemented

Authentication Module

Login using DummyJSON login endpoint

Mock registration flow

Token persistence in localStorage

Fetch and display authenticated user data

Products Module

Display all products

View product details

Search products

Pagination using limit & skip

Category filtering

Sorting (price, rating, title)

CRUD operations: Add, Update, Delete

Carts Module

Display all carts

View single cart details

Fetch carts by user ID

CRUD operations: Add, Update, Delete

Users Module

Display all users

View single user details

Search users

Pagination using limit & skip

Fetch authenticated user data

Dashboard

Navigation menu for Products, Carts, Users, Authentication

Sections for viewing, adding, editing, deleting data

Tables/cards for lists

Forms for CRUD operations

Summary widgets (products, users, carts)

🎨 Design Requirements

Built entirely with React Bootstrap

Modern, responsive, and consistent design

Clean UI/UX practices

Accessibility principles (contrast, readability, clear buttons)

⚠️ Notes / Known Issues

Registration is a mock flow (DummyJSON does not persist new users).

API responses are limited to DummyJSON’s mock data.

Authentication tokens are stored in localStorage (not secure for production).

Sorting and filtering options are limited to what DummyJSON provides.
