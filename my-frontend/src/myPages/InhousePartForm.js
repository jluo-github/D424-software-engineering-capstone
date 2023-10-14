import React, { useState, useEffect } from "react";
import axios from "axios";

import { useParams, useLocation, useNavigate, Link } from "react-router-dom";

const InhousePartForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  console.log(id);

  const [part, setPart] = useState({});
  // const { name, price, inv, max, min, partInhouseId } = part;
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/parts/update/${id}`, {
        header: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
        },
      })
      .then((res) => {
        console.log(res.data);
        setPart(res.data);
      })
      .catch((err) => {
        console.log("No inhouse parts", err);
        // handle error
      });
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
      .post("http://localhost:8080/api/inhouseParts/add", part, {
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
          type="text"
          value={part.partId}
          onChange={handleInputChange}
        />

        {/* Display error messages */}
        <div style={{ color: "red" }}>
          {" "}
          {/* <ul>
            {errors.map((error, index) => (
              <li key={index}>{error}</li>
            ))}
          </ul> */}
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

export default InhousePartForm;
