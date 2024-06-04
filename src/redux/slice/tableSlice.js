import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getToken, warningDialog } from "../../utils/utils";
import axios from "axios";

const initialState = {
  data: [],
  loading: false,
  error: null,
};

const BASE_URL = import.meta.env.VITE_BASE_URL;

const getExistingTable = (id, state) => {
  const existingTableIndex = state.data.findIndex((item) => item._id === id);
  const existingTable = state.data[existingTableIndex];

  return { existingTableIndex, existingTable };
};

// Fetch Get All Table
export const getAllTable = createAsyncThunk("table/getAllTable", async () => {
  try {
    const response = await axios.get(`${BASE_URL}/table`);
    return response.data;
  } catch (error) {
    return error.message;
  }
});

// Fetch POST All Table
export const postNewTable = createAsyncThunk(
  "menu/postNewTable",
  async (payload) => {
    try {
      const token = getToken();
      const headers = { Authorization: token };
      const response = await axios.post(`${BASE_URL}/table/add`, payload, {
        headers,
      });
      return response.data;
    } catch (error) {
      return error.message;
    }
  }
);

export const updateTable = createAsyncThunk(
  "table/updateTable",
  async (payload) => {
    try {
      const token = getToken();
      const headers = { Authorization: token };
      const { _id, ...updatedPayload } = payload;

      const response = await axios.put(
        `${BASE_URL}/table/update/${_id}`,
        updatedPayload,
        { headers }
      );

      return response.data;
    } catch (error) {
      return error.message;
    }
  }
);

export const deleteTable = createAsyncThunk(
  "table/deleteTable",
  async (payload) => {
    try {
      const token = getToken();
      const headers = { Authorization: token };
      const response = await axios.delete(
        `${BASE_URL}/table/delete/${payload}`,
        { headers }
      );

      return response.data;
    } catch (error) {
      return error.message;
    }
  }
);

const tableSlice = createSlice({
  name: "table",
  initialState,
  reducers: {
    handleUpdateTable: (state, action) => {
      const { _id } = action.payload;
      const { existingTableIndex } = getExistingTable(_id, state);

      if (existingTableIndex !== -1) {
        state.data[existingTableIndex] = action.payload;
        // Update localStorage
        localStorage.setItem("table", JSON.stringify(state.data));
      }
    },
    handleDeleteTable: (state, action) => {
      const _id = action.payload;
      const { existingTableIndex } = getExistingTable(_id, state);

      if (existingTableIndex !== -1) {
        state.data.splice(existingTableIndex, 1);
        // Update localStorage
        localStorage.setItem("table", JSON.stringify(state.data));
      }
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getAllTable.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllTable.fulfilled, (state, action) => {
        state.loading = false;
        const { data } = action.payload;
        state.data = data;
      })
      .addCase(getAllTable.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(postNewTable.pending, (state) => {
        state.loading = true;
      })
      .addCase(postNewTable.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(postNewTable.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      })
      .addCase(updateTable.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateTable.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(updateTable.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      })
      .addCase(deleteTable.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteTable.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(deleteTable.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      });
  },
});

export const { handleUpdateTable, handleDeleteTable } = tableSlice.actions;

export default tableSlice.reducer;
