import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function HomePage() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [isError, setIsError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);

  const getProducts = async () => {
    try {
      setIsError(false);
      setIsLoading(true);
      const results = await axios("http://localhost:4001/products");
      setProducts(results.data.data);
      setIsLoading(false);
    } catch (error) {
      setIsError(true);
      setIsLoading(false);
    }
  };

  const handleDelete = async (productId) => {
    try {
      await axios.delete(`http://localhost:4001/products/${productId}`);
      getProducts();
    } catch (error) {
      console.error("Failed to delete product:", error);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <div>
      <div className="app-wrapper">
        <h1 className="app-title">Products</h1>
        <Link to="/create-product" className="button-link">Create Product</Link>
      </div>
      <div className="product-list">
        {products.map((product) => {
          return (
            <div className="product" key={product.id}>
              <div className="product-preview">
                <img
                  src={product.image || "https://via.placeholder.com/250/250"}
                  alt={product.name}
                  width="250"
                  height="250"
                />
              </div>
              <div className="product-detail">
                <h1>Product name: {product.name} </h1>
                <h2>Product price: {product.price}</h2>
                <p>Product description: {product.description} </p>
                <div className="product-actions">
                  <button
                    className="view-button"
                    onClick={() => navigate(`/view-product/${product.id}`)}
                  >
                    View
                  </button>
                  <button
                    className="edit-button"
                    onClick={() => navigate(`/edit-product/${product.id}`)}
                  >
                    Edit
                  </button>
                </div>
              </div>

              <button
                className="delete-button"
                onClick={() => handleDelete(product.id)}
              >
                x
              </button>
            </div>
          );
        })}
      </div>
      {isError ? <h1>Request failed</h1> : null}
      {isLoading ? <h1>Loading ....</h1> : null}
    </div>
  );
}

export default HomePage;
