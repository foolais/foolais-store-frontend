import { configureStore } from "@reduxjs/toolkit";
import menuReducer from "./slice/menuSlice";

const store = configureStore({
  reducer: {
    menu: menuReducer,
  },
});

store.subscribe(() => console.log("store changes", store.getState()));
export default store;
