import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useLocation, useNavigate, Link } from "react-router-dom";
import PageNav from "../components/PageNav";

const ProductDetail = () => {
  const { productId } = useParams();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const navigate = useNavigate();

  const initialProduct = {
    id: queryParams.get("id") || "",
    name: queryParams.get("name") || "",
    price: queryParams.get("price") || "",
    inv: queryParams.get("inv") || "",
  };

  const [product, setProduct] = useState(initialProduct);
  const [availableParts, setAvailableParts] = useState([]);
  const [associatedParts, setAssociatedParts] = useState([]);
  const [errors, setErrors] = useState([]);

  // const productId = 1; // Replace with the actual product ID

  useEffect(() => {
    // Fetch product details and associated parts
    axios
      .get(`http://localhost:8080/api/products/update/${productId}`)
      .then((response) => {
        const { product, availparts, parts, assparts } = response.data;
        setProduct(product);
        setAvailableParts(availparts);
        setAssociatedParts(assparts);
        console.log(availparts);
        console.log(assparts);
      })
      .catch((error) => {
        console.error("Error fetching product details:", error);
      });
  }, [productId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct({
      ...product,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Make a POST request to update the product
    axios
      .post(`http://localhost:8080/api/products/update/${productId}`, product)
      .then((response) => {
        // Handle successful update
        console.log("Product updated:", response.data);
        // Optionally, you can navigate back to the MainScreen or perform any other actions
        navigate("/");
      })
      .catch((error) => {
        console.error("Error updating product:", error);
        // Handle errors and update the errors state if needed
        setErrors(["An error occurred while updating the product."]);
      });
  };

  return (
    <div className="container text-center m-5">
      <h1>Product Detail</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="hidden"
          name="id"
          value={product.id}
          onChange={handleInputChange}
        />

        <input
          type="text"
          name="name"
          placeholder="Name"
          required
          className="form-control mb-4 col-4"
          value={product.name}
          onChange={handleInputChange}
        />

        <input
          type="text"
          name="price"
          placeholder="Price"
          required
          className="form-control mb-4 col-4"
          value={product.price}
          onChange={handleInputChange}
        />

        <input
          type="text"
          name="inv"
          placeholder="Inventory"
          required
          className="form-control mb-4 col-4"
          value={product.inv}
          onChange={handleInputChange}
        />

        <div style={{ color: "red" }}>
          <ul>
            {errors.map((error, index) => (
              <li key={index}>{error}</li>
            ))}
          </ul>
        </div>

        <input type="submit" value="Submit" />
      </form>

      <h2>Available Parts</h2>
      <table className="table table-bordered table-striped align-middle">
        <thead className="thead-dark">
          <tr>
            <th>Name</th>
            <th>Price</th>
            <th>Inventory</th>
            <th>Max Inventory</th>
            <th>Min Inventory</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {availableParts.map((part) => (
            <tr key={part.id}>
              <td>{part.name}</td>
              <td>{part.price}</td>
              <td>{part.inv}</td>
              <td>{part.max}</td>
              <td>{part.min}</td>
              <td>{/* Add logic to associate part with product */}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2>Associated Parts</h2>
      <table className="table table-bordered table-striped align-middle">
        <thead className="thead-dark">
          <tr>
            <th>Name</th>
            <th>Price</th>
            <th>Inventory</th>
            <th>Max Inventory</th>
            <th>Min Inventory</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {associatedParts.map((part) => (
            <tr key={part.id}>
              <td>{part.name}</td>
              <td>{part.price}</td>
              <td>{part.inv}</td>
              <td>{part.max}</td>
              <td>{part.min}</td>
              <td>{/* Add logic to disassociate part from product */}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <footer>
        <Link to="/">
          <button className="btn btn-primary btn-sm m-5">
            Back to Main Screen
          </button>
        </Link>
      </footer>
    </div>
  );
};

export default ProductDetail;
