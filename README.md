# 🚀 Full-Stack Setup for Any web Application

A boilerplate setup for starting any modern web application, including a React-based frontend and an Express.js backend. This setup integrates essential tools and libraries for efficient development and scalability.

---

## 📂 Project Structure

The repository contains two main directories:

- **Frontend**: Built with React, Tailwind CSS, and Vite for fast development and a responsive UI.
- **Backend**: Powered by Express.js, MongoDB, and essential middleware for secure and scalable APIs.

---

## 🛠 Features

### Frontend

- **React** for building interactive UIs.
- **React Router** for dynamic navigation.
- **Firebase** for authentication and hosting.
- **Axios** for API calls.
- **React Hook Form** for form handling.
- **Tailwind CSS** for a responsive design.
- **React Query** for server-state management.

### Backend

- **Express.js** for creating APIs.
- **MongoDB** for database management.
- **JWT** for secure authentication.
- **CORS** and **cookie-parser** for handling cross-origin and cookie-based requests.

---

## 🔗 Repository Links

- **Frontend Repository**: This repository serves as the main full-stack setup and includes the frontend setup.
- **Backend Repository**: [_Backend Repo_](https://github.com/tariqul420/Full-Stack_Server_Setup.git)

---

## 🚀 Getting Started

### Prerequisites

- Node.js installed on your system.
- MongoDB setup for database functionality.

---

- **Node.js** and **npm** installed
- **MongoDB** connection string

---

### Client Side Setup

1. Clone the client-side repository:

   ```bash
   git clone https://github.com/tariqul420/Full-Stack_Setup.git
   cd Full-Stack_Setup
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```
4. Open the project in a code editor:
   ```bash
   code .
   ```
5. Add the `.env` file in the root directory and include the following environment variables:
   ```bash
   VITE_API_KEY=YOUR_VITE_API_KEY
   VITE_AUTH_DOMAIN=YOUR_VITE_AUTH_DOMAIN
   VITE_PROJECT_ID=YOUR_VITE_PROJECT_ID
   VITE_STORAGE_BUCKET=YOUR_VITE_STORAGE_BUCKET
   VITE_MESSAGE_SENDER_ID=YOUR_VITE_MESSAGE_SENDER_ID
   VITE_APP_ID=YOUR_VITE_APP_ID
   VITE_MEASUREMENT_ID=YOUR_VITE_MEASUREMENT_ID
   VITE_IMGBB_API_KEY=VITE_IMGBB_API_KEY
   VITE_API_URL=YOUR_VITE_API_URL
   ```
   > **Note:** Replace the `VITE_API_KEY` and `VITE_AUTH_DOMAIN`, along with other placeholders, with actual values.

### Server Side Setup

1. Clone the client-side repository:

   ```bash
   git clone https://github.com/tariqul420/Full-Stack_Server_Setup.git
   cd Service-Orbit-Server
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the server:

   ```bash
   node index.js
   ```

   --- OR ---

   > **Note** Note: Ensure `nodemon` is installed globally or locally in your project. To install it globally, run:

   ```bash
   nodemon index.js
   ```

4. Open the project in a code editor:
   ```bash
   code .
   ```
5. Add the `.env` file in the root directory and include the following environment variables:
   ```bash
   DATABASE_USERNAME=YOUR_DATABASE_USERNAME
   DATABASE_PASSWORD=YOUR_DATABASE_PASSWORD
   ACCESS_TOKEN_SECRET=YOUR_ACCESS_TOKEN_SECRET
   NODEMAILER_USER=YOUR_NODEMAILER_USER
   NODEMAILER_PASS=YOUR_NODEMAILER_USER
   ```
   > **Note:** Replace the `index.js` file's `your_mongo_connection_string` and the `.env` file's `YOUR_DATABASE_USERNAME`, `YOUR_DATABASE_PASSWORD`, and `YOUR_ACCESS_TOKEN_SECRET` with actual values.
