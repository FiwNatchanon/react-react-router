import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

function EditProductForm() {
  const navigate = useNavigate();
  const { productId } = useParams();
  const [product, setProduct] = useState({
    name: "",
    image: "",
    price: "",
    description: "",
  });

  useEffect(() => {
    const getProduct = async () => {
      try {
        const results = await axios(
          `http://localhost:4001/products/${productId}`
        );
        const data = results.data.data;
        setProduct({
          name: data.name,
          image: data.image,
          price: data.price,
          description: data.description,
        });
      } catch (error) {
        console.error("Failed to fetch product:", error);
      }
    };

    getProduct();
  }, [productId]);

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:4001/products/${productId}`, {
        ...product,
        price: Number(product.price),
      });
      navigate("/");
    } catch (error) {
      console.error("Failed to update product:", error);
    }
  };

  return (
    <form className="product-form" onSubmit={handleSubmit}>
      <h1>Edit Product Form</h1>
      <div className="input-container">
        <label>
          Name
          <input
            id="name"
            name="name"
            type="text"
            placeholder="Enter name here"
            value={product.name}
            onChange={handleChange}
          />
        </label>
      </div>
      <div className="input-container">
        <label>
          Image Url
          <input
            id="image"
            name="image"
            type="text"
            placeholder="Enter image url here"
            value={product.image}
            onChange={handleChange}
          />
        </label>
      </div>
      <div className="input-container">
        <label>
          Price
          <input
            id="price"
            name="price"
            type="number"
            placeholder="Enter price here"
            value={product.price}
            onChange={handleChange}
          />
        </label>
      </div>
      <div className="input-container">
        <label>
          Description
          <textarea
            id="description"
            name="description"
            placeholder="Enter description here"
            rows={4}
            cols={30}
            value={product.description}
            onChange={handleChange}
          />
        </label>
      </div>
      <div className="form-actions">
        <button type="submit">Update</button>
      </div>
    </form>
  );
}

export default EditProductForm;
