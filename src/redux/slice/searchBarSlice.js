import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: "",
};

const searchBarSlice = createSlice({
  name: "searchBar",
  initialState,
  reducers: {
    handleSearchData: (state, action) => {
      state.data = action.payload;
    },
  },
});

export const getSearchData = (state) => state.searchBar.data;

export const { handleSearchData } = searchBarSlice.actions;

export default searchBarSlice.reducer;
