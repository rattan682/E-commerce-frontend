import axios from "axios";

export const addNeworder=async(data)=>await axios.post('/orders/addorder',data)
export const fetchallordersadmin=async()=>await axios.get("/orders//getallorders")
export const fetchallorders=async(id)=>await axios.get('/orders/getordersbyid/'+id)
export const updateorder=async(data)=>{await axios.patch("/orders/updateorder/"+data.id,data)
    return fetchallordersadmin()
}