import { createSlice } from "@reduxjs/toolkit";
import { warningDialog } from "../../utils/utils";

const storedData = localStorage.getItem("table");
const initialData = storedData ? JSON.parse(storedData) : [];

const initialState = {
  data: initialData,
  loading: false,
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
});

export const { handleAddTable, handleUpdateTable, handleDeleteTable } =
  tableSlice.actions;

export default tableSlice.reducer;
