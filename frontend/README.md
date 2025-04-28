# 🚀 RBAC System - Role Based Access Control Blog App

This is a **full-stack web application** using the **MERN stack** (MongoDB, Express.js, React.js, Node.js) with **Role-Based Access Control (RBAC)**.

Users can **Sign Up**, **Login**, **Create Blogs**, **Edit/Delete their own blogs**, and **View all blogs** posted by others.  
The system ensures **only blog owners can edit/delete their blogs**.  
Navbar includes **Login**, **Signup**, **Admin Dashboard**, and **Logout** options.

---

## ✨ Features

- User Sign Up and Login with JWT authentication
- Passwords are hashed securely using bcrypt.js
- Users can only edit or delete their own blogs
- Public can view all blogs
- Role-Based Access Control (only blog owner can modify)
- Responsive React frontend
- Protected Routes
- Logout functionality
- Clean UI using Tailwind CSS
- Admin Dashboard to manage your blogs

---

## 🛠 Tech Stack

| Frontend          | Backend            | Database  |
|-------------------|---------------------|-----------|
| React.js, Axios, React Router, Tailwind CSS | Node.js, Express.js, JWT, bcryptjs | MongoDB, Mongoose |

---

## 📂 Project Structure


---

## ⚙️ Local Setup Instructions

### 1. Clone the repository

# Clone the project
git clone https://github.com/shobhitsinha-25/RBAC_System.git
cd RBAC_System

# Setup Backend (Node.js / Express)

# Go to backend folder
cd backend

# Create a .env file inside backend directory with the following content:
# (You have to manually create .env file or use a command like "touch .env" and add these lines inside)
# MONGO_URI=your_mongodb_connection_string
# JWT_SECRET=your_secret_key
# PORT=7000

# Install backend dependencies
npm install

# Start the backend server
npm run dev

# Setup Frontend (React.js)

# Go to frontend folder
cd ../frontend

# Install frontend dependencies
npm install

# Start the frontend server
npm run dev

Quick Start (TL;DR):
git clone https://github.com/shobhitsinha-25/RBAC_System.git

# Backend Setup
cd backend
npm install
npm run dev

# Frontend Setup
cd frontend
npm install
npm run dev



