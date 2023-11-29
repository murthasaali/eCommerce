import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {useSelector} from 'react-redux'
import axios from 'axios';
import {useNavigate} from 'react-router-dom'
import {  selectToken, selectUserToken, selectUserid } from '../redux/authSlice'
import toast from 'react-hot-toast'
import { FaCartPlus, FaHeart } from 'react-icons/fa';
import Review from '../components/review';
import Swal from 'sweetalert2'
import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';
import axiosInsatnce from '../axiosInstance/instance';
import Navber from './navbar';
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
      toast.error("product already in wishlist")
    }
  };
  
useEffect(()=>{
  getProductById(productId,token)
},[token,productId])
  
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
    await Swal.fire({
      icon: 'error',
      title: 'Oops...',
      background:'black',
      opacity:'0.5px',
                text: 'Product addition to cart failed',
      customClass: {
        title: 'text-3xl font-bold text-red-500', // Example Tailwind classes for title
        content: 'text-lg text-gray-700', // Example Tailwind classes for content text
        confirmButton: 'bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline', // Example Tailwind classes for confirm button
        cancelButton: 'bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline', // Example Tailwind classes for cancel button
        // Add more custom classes as needed
      },
      // You can also add HTML classes to the container using className:
      className: 'bg-black bg-opa  flex flex-row border ', // Example Tailwind classes for the modal container
    });
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
   
  }
};

 


  return (
    <div className='home_main'>
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
    <p className='text-xl text-white text-opacity-80' style={{
      fontFamily:" 'Arista Pro Alternate Fat', sans-serif "
    }}>{product.title}</p>
    <p>{product.category}</p>
    <p>{product.description}</p> <span className='text-xl text-red-700'> ₹ {product.price} /-</span>
    <div className='flex justify-center items-center gap-5 '><FaHeart  className='text-2xl' onClick={()=>handleWishlist(product._id)}/> <button className=' border p-2 rounded-lg  text-xs ' onClick={()=>{handleCart(product._id)}}> <FaCartPlus/></button> <Stack className='bg-stone-600 bg-opacity-40 rounded-lg p-2' spacing={1}>
      <Rating name="size-small"  defaultValue={2} size="small" />
    </Stack></div>
   

  </div>
</div>
  <Review/>
  <Navber/>
    </div>
  );
}

export default ViewAproduct;
