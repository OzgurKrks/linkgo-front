import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "https://linkgo-backend-kuok.vercel.app/api/links/";

const initialState = {
  links: [],
  updateLinksData: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

// Get links
export const getLinks = createAsyncThunk(
  "links/getLinks",
  async (user, thunkAPI) => {
    try {
      const response = await axios.get(API_URL + "getlinks", {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
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

export const linksSlice = createSlice({
  name: "links",
  initialState,
  reducers: {
    updateLinksDataHandler: (state, action) => {
      state.updateLinksData = action.payload;
    },
    reset: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getLinks.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.isSuccess = false;
        state.message = "";
      })
      .addCase(getLinks.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.links = action.payload;
      })
      .addCase(getLinks.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});
export const { updateLinksDataHandler, reset } = linksSlice.actions;

export default linksSlice.reducer;
