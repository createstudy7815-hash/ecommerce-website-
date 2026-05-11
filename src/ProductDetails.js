import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "./api/axios";

function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const token = localStorage.getItem("token");

  useEffect(() => {
    axios
      .get(`/products/${id}`, {
        headers: { Authorization: `Bearer ${token}` }, // send token if protected
      })
      .then((res) => setProduct(res.data))
      .catch((err) => {
        console.error(err);
        alert("Failed to load product");
      });
  }, [id, token]);

  if (!product) return <h2>Loading...</h2>;

  return (
    <div className="product-details">
      <img src={product.image} alt={product.name} width="300" />
      <h2>{product.name}</h2>
      <h3>₹{product.price}</h3>
      <p><strong>Category:</strong> {product.category}</p>
      <p><strong>Description:</strong> {product.description}</p>
    </div>
  );
}

export default ProductDetails;