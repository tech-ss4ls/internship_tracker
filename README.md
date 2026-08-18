# Internship Learning Path
```markdown
![Node.js](https://img.shields.io/badge/Node.js-18.x-green)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-14-blue)
![Express.js](https://img.shields.io/badge/Express.js-4.x-lightgrey)
![JWT](https://img.shields.io/badge/JWT-Authentication-orange)
![License](https://img.shields.io/badge/License-MIT-yellow)

A full-stack web application for managing internship learning paths with user authentication, PostgreSQL database, and JWT-based security.

## 🚀 Features

- User registration and login with JWT authentication
- Secure password hashing using bcrypt
- PostgreSQL database integration
- Protected routes and session management
- Responsive HTML/CSS frontend
- RESTful API endpoints

## 🛠️ Tech Stack

- **Backend**: Node.js, Express.js
- **Database**: PostgreSQL
- **Authentication**: JWT (JSON Web Tokens), bcrypt
- **Frontend**: HTML, CSS, JavaScript
- **DevOps**: Git, GitHub, GitLab CI/CD (optional)

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v14 or higher)
- [PostgreSQL](https://www.postgresql.org/) (v12 or higher)
- [Git](https://git-scm.com/)
- A code editor (VS Code recommended)

## 🔧 Installation

### 1. Clone the repository

```bash
git clone https://github.com/tech-ss4ls/internship_learning_path.git
cd internship_learning_path

#Install dependencies
cd backend
npm install

#Set up environment variables
#Create a .env file in the project root by copying .env.example:
cp .env.example .env

#Then edit .env with your actual values:
JWT_SECRET=your-secret-key-here
PORT=3000
DB_USER=postgres
DB_HOST=localhost
DB_NAME=your_database_name
DB_PASSWORD=your-password
DB_PORT=5432

#Set up the database
psql -U postgres
CREATE DATABASE internship_learning_path;
\q
#Then create the users table:
CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    full_name VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    last_login TIMESTAMP
);

#Start the server
cd backend
node server.js
#The server will run on http://localhost:3000

#Open the frontend
frontend/index.html

# Project Structure
internship_learning_path/
├── frontend/               # Frontend HTML files
│   ├── index.html
│   ├── login.html
│   ├── signup.html
│   └── dashboard.html
├── backend/                # Backend server code
│   ├── server.js          # Main server file
│   ├── auth.js            # Authentication logic
│   ├── main.js            # Core application logic
│   ├── package.json       # Node.js dependencies
│   └── package-lock.json  # Locked dependency versions
├── .env.example            # Template for environment variables
├── .gitignore              # Git ignore rules
└── README.md               # Project documentation

🚦 API Endpoints
Method	Endpoint	Description	Authentication
POST	/api/signup	Create a new user	No
POST	/api/login	Authenticate user	No
GET	/api/profile	Get user profile	Yes (JWT)
GET	/api/health	Health check	No
Example API Request

Signup:
bash

curl -X POST http://localhost:3000/api/signup \
  -H "Content-Type: application/json" \
  -d '{"email":"user@example.com","password":"securepass","fullName":"John Doe"}'

Login:
bash

curl -X POST http://localhost:3000/api/login \
  -H "Content-Type: application/json" \
  -d '{"email":"user@example.com","password":"securepass"}'

🧪 Testing

You can test the API endpoints using:

    Postman

    curl commands in terminal

    The frontend HTML pages in your browser

🤝 Contributing

    Fork the repository

    Create a feature branch (git checkout -b feature/amazing-feature)

    Commit your changes (git commit -m 'Add amazing feature')

    Push to the branch (git push origin feature/amazing-feature)

    Open a Pull Request

📝 License

This project is for educational purposes as part of an internship learning path, brought to you by the FASSET-HET program

👥 Authors

* Contributors to the project
   Andrew Greenwood - Supervisor (andrew@ss4ls.org)
   Mujtabaa Suliman - tech-ss4ls (https://muj1sul@github.com/mujsul/)
   (Future contributors to the project - add name below)

🙏 Acknowledgments

    Node.js

    Express.js

    PostgreSQL

    JWT

    bcrypt

📧 Contact

For questions or feedback, please reach out to tech@ss4ls.
