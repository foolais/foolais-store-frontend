import { createSlice } from "@reduxjs/toolkit";

const sidenavSlice = createSlice({
  name: "sidenav",
  initialState: {
    isMini: true,
  },
  reducers: {
    toggleSidenav: (state) => {
      state.isMini = !state.isMini;
    },
  },
});

export const { toggleSidenav } = sidenavSlice.actions;

export default sidenavSlice.reducer;
