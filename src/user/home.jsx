import React from 'react'
import Navber from './navbar'
import Mainbar from './mainbar'
import { motion } from 'framer-motion';
import Carousal from '../components/carousal';

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
    <div className=' justify-center flex flex-col items-center bg-cover bg-left-bottom overflow-hidden 	 w-full h-screen bg-black  bg-no-repeat	 '
    >
  
  
    
   <div className='w-full h-full  flex flex-col '>
    <Mainbar/>
    <div className='w-full  flex gap-4 p-2 h-1/2'>
      <div className='w-4/6  rounded-lg bg-opacity-30 overflow-hidden    flex justify-center items-center'>
    <Carousal/>
      
      </div>
      <div className=' p-4 font-thin '> <p>choose by menu</p><motion.ul
    className="w-full h-full p-2 grid grid-cols-3 gap-4 grid-rows-2 gap-15 p-15 overflow-hidden bg-opacity-20 rounded-3xl"
    variants={container}
    initial="hidden"
    animate="visible"
  >
 <div className='flex justify-center h-auto gap-1 items-center flex-col w-auto '>
   
 <motion.div
  className="rounded-full h-24 w-24"
  variants={item}
  style={{
    backgroundImage: "url('https://img.freepik.com/free-photo/tasty-top-view-sliced-pizza-italian-traditional-round-pizza_90220-1353.jpg?t=st=1700636370~exp=1700639970~hmac=1d0e013f7ebb7fa981268ae1f99e3d2cbd2abff28f89010d184a6c13a2a3bc65&w=740')",
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    boxShadow: '0 0 5px white', // Initial white box shadow
    transition: 'box-shadow 0.3s ease-in-out', // Transition for box shadow
  }}
  whileHover={{ boxShadow: 'none' }} // Remove box shadow on hover
></motion.div>
<div className='h-auto'><span className='font-thin text-stone-200'>Pizza</span></div>
 </div>

<motion.div
  className="rounded-full h-24 w-24"
  variants={item}
  style={{
    backgroundImage: "url('https://img.freepik.com/free-photo/french-fries-fried-chicken-wooden-plate_1203-7692.jpg?w=1060&t=st=1700645777~exp=1700646377~hmac=733248048845d5896fd5049434863a9c4324f981989a89a281b6bce8c9db8b1c')",
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    boxShadow: '0 0 5px white', // Initial white box shadow
    transition: 'box-shadow 0.3s ease-in-out', // Transition for box shadow
  }}
  whileHover={{ boxShadow: 'none' }} // Remove box shadow on hover
></motion.div>
<motion.div
  className="rounded-full h-24 w-24"
  variants={item}
  style={{
    backgroundImage: "url('https://img.freepik.com/free-photo/roasted-chicken-with-spices-gray_23-2147765470.jpg?w=1060&t=st=1700646150~exp=1700646750~hmac=619113f5742de3bc95e6dfd58a3feec9e4fb034fc426e10867951fc631051fdb')",
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    boxShadow: '0 0 5px white', // Initial white box shadow
    transition: 'box-shadow 0.3s ease-in-out', // Transition for box shadow
  }}
  whileHover={{ boxShadow: 'none' }} // Remove box shadow on hover
></motion.div>
<motion.div
  className="rounded-full h-24 w-24"
  variants={item}
  style={{
    backgroundImage: "url('https://image.shutterstock.com/image-photo/jumbo-prawns-grilled-squids-black-260nw-129756848.jpg')",
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    boxShadow: '0 0 5px white', // Initial white box shadow
    transition: 'box-shadow 0.3s ease-in-out', // Transition for box shadow
  }}
  whileHover={{ boxShadow: 'none' }} // Remove box shadow on hover
></motion.div>
<motion.div
  className="rounded-full h-24 w-24"
  variants={item}
  style={{
    backgroundImage: "url('')",
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    boxShadow: '0 0 5px white', // Initial white box shadow
    transition: 'box-shadow 0.3s ease-in-out', // Transition for box shadow
  }}
  whileHover={{ boxShadow: 'none' }} // Remove box shadow on hover
></motion.div>


  
    
  </motion.ul></div>
    </div>
    <motion.div
      initial={{ opacity: 0, y: -20 }} // Initial state: hidden and slightly above
      animate={{ opacity: 1, y: 0 }} // Animated state: visible and at original position
      transition={{ duration: 1 }} // Animation duration
      className="flex justify-start px-10" // Replace with your custom class name
    >
      <p className='qoute1'><motion.span className='text-white text-opacity-90' >CRUNCHICK </motion.span >  <motion.span className='text-opacity-70 text-6xl text-red-600'
          initial={{ opacity: 0 }} // Initial state: hidden
          animate={{ opacity: 1 }} // Animated state: visible
          transition={{ delay: 0.5, duration: 1 }} // Animation delay and duration
        >Order Now</motion.span></p>
    </motion.div>
   </div>
   <p className='qoute'>Drive Carefully</p>
   <Navber/>
    </div>
  )
}

export default Home