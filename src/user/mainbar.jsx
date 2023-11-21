import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaCartPlus, FaHeart, FaSearch, FaSignOutAlt, FaUser, FaUserPlus } from 'react-icons/fa';

import DotBadge from '../components/badge';
import {  useNavigate } from 'react-router-dom';
import About from './about';
import { useDispatch, useSelector } from 'react-redux';
import { selectIsabout, selectIscart, selectIscollection, setIscollection,setIscart, clearUserToken, selectIslogin, clearIslogin } from '../redux/authSlice';
import { setIsabout } from '../redux/authSlice';
import Garage from './garage';
import Cart from './cart';
import Offer from './offer';
import { Avatar } from '@mui/material';
import toast from 'react-hot-toast';
// Variants for different scaling durations
const scaleVariants = {
  initial: { scale: 1 },
  hover: { scale: 1.1, transition: { duration: 0.3 } }, // Change duration as needed
};


function Mainbar() {

  const [isSearch,setIsSearch]=useState(false)

  const isAbout=useSelector(selectIsabout)
  const isLogin=useSelector(selectIslogin)
  const nav=useNavigate()
  const dispatch=useDispatch()
  const isCollection = useSelector(selectIscollection);
  const isCart=useSelector(selectIscart)
  const handleLogout=()=>{
    dispatch(clearUserToken(true))
    dispatch(clearIslogin())
    // alert("thank you welcome back")
    toast.error("logout")
  }
  
  return (
    <div className="main-bar">
      {/* Company Name */}
      <motion.button
       initial={{ scale: 0 }}
       whileHover={{ rotate: 160 }}
       animate={{ rotate: 360, scale: 1 }}
       transition={{
         type: "spring",
         stiffness: 260,
         damping: 20
       }}
      className="icon-container" onDoubleClick={()=>nav('/admin')}>
     
    </motion.button>

      {/* Navigation Links */}
      <div className="flex gap-4">
        <ul className='flex justify-center items-center gap-4 font-thin text-blue-950'>
          <motion.button variants={scaleVariants} initial="initial" whileHover="hover" whileTap="hover"  onClick={() => dispatch(setIsabout(true))}>
            about
            </motion.button>
          <motion.button variants={scaleVariants} initial="initial" whileHover="hover" whileTap="hover" onClick={()=>dispatch(setIscollection(true))}>
           Collection
          </motion.button>
          <motion.button variants={scaleVariants} initial="initial" whileHover="hover" whileTap="hover">
            Home
          </motion.button>
          <motion.button variants={scaleVariants} initial="initial" whileHover="hover" whileTap="hover">
            Contact
          </motion.button>
        </ul>
        {/* Additional navigation-related content */}
      </div>

      {/* User-related Elements */}
      <div className="flex gap-4 justify-center items-center">
        <motion.button variants={scaleVariants} initial="initial" whileHover="hover" whileTap="hover" onClick={()=>setIsSearch(true)}>
          <FaSearch />
        </motion.button>
        <motion.button className="username" variants={scaleVariants} initial="initial" whileHover="hover" whileTap="hover">
          Username
        </motion.button>
        
      {!isLogin? <motion.button variants={scaleVariants} initial="initial" whileHover="hover" whileTap="hover" onClick={()=>nav("/login")}>
          <FaUserPlus/>
        </motion.button>:
         <motion.button variants={scaleVariants} initial="initial" whileHover="hover" whileTap="hover" onClick={handleLogout}>
          <FaSignOutAlt/>
        </motion.button> }
        <motion.button variants={scaleVariants} initial="initial" whileHover="hover" whileTap="hover" >
          <FaHeart className='text-pink-500'/>
        </motion.button>
        <motion.button variants={scaleVariants} initial="initial" whileHover="hover" whileTap="hover"  onClick={()=>dispatch(setIscart(true))}>
          <DotBadge/>
        </motion.button>
        {/* Additional user-related content */}
      { isLogin&& <motion.button variants={scaleVariants} initial="initial" whileHover="hover" whileTap="hover" >
          <Avatar>

          <FaUser/>
          </Avatar>
        </motion.button>}
      </div>
      {isSearch && (
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
            justifyContent: 'center',
            alignItems: 'center',
            background: 'rgba(0, 0, 0, 0.7)',
            zIndex: 999,
          }}
          onClick={() => setIsSearch(false)}
        >
          <motion.div
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ type: 'tween', stiffness: 260, damping: 20 }}
            // style={{
            //   background: 'white',
            //   padding: '2rem',
            //   borderRadius: '0.5rem',
            // }}
            className=' w-3/4 h-3/4 '
            onClick={(e) => e.stopPropagation()}
        
           
          >
          <input type="text" className='bg-stone-300 text-blue-950  w-3/4 h-14 rounded-3xl pl-4 overflow-hidden shadow-md   '
           initial={{ opacity: 0, y: '-20%' }}
           animate={{ opacity: 1, y: 0 }}
           exit={{ opacity: 0, y: '-50%' }}/>
            
          </motion.div>
        </motion.div>
      )}
      {isAbout && (
        <About/>
      )}
      {isCollection&&(
        isLogin&&
        <Garage/>      )}
      {
        isCart&&
        <Cart/>
      }
      {
        !isLogin&&
        <Offer/>
      }
      

    </div>
  );
}

export default Mainbar;
