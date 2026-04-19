# 📱 Xzal – Full-Stack Social Media Application

**Xzal** is a modern, full-stack social media platform designed for seamless user interaction, real-time engagement, and scalable performance. It combines a responsive **React.js** frontend with a robust **Spring Boot** backend, following RESTful architecture for smooth client-server communication.

---

## 🚀 Tech Stack

### 🎨 Frontend (React.js + MUI + Redux + Axios)

| Technology     | Purpose                                    |
|----------------|--------------------------------------------|
| React.js       | Component-based UI development            |
| Material-UI    | Modern, responsive UI components          |
| Redux          | Global state management                   |
| Formik + Yup   | Form handling & validation                |
| Axios          | HTTP requests to backend API              |
| React Router   | Client-side navigation                    |

### ⚙️ Backend (Spring Boot + Maven + REST API)

| Technology             | Purpose                                |
|------------------------|----------------------------------------|
| Spring Boot            | Backend framework                      |
| Spring Security        | Authentication & authorization (JWT)   |
| Spring Data JPA + Hibernate | ORM & database operations          |
| MySQL / PostgreSQL     | Relational database                    |
| Maven                  | Dependency management                  |
| REST API               | Standardized client-server communication|

---

## ✨ Key Features

### Frontend
- ✅ Fully responsive UI with Material-UI  
- ✅ Centralized state management using Redux  
- ✅ Form validation with Formik & Yup  
- ✅ Secure token-based authentication  
- ✅ Axios interceptors for API calls  

### Backend
- ✅ RESTful API endpoints for users, posts, comments, likes  
- ✅ JWT-based authentication & authorization  
- ✅ CRUD operations with Spring Data JPA  
- ✅ Scalable, modular architecture  
- ✅ Secure password encoding (BCrypt)  

---

## 📸 Screenshots

| Login Page | Register Page |
|------------|----------------|
| ![Login](https://github.com/user-attachments/assets/171bc7fc-4543-4793-bc3c-2d7a8136af2f) | ![Register](https://github.com/user-attachments/assets/3003d2fa-4f4d-487e-9c3d-c02fa1eb5322) |

| Home Feed | Create Post |
|------------|----------------|
| ![Home Feed](https://github.com/user-attachments/assets/4fbbb49e-56b3-4d6e-a126-842bc13a9bec) | ![Create Post](https://github.com/user-attachments/assets/8a5ff6e0-a91b-489e-9062-7489284cc7e7) |

| User Profile | Edit Profile |
|--------------|----------------|
| ![Profile](https://github.com/user-attachments/assets/b2f77d3d-b40c-40bf-94e2-783715389cdc) | ![Edit Profile](https://github.com/user-attachments/assets/d9822869-7847-41cc-b047-3d74961d4f05) |

---

## 🛠️ Installation & Setup

### Prerequisites
- Node.js (v16+)
- Java 17+
- MySQL / PostgreSQL
- Maven

### Backend Setup

```bash
# Clone repository
git clone https://github.com/yourusername/xzal.git
cd xzal/backend

# Configure database in application.properties
spring.datasource.url=jdbc:mysql://localhost:3306/xzal_db
spring.datasource.username=root
spring.datasource.password=yourpassword

# Build and run
mvn clean install
mvn spring-boot:run
