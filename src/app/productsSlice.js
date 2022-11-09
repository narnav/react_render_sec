import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getProducts, addProduct, updProduct } from "./prodAPI";

const initialState = {
  products: [],
  status: "idle",
};

export const getProductsAsync = createAsyncThunk(
  "prod/getProducts",
  async () => {
    const response = await getProducts();
    return response.data;
  }
);

export const addProductAsync = createAsyncThunk(
  "prod/addProduct",
  async (newProd) => {
    const response = await addProduct(newProd);
    return response.data;
  }
);
export const updProductAsync = createAsyncThunk(
  "prod/updProduct",
  async (newProd) => {
    const response = await updProduct(newProd, newProd.id);
    return response.data;
  }
);

export const prodSlice = createSlice({
  name: "prod",
  initialState,
  reducers: {
    // add: (state, action) => {
    //   console.log(action.payload);
    //   state.products.push(action.payload);
    // },
    remove: (state) => {
      state.value -= 1;
    },
    update: (state, action) => {
      state.value += action.payload;
    },
  },
  //get result from server and update local state -> in turn update the listening componenets
  extraReducers: (builder) => {
    builder
      .addCase(getProductsAsync.fulfilled, (state, action) => {
        state.products = action.payload;
        console.log(action.payload);
      })
      .addCase(addProductAsync.fulfilled, (state, action) => {
        state.products.push(action.payload);
        state.status = "glory of israel state";
        console.log(action.payload);
      })
      .addCase(updProductAsync.fulfilled, (state, action) => {
        let oldProd = state.products.find((x) => x.id === action.payload.id);
        oldProd.desc = action.payload.desc;
        oldProd.price = action.payload.price;
        console.log(action.payload);
      });
  },
});

export const { add, remove, update } = prodSlice.actions;
export const selectProducts = (state) => state.prod.products;
export default prodSlice.reducer;
