import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { getToken, sortDataByArray } from "../../utils/utils";

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
    const { data } = response.data;
    const sortedData = sortDataByArray(data, [], "order");
    return { ...response.data, data: sortedData };
  } catch (error) {
    return error.message;
  }
});

export const getSingleOrder = createAsyncThunk(
  "order/getSingleOrder",
  async (id) => {
    try {
      const response = await axios.get(`${BASE_URL}/order/${id}`);
      const category = ["food", "drink", "extra"];
      const { menu } = response.data.data;
      console.log({ menu });
      const sortedMenu = sortDataByArray(menu, category, "menu");
      const payload = {
        ...response.data,
        menu: sortedMenu,
      };
      return payload;
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

export const deleteOrder = createAsyncThunk("order/deleteOrder", async (id) => {
  try {
    const token = getToken();
    const headers = { Authorization: token };
    const response = await axios.delete(`${BASE_URL}/order/delete/${id}`, {
      headers,
    });
    return response.data;
  } catch (error) {
    return error.message;
  }
});

export const finishOrder = createAsyncThunk(
  "order/finishOrder",
  async (payload) => {
    try {
      const { _id } = payload;
      delete payload._id;
      const token = getToken();
      const headers = { Authorization: token };
      const response = await axios.post(
        `${BASE_URL}/order/update/status?id=${_id}&is_finished=true`,
        payload,
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

export const toggleServedMenu = createAsyncThunk(
  "order/toggleServedMenu",
  async (payload) => {
    try {
      const { order_id, menu_id } = payload;
      if (!order_id || !menu_id) throw new Error("Missing order_id or menu_id");
      const token = getToken();
      const headers = { Authorization: token };
      const response = await axios.post(
        `${BASE_URL}/order/update/menu/status?order_id=${order_id}&menu_id=${menu_id}`,
        payload,
        { headers }
      );
      return response.data;
    } catch (error) {
      return error;
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
    setSingleOrderData: (state, action) => {
      state.singleOrder = action.payload;
    },
    setSingleOrderNotes: (state, action) => {
      state.singleOrder.notes = action.payload;
    },
    setSingleOrderTypePayment: (state, action) => {
      state.singleOrder.payment_method = action.payload;
    },
    setSingleOrderTotalPrice: (state, action) => {
      state.singleOrder.total_price = action.payload;
    },
    setSingleOrderTable: (state, action) => {
      state.singleOrder.table = action.payload;
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
      })
      .addCase(deleteOrder.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteOrder.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(deleteOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      })
      .addCase(finishOrder.pending, (state) => {
        state.loading = true;
      })
      .addCase(finishOrder.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(finishOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      })
      .addCase(toggleServedMenu.pending, (state) => {
        state.loading = true;
      })
      .addCase(toggleServedMenu.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(toggleServedMenu.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      });
  },
});

export const {
  toogleOnEdit,
  handleChangeMenuOrder,
  handleDeleteMenuOrder,
  handleAddMenuOrder,
  setSingleOrderData,
  setSingleOrderNotes,
  setSingleOrderTypePayment,
  setSingleOrderTotalPrice,
  setSingleOrderTable,
  toggleHandleServedMenu,
} = orderSlice.actions;

export default orderSlice.reducer;
