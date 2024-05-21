import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { getToken, sortDataByArray } from "../../utils/utils";

const initialState = {
  data: [],
  loading: false,
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
      const token = getToken();
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
      const token = getToken();
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

// Fetch PUT Menu
export const updateMenu = createAsyncThunk(
  "menu/updateMenu",
  async (payload) => {
    try {
      const token = getToken();
      const headers = { Authorization: token };
      const { _id, ...updatedPayload } = payload;

      const response = await axios.put(
        `${BASE_URL}/menu/update/${_id}`,
        updatedPayload,
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
        if (menu.is_selected) {
          menu.is_selected = false;
        } else if (menu._id === id) {
          menu.is_selected = !menu.is_selected;
        }
      });
    },
    resetSelectedMenu: (state) => {
      state.data.forEach((menu) => {
        if (menu.is_selected) menu.is_selected = false;
      });
    },
    handleUpdateMenu: (state, action) => {
      const { _id } = action.payload;
      const { existingMenuIndex } = getExistingMenu(_id, state);

      if (existingMenuIndex !== -1) {
        const payload = { ...action.payload, is_selected: true };
        state.data[existingMenuIndex] = payload;
      }
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getAllMenu.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllMenu.fulfilled, (state, action) => {
        state.loading = false;
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
        state.loading = false;
        state.error = action.payload.message;
      })
      .addCase(postNewMenu.pending, (state) => {
        state.loading = true;
      })
      .addCase(postNewMenu.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(postNewMenu.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      })
      .addCase(deleteMenu.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteMenu.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(deleteMenu.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      })
      .addCase(updateMenu.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateMenu.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(updateMenu.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      });
  },
});

export const { handleSelectedMenu, resetSelectedMenu, handleUpdateMenu } =
  menuSlice.actions;

export default menuSlice.reducer;
