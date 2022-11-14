import { configureStore } from "@reduxjs/toolkit";
import { planReducer } from "./planSlice";
import { cartReducer } from "./cardSlice";

export default configureStore({
    reducer : {
        cart : cartReducer,
        plan : planReducer
    },
});
