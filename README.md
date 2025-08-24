# Hedaya Backend API

A secure, modular Express.js application with authentication, file uploads, and email capabilities.

## Features

- 🔐 JWT Authentication
- 📧 Email service for password reset
- 🖼️ Image upload with Cloudinary
- 🗄️ MongoDB database
- 📝 Input validation with Joi
- 🛡️ Security with Helmet
- 📊 Logging with Morgan

## API Endpoints

- `/api/auth` - Authentication routes
- `/api/users` - User management
- `/api/categories` - Category management
- `/api/subcategories` - Subcategory management
- `/api/products` - Product management
- `/api/password` - Password reset functionality
- `/api/health` - Health check

## Local Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Start production server
npm start
```

## Security Features

- JWT token authentication
- Password hashing with bcrypt
- Input validation and sanitization
- CORS protection
- Helmet security headers
- Rate limiting (can be added)

## Support

For issues or questions, please check the codebase or create an issue in the repository.
