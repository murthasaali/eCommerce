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
import React, { useState, useEffect } from 'react';
import {useNavigate} from 'react-router-dom'
import { motion } from 'framer-motion';
import { BiBriefcaseAlt2, BiMessage, BiMessageDetail } from 'react-icons/bi';
import { AiOutlineUser } from 'react-icons/ai';
import { Modal } from '@mui/material';
import { LuHeart, LuHeartHandshake, LuLogOut } from 'react-icons/lu';
import { FaSearch } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { selectIslogin, setProducts } from '../redux/authSlice';
import axiosInsatnce from '../axiosInstance/instance';
import { selectToken, selectProducts } from '../redux/authSlice';
import { MdKeyboardVoice, MdLogin } from 'react-icons/md';
import VoiceSearchExample from '../components/voiceSearch';
import { IoCartOutline, IoCartSharp } from 'react-icons/io5';
import { SiMessenger } from 'react-icons/si';

function Navber() {
  const isLogin=useSelector(selectIslogin)
  const [modal, setModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState([]);
  const token = useSelector(selectToken);
  const products = useSelector(selectProducts);
  const dispatch = useDispatch();
  const nav=useNavigate()
  // Function to filter products based on search query

  const getAllProducts = async (token) => {
    try {
      const response = await axiosInsatnce.get(`/products?accessKey=55eebc5550c70b2b7736`, {
       
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const { status, message, data } = response.data;
      if (status === 'success') {
        // Successfully fetched products.
        dispatch(setProducts(data)); // Use setProductsAction instead of setProducts
        console.log('Fetched products:', data);
      } else {
        console.error('Product retrieval failed. Message:', message);
      }
    } catch (error) {
      console.error('Error:', error.message);
    }
  };
  useEffect(() => {
    getAllProducts(token);
  }, [token]);

  const handleInputChange = (e) => {
    const text=e.target.value;
    const text1=text.trim().toLocaleLowerCase()
    const results = products.filter((product) => product.title.toLowerCase().includes(text1));
    console.log(results);
    setSearchQuery(results);
  };
  
 

  return (
    <div className="button-container">
      {modal && (
        <Modal
          open={modal}
          onClose={() => setModal(false)}
          style={{
            display: 'flex',
            alignItems: 'start',
            justifyContent: 'center',
            marginTop: '10px',
          }}
        >
          <div className="p-8 flex flex-col justify-center items-center gap-2 w-full rounded-xl">
            <input
              type="text"
              className="bg-stone-300 text-blue-950 w-3/4 h-8 rounded-3xl pl-4 overflow-hidden shadow-md"
              style={{ opacity: 1, y: 0 }}
              onChange={handleInputChange}
             
              placeholder="Search products..."
            />
             <div className="bg-orange-400 opacity-75 h-auto w-3/4 rounded-lg">
              
              <ul >
             
  {searchQuery.length>0?
 (   searchQuery.map((value,index)=>{
      return(

      <p key={index} className=' font-mono rounded-lg ' onClick={()=>nav(`/viewproduct/${value._id}`)} >
        {index+1}:
{value.title}
      </p>
    )})):<div>plsss enter something</div>
  }
              </ul>
            </div>
              <div>
                <VoiceSearchExample/>
              </div>
          </div>
        </Modal>
      )}
    <button className="button"  >
      <BiMessage  className='text-main'/>
    </button>
    <button className="button" >
    
    <LuHeart className='text-main' onClick={()=>nav('/wishlist')}/>
    
  </button>
    <motion.button
       initial={{ scale: 0 }}
       whileHover={{ scale: 1.1 }}
       animate={{ rotate: 360, scale: 1 }}
       transition={{
         type: "spring",
         stiffness: 260,
         damping: 20
       }}
      className="icon-container" 
      onClick={()=>nav('/')} >
     
    </motion.button>


{
  !isLogin?


    <button className="button" >
      
      <AiOutlineUser className='text-main' />
     </button>:

     
      <button className="button" >
      
      <MdLogin className='text-main'  onClick={nav('/login')} title='login'/>
     </button>

}
   
    <button className="button" >
    
      <IoCartOutline className='text-white'  onClick={()=>nav('/cart')}/>
      
    </button>
    
  </div>

    
  )
}

export default Navber