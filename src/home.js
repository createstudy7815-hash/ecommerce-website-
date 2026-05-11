import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Products from "./products";
function Home() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [token, navigate]);

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>Welcome to Home Page</h2>
      <button onClick={logout}>Logout</button>
    </div>
  );
}

export default Home;