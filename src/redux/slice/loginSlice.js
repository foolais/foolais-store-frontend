import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  data: "",
  loading: false,
  error: null,
};

const BASE_URL = import.meta.env.VITE_BASE_URL;

// POST Login data
export const postLogin = createAsyncThunk(
  "login/postLogin",
  async (payload) => {
    try {
      const response = await axios.post(`${BASE_URL}/user/login`, payload);
      return response.data;
    } catch (error) {
      return error.message;
    }
  }
);

const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    handleLogout: (state) => {
      localStorage.removeItem("user");
      state.data = "";
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(postLogin.pending, (state) => {
        state.loading = true;
        localStorage.removeItem("user");
      })
      .addCase(postLogin.fulfilled, (state, action) => {
        const { data } = action.payload;
        if (data !== undefined) {
          state.loading = false;
          state.data = data;
          localStorage.setItem("user", JSON.stringify(data));
        } else {
          state.data = "";
          state.loading = false;
        }
      })
      .addCase(postLogin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
        localStorage.removeItem("user");
      });
  },
});

export const { handleLogout } = loginSlice.actions;

export default loginSlice.reducer;
