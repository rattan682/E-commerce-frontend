import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import { resetorder } from '../features/Orders/orderSlice'
import { deleteallAsync } from '../features/Cart/cartSlice'
import { selectloggeduser } from '../features/auth/AuthSlice'

const OrderSuccess = () => {
    const dispatch=useDispatch()
   
    const loggeduser=useSelector(selectloggeduser)

    useEffect(()=>{
        dispatch(resetorder())
        dispatch(deleteallAsync(loggeduser.id))
    },[dispatch,loggeduser.id])
    const {id}=useParams()
  return (<>
    <main className="grid min-h-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
    <div className="text-center">
        <div className='flex  justify-center items-center'>
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-20 text-green-600 ">
  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z" />
</svg>
</div>
      <h1 className="mt-4 text-3xl font-bold tracking-tight text-green-900 sm:text-5xl">Successfully Placed</h1>
      <p className="mt-6 text-base leading-7 text-gray-600">Your order id is #{id}</p>
      <div className="mt-10 flex items-center justify-center gap-x-6">
        <Link
          to={"/"}
          className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Continue Shopping
        </Link>
       
      </div>
    </div>
  </main>
  </>
  )
}

export default OrderSuccess