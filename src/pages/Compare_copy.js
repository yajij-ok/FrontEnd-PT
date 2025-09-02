import React from 'react'
import Meta from '../components/meta'
import BreadCrumb from '../components/breadCrumb'
import { IoMdConstruct } from "react-icons/io";

const Compare_copy = () => {
  return (
    <>
    <Meta title ="Compare Product" />
   <BreadCrumb title="compare-product" />
    <div className='loading'>
    <div class="text-center mb-2 mt-5">
       <IoMdConstruct style={{color: "#a6a6a6", fontSize: "65px"}}/> 
    </div>
    </div>
     <p class="text-dark text-center mt-1 mb-5 fs-5">Work in progress....<br/> Please feel free to surf other sections.  </p>
  
    </>

   )
}

export default Compare_copy