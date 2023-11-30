import React, { useEffect, useState } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import {  useSelector } from "react-redux";
import {toast} from 'react-hot-toast'
import axios from "axios";
import { Modal } from "@mui/material";
import emptyCart from '../emptycart.png'

import {motion} from 'framer-motion'
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  
} from "mdb-react-ui-kit";
import { selectIslogin, selectToken, selectUserToken } from "../redux/authSlice";
import { selectUserid } from "../redux/authSlice";
import {  FaDropbox, FaRemoveFormat, FaSearch } from "react-icons/fa";
// import { selectUserid } from "../redux/authSlice";

import { MdDelete } from "react-icons/md";
import axiosInsatnce from "../axiosInstance/instance";
const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3,
    slidesToSlide: 1, // optional, default to 1.
  },
  tablet: {
    breakpoint: { max: 1024, min: 768 },
    items: 3,
    slidesToSlide: 1, // optional, default to 1.
  },
  mobile: {
    breakpoint: { max: 767, min: 464 },
    items: 2,
    slidesToSlide: 1, // optional, default to 1.
  },
};
const Slider = () => {

  
  

  const userId = useSelector(selectUserid);
  const userToken = useSelector(selectUserToken);
  const isLogin=useSelector(selectIslogin)
  console.log(userId)
  const [modal,setModal]=useState(false)
  const [cartItem, setCartItem] = useState([]);

  const [selectedProducts, setSelectedProducts] = useState([]);

  const handleProductSelection = (productId) => {
    if (selectedProducts.includes(productId)) {
      // If product is already selected, remove it from the selection
      setSelectedProducts(selectedProducts.filter((id) => id !== productId));
    } else {
      // If product is not selected, add it to the selection
      setSelectedProducts([...selectedProducts, productId]);
    }
  }
  const viewCart = async (userId, token) => {
    try {
      const response = await axios.get(`https://ecommerce-api.bridgeon.in/users/${userId}/cart`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const { status, message, data } = response.data;
      if (status === 'success') {
        // Successfully fetched cart items.
       const products=data.products[0].cart
        console.log('Cart items:',products );
        setCartItem(products)
      } else {
        console.error('Cart item retrieval failed. Message:', message);
      }
    } catch (error) {
      console.error('Error:', error.message);
    }
  };
  useEffect(() => {
    viewCart(userId,userToken)
  }, [])
  const remove = async (productId, userToken, userId) => {
    console.log(productId);
    console.log(userToken);
    console.log(userId);
    try {
      const response = await axiosInsatnce.delete(`/users/${userId}/cart/${productId}`, {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      });
      const { status, message } = response.data;
      if (status === 'success') {
        // Product removed from cart successfully.
        toast.error('Product removed successfully');
        viewCart(userId, userToken);
        toggleModal();
      } else {
        console.error('Product removal from cart failed. Message:', message);
      }
    } catch (error) {
      console.error('Error:', error.message);
    }
  };
  
  const removeFromCart=(id)=>{
    remove(id,userToken,userId)

  }
  const toggleModal = () => {
    setModal(!modal);
  };
  
  return (
<>
  <div className="w-full h-auto flex justify-between ">
    <p>Please select what you want in your cart and order now</p>
    {/* ... (your sorting dropdown) */}
  </div>
  {cartItem.length > 0 ? (
    <div className="flex flex-wrap justify-start items-center">
      {cartItem.map((product) => (
                 
                 <div className="product-card">
                   <div  alt="Product Name" style={{backgroundImage:`url('${product.image}')`}} className="cardimg"> </div>
                   <p>{product.title}</p>
                   <p>{product.price}</p>
               
                   <div className="flex justify-center items-center gap-5  ">
                      <button className="p-2 text-xs border rounded-lg "> Add to Cart</button>
                      <button className="p-2  "> <FaRemoveFormat/></button>
                   </div>
                 </div>
               
              
               
      ))}
    </div>
  ) : (
    <div className="text-white flex w-full h-full flex-col font-thin justify-center items-center">
      {/* ... (empty cart message or image) */}
    </div>
  )}
</>
  );
};

export default Slider;