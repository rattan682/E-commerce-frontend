import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchProducts, fetchcategories, fetchproductsByid } from "./ProductListapi";
import { deleteproductbyid, updateproduct } from "../Admin/AdminApi";
const initialState = {
  products: [],
  totalproducts: 0,
  categories:[],
  product:[],
  status: "idle",
}
export const fetchProductsAsync = createAsyncThunk(
  "products/fetchproducts",
  async ({ filter, sort, pagination }) => {
    const response = await fetchProducts(filter, sort, pagination);
    return response.data;
  
  }
);
export const fetchproductsByidAsync=createAsyncThunk(
  'product/getproduct',async({id})=>{
    const response=await fetchproductsByid(id)
    return response.data
  }
)
export const fetchcategoriesAsync = createAsyncThunk(
  "category/fetchcategory",
  async () => {
    const response = await fetchcategories();
    return response.data
  }
);
export const deleteproductAsync=createAsyncThunk(

  'admin/deleteproduct',
  async(id)=>{
      const response=await deleteproductbyid(id)
      return response.data

  }
)
export const updateproductasync=createAsyncThunk(
  'admin/updateproduct',async(data)=>{
      const response=await updateproduct(data)
      return response.data
  }
)
export const ProductListSlice = createSlice({
  name: "ProductList",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProductsAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProductsAsync.fulfilled, (state, action) => {
        state.products = action.payload.docs;
        state.totalproducts = action.payload.total;
      });
      builder
      .addCase(fetchcategoriesAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchcategoriesAsync.fulfilled, (state, action) => {
        state.categories = action.payload;
      });
      builder
      .addCase(fetchproductsByidAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchproductsByidAsync.fulfilled, (state, action) => {
        state.product= action.payload;
      }).addCase(deleteproductAsync.pending, (state) => {
        state.status = "pending";
      })
      .addCase(deleteproductAsync.fulfilled, (state, action) => {
        state.status = "idle";
        const index=state.products.findIndex(e=>e.id===action.payload.id)
            state.products.splice(index,1)
            state.totalproducts=state.totalproducts-1
      }).addCase(updateproductasync.pending, (state) => {
        state.status = "pending";

      })
      .addCase(updateproductasync.fulfilled, (state, action) => {
        state.status = "idle";
        const index=state.products.findIndex(e=>e.id===action.payload.id)
        state.products[index]=action.payload
      })
  },
});
export const selectAllproducts = (state) => state.Product.products;
export const totalitems = (state) => state.Product.totalproducts;
export const selectcategories=(state)=>state.Product.categories;
export const getsingleproduct=(state)=>state.Product.product
export default ProductListSlice.reducer;
