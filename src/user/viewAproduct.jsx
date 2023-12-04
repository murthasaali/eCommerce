import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux'
import axios from 'axios';
import {useNavigate} from 'react-router-dom'
import {  selectIsLoading, selectToken, selectUserToken, selectUserid, setIsLoading } from '../redux/authSlice'
import toast from 'react-hot-toast'
import { FaCartPlus, FaHeart } from 'react-icons/fa';
import Review from '../components/review';
import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';
import axiosInsatnce from '../axiosInstance/instance';
import Navber from './navbar';
import Loading from '../components/loading';
import { BiArrowBack } from 'react-icons/bi';
function ViewAproduct() {
  const token=useSelector(selectToken)
  const { productId } = useParams();
  const [product,setProduct]=useState({})
  const nav=useNavigate()
  const userId= useSelector(selectUserid)
  const userToken= useSelector(selectUserToken)
  const isLoading=useSelector(selectIsLoading)
  const dispatch=useDispatch()
  const getProductById = async (productId, token) => {
    dispatch(setIsLoading(true))
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
        setTimeout(() => {
          dispatch(setIsLoading(false))
        }, 2000);
        
      } else {
        console.error('Product retrieval failed. Message:', message);
      }
    } catch (error) {
      console.error('Error:', error.message);
    }
  };
  
useEffect(()=>{
  getProductById(productId,token)
 
},[productId])
  
const handleCart = async (productId) => {
  try {
    console.log("Adding product to cart...");
    console.log("Product ID:", productId);
    console.log("User ID:", userId);
    console.log("User Token:", userToken);

    const response = await axios.post(
      `https://ecommerce-api.bridgeon.in/users/${userId}/cart/${productId}`,
      null, // Assuming no data payload, pass null if not needed
      {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      }
    );

// Log the response from the server

    if (response.data.status === 'success') {
      console.log('Product added to cart.');
      toast.success("product added to cart  succussfully")
    } else {
      console.error('Product addition to cart failed. Message:', response.data.message);
    }
  } catch (error) {
    console.error('Error:', error.message);
   toast.error('already in cart')
  }
};
  
const handleWishlist = async (productId) => {
  try {
    console.log("Adding product to wishlist...");
    console.log("Product ID:", productId);
    console.log("User ID:", userId);
    console.log("User Token:", userToken);

    const response = await axios.post(
      `https://ecommerce-api.bridgeon.in/users/${userId}/wishlist/${productId}`,
      null, // Assuming no data payload, pass null if not needed
      {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      }
    );

// Log the response from the server

    if (response.data.status === 'success') {
      console.log('Product added to wishlist.');
      toast.success("product added to wishlist  succussfully")
    } else {
      console.error('Product addition to wishlist failed. Message:', response.data.message);
    }
  } catch (error) {
    console.error('Error:', error.message);
    toast.error("already in wishlist")
   
  }
};

 


  return (
    <div className='bg-black flex-col flex w-full   lg:p-10 justify-start items-center' 
    
    style={{
      height:"100vh"
    }}
    >
           <div className=' w-full flex gap-10 items-center h-auto   justify-around p-4 '>
            <h1 className='text-5xl text-orange-500 text-opacity-60' 
            style={{
              fontFamily:" 'Arista Pro Alternate Fat', sans-serif ",

                        }}>CRUNCHICK</h1>

                        <BiArrowBack className='text-3xl text-white'  onClick={()=>nav(`/kitchen/${product.category}`)}/>


</div>
<div className='flex flex-col md:flex-row w-full h-auto justify-center items-center  '>
  <div className='w-full h-auto'>

  <img src={product.image} alt={product.title}  className='px-10 bg-opacity-70 w-full h-full'   style={{
    opacity:0.8
  }}/>
  </div>
  <div className='w-full p-10 h-auto flex flex-col items-start gap-0 text-xs  text-start'>
    <p className='text-xl text-white text-opacity-80' style={{
      fontFamily:" 'Arista Pro Alternate Fat', sans-serif "
    }}>{product.title}</p>
    <p>{product.category}</p>
    
      <p>{product.description}</p> <span className='text-xl text-red-700'> ₹ {product.price} /-</span>
      <hr className="border border-white w-full my-4" />
    <div className='flex justify-center items-center gap-5 '>
      <button>

      <FaHeart  className='text-2xl hover:text-red-500'  onClick={()=>handleWishlist(product._id)}/>
      </button>
    
    
     <button onClick={()=>{handleCart(product._id)}}>
      
       <FaCartPlus  className='text-2xl hover:text-orange-500'/></button> 
       
       <Stack className='bg-stone-600 bg-opacity-40 rounded-lg p-2' spacing={1}>
      <Rating name="size-small"  defaultValue={2} size="small" />
    </Stack></div>
   

  </div>
</div>
  <Review/>
  <Navber/>
  {
    isLoading&&(
      <>
      <Loading/>
      
      </>
    )
  }
    </div>
  );
}

export default ViewAproduct;
