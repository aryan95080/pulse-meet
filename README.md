<div align="center">

# 🩺 Pulse-Meet

### A Full-Stack Doctor Appointment Booking Platform

Pulse-Meet connects patients with trusted doctors across multiple specialities — book appointments, manage your health profile, and pay securely, all in one place.

[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white)](https://react.dev/)
[![Node.js](https://img.shields.io/badge/Node.js-Express_5-339933?logo=node.js&logoColor=white)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Mongoose-47A248?logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Razorpay](https://img.shields.io/badge/Payments-Razorpay-0C2451?logo=razorpay&logoColor=white)](https://razorpay.com/)
[![License](https://img.shields.io/badge/License-ISC-blue.svg)](#-license)

[🌐 Live App](https://pulse-meet.onrender.com) · [🛠️ Admin Panel](https://pulse-meet-admin.onrender.com) · [⚙️ Backend API](https://pulse-meet-backend.onrender.com)

</div>

---

## 📖 Overview

Pulse-Meet is a **MERN stack** healthcare appointment platform built around three connected applications — a patient-facing web app, a doctor/admin management dashboard, and a REST API powering both. Patients can discover doctors by speciality, book appointments, and pay online, while doctors and admins manage schedules, profiles, and platform activity from a dedicated dashboard.

## 🔗 Live Deployment

| App | Link | Description |
|---|---|---|
| 🌐 **Patient App** | [pulse-meet.onrender.com](https://pulse-meet.onrender.com) | Browse doctors, book appointments, manage your profile |
| 🛠️ **Admin / Doctor Panel** | [pulse-meet-admin.onrender.com](https://pulse-meet-admin.onrender.com) | Doctor & admin dashboards, appointment management |
| ⚙️ **Backend API** | [pulse-meet-backend.onrender.com](https://pulse-meet-backend.onrender.com) | REST API serving both frontend apps |

> **Note:** This project is hosted on Render's free tier. The backend may take ~30–50 seconds to spin up on the first request after a period of inactivity.

## ✨ Features

### 👤 For Patients
- Browse doctors by speciality — General Physician, Gynecologist, Dermatologist, Pediatrician, Neurologist, Gastroenterologist
- View detailed doctor profiles with experience, fees, and live availability
- Book, view, and cancel appointments in a few clicks
- Secure online payments via **Razorpay**
- Register, log in, and manage a personal profile with photo upload

### 🩺 For Doctors
- Secure doctor login and personalized dashboard
- View, complete, or cancel upcoming appointments
- Update profile details, consultation fees, and availability status

### 🛡️ For Admins
- Admin dashboard with platform-wide statistics
- Add new doctors with image upload (via **Cloudinary**)
- View and manage all registered doctors
- Oversee and manage every appointment across the platform
- Toggle doctor availability in real time

## 🏗️ Tech Stack

<div align="center">

| Layer | Technologies |
|---|---|
| **Frontend (Patient App)** | React 19 · React Router · Tailwind CSS · Axios · React Toastify |
| **Admin / Doctor Panel** | React 19 · React Router · Tailwind CSS · Axios |
| **Backend** | Node.js · Express 5 · MongoDB · Mongoose |
| **Authentication** | JSON Web Tokens (JWT) · bcrypt |
| **File Storage** | Multer · Cloudinary |
| **Payments** | Razorpay |
| **Build Tooling** | Vite |
| **Deployment** | Render |

</div>

## 📁 Project Structure

```
pulse-meet/
├── backend/              # Express REST API
│   ├── config/           # MongoDB & Cloudinary configuration
│   ├── controllers/      # Business logic (admin, doctor, user)
│   ├── middlewares/      # Auth middleware & file upload handling
│   ├── models/           # Mongoose schemas (User, Doctor, Appointment)
│   ├── routes/           # API route definitions
│   └── server.js         # App entry point
│
├── frontend/             # Patient-facing React app
│   └── src/
│
└── admin/                # Admin & Doctor dashboard React app
    └── src/
```

## 🔌 API Overview

| Base Route | Description |
|---|---|
| `/api/user` | Patient registration, login, profile, appointments, payments |
| `/api/doctor` | Doctor login, profile, appointments, dashboard |
| `/api/admin` | Admin login, doctor management, appointment oversight, dashboard |

## 🚀 Getting Started Locally

### Prerequisites
- [Node.js](https://nodejs.org/) v18 or higher
- A [MongoDB](https://www.mongodb.com/) database (local or Atlas)
- A [Cloudinary](https://cloudinary.com/) account (for image uploads)
- A [Razorpay](https://razorpay.com/) account (for payments)



## 🗺️ Roadmap

- [ ] Doctor availability calendar with time-slot selection
- [ ] Email notifications for appointment confirmations
- [ ] Patient reviews and ratings for doctors
- [ ] Video consultation support

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the **ISC License**.

---

<div align="center">

Made with ❤️ by [Amit Kumar](https://github.com/aryan95080)

</div>
