import { useEffect, useState } from "react";

export default function OrderHistory() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("orders")) || [];
    setOrders(stored);
  }, []);

  return (
    <div>
      <h2>📦 Order History</h2>

      {orders.length === 0 && <p>No orders yet</p>}

      {orders.map((order) => (
        <div
          key={order.id}
          style={{ border: "1px solid #ccc", margin: 10, padding: 10 }}
        >
          <p><b>Date:</b> {order.date}</p>
          <p><b>Total:</b> ₹{order.total}</p>

          {order.items.map((item) => (
            <p key={item._id}>
              {item.name} - ₹{item.price}
            </p>
          ))}
        </div>
      ))}
    </div>
  );
}