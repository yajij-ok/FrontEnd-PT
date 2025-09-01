import axios from "axios"
import { base_url } from "../../utils/base_url"
import { config } from "../../utils/axiosConfig"

const getAllProducts = async(params = {}) =>{
try {
    const { page = 1, limit = 10, sort, keyword, fields, ...filters } = params;

    
    const queryParams = new URLSearchParams();

    if (page) queryParams.append("page", page);
    if (limit) queryParams.append("limit", limit);
    if (sort) queryParams.append("sort", sort);
    if (fields) queryParams.append("fields", fields);
    if (keyword) queryParams.append("keyword", keyword);

    // Add filters like category, price[gte], brand, etc.W
     Object.keys(filters).forEach((key) => {
      const value = filters[key];
      if (value !== "" && value !== undefined && value !== null) {
        queryParams.append(key, value);
      }
    });

    const response = await axios.get(`${base_url}product?${queryParams.toString()}`);

    return response.data;
  } catch (error) {
    throw error.response?.data?.message || error.message;
  }
};


const getSingleProduct = async(id) =>{
const response = await axios.get(`${base_url}product/${id}`)
    if(response.data){
       return response.data
    }
}

const getWishList = async()=>{
    const response = await axios.get(`${base_url}product/wishlist/` , config())
    if(response.data){
       return response.data
    }
}

const addToWishList = async(prodId)=>{
    const response = await axios.put(`${base_url}product/wishlist/` ,{prodId}, config())
    if(response.data){
       return response.data
    }
}

const addToCart = async(productData)=>{
    const response = await axios.post(`${base_url}product/add-to-cart/` ,
        {
            prodId:productData.prodId,
            count: productData.count,
            color: productData.color
        }, config())
    if(response.data){
       return response.data
    }
}

const removeFromCart = async(prodId)=>{
    const response = await axios.put(`${base_url}product/cart/remove/` ,{prodId}, config())
    if(response.data){
       return response.data
    }
}

const prodCount = async(prodId, newCount)=>{
    const response = await axios.put(`${base_url}product/cart/${prodId}` ,{newCount}, config())
    if(response.data){
       return response.data
    }
}

const getProdCat = async()=>{
    const response = await axios.get(`${base_url}category/`)
    if(response.data){
       return response.data
    }
}
const getBrands = async()=>{
    const response = await axios.get(`${base_url}brand/`)
    if(response.data){
       return response.data
    }
}

const searchSuggestion = async(keyword)=>{
    const response = await axios.get(`${base_url}product/search?keyword=${keyword}`, )
    if(response.data){
       return response.data
    }
}



export const ProductService = {
    getAllProducts,
    getWishList,
    addToWishList,
    getSingleProduct,
    addToCart,
    removeFromCart,
    prodCount,
    getProdCat,
    getBrands,
    searchSuggestion
}