import React, { useState } from 'react'
import {  useDispatch, useSelector } from 'react-redux'
import {  selectIsLoading, selectIslogin, setIsLoading, } from '../redux/authSlice'
import box from '../assets/offerbox.png'
import emptyCart from '../assets/login.png'
import { motion } from 'framer-motion'
import {  FaHome } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import Loading from '../components/loading';
import Slider from '../components/slider'
import Navber from './navbar'
const variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

function Whishlist() {

  const nav = useNavigate()
  const isLoading=useSelector(selectIsLoading)
  const isLogin=useSelector(selectIslogin)
  const dispatch=useDispatch()
  setTimeout(() => {
    dispatch(setIsLoading(false))
  }, 5000);




  return (
    <>
      
    <div className='bg-black flex-col flex w-full overflow-auto p-1 lg:p-10 justify-start items-center'
    style={{
      height:"100vh"
    }}
    
    // display: flex;
    // flex-direction: column;
    // align-items: center;
    
    // width: 100%;
    // height:100%;
    // background-color: #000000;
    >
       <div className="lg:text-6xl text-4xl w-full  text-orange-500 text-opacity-60 font-thin flex justify-evenly items-center"
       style={{
        fontFamily:" 'Arista Pro Alternate Fat', sans-serif "
       }}
       > <span> WHISHLIST</span><FaHome className='text-2xl' onClick={()=>nav('/')}/></div>
       <div className='flex flex-col w-full justify-center items-center'>
       <p class=' flex  justify-center items-center  xs:flex-col xs:flex w-full h-auto xs:justify-center xs:items-center  md:text-xl  text-xs px-3 '>  <p className='text-start'>Enjoy exclusive discounts and irresistible deals on your favorite fast-food orders with our app's special offers!</p>  
    <motion.img
      src={box}
      height={"100px"}
      width={"100px"}
      alt=""
      animate={{
        y: [0, 10, 0], // Move the image up and down in a loop
      }}
      transition={{
        duration: 4, // Set the duration of each cycle (in seconds)
        repeat: Infinity, // Repeat the animation infinitely
        ease: "linear", // Set the easing function for smooth animation
      }}
    />
  </p>
  {
    isLogin?<>
    <Slider/>
    
    </>:
    <div className="text-white flex w-full h-full flex-col font-thin justify-center items-center">
    <motion.img
      src={emptyCart}
      height={"200px"}
      width={"200px"}
      alt=""
    />
    <p className='text-orange-600'>Please Login  and explore 😉</p>
  </div>

  }


       </div>

      <Navber/>
      {isLoading&&(
        <>
        <Loading/>
        </>
  
      )
        
      }
    </div>

    </>

  )
}

export default Whishlist