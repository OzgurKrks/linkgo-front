import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import {
  BrowserRouter as Router,
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import ForgotPassword from "./pages/ForgotPassword";
import Admin from "./pages/Admin/Admin";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Links from "./pages/Links/Links";
import SinglePage from "./pages/SinglePage/SinglePage";
import Appearance from "./pages/Appearance/Appearance";

function App() {
  const { user } = useSelector((state) => state.auth);
  const { links } = useSelector((state) => state.links);
  const [dragLinks, setDragLinks] = useState([]);
  useEffect(() => {});
  useEffect(() => {
    setDragLinks(links);
  }, []);

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/">
        {/*   <Route
          path="dashboard"
          element={user ? <Dashboard /> : <Navigate to="/" />}
        /> */}
        <Route index element={<Login />} />
        <Route path="signup" element={<Register />} />
        <Route
          path="resetpassword/:resetpasswordToken"
          element={<ForgotPassword />}
        />
        <Route path="admin" element={user ? <Admin /> : <Navigate to="/" />}>
          <Route
            path="links"
            element={
              <Links dragLinks={dragLinks} setDragLinks={setDragLinks} />
            }
          />
          <Route path="appearance" element={<Appearance />} />
        </Route>
        <Route path="*" element={<h1>404</h1>} />
        {/*      <Route path="/:username" element={<SinglePage />} /> */}
      </Route>
    )
  );

  return (
    <>
      <RouterProvider router={router} />
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
