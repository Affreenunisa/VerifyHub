# VerifyHub – Employee Verification & Access Portal

VerifyHub is a Single Page Application (SPA) built with Angular and Node.js/Express.

It provides role-based login, employee verification records, and an admin user-management module with persistent XML-based storage.

## Key Features

- User login with role selection
- General User and Admin access levels
- Employee verification records
- Admin user management
- Add and delete users
- Persistent XML storage
- Configurable API delay to demonstrate asynchronous processing
- Angular service-based architecture
- Route protection using an authentication guard

## Project Structure

verifyhub/
├── src/
│   └── app/
│       ├── login/
│       ├── dashboard/
│       ├── auth.service.ts
│       ├── auth.guard.ts
│       ├── records.service.ts
│       └── user-management.service.ts
├── public/
├── package.json
├── angular.json
└── README.md

verifyhub-backend/
├── src/
│   ├── server.ts
│   ├── records.ts
│   └── users.ts
├── users.xml
├── package.json
└── tsconfig.json

## Features

### 1. Role-Based Login

Users can log in using:

- User ID
- Password
- Role

Supported roles:

- General User
- Admin

### 2. Verification Records

After login, users can view employee verification records in a table.

The records displayed depend on the user's access level.

### 3. Admin User Management

Admins can:

- View registered users
- Add new users
- Delete users
- Manage General User and Admin accounts

The main Admin account is protected from deletion.

### 4. Persistent User Storage

User information is stored in a local XML file.

Changes made through the Admin panel remain available after restarting the backend server.

### 5. Asynchronous API Processing

The verification records API supports a configurable delay parameter to demonstrate asynchronous API processing.

## Technology Stack

### Frontend

- Angular 22
- TypeScript
- HTML
- CSS
- Angular Reactive Forms
- Angular Router
- Angular HttpClient
- RxJS

### Backend

- Node.js
- Express.js
- TypeScript
- CORS

### Storage

- Local XML file storage

### Development Tools

- Visual Studio Code
- Angular CLI
- npm

## Setup & Installation

### 1. Clone the Repository

git clone <your-github-repository-url>
cd verifyhub

### 2. Install Frontend Dependencies

npm install

### 3. Start the Angular Application

ng serve

The frontend will run at:

http://localhost:4200

### 4. Start the Backend

Open a second terminal and navigate to the backend folder:

cd verifyhub-backend
npm install

Then start the backend:

npx ts-node-dev src/server.ts

The backend API will run at:

http://localhost:3000

### 5. Open the Application

Open your browser and visit:

http://localhost:4200

## Demo Credentials

### General User

- User ID: user01
- Password: user123
- Role: General User

### Admin

- User ID: admin01
- Password: admin123
- Role: Admin

> These credentials are provided only for demonstration and testing purposes.

## API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| POST | /api/login | Authenticate a user |
| GET | /api/records | Retrieve verification records |
| GET | /api/users | Retrieve users for Admin |
| POST | /api/users | Create a new user |
| DELETE | /api/users/:id | Delete a user |
| GET | /api/health | Check backend API status |

### API Delay

The verification records API supports a delay query parameter.

Example:

/api/records?role=Admin&delay=2000

This adds a 2-second delay before returning the response and demonstrates asynchronous API processing.

## Architecture

VerifyHub follows a simple client-server architecture.

Angular Frontend
       |
       | HTTP Requests
       v
Node.js + Express API
       |
       +------> users.xml
       |
       +------> Verification Records

### Frontend

The Angular application handles:

- Login and authentication state
- Routing and route protection
- Dashboard and verification records
- Admin user management
- API communication through Angular services

### Backend

The Node.js/Express API handles:

- User authentication
- Role-based access control
- Verification record retrieval
- User creation and deletion
- XML-based user persistence
- Configurable API response delay

## Security Note

This project is developed as a demonstration prototype for the coding assignment.

- Demo passwords are stored in the local XML file for simplicity.
- Authentication and role checks are implemented for demonstration purposes.
- A production application should use secure password hashing, token-based authentication, HTTPS, and stronger authorization mechanisms.

## Conclusion

VerifyHub demonstrates a complete Angular and Node.js based application with:

- Role-based authentication
- Protected routes
- REST API integration
- Admin user management
- Persistent XML storage
- Asynchronous API processing
- Modular Angular services
- Responsive user interface

The project was developed as a practical demonstration of full-stack development, API integration, and clean application architecture.