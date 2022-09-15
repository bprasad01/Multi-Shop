import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name : "cart",
    initialState : {
        products : [],
        quantity : 0,
        total : 0,
    },
    reducers : {
        addProduct : ( state, action) => {
            state.products.push(action.payload);
            state.quantity += 1;
           // calculating the total price of the added product
           state.total += action.payload.prices.price * action.payload.quantity;
        },
        removeFromCart: (state, action) => {
            const index = state.findIndex((item) => item.id === action.payload);
            state.splice(index, 1);
          },
    }
})  

export const { addProduct, removeFromCart } = cartSlice.actions;
export default cartSlice.reducer;