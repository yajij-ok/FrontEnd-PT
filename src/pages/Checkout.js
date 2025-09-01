import React, { useEffect, useState } from 'react'
import Meta from '../components/meta'
import BreadCrumb from '../components/breadCrumb'

import {Link, useLocation, useNavigate} from "react-router-dom"
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
import { useDispatch, useSelector } from 'react-redux';
import { clearCreatedOrder, createOrder, getUserCart, orderSingleProduct } from '../features/user/userSlice';
import axios from 'axios';
import { useFormik } from 'formik';
import * as yup from 'yup';
import SuccessModal from '../components/successModal'


const orderSchema = yup.object({
  addemail: yup.string().nullable().email("Email should be valid"),
  phone: yup.string().required("Phone number is required"),

});

const Checkout = () => {

 const dispatch = useDispatch()
 const location = useLocation()

const pathname = location.pathname
//const [prodId, setProdId] = useState("")
//const [quantity, setQuantity] = useState("")


  const pathLength = pathname.split('/').length

  const prodId = pathLength===4 ? (pathname.split("/")[3]) : "";

  const quantity= pathLength===4 ? parseInt( location.search.split("=")[1]): ""
  const queryParams = new URLSearchParams(location.search);
  const color= pathLength===4 ?(queryParams.get("color")): ""
  
console.log(color);

//if (pathLength===4) {
//   setProdId (pathname.split("/")[3]);
//   setQuantity( location.search.split("=")[1])
//}
 

  const [deliveryCharge, setDeliveryCharge] = useState(120)

  const [divisions, setDivisions] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [upazillas, setUpazillas] = useState([]);
  const [selectedDivision, setSelectedDivision] = useState({id:"", name:""});
  const [selectedDistrict, setSelectedDistrict] = useState({id:"", name: ""});
  const [selectedUpazilla, setSelectedUpazilla] = useState({id:"", name: ""});
  
  const [showModal, setShowModal] = useState(false);

  const getUser = useSelector((state)=>state.auth.user)
useEffect(()=>{
if (getUser.token) {
  dispatch(getUserCart())
}
  },[dispatch, getUser?.token])

   const cartState = useSelector((state)=> state.auth.cart)
   const {isLoading,isError ,isSuccess, createdOrder}  = useSelector((state)=> state.auth)
   const {singleProduct} = useSelector((state)=> state.product)

   //for Shipping Address

   useEffect(() => {
    // Fetch divisions on component mount
    axios.get('https://bdapi.vercel.app/api/v.1/division')
      .then(response => setDivisions(response.data))
      .catch(error => console.error('Error fetching divisions:', error));
  }, []);

  useEffect(() => {
    if (selectedDivision) {
      // Fetch districts when a division is selected
      axios.get(`https://bdapi.vercel.app/api/v.1/district/${selectedDivision.id}`)
        .then(response => setDistricts(response.data))
        .catch(error => console.error('Error fetching districts:', error));
    }
  }, [selectedDivision]);

  useEffect(() => {
    if (selectedDistrict) {
      // Fetch cities when a district is selected
      axios.get(`https://bdapi.vercel.app/api/v.1/upazilla/${selectedDistrict.id}`)
        .then(response => setUpazillas(response.data))
        .catch(error => console.error('Error fetching cities:', error));
    }
  }, [selectedDistrict]);


  // form control




    const navigate = useNavigate()
       const formik = useFormik({
               enableReinitialize: true,
              initialValues: {
               prodId: prodId,
               quantity: quantity ,
                email: '',
                phone: "+880",
                firstName: getUser.firstname || "",
                lastName: getUser.lastname || "",
                addEmail: "",
                shippingDiv: "",
                shippingDis:"",
                shippingUpa:"",
                shippingCity:"",
                deliveryCharge: deliveryCharge,
              },
              validationSchema: orderSchema,
              onSubmit: (values) => {
              if (pathLength===4) {
                dispatch(orderSingleProduct(values))
              } else {
                dispatch(createOrder(values)) 
              }
             
              },
         
            });
  
   useEffect(()=>{
      if (isSuccess ===true && createdOrder !== null) {
              setShowModal(true)
            }
   },[isSuccess, createdOrder])

  return (
    
  <>
   <Meta title ="Checkout" />
   <section className="checkout-wrapper">
    <div className="container-xl">
     <div>
       <h4 className="website-name mt-2">
            PlayTech.
        </h4>
        <nav style= {{"--bs-breadcrumb-divider": ">" }} aria-label="breadcrumb">
    <ol className="breadcrumb">
    <li className="breadcrumb-item"><Link to="/cart" className="text-secondary">Cart</Link></li> &nbsp; <IoIosArrowForward className="pt-1"/>
    <li className="breadcrumb-item active text-dark" aria-current="page ">Information</li> &nbsp; <IoIosArrowForward className="pt-1"/>
     <li className="breadcrumb-item "><Link to="/shipping"  className="text-secondary">Shipping</Link></li> &nbsp; <IoIosArrowForward className="pt-1"/>
      <li className="breadcrumb-item"><Link to="/payment" className="text-secondary">Payment</Link></li>
  </ol>
</nav>
     </div>
    </div>

<form action="" onSubmit={formik.handleSubmit}>

   <div class="order-wrapper px-5 mx-5">
    <div class="container-xl">
      <div class="row">

    <div className="info col-7  py-4 px-4">
    <div className="checkout-left-data ps-3 pe-5">
        
<h4 className="title">Contact information</h4>
<p className="user-details">
  {`${getUser.firstname} ${getUser.lastname} (${getUser.email}) `}
</p> 
<div  className="d-flex gap-10 flex-wrap justify-content-between py-4">
<div>
  <input type="text"
   id='firstName'
   className="form-control"
   placeholder="First Name"
   onBlur={formik.handleBlur("firstName")}
   onChange={formik.handleChange("firstName")}
   value={formik.values.firstName} required  />
</div>
<div>
  <input type="text" 
  className="form-control" 
  placeholder="Last Name" 
   onBlur={formik.handleBlur("lastName")}
   onChange={formik.handleChange("lastName")}
   value={formik.values.lastName}
  required />
</div>

<div  className="w-100">
<input type="email"
className="form-control"
placeholder="Additional Email (optional) "
onBlur={formik.handleBlur("addEmail")}
onChange={formik.handleChange("addEmail")}
value={formik.values.addEmail}/>

<div className="error text-danger mt-2">
  {formik.touched.addEmail && formik.errors.addEmail}
 </div>

</div>

<div  className="w-100">
<input type="text" className="form-control" placeholder="Phone Number" onBlur={formik.handleBlur("phone")} onChange={formik.handleChange("phone")} required/>
<div className="error text-danger mt-2">
  {formik.touched.phone && formik.errors.phone}
 </div>
</div>

<div  className="w-100">
<input type="text" className="form-control" placeholder="Address"/>
</div>

{/* shipping address */}


<div className='w-100'>
  <h5 className='fs-5 mt-4 mb-2'>Shipping Address *</h5>
</div>

<div className="w-100">
  <select id="division"
        value={selectedDivision.name}       
          onChange={e => {  
            const division = divisions.data?.find(d=> d.name === e.target.value);
             setSelectedDivision({ id: division.id, name: division.name });
             formik.setFieldValue("shippingDiv", division.name)
              
            }}
          className="form-control form-select" placeholder="address">
  <option value="" selected disabled >Select Division</option>
  {divisions.data?.map(division => (
            <option key={division.id}
             value={division.name}>
              {division.name}
            </option>
))}
  </select>
</div>

<div className="w-100">
  <select className="form-control form-select" placeholder="address"
  value={selectedDistrict.id}
   onChange={e =>{
    const district = districts.data?.find(d=>d.id === e.target.value)
     setSelectedDistrict({ id: district.id, name:district.name })
    formik.setFieldValue("shippingDis", district.name)
    }
     
   }
  >
  <option value="" selected disabled >Select District</option>
  {districts.data?.map(district => (
            <option key={district.id} value={district.id}>
              {district.name}
            </option>
     ))}       
  </select>
  </div>

  <div className=" w-75 ">
  <select className="form-control form-select" placeholder="address"
  value={selectedUpazilla.id}
  onChange={e=>{
    const upazilla = upazillas.data?.find(u=> u.id===e.target.value)
    setSelectedUpazilla({ id: upazilla.id, name:upazilla.name })
    formik.setFieldValue("shippingUpa", upazilla.name)
  }} >
  <option value="" selected disabled >Select Upazilla</option>
   {upazillas.data?.map(upazilla => (
            <option key={upazilla.id} value={upazilla.id}>
              {upazilla.name}
            </option>
          ))}
  </select>
</div>
<div  className="w-100">
<input type="text" className="form-control" placeholder="City"
onChange={formik.handleChange("shippingCity")}
value={formik.values.shippingCity}
required
/>
</div>
<div  className="w-100">
<input type="text" className="form-control" placeholder="Apartment , suits, house no. (optional)" />
</div>
</div>
<div className= " ">
<div className="d-flex justify-content-between align-items-center py-2">
<div className="d-flex gap-10">
  <IoIosArrowBack/>
  <Link to="/cart" className="text-dark mb-2">Return to Cart</Link>
  </div>
 </div>
</div>
    </div>
    </div>

     <div className="order col-5  py-4 px-4">
      <div className="py-3 px-2 border-bottom">
        <div>
          <h4 className="title">Order summery</h4>
        </div>
        {
          pathLength===4? 
           (
        <div key={singleProduct._id} class="order-product d-flex mt-4 p-1 gap-10">
          <div className="w-25 position-relative">
         <span
        style={{"top": "-5px", "right": "2px"}}
          className="badge bg-secondary text-white rounded-circle p-2 position-absolute">
         { quantity}
          </span>
          <img src={singleProduct?.images?.[0]?.url } alt="" className="img-fluid" />
        </div>
      <div className="w-75 py-2">
      <h5 className="title">{ singleProduct?.title}</h5>
      <h5>Price: ৳ {singleProduct?.price?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}/-</h5>
      <h5>Color: {color}</h5>
      </div>
        </div>)
            : (
  
        cartState?.products?.slice().reverse().map((item, index)=>{
          return(
        <div key={item._id} class="order-product d-flex mt-4 p-1 gap-10">
          <div className="w-25 position-relative">
         <span
        style={{"top": "-5px", "right": "2px"}}
          className="badge bg-secondary text-white rounded-circle p-2 position-absolute">
         {item.count}
          </span>
          <img src={ item.product.images?.[0]?.url} alt="" className="img-fluid" />
        </div>
      <div className="w-75 py-2">
      <h5 className="title">{item.product.title}</h5>
      <h5>Price: ৳ {item.product.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}/-</h5>
      
      </div>
        </div>
        )})
            )
        }
      
      </div>
  <div className='w-100'>
  <h5 className='fs-5 mt-4 mb-4'>Delivery *</h5>
</div>
       <div className="radio d-flex gap-30 mx-2 mt-1 py-2 ps-4 border-bottom">
    <div className="form-check">
  <input className="form-check-input" value={120} 
  onChange={(e)=>{
    setDeliveryCharge(parseInt(e.target.value));
  }}
  type="radio" name="flexRadioDefaultDC" id="flexRadioDefaultDC1" defaultChecked/>
  <label className="form-check-label" for="flexRadioDefaultDC1">
    Home Delivery
  </label>
</div>
<div className="form-check">
  <input className="form-check-input"  type="radio" value={80}
   onChange={(e)=>{
    setDeliveryCharge(parseInt(e.target.value));
  }}
 
   name="flexRadioDefaultDC" id="flexRadioDefaultDC2"/>
  <label className="form-check-label" for="flexRadioDefaultDC2">
   Standard Delivery
  </label>
</div>
    </div>
      <div className="cart-total border-bottom py-3">
      <div className="d-flex justify-content-between align-items-center">
        <p>Subtotal</p>
        <p> ৳ {pathLength===4? (singleProduct?.price * quantity)?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : cartState?.cartTotal.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}/-</p>
      </div>
      <div className="d-flex justify-content-between align-items-center">
       <p>Shipping</p>
      <p>৳ {deliveryCharge}/-</p>
      </div>
      </div>
      <div className="d-flex justify-content-between align-items-center border-bottom py-3">
        <h5>Total</h5>
        <p className='fw-bold'>৳ {pathLength===4? (singleProduct?.price * quantity + deliveryCharge)?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : (cartState?.cartTotal + deliveryCharge).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}/-</p>
      </div>
 <div className="radio gap-30 my-3 py-2 border-bottom">
  <div className='w-100'>
  <h5 className='fs-5 mt-4 mb-4'>Payment Method *</h5>
</div>
    <div className="form-check mb-3">
  <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" checked/>
  <label className="form-check-label" for="flexRadioDefault1">
   Cash On delivery
  </label>
</div>
<div className="form-check">
  <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" disabled />
  <label className="form-check-label" for="flexRadioDefault2">
   Online/Card payment (not available)
  </label>
</div>
    </div>
   
   <button type='submit' className="button bg-danger">
           Place Order
 </button>
    </div>


      </div>
    </div>
   </div>
</form>
   </section>
 <SuccessModal
        show={showModal}
        title="Your Order has been placed Successfully"
        message="Thanx for shopping at PlayTech.You can check on your order by visiting your account."
        onAction={() => {
          dispatch(clearCreatedOrder())
          navigate("/store");
        }}
      />
   </>
  )
}

export default Checkout