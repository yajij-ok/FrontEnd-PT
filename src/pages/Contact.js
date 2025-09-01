import React from 'react'
import Meta from '../components/meta'
import BreadCrumb from '../components/breadCrumb'
import contact_01 from "../../src/assets/images/contact-1.png"
import contact_02 from "../../src/assets/images/email.png"
import contact_03 from "../../src/assets/images/location.png"
const Contact = () => {
  return (
   <>
 <Meta title = "Contact" />
   <BreadCrumb title="Contact" />
   <div className="contact-wrapper home-wrapper-2 py-5">
  <div className="container-xl">
    <div className="row">
      <div className="col-12">
        <div className="contact-cards d-flex flex-wrap align-items-center justify-content-between gap-10">
          <div className="contact bg-info position-relative d-flex flex-wrap">
       <div className="contact-content text-white px-5 py-4">
        <h5>Hotline:</h5>
        <p>24/7 customer services.<br/> Contact any time.</p>
        <a className="" href="tel: 01319272896">+8801319272896</a>
       </div>
        <img src={contact_01} alt="" className="img fluid pt-5 pb-3"/>
          </div>


          <div className="contact bg-primary position-relative d-flex flex-wrap">
       <div className="contact-content text-white px-5 py-4">
        <h5>E-mail:</h5>
        <p>Send mail to our<br/>mail address.</p>
        <a className="" href="mailto: yajij334@gmail.com">yajij334@gmail.com</a>

       </div>
        <img src={contact_02} alt="" className="img fluid pt-5 pb-3"/>
          </div>


          <div className="contact bg-danger position-relative d-flex flex-wrap">
       <div className="contact-content text-white px-5 py-3">
        <h5>Address:</h5>
        <p>Come to our permanent shop <br /> with any problem or query.</p>
        <a className="" href="">Jamuna Future Park,<br />shop No.302</a>

       </div>
        <img src={contact_03} alt="" className="img fluid pt-5 pb-3"/>
          </div>
        </div>
      </div>
    </div>
  </div>
    </div>
    <section>
            <div class="container-xl py-5 col-12 text-center">
          <div class="contact-content">
            <h3>Meet the developer</h3>
            <div>
                <p class="text-dark fs-6">Whether you're a recruiter, client, or fellow developer, feel free to reach out—I'm always excited to collaborate or take on new challenges.</p>
            </div>
            <div class="social-links">
               <a href="https://www.linkedin.com/in/yajij-arafat-bbb26634a/"><i class="fab fa-linkedin fs-2 me-4 text-info"></i></a>
                <a href="https://www.facebook.com/Yajij.Arafat/"><i class="fab fa-facebook fs-2 me-4 text-info"></i></a>
                <a href="https://github.com/yajij-ok"><i class="fab fa-github fs-2 me-4 text-dark"></i></a>
               
            </div>
          </div>
        </div>
    </section>
   </>
  )
}

export default Contact