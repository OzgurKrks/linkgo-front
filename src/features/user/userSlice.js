import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL + "users/";

const initialState = {
  userData: [],
};

// get user data
export const getMe = createAsyncThunk("user/getMe", async (user, thunkAPI) => {
  try {
    const response = await axios.get(API_URL + "getMe", {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
    return response.data;
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const saveDetails = createAsyncThunk(
  "user/saveDetail",
  async ({ user, data }, thunkAPI) => {
    try {
      const response = await axios.put(
        `${API_URL}/editAccount`,
        { ...data },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState,

  extraReducers: (builder) => {
    builder
      .addCase(getMe.pending, (state) => {})
      .addCase(getMe.fulfilled, (state, action) => {
        state.userData = action.payload;
      })
      .addCase(getMe.rejected, (state, action) => {})
      .addCase(saveDetails.fulfilled, (state, action) => {
        state.userData = action.payload;
      });
  },
});

export default userSlice.reducer;
