# Roots

Roots is a storytelling platform where immigrants can share personal stories about identity, migration, belonging, and growth.

The goal is to create a calm space where people can share experiences anonymously or publicly so others feel seen and less alone.

## Tech Stack

Frontend
- Next.js
- React
- Tailwind CSS

Backend
- Spring Boot

Database
- PostgreSQL

Infrastructure
- Docker

## Features

- Share stories anonymously or publicly
- Browse stories from other immigrants
- Category-based storytelling
- Clean and warm user interface

## Project Structure
roots
├ backend # Spring Boot API
├ frontend # Next.js frontend
├ docker-compose.yml


## Running Locally

Start the database:

docker compose up -d

Run backend:

cd backend
./mvnw spring-boot:run

Run frontend:

cd frontend
npm install
npm run dev

Open:

http://localhost:3000
