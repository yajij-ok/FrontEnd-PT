import React, { useEffect, useMemo, useRef, useState } from 'react';
import ReactDOM from 'react-dom';
import ReactImageZoom from 'react-image-zoom';
import Meta from '../components/meta'
import BreadCrumb from '../components/breadCrumb'
import ProductCard from '../components/productCard'
import ReactStars from "react-rating-stars-component";
import product_01 from "../../src/assets/images/watch.jpg"

import { BsHeart,  BsRepeat} from 'react-icons/bs'
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, addToWishList, getWishList, removeFromCart, singleProduct } from '../features/product/productSlice';
import { useLocation, useNavigate} from 'react-router-dom';
import { getUserCart } from '../features/user/userSlice';
import { enqueueSnackbar, SnackbarProvider } from 'notistack';

const SingleProduct = () => {
  const location = useLocation()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const sectionRef = useRef(null)
  const [quantity, setQuantity] = useState(1)

  const prodId = location.pathname.split("/")[2]
  const PLACEHOLDER = "https://www.citypng.com/public/uploads/preview/loading-load-icon-transparent-png-701751695033022vy5stltzj3.png"

   const copyToClipboard = (text) => {
  console.log('text', text)
  var textField = document.createElement('textarea')
  textField.innerText = text
  document.body.appendChild(textField)
  textField.select()
  document.execCommand('copy')
  textField.remove()
}

const user = useSelector(state => state.auth?.user);

  useEffect(()=>{
    dispatch(singleProduct(prodId))
    if (user?.token) {
    dispatch (getUserCart())
    dispatch(getWishList())
    }
   
  },[prodId, user?.token])




   const wishlistCtrl = (id) => { 
    if (!user) {
      enqueueSnackbar("You are not logged in, Please log in first")
    }
    else dispatch(addToWishList(id))
    .unwrap()
        .then(()=>{
             dispatch(getWishList())
        })
   }

  const {isLoading} = useSelector((state)=>state.product)
  const productState = useSelector((state)=>state.product.singleProduct)
  const wishListState = useSelector((state)=> state.product.wishlist?.wishList)
  const {cart} =  useSelector((state)=>state.auth)

 const isWishlisted = wishListState?.some((i) => i._id === productState?._id);
const isProdInCart = cart?.products?.some((i) => i.product._id === productState?._id);
  
     const cartCtrl = (productData) =>{
      if (!user) {
    enqueueSnackbar("Please Login first")
    setTimeout(()=>{
      navigate("/login")
    }, 700)
  }
  if(user && isProdInCart) {
     dispatch(removeFromCart(productData.prodId))
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
const buyNowCtrl = () =>{
  if (!user) {
    enqueueSnackbar("Please, Login first")
    setTimeout(()=>{
      navigate("/login")
    },300)
  }
  else if(color===""){
     setWarning("show")
      sectionRef.current.scrollIntoView({ behavior: "smooth" });
    sectionRef.current.focus();
  }
else  navigate(`/product/buy/${productState._id}?qty=${quantity}&color=${color}`)
}
const [orderedProduct, setOrderedProduct] = useState(true);
const [mainImage, setMainImage] = useState(PLACEHOLDER);
const [imgSerial, setImgSerial] = useState(0)
const [color, setColor] = useState("")
const [warning, setWarning] = useState("d-none")
console.log(color);


const imgNumber= productState?.images?.length;
const colorNumber = productState?.color?.length;
const ImgPerColor = imgNumber/colorNumber;
const [index, selectedIndex] = useState(0)

const visibleImg = useMemo(() => {
  if (!productState?.images) return [];
  return productState.images.slice(ImgPerColor*imgSerial, ImgPerColor*imgSerial+ImgPerColor);
}, [productState, imgSerial, ImgPerColor]);



const images = useMemo(() => {
  return visibleImg
    .map((it) => {
      if (!it) return null;
      if (typeof it === "string") return it;
      return it.url || it.src || it.image || it.path || null;
    })
    .filter(Boolean);
}, [visibleImg]);

useEffect(() => {
  if (images.length) {
    setMainImage(images[index]);
  } else {
    setMainImage(PLACEHOLDER);
  }
}, [index,images]);

  if (!productState) {
  return <div>Loading...</div>;
  
}

const productData = {
        prodId : productState?._id,
        count: 1,
        color: ""
     }

 return (
<>
<Meta title ={productState?.title} />
   <BreadCrumb title={productState?.title}/>
   <div className="main-product-wrapper py-4 home-wrapper-2 bg-white">
    <div className="container-xl">
        <div className="row">
            <div className="col-6 mt-4"> 
            <div className="main-product-image ms-5 p-2">
          <div className="w-90">
             <img
              src={mainImage}
              alt={productState.title}
              className="img-fluid border-rounded"
            />
          </div>
            </div>
            <div className="ms-2 other-product-images d-flex flex-wrap w-100">
             
            {visibleImg?.map((img, index) => (
    
              <div className="d-flex">
                 <img
                key={index}
                src={img.url}
                alt={`${productState.title} ${index + 1}`}
                className={` img-thumbnail ${mainImage === img.url ? "border-primary" : ""}`}
                style={{ width: "100%", cursor: "pointer", height : "100%" }}
                onClick={() => {
                  setMainImage(img.url)
                  selectedIndex(index)
                }}
              />
               </div>
            ))}
          

            </div>
            </div>
            <div className="col-6">
          <div className="main-product-details p-3">
            <div>
              <h3 className='fw-bold'>{productState?.title}</h3>
              <h5 className="py-2 fw-bold">৳ {productState?.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}/-</h5>
               <ReactStars
    count={5} size={18} value='3' edit={false} activeColor="#ffd700"/>
    
            </div>
            <div>
               <div className="d-flex flex-wrap py-2">
              <h5 className="pe-2">Type:</h5>
              <p>{productState?.category}</p>
              </div>
            <div className="d-flex flex-wrap py-2">
              <h5 className="pe-2">Brand:</h5>
              <p>{productState?.brand}</p>
            </div>
             <div className="d-flex flex-wrap py-2">
              <h5 className="pe-2">Categories:</h5>
              <p>{productState?.category}</p>
              </div>
              <div className="d-flex flex-wrap py-2">
              <h5 className="pe-2">Tags:</h5>
              <div className="products-tags d-flex flex-wrap align-items-center gap-10">
      <span className="badge bg-light text-secondary rounded-3 py-2 px-3">
        {productState?.brand}
      </span>
      <span className="badge bg-light text-secondary rounded-3 py-2 px-3">
      {productState?.category}
      </span>
      <span className="badge bg-light text-secondary rounded-3 py-2 px-3">
       {productState?.tags?.[0]}
      </span>
      <span className="badge bg-light text-secondary rounded-3 py-2 px-3">
        watch
      </span>
        </div>
            </div>
             <div className='my-4' ref={sectionRef} tabIndex="-3">
              <h5 className="py-2 mb-1">Select Color :</h5>
              <ul className="colors ps-0">
                {productState?.color.map((i, index)=>{
              return(
                 <li key={i?._id} className={imgSerial === index ? "border-3 border-primary" : ""}
                  style={{
                  backgroundColor :`${i.hexId}`,
                  border: `${i.hexId==="#ffffff"? "1px solid black": `1px solid ${i.hexId}`}`,
                  cursor: "pointer"
                }}
                title={i.title}
                onClick={()=>{
                   setImgSerial(index)
                   setColor(i.title)
                }}></li>
              )
                })}        
            </ul>
             <p className={`text-danger ${warning}`}>Please, Pick a color. Click on the color even if it shows selected.</p>
             </div>
             <div  className="d-flex flex-wrap py-2">
                <h5 className="pe-2">Screen:</h5>
                <p>720 X 720 pixels </p>
              </div>
              <div  className="d-flex flex-column py-2">
                <h5 className="pe-2">Size:</h5>
                <div className="d-flex flex-wrap gap-15 py-2">
                  <span className="badge border border-1 bg-white text-dark border-secondary">S</span>
                  <span className="badge border border-1 bg-white text-dark border-secondary">M</span>
                  <span className="badge border border-1 bg-white text-dark border-secondary">L</span>

                </div>
              </div>
              
                 <div className="d-flex flex-wrap py-2">
                  <h5 className="pe-2">Warranty:</h5>
                  <p>6 Month Brand Warranty</p>
                 </div>
                 <div className="d-flex flex-wrap py-2">
                    <h5 className="pe-2">SKU:</h5>
                    <p>SKU1998</p>
                  </div>
                   <div className="d-flex flex-wrap py-2">
                    <h5 className="pe-2">Available:</h5>
                    <p>Yes</p>
                  </div>
                 
                  <div className="d-flex flex-column py-2">
                    <h5 className="pe-2" >Quantity:</h5>
                    <div className="py-2 d-flex justify-content-center gap-15">
                      <input type="number" name="" min={1} max={10} value={quantity} defaultValue={1}
                       onChange={(e)=>{setQuantity(Number(e.target.value))}}
                        style={{ width: "35px"}} id="quantity"
                         />
                     
                      <button className="button border-0" onClick={buyNowCtrl}>
                        Buy Now
                        </button>

                      <button onClick={(e) =>{
                        cartCtrl(productData)
                      }} className="button border-0 bg-warning text-dark" dangerouslySetInnerHTML={{__html: isProdInCart? "Remove from Cart" :  "Add to Cart"}}>
                    
                      </button>
                      
                    </div> 
                  </div>
                  <div className="d-flex flex-wrap gap-15 py-2">
                    <div className="d-flex gap-10">

                      <button onClick={(e)=>{
                        if(!user){
                          enqueueSnackbar("Please login first")
                        }else{
                          wishlistCtrl(productData.prodId)
                        }
                      }}
                      className='border-0 bg-transparent d-flex gap-10'>
                         {isWishlisted? 
                         ( <>
                         <i className="mt-1" class="fa-solid fa-heart"></i>
                          <p className="mb-0  text-secondary" style={{fontSize : '15px'}}>
                            Remove from Wishlist
                            </p>
                         </> ) : (
                          <>
                          <i className="mt-3" class="fa-regular fa-heart"></i>
                          <p className="mb-0  text-secondary" style={{fontSize : '15px'}}>
                            Add to Wishlist
                            </p>
                         </>
                         )}
                      </button>
                    </div>
                    <div className="d-flex gap-10">
                    <BsRepeat  className="mt-1"/>
                      <a href="">Add to Compare</a>
                    </div>
                  </div>
                  </div>
          
                  <div className="d-flex flex-wrap py-2">
              <h5 className="pe-2">Shipping & Returns:</h5>
              <p>Free shipping and returns available on all order! <br /> We ship all orders in seven commercial days.</p>
              </div>
              <div className="d-flex flex-wrap py-2">
              <h5 className="pe-2">Product link:</h5>
              <a href="javascript:void(0);" onClick={()=>{
                copyToClipboard(`https://${location.pathname}`)
                }}>Copy product link</a>
              </div>

          </div>
            </div>
        </div>
        
    </div>
   </div>
   <div className="description-wrapper py-2 home-wrapper-2">
    <div className="container-xl">
      <div className="row">
        <div className="col-12">
          <div className="bg-white p-3">
          <h5>Description:</h5>
          <p className="bg-white p-3">
           {productState?.description}
          </p>
          </div>
        </div>
      </div>
    </div>
   </div>
   <section className="reviews-wrappers py-4 home-wrapper-2">
    <div className="container-xl">
        <div className="row">
        <div className="col-12  p-3 bg-white">
       <div className="review-head d-flex justify-content-between align-items-end">
        <div className="review-inner">
          <h5>Customer Review</h5>
         <div className="d-flex gap-15 align-items-center">
         <ReactStars
    count={5} size={18} value='3.5' edit={false} activeColor="#ffd700"/>
    <p className="mb-0">Based on 2 reviews</p>
         </div>
        </div>
        {orderedProduct && (
          <div>
        <a href=""> Write a review </a>
        </div>
        )}
       </div>
       <div className="review-form p-2">
        <form action="" className="d-flex flex-column gap-15">
          <div>
            <h5>Write a review</h5>
          <ReactStars
    count={5} size={18} value='0' edit={true} activeColor="#ffd700"/>
          </div>
          <div>
           <textarea name="" id="" className="w-100 form-control" cols="30" rows="4" placeholder="Comment"></textarea>
          </div>
          <div className="d-flex justify-content-end">
            <button className="button border-0">Submit</button>
          </div>
        </form>
       </div>
       <div className="reviews mt-5">
        <div className="review">
        <div className="d-flex gap-10">
          <h6 className="mb-0 pb-0">Bakkar</h6>
        <ReactStars
    count={5} size={18} value='3.5' edit={false} activeColor="#ffd700"/>
        </div>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur neque ad eum molestiae dolores hic voluptate eaque officia dolorum odio, doloremque, animi molestias cupiditate rerum expedita dolorem deleniti laboriosam </p>
        </div>
       </div>
        </div>
        </div>
    </div>
   
   </section>
   <section className="featured-wrapper py-3"> 
  <div className="container-xl">
    <div className="row">
      <div className="col-12">
        <h3 className="section-heading">Featured Collection</h3>
      </div>
      <ProductCard/>
     <ProductCard/>
     <ProductCard/>
     <ProductCard/>

    </div>
  </div>
</section>
   </>
  )
}

export default SingleProduct