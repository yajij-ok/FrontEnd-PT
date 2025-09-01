import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { cancelOrder, getUserOrders, logOutUser } from '../features/user/userSlice';
import Meta from '../components/meta';
import BreadCrumb from '../components/breadCrumb';
import { useState } from 'react';
import CustomModal from '../components/CustomModal';



 
const Profile = () => {
    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(getUserOrders())
    },[dispatch])
const getUser = useSelector((state)=> state.auth.user)
const{userOrders} = useSelector((state)=> state.auth)

const orderCancel =(id)=>{
dispatch(cancelOrder(id))
.unwrap()
.then(()=>{
  dispatch(getUserOrders())
})
}

const logOut = ()=>{
  dispatch(logOutUser())
}

  return (
    <>
      
        <Meta title ="My profile" />
       <BreadCrumb title="my-account" />
   <section className='home-wrapper-2'>
     <div className="container-xl px-5 py-2 my-5 ">
      {/* Profile Card */}
      <div className="card shadow-sm p-4 mb-4">
        <div className="d-flex align-items-center gap-30">
          {/* Profile Picture */}
          <img src="https://cdn.pixabay.com/photo/2023/02/18/11/00/icon-7797704_960_720.png" 
            alt="profile picture"
            className="rounded-circle me-3"
            width="100"
            height="100"
          />
          <div>
            <h4 className="mb-0">{getUser?.firstname} {getUser.lastname}</h4>
            <p className="text-muted fs-6">{getUser?.email}</p>
          </div>
          <div class="d-flex w-40 gap-30">
            <button className="btn btn-outline-dark ms-auto">Edit Profile</button>
          <button onClick={logOut} className="btn bg-danger ms-auto text-white">Log out</button>
          </div>
        </div>
        <div className="d-flex justify-content-around mt-3 text-center">
          <div  className='border px-5 py-2'>
            <h5>{userOrders?.length}</h5>
            <small>Orders</small>
          </div>
          <div className='border px-5 py-2'>
            <h5>{userOrders?.length}</h5>
            <small>Pending</small>
          </div>
          <div className='border px-5 py-2'>
            <h5>0</h5>
            <small>Delivered</small>
          </div>
          <div className='border px-5 py-2'>
            <h5>0</h5>
            <small>Cancelled</small>
          </div>
        </div>
      </div>

      {/* Orders Section */}
      <h5 className="mb-3">Pending Orders</h5>
      {userOrders?.slice().reverse().map((order) => (
        
        <div className="card shadow-sm p-3 mb-3" key={order._id}>
            {order.products?.map((item)=>{
               return (
                
            <div key={item?.product._id} className="d-flex align-items-center border-bottom mx-4 my-2">

        {/* Product Image */}
            <img
              src={item?.product.images?.[0]?.url}
              alt={item?.product.title}
              className="rounded me-3 mb-2"
              width="80"
              height="80"
            />
            <div className="flex-grow-1 mb-2">
              <h6 className="mb-1">{item?.product.title}</h6>
              <p className="text-muted mb-1" style={{fontSize: "12px"}}>
                {item?.product.description}</p>
              <small>
                Order Date:   | Qty: {item?.count} | Price: ৳ {item?.product.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} /-
              </small>
            </div>

           </div>
               )
                })
            }
        
          <div className="">
           <div className='justify-content-start py-0 mt-2 px-3 ms-3  position-absolute'>
            <small className=' d-flex gap-10 '>
              {order.paymentIntent.method} |
               <small class="text-muted">Amount:</small>  ৳ {order.paymentIntent.amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}/- |
               <small class="text-muted">Address:</small> {order.shippingAddress}
            </small>
           </div>
             <div class="d-flex justify-content-end mx-5 gap-30">
              <div className="mt-2 p-1 px-3 bg-secondary text-white rounded-pill" style={{fontSize: "13px"}}  >
             {order?.orderStatus}
             </div>

    {/* Cancel Button */}
            {order?.orderStatus !== "Delivered" && order?.orderStatus !== "Canceled" && order?.orderStatus !== "Shipped" && (
              <button
                className="btn btn-danger ms-3" style={{fontSize: "12px"}}
                onClick={(e)=>{orderCancel(order?._id)}}
              >
                Cancel Order
              </button>
            )}
             </div>
          </div>
        </div>
      ))}
    </div>
   </section>

    </>
  )
}

export default Profile