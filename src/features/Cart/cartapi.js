import axios from "axios";

export const fetchcartProducts=async(id)=>await axios.get("/cart/getproductsbyid/"+id)
export const addtocart=async(data)=>await axios.post("/cart/addtocart",data)
export const incQuantity=async(data)=>await axios.patch("/cart/updatecart/"+data.id,data)
export const deleteitem=async(id)=>await axios.delete("/cart/deletecartbyid/"+id)
export const deleteall=async(id)=>{
    const response=await fetchcartProducts(id)
    const items=response.data
    for (let item of items){
        await deleteitem(item.id)
    }
    return {status: "success"}
}