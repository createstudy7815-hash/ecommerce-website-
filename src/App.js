import { Routes, Route, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import "./App.css";

import Signup from "./Signup";
import Login from "./Login";
import Products from "./products";
import ProductDetails from "./ProductDetails";
import AddProduct from "./AddProduct";
import Cart from "./Cart";
import OrderSuccess from "./OrderSuccess";
import OrderHistory from "./OrderHistory";

export default function App() {
  const [user, setUser] = useState(null);

 
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setUser(jwtDecode(token));
    }
  }, []);

  const isAdmin = user?.isAdmin;

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    window.location.href = "/login";
  };

  return (
    <>
      <nav className="navbar">
        <div className="nav-left">
          <Link to="/products">Products</Link>

          {!user && (
            <>
              <Link to="/signup">Signup</Link>
              <Link to="/login">Login</Link>
            </>
          )}

          {user && (
            <>
              <Link to="/cart">Cart</Link>
              <Link to="/orders">Orders</Link>
            </>
          )}

          {isAdmin && <Link to="/add-product">Add Product</Link>}
        </div>

        <div className="nav-right">
          {user && <button onClick={logout}>Logout</button>}
        </div>
      </nav>

     
      <Routes>
        <Route path="/" element={<Products />} />
        <Route path="/products" element={<Products />} />

        {/* PRODUCT DETAILS */}
        <Route path="/product/:id" element={<ProductDetails />} />

        <Route path="/login" element={<Login setUser={setUser} />} />
        <Route path="/signup" element={<Signup setUser={setUser} />} />

        <Route path="/cart" element={<Cart />} />
        <Route path="/orders" element={<OrderHistory />} />
        <Route path="/order-success" element={<OrderSuccess />} />

 
        <Route
          path="/add-product"
          element={isAdmin ? <AddProduct /> : <h2>Access Denied</h2>}
        />
      </Routes>
    </>
  );
}