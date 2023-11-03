import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { FiAlertCircle } from "react-icons/fi";
import { FileEarmarkRuledFill } from "react-bootstrap-icons";
import { Button, Alert, Card, Form, Container } from "react-bootstrap";
import Footer from "../components/Footer";
import "../App.css";
import "../custom.scss";
import axios from "axios";
import PageNav from "../components/PageNav";
import supabase from "../services/supabase";

import { login } from "../services/apiAuth";
import { useLogin } from "../authentication/useLogin";

const Login = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  console.log(id);

  const [email, setEmail] = useState("cat1@cat.com");
  const [password, setPassword] = useState("1234");

  const { login, isLoading } = useLogin();

  const [error, setError] = useState();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      return;
    }
    console.log("clicked");
    login(
      { email, password },
      {
        onSettled: () => {
          setEmail("");
          setPassword("");
        },
      }
    );
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
          type="email"
          autoComplete="username"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={isLoading}
        />

        <input
          className="form-control mb-4 col-4"
          placeholder="password"
          required
          name="password"
          type="password"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={isLoading}
        />

        <button
          className="btn btn-primary m-3"
          type="submit"
          disabled={isLoading}>
          login
        </button>
      </form>

      <div style={{ color: "red" }}>{error && <p>{error}</p>}</div>

      {/* <footer>
        <Link to="/">
          <button className="btn btn-primary  m-5">Back to Main Menu</button>
        </Link>
      </footer> */}
      <Footer />
    </div>
  );
};

export default Login;
