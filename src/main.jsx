import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import { Provider } from "react-redux";
import store from "./redux/store";
import HomePage from "./pages/HomePage";
import MenuPage from "./pages/MenuPage";

const router = createBrowserRouter([
  { path: "/", element: <HomePage /> },
  { path: "/menu", element: <MenuPage /> },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
