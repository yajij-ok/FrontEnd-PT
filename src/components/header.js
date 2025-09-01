import React, { useEffect, useState } from 'react'
import {NavLink, Link, useLocation, useNavigate} from 'react-router-dom'
import {BsSearch , BsCart4, BsHeart, BsPerson, BsRepeat} from 'react-icons/bs'
import {CgMenuGridO} from 'react-icons/cg'
import { useDispatch, useSelector } from 'react-redux'
import { clearSuggestions, getallCat, getWishList, searchSuggestion } from '../features/product/productSlice'


const Header = () => {
  let location = useLocation();
  const navigate= useNavigate()
  const dispatch = useDispatch()
 
  const [query, setQuery] = useState("");
  const [placeholder, setPlaceholder] = useState("Search Product Here...")
  const [activeIndex, setActiveIndex] = useState(-1);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    dispatch(searchSuggestion(query));
    dispatch(getallCat())

  }, [searchSuggestion, query,getallCat ])
  


const {suggestions, categories} = useSelector((state) => state.product)

 const handleChange = (e) => {
    const value = e.target.value
    setQuery(value);
    setActiveIndex(-1);

  };
  const handleSearchButton =()=>{
   if (query=== "") {
     setPlaceholder("⚠️ Please write something!")
   } else {
    navigate(`/store/search?keyword=${query}`)
    setPlaceholder("Search Product Here...")
     dispatch(clearSuggestions());
   }
  }

  
const handleKeyDown = (e) => {
    if (e.key === "ArrowDown") {
      setActiveIndex((prev) =>
        prev < suggestions.length - 1 ? prev + 1 : prev
      );
    } else if (e.key === "ArrowUp") {
      setActiveIndex((prev) => (prev > 0 ? prev - 1 : -1));
    } else if (e.key === "Enter") {
      if (activeIndex >= 0 && activeIndex < suggestions.length) {
        handleSelect(suggestions[activeIndex].name);
      }
    }
  };

   const handleSelect = (value) => {
    dispatch(clearSuggestions());
    navigate(`/product/${value}`)
  };

  const clearSearch = () => {
    setQuery("");
    dispatch(clearSuggestions());
    setActiveIndex(-1);
  };
  return (
   <>
    <header className="header-top-strip py-1">
      <div className="container xl">
        <div className="row">
          <div className="col-6">
            <p className="text-white mb-0">Free shipping Over 5000Tk & Free return.</p>
          </div>
          <div className="col-6">
            <p className="text-end text-white mb-0">
              Hotline: <a href="tel: 01394837858474" className="text-white">Call</a>
              </p>
          </div>
        </div>
      </div>
    </header>
    <header className="header-upper py-4">
      <div className="container-xxl">
        <div className="row align-items-center ps-3">
          <div className="col-2">
            <h2 className="ps-4">
              <Link to="/" className="text-white">PlayTech</Link>
            </h2>
          </div>
         <div className="col-5">
         <div class="input-group ps-2">
  <input type="text" value={query} className=" search-box form-control py-1" placeholder={placeholder} aria-label="Search Product Here..." aria-describedby="basic-addon1"
  
  onChange={handleChange}
  onKeyDown={handleKeyDown}
  />
  
  <span className="input-group-text p-1" id="basic-addon1">
   <button className='btn bg-transparent border-0 p-0'
   onClick={handleSearchButton}> 
    <BsSearch />
   </button>

    </span>
     {/* Clear Button */}
      {query && (
        <button
          type="button"
          className="btn btn-sm btn-link clear-btn"
          onClick={clearSearch} title='Clear'
        >
          X
        </button>
      )}

      {suggestions.length > 0 && (
        <div className="suggestion-panel shadow-sm">
          {suggestions.map((item, index) => (
            <div
              key={index}
              className={`suggestion-item d-flex align-items-center border-bottom px-4 ${
                index === activeIndex ? "active" : ""
              }`}
              onClick={() => handleSelect(item._id)}
            >
              <img
                src={item?.images[0].url}
                alt={item.title}
                className="me-2"
                style={{ width: "50px", height: "50px", objectFit: "cover", borderRadius: "6px" }}
              />
              <div>
                <div>{item.title}</div>
                <small className="text-muted">৳ {item.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</small>
              </div>
            </div>
          ))}
        </div>
      )}
</div>
         </div>
         <div className="col-5">
          <div className="header-upper-links ms-5 gap-10">
            <div className={`${location.pathname==="compare-product" ? "text-warning" : "text-white"}`} >
              <Link to="/compare-product" className="text-white d-flex align-items-center" >
            <BsRepeat className='icons' />
              <p className="text-white m-1">Compare <br />Products</p>
              </Link>
            </div>
            <div>
            <Link to="/login" className="d-flex align-items-center">
              <BsPerson className='icons'/>
              <p  className="text-white m-1">My <br />Account</p>
              </Link>
            </div>
            <div>
              <Link to="/wishlist" className="d-flex align-items-center">
              <BsHeart className='icons' />
              <p  className="text-white m-1">Favourite <br />Products</p>
              </Link>
            </div>
            <div>
            <Link to="/cart" className="d-flex align-items-center">
              <BsCart4 className='icons'/>
              <p className="text-white m-1">Cart</p>
              </Link>
            </div>
          </div>
         </div>

        </div>

      </div>
    </header>
    <header className="header-bottom py-2">
      <div className="container-xxl">
        <div className="row">
          <div className="col-12">
            <div className="menu-bottom d-flex align-items-center gap-30">
          <div className="dropdown">

  <button className="btn btn-secondary dropdown-toggle bg-transparent border-0 gap-15 d-flex align-items-center" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false"
  onClick={() => setOpen(!open)}
>
  <CgMenuGridO className='menu-icon' />
  <span className="me-5 d-inline-block">Shop Categories</span>
  </button>
  <ul className={`dropdown-menu ${open ? "show" : ""}`} aria-labelledby="dropdownMenuButton1">
    {categories?.map((category)=>{
      return (
      <li key={category?._id}>
    <Link to={`/store/search?keyword=${category.title}`} className="dropdown-item">
      {category?.title}
      </Link>
      </li>
      )
   
    })}
    
  </ul>
</div>
          <div className="menu-links">
            <div className="d-flex align-items-center gap-30">
              <NavLink to="/" className={`${location.pathname=="/" ? "text-warning" : "menu-link"}`}>Home</NavLink>
              <NavLink to="/store" className={`${location.pathname=="/store" ? "text-warning": "menu-link"}`}>Our Store</NavLink>
              <NavLink to="/contact" className={`${location.pathname=="/contact" ? "text-warning": "menu-link"}`}>Contact</NavLink>
            </div>
          </div>
            </div>
          </div>
        </div>
      </div>
    </header>
      </>
  )
}

export default Header