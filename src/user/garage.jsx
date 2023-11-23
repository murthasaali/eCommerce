import React,{useEffect, useState} from 'react';

import {  motion } from 'framer-motion'; // Import useAnimation from framer-motion
import { selectProducts, selectToken, setProducts } from '../redux/authSlice';
import { IoIosCloseCircleOutline } from "react-icons/io";
import { FaCartPlus, FaHeart } from 'react-icons/fa';
import { useParams ,useNavigate} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux'
import axios from 'axios'




function Kitchen() {
  const token=useSelector(selectToken)

// const products=useSelector(selectProducts)
  const dispatch=useDispatch()
  const [filters,setFilter]=useState([])
  const nav=useNavigate()
  

  const { category } = useParams();
  const getAllProducts = async (token) => {
    try {
      const response = await axios.get('https://ecommerce-api.bridgeon.in/products?accessKey=55eebc5550c70b2b7736', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const { status, message, data } = response.data;
      if (status === 'success') {
        // Successfully fetched products.
        // dispatch(setProducts(data));
        setFilter(data)
      console.log('Fetched products:', data);
      
      } else {
        console.error('Product retrieval failed. Message:', message);
      }
    } catch (error) {
      console.error('Error:', error.message);
    }
  };
  useEffect(() => {
   getAllProducts(token,category)
  }, [token,category])
  
  const filteredProducts=filters.filter((item)=>item.category===category)
  
  console.log(filteredProducts)

  return(
    <>
    <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor:"black",
            zIndex: 999,
          // overflow: "scroll", // Apply Framer Motion controls to the overflow property
          }}
          
        >
          <motion.div
            initial={{x: -50, opacity: 1 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ type: 'tween', stiffness: 260, damping: 20 }}
            className="w-full h-full bg-no-repeat bg-conatin bg-center  flex-col rounded-lg flex justify-start items-start gap-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-full h-40 bg-black flex justify-start rounded-lg p-8">
              <p className='text-2xl font-thin text-white text-opacity' >do you want {category} take an order and <span className='text-red-500'>chill</span></p>
              <motion.button
                initial={{ rotate: 0 }}
                whileHover={{ rotate: 90 }}
                transition={{ duration: 0.2 }}
                className="absolute top-0 right-0 m-4 cursor-pointer"
             
              >
                <IoIosCloseCircleOutline className='text-white text-5xl'  onClick={()=>nav('/')}/>
              </motion.button>
            </div>
            <div className="flex p-8 flex-wrap justify-start gap-6">
            {filteredProducts.map((value) => (
            <div className='h-56 w-72 flex   flex-col rounded-lg justify-center gap-2 items-start overflow-hidden'
            >
             <motion.div
             initial={{scale:1,opacity:0.8}}
             whileHover={{scale:1.1,opacity:1}}
            
             className="h-5/6 w-full "   style={{
              backgroundImage: `url("${value.image}")`,
              backgroundSize: 'cover',
              backgroundRepeat: 'no-repeat',
              overflow:"hidden",
              borderTopRightRadius:"8px",
              borderTopLeftRadius:"8px",
              backgroundPosition: 'center',
              // Transition for box shadow
            }}
            



            >
             
     
           </motion.div>
                   <div className='font-thin text-yellow-600 w-full p-4 bg-stone-800 text-opacity-60 flex justify-center items-start gap-4 overflow-hidden'><span className='text-2xl flex items-center justify-around '></span >  {value.title}  <FaHeart className='text-xl text-white text-opacity-60'  />
                   <FaCartPlus/>
                   </div></div>
            ))}
            </div>
          </motion.div>
        </motion.div>
      
    </>
  )
}

export default Kitchen