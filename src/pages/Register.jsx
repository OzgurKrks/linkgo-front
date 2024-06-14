import { TextField, Button, Typography, Container, Grid } from "@mui/material";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { register, reset } from "../features/auth/authSlice";
import { toast } from "react-toastify";

const Register = () => {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const dispatch = useDispatch();

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  const handleSubmit = (event) => {
    event.preventDefault();

    if (
      userName !== "" &&
      email !== "" &&
      password !== "" &&
      confirmPassword !== ""
    ) {
      if (password === confirmPassword) {
        dispatch(
          register({
            username: userName,
            email: email,
            password: password,
          })
        );
      } else {
        toast.error("passwords do not match!");
      }
    } else {
      toast.warn("fill in all fields");
    }
  };
  useEffect(() => {
    if (isSuccess) {
      toast.success("transaction successful");
    }
    if (isError) {
      toast.error("transaction failed");
    }
    setUserName("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    dispatch(reset());
  }, [isSuccess, isError]);

  return (
    <Container
      maxWidth="xs"
      style={{
        minHeight: "80vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="h4" align="center">
            Sign Up
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <form onSubmit={handleSubmit}>
            <TextField
              InputProps={{ sx: { borderRadius: "0.5rem" } }}
              required
              label="User Name"
              fullWidth
              margin="normal"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              sx={{ borderRadius: "10px" }}
            />
            <TextField
              InputProps={{ sx: { borderRadius: "0.5rem" } }}
              required
              label="Email"
              fullWidth
              margin="normal"
              variant="outlined"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              InputProps={{ sx: { borderRadius: "0.5rem" } }}
              required
              label="Password"
              fullWidth
              margin="normal"
              variant="outlined"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <TextField
              InputProps={{ sx: { borderRadius: "0.5rem" } }}
              required
              label="Confirm Password"
              fullWidth
              margin="normal"
              variant="outlined"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <Button
              onClick={handleSubmit}
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              size="large"
              style={{
                marginTop: "1rem",
                borderRadius: "4rem",
                padding: "12px",
              }}
            >
              Sign Up
            </Button>
          </form>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Register;
