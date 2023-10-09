import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import "../App.css";
import "../custom.scss";
import axios from "axios";
import PageNav from "../components/PageNav";

const MainScreen = () => {
  const navigate = useNavigate();

  const [partKeyword, setPartKeyword] = useState("");
  const [productKeyword, setProductKeyword] = useState("");
  const [parts, setParts] = useState([]);
  const [products, setProducts] = useState([]);

  const handlePartInputChange = (e) => {
    setPartKeyword(e.target.value);
  };

  const handleProductInputChange = (e) => {
    setProductKeyword(e.target.value);
  };

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/parts")
      .then((response) => {
        setParts(response.data);
      })
      .catch((error) => {
        console.log(error);
      });

    axios
      .get("http://localhost:8080/api/products")
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  });

  return (
    <div className="container m-5">
      <PageNav />
      {/* Header */}
      <div className="container text-center">
        <div className="row align-items-start">
          <div className="col m-3">
            <h1>PurpleCat PC Store</h1>
          </div>
          <div className="col m-3">
            <a className="btn btn-primary btn-sm me-3 m-auto" href="/about">
              About
            </a>
          </div>
        </div>
      </div>
      <hr />

      {/* Parts */}
      <div className="text-center">
        <h2>Parts</h2>
        <form action="/">
          Filter:
          <input
            id="partkeyword"
            name="partkeyword"
            required
            size="50"
            value={partKeyword}
            onChange={handlePartInputChange}
            type="text"
          />
          &nbsp;
          <input type="submit" value="Search" />
          &nbsp;
          <input
            id="btnClearPart"
            onClick={() => setPartKeyword("")}
            type="button"
            value="Clear"
          />
        </form>
        <br />
        <br />
        <a className="btn btn-primary btn-sm mb-3" href="/InhousePartForm">
          Add Inhouse Part
        </a>
        <a className="btn btn-primary btn-sm mb-3" href="/OutsourcedPartForm">
          Add Outsourced Part
        </a>
      </div>

      {/* Parts Table */}
      <table className="table table-bordered table-striped m-3 text-center align-middle">
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
          {/* Replace the following with a mapping of part data */}
          {parts.map((part) => (
            <tr key={part.id}>
              <td>{part.name}</td>
              <td>{part.price}</td>
              <td>{part.inv}</td>
              <td>{part.max}</td>
              <td>{part.min}</td>
              <td>
                <button
                  className="btn btn-primary"
                  onClick={() => {
                    if (part.companyName) {
                      navigate(`/OutsourcedPartForm?id=${part.id}`);
                    } else {
                      navigate(`/InhousePartForm?id=${part.id}`);
                    }
                  }}>
                  Update
                </button>

                <button
                  className="btn btn-primary btn-sm m-3"
                  onClick={() => {
                    if (
                      window.confirm(
                        "Are you sure you want to delete this part?"
                      )
                    ) {
                      // Handle delete part logic here by making a DELETE request
                      axios
                        .delete(
                          `http://localhost:8080/api/parts/delete/${part.id}`
                        )
                        .then((response) => {
                          // Handle successful deletion
                          console.log("Part deleted:", response.data);
                          // Optionally, refresh the parts list after deletion
                          // You can make another GET request to update the 'parts' state
                        })
                        .catch((error) => {
                          console.error("Error deleting part:", error);
                        });
                    }
                  }}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
          {/* Repeat the above row for each part */}
        </tbody>
      </table>

      {/* Products */}
      <div className="text-center m-5">
        <h2>Products</h2>
        <form action="/">
          Filter:
          <input
            id="productkeyword"
            name="productkeyword"
            required
            size="50"
            value={productKeyword}
            onChange={handleProductInputChange}
            type="text"
          />
          &nbsp;
          <input type="submit" value="Search" />
          &nbsp;
          <input
            id="btnClearProduct"
            onClick={() => setProductKeyword("")}
            type="button"
            value="Clear"
          />
        </form>
        <br />
        <br />
        <a className="btn btn-primary btn-sm mb-3" href="/ProductDetail">
          Add Product
        </a>
      </div>

      {/* Products Table */}
      <table className="table table-bordered table-striped m-3 text-center align-middle">
        <thead className="thead-dark">
          <tr>
            <th>Name</th>
            <th>Price</th>
            <th>Inventory</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td>{product.name}</td>
              <td>{product.price}</td>
              <td>{product.inv}</td>
              <td>
                <a
                  className="btn btn-primary btn-sm m-3"
                  href={`/ProductDetail?id=${product.id}&name=${product.name}&price=${product.price}&inv=${product.inv}`}>
                  Update
                </a>
                <a
                  className="btn btn-primary btn-sm m-3"
                  href={`/buy/${product.id}`}>
                  Buy Now
                </a>
                <button
                  className="btn btn-primary btn-sm m-3"
                  onClick={() => {
                    if (
                      window.confirm(
                        "Are you sure you want to delete this product?"
                      )
                    ) {
                      // Handle delete product logic here by making a DELETE request
                      axios
                        .delete(
                          `http://localhost:8080/api/products/delete/${product.id}`
                        )
                        .then((response) => {
                          // Handle successful deletion
                          console.log("Product deleted:", response.data);
                          // Optionally, refresh the products list after deletion
                          // You can make another GET request to update the 'products' state
                        })
                        .catch((error) => {
                          console.error("Error deleting product:", error);
                        });
                    }
                  }}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
export default MainScreen;
