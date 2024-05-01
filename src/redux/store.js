import { configureStore } from "@reduxjs/toolkit";
import menuReducer from "./slice/menuSlice";
import searchBarReducer from "./slice/searchBarSlice";
import cartReducer from "./slice/cartSlice";
import tableReducer from "./slice/tableSlice";
import loginReducer from "./slice/loginSlice";

const store = configureStore({
  reducer: {
    menu: menuReducer,
    searchBar: searchBarReducer,
    cart: cartReducer,
    table: tableReducer,
    login: loginReducer,
  },
});

store.subscribe(() => console.log("store changes", store.getState()));
export default store;
