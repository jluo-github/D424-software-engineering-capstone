import React from "react";
import { NavLink, useParams, useNavigate } from "react-router-dom";

const PageNav = () => {
  return (
    <nav>
      <ul>
        <li>
          <NavLink to="/">Home</NavLink>
        </li>
        <li>
          <NavLink to="/InhousePartForm">Add Inhouse Part</NavLink>
        </li>
        <li>
          <NavLink to="/OutsourcedPartForm">Add Outsourced Part</NavLink>
        </li>
        <li>
          <NavLink to="/ProductDetail">Add Product</NavLink>
        </li>
        <li>
          <NavLink to="/about">About</NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default PageNav;
