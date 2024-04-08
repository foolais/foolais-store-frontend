import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: [
    {
      _id: 1,
      name: "Soto Bakso Daging",
      price: 9000,
      quantity: 1,
      is_take_away: false,
      is_available: true,
      is_selected: false,
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
      is_selected: false,
      category: "Food",
      notes: "hello",
    },
    {
      _id: 3,
      name: "Mie Ayam Bakso",
      price: 8000,
      quantity: 1,
      is_take_away: false,
      is_available: true,
      is_selected: false,
      category: "Food",
      notes: "",
    },
  ],
  status: "idle",
  error: null,
};

const getExistingMenu = (id, state) => {
  const existingMenuIndex = state.data.findIndex((item) => item._id === id);
  const existingMenu = state.data[existingMenuIndex];

  return { existingMenuIndex, existingMenu };
};

const menuSlice = createSlice({
  name: "menu",
  initialState,
  reducers: {
    handleSelectedMenu: (state, action) => {
      const id = action.payload;
      const { existingMenu } = getExistingMenu(id, state);

      if (existingMenu === -1) return;

      state.data.forEach((menu) => {
        if (menu._id !== id) {
          menu.is_selected = false;
        } else {
          menu.is_selected = true;
        }
      });
    },
  },
});

export const getMenuData = (state) => state.menu.data;
export const getMenuStatus = (state) => state.menu.status;
export const getMenuError = (state) => state.menu.error;

export const { handleSelectedMenu } = menuSlice.actions;

export default menuSlice.reducer;
