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
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [errorBuy, setErrorBuy] = useState("");

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

  const searchParts = async (term) => {
    try {
      const res = await axios.get(`http://localhost:8080/api/parts`, {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
        },
        params: {
          partKeyword: term,
        },
      });
      setParts(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const clearSearchParts = async () => {
    try {
      const res = await axios.get("http://localhost:8080/api/parts");
      setPartKeyword("");
      setParts(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const searchProducts = async (term) => {
    try {
      const res = await axios.get(`http://localhost:8080/api/products`, {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
        },
        params: {
          productKeyword: term,
        },
      });
      setProducts(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const clearSearchProducts = async () => {
    try {
      const res = await axios.get("http://localhost:8080/api/products");
      setProductKeyword("");
      setProducts(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    let timeout = setTimeout(() => {
      setError("");
      setErrorBuy("");
    }, 3000);
    return () => clearTimeout(timeout);
  }, [error, errorBuy]);

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
      {/* Parts Search form:  */}
      <div className="text-center">
        <h2>Parts</h2>
        <form>
          Filter:
          <input
            id="partKeyword"
            name="partKeyword"
            required
            size="50"
            value={partKeyword}
            onChange={handlePartInputChange}
            type="text"
          />
          &nbsp;
          {/* Search parts button:  */}
          <button
            className="btn btn-primary btn-sm mb-3"
            onClick={(e) => {
              e.preventDefault();
              console.log("partKeyword:", partKeyword);
              searchParts(partKeyword);
            }}>
            Search
          </button>
          &nbsp;
          {/* Clear search parts button:  */}
          <button
            className="btn btn-primary btn-sm mb-3"
            onClick={(e) => {
              e.preventDefault();
              clearSearchParts();
            }}>
            Clear
          </button>
        </form>

        {/* Add Part button:  */}
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
          {parts.map((part) => (
            <tr key={part.id}>
              <td>{part.name}</td>
              <td>{part.price}</td>
              <td>{part.inv}</td>
              <td>{part.max}</td>
              <td>{part.min}</td>
              <td>
                {/* part update button:  */}
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

                {/* part delete button:  */}
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
                        if (error.response.data) {
                          setError(error.response.data);
                          console.log(
                            "1-Part cannot be deleted due to existing associations with products!!"
                          );
                        } else {
                          setError("Error deleting the part.");
                          alert(
                            "2-Part cannot be deleted due to existing associations with products!!"
                          );
                        }
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
      </table>{" "}
      <div style={{ color: "red" }}>{error && <p>{error}</p>}</div>
      {/* Products search form: */}
      <div className="text-center m-5">
        <h2>Products</h2>
        <form>
          Filter:
          <input
            id="productKeyword"
            name="productKeyword"
            required
            size="50"
            value={productKeyword}
            onChange={handleProductInputChange}
            type="text"
          />
          &nbsp;
          {/* Search products button: */}
          <button
            className="btn btn-primary btn-sm mb-3"
            onClick={(e) => {
              e.preventDefault();
              console.log("partKeyword:", productKeyword);
              searchProducts(productKeyword);
            }}>
            Search
          </button>
          &nbsp;
          {/* Clear search products button: */}
          <button
            className="btn btn-primary btn-sm mb-3"
            onClick={(e) => {
              e.preventDefault();
              clearSearchProducts();
            }}>
            Clear
          </button>
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
                {/* Products Update button */}
                <button
                  className="btn btn-primary btn-sm m-3"
                  onClick={() => {
                    navigate(`/ProductDetail/${product.id}`);
                  }}>
                  Update
                </button>

                {/* Products Buy button */}
                <button
                  className="btn btn-primary btn-sm m-3"
                  onClick={async () => {
                    try {
                      const res = await axios.post(
                        `http://localhost:8080/api/products/buy/${product.id}`,
                        {
                          headers: {
                            "Access-Control-Allow-Origin": "*",
                            "Access-Control-Allow-Methods":
                              "GET,PUT,POST,DELETE,PATCH,OPTIONS",
                          },
                        }
                      );
                      const updatedProducts = [...products];
                      const productIndex = updatedProducts.findIndex(
                        (p) => p.id === product.id
                      );

                      if (productIndex !== -1) {
                        updatedProducts[productIndex] = {
                          ...updatedProducts[productIndex],
                          inv: updatedProducts[productIndex].inv - 1,
                        };
                        setProducts(updatedProducts);
                      }
                      console.log("Product bought:", res.data);
                      alert("Product added successfully");
                      navigate("/");
                    } catch (error) {
                      setErrorBuy(
                        "Purchase unsuccessful, product is out of stock!"
                      );
                    }
                  }}>
                  Buy Now
                </button>

                {/* Products Delete button */}
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
      </table>{" "}
      <div style={{ color: "red" }}>{errorBuy && <p>{errorBuy}</p>}</div>
    </div>
  );
};
export default MainScreen;
