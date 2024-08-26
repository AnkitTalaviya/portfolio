import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "components/Authentication/Login/Login";
import HomePage from "components/Common/HomePage";
import ScrollToTop from "components/Common/ScrollToTop";
import Dashboard from "components/Dashboard/Dashboard";
import AuthLayout from "containers/AuthLayout";
import NoAuthLayout from "containers/NoAuthLayout";
import Page404 from "pages/404";

const SiteRoutes = () => (
  <BrowserRouter>
    <ScrollToTop>
      <Routes>
        <Route element={<NoAuthLayout />}>
          <Route path="/login" element={<Login />} />
        </Route>
        <Route element={<AuthLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>
        <Route path="/" element={<HomePage />} />
        <Route path="*" element={<Page404 />} />
      </Routes>
    </ScrollToTop>
  </BrowserRouter>
);

export default SiteRoutes;
