import React from 'react'
import { motion } from 'framer-motion';
import { MdOutlineAutoGraph } from "react-icons/md";
import { BiUser } from "react-icons/bi";
import { BiHomeAlt ,BiCartAdd} from "react-icons/bi";
import { FaOpencart } from "react-icons/fa";
import { SiStackoverflow } from "react-icons/si";
import { useLocation, useNavigate } from 'react-router-dom';
import Dashboard from './dashboard';
import GetAllproduct from './getAllproduct';
import Sales from './sales';
import GetAllUsers from './getAllusers';
  import Addproduct from './addproduct';

import {useDispatch, useSelector} from 'react-redux'

import { clearIsAdmin, selectIsAdmin, setIsAdmin } from '../redux/authSlice';
  const container = {
    hidden: { opacity: 0.8, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        delayChildren: 0.5,
        staggerChildren: 0.2
      }
    }
  };

  const item = {
    hidden: { y: 10, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1
    },
    hover: {
      scale: 1.1,
      color: '#FF69B4',
      transition: { duration: 0.3 }
    }
  };
function Admin() {
  const nav=useNavigate()
  const location=useLocation()
  const isuser=location.pathname.endsWith('/admin/user')
  const issales=location.pathname.endsWith('/admin/sales')
  const isdash=location.pathname.endsWith('/admin')
  const isprosec=location.pathname.endsWith('/admin/prosec')
  const isadd=location.pathname.endsWith('/admin/add')
  const dispatch=useDispatch()
  const isAdmin=useSelector(selectIsAdmin)
  console.log(isAdmin)
  const logout=()=>{
    dispatch(clearIsAdmin(false))
    nav('/')
  }
  return (
    <div className='  h-screen w-full overflow-hidden flex  '
    >


    <div className='w-full h-full top-0  left-0 absolute bg-stone-900 bg-opacity-90 ' style={{
      zIndex:1
    }}>

        <motion.div
         variants={container}
         animate="visible"
         
         className='bg-transparent  bg-opacity-80 w-full p-4  h-auto rounded-lg   justify-between  font-sans font-thin text-sm text-white  flex flex-col Iitems-start  ' >
          
<div className='flex  h-auto w-full justify-center gap-14 items-start p-2  font-thin '>

            <button  className='flex font-thin text-opacity-80 text-stone-500    justify-center items-center gap-1 ' > <p whileHover={item.hover} onClick={()=>nav("/admin")}>DASH BOARD</p></button>
            <button  className='flex font-thin text-opacity-80 text-stone-500    justify-start items-center gap-1 ' > <p>SALES</p></button>
            <button  className='flex font-thin text-opacity-80 text-stone-500    justify-start items-center gap-1 ' >  <p onClick={()=>nav('/admin/user')}>USE DETAIL</p></button>
            <button  className='flex font-thin text-opacity-80 text-stone-500    justify-start items-center gap-1 ' > <p onClick={()=>nav('/admin/prosec')}>PRODUCT DETAILS</p></button>
            <button    className='flex font-thin text-opacity-80 text-stone-500    justify-start items-center gap-1 ' > <p onClick={()=>nav('/admin/add')}>ADD PRODUCT</p></button>
            <button    className='flex font-thin text-opacity-80 text-stone-500    justify-start items-center gap-1 ' > <p onClick={logout}>dlogout</p></button>
</div>
 
        </motion.div >
        <motion.div 
        variants={container} 
        initial="hidden"
        animate="visible"
        className='  flex justify-center w-full h-full    rounded-lg'>
       {
        isdash&&<Dashboard/>
       }
       {
        isprosec&&<GetAllproduct/>
       }
       {
        issales&&<Sales/>
       }
       {
        isuser&&<GetAllUsers/>
       }
       {
        isadd&&<Addproduct/>
       }
        </motion.div >

         </div>

    </div>
  )
}

export default Admin