import { useState } from "react";
import axios from "./api/axios";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

export default function Signup({ setUser }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/auth/signup", { name, email, password });

      localStorage.setItem("token", res.data.token);
      setUser(jwtDecode(res.data.token)); // ✅

      navigate("/products");
    } catch {
      alert("Signup failed");
    }
  };

  return (
    <form onSubmit={submitHandler}>
      <h2>Signup</h2>
      <input value={name} onChange={e => setName(e.target.value)} />
      <input value={email} onChange={e => setEmail(e.target.value)} />
      <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
      <button>Signup</button>
    </form>
  );
}