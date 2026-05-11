import { BrowserRouter, Routes, Route, Link, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

import Signup from "./Signup";
import Login from "./Login";
import Products from "./products";
import AddProduct from "./AddProduct";
import Cart from "./Cart";
import OrderSuccess from "./OrderSuccess";

function App() {
  const token = localStorage.getItem("token");
  const isAdmin = token ? jwtDecode(token).isAdmin : false;
  const isLoggedIn = !!token;

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("cart");
    window.location.href = "/login";
  };

  return (
    <BrowserRouter>
      <nav>
        <Link to="/">Home</Link> |{" "}
        <Link to="/products">Products</Link> |{" "}
        <Link to="/cart">Cart</Link>

    
        {!isLoggedIn && (
          <>
            {" | "}
            <Link to="/login">Login</Link> |{" "}
            <Link to="/signup">Signup</Link>
          </>
        )}

        {isAdmin && (
          <>
            {" | "}
            <Link to="/add-product">Add Product</Link>
          </>
        )}

       
        {isLoggedIn && (
          <>
            {" | "}
            <button onClick={logout}>Logout</button>
          </>
        )}
      </nav>

      <Routes>
        <Route path="/" element={<h1>Home</h1>} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/products" element={<Products />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/order-success" element={<OrderSuccess />} />

   
        {isAdmin && (
          <Route path="/add-product" element={<AddProduct />} />
        )}
      </Routes>
    </BrowserRouter>
  );
}

export default App;