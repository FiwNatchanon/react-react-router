import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";

function ViewProductPage() {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getProduct = async () => {
      try {
        setIsError(false);
        setIsLoading(true);
        const results = await axios(
          `http://localhost:4001/products/${productId}`
        );
        setProduct(results.data.data);
        setIsLoading(false);
      } catch (error) {
        setIsError(true);
        setIsLoading(false);
      }
    };

    getProduct();
  }, [productId]);

  return (
    <div>
      <h1>View Product Page</h1>
      {isLoading ? <p>Loading ....</p> : null}
      {isError ? <p>Request failed</p> : null}
      {product ? (
        <div className="view-product-container">
          <img
            src={product.image || "https://via.placeholder.com/250/250"}
            alt={product.name}
            width="250"
            height="250"
          />
          <h2>{product.name}</h2>
          <p>Price: {product.price}</p>
          <p>{product.description}</p>
        </div>
      ) : null}
      <Link to="/" className="button-link">Back to Home</Link>
    </div>
  );
}

export default ViewProductPage;
