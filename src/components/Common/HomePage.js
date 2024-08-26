import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { checkLogin } from "modules/authentication";

const HomePage = () => {
  let navigate = useNavigate();

  useEffect(() => {
    navigate(!checkLogin() ? "/login" : "/dashboard");
  }, [navigate]);

  return <></>;
};

export default HomePage;
