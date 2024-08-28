import React from 'react'
import Navbar from '../features/navbar/Navbar'
import { AdminProductList } from '../features/productlist/AdminProductList'

const AdminProductPage = () => {
  return (
    <>
    <Navbar><AdminProductList></AdminProductList></Navbar>
    </>
  )
}

export default AdminProductPage