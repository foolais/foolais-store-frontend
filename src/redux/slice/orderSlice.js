import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { getToken } from "../../utils/utils";

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

export const getSingleOrderByTableId = createAsyncThunk(
  "order/getSingleOrderByTableId",
  async (tableId) => {
    try {
      const response = await axios.get(`${BASE_URL}/order/table/${tableId}`);
      return response.data;
    } catch (error) {
      return error.message;
    }
  }
);

export const postNewOrder = createAsyncThunk(
  "order/postNewOrder",
  async (payload) => {
    try {
      const token = getToken();
      const headers = { Authorization: token };
      const response = await axios.post(`${BASE_URL}/order/add`, payload, {
        headers,
      });
      return response.data;
    } catch (error) {
      return error.message;
    }
  }
);

export const updateOrder = createAsyncThunk(
  "order/updateOrder",
  async (payload) => {
    try {
      console.log({ payload });
      const token = getToken();
      const headers = { Authorization: token };
      const { _id, ...restPayload } = payload;

      const response = await axios.put(
        `${BASE_URL}/order/update/${_id}`,
        restPayload,
        {
          headers,
        }
      );

      return response.data;
    } catch (error) {
      return error.message;
    }
  }
);

const getExistingMenuOrder = (_id, is_take_away, state) => {
  const existingMenuOrderIndex = state.singleOrder.menu.findIndex(
    (item) => item._id === _id && item.is_take_away === is_take_away
  );
  const existingMenuOrder = state.singleOrder.menu[existingMenuOrderIndex];

  return { existingMenuOrderIndex, existingMenuOrder };
};

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
    setSingleOrderData: (state, action) => {
      state.singleOrder = action.payload;
    },
    handleChangeMenuOrder: (state, action) => {
      const { _id, is_take_away } = action.payload;
      const { existingMenuOrder, existingMenuOrderIndex } =
        getExistingMenuOrder(_id, is_take_away, state);

      if (existingMenuOrderIndex !== -1) {
        state.singleOrder.menu[existingMenuOrderIndex] = {
          ...existingMenuOrder,
          is_take_away: action.payload.is_take_away,
          ...action.payload,
        };
      }
    },
    handleDeleteMenuOrder: (state, action) => {
      const { _id, is_take_away } = action.payload;
      const { existingMenuOrderIndex } = getExistingMenuOrder(
        _id,
        is_take_away,
        state
      );
      if (existingMenuOrderIndex !== -1) {
        state.singleOrder.menu.splice(existingMenuOrderIndex, 1);
      }
    },
    handleAddMenuOrder: (state, action) => {
      const { _id, is_take_away } = action.payload;

      const { existingMenuOrder, existingMenuOrderIndex } =
        getExistingMenuOrder(_id, is_take_away, state);

      if (existingMenuOrderIndex !== -1) {
        existingMenuOrder.quantity += action.payload.quantity;
      } else {
        state.singleOrder.menu.push(action.payload);
      }
    },
    setSingleOrderNotes: (state, action) => {
      state.singleOrder.notes = action.payload;
    },
    toggleHandleServedMenu: (state, action) => {
      const { _id, is_take_away } = action.payload;
      const { existingMenuOrderIndex } = getExistingMenuOrder(
        _id,
        is_take_away,
        state
      );
      if (existingMenuOrderIndex !== -1) {
        state.singleOrder.menu[existingMenuOrderIndex].is_served =
          !state.singleOrder.menu[existingMenuOrderIndex].is_served;
      }
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
      })
      .addCase(getSingleOrderByTableId.pending, (state) => {
        state.loading = true;
      })
      .addCase(getSingleOrderByTableId.fulfilled, (state, action) => {
        state.loading = false;
        state.singleOrder = action.payload.data;
      })
      .addCase(getSingleOrderByTableId.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      })
      .addCase(postNewOrder.pending, (state) => {
        state.loading = true;
      })
      .addCase(postNewOrder.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(postNewOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      })
      .addCase(updateOrder.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateOrder.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(updateOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      });
  },
});

export const {
  toogleOnEdit,
  setSingleOrderData,
  handleChangeMenuOrder,
  handleDeleteMenuOrder,
  handleAddMenuOrder,
  setSingleOrderNotes,
  toggleHandleServedMenu,
} = orderSlice.actions;

export default orderSlice.reducer;
