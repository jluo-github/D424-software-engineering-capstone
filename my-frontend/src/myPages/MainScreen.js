import React, { useState, useEffect } from "react";
import { NavLink, Link, useParams, useNavigate } from "react-router-dom";
import { Button, Alert, Container, Row, Col } from "react-bootstrap";

import Logout from "../authentication/Logout";

import "../App.css";
import "../custom.scss";

import PageNav from "../components/PageNav";
import OutsourcedPartForm from "./OutsourcedPartForm";
import InhousePartForm from "./InhousePartForm";

const MainScreen = () => {
  const [alert, setAlert] = useState(false);
  const [display, setDisplay] = useState("display");

  let navigate = useNavigate();

  return (
    <>
      <Container></Container>
      <div className="container m-5">
        <Row className="mt-5 mb-5 text-center">
          {" "}
          <h1>PurpleCat PC Store</h1>
          <Container className="fluid">
            {" "}
            <Container className="my-5">
              <Row className="mt-5 mb-5 text-center p-5 ">
                <h3>Main Menu</h3>

                <Link className="navLink my-3" to="Products">
                  Products
                </Link>
                <Link className="navLink mb-3" to="Parts">
                  {" "}
                  Parts
                </Link>
                <Link className="navLink mb-3" to="InhousePartForm">
                  Add Inhouse Part
                </Link>
                <Link className="navLink mb-3" to="OutsourcedPartForm">
                  Add Outsourced Part
                </Link>
                <Link className="navLink mb-3" to="ProductDetail">
                  Add Product
                </Link>
                <Link className="navLink mb-3" to="About">
                  About
                </Link>
              </Row>
            </Container>
            <Logout />
          </Container>
        </Row>
      </div>{" "}
    </>
  );
};
export default MainScreen;
