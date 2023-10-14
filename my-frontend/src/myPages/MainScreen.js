import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import "../App.css";
import "../custom.scss";
import axios from "axios";
import PageNav from "../components/PageNav";
import OutsourcedPartForm from "./OutsourcedPartForm";
import InhousePartForm from "./InhousePartForm";
import { computeHeadingLevel } from "@testing-library/react";

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

  const handleInhousePart = () => {
    navigate("/InhousePartForm");
  };

  const handleOutsourcedPart = () => {
    navigate("/OutsourcedPartForm");
  };

  useEffect(() => {
    const fetchParts = async () => {
      try {
        const res = await axios.get("http://localhost:8080/api/parts");
        setParts(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchParts();
    const fetchProducts = async () => {
      try {
        const res = await axios.get("http://localhost:8080/api/products");
        setProducts(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchProducts();
  }, []);

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
        <button
          className="btn btn-primary btn-sm mb-3"
          onClick={handleInhousePart}>
          Add Inhouse Part
        </button>
        <button
          className="btn btn-primary btn-sm mb-3"
          onClick={handleOutsourcedPart}>
          Add Outsourced Part
        </button>
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
                      if (part.id) {
                        navigate(`/OutsourcedPartForm/${part.id}`);
                      } else {
                        navigate(`/OutsourcedPartForm/`);
                      }
                    } else {
                      navigate(`/InhousePartForm/${part.id}`);
                    }
                  }}>
                  Update
                </button>

                <button
                  className="btn btn-primary btn-sm m-3"
                  onClick={async () => {
                    if (
                      window.confirm(
                        "Are you sure you want to delete this part?"
                      )
                    ) {
                      try {
                        const res = await axios.delete(
                          `http://localhost:8080/api/parts/delete/${part.id}`
                        );
                        console.log("Part deleted:", res.data);
                        setParts((parts) =>
                          parts.filter((item) => item.id !== part.id)
                        );
                      } catch (error) {
                        console.error("Error deleting part:", error);
                      }
                    }
                  }}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
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
                {/*  Update button */}

                <button
                  className="btn btn-primary btn-sm m-3"
                  onClick={() => {
                    navigate(`/ProductDetail/${product.id}`);
                  }}>
                  Update
                </button>

                {/*  Buy button */}

                <button
                  className="btn btn-primary btn-sm m-3"
                  onClick={() => {
                    if (product.inv > 0) {
                      navigate(`/ProductDetail/${product.id}`);
                    } else {
                      alert("Please select a product with enough inventory ");
                      navigate(`/`);
                    }
                  }}>
                  Buy Now
                </button>

                {/*  Delete button */}

                <button
                  className="btn btn-primary btn-sm m-3"
                  onClick={async () => {
                    if (
                      window.confirm(
                        "Are you sure you want to delete this product?"
                      )
                    ) {
                      try {
                        const res = await axios.delete(
                          `http://localhost:8080/api/products/delete/${product.id}`
                        );
                        console.log("Product deleted:", res.data);
                        setProducts((products) =>
                          products.filter((item) => item.id !== product.id)
                        );
                      } catch (error) {
                        console.error("Error deleting product:", error);
                      }
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
