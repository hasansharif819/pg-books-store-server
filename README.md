# Books Store Server

A production-ready REST API boilerplate for book/author management systems using Express, Knex, PostgreSQL, and TypeScript.

## Features

- **CRUD Operations** for books and authors
- **PostgreSQL** database with Knex query builder
- **TypeScript** support with strict typing
- **Pagination**, filtering, and sorting
- **Validation** with Joi
- **Error handling** middleware
- **Environment configuration** with .env files

## Tech Stack

- **Backend**: Node.js, Express
- **Database**: PostgreSQL
- **ORM**: Knex.js
- **Language**: TypeScript
- **Validation**: Joi

## Getting Started

### Prerequisites

- Node.js (v16+ recommended)
- PostgreSQL (v12+ recommended)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/hasansharif819/pg-books-store-server.git
git remote remove origin
Install dependencies:

bash
npm install
# or
yarn install
Set up PostgreSQL databases (see below)

Configure environment variables:

bash
cp .env.example .env
# Edit the .env file with your credentials
Database Setup
macOS/Linux
bash
# Access PostgreSQL
psql postgres

# Create databases
CREATE DATABASE book_store_dev;
CREATE DATABASE book_store_test;

# Exit
\q
Windows (using pgAdmin)
Open pgAdmin and connect to your server

Right-click on Databases → Create → Database

Create both book_store_dev and book_store_test databases

Migrations
bash
# Run migrations
npx knex migrate:latest

bash
# Development
npm run dev

# Production
npm run build && npm start

# Run tests with coverage
Environment Variables
Create a .env file in the root directory with the following variables:

# Development
POSTGRES_DEV_HOST=localhost
POSTGRES_DEV_PORT=5432
POSTGRES_DEV_USER=postgres
POSTGRES_DEV_PASSWORD=your_password
POSTGRES_DEV_DATABASE=book_store_dev

# App
PORT=5000
JWT_SECRET=your_jwt_secret
API Documentation
Endpoints
Authors
GET /authors - List all authors

GET /authors/:id - Get author details

POST /authors - Create new author

PUT /authors/:id - Update author

DELETE /authors/:id - Delete author

Books
GET /books - List all books

GET /books/:id - Get book details

POST /books - Create new book

PUT /books/:id - Update book

DELETE /books/:id - Delete book

Project Structure
src/
├── app.ts            # Express application setup
├── server.ts         # Server initialization
├── config/           # Configuration files
├── controllers/      # Route controllers
├── interfaces/       # TypeScript interfaces
├── middlewares/      # Express middlewares
├── migrations/       # Database migrations
├── models/           # Database models
├── routes/           # Route definitions
├── services/         # Business logic
├── utils/            # Utility functions
└── validators/       # Validation schemas
Contributing

License
Distributed under the MIT License. See LICENSE for more information.


This README includes:

1. Clear project description and features
2. Technology stack
3. Detailed installation instructions
4. Database setup for different OS
5. Environment variables configuration
6. API endpoint documentation
7. Project structure overview
8. Contribution guidelines
9. License information

The formatting uses proper Markdown syntax with code blocks, lists, and section headers for excellent readability on GitHub. You can customize the database names, endpoints, and other details to match your specific implementation.
