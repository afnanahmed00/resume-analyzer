# 🚀 AI Resume Analyzer

This project is a full-stack web application I built to analyze resumes and give feedback similar to how an ATS (Applicant Tracking System) works.

The idea came from a common problem — people apply for jobs but don’t know whether their resume actually matches the role. So I built a tool that helps identify **missing skills, matched skills, and an overall score** based on a selected job role.

---

## ✨ What it does

* Upload a resume (PDF or Word)
* Select a job role (Frontend, Backend, DevOps, etc.)
* Get an ATS-style score
* See which skills are already present in the resume
* See which important skills are missing
* Preview extracted resume content

---

## 🧠 How it works

The backend parses the resume file and extracts text using:

* PDF parser for `.pdf` files
* Mammoth for `.docx` files

Then it compares the resume content with a **predefined skill set for each role**, including:

* Programming languages
* Frameworks
* Tools

Based on matches, it calculates a score and returns structured feedback.

---

## 🛠️ Tech Stack

### Frontend

* React
* Tailwind CSS
* Axios

### Backend

* Node.js
* Express
* Multer (file upload)
* pdf-parse (PDF parsing)
* mammoth (Word document parsing)

---

## 📁 Project Structure

resume-analyzer/
│
├── client/   → React frontend
├── server/   → Node.js backend
├── README.md
└── .gitignore

---

## 🚀 Running Locally

### 1. Clone the repository

git clone https://github.com/afnanahmed00/resume-analyzer.git

---

### 2. Start Backend

cd server
npm install
node index.js

---

### 3. Start Frontend

cd client
npm install
npm start

---

## 🌐 Deployment

Frontend is deployed on Vercel
Backend is deployed on Render

--------link---------

---

## 💡 Why I built this

I wanted to build something beyond basic CRUD apps — something that actually solves a real problem and demonstrates:

* File handling
* Backend processing
* Real-world logic (ATS-style filtering)
* Clean UI/UX

---

## 📌 Future Improvements

* AI-based skill extraction
* Resume scoring based on real job descriptions
* Downloadable PDF report
* User accounts and history

---

## 👨‍💻 About Me

I’m currently focusing on frontend/full-stack development and building projects that solve practical problems. This project is part of my effort to create portfolio work that reflects real-world use cases.

---
