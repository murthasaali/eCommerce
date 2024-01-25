import React from 'react';
import { FaCartPlus, FaHeart, FaHome, FaSearch, FaUser } from 'react-icons/fa';
import {useNavigate} from 'react-router-dom'
function Sidenav() {
    const nav=useNavigate()
  return (
    <div className='absolute left-2 h-[400px] md:flex hidden w-36 text-3xl  items-center flex-col justify-evenly backdrop-blur-sm top-1/2 transform -translate-y-1/2'>
   <button className='p-3 hover:border-b-[1px]' onClick={()=>nav('/')}><FaHome/></button>
   <button className='p-3 hover:border-b-[1px]'> <FaHeart/></button>
   
   <button className='p-3 hover:border-b-[1px]'><FaSearch/></button>
   <button className='p-3 hover:border-b-[1px]'><FaCartPlus/></button>
   <button className='p-3 hover:border-b-[1px]'> <FaUser/></button>
  
   
  
   
    </div>
  );
}

export default Sidenav;
