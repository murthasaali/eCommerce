import React from 'react'
import {  useSelector } from 'react-redux'
import {  selectIscart, } from '../redux/authSlice'
import box from '../offerbox.png'
import delivery from "../delvery.png"
import { motion } from 'framer-motion'
import { FaHeart } from 'react-icons/fa'
import { BiSolidOffer } from 'react-icons/bi'
import { useNavigate } from 'react-router-dom'
import { IoArrowBackCircleOutline } from "react-icons/io5";
import { MdOutlineSecurity } from "react-icons/md";
import Slider from '../components/slider'
const variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

function Cart() {
  const isCart = useSelector(selectIscart)
  const nav = useNavigate()
  




  return (
    <div className='flex-col w-full h-auto  bg-black '>
        <div className=' w-full flex gap-10 items-center h-auto   justify-around p-4 '>

<div className='font-thin '><span className='text-6xl  font-thin' style={{
  fontFamily:"'Arista Pro Alternate Fat', sans-serif"
}}> YOUR CART DETAILS</span></div>
<div className='flex items-center gap-10'>

  <div className='flex items-center '> <MdOutlineSecurity className='text-green-600' />&nbsp; 100 secure</div>
  < FaHeart className='text-pink-600' />
  <IoArrowBackCircleOutline className='text-3xl' onClick={() => nav('/')} />
</div>
</div>
      <motion.div
        initial="hidden"
        animate="visible"
        variants={variants}
        style={{
         
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'start',
          background: 'black',
          paddingInline:"10px"
        }}
        

      >
       


      
          <div
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ type: 'tween', stiffness: 260, damping: 20 }}

            className=" w-full h-auto  bg-black flex   "


          >
            {/* */}
            <div className='w-3/6 h-full  bg-opacity-90 p-4 flex flex-col  '>

              <div className='lg:flex sm:hidden items-center justify-between  p-4 w-full lg:text-lg sm:text-xs  rounded-lg h-auto '> check delivery time and services  <button className='btn  border'> check now </button>
              <motion.img
        src={delivery}
        height={"75px"}
        width={"75px"}
        // Set the easing function for smooth animation
      /> </div>

              <div className='flex items-center'>   <BiSolidOffer className='text-sky-800' />  &nbsp; available offers
                7.5% instant Discount on every spends with ck sons Kotak credit Card.TCA
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

              </div>






            </div>
            <div className='w-3/6 bg-black h-full mr-14  flex flex-col gap-4 item-start' >

              <p className='text-2xl font-thin text-left ' >Total Price</p>
            



            </div>



          
        </div>
          <div className='   w-full  border  bg-black p-4    rounded-lg'>
          <Slider />
           </div>
         

      </motion.div>
      
    </div>
  )
}

export default Cart