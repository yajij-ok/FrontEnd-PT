import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom'
import ReactStars from "react-rating-stars-component";
import { addToCart, removeFromCart } from '../features/product/productSlice';
import {  useDispatch, useSelector } from 'react-redux';
import { getUserCart } from '../features/user/userSlice';
import { enqueueSnackbar } from 'notistack';

//  

const FeaturedCard = (props) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  
     const {user, cart} =  useSelector((state)=> state.auth)
    useEffect(()=>{
      if (user?.token) {
        dispatch(getUserCart())
      }
    },[getUserCart, user?.token])
   
     const isProdInCart = cart?.products?.some((i) => i.product._id === props.id);
  
     
          const cartCtrl = (productData) =>{
           if (!user) {
         enqueueSnackbar("Please Login first")
         setTimeout(()=>{
           navigate("/login")
         }, 700)
       }
      if(user && isProdInCart) {
          dispatch(removeFromCart(props.id))
         .unwrap()
         .then(()=>{
            dispatch(getUserCart())
         })
       }
       else if(user && !isProdInCart) {
         dispatch(addToCart(productData))
         .unwrap()
             .then(()=>{
                  dispatch(getUserCart())
             })
       }
        }

  return (
<div className="col-2" style={{width: "19%"}}>
    <div className="featured-card">
<Link to={`/product/${props.id}`} className='text-dark'>
          <div className="featured-image text-center">
            <img src={props.img} alt="" className="img-fluid" />
          </div>
          <div className="featured-product-details px-3">
            <p className='text-danger'>{props.brand}</p>
            <h5>
               {props.title}
            </h5>
    <p className="price mb-2">
    ৳ {props.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}/-
    </p>
      </div>
      </Link>
      <div class="text-center mb-2">
        <button className='button border-0 text-center p-2 m-2'
       onClick={(e)=> cartCtrl(props.productData)}
       dangerouslySetInnerHTML={{__html: isProdInCart? "Remove from Cart" :  "Add to Cart"}}>
             </button>
  
      </div>
        
    </div>
</div>
  )
}

export default FeaturedCard;