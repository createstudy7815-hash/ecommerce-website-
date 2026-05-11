import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

export default function OrderSuccess() {
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const user = token ? jwtDecode(token) : null;

  const total = Number(localStorage.getItem("orderTotal")) || 0;

  return (
    <div className="order-success">
      <div className="order-card">
        <h1>✅ Order Placed Successfully</h1>

        {user && (
          <p>
            Thank you, <b>{user.name || user.email}</b>
          </p>
        )}

        <h2>Total Paid: ₹{total}</h2>

        <button
          onClick={() => {
            localStorage.removeItem("orderTotal");
            navigate("/products");
          }}
        >
          Continue Shopping
        </button>
      </div>
    </div>
  );
}