import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { buyProduct, getCart,removeProduct } from "./cartAPI";

const initialState = {
  orders: [],
  status: "idle",
};

export const getcartAsync = createAsyncThunk("cart/getCart", async () => {
  const response = await getCart();
  return response.data;
});

export const buyAsync = createAsyncThunk(
  "cart/buyProduct",
  async (newProd) => {
    const response = await buyProduct(newProd);
    return response.data;
  }
);

export const removeProductAsync = createAsyncThunk(
  "cart/removeProduct",
  async (id) => {
    const response = await removeProduct(id);
    return id;
  }
);

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    // // add: (state, action) => {
    // //   console.log(action.payload);
    // //   state.cart.push(action.payload);
    // // },
    // remove: (state) => {
    //   state.value -= 1;
    // },
    // update: (state, action) => {
    //   state.value += action.payload;
    // },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getcartAsync.fulfilled, (state, action) => {
        state.orders = action.payload;
        console.log(action.payload);
      })
      .addCase(buyAsync.fulfilled, (state, action) => {
        state.orders.push(action.payload);
        console.log(action.payload);
      }).addCase(removeProductAsync.fulfilled, (state, action) => {
        console.log(action.payload)
        state.orders = state.orders.filter(x=> x.id !==  action.payload);
      });
  },
});

export const { add, remove, update } = cartSlice.actions;
export const selectcart = (state) => state.cart.orders;
export default cartSlice.reducer;
