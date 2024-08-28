import React from 'react'
import { useSelector } from 'react-redux'
import { selectloggeduser } from '../AuthSlice'
import { Navigate } from 'react-router-dom'

export const Protected = ({children}) => {
    const user=useSelector(selectloggeduser)
    if(!user){
        return <Navigate to={"/login"} replace={true}></Navigate>
    }
  return <>{children}</>
}
