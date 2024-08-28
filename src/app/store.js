import { configureStore } from '@reduxjs/toolkit';
import ProductListSlice from '../features/productlist/ProductListSlice';
import AuthSlice from '../features/auth/AuthSlice';
import cartSlice from '../features/Cart/cartSlice';
import orderSlice from '../features/Orders/orderSlice';
import AdminSlice from '../features/Admin/AdminSlice';



export const store = configureStore({
  reducer: {
    Product:ProductListSlice,
    authUser:AuthSlice,
    cart:cartSlice,
    orders:orderSlice,
    Admin:AdminSlice
  },
});
