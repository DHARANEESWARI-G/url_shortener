# 🔗 URL Shortener - MERN Stack (Basic project)

A full-stack URL shortening service built with MongoDB, Express, React, and Node.js (MERN stack).

This is a simple project to understand backend concepts, so the frontend will be minimal.

## ✨ Features

- Shorten long URLs to compact links
- Track click analytics for each shortened URL
- Simple yet responsive web interface
- RESTful API backend
- MongoDB for persistent storage

## 🛠️ Tech Stack

**Frontend**:
- React.js
- Axios for API calls
- React Router for navigation

**Backend**:
- Node.js & Express
- MongoDB (with Mongoose ODM)
- ShortID for generating unique URLs

## 🚀 Getting Started

### Prerequisites
- Node.js (v14+)
- MongoDB (I have used local URI)
- Git

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/username/url_shortener.git
   cd url_shortener

2. **Backend setup**:
   cd backend
   npm install
   cp .env.example .env  # Update with your MongoDB URI
   npm start
3. **Frontend setup**:
   cd ../frontend
   npm install
   npm start

## 🌐 API Endpoints

/api/url/shorten	  POST	   Create short URL
/api/url/:shortUrl	GET	     Redirect to original URL
/api/url/stats/:shortUrl	GET	 Get URL analytics

## Project Structure
url-shortener/
├── backend/
│   ├── models/       # MongoDB models
│   ├── routes/       # API routes
│   ├── server.js     # Express server
├── frontend/
│   ├── public/       # Static files
│   ├── src/
│   │   ├── components/ # React components
│   │   ├── App.js      # Main app
├── .gitignore
└── README.md

## Environment variables

Backend(.env file):
MONGODB_URI=mongodb://localhost:27017/url_shortener
PORT=5000

**Will enhance the project in future!** Thank you :)
