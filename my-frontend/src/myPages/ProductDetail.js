import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate, Link } from "react-router-dom";
import PageNav from "../components/PageNav";
import { computeHeadingLevel } from "@testing-library/react";

const ProductDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  console.log(id);

  const [product, setProduct] = useState({});
  const [availableParts, setAvailableParts] = useState([]);
  const [associatedParts, setAssociatedParts] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    if (id) {
      const fetchProducts = async () => {
        try {
          const res = await axios.get(
            `http://localhost:8080/api/products/update/${id}`,
            {
              headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods":
                  "GET,PUT,POST,DELETE,PATCH,OPTIONS",
              },
            }
          );
          console.log(res.data);
          const { product, availparts, parts, assparts } = res.data;
          setProduct(product);
          setAvailableParts(availparts);
          setAssociatedParts(assparts);
        } catch (error) {
          if (error.response && error.response.data) {
            const errorMessage = error.response.data[0].defaultMessage;
            setError({ errorMessage });
            console.log("Error updating product:", errorMessage);
          } else {
            setError("An error occurred while updating the product.");
            console.error("An error occurred while updating the product.");
          }

          console.log(error);
        }
      };
      fetchProducts();
    } else {
      const fetchProducts = async () => {
        try {
          const res = await axios.get(
            `http://localhost:8080/api/products/add`,
            {
              headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods":
                  "GET,PUT,POST,DELETE,PATCH,OPTIONS",
              },
            }
          );
          console.log(res.data);
          const { product, availparts, parts, assparts } = res.data;
          // setProduct(product);
          setProduct({
            name: "",
            price: "",
            inv: "",
          });
          setAvailableParts(availparts);
          setAssociatedParts(assparts);
        } catch (error) {
          if (error.response && error.response.data) {
            const errorMessage = error.response.data[0].defaultMessage;
            setError({ errorMessage });
            console.log("Error updating product:", errorMessage);
          } else {
            setError("An error occurred while updating the product.");
            console.error("An error occurred while updating the product.");
          }

          console.log(error);
        }
      };
      fetchProducts();
    }
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct({
      ...product,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // const endpoint = id
      //   ? `http://localhost:8080/api/products/update/${id}`
      //   : "http://localhost:8080/api/products/add";
      const endpoint = "http://localhost:8080/api/products/add";

      const res = await axios.post(endpoint, product, {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
        },
      });
      console.log("Product updated:", res.data);
      navigate("/");
    } catch (error) {
      if (error.response && error.response.data) {
        const errorMessage = error.response.data[0].defaultMessage;
        setError({ errorMessage });
        console.log("Error updating product:", errorMessage);
      } else {
        setError("An error occurred while updating the product.");
        console.error("An error occurred while updating the product.");
      }

      console.log(error);
    }
  };

  return (
    <div className="container text-center m-5">
      {/* Product detail form:  */}
      <h1>Product Detail</h1>
      <form onSubmit={handleSubmit}>
        {/* <input
          type="hidden"
          name="id"
          value={product.id}
          onChange={handleInputChange}
        /> */}

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
          type={product.id ? "text" : "hidden"}
          name="inv"
          placeholder="Inventory"
          required
          className="form-control mb-4 col-4"
          value={product.inv}
          onChange={handleInputChange}
        />

        <div style={{ color: "red" }}>
          {error.errorMessage ? <p>{error.errorMessage}</p> : null}
          {/* <ul>
            {errors.map((error, index) => (
              <li key={index}>{error}</li>
            ))}
          </ul> */}
        </div>

        <input type="submit" value="Submit" />
      </form>

      {/* Available parts List:  */}
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
          {availableParts.map((availPart) => (
            <tr key={availPart.id}>
              <td>{availPart.name}</td>
              <td>{availPart.price}</td>
              <td>{availPart.inv}</td>
              <td>{availPart.max}</td>
              <td>{availPart.min}</td>
              <td>
                <button
                  className="btn btn-primary"
                  onClick={async () => {
                    try {
                      const res = await axios.post(
                        `http://localhost:8080/api/products/${id}/associatepart/${availPart.id}`,
                        product,
                        {
                          headers: {
                            "Access-Control-Allow-Origin": "*",
                            "Access-Control-Allow-Methods":
                              "GET,PUT,POST,DELETE,PATCH,OPTIONS",
                          },
                        }
                      );

                      setAssociatedParts([...associatedParts, availPart]);
                      setAvailableParts(
                        availableParts.filter((p) => p.id !== availPart.id)
                      );
                    } catch (error) {
                      if (error.response & error.response.data) {
                        const errorMessage = error.response.data.message;
                        setError({ errorMessage });
                      } else {
                        setError(
                          "Please add and save product before adding parts!"
                        );
                        alert(
                          "Please add and save product before adding parts!"
                        );
                        console.error(
                          "Please save product before adding parts!"
                        );
                      }

                      console.error(error);
                    }
                  }}>
                  Add
                </button>
              </td>
            </tr>
          ))}
        </tbody>
        {/* <p>{error}</p> */}
      </table>

      {/* Associated parts List:  */}
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
          {associatedParts.map((assoPart) => (
            <tr key={assoPart.id}>
              <td>{assoPart.name}</td>
              <td>{assoPart.price}</td>
              <td>{assoPart.inv}</td>
              <td>{assoPart.max}</td>
              <td>{assoPart.min}</td>
              <td>
                {" "}
                <button
                  className="btn btn-primary"
                  onClick={async () => {
                    try {
                      const res = await axios.post(
                        `http://localhost:8080/api/products/${id}/removepart/${assoPart.id}`,
                        product,
                        {
                          headers: {
                            "Access-Control-Allow-Origin": "*",
                            "Access-Control-Allow-Methods":
                              "GET,PUT,POST,DELETE,PATCH,OPTIONS",
                          },
                        }
                      );
                      setAvailableParts([...availableParts, assoPart]);
                      setAssociatedParts(
                        associatedParts.filter((p) => p.id !== assoPart.id)
                      );
                    } catch (error) {
                      console.error("Error remove part:", error);
                    }
                  }}>
                  Remove
                </button>
              </td>
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
