import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { addnewproduct, deleteproductbyid, getproductbyid, getproductsadmin, updateproduct } from "./AdminApi";
let initialState = {
  Admininfo: [],
  Products: [],
  error: null,
  status: "idle",
  selectedProduct:null
};
export const addProductasync = createAsyncThunk(
  "admin/addproduct",
  async (data) => {
    const respsonse = await addnewproduct(data);
    return respsonse.data;
  }
);
export const deleteproductAsync=createAsyncThunk(
    'admin/deleteproduct',
    async(id)=>{
        const response=await deleteproductbyid(id)
        return response.data

    }
)
export const getProductsforAdmin=createAsyncThunk(
    'admin/getproducts',
    async()=>{
        const response=await getproductsadmin()
        return response.data
    }
)
export const getproductbyidAsyc=createAsyncThunk(
    'admin/getproductbyid',async(id)=>{
        const respsonse=await getproductbyid(id)
        return respsonse.data
    }
)

const AdminSlice = createSlice({
  name: "adminslice",
  initialState,
  reducers: {
    emptyselectedproduct:(state)=>{
        state.selectedProduct=null
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(addProductasync.pending, (state) => {
        state.status = "pending";
      })
      .addCase(addProductasync.fulfilled, (state, action) => {
        state.status = "idle";
        state.Products.push(action.payload);
      }).addCase(getProductsforAdmin.pending, (state) => {
        state.status = "pending";
      })
      .addCase(getProductsforAdmin.fulfilled, (state, action) => {
        state.status = "idle";
        state.Products=action.payload
      }).addCase(getproductbyidAsyc.pending, (state) => {
        state.status = "pending";
      })
      .addCase(getproductbyidAsyc.fulfilled, (state, action) => {
        state.status = "idle";
        state.selectedProduct=action.payload
      }).addCase(deleteproductAsync.pending, (state) => {
        state.status = "pending";
      })
      .addCase(deleteproductAsync.fulfilled, (state, action) => {
        state.status = "idle";
        const index=state.Products.findIndex(e=>e.id===action.payload.id)
            state.Products.splice(index,1)
      })
  },
});
export default AdminSlice.reducer;
export const Selectproducts = (state) => state.Admin.Products;
export const {emptyselectedproduct} =AdminSlice.actions
export const selectSelectedproduct=(state)=>state.Admin.selectedProduct
