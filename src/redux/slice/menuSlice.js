import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: [
    {
      _id: 1,
      name: "Soto",
      price: 9000,
      quantity: 1,
      is_take_away: false,
      is_available: true,
      category: "Food",
      notes: "hello",
    },
    {
      _id: 2,
      name: "Bakso",
      price: 10000,
      quantity: 1,
      is_take_away: false,
      is_available: true,
      category: "Food",
      notes: "hello",
    },
    {
      _id: 3,
      name: "Mie",
      price: 8000,
      quantity: 1,
      is_take_away: true,
      is_available: true,
      category: "Food",
      notes: "",
    },
  ],
  status: "idle",
  error: null,
};

const menuSlice = createSlice({
  name: "menu",
  initialState,
  reducers: {},
});

export const getMenuData = (state) => state.menu.data;
export const getMenuStatus = (state) => state.menu.status;
export const getMenuError = (state) => state.menu.error;

export default menuSlice.reducer;
