# 🏥 Hospital Management System – Authentication Module

This document explains the complete **authentication flow** used in the Hospital Management System built with **MERN stack (MongoDB, Express, React, Node.js)**.

---

## 📌 Features of Authentication (Flow of Authentication)

✔ User Registration with email confirmation  
✔ User Login with JWT authentication  
✔ Forgot Password and Reset Password functionality  
✔ Role-based authentication (User / Admin)  
✔ Admin Login and Signup functionalities  
✔ Protected routes using middleware  
✔ Secure password storage using bcrypt  
✔ JWT tokens stored in headers for API access

---

## 🔑 Authentication Flow

### 1️⃣ **User Registration**
- User fills registration form with name, email, password.
- Password is hashed using **bcrypt** and stored in the database.
- After successful registration, an email is sent to the user with the message:
  **"You have registered successfully!"**
- User’s role is set to `user` by default.

### 2️⃣ **User Login**
- User enters email and password.
- The password is verified against the hashed password in the database.
- If credentials are valid, a **JWT token** is generated and sent back in the response.
- The token is used in subsequent requests for authentication.

### 3️⃣ **Forgot Password**
- User requests password reset by entering their email.
- A reset link or OTP is sent via email.
- The user uses the link or OTP to create a new password.

### 4️⃣ **Reset / Change Password**
- After validating the reset token or verifying OTP, user can set a new password.
- The new password is hashed before saving to the database.

### 5️⃣ **Admin Login / Signup**
- Admin has a separate signup and login process or can be manually added to the database.
- Admin’s role is set as `admin`.
- Admin can manage users, doctors, appointments, etc.
- Role-based middleware ensures only admins can access certain routes.

### 6️⃣ **Protected Routes**
- Certain routes like creating doctors, viewing all appointments, or updating patient details are accessible only by admins.
- User-specific routes like viewing prescriptions, booking appointments are protected by user authentication.

---
### ✅ POST /api/auth/login

Logs in the user/admin and returns JWT token

## ✅ POST /api/auth/forgot-password

Sends reset link or OTP to user email

## ✅ POST /api/auth/reset-password

Allows user to set new password

## ✅ GET /api/auth/me

## 📦 Database Models

### ✅ Users
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "hashed_password",
  "role": "user",
  "profile": {
    "age": 30,
    "gender": "Male"
  }
}

{
  "name": "Admin Name",
  "email": "admin@example.com",
  "password": "hashed_password",
  "role": "admin"
}
## API Endpoints (Auth Related)
## POST /api/auth/register

Registers a new user

Sends success email



Returns user profile based on token

## 📌 Features of Patent we will add soon (Feature of patent we will add soon)
