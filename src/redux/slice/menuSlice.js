import { createSlice } from "@reduxjs/toolkit";

const storedData = localStorage.getItem("menu");
const initialData = storedData ? JSON.parse(storedData) : [];

const initialState = {
  data: initialData,
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
          menu.is_selected = !menu.is_selected;
        }
      });
    },
    resetSelectedMenu: (state) => {
      state.data.forEach((menu) => {
        menu.is_selected = false;
      });
    },
    handleAddMenu: (state, action) => {
      const newData = action.payload;
      const isExistingMenu = state.data.some(
        (menu) => menu.name.toLowerCase() === newData.name.toLowerCase()
      );

      if (isExistingMenu)
        return {
          ...state,
          status: "failed",
          error: "Menu sudah ada",
        };

      // add default field
      const newMenu = {
        ...newData,
        price: +newData.price,
        is_take_away: false,
        is_available: true,
        is_selected: false,
        notes: "",
        _id: state.data.length + 1,
      };

      // Update localStorage
      const updatedMenu = [...state.data, newMenu];
      localStorage.setItem("menu", JSON.stringify(updatedMenu));

      return {
        data: updatedMenu,
        status: "idle",
        error: null,
      };
    },
  },
});

export const getMenuData = (state) => state.menu.data;
export const getMenuStatus = (state) => state.menu.status;
export const getMenuError = (state) => state.menu.error;

export const { handleSelectedMenu, resetSelectedMenu, handleAddMenu } =
  menuSlice.actions;

export default menuSlice.reducer;
