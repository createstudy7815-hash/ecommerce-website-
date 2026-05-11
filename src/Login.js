import { useState } from "react";
import axios from "./api/axios";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

export default function Login({ setUser }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/auth/login", { email, password });

      localStorage.setItem("token", res.data.token);
      setUser(jwtDecode(res.data.token)); // ✅ KEY FIX

      navigate("/products");
    } catch {
      alert("Login failed");
    }
  };

  return (
    <form onSubmit={submitHandler}>
      <h2>Login</h2>
      <input value={email} onChange={e => setEmail(e.target.value)} />
      <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
      <button>Login</button>
    </form>
  );
}