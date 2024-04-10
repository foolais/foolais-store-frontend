import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import { Provider } from "react-redux";
import store from "./redux/store";
import HomePages from "./pages/HomePages";
import MenuPages from "./pages/MenuPages";
import ErrorPages from "./pages/ErrorPages";
import TablePages from "./pages/TablePages";
import CartPages from "./pages/CartPages";

const router = createBrowserRouter([
  { path: "/", element: <HomePages />, errorElement: <ErrorPages /> },
  { path: "/menu", element: <MenuPages /> },
  { path: "/meja", element: <TablePages /> },
  { path: "/keranjang", element: <CartPages /> },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
