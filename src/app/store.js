import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "../features/counter/counterSlice";
import cartSlice from "./cartSlice";
import productsSlice from "./productsSlice";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    prod: productsSlice,
    cart:cartSlice
  },
});
