import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import linksReducer from "../features/links/linksSlice";
import userReducer from "../features/user/userSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    links: linksReducer,
    user: userReducer,
  },
});
