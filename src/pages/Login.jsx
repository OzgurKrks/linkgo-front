import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { login, forgotPassword, reset } from "../features/auth/authSlice";
import { toast } from "react-toastify";
import {
  TextField,
  Button,
  Typography,
  Container,
  Grid,
  IconButton,
  InputAdornment,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [forgotPasswordState, setForgotPasswordState] = useState(false);
  const [forgotEmail, setForgotEmail] = useState("");

  const dispatch = useDispatch();

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();

    if (email !== "" && password !== "") {
      dispatch(
        login({
          email,
          password,
        })
      );
    } else {
      toast.warn("fill in all fields");
    }
  };

  const forgotPasswordHandleSubmit = (event) => {
    event.preventDefault();
    if (forgotEmail !== "") {
      dispatch(forgotPassword({ email: forgotEmail }));
    } else {
      toast.warn("enter email!");
    }
  };

  const handleTogglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success("transaction successful");
    }
    if (isError) {
      toast.error(message);
    }
    if ((isSuccess || user) && !forgotEmail) {
      navigate("/dashboard");
    }

    setEmail("");
    setPassword("");

    dispatch(reset());
  }, [user, isSuccess, isError]);

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
            {forgotPasswordState ? "Enter Email" : "Login"}
          </Typography>
        </Grid>
        {forgotPasswordState ? (
          <Grid item xs={12}>
            <form>
              <TextField
                required
                label="Email"
                fullWidth
                margin="normal"
                variant="outlined"
                value={forgotEmail}
                onChange={(e) => setForgotEmail(e.target.value)}
              />
              <Button
                onClick={forgotPasswordHandleSubmit}
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                size="large"
                style={{ marginTop: "1rem", borderRadius: "4rem" }}
              >
                Submit
              </Button>
            </form>
          </Grid>
        ) : (
          <Grid item xs={12}>
            <form onSubmit={handleSubmit}>
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
                type={showPassword ? "password" : "text"}
                label="Password"
                fullWidth
                margin="normal"
                variant="outlined"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                InputProps={{
                  sx: { borderRadius: "0.5rem" },
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={handleTogglePasswordVisibility}>
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <div
                onClick={() => setForgotPasswordState(true)}
                style={{ cursor: "pointer", color: "#3e4a61", opacity: "0.8" }}
              >
                forgot password?
              </div>

              <Button
                onClick={handleSubmit}
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                size="large"
                style={{ marginTop: "1rem", borderRadius: "4rem" }}
              >
                Login
              </Button>
            </form>
            <div
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
                marginTop: "10px",
              }}
            >
              {" "}
              <p
                style={{ cursor: "pointer", color: "#3e4a61", opacity: "0.8" }}
              >
                Don't have an account?{" "}
                <span
                  onClick={() => navigate("/signup")}
                  style={{ color: "#3498db" }}
                >
                  Sign up
                </span>
              </p>
            </div>
          </Grid>
        )}
      </Grid>
    </Container>
  );
};

export default Login;
