# 🏥 MediMeet - Doctor Appointment Platform (Backend)

> **A modern, scalable RESTful API for managing doctor appointments, user profiles, and medical reports with robust authentication and file handling.**

[![Node.js](https://img.shields.io/badge/Node.js-18+-green?logo=node.js)](https://nodejs.org/)
[![Express.js](https://img.shields.io/badge/Express.js-5.2-blue?logo=express)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-9.1-green?logo=mongodb)](https://www.mongodb.com/)
[![JWT](https://img.shields.io/badge/JWT-Authentication-orange)](https://jwt.io/)

---

## 📋 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Installation](#-installation)
- [Configuration](#-configuration)
- [API Endpoints](#-api-endpoints)
- [Database Schema](#-database-schema)
- [Authentication](#-authentication)
- [File Management](#-file-management)
- [Best Practices](#-best-practices)
- [Future Enhancements](#-future-enhancements)

---

## ✨ Features

### 🔐 Authentication & Authorization
- JWT-based authentication with 24-hour token expiry
- Bcryptjs password hashing with salt rounds
- Protected routes with middleware verification
- User registration with email uniqueness validation
- Secure login with token generation

### 👤 User Management
- Complete user profile management
- Profile picture upload (5MB max, image formats only)
- User data persistence with timestamps
- Password protection in database queries

### 📅 Appointment Management
- Book appointments with doctor type, date, time
- Appointment tracking and history
- Cancel appointments with proper validation
- User-specific appointment retrieval

### 📄 Medical Reports & Documents
- Multi-file upload support per appointment
- Support for PDF, JPEG, PNG, DOC, DOCX, TXT
- 15MB file size limit with validation
- Download and delete functionality
- Report metadata tracking (filename, upload date)

### 📸 Profile Pictures
- User profile picture uploads
- Secure file storage with unique naming
- Automatic file path management
- Profile picture in user authentication response

---

## 🛠 Tech Stack

### Backend Framework
- **Node.js** (v18+) - JavaScript runtime
- **Express.js** (v5.2) - Web application framework
- **ES6 Modules** - Modern JavaScript syntax

### Database
- **MongoDB** (v9.1) - NoSQL document database
- **Mongoose** (v9.1) - ODM for MongoDB with schema validation

### Authentication & Security
- **JWT (jsonwebtoken)** - Secure token-based authentication
- **Bcryptjs** (v3.0) - Password hashing and comparison
- **CORS** - Cross-Origin Resource Sharing

### File Management
- **Multer** (v2.0) - Middleware for file uploads
- **Path** & **FS** - Node.js built-in file handling

### Utilities
- **Dotenv** (v17.2) - Environment variable management
- **Body-parser** - Built-in Express middleware for JSON parsing

---

## 📁 Project Structure

```
doctor-appointment-server/
├── models/
│   ├── User.js              # User schema with profile picture
│   └── Appointment.js       # Appointment schema with reports array
├── controllers/
│   └── authController.js    # Auth logic + profile/report handlers
├── routes/
│   ├── authRoutes.js        # Auth endpoints + file uploads
│   ├── appointmentRoutes.js # Appointment CRUD + report management
│   └── serviceRoutes.js     # Service endpoints
├── middlewares/
│   └── authMiddleware.js    # JWT verification & user extraction
├── config/
│   └── db.js                # MongoDB connection
├── uploads/                 # Profile pictures storage
├── reports/                 # Medical reports storage
├── server.js                # Express app initialization
├── .env                     # Environment variables
├── .gitignore               # Git ignore patterns
├── package.json             # Dependencies
└── README.md                # Documentation
```

---

## 🚀 Installation

### Prerequisites
- Node.js v18 or higher
- MongoDB (local or cloud)
- npm or yarn package manager

### Steps

1. **Clone the repository**
```bash
git clone <repository-url>
cd doctor-appointment-server
```

2. **Install dependencies**
```bash
npm install
```

3. **Configure environment variables**
```bash
cp .env.example .env
# Edit .env with your configuration
```

4. **Create uploads directories**
```bash
mkdir -p uploads reports
```

5. **Start the server**
```bash
npm run dev    # Development with nodemon
npm start      # Production mode
```

Server runs on `http://localhost:5000`

---

## ⚙️ Configuration

### Environment Variables (.env)

```env
# Database
MONGODB_URI=mongodb://localhost:27017/medimeet
# or for MongoDB Atlas
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/medimeet

# JWT
JWT_SECRET=your_super_secret_jwt_key_change_in_production
JWT_EXPIRE=24h

# Server
PORT=5000
NODE_ENV=development
```

### Key Configuration Points

- **JWT_SECRET**: Change this in production for security
- **MONGODB_URI**: Ensure connection string is correct
- **File Upload Limits**: 
  - Profile pictures: 5MB
  - Medical reports: 15MB
- **Allowed File Types**:
  - Profiles: JPEG, JPG, PNG, GIF
  - Reports: PDF, JPEG, JPG, PNG, DOC, DOCX, TXT

---

## 📡 API Endpoints

### Authentication Routes (`/api/auth`)

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/register` | Register new user | ❌ |
| POST | `/login` | Login user, get JWT token | ❌ |
| GET | `/profile` | Get user profile | ✅ |
| PUT | `/profile` | Update user profile + picture | ✅ |
| POST | `/upload-profile-picture` | Upload profile picture | ✅ |

### Appointment Routes (`/api/appointments`)

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/` | Book new appointment | ✅ |
| GET | `/` | Get user's appointments | ✅ |
| DELETE | `/:id` | Cancel appointment | ✅ |
| POST | `/:id/upload-report` | Upload report to appointment | ✅ |
| DELETE | `/:id/report/:reportIndex` | Delete specific report | ✅ |

### Request/Response Examples

**Register User**
```http
POST /api/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+1234567890",
  "password": "SecurePassword123"
}
```

**Login**
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "SecurePassword123"
}

Response:
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "_id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "+1234567890",
    "profilePicture": "/uploads/profile-1234567890-123.jpg"
  }
}
```

**Book Appointment**
```http
POST /api/appointments
Authorization: Bearer {token}
Content-Type: application/json

{
  "doctorType": "Cardiology",
  "date": "2026-02-15",
  "time": "14:30",
  "comments": "Regular checkup"
}
```

**Upload Report**
```http
POST /api/appointments/{appointmentId}/upload-report
Authorization: Bearer {token}
Content-Type: multipart/form-data

Form Data:
- report: [file] (PDF, JPEG, PNG, DOC, DOCX, TXT - max 15MB)
```

---

## 🗄️ Database Schema

### User Model
```javascript
{
  name: String (required),
  email: String (required, unique),
  phone: String (required),
  password: String (required, hashed),
  avatar: String,
  profilePicture: String (file path),
  createdAt: Date,
  updatedAt: Date
}
```

### Appointment Model
```javascript
{
  userId: ObjectId (ref: User),
  doctorType: String (required),
  date: String (required),
  time: String (required),
  comments: String,
  report: String,
  reports: [{
    filename: String,
    filepath: String,
    uploadedAt: Date
  }],
  createdAt: Date,
  updatedAt: Date
}
```

---

## 🔐 Authentication

### How JWT Works

1. **Registration**: Password hashed with bcryptjs, user stored in DB
2. **Login**: Credentials verified, JWT token generated with user ID
3. **Protected Routes**: Token extracted from Authorization header
4. **Verification**: Middleware decodes token, extracts user ID
5. **Access**: Route handler uses user ID for authorization checks

### Token Structure
```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjUwN2YxZjc3YmNmODZjZDc5OTQzOTAxMSIsImlhdCI6MTY3NDY2NjY2NiwiZXhwIjoxNjc0NzUzMDY2fQ.abc123...
```

### Middleware Flow
```
Request → Check Authorization Header → Extract Token → Verify JWT → 
Set req.user → Next Middleware → Route Handler
```

---

## 📂 File Management

### Profile Pictures
- **Storage**: `uploads/` directory
- **Naming**: `profile-{timestamp}-{random}.{ext}`
- **Max Size**: 5MB
- **Formats**: JPEG, JPG, PNG, GIF
- **Access**: `GET /uploads/{filename}`

### Medical Reports
- **Storage**: `reports/` directory
- **Naming**: `report-{timestamp}-{random}.{ext}`
- **Max Size**: 15MB
- **Formats**: PDF, JPEG, JPG, PNG, DOC, DOCX, TXT
- **Access**: `GET /reports/{filename}`
- **Metadata**: Stored in MongoDB with filename and upload date

### Upload Validation
- **Client-side**: File type and size checks
- **Server-side**: Multer middleware validation
- **Database**: File path stored for retrieval
- **Security**: Unique naming prevents conflicts

---

## 🎯 Best Practices Implemented

### Security
✅ **Password Security**
- Bcryptjs hashing with salt rounds
- Passwords never returned in API responses
- Password excluded from profile queries

✅ **JWT Authentication**
- Secure token generation and validation
- Token expiry (24 hours)
- Proper error handling for expired/invalid tokens

✅ **File Upload Security**
- File type validation on server
- File size limits enforced
- Unique filenames prevent overwriting
- Proper error handling

### Code Quality
✅ **Error Handling**
- Try-catch blocks in async handlers
- Meaningful error messages
- Proper HTTP status codes (200, 400, 401, 403, 404, 500)

✅ **Data Validation**
- Email uniqueness checks
- Required field validation
- Type checking for request data

✅ **Code Organization**
- Separation of concerns (Models, Controllers, Routes)
- Middleware for cross-cutting concerns
- Clean, readable code structure

### API Design
✅ **RESTful Standards**
- Proper HTTP methods (GET, POST, PUT, DELETE)
- Resource-based endpoints
- Consistent response format

✅ **User Authorization**
- User can only access own data
- Ownership verification for operations
- Proper permission checks

---

## 🔄 Request-Response Cycle

```
CLIENT REQUEST
    ↓
Express Server (CORS enabled)
    ↓
Route Handler (Router)
    ↓
Middleware (Auth, Multer)
    ↓
Controller (Business Logic)
    ↓
MongoDB (CRUD Operations)
    ↓
Response JSON
    ↓
CLIENT
```

---

## 🚀 Future Enhancements

- [ ] Email notifications for appointments
- [ ] SMS reminder system
- [ ] Video consultation integration
- [ ] Advanced scheduling with availability slots
- [ ] Payment integration for premium consultations
- [ ] Doctor rating and review system
- [ ] Prescription management
- [ ] Integration with health insurance
- [ ] Real-time notifications with WebSockets
- [ ] Admin dashboard for statistics

---

## 📦 Dependencies Overview

| Package | Version | Purpose |
|---------|---------|---------|
| express | 5.2.1 | Web framework |
| mongoose | 9.1.4 | MongoDB ODM |
| jsonwebtoken | 9.0.3 | JWT authentication |
| bcryptjs | 3.0.3 | Password hashing |
| multer | 2.0.2 | File uploads |
| cors | 2.8.5 | CORS handling |
| dotenv | 17.2.3 | Environment variables |

---

## 🧪 Testing

```bash
# Test endpoint with cURL
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123"}'

# Test with Postman
1. Set base URL: http://localhost:5000
2. Create environment variables for token
3. Use pre-request scripts for authorization
4. Test all endpoints in collection
```

---

## 🤝 Contributing

1. Create a feature branch (`git checkout -b feature/amazing-feature`)
2. Commit changes (`git commit -m 'Add amazing feature'`)
3. Push to branch (`git push origin feature/amazing-feature`)
4. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License - see LICENSE file for details.

---

## 👨‍💼 About

Built with ❤️ using modern Node.js, Express.js, and MongoDB technologies. Designed for healthcare professionals and patients seeking seamless appointment management and medical record handling.

### Key Highlights
- 🚀 Production-ready code
- 🔒 Enterprise-level security
- 📊 Scalable architecture
- 🎯 RESTful API design
- 📚 Well-documented endpoints
- ⚡ Fast and efficient database queries

---

## 📞 Support

For issues, questions, or suggestions, please open an issue on the repository.

---

**Last Updated**: January 26, 2026  
**Version**: 1.0.0  
**Status**: ✅ Production Ready
