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
    <>
      <motion.div
        initial="hidden"
        animate="visible"
        variants={variants}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'black',
        }}
        

      >
        <div className='bg-black w-full h-1/2'>

          <div className=' w-full flex gap-10 items-center justify-around mt-8'>

            <div className='font-thin '><span className='text-6xl  font-thin' style={{
              fontFamily:"'Arista Pro Alternate Fat', sans-serif"
            }}> YOUR CART DETAILS</span></div>
            <div className='flex items-center gap-10'>

              <div className='flex items-center '> <MdOutlineSecurity className='text-green-600' />&nbsp; 100 secure</div>
              < FaHeart className='text-pink-600' />
              <IoArrowBackCircleOutline className='text-3xl' onClick={() => nav('/')} />
            </div>
          </div>
          <div
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ type: 'tween', stiffness: 260, damping: 20 }}

            className=" w-full h-3/4  bg-black flex   "
            onClick={(e) => e.stopPropagation()}


          >
            {/* */}
            <div className='w-3/6 h-full  bg-opacity-90 p-4 flex flex-col '>

              <div className='lg:flex sm:hidden items-center justify-between  w-full lg:text-lg sm:text-xs  rounded-lg h-auto '> check delivery time and services  <button className='btn  border'> check now </button>
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

              <p className='text-2xl font-thin text-left' >Total Price</p>
            



            </div>



          </div>
        </div>
        <div className=' p-4  w-full  h-full gap-4  flex   rounded-lg'>
          <div className=' bg-black h-full  w-4/6     rounded-lg'>
          <Slider />
           </div>
          <div className=' bg-black h-full  w-2/6   border  rounded-lg'
          style={{
            backgroundImage:"url('cicon.png')",
            backgroundSize:"cover"
          }}
          >
          
           </div>
           </div>

      </motion.div>
      
    </>
  )
}

export default Cart