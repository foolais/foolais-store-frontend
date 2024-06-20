import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  order: [],
  singleOrder: {},
  onEdit: false,
  loading: false,
  error: null,
};

const BASE_URL = import.meta.env.VITE_BASE_URL;

// get all order
export const getAllOrder = createAsyncThunk("order/getAllOrder", async () => {
  try {
    const response = await axios.get(`${BASE_URL}/order`);
    return response.data;
  } catch (error) {
    return error.message;
  }
});

export const getSingleOrder = createAsyncThunk(
  "order/getSingleOrder",
  async (id) => {
    try {
      const response = await axios.get(`${BASE_URL}/order/${id}`);
      return response.data;
    } catch (error) {
      return error.message;
    }
  }
);

// const getExistingMenuOrder = (_id, is_take_away, state) => {
//   const existingMenuOrderIndex = state.data.menu.findIndex(
//     (item) => item._id === _id && item.is_take_away === is_take_away
//   );
//   const existingMenuOrder = state.data.menu[existingMenuOrderIndex];

//   return { existingMenuOrderIndex, existingMenuOrder };
// };

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    toogleOnEdit: (state) => {
      state.onEdit = !state.onEdit;
    },
    handleChangePaymentMethod: (state, action) => {
      state.singleOrder.paymentMethod = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getAllOrder.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.order = action.payload.data;
      })
      .addCase(getAllOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      })
      .addCase(getSingleOrder.pending, (state) => {
        state.loading = true;
      })
      .addCase(getSingleOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.singleOrder = action.payload.data;
      })
      .addCase(getSingleOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      });
  },
});

export const { toogleOnEdit } = orderSlice.actions;

export default orderSlice.reducer;
