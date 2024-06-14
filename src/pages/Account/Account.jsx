import React, { useEffect, useState } from "react";
import { Divider, TextField } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { saveDetails } from "../../features/user/userSlice";
import styles from "./Account.module.css";
import { logout } from "../../features/auth/authSlice";

function Account() {
  const { user } = useSelector((state) => state.auth);
  const { userData } = useSelector((state) => state.user);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const [disabled, setDisabled] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    setName(userData.name);
    setEmail(userData.email);
  }, [userData]);

  return (
    <div
      style={{
        width: "100%",
        maxHeight: "100vh",
        overflowY: "auto",
        scrollbarWidth: "thin",
        scrollbarColor: "rgba(0, 0, 0, 0.3) transparent",
        scrollbarGutter: "auto",
        display: "flex",
        justifyContent: "center",
        height: "100%",
      }}
    >
      <div className={styles.accountSettingsWrapper}>
        <div
          style={{
            width: "100%",
            textAlign: "center",
            fontWeight: 500,
            fontSize: "28px",
          }}
        >
          My Account
        </div>
        <div
          style={{
            width: "100%",
            textAlign: "start",
            marginBottom: "30px",
            marginTop: "50px",
            fontWeight: 500,
          }}
        >
          My information
        </div>
        <div style={{ width: "100%", textAlign: "start" }}>
          {" "}
          <TextField
            id="filled-basic"
            label="Name"
            inputMode="text"
            fullWidth
            variant="filled"
            style={{ backgroundColor: "#F7F7FF" }}
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              setDisabled(true);
            }}
            sx={{
              backgroundColor: "white",
              "& .MuiFilledInput-root": {
                border: "none",
                "&:before": {
                  borderBottom: "none",
                },
                "&:after": {
                  borderBottom: "none",
                },
                "&:hover:not(.Mui-disabled):before": {
                  borderBottom: "none",
                },
              },
            }}
          />
          <Divider />
          <TextField
            id="filled-basic"
            label="Email"
            inputMode="text"
            fullWidth
            variant="filled"
            value={email}
            style={{ backgroundColor: "#F7F7FF" }}
            onChange={(e) => {
              setEmail(e.target.value);
              setDisabled(true);
            }}
            sx={{
              backgroundColor: "white",
              "& .MuiFilledInput-root": {
                border: "none",
                "&:before": {
                  borderBottom: "none",
                },
                "&:after": {
                  borderBottom: "none",
                },
                "&:hover:not(.Mui-disabled):before": {
                  borderBottom: "none",
                },
              },
            }}
          />
          <button
            onClick={() => {
              dispatch(
                saveDetails({
                  user,
                  data: { name, email },
                })
              );
            }}
            style={{
              padding: "12px",
              borderRadius: "5px",
              border: "none",
              color: disabled ? "white" : "black",
              backgroundColor: disabled ? "blueviolet" : "white",
              marginTop: "10px",
              cursor: "pointer",
            }}
          >
            Save Details
          </button>
        </div>

        <div
          style={{
            width: "100%",
            textAlign: "start",
            marginBottom: "30px",
            marginTop: "50px",
            fontWeight: 500,
          }}
        >
          Account actions
        </div>
        <div style={{ width: "100%", textAlign: "start" }}>
          <div
            style={{
              width: "100%",
              backgroundColor: "white",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <div style={{ width: "100%", padding: "20px" }}>
              <div
                style={{
                  width: "100%",
                  textAlign: "start",
                  fontSize: "19px",
                  fontWeight: 500,
                }}
              >
                Reset password
              </div>
              <p>
                Reset the password for this account. This will reset the
                password for all Linktrees that you own.
              </p>
              <button className={styles.buttons}>Reset Password</button>
            </div>
          </div>
        </div>
        <div
          style={{
            width: "100%",
            textAlign: "start",
            marginBottom: "30px",
            marginTop: "50px",
            fontWeight: 500,
          }}
        ></div>
        <div style={{ width: "100%", textAlign: "start" }}>
          <div
            style={{
              width: "100%",
              backgroundColor: "white",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <div style={{ width: "100%", padding: "20px" }}>
              <div
                style={{
                  width: "100%",
                  textAlign: "start",
                  fontSize: "19px",
                  fontWeight: 500,
                }}
              >
                Sing out
              </div>
              <p>Sing out of your account.</p>
              <button
                onClick={() => dispatch(logout())}
                className={styles.buttons}
              >
                Sing out
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Account;
