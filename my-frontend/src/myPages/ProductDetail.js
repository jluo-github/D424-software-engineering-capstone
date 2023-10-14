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
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    if (id) {
      const fetchProducts = async () => {
        try {
          const res = await axios.get(
            // http://localhost:8080/api/products/update/1
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
        } catch (err) {
          console.log(err);
        }
      };
      fetchProducts();
    } else {
      const fetchProducts = async () => {
        try {
          const res = await axios.get(
            // http://localhost:8080/api/products/update/1
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
        } catch (err) {
          console.log(err);
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

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(`http://localhost:8080/api/products/add`, product, {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
        },
      })
      .then((response) => {
        console.log("Product updated:", response.data);
        navigate("/");
      })
      .catch((error) => {
        console.error("Error updating product:", error);
        setErrors(["An error occurred while updating the product."]);
      });
  };

  return (
    <div className="container text-center m-5">
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
          type="text"
          name="inv"
          placeholder="Inventory"
          required
          className="form-control mb-4 col-4"
          value={product.inv}
          onChange={handleInputChange}
        />

        <div style={{ color: "red" }}>
          {/* <ul>
            {errors.map((error, index) => (
              <li key={index}>{error}</li>
            ))}
          </ul> */}
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
                      console.log("Part added to associated:", res.data);
                      setAssociatedParts([...associatedParts, availPart]);
                      setAvailableParts(
                        availableParts.filter((p) => p.id !== availPart.id)
                      );
                    } catch (error) {
                      console.error("Error add part:", error);
                    }
                  }}>
                  Add
                </button>
              </td>
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
                      console.log("Part removed from associated:", res.data);
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
