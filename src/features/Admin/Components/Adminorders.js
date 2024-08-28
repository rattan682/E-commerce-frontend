import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllorderAdminasync, selectallordersadmin, updatedorderasync } from '../../Orders/orderSlice';

const chooseColor = (status) => {
  switch (status) {
    case 'pending':
      return 'bg-yellow-100 text-yellow-700';
    case 'dispatched':
      return 'bg-blue-100 text-blue-700';
    case 'delivered':
      return 'bg-green-100 text-green-700';
    case 'cancelled':
      return 'bg-red-100 text-red-700';
    default:
      return 'bg-gray-100 text-gray-700';
  }
}
export const Adminorders = () => {
  const AllOrders = useSelector(selectallordersadmin)
  const [selectedOrderEdit, setSelectedOrderEdit] = useState(null);
  const dispatch = useDispatch();
  const handleUpdateOrder = (e, order) => {
    const id=order.id
    const neworder={...order.order,status:e.target.value}
    const updatedorder={id,order:neworder}
    dispatch(updatedorderasync(updatedorder))
  }
  const handleEdit = (order) => {
    setSelectedOrderEdit(order.id);
  }

  useEffect(() => {
    dispatch(fetchAllorderAdminasync())
    
  
  }, [dispatch])

  return (
    <div>
      <section>
        <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
          <div className="block w-full overflow-x-auto">
            <table className="items-center border border-black border-1 border-collapse bg-white w-full">
              <thead className='bg-blue-100'>
                <tr className='border-black border-[1px]'>
                  <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-black py-3 text-xs uppercase border-l-1 border-r-0 whitespace-nowrap font-semibold text-left">
                    Order Number
                  </th>
                  <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-black py-3 text-xs uppercase border-l-1 border-r-0 whitespace-nowrap font-semibold text-left">
                    Items
                  </th>
                  <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-black py-3 text-xs uppercase border-l-1 border-r-0 whitespace-nowrap font-semibold text-left">
                    Shipping Address
                  </th>
                  <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-black py-3 text-xs uppercase border-l-1 border-r-0 whitespace-nowrap font-semibold text-left">
                    Total Amount
                  </th>
                  <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-black py-3 text-xs uppercase border-l-1 border-r-0 whitespace-nowrap font-semibold text-left">
                    Status
                  </th>
                  <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-black py-3 text-xs uppercase border-l-1 border-r-0 whitespace-nowrap font-semibold text-left">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {AllOrders.map((order) => (
                  <tr key={order.id}>
                    <th className="px-6 border border-black align-middle border-1 text-blue-700 text-xs whitespace-nowrap p-4 text-left text-blueGray-700">
                      {order.id}
                    </th>
                    <td className="px-6 align-middle border border-black border-1 text-xs whitespace-nowrap p-4">
                      {order.order.cartItems.map((product) => (
                        <li key={product.id} className="flex py-6">
                          <div className="h-12 w-12 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                            <img
                              src={product.images[0]}
                              alt={product.title}
                              className="h-full w-full object-cover object-center"
                            />
                          </div>
                          <div className="ml-4 flex flex-1 flex-col">
                            <div>
                              <div className="flex justify-between text-xs font-medium text-gray-900">
                                <h3>
                                  <a href={product.href}>{product.title}</a>
                                </h3>
                                <p className="ml-4">${product.price.toFixed(2)}</p>
                              </div>
                              <p className="mt-1 text-xs text-gray-500">{product.brand}</p>
                            </div>
                            <div className="flex flex-1 items-end justify-between text-sm">
                              <div>
                                <label htmlFor="quantity" className="inline text-xs font-medium leading-6 text-gray-900">
                                  Qty: {product.quantity}
                                </label>
                              </div>
                            </div>
                          </div>
                        </li>
                      ))}
                    </td>
                    <td className="px-6 align-center border border-black border-1 text-xs whitespace-nowrap p-4">
                      <div className='flex flex-col'>
                        <strong>{order.order.shippingdata.streetAddress},</strong>
                        <div>{order.order.shippingdata.City},</div>
                        <div>{order.order.shippingdata.State},</div>
                        <div>{order.order.shippingdata.zipCode},</div>
                        <div>{order.order.shippingdata.PhoneNumber}</div>
                      </div>
                    </td>
                    <td className="px-6 align-middle border border-black border-1 text-xs whitespace-nowrap p-4">
                      ${order.order.totalamount}
                    </td>
                    <td className="px-6 align-middle border border-black border-1 text-xs whitespace-nowrap p-4">
                      {selectedOrderEdit !== order.id ? (
                        <div className={`${chooseColor(order.order.status)} px-1 py-2 text-center rounded-xl`}>{order.order.status}</div>
                      ) : (
                        <select value={order.order.status} className='w-full h-8 rounded-xl px-2 py-1 text-xs' onChange={(e) => handleUpdateOrder(e, order)}>
                          <option value="pending">Pending</option>
                          <option value="dispatched">Dispatched</option>
                          <option value="delivered">Delivered</option>
                          <option value="cancelled">Cancelled</option>
                        </select>
                      )}
                    </td>
                    <td className="px-6 align-middle border border-black border-1 text-xs whitespace-nowrap p-4">
                    
                      <div className='ms-5 inline-flex hover:text-red-700 cursor-pointer' onClick={() => handleEdit(order)}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" />
</svg>
</div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </div>
  )
}
