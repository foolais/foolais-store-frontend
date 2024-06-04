import { createSlice } from "@reduxjs/toolkit";
import { successDialog } from "../../utils/utils";

const storedData = localStorage.getItem("cart");
const initialData = storedData ? JSON.parse(storedData) : [];

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
  loading: false,
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

      localStorage.setItem(
        "cart",
        JSON.stringify({ data: state.data, table: state.table })
      );

      const text =
        existingCartIndex !== -1
          ? `Memperbarui ${existingCart.name} di Keranjang`
          : `Menambahkan ${action.payload.name} di Keranjang`;
      successDialog(text);
    },
    handleChangeNotes: (state, action) => {
      state.notes = action.payload;

      localStorage.setItem(
        "cart",
        JSON.stringify({ ...state, notes: state.notes })
      );
    },
    calculateTotalPrice: (state) => {
      const totalPrice = state.data.reduce((acc, item) => {
        return acc + item.price * item.quantity;
      });

      state.totalPrice = totalPrice;
    },
    handleRemoveCart: (state, action) => {
      const { _id, is_take_away } = action.payload;
      const { existingCartIndex } = getExistingCart(_id, is_take_away, state);

      // saat ada data id dan is_take_away yang sama
      if (existingCartIndex !== -1) {
        state.data.splice(existingCartIndex, 1);

        localStorage.setItem(
          "cart",
          JSON.stringify({ data: state.data, table: state.table })
        );
      }
    },

    handleSetTableCart: (state, action) => {
      state.table = action.payload;
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

      console.log(JSON.parse(JSON.stringify(existingCart)));

      if (existingCartIndex !== -1) {
        state.data[existingCartIndex] = { ...existingCart, ...action.payload };

        console.log({ data: state.data[existingCartIndex] });

        localStorage.setItem(
          "cart",
          JSON.stringify({ ...state, data: state.data })
        );
      }
    },
  },
});

export const getCartData = (state) => state.cart.data;
export const getCartStatus = (state) => state.cart.status;
export const getCartError = (state) => state.cart.error;
export const getCartTable = (state) => state.cart.table;
export const getCartTotalPrice = (state) => state.cart.totalPrice;

export const {
  handleAddToCart,
  handleChangeNotes,
  handleRemoveCart,
  handleSetTableCart,
  handleRemoveAllCart,
  handleUpdateCart,
} = cartSlice.actions;

export default cartSlice.reducer;
