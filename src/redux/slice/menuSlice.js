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

      if (!existingMenu?.name) return;

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
        quantity: 1,
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
    handleDeleteMenu: (state, action) => {
      const _id = action.payload;
      const { existingMenuIndex } = getExistingMenu(_id, state);

      // saat ada data id yang sama
      if (existingMenuIndex !== -1) {
        state.data.splice(existingMenuIndex, 1);
        // update local storage
        localStorage.setItem("menu", JSON.stringify(state.data));
      }
    },
    handleUpdateMenu: (state, action) => {
      const { _id } = action.payload;
      const { existingMenuIndex } = getExistingMenu(_id, state);

      if (existingMenuIndex !== -1) {
        state.data[existingMenuIndex] = action.payload;
        // update local storage
        localStorage.setItem("menu", JSON.stringify(state.data));
      }
    },
  },
});

export const getMenuData = (state) => state.menu.data;
export const getMenuStatus = (state) => state.menu.status;
export const getMenuError = (state) => state.menu.error;

export const {
  handleSelectedMenu,
  resetSelectedMenu,
  handleAddMenu,
  handleDeleteMenu,
  handleUpdateMenu,
} = menuSlice.actions;

export default menuSlice.reducer;
