# leaddesk mini - Lead Management System

A production-ready Full Stack Lead Management System built for **leaddesk mini**, a premium AI and software agency. This project includes a high-converting, modern landing page, a secure client-side validated Lead/RFP form, an Express Node.js API, and a beautiful Admin console for processing received leads.

**Live Demo**
Landing Page
lead-deskmini-git-main-sanvitha-s-projects.vercel.app

Admin Dashboard

[https://lead-deskmini-git-main-sanvitha-s-projects.vercel.app/admin/login](https://lead-deskmini-git-main-sanvitha-s-projects.vercel.app/admin/login)

Backend API

[https://your-render-url.onrender.com](https://leaddeskmini-u96z.onrender.com/)

## Project Overview

LeadDesk Mini simulates the workflow used by software agencies to receive project inquiries from potential clients.

Visitors can submit project requirements through a professional landing page. Every submission is securely stored in Supabase and immediately becomes available inside the administrator dashboard.

Administrators authenticate using JWT-based authentication before accessing protected routes where they can view, manage and update the status of incoming leads.

## Features
Landing Page
Modern responsive UI
Company introduction
Service highlights
Client enquiry form
Form validation
Mobile friendly

## Lead Submission
Users can submit
Name
Email
Company
Budget
Project Type
Project Description
All submitted data is validated before being stored in the database.

## Admin Dashboard

Secure dashboard for administrators.
Features include
Secure Login
View all leads
Update lead status
Delete leads
Logout
Protected Routes using JWT
Authentication

## The application uses JWT (JSON Web Token) authentication instead of hardcoded credentials.

Authentication flow:

Admin Login
       │
       ▼
Express Backend
       │
Verify Username & Password
       │
       ▼
Generate JWT Token
       │
       ▼
Token stored in browser
(localStorage)
       │
       ▼
Every protected request sends

Authorization:
Bearer <JWT Token>
       │
       ▼
JWT Middleware verifies token
       │
       ▼
Access Granted

Only authenticated users can access the admin dashboard and protected API endpoints.

## Password Security

Administrator passwords are never stored in plain text.
Passwords are hashed using

PBKDF2
Unique Salt
Native Node.js Crypto module
During login the password is hashed again and compared with the stored hash.

## Data Model
**Users Table**
Field	        Type
id	           UUID
username	     VARCHAR
password	     Hashed Password
created_at	  Timestamp

## Leads Table
Field	          Type
id	             UUID
name	          VARCHAR
email	          VARCHAR
company	       VARCHAR
budget	       VARCHAR
project_type	 VARCHAR
message	       TEXT
status	       New / Contacted / Closed
created_at	    Timestamp

## System Architecture
                React + Vite
                     │
                     │ REST API
                     ▼
              Express.js Backend
                     │
          JWT Authentication Middleware
                     │
                     ▼
             Supabase PostgreSQL

            
## Project Structure
```text
leaddesk/
├── backend/                  # Node.js Express server
│   ├── src/
│   │   ├── config/           # Database & initialization configurations
│   │   ├── middleware/       # JWT auth protections
│   │   ├── controllers/      # Route handler logics (login and lead CRUDS)
│   │   ├── routes/           # Endpoint mappings
│   │   └── server.js         # Express app entrypoint
│   ├── .env                  # Secret configurations (ignored in git)
│   ├── schema.sql            # PostgreSQL database creation script
│   └── package.json          # Node dependencies & run scripts
├── frontend/                 # React + Vite client app
│   ├── src/
│   │   ├── components/       # Reusable layout and ui units
│   │   ├── pages/            # View routers (Landing, Login, Dashboard)
│   │   ├── App.jsx           # Routes and main loader
│   │   ├── index.css         # Styling, scrollbars, and gradients
│   │   └── main.jsx          # React app entry point
│   ├── index.html            # Core HTML document (title: leaddesk mini)
│   ├── tailwind.config.js    # Tailwind configuration
│   └── package.json          # Vite configurations & react dependencies
└── README.md                 # Top-level setup documentation
```

---

## Tech Stack

### Frontend
- **React 18** (Vite template for fast builds and hot-reloads)
- **Tailwind CSS v3** (Glassmorphic cards, deep colors, layout grids, animations)
- **React Router v6** (Client routing, Protected auth page guards)
- **Axios** (REST API integrations)

### Backend
- **Node.js** & **Express.js** (Server-side API routes, JWT issuance, rate & input validations)
- **Supabase PostgreSQL SDK** (Direct data synchronization using `@supabase/supabase-js`)
- **Native crypto** (PBKDF2 secure password hashing with unique 16-byte random salts)

### Database
- **Supabase** (PostgreSQL hosting)

---

## Installation & Setup

### 1. Prerequisites
- **Node.js** (v18.0.0 or higher is recommended)
- **NPM** (v9.0.0 or higher)

### 2. Install Project Dependencies
Run `npm install` in both the `backend/` and `frontend/` folders:

```bash
# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

---

## Environment Variables

### Backend Setup
Create a `.env` file inside the `backend/` folder. Use the following configuration:

```env
PORT=5000
SUPABASE_URL=https://your-supabase-project-id.supabase.co
SUPABASE_ANON_KEY=your-supabase-anon-key
ADMIN_USERNAME=admin
ADMIN_PASSWORD=LeadDeskAdmin2026!
JWT_SECRET=supersecretjwtkeychangeinproduction123!
```

> [!NOTE]
> If `SUPABASE_URL` and `SUPABASE_ANON_KEY` are left blank, the backend will automatically alert you on startup and fall back to an **in-memory database mode** with pre-seeded sample data. This allows full testing of the Landing Page, Login flow, and Dashboard immediately without database setups.

### Frontend Setup (Optional)
By default, the Vite dev server uses a proxy configured in `vite.config.js` to forward requests to the local backend on port 5000. 

For production environments, you can define a `.env` file inside the `frontend/` folder:
```env
VITE_API_URL=https://your-render-backend-url.onrender.com
```

---

## Running the Project Locally

### 1. Running the Backend Server
From the `backend/` folder:
```bash
npm start
```
The server will boot up on `http://localhost:5000`.

### 2. Running the Frontend client
From the `frontend/` folder:
```bash
npm run dev
```
Vite will launch the web application on `http://localhost:3000`.

---

## Deployment
**Frontend**
Vercel
**Backend**
Render
**Database**
Supabase

## Deployment Steps

### Frontend Deployment (Vercel)
1. Commit the workspace code and push to a GitHub repository.
2. Log in to [Vercel](https://vercel.com) and click **Add New Project**.
3. Import your GitHub repository.
4. Configure the settings:
   - **Root Directory**: `frontend`
   - **Framework Preset**: `Vite`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
5. Under **Environment Variables**, add:
   - `VITE_API_URL` = Your backend Render API URL (e.g. `https://leaddesk-api.onrender.com`)
6. Click **Deploy**.

### Backend Deployment (Render)
1. Log in to [Render](https://render.com) and create a **Web Service**.
2. Connect your GitHub repository.
3. Configure the settings:
   - **Root Directory**: `backend`
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
4. Under **Advanced** / **Environment Variables**, add all values from `backend/.env`:
   - `PORT` = `5000` or Render default
   - `SUPABASE_URL` = your Supabase URL
   - `SUPABASE_ANON_KEY` = your Supabase Anon Key
   - `ADMIN_USERNAME` = admin
   - `ADMIN_PASSWORD` = Your custom admin password
   - `JWT_SECRET` = A strong secret string
5. Click **Create Web Service**.

## Screenshots
Landing Page

<img width="1907" height="897" alt="Screenshot 2026-07-25 110251" src="https://github.com/user-attachments/assets/f3254f5e-c164-470c-a7c5-03813b2278ac" />


Lead Submission

<img width="1902" height="895" alt="Screenshot 2026-07-25 141544" src="https://github.com/user-attachments/assets/88a7f232-2323-43a5-8200-36d2a877f9b8" />

Admin Login

<img width="1907" height="902" alt="Screenshot 2026-07-25 110232" src="https://github.com/user-attachments/assets/73c543f0-8f6c-41bb-838e-8ad25c9a48b4" />

Dashboard

<img width="1912" height="892" alt="Screenshot 2026-07-25 110221" src="https://github.com/user-attachments/assets/6dc03751-92cc-4c97-bc78-27871747be80" />

Lead Status Update

<img width="1896" height="897" alt="Screenshot 2026-07-25 141745" src="https://github.com/user-attachments/assets/efcad8aa-108a-4d22-9cde-11eeedf5e538" />


## Future Improvements
Real-time dashboard updates using Supabase Realtime
Lead search and filtering
Pagination
Email notifications
Dark mode
Analytics Dashboard
Role-based access control
Export leads to CSV
Author

**Sanvitha Reddy**

GitHub:
https://github.com/Sanvitha-reddy1
