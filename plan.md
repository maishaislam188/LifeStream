# LifeStream — Implementation Plan

---

## 1. Project Overview

**Project Name:** LifeStream – Blood Donation & Emergency Help Platform

**Goal:** Build a web-based platform where patients can quickly find blood donors during emergencies and donors can respond efficiently.

The system will:

* Allow users to search donors by blood group and location
* Enable emergency blood request posting
* Provide real-time donor availability tracking
* Include admin monitoring for reliability

---

## 2. Core Product Vision

LifeStream aims to become:

* A **digital emergency blood network**
* A **community healthcare support platform**
* A **real-time donor discovery system**
* A **practical MERN-based full-stack project**

---

## 3. Technology Stack

### Frontend

* React.js
* Tailwind CSS
* Axios

### Backend

* Node.js
* Express.js

### Database

* MongoDB Atlas
* Mongoose

### Authentication

* JWT (JSON Web Token)
* bcrypt

### Hosting

* Vercel (Frontend)
* Render / Railway (Backend) *(or full Vercel serverless if needed)*

---

## 4. Architecture Decision

We will follow a **3-tier MERN architecture**:

React (Frontend) → Express API (Backend) → MongoDB (Database)

### Why:

* Easy to understand for us
* Modular and scalable
* Matches academic learning

---

## 5. Development Philosophy

1. Build **feature by feature**
2. Focus on **working MVP first**
3. Keep code **simple and readable**
4. Test each module before moving forward
5. Use **modular structure**
6. Avoid over-engineering
7. Keep UI clean and responsive

---

## 6. User Roles

### 1) Donor

* Register/login
* Create profile
* Set availability
* Respond to requests

### 2) Patient/User

* Search donors
* Post emergency requests

### 3) Admin

* Manage users
* Verify donors
* Monitor requests

---

## 7. MVP Scope

### Core Features

* User registration & login
* Donor profile creation
* Search donors
* Emergency request posting
* Admin dashboard

### Minimum Data Required

* Name
* Blood group
* Location
* Contact
* Availability
* Request urgency

---

## 8. Phase-wise Development Plan

### Phase 1 — Project Setup

* Initialize MERN project
* Setup folder structure
* Connect MongoDB Atlas
* Setup basic server

---

### Phase 2 — Authentication

* Register API
* Login API
* JWT authentication
* Password hashing

---

### Phase 3 — Donor Module

* Create donor profile
* Update availability
* View donor details

---

### Phase 4 — Search System

* Filter donors by blood group
* Filter by location
* Display results

---

### Phase 5 — Emergency Request System

* Create request
* Mark urgency
* Track request status

---

### Phase 6 — Admin Dashboard

* View users
* Manage requests
* Verify donors

---

### Phase 7 — UI & Deployment

* Responsive design
* Testing & debugging
* Deploy frontend & backend

---

## 9. Folder Structure

LifeStream/
 └── apps/
      ├── web/
      │    ├── app/
      │    │    ├── api/
      │    │    │    └── test/
      │    │    │         └── route.js
      │    │   
      │    │    
      │    │
      │    ├── lib/
      │    │    └── mongodb.js
      │    │
      │    ├── models/
      │    │    
      │    │
      │    ├── node_modules/
      │    ├── public/
      │    ├── .env.local   (later)
      │    ├── package.json
      │    └── ...
      │
      └── admin/
           ├── app/
           │    ├── api/
           │    │    └── test/
           │    │         └── route.js
           │    
           │    
           │
           ├── lib/
           │    └── mongodb.js
           │
           ├── models/
           │    
           │
           ├── node_modules/
           ├── public/
           ├── .env.local   (later)
           ├── package.json
           └── ...

---

## 10. Core Data Models

### User

```js
{
  name,
  email,
  password,
  role,
  bloodGroup,
  location,
  availability
}
```

### Request

```js
{
  requesterId,
  bloodGroup,
  location,
  urgency,
  status,
  createdAt
}
```

---

## 11. API Plan

### Auth

* POST /api/auth/register
* POST /api/auth/login

### Donor

* GET /api/donors
* PUT /api/donor/update

### Request

* POST /api/request
* GET /api/request

### Admin

* GET /api/admin/users
* DELETE /api/admin/user

---

## 12. Key Pages

### Public

* Home
* Search Donors
* Emergency Requests

### User

* Login/Register
* Profile

### Admin

* Dashboard
* Manage Users

---

## 13. Submission Workflow

1. User registers
2. Donor creates profile
3. Patient posts request
4. Donors respond
5. Admin monitors

---

## 14. Validation Rules

* Required fields must be filled
* Valid email format
* Valid blood group
* Location required
* Secure password

---

## 15. Security Rules

* Password hashing (bcrypt)
* JWT authentication
* Role-based access
* Input validation

---

## 16. Environment Variables

```env
MONGODB_URI=
JWT_SECRET=
PORT=
```

---

## 17. Development Timeline

Week 1: Setup + Auth
Week 2: Donor module
Week 3: Search + Requests
Week 4: Admin
Week 5: Testing
Week 6: Deployment

---

## 18. Performance Considerations

* Optimize database queries
* Avoid unnecessary API calls
* Use efficient filtering

---

## 19. Things to Avoid

* Complex real-time systems
* Payment integration
* Overcomplicated UI

---

## 20. Launch Checklist

* Login works
* Donor search works
* Requests work
* Admin dashboard works
* UI responsive

---

## 21. Summary

LifeStream will be developed as a **simple, scalable MERN application** focusing on real-world problem solving and clean implementation.
