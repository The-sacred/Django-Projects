# Notes App

A full-stack notes application built with Django REST Framework on the backend and React + Vite on the frontend.

## Overview

This project includes:

- A Django API for user authentication and note management
- A React frontend for creating, viewing, and deleting notes
- JWT-based authentication using `djangorestframework-simplejwt`
- SQLite for local development

## Tech Stack

- Backend: Python, Django, Django REST Framework
- Frontend: React, Vite, Axios
- Authentication: JWT
- Database: SQLite

## Project Structure

```text
notes_app1/
├── backend/
│   ├── api/
│   ├── backend/
│   ├── db.sqlite3
│   ├── manage.py
│   └── requirements.txt
├── frontend/
│   ├── src/
│   ├── package.json
│   └── vite.config.js
├── .gitignore
├── .venv/
└── README.md
```

## Features

- User registration
- User login via JWT tokens
- Refresh token support
- Create notes
- View notes
- Delete notes

## Prerequisites

Before running the project, make sure you have the following installed:

- Python 3.10+
- Node.js 18+
- npm

## Backend Setup

From the project root:

```bash
cd backend
python -m venv .venv
# Windows
.venv\Scripts\activate
# macOS/Linux
# source .venv/bin/activate

pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
```

The backend API will run on:

```text
http://127.0.0.1:8000/
```

## Frontend Setup

Open a new terminal from the project root:

```bash
cd frontend
npm install
npm run dev
```

The frontend will run on:

```text
http://127.0.0.1:5173/
```

## API Endpoints

### Authentication

- `POST /api/user/register/` - register a new user
- `POST /api/token/` - get JWT access and refresh tokens
- `POST /api/token/refresh/` - refresh access token

### Notes

- `GET /api/notes/` - list notes
- `POST /api/notes/` - create a note
- `DELETE /api/notes/delete/<id>/` - delete a note

## Notes

- The note endpoints require authentication.
- The app currently uses the default SQLite database for local development.
- CORS is enabled for frontend communication during development.


