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
        const newCart = { ...action.payload, quantity: quantity || 1 };
        state.data.push(newCart);
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
    handleRemoveCart: (state, action) => {
      const { _id, is_take_away } = action.payload;
      const { existingCartIndex } = getExistingCart(_id, is_take_away, state);

      // saat ada data id dan is_take_away yang sama
      if (existingCartIndex !== -1) {
        state.data.splice(existingCartIndex, 1);
      }
    },
  },
});

export const getCartData = (state) => state.cart.data;
export const getCartStatus = (state) => state.cart.status;
export const getCartError = (state) => state.cart.error;

export const { handleAddToCart, handleChangeNotes, handleRemoveCart } =
  cartSlice.actions;

export default cartSlice.reducer;
