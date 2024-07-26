import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  data: {
    totalMenu: 0,
    totalTable: 0,
    totalOrder: 0,
    totalEarnings: 0,
    earningPerMonth: [0, 0, 0, 0],
  },
  loading: false,
  error: null,
};

const BASE_URL = import.meta.env.VITE_BASE_URL;

export const getAllOverview = createAsyncThunk(
  "overview/getAllOverview",
  async () => {
    try {
      const response = await axios.get(`${BASE_URL}/overview`);
      return response.data;
    } catch (error) {
      return error.message;
    }
  }
);

export const getEaringPerMonth = createAsyncThunk(
  "overview/getEaringPerMonth",
  async () => {
    try {
      const month = new Date().getMonth();
      const year = new Date().getFullYear();

      const response = await axios.get(
        `${BASE_URL}/overview/earnings?month=${month + 1}&year=${year}`
      );
      return response.data;
    } catch (error) {
      return error.message;
    }
  }
);

const overviewSlice = createSlice({
  name: "overview",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getAllOverview.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllOverview.fulfilled, (state, action) => {
        state.loading = false;

        const { totalMenu, totalTable, totalOrder, totalEarnings } =
          action.payload.data;
        state.data = {
          ...state.data,
          totalMenu,
          totalTable,
          totalOrder,
          totalEarnings,
        };
      })
      .addCase(getAllOverview.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(getEaringPerMonth.pending, (state) => {
        state.loading = true;
      })
      .addCase(getEaringPerMonth.fulfilled, (state, action) => {
        state.loading = false;
        state.data.earningPerMonth = action.payload.data;
      })
      .addCase(getEaringPerMonth.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default overviewSlice.reducer;
