import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { resetPassword, reset } from "../features/auth/authSlice";
import { toast } from "react-toastify";
import { TextField, Button, Typography, Container, Grid } from "@mui/material";

const ForgotPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { resetpasswordToken } = useParams();
  const dispatch = useDispatch();

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    if (password !== "" && confirmPassword !== "") {
      if (password === confirmPassword) {
        dispatch(
          resetPassword({
            resetPasswordToken: resetpasswordToken,
            password,
          })
        );
      } else {
        toast.warn("passwords do not match! ");
      }
    } else {
      toast.warn("fill in all fields");
    }
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success("successful");
      navigate("/");
    }
    if (isError) {
      toast.error("something went wrong!");
    }
    dispatch(reset());
  }, [isLoading, isError, isSuccess, message]);

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
            Enter New Password
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <form onSubmit={handleSubmit}>
            <TextField
              InputProps={{ sx: { borderRadius: "0.5rem" } }}
              label="Password"
              fullWidth
              margin="normal"
              variant="outlined"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <TextField
              InputProps={{ sx: { borderRadius: "0.5rem" } }}
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
              style={{ marginTop: "1rem", borderRadius: "4rem" }}
            >
              Submit
            </Button>
          </form>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ForgotPassword;
