import { createSlice } from "@reduxjs/toolkit";
import { getLocalStorage, successDialog } from "../../utils/utils";

const storedData = JSON.parse(localStorage.getItem("cart"));
const initialData = storedData || [];

const getExistingCart = (_id, is_take_away, state) => {
  const existingCartIndex = state.data.findIndex(
    (item) => item._id === _id && item.is_take_away === is_take_away
  );
  const existingCart = state.data[existingCartIndex];

  return { existingCartIndex, existingCart };
};

const initialState = {
  data: initialData?.data || [],
  notes: initialData?.notes || "",
  status: "idle",
  error: null,
  totalPrice: 0,
  table: initialData?.table || null,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    handleAddToCart: (state, action) => {
      const { _id, quantity, is_take_away } = action.payload;
      const { existingCart, existingCartIndex } = getExistingCart(
        _id,
        is_take_away,
        state
      );

      if (existingCartIndex !== -1) {
        existingCart.quantity += quantity;
      } else {
        const newCart = { ...action.payload, quantity: quantity || 1 };
        state.data.push(newCart);
      }

      const cartStorage = getLocalStorage("cart");
      localStorage.setItem(
        "cart",
        JSON.stringify({ ...cartStorage, data: state.data })
      );

      const text =
        existingCartIndex !== -1
          ? `Memperbarui ${existingCart.name} di Keranjang`
          : `Menambahkan ${action.payload.name} di Keranjang`;
      successDialog(text);
    },
    handleChangeNotes: (state, action) => {
      state.notes = action.payload;

      const cartStorage = getLocalStorage("cart");
      localStorage.setItem(
        "cart",
        JSON.stringify({ ...cartStorage, notes: state.notes })
      );
    },
    setTotalPrice: (state, action) => {
      state.totalPrice = action.payload;
    },
    handleRemoveCart: (state, action) => {
      const { _id, is_take_away } = action.payload;
      const { existingCartIndex } = getExistingCart(_id, is_take_away, state);

      // saat ada data id dan is_take_away yang sama
      if (existingCartIndex !== -1) {
        state.data.splice(existingCartIndex, 1);

        const cartStorage = getLocalStorage("cart");
        localStorage.setItem(
          "cart",
          JSON.stringify({ ...cartStorage, data: state.data })
        );
      }
    },

    handleSetTableCart: (state, action) => {
      state.table = action.payload;

      const cartStorage = getLocalStorage("cart");
      localStorage.setItem(
        "cart",
        JSON.stringify({ ...cartStorage, table: state.table })
      );
    },
    handleRemoveAllCart: (state) => {
      state.data = [];
      localStorage.setItem("cart", JSON.stringify({ data: [], table: null }));
    },
    handleUpdateCart: (state, action) => {
      const { _id, is_take_away } = action.payload;
      const { existingCart, existingCartIndex } = getExistingCart(
        _id,
        is_take_away,
        state
      );

      if (existingCartIndex !== -1) {
        const payload = {
          ...existingCart,
          quantity: +action.payload.quantity,
          price: +action.payload.price,
          ...action.payload,
        };

        state.data[existingCartIndex] = payload;

        const cartStorage = getLocalStorage("cart");
        localStorage.setItem(
          "cart",
          JSON.stringify({ ...cartStorage, data: state.data })
        );
      }
    },
  },
});

export const {
  handleAddToCart,
  handleChangeNotes,
  handleRemoveCart,
  handleSetTableCart,
  handleRemoveAllCart,
  handleUpdateCart,
  setTotalPrice,
} = cartSlice.actions;

export default cartSlice.reducer;
