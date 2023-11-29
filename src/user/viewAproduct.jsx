import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {useSelector} from 'react-redux'
import axios from 'axios';
import {useNavigate} from 'react-router-dom'
import {  selectToken, selectUserToken, selectUserid } from '../redux/authSlice'
import toast from 'react-hot-toast'
import { FaHeart } from 'react-icons/fa';
import Review from '../components/review';
import axiosInsatnce from '../axiosInstance/instance';
function ViewAproduct() {
  const token=useSelector(selectToken)
  const { productId } = useParams();
  const [product,setProduct]=useState({})
  const nav=useNavigate()
  const userId= useSelector(selectUserid)
  const userToken= useSelector(selectUserToken)
  const getProductById = async (productId, token) => {
    console.log("getting a product");
    console.log("productId", productId);
    console.log("token", token);
    const  apiKey=process.env.REACT_APP_API_KEY
    console.log(apiKey)
  
    try {
      const response = await axiosInsatnce.get(`/products/${productId}?accessKey=${apiKey}`, {
      
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      const { status, message, data } = response.data;
      if (status === 'success') {
        // Successfully fetched the product.
        console.log('Fetched product details:', data);
        setProduct(data);
      } else {
        console.error('Product retrieval failed. Message:', message);
      }
    } catch (error) {
      console.error('Error:', error.message);
    }
  };
  
useEffect(()=>{
  getProductById(productId,token)
},[token,productId])
  
const toCart = async (productId) => {
  try {
    console.log("Adding product to cart...");
    console.log("Product ID:", productId);
    console.log("User ID:", userId);
    console.log("User Token:", userToken);

    const response = await axiosInsatnce.post(
      `/users/${userId}/cart/${productId}`,
      null,
      {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      }
    );

    // Log the response from the server

    if (response.data.status === 'success') {
      console.log('Product added to cart.');
      toast.success("Product added to cart successfully");
    } else {
      console.error('Product addition to cart failed. Message:', response.data.message);
    }
  } catch (error) {
    console.error('Error:', error.message);
  }
};
  
const toWishlist = async (productId) => {
  try {
    console.log("Adding product to wishlist...");
    console.log("Product ID:", productId);
    console.log("User ID:", userId);
    console.log("User Token:", userToken);

    const response = await axiosInsatnce.post(
      `/users/${userId}/wishlist/${productId}`,
      null,
      {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      }
    );

    // Log the response from the server

    if (response.data.status === 'success') {
      console.log('Product added to wishlist.');
      toast.success("Product added to wishlist successfully");
    } else {
      console.error('Product addition to wishlist failed. Message:', response.data.message);
    }
  } catch (error) {
    console.error('Error:', error.message);
  }
};

 const handleWishlist =(id)=>{
  toWishlist(id)
 }
 const handleCart =(id)=>{
  toCart(id)
 }

  return (
    <div className='bg-black w-full flex-col h-screen overflow-auto'>
           <div className=' w-full flex gap-10 items-center h-auto   justify-around p-4 '>
            <p className='text-5xl text-orange-500 text-opacity-60' 
            style={{
              fontFamily:" 'Arista Pro Alternate Fat', sans-serif ",

                        }}>CRUNCHICK</p>


</div>
<div className='flex flex-col md:flex-row w-full h-auto justify-center items-center  '>
  <div className='w-full h-auto'>

  <img src={product.image} alt={product.title}  className='px-10 bg-opacity-70 w-full h-full'   style={{
    opacity:0.8
  }}/>
  </div>
  <div className='w-full p-10 h-auto flex flex-col items-start gap-0 text-xs  text-start'>
    <p>{product.title}</p>
    <p>{product.category}</p>
    <p>{product.description}</p>
    <div className='flex justify-center items-center gap-5 '><FaHeart  onClick={()=>{handleWishlist(product._id)}}/> <button className=' border p-2 rounded-lg  text-xs ' onClick={()=>{handleCart(product._id)}}> add to cart</button></div>
   

  </div>
</div>
  <Review/>
    </div>
  );
}

export default ViewAproduct;
