import React from 'react'
import Meta from '../components/meta'
import BreadCrumb from '../components/breadCrumb'
import product_01 from "../../src/assets/images/watch.jpg"
import { AiFillDelete } from "react-icons/ai";
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
import {Link} from "react-router-dom"

const Shipping = () => {
  return (
    <>
      <Meta title ="Shipping" />
   <div className="shippingg-wrapper checkout-wrapper">
    <div className="container-xl">
   <div className="row">
    <div className="col-7">
    <div className="shipping-left-data py-4 px-3">
        <h4 className="website-name">
            PlayTech.
        </h4>
        <nav style= {{"--bs-breadcrumb-divider": ">" }} aria-label="breadcrumb">
    <ol className="breadcrumb">
    <li className="breadcrumb-item"><Link to="/cart" className="text-secondary">Cart</Link></li> &nbsp; <IoIosArrowForward className="pt-1"/>
    <li className="breadcrumb-item text-secondary" aria-current="page ">Information</li> &nbsp; <IoIosArrowForward className="pt-1"/>
     <li className="breadcrumb-item active text-dark"><Link to="/shipping"  className="text-dark">Shipping</Link></li> &nbsp; <IoIosArrowForward className="pt-1"/>
      <li className="breadcrumb-item"><Link to="/payment" className="text-secondary">Payment</Link></li>
  </ol>
</nav>
<h5 className="title">Contact information</h5>
<p className="user-details">
  Navdeep dahiya (nshofid@gmail.com)
</p>
<h4>Shipping Address</h4>
<form action="" className="d-flex gap-10 flex-wrap justify-content-between py-4">
<div className="w-100">
  <select name="" id=" " className="form-control form-select" placeholder="address">
  <option value="" selected disabled >Select District</option>
  </select>

</div>
<div className=" w-75 ">
  <select name="" id=" " className="form-control form-select" placeholder="address">
  <option value="" selected disabled >Select Upazilla</option>
  </select>
</div>

<div  className="w-100">
<input type="text" className="form-control" placeholder="City" required/>
</div>
<div  className="w-100">
<input type="text" className="form-control" placeholder="Apartment , suits, house no. (optional)" />
</div>
</form>
<div className= " ">
<div className="d-flex justify-content-between align-items-center py-2">
<div className="d-flex gap-10">
  <IoIosArrowBack/>
  <Link to="/cart" className="text-dark mb-2">Return to Cart</Link>
  </div>
  <Link to="/products" className="button bg-warning text-dark">
            Continue to Shipping
        </Link></div>
</div>
    </div>
    </div>
    <div className="col-5 py-4">
      <div className="py-3 px-2 border-bottom d-flex gap-10 justify-content-between align0-items-center">
        <div className="w-25 position-relative">
         <span
        style={{"top": "-5px", "right": "2px"}}
          className="badge bg-secondary text-white rounded-circle p-2 position-absolute">
         1
          </span>
          <img src={ product_01} alt="" className="img-fluid" />
        </div>
      <div className="w-75 py-2">
      <h5 className="title">Smart watch with Blutooth 5.0 . headphone enabled.</h5>
      <p className="size">L</p>
      </div>
      <div className="py-4">
        <h5>2499/-</h5>
      </div>
      </div>
      <div className="border-bottom py-3">
      <div className="d-flex justify-content-between align-items-center">
        <p>Subtotal</p>
        <p>2499/-</p>
      </div>
      <div className="d-flex justify-content-between align-items-center">
       <p>Shipping</p>
      <p>60/-</p>
      </div>
      </div>
      <div className="d-flex justify-content-between align-items-center border-bottom py-3">
        <h5>Total</h5>
        <p>2559/-</p>
      </div>
    </div>
   </div>
    </div>
   </div>
    </>
  )
}

export default Shipping