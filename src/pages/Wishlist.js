import React, { useEffect } from 'react'
import Meta from '../components/meta'
import BreadCrumb from '../components/breadCrumb'
import product_01 from "../../src/assets/images/watch.jpg"
import cross from "../../src/assets/images/cross.svg"
import { useDispatch, useSelector } from 'react-redux'
import { addToWishList, getWishList } from '../features/product/productSlice'
import { Link, useNavigate } from 'react-router-dom'
const Wishlist = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate()
useEffect(()=>{
  dispatch(getWishList())
},[dispatch])

const addToWishlist = (id) => { 
    dispatch(addToWishList(id))
    .unwrap()
    .then(()=>{
         dispatch(getWishList())
    })
   }
  
  const wishListState = useSelector((state)=> state.product.wishlist?.wishList)
  const getUser = useSelector((state)=>state.auth.user)

   if (wishListState?.length===0) {
          return(
            <>
             <Meta title ="Favourite Products" />
             <BreadCrumb title="wishlist" />
            <div className=''>
              <p className='text-center m-5 fs-6'>
                You have no item in your wishlist. <br/>  
                <Link to="/store"> Add items</Link>
              </p>
            </div>
            </>
          )
        }  
 if (getUser) {
   return ( 
   <>
     <Meta title ="Favourite Products" />
   <BreadCrumb title="wishlist" />
   
   {
    wishListState?.map((item, index)=>{
      return (
   <div key={index} className='home-wrapper-2 d-flex align-items-column flex-wrap gap-10 pb-4'>
    <div  className="wishlist-wrapper home-wrapper-2 py-3">
    <div className="container-xl">
        <div className="row">
            <div className="col-3">
          <div className="wishlist-card position-relative">
         <button onClick={(e)=>{addToWishlist(item?._id)}} className='border-0 bg-transparent' title='Remove Item'>
           <img src={cross} alt="cross" className="position-absolute cross img-fluid" />
         </button>
            <div className="wishlist-card-image">
            <img src={item?.images[0].url} alt="watch" className="img-fluid" />
            </div>
            <div className="compare-product-details mb-2">
                <h6 className="title">
                    {item?.title}
                </h6>
                <h7 className="price">{item?.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}/-</h7>
            </div>
          </div>
            </div>
        </div>
    </div>
  
   </div>
   </div>
    )})}
    </>
  )
 } else {
 return(
 <>
 <Meta title ="Favourite Products" />
   <BreadCrumb title="wishlist" />

   <div className='login-note my-5'>
    <p className='text-center'>
      You need to <Link to="/login">login</Link> first to access your wishlist
    </p>
  </div>
 </>
 )
 }
}

export default Wishlist