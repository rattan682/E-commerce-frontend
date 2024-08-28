import axios from "axios";

export const createuser=async(data)=>{
    try {
        const response = await axios.post(`/user/signup`,data);
        return response
    } catch (error) {
        throw new Error(error.response?.data?.message || "user already exists");
    }
    }
    
export const checkUser=async(data)=>{
    try {
        const response = await axios.post(`/user/login`,data);
        
        return response
    } catch (error) {
        throw new Error(error.response?.data?.message || "Wrong user credentials");
    }
}
export const getuserinfoapi=async()=>{
    try {
        const response=await axios.get("/user/getuserinfo")
        return response
    } catch (error) {
        throw("uauthorized")

    }
}
export const LogoutUser=async()=>{
    try {
        const response=await axios.get("/user/signoutuser")
        return response
    } catch (error) {
        console.log(error.message)
        
    }
}