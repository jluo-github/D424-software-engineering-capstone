import React from "react";
import { FaSquareGitlab } from "react-icons/fa6";

const Footer = () => {
  return (
    <footer
      variant="dark"
      className=" myFooter navbar  py-3 fixed-bottom shadow-lg justify-content-center container-fluid ">
      {" "}
      Copyright &copy; {new Date().getFullYear()} PurpleCat PC Store{" "}
      {/* <a href="https://github.com/jluo-github" target="_blank">
        <Github className="myIcon" width="100" height="30" />
      </a> */}
      <a
        href="https://gitlab.com/wgu-gitlab-environment/student-repos/jluo8/d424-software-engineering-capstone/-/tree/working_branch"
        target="_blank"
        rel="noreferer">
        <FaSquareGitlab className="myIcon ms-5" size={30} />
      </a>
    </footer>
  );
};

export default Footer;
