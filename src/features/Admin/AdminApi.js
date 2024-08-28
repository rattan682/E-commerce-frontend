import axios from "axios";

export const addnewproduct=async(data)=>await axios.post("/products/createproduct",data)
export const getproductsadmin=async()=>await axios.get("/products")
export const getproductbyid=async(id)=>await axios.get('/products/'+id)
export const deleteproductbyid=async(id)=>await axios.delete('/products/deleteproduct/'+id)
export const updateproduct=async(data)=>await axios.patch('/products/updateproduct/'+data.id,data)