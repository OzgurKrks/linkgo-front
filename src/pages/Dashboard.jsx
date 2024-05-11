import React from "react";
import { Button } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../features/auth/authSlice";
function Dashboard() {
  const dispatch = useDispatch();
  return (
    <div
      style={{
        height: "90vh",
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontSize: "30px",
      }}
    >
      <div>
        <div>Dashboard</div>
        <Button
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
          onClick={() => dispatch(logout())}
        >
          Log out
        </Button>
      </div>
    </div>
  );
}

export default Dashboard;
