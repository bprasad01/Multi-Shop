import { createSlice } from "@reduxjs/toolkit";
// let localState = {};
// localState = typeof window !== "undefined"
// const items = localState && localStorage.getItem('cartItems') !== null ? JSON.parse(localStorage.getItem('cartItems')) : []
const cartSlice = createSlice({
    name : 'cart',
    initialState : [],
    reducers : {
        addToCart : (state, action) => {
            const itemExists = state.find(item => item.id === action.payload.id);
            if(itemExists){
                itemExists.quantity++;
            } else {
                state.push({...action.payload, quantity : 1})
            }
            // localStorage.setItem('cartItems', JSON.stringify(state))
        },
        incrementQuantity : (state, action) => {
            const item = state.find(item => item.id === action.payload);
            item.quantity++;
        },
        decrementQuantity : (state, action) => {
            const item = state.find(item => item.id === action.payload);
            if(item.quantity === 1){
                const index = state.findIndex(item => item.id === action.payload)
                state.splice(index,1);

            } else {
                item.quantity--;
            }
        },
        removeFromCart : (state,action) => {
            const index = state.findIndex(item => item.id === action.payload);
            state.splice(index,1);
        }
    }
})

export const cartReducer = cartSlice.reducer;
export const { addToCart, incrementQuantity, decrementQuantity, removeFromCart } = cartSlice.actions;