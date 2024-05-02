import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { sortDataByArray } from "../../utils/utils";

const storedData = localStorage.getItem("menu");
const initialData = storedData ? JSON.parse(storedData) : [];

const initialState = {
  data: initialData,
  status: "idle",
  error: null,
};

const BASE_URL = import.meta.env.VITE_BASE_URL;

// Fetch Get All Menu
export const getAllMenu = createAsyncThunk("menu/getAllMenu", async () => {
  try {
    const response = await axios.get(`${BASE_URL}/menu`);
    const { data } = response.data;
    const category = ["food", "drink", "extra"];
    const sortedData = sortDataByArray(data, category);
    return { ...response.data, data: sortedData };
  } catch (error) {
    return error.message;
  }
});

//Fetch POST New Menu
export const postNewMenu = createAsyncThunk(
  "menu/postNewMenu",
  async (payload) => {
    try {
      const token = JSON.parse(localStorage.getItem("user"))?.token;
      const headers = { Authorization: token };
      const response = await axios.post(`${BASE_URL}/menu/add`, payload, {
        headers,
      });
      return response.data;
    } catch (error) {
      return error.message;
    }
  }
);
//Fetch DELETE Menu
export const deleteMenu = createAsyncThunk(
  "menu/deleteMenu",
  async (payload) => {
    try {
      const token = JSON.parse(localStorage.getItem("user"))?.token;
      const headers = { Authorization: token };
      const response = await axios.delete(
        `${BASE_URL}/menu/delete/${payload}`,
        {
          headers,
        }
      );
      return response.data;
    } catch (error) {
      return error.message;
    }
  }
);

// get same data by id
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
  extraReducers(builder) {
    builder
      .addCase(getAllMenu.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getAllMenu.fulfilled, (state, action) => {
        state.status = "success";
        const data = action.payload.data.map((item) => {
          return {
            ...item,
            is_selected: false,
            quantity: 1,
          };
        });
        state.data = data;
      })
      .addCase(getAllMenu.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload.message;
      })
      .addCase(postNewMenu.pending, (state) => {
        state.status = "loading";
      })
      .addCase(postNewMenu.fulfilled, (state) => {
        state.status = "success";
      })
      .addCase(postNewMenu.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload.message;
      })
      .addCase(deleteMenu.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteMenu.fulfilled, (state) => {
        state.status = "success";
      })
      .addCase(deleteMenu.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload.message;
      });
  },
});

export const getMenuData = (state) => state.menu.data;
export const getMenuStatus = (state) => state.menu.status;
export const getMenuError = (state) => state.menu.error;

export const { handleSelectedMenu, resetSelectedMenu, handleUpdateMenu } =
  menuSlice.actions;

export default menuSlice.reducer;
