import { configureStore } from "@reduxjs/toolkit";
import menuReducer from "./slice/menuSlice";
import searchBarReducer from "./slice/searchBarSlice";
import cartReducer from "./slice/cartSlice";
import tableReducer from "./slice/tableSlice";
import authReducer from "./slice/authSlice";
import orderReducer from "./slice/orderSlice";
import sidenavReducer from "./slice/sidenavSlice";
import overviewReducer from "./slice/overviewSlice";

const store = configureStore({
  reducer: {
    menu: menuReducer,
    searchBar: searchBarReducer,
    cart: cartReducer,
    table: tableReducer,
    auth: authReducer,
    order: orderReducer,
    sidenav: sidenavReducer,
    overview: overviewReducer,
  },
});

store.subscribe(() => console.log("store changes", store.getState()));
export default store;
