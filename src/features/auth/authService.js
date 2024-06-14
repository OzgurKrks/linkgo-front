import axios from "axios";
const API_URL = process.env.REACT_APP_API_URL + "users/";

//const API_URL = "http://localhost:5000/api/users/";

// Register user
const register = async (userData) => {
  const response = await axios.post(API_URL, userData);

  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }

  return response.data;
};

// Login user
const login = async (userData) => {
  console.log(API_URL, "asdasdsad");
  const response = await axios.post(API_URL + "login", userData);

  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }

  return response.data;
};

// Reset password
const resetPassword = async (userData) => {
  const response = await axios.put(API_URL + "resetpassword", userData);

  return response.data;
};

// Forgot password
const forgotPassword = async (userData) => {
  const response = await axios.post(API_URL + "forgotpassword", userData);

  return response.data;
};

// Logout user
const logout = () => {
  localStorage.removeItem("user");
};

const authService = {
  register,
  logout,
  login,
  resetPassword,
  forgotPassword,
};

export default authService;
