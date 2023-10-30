import React from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../authentication/useUser";
import { HiArrowRightOnRectangle } from "react-icons/hi2";
import { useLogout } from "./useLogout";

const Logout = () => {
  const navigate = useNavigate();
  const { logout, isLoading } = useLogout();
  return (
    <button disabled={isLoading} onClick={logout}>
      {!isLoading ? <HiArrowRightOnRectangle /> : <p>Spinner: loading</p>}
    </button>
  );
};

export default Logout;
