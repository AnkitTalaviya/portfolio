import "./App.css";
import { ToastContainer } from "react-toastify";
import SiteRoutes from "SiteRoutes";

function App() {
  return (
    <>
      <SiteRoutes />
      <ToastContainer
        autoClose={5000}
        bodyClassName="io_toast_body"
        className="io_toast_wrapper"
        closeOnClick
        draggable
        hideProgressBar
        newestOnTop
        pauseOnFocusLoss
        pauseOnHover
        position="top-right"
        progressClassName="io_toast_progress"
        rtl={false}
        toastClassName="io_toast"
      />
    </>
  );
}

export default App;
