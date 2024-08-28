import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { selectCartproducts } from '../Cart/cartSlice'
import { selectloggeduser } from '../auth/AuthSlice'
import { addorderAsync, selectcurrentOrder } from '../Orders/orderSlice'
import { Navigate } from 'react-router-dom'

export const Checkout = () => {
  const {register,handleSubmit,formState:{errors}}=useForm()
  const cartItems=useSelector(selectCartproducts)
  const dispatch=useDispatch()
  const currentOrder=useSelector(selectcurrentOrder)
  const [paymentmethod,selectpaymentmethod]=useState("card")
  const loggeduser=useSelector(selectloggeduser)
  const onsubmit=(shippingdata)=>{
    console.log(shippingdata)
    const totalamount=cartItems.reduce((total,i)=>
      i.price*i.quantity+total
    ,0).toFixed(2)
    const order={shippingdata,cartItems,paymentmethod,user:loggeduser.id,totalamount,status:'Pending'}
    dispatch(addorderAsync({order}))
  }
  return (
    <>
    {console.log(currentOrder) }
    {currentOrder && currentOrder.order.paymentmethod==="cash" && <Navigate replace={true} to={`/Ordersuccess/${currentOrder.id}`}></Navigate>}
    {currentOrder &&  currentOrder.order.paymentmethod==="card" && <Navigate replace={true} to={`/Stripe-payment`}></Navigate>}
    <div className="font-sans bg-white p-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-800 inline-block border-b-[3px] border-gray-800 pb-1">Checkout</h2>
        </div>

        <div className="mt-12">
          {/* 1 */}
          <form onSubmit={handleSubmit(onsubmit)} >
          <div className="grid md:grid-cols-3 gap-4">
            <div>
              <h3 className="text-3xl font-bold text-gray-300">01</h3>
              <h3 className="text-xl font-bold text-gray-800 mt-1">Personal Details</h3>
            </div>

            <div className="md:col-span-2">
              
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <input {...register('firstName',{required:"firstname is required"})} type="text" placeholder="First name"
                      className="px-4 py-3 bg-white text-gray-800 w-full text-sm border-2 rounded-md focus:border-blue-500 outline-none" />
                  <p className='text-red-600'>{errors.firstName && errors.firstName.message}</p>
                  </div>
                  <div>
                    <input {...register('Email',{required:"Email is required"})}  type="email" placeholder="Email address"
                      className="px-4 py-3 bg-white text-gray-800 w-full text-sm border-2 rounded-md focus:border-blue-500 outline-none" />
                  <p className='text-red-600'>{errors.Email && errors.Email.message}</p>
                  </div>
                  <div>
                    <input {...register('PhoneNumber',{required:"Phone  is required"})} type="number" placeholder="Phone number"
                      className="px-4 py-3 bg-white text-gray-800 w-full text-sm border-2 rounded-md focus:border-blue-500 outline-none" />
                  <p className='text-red-600'>{errors.PhoneNumber && errors.PhoneNumber.message}</p>
                  </div>
                </div>
              
            </div>
          </div>
{/* 2 */}
          <div className="grid md:grid-cols-3 gap-4 mt-12">
            <div>
              <h3 className="text-3xl font-bold text-gray-300">02</h3>
              <h3 className="text-xl font-bold text-gray-800 mt-1">Shopping Address</h3>
            </div>

            <div className="md:col-span-2">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <input {...register("streetAddress",{required:"Street Address is required"})} type="text" placeholder="Street address"
                      className="px-4 py-3 bg-white text-gray-800 w-full text-sm border-2 rounded-md focus:border-blue-500 outline-none" />
                  <p className='text-red-800'>{errors.streetAddress && errors.streetAddress.message}</p>
                  </div>
                  <div>
                    <input {...register("City",{required:"City  is required"})} type="text" placeholder="City"
                      className="px-4 py-3 bg-white text-gray-800 w-full text-sm border-2 rounded-md focus:border-blue-500 outline-none" />
                  <p className='text-red-800'>{errors.streetAddress && errors.streetAddress.message}</p>
                  </div>

                  <div>
                    <input {...register("State",{required:"State is required"})} type="text" placeholder="State"
                      className="px-4 py-3 bg-white text-gray-800 w-full text-sm border-2 rounded-md focus:border-blue-500 outline-none" />
                  <p className='text-red-800'>{errors.State && errors.State.message}</p>
                  </div>

                  <div>
                    <input {...register("zipCode",{required:"Zip Code is required"})} type="number" placeholder="Zip Code"
                      className="px-4 py-3 bg-white text-gray-800 w-full text-sm border-2 rounded-md focus:border-blue-500 outline-none" />
                  <p className='text-red-800'>{errors.zipCode && errors.zipCode.message}</p>
                  </div>
                </div>
              
            </div>
          </div>
         
{/* 3 */}
          <div class="grid md:grid-cols-3 gap-4 mt-12">
            <div>
              <h3 class="text-3xl font-bold text-gray-300">03</h3>
              <h3 class="text-xl font-bold text-gray-800 mt-1">Payment method</h3>
            </div>

            <div class="md:col-span-2">
              <div class="grid gap-4 sm:grid-cols-2">
                <div class="flex items-center">
                  <input name='payment' type="radio" class="w-5 h-5 cursor-pointer" id="card" checked={paymentmethod==="card"} onChange={()=>selectpaymentmethod("card")} />
                  <label for="card" class="ml-4 flex gap-2 cursor-pointer">
                    <img src="https://readymadeui.com/images/visa.webp" class="w-12" alt="card1" />
                    <img src="https://readymadeui.com/images/american-express.webp" class="w-12" alt="card2" />
                    <img src="https://readymadeui.com/images/master.webp" class="w-12" alt="card3" />
                  </label>
                </div>

                <div class="flex items-center">
                  <input name='payment' type="radio" class="w-5 h-5 cursor-pointer" id="cod"checked={paymentmethod==="cash"} onChange={()=>selectpaymentmethod("cash")} />
                  <label for="cod" class="ml-4 flex gap-2 cursor-pointer">
                    Cash on Delivery
                  </label>
                </div>
              </div>
            </div>
          </div>
          <div class="flex flex-wrap justify-end gap-4 mt-12">
            <button type="submit"
              className="px-6 py-3 text-sm font-semibold tracking-wide bg-blue-600 text-white rounded-md hover:bg-blue-700">Order</button>
          </div>
          </form>
        </div>
      </div>
    </div>
    </>
  )
}
