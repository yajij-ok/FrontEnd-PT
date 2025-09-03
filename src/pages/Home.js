import React, { useEffect, useMemo, useState } from 'react'
import Meta from '../components/meta'
import { Link, useNavigate } from 'react-router-dom'

import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

import ProductCard from '../components/productCard'
import SpecialProduct from '../components/specialProduct'
import Marquee from "react-fast-marquee";

import main_banner from "../../src/assets/images/banner-bg.jpg"
import inside_banner from "../../src/assets/images/banner-inside.png"
import inside_banner_2 from "../../src/assets/images/inside-banner-2.png"
import inside_banner_3 from "../../src/assets/images/inside-banner-3.png"

import services_1 from "../../src/assets/images/service.png"
import services_2 from "../../src/assets/images/service-02.png"
import services_3 from "../../src/assets/images/service-03.png"
import services_4 from "../../src/assets/images/service-04.png"
import services_5 from "../../src/assets/images/service-05.png"
import laptop from "../../src/assets/images/laptop.png"
import mobile1 from "../../src/assets/images/mobile-1.png"
import tv from "../../src/assets/images/tv.png"
import smart_watch from "../../src/assets/images/smart-watch.png"

import brand_01 from "../../src/assets/images/brand-01.png"
import brand_02 from "../../src/assets/images/brand-02.png"
import brand_03 from "../../src/assets/images/brand-03.png"
import brand_04 from "../../src/assets/images/brand-04.png"
import brand_05 from "../../src/assets/images/brand-05.png"
import brand_06 from "../../src/assets/images/brand-06.png"
import brand_07 from "../../src/assets/images/brand-07.png"
import brand_08 from "../../src/assets/images/brand-08.png"
import { useDispatch, useSelector } from 'react-redux'
import { allProducts } from '../features/product/productSlice'
import { getUserCart } from '../features/user/userSlice';
import FeaturedCard from '../components/featuredCard';
import { serverInitialize } from '../features/initialize/serverSlice';




const Home = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  useEffect(()=>{
    dispatch(allProducts())
    dispatch(serverInitialize())
  },[dispatch])

  const productState = useSelector((state)=> state.product.allProducts)
    const {isLoading} = useSelector((state)=> state.server)



 const [currentSlide, setCurrentSlide] = useState(0);

 const settings = useMemo(()=>({
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3500,
    afterChange:  (index) => {
        setCurrentSlide((prev) => (prev !== index ? index : prev));
      },
  }),[]);

  if (isLoading) {
    return(
      <>
    <div className='loading'>
    <div class="text-center spinner mb-2 mt-5"></div>
    </div>
     <p class="text-dark text-center mt-1 mb-5 fs-5">Connecting to server. It may take a few seconds. </p>
  </>
  )}
  else
  return (
  <>
<Meta title = "PlayTech" />

 <section className="home-wrapper-1 banner pb-5">
  <div className="container-xxl">
      <div className="col-12">
         <Slider {...settings}>
      <div>
        <img src={main_banner} alt="Banner 1" className="w-full banner-bg" />
        <img src={inside_banner}  alt="Banner 1" 
        className={`inside-banner ${currentSlide === 0 ? "animate-pop" : ""}`} />
       <div className="banner-details w-25">
       <h1 className={`text-white banner-text w-50 ${currentSlide === 0 ? "pop-right" : ""}`}>
       Discover the Latest in Electronics
        </h1>
        <p className={`banner-sub-text ${currentSlide === 0 ? "animate-sub-text" : ""}`}>
          Disover the newest arrivals in smartphones, laptops and more.
          </p>
        <button onClick={()=>navigate('/store')} className={`banner-btn btn ${currentSlide === 0 ? "animate-sub-text" : ""}`}>Shop Now</button>
       </div>
      </div>
      <div className=''>
        <img src={main_banner} alt="Banner 2" className="w-full banner-bg" />
         <img src={inside_banner_2}  alt="Banner 1" 
        className={`inside-banner ${currentSlide === 1 ? "animate-pop" : ""}`} />
       <div className="banner-details w-25">
       <h1 className={`text-white banner-text w-50 ${currentSlide === 1 ? "pop-right" : ""}`}>
       Make Music more Realistic <br/>and Comfy
        </h1>
        <p className={`banner-sub-text ${currentSlide === 1 ? "animate-sub-text" : ""}`}>
          Disover the newest arrivals in Earbuds, Headphones and more.
          </p>
        <button onClick={()=>navigate('/store')} className={`banner-btn btn ${currentSlide === 1 ? "animate-sub-text" : ""}`}>
          Shop Now
          </button>
          </div>
      </div>
      <div>
        <img src={main_banner} alt="Banner 3" className="w-full banner-bg" />
        <img src={inside_banner_3}  alt="Banner 1" 
        className={`inside-banner ${currentSlide === 2 ? "animate-pop" : ""}`} />
       <div className="banner-details w-25">
       <h1 className={`text-white banner-text w-50 ${currentSlide === 2 ? "pop-right" : ""}`}>
      Get Your wrist a smart <br/> and Dashing look
        </h1>
        <p className={`banner-sub-text ${currentSlide === 2 ? "animate-sub-text" : ""}`}>
          Disover the newest arrivals in Smart watch and others.
          </p>
        <button onClick={()=>navigate('/store')} className={`banner-btn btn ${currentSlide === 2 ? "animate-sub-text" : ""}`}>
          Shop Now
          </button>
          </div>
      </div>
    </Slider>
    </div>
  </div>
</section>


<section className="home-wrapper-2 py-2">
  <div className="container-xl">
    <div className="row">
    <div className="col-12">
      <div className="services d-flex align-items-center justify-content-between ps-6 gap-30">
        <div className="service-details d-flex align-items-center gap-10">
          <img src={services_1} alt="services-1" className='service-icon' />
          <div className="py-1">
            <h6>Free shipping</h6>
            <p>From all orders over 5000Tk</p>
          </div>
        </div>
        <div className=" service-details d-flex align-items-center gap-10">
          <img src={services_2} alt="fdhg" className='service-icon' />
          <div className="py-1">
            <h6>Surprise offers</h6>
            <p>Save upto 25%</p>
          </div>
        </div>
        <div className="service-details d-flex align-items-center gap-10">
          <img src={services_3} alt="dhg" className='service-icon' />
          <div className="py-1">
            <h6>Support 24/7</h6>
            <p>Shop with an expert</p>
          </div>
        </div>
        <div className="service-details d-flex align-items-center gap-10">
          <img src={services_4} alt="dtgjhtg" className='service-icon' />
          <div className="py-1">
            <h6>Affordable Prices</h6>
            <p>Get factory default price</p>
          </div>
        </div>
        <div className=" service-details d-flex align-items-center gap-10">
          <img src={services_5} alt="" className='service-icon' />
          <div className="py-1">
            <h6>Secure payment</h6>
            <p>100% protected payment</p>
          </div>
        </div>
      </div>
    </div>
    </div>
  </div>
</section>

<section className="py-5 px-5 home-wrapper-2 mx-3">      
        <h3 className="section-heading">Featured Collection</h3>
        <div className='featured-wrapper'>
        <div class="featured-card-wrapper d-flex gap-30">
           {
        productState?.slice().reverse().map((item, index)=>{ 
        const productData = {
        prodId : item?._id,
        count: 1,
        color: ""
     }
          for (let i=0;  i < item?.tags.length ; i++) {
      
            if(item?.tags[i]=== "featured"){
          return (
         <FeaturedCard key={index} id = {item?._id} title ={item?.title} brand={item?.brand} price={item?.price} img={item?.images?.[0]?.url} productData={productData}/>
          )}
          }
          
        })
      }
        </div> 
        </div> 
</section>

<section className="famous-wrapper py-3 home-wrapper-2 pb-5">
  <div style={{"height": "350px"}} className="container-xl">
    <div className="row">
    <div className="col-12">
        <h3 className="section-heading">Famous Collection</h3>
      </div>
      <div className="col-3">
     <div style={{"height": "350px"}} className="famous-card bg-danger text-white p-3">
    <p>Big screen</p>
    <h5>Smart Watch Series 7</h5>
    <p> From 2999/- to 6499/-</p>
    <img src={smart_watch} alt="" className="img-fluid" /> 
     </div>
     </div>
     <div className="col-3">
     <div style={{"height": "350px"}} className="famous-card bg-white text-white p-3">
    <p className="text-dark">Studio Display</p>
    <h5 className="text-dark">600 Nits of Brightness</h5>
    <p className="text-dark"> 16-inch 4k display Laptop</p>
    <img src={laptop} alt="" className="img-fluid py-3" /> 
     </div>
     </div>
     <div className="col-3">
     <div style={{"height": "350px"}} className="famous-card bg-info text-white p-3">
    <p className="text-white">Smart Phone</p>
    <h5 className="text-white">Higher Display Ratio</h5>
    <p className="text-white">Latest Iphone 14 Pro</p>
    <img src={mobile1} alt="" className="img-fluid py-1" /> 
     </div>
     </div>
     <div className="col-3">
     <div className="famous-card bg-dark text-white p-3">
    <p className="text-white">Smart TV</p>
    <h5 className="text-white">Watch The World In HD</h5>
    <p className="text-white">4k Smart TV</p>
    <img src={tv} alt="" className="img-fluid py-1 px-2" /> 
     </div>
     </div>
    </div>
  </div>
</section>

<section className="special-wrapper py-4 home-wrapper-2">
  <div className="container-xl">
    <div className="row">
      <div className="col-12">
        <h3 className="section-heading">Special Products</h3>
      </div>
    </div>
    <div className="row">
      {
        productState?.map((item, index)=>{ 
        const productData = {
        prodId : item?._id,
        count: 1,
        color: ""
     }
          for (let i=0;  i < item?.tags.length ; i++) {
      
            if(item?.tags[i]=== "special"){
          return (
         <SpecialProduct key={index} id = {item?._id} title ={item?.title} brand={item?.brand} price={item?.price} img={item?.images?.[0]?.url} productData={productData}/>
          )}
          }
          
        })
      }
      
    </div>
  </div>
</section>

<section className="marquee-wrapper py-5">
  <div className="container-xl">
   <div className="row">
   <div className="col-12">
     <div className="marquee-inner-wrapper card-wrapper">
     <Marquee className="d-flex">
     <div className="mx-3 w-5">
      <img src={brand_01} alt="brand" className="brand-pic"/>
     </div>
     <div className="mx-3 w-5">
      <img src={brand_02} alt="brand" className="brand-pic"/>
     </div>
     <div className="mx-3 w-5">
      <img src={brand_03} alt="brand" className="brand-pic"/>
     </div>
     <div className="mx-3 w-5">
      <img src={brand_04} alt="brand" className="brand-pic"/>
     </div>
     <div className="mx-3 w-5">
      <img src={brand_05} alt="brand" className="brand-pic"/>
     </div>
     <div className="mx-3 w-5">
      <img src={brand_06} alt="brand" className="brand-pic"/>
     </div>
     <div className="mx-3 w-5">
      <img src={brand_07} alt="brand" className="brand-pic"/>
     </div>
     <div className="mx-3 w-5">
      <img src={brand_08} alt="brand" className="brand-pic"/>
     </div>
      </Marquee>
     </div>
    </div>
   </div>
  </div>
</section>

  </>
  )
}

export default Home