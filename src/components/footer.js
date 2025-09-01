import React from 'react'
 import play from '../../src/assets/icons/google-play.svg'
import apple from '../../src/assets/icons/apple.svg'
const Footer = () => {
 return (
 <>
       
        <footer className="footer-top gap-30 align-items-center">
    <div className="container-xxl">
      <div className="row">
        <div className="col-12">
          <div className="footer-list d-flex justify-content-cneter align-items-center py-3">
          <div className="col-3">
          <div className="footer-list-1">
      <ul>
      <li><a href="/privacy-policy">Privacy Policies</a></li>
      <li><a href="/terms-conditions">Terms & Conditions</a></li>
       <li> <a href="#">Help</a></li>
       <li> <a href="#">FAQs</a></li>
       </ul>
       </div>
       </div>
       <div className="col-3">
       <div className="footer-list-2">
      <ul>
      <li> <a href="">Shipping</a></li>
       <li> <a href="/refund-policy">Refund Policy</a></li>
       <li><a href="">Warranty Policy</a></li>
       <li> <a href="">License</a></li>
       </ul>
       </div>
       </div>
       <div className="col-3">
       <div className="footer-list-3 container-xxl py-3">
      <ul>
      <li> <a href="/contact">Contact</a></li>
       <li> <a href="">Facebook</a></li>
       <li><a href="">Twitter</a></li>
       <li> <a href="">InstaGram</a></li>
       </ul>
       </div>
       </div>
       <div className="col-3">
       <div className="apps align-items-row">
        
          <p className="text-white">Get our Mobile Apps:</p>

    <div className="apps-icon d-flex align-item-center">
    <div className="play-icon align-item-center">
      <a href="">
      <img src={play} alt="" />
      </a>
      <p className="text-white">Google Play Store</p>
     </div>
     <div className="apple-icon align-item-center">
      <a href="">
      <img src={apple} alt="" />
      </a>
      <p className="text-white">Apple app store</p>
     </div>
    </div>

       </div>
       </div>
          </div>
        </div>
      </div>
    </div>
    
        </footer>
      

 <footer className="py-2">
  <div className="container-xl">
    <div className="col-12">
      <div className="text-white">
      <p className=" footer-text text-center mb-0 text-white">
        &copy; { new Date().getFullYear()}; Powered by Yajij Arafat.
      </p>
      </div>
    </div>
  </div>
 </footer>
</>
 )
}


export default Footer