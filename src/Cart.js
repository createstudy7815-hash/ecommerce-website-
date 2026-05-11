import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Cart() {
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(stored);
  }, []);

  const removeItem = (id) => {
    const updated = cart.filter((item) => item._id !== id);
    setCart(updated);
    localStorage.setItem("cart", JSON.stringify(updated));
  };

  const total = cart.reduce(
    (sum, item) => sum + Number(item.price) * Number(item.qty || 1),
    0
  );

  const buyNow = () => {
    if (cart.length === 0) return;

    console.log("TOTAL BEFORE SAVE:", total); 

    localStorage.setItem("orderTotal", total);

    localStorage.removeItem("cart");


    navigate("/order-success");
  };

  return (
    <div>
      <h2>Your Cart</h2>

      {cart.length === 0 && <p>🛒 Cart is empty</p>}

      {cart.map((item) => (
        <div key={item._id} style={{ border: "1px solid #ccc", margin: 10, padding: 10 }}>
          <img src={item.image} alt="" width="100" />
          <h3>{item.name}</h3>
          <p>₹{item.price}</p>
          <button onClick={() => removeItem(item._id)}>Remove</button>
        </div>
      ))}

      <h3>Total: ₹{total}</h3>

      <button
        onClick={buyNow}
        disabled={cart.length === 0}
        style={{
          background: cart.length === 0 ? "gray" : "green",
          color: "white",
          padding: "10px 20px",
        }}
      >
        Buy Now
      </button>
    </div>
  );
}