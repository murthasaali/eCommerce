import React from 'react'
import {  useSelector } from 'react-redux'
import {  selectIscart, } from '../redux/authSlice'

import { motion } from 'framer-motion'
import { FaHeart } from 'react-icons/fa'
import { BiSolidOffer } from 'react-icons/bi'
import { useNavigate } from 'react-router-dom'
import { IoArrowBackCircleOutline } from "react-icons/io5";
import { MdOutlineSecurity } from "react-icons/md";
import Slider from '../components/slider'


function Cart() {
  const isCart = useSelector(selectIscart)
  const nav = useNavigate()
  




  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: "column",
          alignItems: "center",
          justifyContent: 'center',
          background: 'black',
          zIndex: 999,
        }}

      >
        <div className='bg-black w-full h-1/2'>

          <div className=' w-full flex gap-56 items-center justify-around m-4'>

            <div className='font-thin '><span className='text-6xl font-thin' style={{
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
            <div className='w-3/6 h-full  bg-opacity-90 p-4 flex flex-col gap-4'>

              <div className='flex items-center p-3 w-full border rounded-lg file: border-red-600 h-10 '> check delivery time and services   </div>

              <div className='flex flex-col border pl-3 pt-3 w-full rounded-lg items-start '><p className='flex items-center'>   <BiSolidOffer className='text-sky-800' />  &nbsp; available offers</p>
                <p   >7.5% instant Discount on every spends with ck sons Kotak credit Card.TCA</p>

              </div>






            </div>
            <div className='w-3/6 bg-black h-full mr-14  flex flex-col gap-4 item-start' >

              <p className='text-2xl font-thin text-left' >Total Price</p>
              <div className='flex items-center p-3 w-3/4    border-gray-700 rounded-lg file:  bg-stone-300  h-10 flex-col'>

                <p></p>

              </div>




            </div>



          </div>
        </div>
        <div className=' p-4  w-full  h-full gap-4  flex   rounded-lg'>
          <div className=' bg-black h-full  w-4/6   border  rounded-lg'>
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