import React, { useEffect, useState } from 'react'
import BreadCrumb from '../components/breadCrumb'
import Meta from '../components/meta'
import ReactStars from "react-rating-stars-component";
import ProductCard from '../components/productCard';

import product_01 from "../../src/assets/images/watch.jpg"
import smart_TV from "../../src/assets/images/tv.png"
import gr from "../../src/assets/images/gr.svg"
import gr2 from "../../src/assets/images/gr2.svg"
import gr3 from "../../src/assets/images/gr3.svg"
import gr4 from "../../src/assets/images/gr4.svg"

import { useDispatch, useSelector } from 'react-redux';
import { allProducts, getallCat, getBrands, getWishList } from '../features/product/productSlice';
import { useLocation } from 'react-router-dom';


const OurStore = () => {
  const location = useLocation()
const pathname = location.pathname

const pathLength = pathname.split('/').length

const searchKeyword= pathLength===3 ? location.search.split("=")[1]: ""

  console.log(pathLength);
  
const [grid, setGrid] = useState(4);

const [minPrice, setMinPrice] = useState("");
const [maxPrice, setMaxPrice] = useState("");
  const [keyword, setKeyword] = useState(searchKeyword);
  const [sortValue, setSortValue] = useState("");
  const [category, setCategory] = useState("");
  const [brand, setBrand] = useState("");

  
const dispatch = useDispatch()
const {user} = useSelector((state) => state.auth)

useEffect(()=>{
  if (user?.token) {
    dispatch(getWishList())
  }
  dispatch(getallCat());
  dispatch(getBrands())
},[allProducts, getWishList, getallCat, getBrands, dispatch])

const productState = useSelector((state) => state.product.allProducts)
const wishListState = useSelector((state)=> state.product.wishlist?.wishList)
const {isError, isLoading, count} = useSelector((state) => state.product)
const {categories, brands} = useSelector((state) => state.product)
const [showAll, setShowAll] = useState(false);
const visibleBrands = showAll ? brands : brands?.slice(0, 4);





useEffect(() => {

  const gte = minPrice ? Number(minPrice) : undefined;
  const lte = maxPrice ? Number(maxPrice) : undefined;

    const params = {};
  if (!isNaN(gte)) params["price[gte]"] = gte;
  if (!isNaN(lte)) params["price[lte]"] = lte;

    // Keyword
    if (keyword.trim() !== "") params.keyword = keyword.trim();

    // Sorting
    if (sortValue) params.sort = sortValue;

    // Category & Brand
    if (category) params.category = category;
    if (brand) params.brand = brand;


  dispatch(allProducts(params));
    
  }, [minPrice, maxPrice, keyword, sortValue,category, brand, dispatch]);


  return (
<>
<Meta title = "Our Store" />
<BreadCrumb title="Our Store" />

<div className="store-wrapper home-wrapper-2 py-3">``
  <div className="container-xl">
    <div className="row">
      <div className="col-3">
        <div className="filter-card mb-2">
        <h3 className="filter-title">Shop By Categories</h3>
        <div>
           <ul className="ps-0">
            <li className='mb-0' onClick={()=>{setCategory("")}} >All</li>  
            {
              categories?.map((cat)=>{
                  return(
                    <>
                <li className={`cat-list ${category==cat.title ? "fw-bold text-dark" : ""}`} key={cat?._id} onClick={()=>{setCategory(cat?.title)}}> {cat?.title}</li>
                 
                </>  )
              })
            }
</ul>
     
        </div>
        </div>

        <div className="filter-card mb-2">
        <h3 className="filter-title">Select brand</h3>
        <div>


           <ul  className="ps-0">
            <li  className='mb-0' onClick={()=>{setBrand("")}} >All</li>  
            {
              visibleBrands?.map((item)=>{
                  return(
                    <>
                <li className={`cat-list ${brand==item.title ? "fw-bold text-dark" : ""}`}
                
                 key={item?._id} onClick={()=>{setBrand(item?.title)}}> {item?.title}</li>
                 
                </>  )
              })
            }

            {brands?.length > 5 && (
          <li
            className="text-primary mt-2"
            onClick={() => setShowAll(!showAll)}
            style={{ cursor: "pointer" }}
          >
            {showAll ? "Show Less" : "Show More"}
          </li>
        )}
</ul>
     
        </div>
        </div>


        <div className="filter-card mb-2">
        <h3 className="filter-title">Filter By</h3>
      

        <div>
          <form>
          <h5 className="sub-title">Price</h5>
          <div className="d-flex align-items-center gap-10">
          <div className="form-floating mb-3">
         <input type="number" className="form-control"  id="floatingInput" placeholder="From"
          value={minPrice}
          onChange={(e) => setMinPrice(e.target.value)}/>
         <label htmlFor="floatingInput">From</label>
</div>

     <div className="form-floating mb-3">
  <input type="number" className="form-control" id="floatingInput" placeholder="To" 
  value={maxPrice}
  onChange={(e) => setMaxPrice(e.target.value)}/>
  <label htmlFor="floatingInput">To</label>
</div>
     </div>
     </form>
        </div>
        </div>

        <div className="filter-card mb-2">
        <h3 className="filter-title">Product Tags</h3>
        <div className="products-tags d-flex flex-wrap align-items-center gap-10">
      <span className="badge bg-light text-secondary rounded-3 py-2 px-3">
        headphone
      </span>
      <span className="badge bg-light text-secondary rounded-3 py-2 px-3">
       laptop
      </span>
      <span className="badge bg-light text-secondary rounded-3 py-2 px-3">
        mobile
      </span>
      <span className="badge bg-light text-secondary rounded-3 py-2 px-3">
        watch
      </span>
        </div>
        </div>

        <div className="filter-card mb-2">
        <h3 className="filter-title">Random Product</h3>
        <div className="random-products">
         <div className="random-prod-1 d-flex">
         <div className="w-50">
            
            <img src={product_01} alt="" className="img-fluid"/>
        
          </div>
          <div className="w-50 py-2">
          <h6>Watch for Man</h6>
         
          <ReactStars
    count={5} size={24} value='3' edit={false} activeColor="#ffd700"/>

     <b>1499/-</b>
 </div>
         </div>

         <div className="random-prod-2 d-flex">
         <div className="w-50">
            <img src={smart_TV} alt="" className="img-fluid"/>
          </div>
          <div className="w-45 py-3 ps-2">
          <h6>4K Smart TV</h6>
         
          <ReactStars
    count={5} size={24} value='4' edit={false} activeColor="#ffd700"/>
     <b>15,999/-</b>
 </div>
         </div>
        </div>
        </div>
      </div>

      <div className="col-9">
        <div className="filter-sort-grid mb-3">
         <div className="sort-by d-flex justify-content-between align-items-center">
         <div className="d-flex align-items-center gap-10">
            <p className="mb-0 d-block" style={{"width": "100px"}}>Sort by:</p>
            <select name="" onChange={(e)=>{setSortValue(e.target.value)}} className="form-control form-select py-1" id="">
              <option value="manual">Featured</option>
              <option value="best-selling" selected="selected" >Best Selling</option>
              <option value="title">Alphabetically, A-Z</option>
              <option value="-title">Alphabetically, Z-A</option>
              <option value="price">Price, low to high</option>
              <option value="-price">price, high to low</option>
            </select>
          </div>
          <div className="d-flex align-items-center gap-10 grid">
            <p className="total-products mb-0">{productState?.length} Products</p>
            <div className="d-flex gap-10 align-items-center grid">
            <img
            onClick={()=>{setGrid(4)}}
            src={gr4} alt="grid" className="d-block img-fluid"/>
            <img
            onClick={()=>{setGrid(3)}}
            src={gr3} alt="grid" className="d-block img-fluid"/>
            <img
            onClick={()=>{setGrid(2)}}
              src={gr2} alt="grid" className="d-block img-fluid"/>
            <img
            onClick={()=>{setGrid(1)}}
             src={gr} alt="grid" className="d-block img-fluid"/>
            </div>
          </div>
         </div>

        </div>

      <div className="product-list d-flex align-items-center flex-wrap gap-10 pb-4">
        {count==0? (
        <div className='mt-5'>
          <p className='text-center fs-5'>No products found</p>
        </div>
        ):(
       <ProductCard data={productState} wishListState={wishListState} grid={grid} />
        )}
      
      
      </div>
      </div>
    </div>
  </div>
</div>
</>
  );
}


export default OurStore