import React, { useEffect } from "react";
import Header from "components/Common/Header";
import Footer from "components/Common/Footer";
import { Outlet, useNavigate } from "react-router-dom";
import { checkLogin } from "modules/authentication";

const AuthLayout = () => {
  let navigate = useNavigate();

  useEffect(() => {
    if (!checkLogin()) {
      navigate("/login");
    }
  }, [navigate]);

  return (
    <>
      <Header></Header>
      <div className="container">
        <div className="mt-4 mb-4">
          <Outlet />
        </div>
      </div>
      <Footer></Footer>
    </>
  );
};

export default AuthLayout;
