import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import classNames from "classnames";
import imgLogo from "assets/images/logo.jpg";
import { checkLogin } from "modules/authentication";
import LogoutButton from "components/Authentication/Logout/LogoutButton";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  const { pathname: path } = useLocation();

  const isLoggedIn = checkLogin();

  return (
    <div className="navbar" color="dark" dark expand="md" container="lg">
      <div className="navbar-brand">
        <Link to={isLoggedIn ? "/dashboard" : "/login"}>
          <img
            src={imgLogo}
            alt="Logo"
            style={{ height: 50, width: 50 }}
            className="slow-spin"
          />
        </Link>
      </div>
      <div className="navbar-toggler" onClick={toggle} />
      {isLoggedIn && (
        <div className="collapse" isOpen={isOpen} navbar>
          <div className="nav me-auto" navbar>
            <div className="nav-item">
              <Link
                to="/dashboard"
                className={classNames("nav-link", {
                  active: path.includes("/dashboard"),
                })}
              >
                Dashboard
              </Link>
            </div>
            <div className="nav-item">
              <Link
                to="/users"
                className={classNames("nav-link", {
                  active: path.includes("/user"),
                })}
              >
                Users
              </Link>
            </div>
          </div>
          <div className="navbar-text">
            <LogoutButton />
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;
