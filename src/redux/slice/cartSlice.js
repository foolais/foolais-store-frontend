import { createSlice } from "@reduxjs/toolkit";

const getExistingCart = (_id, is_take_away, state) => {
  const existingCartIndex = state.data.findIndex(
    (item) => item._id === _id && item.is_take_away === is_take_away
  );
  const existingCart = state.data[existingCartIndex];

  return { existingCartIndex, existingCart };
};

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    data: [],
  },
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
  },
});

export const getCartData = (state) => state.cart.data;

export const { handleAddToCart } = cartSlice.actions;

export default cartSlice.reducer;
