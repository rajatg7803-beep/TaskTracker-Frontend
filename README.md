# TaskTracker-Frontend

TaskTrackr is a **full-stack task management application** that allows users to register, log in, and manage their daily tasks.  
It’s built with a **React frontend** and a **Node.js + Express + MongoDB backend**.

---

#Folder Structure 
frontend/
│   index.html
│   package.json
│
└── src/
      main.jsx
      App.jsx
      api.js
      styles.css
      components/
        AuthForm.jsx
        TaskList.jsx
        TaskForm.jsx
  
#Steps

npm create vite@latest frontend -- --template react
cd frontend
npm install
npm install axios
npm run dev

.env 
PORT=5000
MONGO_URI=yourURL
FRONTEND_URL=http://localhost:5173
JWT_SECRET=yourkey
