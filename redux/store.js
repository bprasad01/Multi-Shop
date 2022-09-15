import { configureStore } from "@reduxjs/toolkit";
// import cartReducer from './cartSlice';
import { cartReducer } from "./cardSlice";

export default configureStore({
    reducer : {
        cart : cartReducer
    },
});
