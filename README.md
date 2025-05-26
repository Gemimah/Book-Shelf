# Chapter Verse - Library Management System

A modern library management system built with React, TypeScript, and Node.js. This application helps libraries manage their book collection, track borrowing activities, and provide a seamless experience for both administrators and users.

## Features

### For Users

- Browse available books
- Borrow and return books
- Track reading progress
- View borrowing history
- Manage personal profile

### For Administrators

- Comprehensive dashboard with statistics
- Book management (add, edit, delete)
- User management
- Track borrowed books and overdue items
- View user activity and engagement metrics

## Tech Stack

### Frontend

- **Core**

  - React 18
  - TypeScript 5.0
  - Vite 4.0
  - React Router 6.8
  - React Query 4.0

- **Styling & UI**

  - Tailwind CSS 3.0
  - Shadcn UI Components
  - Lucide Icons
  - CSS Modules

- **State Management**

  - React Query (Server State)
  - React Context (Client State)
  - Custom Hooks

- **Development Tools**
  - ESLint
  - Prettier
  - TypeScript
  - Vite Dev Server

### Backend

- **Core**

  - Node.js 18
  - Express.js
  - TypeScript
  - npm

- **Security**

  - JWT Authentication
  - bcrypt Password Hashing
  - CORS
  - Helmet

- **Database**

  - PostgreSQL
  - Sequelize ORM
  - pg (PostgreSQL client)

- **Development Tools**
  - Nodemon
  - Jest
  - Supertest
  - ESLint

## Local Development Setup

### Prerequisites

1. **Node.js & npm**

   ```bash
   # Check Node.js version
   node --version  # Should be v16 or higher

   # Check npm version
   npm --version   # Should be v8 or higher
   ```

2. **PostgreSQL**

   ```bash
   # Check PostgreSQL version
   psql --version  # Should be PostgreSQL 12 or higher
   ```

### Step-by-Step Setup

1. **Clone the Repository**

   ```bash
   git clone https://github.com/yourusername/chapter-verse.git
   cd chapter-verse
   ```

2. **Database Setup**

   ```bash
   # Login to PostgreSQL
   psql -U postgres

   # Create database
   CREATE DATABASE book_management;

   # Create user and grant privileges
   CREATE USER book_management_user WITH PASSWORD 'your_password';
   GRANT ALL PRIVILEGES ON DATABASE book_management TO book_management_user;
   ```

3. **Backend Setup**

   ```bash
   cd backend

   # Install dependencies
   npm install

   # Create environment file
   cp .env.example .env

   # Update .env with your configuration
   DATABASE_URL=postgres://book_management_user:your_password@localhost:5432/book_management
   JWT_SECRET=your_jwt_secret
   PORT=3000

   # Start development server
   npm run dev
   ```

4. **Frontend Setup**

   ```bash
   cd chapter-verse-interface

   # Install dependencies
   npm install

   # Create environment file
   cp .env.example .env

   # Update .env with your configuration
   VITE_API_URL=http://localhost:3000/api

   # Start development server
   npm run dev
   ```

5. **Verify Installation**
   - Backend: Try accessing `http://localhost:3000/api/books` to verify the API is running
   - Frontend: http://localhost:8080

### Default Credentials

1. **Admin User**

   ```
   Email: admin@example.com
   Password: admin123
   ```

2. **Regular User**
   ```
   Email: user@example.com
   Password: user123
   ```

### Common Issues & Solutions

1. **Port Conflicts**

   - If port 3000 is in use, update backend `.env`:
     ```
     PORT=3001
     ```
   - Update frontend `.env` accordingly:
     ```
     VITE_API_URL=http://localhost:3001/api
     ```

2. **Database Connection**

   - Ensure PostgreSQL service is running
   - Verify PostgreSQL connection string in `.env`
   - Check PostgreSQL user permissions
   - Make sure the database exists and is accessible

3. **Frontend Build Issues**

   ```bash
   # Clear npm cache
   npm cache clean --force

   # Remove node_modules
   rm -rf node_modules

   # Reinstall dependencies
   npm install
   ```

4. **Backend Build Issues**

   ```bash
   # Clear npm cache
   npm cache clean --force

   # Remove node_modules
   rm -rf node_modules

   # Reinstall dependencies
   npm install
   ```

### Development Workflow

1. **Starting Development**

   ```bash
   # Terminal 1 - Backend
   cd book-management-backend
   npm run dev

   # Terminal 2 - Frontend
   cd chapter-verse-interface
   npm run dev
   ```

2. **Running Tests**

   ```bash
   # Backend tests
   cd book-management-backend
   npm test

   # Frontend tests
   cd chapter-verse-interface
   npm test
   ```

3. **Building for Production**

   ```bash
   # Backend
   cd book-management-backend
   npm run build

   # Frontend
   cd chapter-verse-interface
   npm run build
   ```

## Implementation Details

### State Management Strategy

- **Server State**: Managed by React Query

  - Automatic caching of API responses
  - Background data synchronization
  - Optimistic updates for better UX
  - Automatic retry on failure
  - Prefetching for faster page loads

- **Client State**: Managed by React Context
  - Authentication state
  - Theme preferences
  - User preferences
  - UI state (modals, sidebars, etc.)

### Data Flow

1. API calls are centralized in the `services/api.ts` file
2. React Query hooks in `hooks/` directory handle data fetching
3. Components consume data through custom hooks
4. Global state is managed through context providers

### Mock API Implementation

The application includes a mock API implementation for development:

- Simulated network delays
- Random success/failure rates
- Persistent data in localStorage
- Realistic error responses

### Design Decisions

1. **Authentication**

   - JWT-based authentication
   - Token stored in localStorage
   - Automatic token refresh
   - Protected routes with role-based access

2. **UI/UX**

   - Responsive design with Tailwind CSS
   - Dark/Light theme support
   - Loading states and error boundaries
   - Optimistic updates for better UX

3. **Performance**

   - Code splitting with React.lazy
   - Memoization of expensive computations
   - Efficient re-rendering with React.memo
   - Image optimization and lazy loading

4. **Security**
   - CORS configuration
   - XSS protection
   - CSRF tokens
   - Input validation
   - Rate limiting

## API Documentation

### Authentication Endpoints

- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration
- `GET /api/auth/me` - Get current user
- `POST /api/auth/logout` - User logout

### Book Endpoints

- `GET /api/books` - Get all books
- `GET /api/books/{id}` - Get book by ID
- `POST /api/books` - Add new book
- `PUT /api/books/{id}` - Update book
- `DELETE /api/books/{id}` - Delete book
- `POST /api/books/{id}/borrow` - Borrow book
- `POST /api/books/{id}/return` - Return book

### Admin Endpoints

- `GET /api/admin/stats` - Get library statistics
- `GET /api/admin/users` - Get all users
- `PUT /api/admin/users/{id}/role` - Update user role

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [Shadcn UI](https://ui.shadcn.com/) for the beautiful UI components
- [React Query](https://tanstack.com/query/latest) for data fetching
- [Node.js](https://nodejs.org/) for the backend framework
