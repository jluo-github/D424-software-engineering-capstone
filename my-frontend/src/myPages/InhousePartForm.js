import React, { useState, useEffect } from "react";
import axios from "axios";

import { useParams, useNavigate, Link } from "react-router-dom";

const InhousePartForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  console.log(id);

  const [part, setPart] = useState({});
  // const { name, price, inv, max, min, partInhouseId } = part;
  const [error, setError] = useState();

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
          console.log(res.data);
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
        partId: "",
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
        `http://localhost:8080/api/inhouseParts/add`,
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
      navigate("/");
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
      <h1 className="m-3">Inhouse Part Detail</h1>

      <form onSubmit={handleSubmit}>
        {/* <input
          type="hidden"
          name="id"
          value={part.id}
          onChange={handleInputChange}
        /> */}
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

        <input
          className="form-control mb-4 col-4"
          placeholder="Max Inventory"
          required
          name="max"
          type="number"
          value={part.max}
          onChange={handleInputChange}
        />

        <input
          className="form-control mb-4 col-4"
          placeholder="Min Inventory"
          required
          name="min"
          type="number"
          value={part.min}
          onChange={handleInputChange}
        />

        <input
          className="form-control mb-4 col-4"
          placeholder="Part Inhouse ID"
          required
          name="partId"
          type="number"
          value={part.partId}
          onChange={handleInputChange}
        />

        <button className="btn btn-primary btn-sm mb-3" type="submit">
          Submit
        </button>
      </form>

      <div style={{ color: "red" }}>{error && <p>{error}</p>}</div>

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

export default InhousePartForm;
