import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { warningDialog } from "../../utils/utils";
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

const tableSlice = createSlice({
  name: "table",
  initialState,
  reducers: {
    handleAddTable: (state, action) => {
      const newData = action.payload;
      const isExistingTable = state.data.some(
        (table) => table.name.toLowerCase() === newData.name.toLowerCase()
      );

      if (isExistingTable) {
        warningDialog(`Meja ${newData.name} Sudah Ada`);
        return {
          ...state,
          loading: false,
          error: "Meja sudah ada",
        };
      }

      const newTable = {
        ...newData,
        type: "dine_in",
        status: "empty",
        _id: state.data.length + 1,
      };

      // Update localStorage
      const updatedTable = [...state.data, newTable];
      localStorage.setItem("table", JSON.stringify(updatedTable));

      return {
        data: updatedTable,
        loading: false,
        error: null,
      };
    },
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
      });
  },
});

export const { handleAddTable, handleUpdateTable, handleDeleteTable } =
  tableSlice.actions;

export default tableSlice.reducer;
