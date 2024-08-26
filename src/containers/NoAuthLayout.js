import React, { useEffect } from "react";
import Header from "components/Common/Header";
import Footer from "components/Common/Footer";
import { Outlet, useNavigate } from "react-router-dom";
import { checkLogin } from "modules/authentication";

const NoAuthLayout = () => {
  let navigate = useNavigate();

  useEffect(() => {
    if (checkLogin()) {
      navigate("/dashboard");
    }
  }, [navigate]);

  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
};

export default NoAuthLayout;
