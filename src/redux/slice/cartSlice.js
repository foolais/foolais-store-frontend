import { createSlice } from "@reduxjs/toolkit";

const getExistingCart = (_id, is_take_away, state) => {
  const existingCartIndex = state.data.findIndex(
    (item) => item._id === _id && item.is_take_away === is_take_away
  );
  const existingCart = state.data[existingCartIndex];

  return { existingCartIndex, existingCart };
};

const initialState = {
  data: [],
  status: "idle",
  error: null,
  totalPrice: 0,
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
        state.data.push(action.payload);
      }

      const text =
        existingCartIndex !== -1
          ? `Mengupdate ${existingCart.name} di Keranjang`
          : `Menambahkan ${action.payload.name} di Keranjang`;
      console.log(text);
    },
    handleChangeNotes: (state, action) => {
      const { _id, is_take_away, notes } = action.payload;
      const { existingCart } = getExistingCart(_id, is_take_away, state);

      existingCart.notes = notes;
    },
    calculateTotalPrice: (state) => {
      const totalPrice = state.data.reduce((acc, item) => {
        return acc + item.price * item.quantity;
      });

      state.totalPrice = totalPrice;
    },
  },
});

export const getCartData = (state) => state.cart.data;
export const getCartStatus = (state) => state.cart.status;
export const getCartError = (state) => state.cart.error;

export const { handleAddToCart, handleChangeNotes } = cartSlice.actions;

export default cartSlice.reducer;
