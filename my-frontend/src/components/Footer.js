import React from "react";
import { Link, useParams, useNavigate } from "react-router-dom";

const Footer = () => {
  return (
    <footer>
      <Link to="/">
        <button className="btn btn-primary m-5">Back to Main Screen</button>
      </Link>
    </footer>
  );
};

export default Footer;
