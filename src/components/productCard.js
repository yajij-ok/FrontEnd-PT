import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom'
import ReactStars from "react-rating-stars-component";
import add_cart from "../../src/assets/images/add-cart.svg"
import compare from "../../src/assets/images/prodcompare.svg"
import view from "../../src/assets/images/view.svg"
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, addToWishList, getWishList } from '../features/product/productSlice';
import { enqueueSnackbar } from 'notistack';



const ProductCard = ( props) => {
    const {data, wishListState, grid}= props;
    let location = useLocation();
   const dispatch =  useDispatch()
   const navigate = useNavigate()
   const {user} = useSelector((state) => state.auth)
   const addToWishlist = (id) => { 
    if (!user) {
        navigate("/login")
        enqueueSnackbar("Please login first.")
    }
    else dispatch(addToWishList(id))
    .unwrap()
        .then(()=>{
             dispatch(getWishList())
        })
   }
const addProdToCart = (productData) =>{
     if (!user) {
        navigate("/login")
        enqueueSnackbar("Please login first.")
    }
   else  dispatch(addToCart(productData))
}

 
   
  return (
   <>
   {
    data?.map((item, index)=>{
     const isWishlisted = wishListState?.some((i) => i._id === item?._id);
     const productData = {
        prodId : item?._id,
        count: 1,
        color: ""
     }
    return (
         <div key={index} className={` ${location.pathname ==="/store" || "/store/search?" ? `gr-${grid}` : "col-3"} `}>
    <div className="product-card position-relative gap-10">
        <div className="wishlist-icon position-absolute">
            <button className='border-0 bg-transparent' onClick={(e)=>{
            e.preventDefault();
            e.stopPropagation();
            addToWishlist(item?._id)}}
             title='Add to wishlist'>
          {isWishlisted? (
          <i class="fa-solid fa-heart"></i>
          ) : (
          <i class="fa-regular fa-heart"></i>
    )}
    
            </button>
        </div>
        <Link to={`/product/${item?._id}`}>
        <div className="product-image">
            <img src={item?.images[0].url} alt="product-img" className="img-fluid" />
            <img src={item?.images.length >> 3 ? item?.images[4].url : item?.images[1].url } alt="psroduct-img" className="img-fluid"/>
            
        </div>
        </Link>
         <Link to={`/product/${item?._id}`}>
        <div  className="product-details mt-1">
            <h6 className="brand">{item?.brand}</h6>
            <Link to={`/product/${item?._id}`}>
            <h5 className="product-name mb-1">{item?.title}</h5>
            </Link>
            <ReactStars
             count={5} size={24} value='3' activeColor="#ffd700"
             />
             
             <p className={`description text-muted ${grid===1 ? "d-flex" : "d-none"} `}
             dangerouslySetInnerHTML={{__html: item?.description}}></p>
            <p className="price mt-1 fw-bold">৳ {item?.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}/-</p>
        </div>
        </Link>
        <div className="action-bar position-absolute">
            <div className="d-flex flex-column">
        <Link>
        <img src={compare} alt="add cart" title='Compare' />
        </Link>
        <Link to={`/product/${item?._id}`}>
        <img src={view} alt="add cart" title='View' />
        </Link>
        <button className='border-0 bg-transparent' onClick={(e)=>{addProdToCart(productData)}}>
        <img src={add_cart} alt="add cart" title='Add to cart'/>
        </button>
            </div>
        </div>
      
    </div>
   </div>
    )
    })
   }
  
   </>
  )
}

export default ProductCard