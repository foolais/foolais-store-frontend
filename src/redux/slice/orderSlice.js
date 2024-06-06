import { createSlice } from "@reduxjs/toolkit";

const dummyData = {
  id: 1,
  sequenceNumber: 1,
  table: 1,
  notes: "",
  status: "finished",
  menu: [
    {
      _id: 1,
      name: "Ayam Geprek",
      quantity: 2,
      is_take_away: false,
      price: 15000,
      is_served: true,
    },
    {
      _id: 2,
      name: "Katsu",
      quantity: 2,
      is_take_away: true,
      price: 15000,
      is_served: false,
    },
  ],
  paymentMethod: "cash",
  totalPrice: 30000,
};

const storedData = localStorage.getItem("order");
const initialData = storedData ? JSON.parse(storedData) : dummyData;

const getExistingMenuOrder = (_id, is_take_away, state) => {
  const existingMenuOrderIndex = state.data.menu.findIndex(
    (item) => item._id === _id && item.is_take_away === is_take_away
  );
  const existingMenuOrder = state.data.menu[existingMenuOrderIndex];

  return { existingMenuOrderIndex, existingMenuOrder };
};

const initialState = {
  data: initialData,
  onEdit: false,
  loading: false,
  error: null,
};

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    toogleOnEdit: (state) => {
      state.onEdit = !state.onEdit;
    },
    handleChangeNotes: (state, action) => {
      state.data.notes = action.payload;
    },
    handleUpdateMenuOrder: (state, action) => {
      const { _id, is_take_away } = action.payload;

      const { existingMenuOrder, existingMenuOrderIndex } =
        getExistingMenuOrder(_id, is_take_away, state);

      if (existingMenuOrderIndex !== -1) {
        state.data.menu[existingMenuOrderIndex] = {
          ...existingMenuOrder,
          ...action.payload,
        };
      }

      localStorage.setItem("order", JSON.stringify(state.data));
    },
    handleRemoveMenuOrder: (state, action) => {
      const { _id, is_take_away } = action.payload;
      const { existingMenuOrderIndex } = getExistingMenuOrder(
        _id,
        is_take_away,
        state
      );

      if (existingMenuOrderIndex !== -1) {
        state.data.menu.splice(existingMenuOrderIndex, 1);

        localStorage.setItem("order", JSON.stringify(state.data));
      }
    },
  },
});

export const {
  toogleOnEdit,
  handleChangeNotes,
  handleUpdateMenuOrder,
  handleRemoveMenuOrder,
} = orderSlice.actions;

export default orderSlice.reducer;
