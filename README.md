# MERN-Ecommerce-App README 🛒

Welcome to the MERN E-commerce Application README! This document provides an overview of the features and technologies used in this application, along with instructions for setting up and running the project.

## Live Link 🚀 
You can check out a live demo of the E-commerce application at the following link: [Live Demo](https://uncommon.cyclic.app/)

![image](https://github.com/HARDIK-SHARMA-08/MERN-Ecommerce-App/assets/72403424/d62a6c58-fa38-44ff-a33a-efddc39ebc73) 

## Table of Contents 📚

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [Project Structure](#project-structure)

## Features 🌟

Our E-commerce application is designed to provide a seamless online shopping experience for both customers and administrators. The following features are implemented:

1. **User Authentication**:
   - User registration and login functionality.
   - Secure user authentication using JSON Web Tokens (JWT).

2. **Payment Integration**:
   - Braintree PayPal payment gateway integration for a convenient checkout process.

3. **Product Management**:
   - Add products to the cart.
   - View and manage the cart.
   - Filter products by category and price range.
   - Search through products
   
4. **Admin Dashboard**:
   - Separate admin and user dashboards.
   - Only Admins can perform CRUD (Create, Read, Update, Delete) operations for categories and products.
   
## Technologies Used 💻

The E-commerce application is built using a combination of technologies:

- **MongoDB**: A NoSQL database for storing product and user data.
- **Node.js**: A runtime environment for server-side JavaScript.
- **React.js**: A JavaScript library for building user interfaces.
- **Tailwind CSS**: A utility-first CSS framework for styling.
- **Context API**: For state management in the React application.

## Installation 🛠️

Follow these steps to set up the E-commerce application:

1. Clone the repository:
   ```bash
   git clone https://github.com/HARDIK-SHAMRA-08/MERN-Ecommerce-App.git
   cd MERN-Ecommerce-App
   ```

2. Install server dependencies:
   ```bash
   npm install
   ```

3. Install client dependencies:
   ```bash
   cd ../client
   npm install
   ```

4. Create a `.env` file in the server directory and add the following environment variables:
   - `MONGODB_URI`: Your MongoDB database connection string.
   - `JWT_SECRET`: Your JWT secret key.
   - `BRAINTREE_MERCHANT_ID`: Your PayPal Braintree API Merchant ID.
   - `BRAINTREE_PUBLIC_KEY` : Your PayPal Braintree API Public Key.
   - `BRAINTREE_PRIVATE_KEY` : Your PayPal Braintree API Private Key

5. Start the server and client applications:
   - Server:
     ```bash
     npm start
     ```
   - Client:
     ```bash
     cd ../client
     npm start
     ```

The application should now be accessible in your web browser at `http://localhost:3000`.

## Usage 🚀

1. Visit the application in your browser.
2. Register as a user or log in if you already have an account.
3. Browse and search for products, add them to your cart.
4. Use the PayPal Braintree integration to complete your purchase.
5. If you are an admin, log in to the admin dashboard to manage categories and products.

## Project Structure 📂

The project is organized into two main directories:

- **client**: Contains the React.js frontend application.
- **server**: Contains the Node.js backend application and API.

The `server` directory is further divided into subdirectories for routes, controllers, models, and middleware to keep the codebase clean and organized. 🧹
