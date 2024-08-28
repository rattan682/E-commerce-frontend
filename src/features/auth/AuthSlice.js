import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { checkUser, createuser, getuserinfoapi, LogoutUser } from "./Authapi"

const initialState={
    loggedUsertoken:null,
    status:'',
    errors:null,
    getinfofailed:null,
    loggedUser:{
        role:'user'
    },
    checkuser:false
}
export const createuserAsync=createAsyncThunk(
    'users/createuser',
    async(data)=>{
        const response=await createuser(data)
        
        return response.data
    }
)
export const getuserinfo=createAsyncThunk(
    "user/getinfo",async()=>{
        const response=await getuserinfoapi()
        return response.data
    })
export const logoutuserAsync=createAsyncThunk('user/loggoutuser',async()=>{
    
    await LogoutUser()
    return {data:'success'}
})
export const checkUserAsync=createAsyncThunk('users/checkUser',async(data)=>{
    const userdata=await checkUser(data)
    return userdata.data
})
 const Authslice=createSlice({
    name:"auth",
    initialState,
    reducers:{
        emptycurrentuser:(state,action)=>{
            state.loggedUser=null
        }
    },
    extraReducers:(builder)=>{
        builder.addCase(createuserAsync.pending,(state)=>{
            state.status="idle"
        }).addCase(createuserAsync.fulfilled,(state,action)=>{
            
            state.status='success'
        }).addCase(createuserAsync.rejected,(state,action)=>{
            state.status='idle'
            state.errors=action.error.message
            console.log(state.errors)
        })
        .addCase(checkUserAsync.pending,(state)=>{
            state.status='idle'
        }).addCase(checkUserAsync.fulfilled,(state,action)=>{
            state.status='success'
            state.loggedUsertoken=action.payload
        }).addCase(checkUserAsync.rejected,(state,action)=>{
            state.status='idle'
            state.errors=action.error.message
            console.log(state.errors)
        }).addCase(logoutuserAsync.pending,(state)=>{
            state.status='pending'
           
        }).addCase(logoutuserAsync.fulfilled,(state,action)=>{
            state.loggedUser=null
            state.status='idle'
        }).addCase(getuserinfo.pending,(state)=>{
            state.status='pending'
           
        }).addCase(getuserinfo.fulfilled,(state,action)=>{
            state.loggedUser=action.payload
            state.status='idle'
            state.checkuser=true
        }).addCase(getuserinfo.rejected,(state,action)=>{
            state.getinfofailed=action.error.message
            state.loggedUser=null
            state.checkuser=true
        })
    }
})
export const selectcheckuser=(state)=>state.authUser.checkuser
export const selectloggeduser = (state) => state.authUser.loggedUser;
export const selecterrors=(state)=>state.authUser.errors
export const selectloggedusertoken=(state)=>state.authUser.loggedUsertoken
export const selectgetinfoerror=(state)=>state.authUser.getinfofailed
export default Authslice.reducer
export const {emptycurrentuser}=Authslice.actions