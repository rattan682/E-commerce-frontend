import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { addtocart, deleteall, deleteitem, fetchcartProducts, incQuantity } from "./cartapi"

const initialState={
    cartProducts:[],
    status:"idle"
}
export const fetchcartProductsAsync=createAsyncThunk('cart/fetchcartproducts',async(id)=>{
    const response=await fetchcartProducts(id)
    return response.data
})
export const addtocartAsync=createAsyncThunk('cart/addtocart',async(data)=>{
    console.log(data)
    const response=await addtocart(data)
    return response.data
})
export const incQuantityAsync=createAsyncThunk('cart/incQuantity',async(data)=>{
    const response=await incQuantity(data)
    return response.data
})
export const delteitemAsync=createAsyncThunk('/cart/deleteitem',async(id)=>{
    const response=await deleteitem(id)
    return response.data
})
export const deleteallAsync=createAsyncThunk('/cart/deleteall',async(id)=>{
    const response=await deleteall(id)
    return response.data
})

const cartSlice=createSlice({
    name:'cartslice',
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(addtocartAsync.pending,(state)=>{
            state.status='pending'
        }).addCase(addtocartAsync.fulfilled,(state,action)=>{
            state.status="success"
            state.cartProducts.push(action.payload)
        }).addCase(fetchcartProductsAsync.pending,(state)=>{
            state.status='idle'
        }).addCase(fetchcartProductsAsync.fulfilled,(state,action)=>{
            state.status='success'
            state.cartProducts=action.payload
        }).addCase(incQuantityAsync.pending,(state)=>{
            state.status='idle'
        }).addCase(incQuantityAsync.fulfilled,(state,action)=>{
            state.status='success'
            const index=state.cartProducts.findIndex(e=>e.id==action.payload.id)
            state.cartProducts[index]=action.payload
        }).addCase(delteitemAsync.pending,(state)=>{
            state.status='idle'
        }).addCase(delteitemAsync.fulfilled,(state,action)=>{
            state.status='success'
            const index=state.cartProducts.findIndex(e=>e.id===action.payload.id)
            state.cartProducts.splice(index,1)
        }).addCase(deleteallAsync.pending,(state,action)=>{
            state.status='pending'
        }).addCase(deleteallAsync.fulfilled,(state,action)=>{
            state.status='success'
            state.cartProducts=[]
        })
    }
})
export const selectCartproducts=(state)=>state.cart.cartProducts
export default cartSlice.reducer