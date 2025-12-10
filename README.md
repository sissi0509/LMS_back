# Kambaz LMS Backend — Node.js/Express + MongoDB API
Backend service for **Kambaz**, a full-stack Learning Management System supporting courses, assignments, quizzes.

This repository exposes a secure REST API used by the frontend:  
👉 Frontend repo: https://github.com/sissi0509/LMS_front

---

## 🚀 Overview

The backend provides:

- Authentication & authorization with **cookie-based sessions**
- Role-based access for **students** and **faculty**
- Data models for **users, courses, enrollments, quizzes, questions, and quiz attempts**
- Quiz grading and attempt tracking according to rich quiz settings  
  (multiple attempts, availability windows, access code, shuffle answers, etc.)

---

## ✨ Core Features

### 🔐 Authentication & Authorization
- User signup, login, and profile  
- Cookie-based session / token handling with `withCredentials`
- Role-based access control  
  - **Faculty**: manage courses & quizzes  
  - **Students**: enroll, take quizzes, view attempts  

### 📚 Courses & Enrollments
- Faculty create courses  
- Students enroll in and view only their own courses  

### 🧠 Quizzes & Questions

- Create, update, delete quizzes  
- Store quiz metadata:  
  - Points  
  - Assignment group  
  - Shuffle answers  
  - Time limit  
  - Multiple attempts  
  - Max attempts  
  - Show correct answers options  
  - Access code  
  - One-question-at-a-time  
  - Due/available dates  
- Question types:
  - Multiple Choice  
  - True/False  
  - Fill-in-the-Blank  
- Inline editing for question creation & updates  

### 🎯 Quiz Attempts & Grading
- Create or update attempts  
- Enforce max attempts  
- Automatically grade questions  
- Store answers per attempt per student  
- Support timestamp history: startAt, submittedAt  

---

## 🛠️ Tech Stack

- **Node.js**
- **Express**
- **MongoDB (Atlas)**
- **Mongoose**
- **Cookie-based sessions**
- **CORS with credentials**

---

## 🧱 Main Data Models

- **User**: name, email, password, role  
- **Course**: owner, title, description, enrolled students  
- **Quiz**: metadata + belonging to a course  
- **Question**: MCQ / True-False / Fill-Blank  
- **QuizAttempt**: student answers, scores, attempt history  

---

## 📡 API Style

Examples:

- `POST /api/auth/login`
- `POST /api/auth/signup`
- `GET /api/users/profile`
- `GET /api/courses`
- `POST /api/courses/:cid/quizzes`
- `GET /api/courses/:cid/quizzes/:qid`
- `PUT /api/courses/:cid/quizzes/:qid`
- `DELETE /api/courses/:cid/quizzes/:qid`
- `POST /api/quizzes/:qid/questions`
- `POST /api/quizzes/:qid/attempts`
- `GET /api/quizzes/:qid/attempts/:userId`

---

## ▶️ Running the Backend Locally

### 1. Clone the repo
```bash
git clone https://github.com/sissi0509/LMS_back
cd LMS_back
```

### 2. Install dependencies
```bash
npm install
```

### 3. Environment Variables
Create a `.env` file:

```
MONGO_URI=mongodb+srv://...
JWT_SECRET=your_jwt_secret
SESSION_SECRET=your_session_secret
FRONTEND_URL=http://localhost:3000
PORT=4000
```

### 4. Start the server
```bash
node index.js
```

API runs at:  
`http://localhost:4000`

---

## 🌱 Future Improvements

- Quiz analytics dashboard  
- Question banks & random pools  
- Import/export of quiz content  
- Granular role permissions  
- Additional security hardening  

---

## 🤝 Acknowledgments
This project was developed by **Xi Zhao** and **Eunjin Lee** as part of the Northeastern University MSCS program.


