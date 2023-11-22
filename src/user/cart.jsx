import React, { useState ,useEffect} from 'react'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { selectIsabout, selectIscart, selectUserToken, selectUserid, setIsabout } from '../redux/authSlice'

import { motion } from 'framer-motion'
import { FaHeart,FaRupeeSign } from 'react-icons/fa'
import { BiSolidOffer } from 'react-icons/bi'
import { IoIosCloseCircleOutline } from 'react-icons/io'
import {useNavigate} from 'react-router-dom'
import { IoArrowBackCircleOutline } from "react-icons/io5";
import { MdOutlineSecurity } from "react-icons/md";


function Cart() {
  const isCart = useSelector(selectIscart)
  const userToken = useSelector(selectUserToken)
  const [cartitem, setCaritem] = useState([])
  const nav=useNavigate()
  const isAbout=useSelector(selectIsabout)
  
  const userId = useSelector(selectUserid)
  const dispatch = useDispatch()
  const viewCart = async (userId, token) => {
    try {
      const response = await axios.get(`https://ecommerce-api.bridgeon.in/users/${userId}/cart`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const { status, message, data } = response.data;
      if (status === 'success') {

        // Successfully fetched cart items.

        const products = data.products
        setCaritem(products)
        console.log(products)

      } else {
        console.error('Cart item retrieval failed. Message:', message);
      }
    } catch (error) {
      console.error('Error:', error.message);
    }
  };
  useEffect(() => {
    console.count('rerendering useEffect cart')

  viewCart(userId,userToken)
  }, [userId,userToken])
  


  const handleRemoveCart = async (productId) => {
    try {
      console.log("Removing product from wishlist...");
      console.log("Product ID:", productId);
      console.log("User ID:", userId);
      console.log("User Token:", userToken);

      const response = await axios.delete(
        `https://ecommerce-api.bridgeon.in/users/${userId}/cart/${productId}`,
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        }
      );

      if (response.data.status === 'success') {
        console.log('Product removed from cart.');
        
        viewCart(userId,userToken)
       
      } else {
        console.error('Removing product from cart failed. Message:', response.data.message);
      }
    } catch (error) {
      console.error('Error:', error.message);
    }
  };
  return (
    <>
      {isCart && <motion.div
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
          flexDirection: "column",
          alignItems: "center",
          justifyContent: 'center',
          background: 'black',
          zIndex: 999,
        }}
       
      >
        <div className='bg-black w-full h-full'>

        <div className='bg-black w-full flex gap-56 items-center justify-around mt-14'>

          <div className='headings' onClick={()=>dispatch(setIsabout(true))}> CART DETAILS</div>
          <div className='flex items-center gap-10'>

            <div className='flex items-center '> <MdOutlineSecurity className='text-green-600'/>&nbsp; 100 secure</div>
            < FaHeart className='text-pink-600' />
            <IoArrowBackCircleOutline className='text-3xl'  onClick={() => nav('/')}/>
          </div>
        </div>
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: 'tween', stiffness: 260, damping: 20 }}
         
          className=" w-full h-full  bg-no-repeat bg-conatin bg-center  flex   "
          onClick={(e) => e.stopPropagation()}


        >
           {/* */}
          <div className='w-4/6 h-full bg-black bg-opacity-90 p-4 flex flex-col gap-4'>

            <div className='flex items-center p-3 w-3/4 border rounded-lg file: border-red-600 h-10 '> check delivery time and services   </div>

            <div className='flex flex-col border pl-3 pt-3 w-3/4 rounded-lg items-start '><p className='flex items-center'>   <BiSolidOffer className='text-sky-800' />  &nbsp; available offers</p>
              <p   >7.5% instant Discount on every spends with ck sons Kotak credit Card.TCA</p>

            </div>
            <div className='border p-4 w-3/4 h-auto overflow-scroll  mb- rounded-lg'>

              <ul className='flex flex-col gap-6' >

                {cartitem.map((value) => {
                  return value.cart.map((item) => (
                    <li key={item._id} className='w-full flex '>

                      <div className=' w-full   overflow-hidden p-4'
                       style={{
                        backgroundImage: `url(${item.image})`, // Set background image URL for the card here
                        backgroundSize: 'cover',
                        backgroundRepeat: 'no-repeat',
                        borderRadius:"8px",
                        opacity:0.9}}>

                         
                        <div className='card-body'>
                          <p className='flex justify-evenly'>{item.title}  <span>  <IoIosCloseCircleOutline className='text-white text-2xl' onClick={()=>handleRemoveCart(item._id)}/></span></p>
                         
                        </div>
                      <div className='p-4 flex  w-full flex-col items-start'>
                        <div className='flex w-full justify-end'>

                          <motion.button
                            initial={{ rotate: 0 }}
                            whileHover={{ rotate: 90 }}
                            transition={{ duration: 0.2 }}
                            className="    cursor-pointer"
                            onClick={() => handleRemoveCart(item._id)}

                          >
                          
                          </motion.button >
                        </div>
                        <p className='font-bold text-2xl text-stone-200'>{item.category}</p>
                        <li className='font-thin flex items-center text-red-600'><FaRupeeSign className='text-white' />{item.price} 65% off now</li>
                        <li className='text-stone-200'>{item.description}</li>


                      </div>
                      </div>

                    </li>
                  ));
                })}
              </ul>
          
            </div>





          </div> 
          <div className='w-2/6 bg-black h-56 mr-14 p-4 flex flex-col gap-4 item-start' >

          <p  className='text-2xl  text-left' >Total Price</p>
          <div className='flex items-center p-3 w-3/4 border rounded-lg file:  bg-stone-300 border-red-600 h-10 flex-col'> 
          
          <p></p>
          
            </div>




          </div>



        </motion.div>
        </div>

      </motion.div>
      }
    </>
  )
}

export default Cart