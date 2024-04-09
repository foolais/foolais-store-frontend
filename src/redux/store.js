import { configureStore } from "@reduxjs/toolkit";
import menuReducer from "./slice/menuSlice";
import searchBarReducer from "./slice/searchBarSlice";
import cartReducer from "./slice/cartSlice";

const store = configureStore({
  reducer: {
    menu: menuReducer,
    searchBar: searchBarReducer,
    cart: cartReducer,
  },
});

store.subscribe(() => console.log("store changes", store.getState()));
export default store;
