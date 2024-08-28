import React, { useEffect } from 'react';
import './App.css';
import { ProductList } from './features/productlist/ProductList';
import Navbar from './features/navbar/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import PagenotFound from './pages/PagenotFound';
import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
  useNavigate,
} from "react-router-dom";
import CartPage from './pages/CartPage';
import { Checkoutpage } from './pages/Checkoutpage';
import { ProductPage } from './pages/ProductPage';
import { Protected } from './features/auth/Components/Protected';
import { useDispatch, useSelector } from 'react-redux';
import { fetchcartProductsAsync } from './features/Cart/cartSlice';
import { getuserinfo, selectcheckuser, selectgetinfoerror, selectloggeduser, selectloggedusertoken } from './features/auth/AuthSlice';
import OrderSuccess from './pages/OrderSuccess';
import Orders from './features/Orders/Orders';
import Orderspage from './pages/Orderspage';
import LogoutUser from './pages/LogoutUser';
import { ForgotPasswordPage } from './pages/ForgotPasswordPage';
import AdminProtect from './pages/AdminProtect';
import AdminProductPage from './pages/AdminProductPage';
import AdminProductForm from './features/Admin/Components/AdminProductForm';
import EditProductpage from './pages/EditProductpage';
import AdminordersPage from './pages/AdminordersPage';
import Stripepayment from './pages/Stripepayment';




const router = createBrowserRouter([
  {
    path: "/",
    element: <Home/>,
  },
  {
    path: "/Login",
    element: <Login/>,
  },
  {
    path: "/Signup",
    element: <Signup/>,
  },{
    path:"/Stripe-payment",
    element:<Stripepayment></Stripepayment>
  },
  {
    path: "/Cart",
    element: <CartPage/>,
  },
  {
    path: "/product/:id",
    element:<ProductPage/>,
  },
  {
    path: "/Checkout",
    element:<Protected><Checkoutpage/></Protected>,
  },

  {path:"/Ordersuccess/:id",
    element:<Protected><OrderSuccess></OrderSuccess></Protected>
  },
  {path:'/myorders',
    element:<Protected><Orderspage></Orderspage></Protected>
  },{
    path:"/log-out",
    element:<LogoutUser></LogoutUser>
  },{
    path:"/admin/add-product",
    element:<AdminProtect><Navbar><AdminProductForm></AdminProductForm></Navbar></AdminProtect>
  },
  {path:"/admin/editproduct/:id",
    element:<AdminProtect><Navbar><EditProductpage></EditProductpage></Navbar></AdminProtect>
  },
  {path:'/admin/orders',
    element:<AdminProtect><Navbar><AdminordersPage></AdminordersPage></Navbar></AdminProtect>
  },
  {
    path:'/forgot-password',
    element:<Protected><ForgotPasswordPage></ForgotPasswordPage></Protected>
  },
  {
    path:"/admin",
    element:<AdminProtect><AdminProductPage></AdminProductPage></AdminProtect>
  },
  {
    path: "*",
    element:<PagenotFound></PagenotFound>,
  },

]);
function App() {
  const disptach=useDispatch()
  const user=useSelector(selectloggeduser)
  const token=useSelector(selectloggedusertoken)
  useEffect(()=>{
    disptach(getuserinfo())
  },[disptach,token])
  const checkuser=useSelector(selectcheckuser)

  if(user){disptach(fetchcartProductsAsync(user.id))}
  return (
    <>
{checkuser && <RouterProvider router={router}></RouterProvider>}
    
    </>
  );
}

export default App;
