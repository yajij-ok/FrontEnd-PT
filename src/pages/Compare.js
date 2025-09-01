import React from 'react'
import Meta from '../components/meta'
import BreadCrumb from '../components/breadCrumb'
import product_01 from "../../src/assets/images/watch.jpg"
import cross from "../../src/assets/images/cross.svg"
import Color from '../components/color'

const Compare = () => {
  return (
    <>
    <Meta title ="Compare Product" />
   <BreadCrumb title="compare-product" />
   <div className="compare-products-wrapper py-5 home-wrapper-2">
    <div className="container-xl">
        <div className="row">
           <div className="col-3">
           <div className="compare-product-card position-relative">
            <img src={cross} alt="cross" className="position-absolute cross img-fluid" />
            <div className="product-card-image">
                <img src={product_01} alt="watch" className="img-fluid" />
            </div>
            <div className="compare-product-details mb-2">
                <h6 className="title">
                    Havells Smart Watch 2023
                </h6>
                <h7 className="price">2599/-</h7>
            </div>
            <div className="product-detail">
                <h6>Brand:</h6>
                <p>Havels</p>
            </div>
            <div className="product-detail">
                <h6>Type:</h6>
                <p>Watch</p>
            </div>
            <div className="product-detail">
                <h6>Availability:</h6>
                <p>In Stock</p>
            </div>
            <div className="product-detail">
                <h6>Color:</h6>
                <Color />
            </div>
            <div className="product-detail">
                <h6>Size:</h6>
                <div className="d-flex gap-10">
                    <p>S</p>
                    <p>M</p>
                </div>
            </div>
</div>
           </div>
           <div className="col-3">
           <div className="compare-product-card position-relative">
            <img src={cross} alt="cross" className="position-absolute cross img-fluid" />
            <div className="product-card-image">
                <img src={product_01} alt="watch" className="img-fluid" />
            </div>
            <div className="compare-product-details mb-2">
                <h6 className="title">
                    Havells Smart Watch 2023
                </h6>
                <h7 className="price">2599/-</h7>
            </div>
            <div className="product-detail">
                <h6>Brand:</h6>
                <p>Havels</p>
            </div>
            <div className="product-detail">
                <h6>Type:</h6>
                <p>Watch</p>
            </div>
            <div className="product-detail">
                <h6>Availability:</h6>
                <p>In Stock</p>
            </div>
            <div className="product-detail">
                <h6>Color:</h6>
                <Color />
            </div>
            <div className="product-detail">
                <h6>Size:</h6>
                <div className="d-flex gap-10">
                    <p>S</p>
                    <p>M</p>
                </div>
            </div>
</div>
           </div>
           <div className="col-3">
           <div className="compare-product-card position-relative">
            <img src={cross} alt="cross" className="position-absolute cross img-fluid" />
            <div className="product-card-image">
                <img src={product_01} alt="watch" className="img-fluid" />
            </div>
            <div className="compare-product-details mb-2">
                <h6 className="title">
                    Havells Smart Watch 2023
                </h6>
                <h7 className="price">2599/-</h7>
            </div>
            <div className="product-detail">
                <h6>Brand:</h6>
                <p>Havels</p>
            </div>
            <div className="product-detail">
                <h6>Type:</h6>
                <p>Watch</p>
            </div>
            <div className="product-detail">
                <h6>Availability:</h6>
                <p>In Stock</p>
            </div>
            <div className="product-detail">
                <h6>Color:</h6>
                <Color />
            </div>
            <div className="product-detail">
                <h6>Size:</h6>
                <div className="d-flex gap-10">
                    <p>S</p>
                    <p>M</p>
                </div>
            </div>
</div>
           </div>
           <div className="col-3">
           <div className="compare-product-card position-relative">
            <img src={cross} alt="cross" className="position-absolute cross img-fluid" />
            <div className="product-card-image">
                <img src={product_01} alt="watch" className="img-fluid" />
            </div>
            <div className="compare-product-details mb-2">
                <h6 className="title">
                    Havells Smart Watch 2023
                </h6>
                <h7 className="price">2599/-</h7>
            </div>
            <div className="product-detail">
                <h6>Brand:</h6>
                <p>Havels</p>
            </div>
            <div className="product-detail">
                <h6>Type:</h6>
                <p>Watch</p>
            </div>
            <div className="product-detail">
                <h6>Availability:</h6>
                <p>In Stock</p>
            </div>
            <div className="product-detail">
                <h6>Color:</h6>
                <Color />
            </div>
            <div className="product-detail">
                <h6>Size:</h6>
                <div className="d-flex gap-10">
                    <p>S</p>
                    <p>M</p>
                </div>
            </div>
</div>
           </div>
        </div>
    </div>
   </div>
    </>

   )
}

export default Compare