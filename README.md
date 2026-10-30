# Rojgar Sansar - Job Portal Website

**Rojgar Sansar** is an innovative online job portal that connects job seekers and employers. The platform provides an easy-to-use interface for job seekers to find employment opportunities and for employers to post job openings.

## Features

### For Job Seekers:
- **Create Profile:** Job seekers can register, create their profiles, and upload their resumes.
- **Search Jobs:** Search jobs by location, industry, job type, and experience level.
- **Apply for Jobs:** Apply directly for jobs posted by employers.
- **Job Alerts:** Set up notifications for new job listings that match the user's profile.
- **Dashboard:** View and manage job applications, saved jobs, and personal details.
  
### For Employers:
- **Create Employer Profile:** Employers can create company profiles to showcase their business.
- **Post Jobs:** Employers can post job openings with detailed descriptions and requirements.
- **Manage Applications:** View and manage applications from job seekers.
- **Search Resumes:** Search job seekers' profiles to find the right talent for the company.
  
### Admin Features:
- **User Management:** Admins can view and manage both job seekers and employer accounts.
- **Job Postings Management:** Admins can review, approve, or remove job postings.
- **Analytics Dashboard:** View system-wide analytics such as number of jobs posted, user activity, etc.

## Technologies Used

- **Frontend:**
  - HTML
  - CSS (ChakraUi)
  - JavaScript (React.js)
  
- **Backend:**
  - Node.js with Express.js 
  
- **Database:**
  - PostgreSQL
  
- **Authentication:**
  - JWT (JSON Web Tokens) for secure user authentication.
  
- **File Storage:**
  - Imagekits for storing user-uploaded files such as resumes and company logos.
  
- **Version Control:**
  - Git and GitHub for source control and collaboration.
  
  
## Installation

To run **Rojgar Sansar** locally on your machine, follow these steps:

### Prerequisites

- **Node.js** (version 14 or higher)
- **Postgres** (or another database of your choice)
- **Git** (for version control)

### Steps to Set Up Locally

#### 1. Clone the Repository

Clone the GitHub repository to your local machine:

```bash
git clone https://github.com/your-username/rojgar-sansar.git
```

#### 2. Set Up the Backend

```bash
cd backend
cp .env.example .env      # then fill in DATABASE_URL, JWT_SECRET_KEY, ImageKit and SMTP values
yarn install              # also runs `prisma generate`
yarn prisma:deploy        # apply database migrations
yarn dev                  # starts the API on http://localhost:5000
```

Other scripts: `yarn build` / `yarn start` (production), `yarn typecheck`.

#### 3. Set Up the Frontend

```bash
cd frontend
yarn install
yarn dev                  # http://localhost:5173
```

## Backend Structure

```
backend/
├── prisma/                 # schema.prisma + migrations
└── src/
    ├── server.ts           # starts the HTTP server, graceful shutdown
    ├── app.ts              # express app: security middleware, routes, error handling
    ├── config/env.ts       # validated environment variables (fails fast if missing)
    ├── lib/                # prisma client, file storage (ImageKit), mailer
    ├── middleware/         # auth, validation (zod), uploads, rate limiting, errors
    ├── utils/              # AppError, pagination, ownership checks, tokens, shared schemas
    ├── templates/          # email templates
    ├── routes/index.ts     # mounts every module under /api/v1
    └── modules/            # one folder per feature
        ├── auth/           #   *.routes.ts      URL → middleware → controller
        ├── user/           #   *.controller.ts  HTTP in/out only
        ├── company/        #   *.service.ts     business logic + database access
        ├── category/       #   *.schema.ts      zod request validation
        ├── job/
        └── application/
```
