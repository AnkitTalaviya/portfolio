import { doLogout } from "modules/authentication";
import React from "react";
import { useNavigate } from "react-router-dom";

const LogoutButton = () => {
  let navigate = useNavigate();

  const handleClick = () => {
    navigate("/login");
    doLogout();
  };

  return (
    <button color="info" onClick={handleClick}>
      <i className="fa fa-power-off me-2"></i>
      Logout
    </button>
  );
};

export default LogoutButton;
