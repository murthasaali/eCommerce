import React from 'react'
import {useSelector} from 'react-redux'
import burger from'../assets/burger.png'
import { Modal } from '@mui/material'
import {motion} from 'framer-motion'
import { selectIsLoading } from '../redux/authSlice'
function Loading() {
  const isLoading=useSelector(selectIsLoading)
  return (
 <>
 <Modal open={isLoading} className="w-full h-screen"  >
  <div className=" w-full h-full flex-col bg-black  gap-4  flex justify-center items-center">

  <motion.div className='w-16 h-16 ' style={{
    backgroundImage:`url(${burger})`,
        backgroundSize:'cover'}}
        animate={{
          y: [0, 13, 0], // Move the image up and down in a loop
        }}
        transition={{
          duration: 4, // Set the duration of each cycle (in seconds)
          repeat: Infinity, // Repeat the animation infinitely
          ease: "linear", // Set the easing function for smooth animation
        }}
    ></motion.div>
    {/* Additional modal content */}
    <p className="text-xs text-orange-600 ml-5 bg-opacity-50 font-thin" >please wait a moment ...</p>
    </div>
  
</Modal>
   </>
  )
}

export default Loading