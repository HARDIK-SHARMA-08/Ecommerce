import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/HomePage";
import About from "./pages/AboutPage";
import PageNotFound from "./pages/PageNotFound";
import ContactPage from "./pages/ContactPage";
import Policy from "./pages/Policy";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import UserDashboard from "./pages/user/UserDashboard";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import UserPrivateRoute from "./components/Routes/UserPrivate";
import AdminPrivateRoute from "./components/Routes/AdminPrivate";
import CreateCategogy from "./pages/Admin/CreateCategogy";
import CreateProduct from "./pages/Admin/CreateProduct";
import Order from "./pages/user/Order";
import Profile from "./pages/user/Profile";
import Products from "./pages/Admin/Products";
import Cart from "./pages/CartPage";
import AdminOrder from "./pages/Admin/AdminOrder";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/policy" element={<Policy />} />
        <Route path="/cart" element={<Cart />} />


        {/* Protected User Route */}
        <Route path="/dashboard" element={<UserPrivateRoute />}>
          <Route path="user" element={<UserDashboard />} />
          <Route path="user/orders" element={<Order />} />
          <Route path="user/profile" element={<Profile />} />
        </Route>
        
        {/* Protected Admin Route */}
        <Route path="/dashboard" element={<AdminPrivateRoute />}>
          <Route path="admin" element={<AdminDashboard />} />
          <Route path="admin/create-category" element={<CreateCategogy />} />
          <Route path="admin/create-product" element={<CreateProduct />} />
          <Route path="admin/all-orders" element={<AdminOrder />} />
          <Route path="admin/products" element={<Products />} />
        </Route>

        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </>
  );
}

export default App;
