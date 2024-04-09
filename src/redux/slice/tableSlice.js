import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: [
    {
      _id: 1,
      name: "01",
      status: "empty",
      category: "regular",
    },
    {
      _id: 2,
      name: "02",
      status: "waiting",
      category: "take_away",
    },
    {
      _id: 3,
      name: "03",
      status: "eating",
      category: "regular",
    },
    {
      _id: 4,
      name: "03 Kanan",
      status: "finished",
      category: "custom",
    },
  ],
  status: "idle",
  error: null,
};

const tableSlice = createSlice({
  name: "table",
  initialState,
  reducers: {},
});

export const getTableData = (state) => state.table.data;
export const getTableStatus = (state) => state.table.status;
export const getTableError = (state) => state.table.error;

export default tableSlice.reducer;
