import React from 'react'
import Navber from './navbar'
import Mainbar from './mainbar'
import { motion } from 'framer-motion';

const container = {
  hidden: { opacity: 1, scale: 0 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      delayChildren: 0.3,
      staggerChildren: 0.2
    }
  }
};

const item = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1
  }
};
function Home() {


  return (
    <div className=' justify-center flex flex-col items-center bg-cover bg-left-bottom overflow-hidden	 w-full h-screen bg-stone-200  bg-no-repeat	 '>
  
  
    
   <div className='w-full h-full  flex flex-col '>
    <Mainbar/>
    <div className='w-full flex p-3 h-1/2'>
      <div className='w-3/4 bg-stone-500 rounded-lg bg-opacity-30'></div>
      <div className=' p-7 font-thin '> <p>most popular brands</p><motion.ul
    className="w-full h-full p-4  gap-4 grid grid-cols-4  grid-rows-2 gap-15 p-15 overflow-hidden bg-opacity-20 rounded-3xl"
    variants={container}
    initial="hidden"
    animate="visible"
  >
  
      <motion.li className="rounded-full h-24 w-24 bg-stone-500 bg-opacity-20 bg-cover " variants={item} />
    
  </motion.ul></div>
    </div>
    <motion.div
      initial={{ opacity: 0, y: -20 }} // Initial state: hidden and slightly above
      animate={{ opacity: 1, y: 0 }} // Animated state: visible and at original position
      transition={{ duration: 1 }} // Animation duration
      className="your-container-class" // Replace with your custom class name
    >
      <p className='qoute1'><motion.span className='text-stone-500 text-opacity-40' >CHASE YOUR </motion.span >  <motion.span className='text-opacity-70 text-cyan-600'
          initial={{ opacity: 0 }} // Initial state: hidden
          animate={{ opacity: 1 }} // Animated state: visible
          transition={{ delay: 0.5, duration: 1 }} // Animation delay and duration
        >DREAMS !</motion.span></p>
    </motion.div>
   </div>
   <p className='qoute'>Drive Carefully</p>
   <Navber/>
    </div>
  )
}

export default Home