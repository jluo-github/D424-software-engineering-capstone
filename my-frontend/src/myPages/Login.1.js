// import React, { useState, useEffect } from "react";
// import { Link, useParams, useNavigate } from "react-router-dom";
// import "../App.css";
// import "../custom.scss";
// import axios from "axios";
// import PageNav from "../components/PageNav";

// const Login = () => {
//   const navigate = useNavigate();
//   const { id } = useParams();
//   console.log(id);

//   const [username, setUsername] = useState({});
//   const [password, setPassword] = useState({});
//   const [error, setError] = useState();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await axios.post(
//         `http://localhost:8080/api/login`,
//         { username, password },
//         {
//           headers: {
//             "Access-Control-Allow-Origin": "*",
//             "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
//           },
//         }
//       );
//       console.log("user login:", res.data);

//       navigate("/");
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   return (
//     <div className="container text-center m-5">
//       <h1 className="m-5">User Login</h1>

//       <form onSubmit={handleSubmit}>
//         <input
//           className="form-control mb-4 col-4"
//           placeholder="Username"
//           required
//           name="username"
//           type="text"
//           value={username}
//           onChange={(e) => setUsername(e.target.value)}
//         />

//         <input
//           className="form-control mb-4 col-4"
//           placeholder="password"
//           required
//           name="password"
//           type="password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//         />

//         <button className="btn btn-primary m-3" type="submit">
//           login
//         </button>

//         {/* <button className="btn btn-primary m-3" type="submit">
//           {!part.id ? "Add" : "Update"}
//         </button> */}
//       </form>

//       <div style={{ color: "red" }}>{error && <p>{error}</p>}</div>

//       <footer>
//         <Link to="/">
//           <button className="btn btn-primary  m-5">Back to Main Screen</button>
//         </Link>
//       </footer>
//     </div>
//   );
// };

// export default Login;
