import axios from "axios"
import { base_url } from "../../utils/base_url"
import { config } from "../../utils/axiosConfig"


const register = async(userData)=>{
    const response = await axios.post(`${base_url}user/register/`, userData)
    if(response.data){
       return response.data
    }
}

const login = async (userData) => {
  const response = await axios.post(`${base_url}user/login/`, 
    {
        email: userData.email,
        password: userData.password
    }, {
    withCredentials: true, // send/receive cookies
  });

  if (response.data) {
    // Store ONLY user profile, not tokens
    localStorage.setItem("user", JSON.stringify(response.data));
    return response.data;
  }
};

// LOGOUT (clear cookies + localStorage)
const logOut = async () => {
  const response = await axios.post(`${base_url}user/logout/`, {}, { withCredentials: true });
  if (response.status === 204) {
    localStorage.removeItem("user");
  }
  return response.data;
};

const getCart = async()=>{
    
    const response = await axios.get(`${base_url}user/cart/get-cart` , config())
    if(response.data){
       return response.data
    }
}
const emptyCart = async () =>{
      
    const response = await axios.delete(`${base_url}user/empty-cart` , config())
    if(response.data){
       return response.data
    }
}

const createOrder = async (orderData) =>{
      
    const response = await axios.post(`${base_url}user/cart/cash-order` ,
        {
            phone: orderData.phone,
            deliveryCharge: orderData.deliveryCharge,
            shippingAddress: `${orderData.shippingCity}, ${orderData.shippingUpa}, ${orderData.shippingDis}, ${orderData.shippingDiv}`
        }
        , config())
    if(response.data){
       return response.data
    }
}

const cancelOrder = async (id) =>{
      
    const response = await axios.put(`${base_url}user/cancel-order/${id}` , config())
    if(response.data){
       return response.data
    }
}

const orderSingleProduct = async (orderData) =>{
      
    const response = await axios.post(`${base_url}user/cash-order/${orderData.prodId}` ,
        {
            qty:orderData.quantity,
            phone: orderData.phone,
            deliveryCharge: orderData.deliveryCharge,
            shippingAddress: `${orderData.shippingCity}, ${orderData.shippingUpa}, ${orderData.shippingDis}, ${orderData.shippingDiv}`
        }
        , config())
    if(response.data){
       return response.data
    }
}
const getUserOrders = async () =>{
      
    const response = await axios.get(`${base_url}user/get-orders/` , config())
    if(response.data){
       return response.data
    }
}

export const authService = {
    register,
    login,
    logOut,
    getCart,
    emptyCart,
    cancelOrder,
     createOrder,
    getUserOrders,
    orderSingleProduct
}