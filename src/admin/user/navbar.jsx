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
import React, { useState } from 'react'
import {motion} from 'framer-motion'
import {  BiHomeAlt2 ,BiBriefcaseAlt2,BiMessageDetail} from 'react-icons/bi';
import {  AiOutlineUser} from 'react-icons/ai';
import { Modal } from '@mui/material';
import {  LuHeartHandshake } from 'react-icons/lu';
import { FaSearch } from 'react-icons/fa';
function Navber() {
  const [modal,setModal]=useState(false)
  return (
 
        <div className="button-container">
          {modal&&
          (
            <Modal
            open={modal}
            onClose={() => setModal(false)}
            style={{ display: 'flex', alignItems: 'start', justifyContent: 'center', marginTop: '10px' }}
          >
             <div className="p-8  flex flex-col  justify-center items-center gap-2 w-full rounded-xl">
            <input
              type="text"
              className="bg-stone-300 text-blue-950 w-3/4 h-8 rounded-3xl pl-4 overflow-hidden shadow-md"
              style={{ opacity: 1, y: 0 }}
              
            />
            </div>


            </Modal>
          )
          
          }
    <button className="button"  >
      <FaSearch onClick={()=>setModal(true)} className='text-main'/>
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