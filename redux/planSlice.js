import { createSlice } from "@reduxjs/toolkit";

const planSlice = createSlice({
  name: "plan",
  initialState: {
    products: [],
    quantity: 0,
    total: 0,
  },
  reducers: {
    addPlan: (state, action) => {
      state.products.push(action.payload);
      // state.quantity += 1;
      // // calculating the total price of the added product
      // state.total += action.payload.price * action.payload.quantity;
    },
  },
});

export const planReducer = planSlice.reducer;
export const {
  addPlan
} = planSlice.actions;
