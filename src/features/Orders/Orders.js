import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchordersAsync, selectallorders } from './orderSlice'
import { selectloggeduser } from '../auth/AuthSlice'
import { Link } from 'react-router-dom'

const Orders = () => {
    const disptach=useDispatch()
    const loggeduser=useSelector(selectloggeduser)
    const allOrders=useSelector(selectallorders)

    useEffect(()=>{
        disptach(fetchordersAsync(loggeduser.id))
    },[disptach])
    if(allOrders.length===0){
        return(<><h1 className='mt-10 text-center text-4xl font-bold'>No Orders have been placed yet</h1>
        <div className='flex justify-center items-center'>
        <Link to={"/"} className='mt-10 p-3 rounded-2xl bg-green-300 '>Go to Home</Link></div></>)
    }
    else{
        return (
            <section className=" relative">
            <div className="w-full max-w-7xl px-4 md:px-5 lg-6 mx-auto">
                <h2 className="font-manrope font-bold text-4xl leading-10 text-black text-center">
                    Orders
                </h2>
                <p className="mt-4 font-normal text-lg leading-8 text-gray-500 mb-11 text-center">
                    you can
                    see your orders below</p>
                {allOrders.map(e=> <div className="main-box mt-20 border border-gray-200 rounded-xl pt-6 max-w-xl max-lg:mx-auto lg:max-w-full">
                    <div
                        className="flex flex-col lg:flex-row lg:items-center justify-between px-6 pb-6 border-b border-gray-200">
                        <div className="data">
                            <p className="font-semibold text-base leading-7 text-black">Order Id: <span className="text-indigo-600 font-medium">#{e.id}</span></p>
                            <p className="font-semibold text-base leading-7 text-black mt-4">Status<span className="text-gray-400 font-medium"> {e.order.status}</span></p>
                        </div>
                        
                    </div>
                    <div className="w-full px-3 min-[400px]:px-6">{e.order.cartItems.map(el=><div className="flex flex-col lg:flex-row items-center py-6 border-b border-gray-200 gap-6 w-full">
                            <div className="img-box max-lg:w-full">
                                <img src={el.images[0]} alt="Premium Watch image" 
                                    className="aspect-square w-full lg:max-w-[140px]"/>
                            </div>
                            <div className="flex flex-row items-center w-full ">
                                <div className="grid grid-cols-1 lg:grid-cols-2 w-full">
                                    <div className="flex items-center">
                                        <div className="">
                                            <h2 className="font-semibold text-xl leading-8 text-black mb-3">
                                                {el.title}</h2>
                                            
                                            <div className="flex items-center ">
                                             
                                                <p className="font-medium text-base leading-7 text-black ">Qty: <span
                                                        className="text-gray-500">{el.quantity}</span></p>
                                            </div>
                                        </div>
        
                                    </div>
                                    <div className="grid grid-cols-5">
                                        <div className="col-span-5 lg:col-span-1 flex items-center max-lg:mt-3">
                                            <div className="flex gap-3 lg:block">
                                                <p className="font-medium text-sm leading-7 text-black">price</p>
                                                <p className="lg:mt-4 font-medium text-sm leading-7 text-indigo-600">${el.price}</p>
                                            </div>
                                        </div>
                                     
                                    </div>
                                </div>
        
        
                            </div>
                        </div>)}
                        
                    </div>
                    <div className="w-full border-t border-gray-200 px-6 flex flex-col lg:flex-row items-center justify-between ">
                    <p className="font-semibold text-lg text-black py-6">Payment Mode:<span className="text-indigo-600"> {e.order.paymentmethod}</span></p>
        
                        <p className="font-semibold text-lg text-black py-6">Total Price: <span className="text-indigo-600"> ${e.order.totalamount}</span></p>
                    </div>
        
                </div>)}
               
            </div>
        </section>
                                                
          )
    }

}

export default Orders