# SweetCreations - Premium Bakery E-Commerce Website

A beautiful, fully-featured e-commerce website for a boutique cake and bakery business, built with Next.js (App Router), Tailwind CSS, Express.js, and MongoDB.

## Project Structure

```
├── frontend/          # Next.js App Router frontend
│   ├── app/           # Pages and API routes
│   ├── components/    # React components
│   ├── hooks/         # Custom React hooks
│   └── lib/           # Utilities and context
│
├── backend/           # Express.js + MongoDB backend
│   ├── config/        # Database configuration
│   ├── models/        # Mongoose schemas
│   ├── routes/        # API route handlers
│   └── server.js      # Express server entry point
```

## Features

### Frontend
- Stunning hero section with stats and CTAs
- Featured products carousel
- Category browsing (Wedding, Birthday, Cupcakes, Custom)
- Product catalog with filtering and search
- Product detail page with size/flavor/date selectors
- Interactive shopping cart (localStorage persistence)
- Checkout flow with form validation
- Testimonials section
- Contact/inquiry form for custom orders
- Fully responsive design (mobile, tablet, desktop)
- Premium warm color palette (cream, chocolate, pastel pink)

### Backend
- RESTful API endpoints
- MongoDB database with Mongoose ODM
- CORS enabled for secure cross-origin requests
- Product, Order, and Inquiry models
- Full CRUD operations

## Prerequisites

- Node.js 18+
- MongoDB (local or Atlas)
- npm or yarn

## Installation

### 1. Clone the repository

```bash
git clone <repository-url>
cd sweetcreations
```

### 2. Setup Backend

```bash
cd backend

# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Edit .env with your MongoDB URI
# MONGO_URI=mongodb://localhost:27017/sweetcreations
# PORT=5000

# Seed the database with sample products
npm run seed

# Start the development server
npm run dev
```

The backend will run on `http://localhost:5000`

### 3. Setup Frontend

Open a new terminal:

```bash
cd frontend

# Install dependencies
npm install

# Create .env file
cp .env.example .env

# The .env should contain:
# NEXT_PUBLIC_API_URL=http://localhost:5000

# Start the development server
npm run dev
```

The frontend will run on `http://localhost:3000`

## API Endpoints

### Products
- `GET /api/products` - Get all products (supports filtering: category, search, minPrice, maxPrice)
- `GET /api/products/:id` - Get single product
- `POST /api/products` - Create product (admin)

### Orders
- `GET /api/orders` - Get all orders (admin)
- `POST /api/orders` - Create new order
- `PUT /api/orders/:id/status` - Update order status (admin)

### Inquiries
- `GET /api/inquiries` - Get all inquiries (admin)
- `POST /api/inquiries` - Submit new inquiry
- `PUT /api/inquiries/:id/status` - Update inquiry status (admin)

## Environment Variables

### Backend (.env)
```
PORT=5000
MONGO_URI=mongodb://localhost:27017/sweetcreations
NODE_ENV=development
FRONTEND_URL=http://localhost:3000
```

### Frontend (.env)
```
NEXT_PUBLIC_API_URL=http://localhost:5000
```

## Tech Stack

**Frontend:**
- Next.js 13 (App Router)
- Tailwind CSS
- Lucide React Icons
- Radix UI components
- TypeScript

**Backend:**
- Express.js
- MongoDB
- Mongoose
- CORS
- dotenv

## Deployment

### Frontend (Vercel/Netlify)
1. Set `NEXT_PUBLIC_API_URL` to your deployed backend URL
2. Deploy the `frontend` folder

### Backend (Railway/Render/AWS)
1. Set environment variables in your hosting platform
2. Deploy the `backend` folder
3. Ensure MongoDB is accessible (use MongoDB Atlas for cloud database)

## License

MIT
