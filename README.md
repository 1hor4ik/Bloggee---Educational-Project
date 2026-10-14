# Bloggee-Test-App

## 📌 About

A full-stack blog application with a separate client and server. Users can write, edit, and delete posts, upload images, and receive notifications.

## 🛠 Tech Stack

**Frontend**

- React + Redux Toolkit (`@reduxjs/toolkit`, `react-redux`)
- Redux Persist, Redux Thunk, Redux Logger
- Chakra UI (`@chakra-ui/react`) for styling
- `react-simplemde-editor` + `react-markdown` for post editing/rendering
- `react-toastify` for notifications
- `react-icons`, `react-simple-typewriter`, `react-scroll-to-top`
- `date-fns` for date formatting
- `js-cookie` for cookie handling

**Backend**

- Node.js + Express
- MongoDB with Mongoose
- Socket.IO for real-time features
- Cloudinary + Multer for image uploads
- Nodemailer for email sending

**Security**

- `helmet`
- `express-rate-limit`
- `express-mongo-sanitize`
- `express-xss-sanitizer`
- `xss-clean`
- `hpp`
- `express-validator`

## ✨ Features

- User authentication and authorization
- Create, edit, and delete blog posts
- Rich text / Markdown post editor
- Image uploads via Cloudinary
- Real-time updates with Socket.IO
- Email notifications (Nodemailer)
- Input validation and sanitization
- Rate limiting and security headers
