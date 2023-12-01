import React from 'react'
import {  useDispatch, useSelector } from 'react-redux'
import {  selectIsLoading, selectIscart, setIsLoading, } from '../redux/authSlice'
import box from '../offerbox.png'
import delivery from "../delvery.png"
import { motion } from 'framer-motion'
import { FaClosedCaptioning, FaHeart } from 'react-icons/fa'
import { BiSolidOffer } from 'react-icons/bi'
import { useNavigate } from 'react-router-dom'
import Loading from '../components/loading';
import { MdDelete } from 'react-icons/md'
import { IoArrowBackCircleOutline } from "react-icons/io5";
import { MdOutlineSecurity } from "react-icons/md";
import Slider from '../components/slider'
import Navber from './navbar'
const variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

function Cart() {

  const nav = useNavigate()
  const isLoading=useSelector(selectIsLoading)
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
       <p className="lg:text-6xl text-4xl w-full  font-thin flex justify-evenly items-end">cart  <span><FaHeart className='text-2xl' onClick={()=>nav('/')}/></span></p>
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

       <Slider/>
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

export default Cart