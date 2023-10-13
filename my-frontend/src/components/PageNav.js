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
          <NavLink to="/InhousePartForm">InhousePartForm</NavLink>
        </li>
        <li>
          <NavLink to="/OutsourcedPartForm">OutsourcedPartForm</NavLink>
        </li>
        <li>
          <NavLink to="/ProductDetail">ProductDetail</NavLink>
        </li>
        <li>
          <NavLink to="/about">About</NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default PageNav;
