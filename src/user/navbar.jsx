// import React from 'react'

// import { useNavigate } from 'react-router-dom';

// function Navbar() {
//   const nav=useNavigate()
//   const tocontact=()=>{
//     nav('/contact')
    
//   }
//   const tohome=()=>{
//     nav('/')
    
//   }
//   const tome=()=>{
//     nav('/about')
    
//   }
//   const toproject=()=>{
//     nav('/project')
    
//   }
//   const toskills=()=>{
//     nav('/skills')
    
//   }
//   return (
    
//   )
// }

// export default Navbar
import React from 'react'
import {motion} from 'framer-motion'
import {  BiHomeAlt2 ,BiBriefcaseAlt2,BiMessageDetail} from 'react-icons/bi';
import {  AiOutlineUser} from 'react-icons/ai';

import {  LuHeartHandshake } from 'react-icons/lu';
function Navber() {
  return (
 
        <div className="button-container">
    <button className="button"  >
      <BiHomeAlt2 className='text-main'/>
    </button>
    <button className="button" >
      
     <AiOutlineUser className='text-main'/>
    </button>
    <motion.button
       initial={{ scale: 0 }}
       whileHover={{ rotate: 160 }}
       animate={{ rotate: 360, scale: 1 }}
       transition={{
         type: "spring",
         stiffness: 260,
         damping: 20
       }}
      className="icon-container" >
     
    </motion.button>

    <button className="button" >
    
      <LuHeartHandshake className='text-main'/>
      
    </button>
    <button className="button" >
    
      <BiMessageDetail className='text-main'/>
      
    </button>
  </div>

    
  )
}

export default Navber