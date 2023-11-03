import React from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { TbFaceIdError } from "react-icons/tb";
import Footer from "../components/Footer";
const PageNotFound = () => {
  return (
    <div>
      <h1 className="text-center">
        {" "}
        404 page not found &nbsp;&nbsp;
        <TbFaceIdError />
      </h1>
      <Footer />
    </div>
  );
};

export default PageNotFound;
