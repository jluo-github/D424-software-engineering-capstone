import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import "../App.css";
import "../custom.scss";
import axios from "axios";
import PageNav from "../components/PageNav";
import supabase from "../services/supabase";

import { login } from "../services/apiAuth";
// import { useLogin } from "../authentication/useLogin";

const Login = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  console.log(id);

  const [email, setEmail] = useState("cat1@cat.com");
  const [password, setPassword] = useState("1234");

  // const { login, isLoading } = useLogin();

  const [error, setError] = useState();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) return;
    console.log("clicked");
    // login({ email, password });
    // navigate("/");
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      setError("Wrong username or password!");
      return;
    }
    navigate("/");
    console.log(data);
    return data;
  };

  return (
    <div className="container text-center m-5">
      <h1 className="m-5">User Login</h1>

      <form onSubmit={handleSubmit}>
        <input
          className="form-control mb-4 col-4"
          placeholder="Email"
          required
          name="email"
          type="text"
          autoComplete="username"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          className="form-control mb-4 col-4"
          placeholder="password"
          required
          name="password"
          type="password"
          autoComplete="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="btn btn-primary m-3" type="submit">
          login
        </button>
      </form>

      <div style={{ color: "red" }}>{error && <p>{error}</p>}</div>

      <footer>
        <Link to="/">
          <button className="btn btn-primary  m-5">Back to Main Screen</button>
        </Link>
      </footer>
    </div>
  );
};

export default Login;
