# SmartStore AI

AI-powered e-commerce admin dashboard for store owners.

## Features

- Authentication with JWT and bcrypt
- Product management with CRUD APIs
- AI content generation powered by Gemini
- Revenue and inventory analytics endpoints
- Light-theme admin dashboard with charts and AI studio

## Stack

- Frontend: React + Vite + Tailwind + Chart.js
- Backend: Node.js + Express + MongoDB
- Auth: JWT + bcrypt
- AI: Gemini API (gemini-flash-latest)

## Project Structure

- backend
- frontend

## Environment Variables

Backend file: backend/.env

- PORT=5000
- MONGO_URI=your_mongodb_connection_string
- JWT_SECRET=your_jwt_secret
- NODE_ENV=development
- GEMINI_API_KEY=your_gemini_api_key
- GEMINI_MODEL=gemini-flash-latest

## Run Backend

1. cd backend
2. npm install
3. npm run dev

## Run Frontend

1. cd frontend
2. npm install
3. npm run dev

## Backend Tests

1. cd backend
2. npm test

## API Overview

Auth

- POST /api/auth/register
- POST /api/auth/login
- GET /api/auth/me

Products

- GET /api/products
- POST /api/products
- PUT /api/products/:id
- DELETE /api/products/:id

AI

- POST /api/ai/description
- POST /api/ai/tags
- POST /api/ai/caption
- POST /api/ai/suggestions

Analytics

- GET /api/analytics/revenue
- GET /api/analytics/top-products
- GET /api/analytics/inventory
