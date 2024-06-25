import { createSlice } from "@reduxjs/toolkit";
import { successDialog } from "../../utils/utils";

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

      localStorage.setItem(
        "cart",
        JSON.stringify({ ...storedData, data: state.data })
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
        JSON.stringify({ ...storedData, notes: state.notes })
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
          JSON.stringify({ ...storedData, data: state.data })
        );
      }
    },

    handleSetTableCart: (state, action) => {
      state.table = action.payload;
      localStorage.setItem(
        "cart",
        JSON.stringify({ ...storedData, table: state.table })
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

        localStorage.setItem(
          "cart",
          JSON.stringify({ ...storedData, data: state.data })
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
} = cartSlice.actions;

export default cartSlice.reducer;
