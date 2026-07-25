# leaddesk mini - Lead Management System

A production-ready Full Stack Lead Management System built for **leaddesk mini**, a premium AI and software agency. This project includes a high-converting, modern landing page, a secure client-side validated Lead/RFP form, an Express Node.js API, and a beautiful Admin console for processing received leads.

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

## Supabase Database Setup

Follow these steps to configure your PostgreSQL instance on Supabase:

1. Create a free account at [Supabase](https://supabase.com).
2. Create a new project named `leaddesk mini`.
3. Locate the **SQL Editor** in the left sidebar menu.
4. Copy the contents of `backend/schema.sql` and run the script in the SQL editor:
   ```sql
   CREATE TABLE IF NOT EXISTS leads (
       id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
       name VARCHAR(255) NOT NULL,
       email VARCHAR(255) NOT NULL,
       company VARCHAR(255),
       budget VARCHAR(100),
       project_type VARCHAR(100),
       message TEXT,
       status VARCHAR(50) DEFAULT 'New' CHECK (status IN ('New', 'Contacted', 'Closed')),
       created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
   );

   CREATE INDEX IF NOT EXISTS idx_leads_search ON leads(name, email, company);

   CREATE TABLE IF NOT EXISTS users (
       id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
       username VARCHAR(255) UNIQUE NOT NULL,
       password VARCHAR(255) NOT NULL,
       created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
   );
   ```
5. Navigate to **Project Settings** > **API** in the sidebar.
6. Retrieve your **Project URL** (`SUPABASE_URL`) and **Anon Public API Key** (`SUPABASE_ANON_KEY`).
7. Paste these values into your `backend/.env` file. Restart the backend server. The database initialization script will auto-seed the admin user.

---

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
