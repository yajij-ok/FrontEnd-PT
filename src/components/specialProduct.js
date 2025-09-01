import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom'
import ReactStars from "react-rating-stars-component";
import product_01 from "../../src/assets/images/watch.jpg"
import { addToCart, removeFromCart } from '../features/product/productSlice';
import { useDispatch, useSelector } from 'react-redux';
import { getUserCart } from '../features/user/userSlice';
import { enqueueSnackbar } from 'notistack';

//  

const SpecialProduct = (props) => {
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
<div className="col-4">
    <div className="special-product-card">
    <div className="d-flex justify-content-center p-2">
          <div className="special-product-img">
            <img src={props.img} alt="" className="img-fluid" />
          </div>
          <div className="special-product-content">
            <h6 className='text-danger'>{props.brand}</h6>
            <h5>
               {props.title}
            </h5>
            <ReactStars
             count={5} size={24} value='3' edit={false} activeColor="#ffd700"/> 
    <p className="price">
    &nbsp; <strike>{props.price .toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}/-</strike>  <span className="red-p"> {props.price-(props.price*5/100)}/-</span> 
    </p>
    <div className="discount-till d-flex align-items-center gap-30">
      <p className="mb-2">
        <b>5-days</b>
      </p>
      <div className="d-flex gap-10 align-items-center">
        <span className="badge rounded-circle p-2 bg-warning">d</span>:
        <span className="badge rounded-circle p-2 bg-warning">f</span>:
        <span className="badge rounded-circle p-2 bg-warning">s</span>
      </div>
      </div>
      <div className="prod-count my-3">
        <p>Products: 10</p>
        <div className="progress">
  <div className="progress-bar"
   role="progressbar"
    style={{"width": "25%"}}
     aria-valuenow="25" aria-valuemin="0"
      aria-valuemax="100">
</div>
</div>
      </div>
      <button className='button border-0 text-center p-2'
       onClick={(e)=> cartCtrl(props.productData)}
       dangerouslySetInnerHTML={{__html: isProdInCart? "Remove from Cart" :  "Add to Cart"}}>
             </button>
  
          </div>
        </div>
    </div>
</div>
  )
}

export default SpecialProduct;