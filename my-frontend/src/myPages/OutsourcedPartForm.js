import React, { useState, useEffect } from "react";
import axios from "axios";

import { useParams, useNavigate, Link } from "react-router-dom";

const OutsourcedPartForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  console.log(id);

  const [part, setPart] = useState({});
  const [error, setError] = useState([]);

  useEffect(() => {
    if (id) {
      const fetchParts = async () => {
        try {
          const res = await axios.get(
            `http://localhost:8080/api/parts/update/${id}`,
            {
              headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods":
                  "GET,PUT,POST,DELETE,PATCH,OPTIONS",
              },
            }
          );
          setPart(res.data);
        } catch (err) {
          console.log(err);
        }
      };
      fetchParts();
    } else {
      setPart({
        name: "",
        price: "",
        inv: "",
        max: "",
        min: "",
        companyName: "",
      });
    }
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPart({
      ...part,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:8080/api/outsourcedParts/add",
        part,
        {
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
          },
        }
      );
      console.log("Part added:", res.data);
      setPart(res.data);
      navigate("/Parts");
    } catch (error) {
      if (error.response.data === "Validation failed") {
        setError("Inventory must be between or at the Max and Min value!!");
        console.log(
          "1-Inventory must be between or at the Max and Min value!!!"
        );
      } else {
        setError("Error adding the part.");
        console.log(
          "2-Inventory must be between or at the Max and Min value!!!"
        );
      }
    }
  };

  useEffect(() => {
    let timeout = setTimeout(() => {
      setError("");
    }, 3000);
    return () => clearTimeout(timeout);
  }, [error]);

  return (
    <div className="container text-center m-5">
      <h1 className="m-5">Outsourced Part Detail</h1>

      <form onSubmit={handleSubmit}>
        {/* Add hidden form field to handle update */}
        {/* <input type="hidden" name="id" /> */}

        <input
          className="form-control mb-4 col-4"
          placeholder="Name"
          required
          name="name"
          type="text"
          value={part.name}
          onChange={handleInputChange}
        />

        <input
          className="form-control mb-4 col-4"
          placeholder="Price"
          required
          name="price"
          type="text"
          value={part.price}
          onChange={handleInputChange}
        />

        <input
          className="form-control mb-4 col-4"
          placeholder="Inventory"
          required
          name="inv"
          type="text"
          value={part.inv}
          onChange={handleInputChange}
        />

        {/* Add max int and min int to the form */}
        <input
          className="form-control mb-4 col-4"
          placeholder="MaxInv"
          required
          name="max"
          type="number"
          value={part.max}
          onChange={handleInputChange}
        />

        <input
          className="form-control mb-4 col-4"
          placeholder="MinInv"
          required
          name="min"
          type="number"
          value={part.min}
          onChange={handleInputChange}
        />

        <input
          className="form-control mb-4 col-4"
          placeholder="Company Name"
          name="companyName"
          type="text"
          value={part.companyName}
          onChange={handleInputChange}
        />

        <button className="btn btn-primary  m-3" type="submit">
          {!part.id ? "Add" : "Update"}
        </button>
      </form>

      <div style={{ color: "red" }}>{error && <p>{error}</p>}</div>

      <footer>
        <Link to="/">
          <button className="btn btn-primary m-5">Back to Main Menu</button>
        </Link>
      </footer>
    </div>
  );
};

export default OutsourcedPartForm;
