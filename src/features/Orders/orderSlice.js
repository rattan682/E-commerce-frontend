import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { addNeworder, fetchallorders, fetchallordersadmin, updateorder } from "./orderApi";

const initialState = {
  orders: [],
  currentOrder: null,
  status: "idle",
  All:[]
};
export const fetchordersAsync = createAsyncThunk(
  "orders/fetchorders",
  async (id) => {
    const response = await fetchallorders(id);
    return response.data;
  }
);
export const addorderAsync = createAsyncThunk(
  "order/addorder",
  async (data) => {
    const response = await addNeworder(data);
    return response.data;
  }
);
export const fetchAllorderAdminasync=createAsyncThunk(
    'order/allorder',
    async()=>{
        const respsonse=await fetchallordersadmin()
        return respsonse.data
    }
)
export const updatedorderasync=createAsyncThunk(
    'order/updateorder',async(data)=>{
        const response=await updateorder(data)
        return response.data
    }
)
const orderSlice = createSlice({
  name: "orderslice",
  initialState,
  reducers: {
    resetorder: (state) => {
      state.currentOrder = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addorderAsync.pending, (state) => {
        state.status = "pending";
      })
      .addCase(addorderAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.currentOrder = action.payload;
        state.orders.push(action.payload);
      })
      .addCase(fetchordersAsync.pending, (state, action) => {
        state.status = "pending";
      })
      .addCase(fetchordersAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.orders = action.payload;
      }).addCase(fetchAllorderAdminasync.pending, (state, action) => {
        state.status = "pending";
      })
      .addCase(fetchAllorderAdminasync.fulfilled, (state, action) => {
        state.status = "idle";
        state.All= action.payload;
      }).addCase(updatedorderasync.pending, (state, action) => {
        state.status = "pending";
      })
      .addCase(updatedorderasync.fulfilled, (state, action) => {
        state.status = "idle";
        state.All= action.payload;
      });
  },
});
export const { resetorder } = orderSlice.actions;
export default orderSlice.reducer;
export const selectcurrentOrder = (state) => state.orders.currentOrder;
export const selectallorders = (state) => state.orders.orders;
export const selectallordersadmin=(state)=>state.orders.All