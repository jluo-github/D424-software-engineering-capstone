import React, { useState, useEffect } from "react";
import axios from "axios";

import { useParams, useNavigate, Link } from "react-router-dom";

const OutsourcedPartForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  console.log(id);

  const [part, setPart] = useState({});
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    if (id) {
      const fetchParts = async () => {
        try {
          const res = await axios.get(
            `http://localhost:8080/api/parts/update/${id}`,
            {
              header: {
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

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:8080/api/outsourcedParts/add", part, {
        header: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
        },
      })
      .then((response) => {
        console.log("Part added:", response.data);
        navigate("/");
      })
      .catch((error) => {
        if (error.response && error.response.status === 400) {
          setErrors(error.response.data);
        } else {
          console.error("Error adding part:", error);
        }
      });
  };

  return (
    <div className="container text-center m-5">
      <h1>Outsourced Part Detail</h1>

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

        {/* Add Error messages */}
        <div style={{ color: "red" }}>
          <ul>
            {" "}
            {/* <ul>
              {errors.map((error, index) => (
                <li key={index}>{error}</li>
              ))}
            </ul> */}
          </ul>
        </div>

        <input type="submit" value="Submit" />
      </form>

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

export default OutsourcedPartForm;
