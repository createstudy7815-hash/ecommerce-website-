import { useEffect, useState } from "react";
import axios from "./api/axios";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

const ITEMS_PER_PAGE = 6;

function Products() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [sort, setSort] = useState("");
  const [page, setPage] = useState(1);

  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const isAdmin = token ? jwtDecode(token).isAdmin : false;

  useEffect(() => {
    axios
      .get("/products", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setProducts(res.data))
      .catch((err) => console.log(err));
  }, [token]);

  
  const openProduct = (id) => {
    navigate(`/product/${id}`);
  };

  
  const addToCart = (product) => {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.push({ ...product, qty: 1 });
    localStorage.setItem("cart", JSON.stringify(cart));
    alert("Added to cart");
  };

  const deleteProduct = async (id) => {
    if (!window.confirm("Delete product?")) return;

    await axios.delete(`/products/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    setProducts(products.filter((p) => p._id !== id));
  };

 
  const updateProduct = async (p) => {
    const name = prompt("Name", p.name);
    const price = prompt("Price", p.price);
    const image = prompt("Image URL", p.image);
    const category = prompt("Category", p.category);

    const res = await axios.put(
      `/products/${p._id}`,
      { name, price, image, category },
      { headers: { Authorization: `Bearer ${token}` } }
    );

    setProducts(products.map((x) => (x._id === p._id ? res.data : x)));
  };

 
  const filtered = products
    .filter((p) => {
      const cleanName = p.name.replace(/\s+/g, "").toLowerCase();
      const cleanSearch = search.replace(/\s+/g, "").toLowerCase();
      const matchSearch = cleanName.includes(cleanSearch);
      const matchCategory =
        category === "All" || p.category === category;
      return matchSearch && matchCategory;
    })
    .sort((a, b) => {
      if (sort === "low") return a.price - b.price;
      if (sort === "high") return b.price - a.price;
      return 0;
    });

 
  const start = (page - 1) * ITEMS_PER_PAGE;
  const paginated = filtered.slice(start, start + ITEMS_PER_PAGE);
  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);

  return (
    <div className="container">
      <h2>Products</h2>

      {isAdmin && (
        <button onClick={() => navigate("/add-product")}>
          ➕ Add Product
        </button>
      )}

     
      <div className="search-box">
        <input
          placeholder="🔍 Search products..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
        />
      </div>

      <div style={{ textAlign: "center", marginBottom: 20 }}>
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="All">All</option>
          <option value="Electronics">Electronics</option>
          <option value="Clothing">Clothing</option>
          <option value="Accessories">Accessories</option>
        </select>

        <select
          style={{ marginLeft: 10 }}
          value={sort}
          onChange={(e) => setSort(e.target.value)}
        >
          <option value="">Sort by price</option>
          <option value="low">Low → High</option>
          <option value="high">High → Low</option>
        </select>
      </div>

      
      <div className="products">
        {paginated.length === 0 && <p>No products found</p>}

        {paginated.map((p) => (
          <div className="card" key={p._id}>
         
            <div
              style={{ cursor: "pointer" }}
              onClick={() => openProduct(p._id)}
            >
              <img src={p.image} alt={p.name} />
              <h3>{p.name}</h3>
              <p>₹{p.price}</p>
              <small>{p.category}</small>
            </div>

         
            <button
              onClick={(e) => {
                e.stopPropagation();
                addToCart(p);
              }}
            >
              Add to Cart
            </button>

            {isAdmin && (
              <>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    updateProduct(p);
                  }}
                >
                  Edit
                </button>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteProduct(p._id);
                  }}
                >
                  Delete
                </button>
              </>
            )}
          </div>
        ))}
      </div>


      <div style={{ textAlign: "center", marginTop: 20 }}>
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            onClick={() => setPage(i + 1)}
            style={{
              margin: 5,
              background: page === i + 1 ? "#2563eb" : "#e5e7eb",
              color: page === i + 1 ? "white" : "black",
            }}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
}

export default Products;