# 💒 Wedease – Your Ultimate Wedding Service Booking Platform

## 📝 Description

> 🚧 This project is currently under construction. Expect frequent updates, new features, and design improvements.

**Wedease** is a full-featured platform that helps users find, filter, and book trusted wedding service providers with ease. Whether you need a venue, photographer, decorator, or even a mehendi artist, Wedease connects customers with verified professionals across top cities in India.

This project demonstrates a scalable service-based architecture with search, filtering, pagination, and admin service control.

---

## 📚 Table of Contents

* [Features](#-features)
* [Tech Stack](#-tech-stack)
* [Installation](#-installation)
* [Usage](#-usage)
* [Screenshots](#-screenshots)
* [Credits](#-credits)

---

## 🌟 Features

* 🔍 Server Side filtering (by tag, location, and search query)
* 📃 Paginated service listing
* 📷 Upload images using Cloudinary
* 👨‍💼 Admin panel to manage services
* * 🗓️ Tools to plan weddings and events *(coming soon)*
* 💬 User reviews & ratings *(coming soon)*
* 📩 Email + real-time notifications *(planned)*

---

## 🧰 Tech Stack

* **Frontend**: React, TailwindCSS, Zustand, React Router
* **Backend**: Node.js, Express.js, MongoDB, Mongoose
* **Cloud**: Cloudinary (for image uploads)
* **Others**: Multer, JWT Auth, dotenv, Axios

---

## 🛠️ Installation

Clone the repository and install dependencies for both client and server:

```bash
git clone https://github.com/harshrathore2303/WeddingEase.git
cd WeddingEase

# Install server dependencies
cd server
npm install

# Install client dependencies
cd ../client
npm install
```

Create `.env` files in both `server` and `client` directories with the following environment variables:

### Server `.env`

```
PORT=5000
MONGODB_URI=your_mongodb_connection_string
CLOUDINARY_CLOUD_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
JWT_SECRET=your_jwt_secret
```

---

## ▶️ Usage

Start both backend and frontend:

```bash
# Start backend
cd server
npm run dev

# Start frontend
cd ../client
npm run dev
```

Then open [http://localhost:5173](http://localhost:5173) in your browser.

---

## 📸 Screenshots

### User Pages

![Home](https://github.com/user-attachments/assets/0ef07c7d-ca9b-48c7-a0b2-171f734b229e)
![Organize with Professionals](https://github.com/user-attachments/assets/132e72e5-0efb-42e8-9208-b42c3b0796aa)
![Planning Tools](https://github.com/user-attachments/assets/05468746-26c0-42df-bb0c-c01f78a5bfcb)


### Admin Dashboard

![Manage Your Services as an Admin](https://github.com/user-attachments/assets/876ddd99-764d-47c0-95a2-f5e4279564bd)

---

## 🙌 Credits

* Built with 💖 by [Harshit Singh Rathore](https://github.com/harshrathore2303)
* Image storage powered by [Cloudinary](https://cloudinary.com/)
