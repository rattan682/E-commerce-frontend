import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { logoutuserAsync, selectloggeduser } from '../features/auth/AuthSlice'
import { Navigate } from 'react-router-dom'
const LogoutUser = () => {
    const loggeduser=useSelector(selectloggeduser)
    const disptach=useDispatch()
    useEffect(()=>{
        disptach(logoutuserAsync())
    },[disptach])
  return (<>
   {!loggeduser && <Navigate to={"/login"}></Navigate>}
   </>
  )
}
export default LogoutUser