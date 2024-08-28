import React from 'react'
import { useSelector } from 'react-redux'
import { selectloggeduser } from '../features/auth/AuthSlice'
import PagenotFound from './PagenotFound'

const AdminProtect = ({children}) => {
    const loggeduser=useSelector(selectloggeduser)
    if(loggeduser && loggeduser.role==='admin'){
        return (
            <>
            {children}
            </>
        )
    }
  return (
    <PagenotFound></PagenotFound>
  )
}

export default AdminProtect