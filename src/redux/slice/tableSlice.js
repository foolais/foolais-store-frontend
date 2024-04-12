import { createSlice } from "@reduxjs/toolkit";

const storedData = localStorage.getItem("table");
const initialData = storedData ? JSON.parse(storedData) : [];

const initialState = {
  data: initialData,
  status: "idle",
  error: null,
};

const getExistingTable = (id, state) => {
  const existingTableIndex = state.data.findIndex((item) => item._id === id);
  const existingTable = state.data[existingTableIndex];

  return { existingTableIndex, existingTable };
};

const tableSlice = createSlice({
  name: "table",
  initialState,
  reducers: {
    handleAddTable: (state, action) => {
      const newData = action.payload;
      const isExistingTable = state.data.some(
        (table) => table.name.toLowerCase() === newData.name.toLowerCase()
      );

      if (isExistingTable)
        return {
          ...state,
          status: "failed",
          error: "Meja sudah ada",
        };

      const newTable = {
        ...newData,
        status: "empty",
        _id: state.data.length + 1,
      };

      // Update localStorage
      const updatedTable = [...state.data, newTable];
      localStorage.setItem("table", JSON.stringify(updatedTable));

      return {
        data: updatedTable,
        status: "idle",
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
  },
});

export const getTableData = (state) => state.table.data;
export const getTableStatus = (state) => state.table.status;
export const getTableError = (state) => state.table.error;

export const { handleAddTable, handleUpdateTable } = tableSlice.actions;

export default tableSlice.reducer;
