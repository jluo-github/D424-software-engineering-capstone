import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useLocation, useNavigate, Link } from "react-router-dom";

const InhousePartForm = () => {
  const { id } = useParams();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const navigate = useNavigate();

  const initialPart = {
    id: queryParams.get("id") || "",
    name: queryParams.get("name") || "",
    price: queryParams.get("price") || "",
    inv: queryParams.get("inv") || "",
    max: queryParams.get("max") || "",
    min: queryParams.get("min") || "",
    partInhouseId: queryParams.get("partInhouseId") || "",
  };

  const [part, setPart] = useState(initialPart);
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/parts/update/${id}`)
      .then((res) => {
        console.log(res.data);
        setPart(res.data);
      })
      .catch((err) => {
        console.log("Error getting inhouse parts", err);
        // handle error
      });
  }, [id]);

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
      .post("http://localhost:8080/api/inhouseParts/add", part)
      .then((response) => {
        console.log("Part added:", response.data);
        // Handle successful submission, e.g., redirect or display a success message

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
        <input
          type="hidden"
          name="id"
          value={part.id}
          onChange={handleInputChange}
        />
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
          placeholder="Par Inhouse ID"
          required
          name="partInhouseId"
          type="text"
          value={part.partInhouseId}
          onChange={handleInputChange}
        />

        {/* Display error messages */}
        <div style={{ color: "red" }}>
          {" "}
          <ul>
            {errors.map((error, index) => (
              <li key={index}>{error}</li>
            ))}
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

export default InhousePartForm;
