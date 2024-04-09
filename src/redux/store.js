import { configureStore } from "@reduxjs/toolkit";
import menuReducer from "./slice/menuSlice";
import searchBarReducer from "./slice/searchBarSlice";

const store = configureStore({
  reducer: {
    menu: menuReducer,
    searchBar: searchBarReducer,
  },
});

store.subscribe(() => console.log("store changes", store.getState()));
export default store;
