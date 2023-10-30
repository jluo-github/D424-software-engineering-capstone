import React from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { TbFaceIdError } from "react-icons/tb";

const PageNotFound = () => {
  return (
    <div>
      <h1 className="text-center">
        {" "}
        404 page not found &nbsp;&nbsp;
        <TbFaceIdError />
      </h1>
    </div>
  );
};

export default PageNotFound;
