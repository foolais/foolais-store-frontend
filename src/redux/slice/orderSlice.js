import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: {},
  onEdit: false,
  loading: false,
  error: null,
};

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    toogleOnEdit: (state) => {
      state.onEdit = !state.onEdit;
    },
    handleChangeNotes: (state, action) => {
      state.data.notes = action.payload;
    },
  },
});

export const { toogleOnEdit, handleChangeNotes } = orderSlice.actions;

export default orderSlice.reducer;
