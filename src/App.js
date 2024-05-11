import { useSelector } from "react-redux";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import ForgotPassword from "./pages/ForgotPassword";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";

function App() {
  const { user } = useSelector((state) => state.auth);

  return (
    <>
      <Router>
        <Routes>
          {/* Eğer kullanıcı varsa dashboarda yönlendir */}
          <Route
            path="/dashboard"
            element={user ? <Dashboard /> : <Navigate to="/" />}
          />
          {/* Diğer rotalar */}
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Register />} />
          <Route
            path="/resetpassword/:resetpasswordToken"
            element={<ForgotPassword />}
          />
        </Routes>
      </Router>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
}

export default App;
