import React, { useEffect, useState } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import {  useSelector } from "react-redux";
import {toast} from 'react-hot-toast'
import axios from "axios";
import emptyCart from '../assets/emptycart.png'
import {motion} from 'framer-motion'
import { Modal,Box,Typography} from '@mui/material';
import loginpic from '../assets/delivering.png'
import {useNavigate} from 'react-router-dom'
import { selectIslogin, selectToken, selectUserToken } from "../redux/authSlice";
import { selectUserid } from "../redux/authSlice";
import {  FaCross, FaDropbox, FaRemoveFormat, FaSearch, FaXing } from "react-icons/fa";
// import { selectUserid } from "../redux/authSlice";
import { MdDelete, MdOutlineClose } from "react-icons/md";
import axiosInsatnce from "../axiosInstance/instance";
import Total from "./Total";
import { seleectImg } from '../redux/authSlice';
import { FaChevronCircleRight } from 'react-icons/fa';
function CartTable() {

  const [isModalOpen, setIsModalOpen] = useState(false)

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
    
  const [isOrder,setOrder]=useState(false)
  const [tick,setTick]=useState(false)
  const userId = useSelector(selectUserid);
  const userToken = useSelector(selectUserToken);
  const isLogin=useSelector(selectIslogin)
  console.log(userId)
  const [modal,setModal]=useState(false)
  const [cartItem, setCartItem] = useState([]);
  const nav=useNavigate()
  const [selectedProducts, setSelectedProducts] = useState([]);

  const handleProductSelection = (productId) => {
    if (selectedProducts.includes(productId)) {
      // If product is already selected, remove it from the selection
      setSelectedProducts(selectedProducts.filter((id) => id !== productId));
    } else {
      // If product is not selected, add it to the selection
      setSelectedProducts([...selectedProducts, productId]);
    }
  }
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
       const products=data.products[0].cart
        console.log('Cart items:',products );
        setCartItem(products)
      } else {
        console.error('Cart item retrieval failed. Message:', message);
      }
    } catch (error) {
      console.error('Error:', error.message);
    }
  };
  useEffect(() => {
    viewCart(userId,userToken)
  }, [])
  const remove = async (productId, userToken, userId) => {
    console.log(productId);
    console.log(userToken);
    console.log(userId);
    try {
      const response = await axiosInsatnce.delete(`/users/${userId}/cart/${productId}`, {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      });
      const { status, message } = response.data;
      if (status === 'success') {
        // Product removed from cart successfully.
        toast.error('Product removed successfully');
        viewCart(userId, userToken);
        toggleModal();
      } else {
        console.error('Product removal from cart failed. Message:', message);
      }
    } catch (error) {
      console.error('Error:', error.message);
    }
  };
  
  const removeFromCart=(id)=>{
    remove(id,userToken,userId)

  }
  const toggleModal = () => {
    setModal(!modal);
  };
  const [orderText, setOrderText] = useState('Order Processing....');

  const handleOrder = () => {
    setOrder(true);
    setTimeout(() => {
      setOrderText("order placed")
      setTimeout(() => {
        
        setOrder(false)
        nav("/")
        setOrderText("order processing....")

      }, 2000);
    }, 5000);
    
  };

  
  return (
    <div className='w-full h-full  flex text-white gap-10 justify-center items-start  '><div className="">
    <motion.button  
            className='text-white bg-black  h-auto w-auto px-3 py-1 rounded-sm  text-3xl absolute left-2 top-1/2 md:hidden items-center gap-3 flex transform -translate-y-1/2 cursor-pointer  z-20'
            onClick={openModal}
 
              animate={{
                y: [0, 10, 0], // Move the image up and down in a loop
              }}
              transition={{
                duration: 4, // Set the duration of each cycle (in seconds)
                repeat: Infinity, // Repeat the animation infinitely
                ease: "linear", // Set the easing function for smooth animation
              }}>
      
       <FaChevronCircleRight
      />
      <span className="text-sm  font-thin">order now  </span>
      </motion.button> 
      
      
      {isModalOpen && (
          <div className='fixed top-0 left-0 w-full h-full  backdrop-blur-sm z-50 flex justify-center items-center'>
            <div className='w-auto h-auto  rounded-lg p-4'>
              <button
                className='mt-4  text-white text-3xl px-4 py-2 rounded-md'

                
                >
              <MdOutlineClose onClick={closeModal}/>
              </button>
                <Total/>
            </div>
          </div>
        )}
    <table className="table">
      {/* head */}
      <thead className="text-sm font-thin text-stone-400">
        <tr>
         
          <th>Name</th>
          <th>price</th>
          <th>quantity</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {/* row 1 */}
        {cartItem.map((item) => (
  <tr key={item._id}>
    
    <td>
      <div className="flex items-center gap-3">
      <div className="avatar">
  <div className="w-14 rounded">
    <img src={item.image} alt="Tailwind-CSS-Avatar-component" />
  </div>
</div>

        <div>
          <div className="font-bold">{item.title}</div>
          <div className="md:text-sm md:flex hidden text-xs opacity-50 text-orange-500 text-opacity-90">{item.description.slice(0,30)}..</div>
        </div>
      </div>
    </td>
    <td className="text-red-500">{item.price}</td>
    <td>{item.productColor} ...</td>
    <td>  <button className='p-3 hover:border-b-[1px] text-xl'><MdDelete  onClick={()=>removeFromCart(item._id)}/> </button></td>

  </tr>
))}


      
    
      
        {/* row 2 */}
       
      </tbody>
      {/* foot */}
    
      
    </table>
  </div>
  <div className="md:flex hidden">

   <Total/>
  </div>
  
  
  </div>
  );
}

export default CartTable;
