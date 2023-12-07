import React, { useEffect, useState } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import {  useSelector } from "react-redux";
import {toast} from 'react-hot-toast'
import axios from "axios";
import emptyCart from '../emptycart.png'
import {motion} from 'framer-motion'
import { Modal,Box,Typography} from '@mui/material';
import loginpic from '../delivering.png'
import {useNavigate} from 'react-router-dom'
import { selectIslogin, selectToken, selectUserToken } from "../redux/authSlice";
import { selectUserid } from "../redux/authSlice";
import {  FaDropbox, FaRemoveFormat, FaSearch } from "react-icons/fa";
// import { selectUserid } from "../redux/authSlice";
import { MdDelete } from "react-icons/md";
import axiosInsatnce from "../axiosInstance/instance";

const style = {
  position: 'absolute' ,
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 200,
  bgcolor: 'black',
  boxShadow: '2px 5px 10px 5px white',
  boxShadow: 24,
  p: 4,
};
const textVariants = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: {
      delay: 0.2,
      staggerChildren: 0.1, // Stagger each letter
    },
  },
};

const letterVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
};

const text = "Order Processing....";

const Slider = () => {

  
  
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
<div className="w-full h-full overflow-y-auto flex flex-col justify-center items-center gap-6 ">
 
  {cartItem.length>0&&(
    <>
    <div className=" flex  justify-start items-center   w-full h-auto   gap-5 md:text-xl  text-xs px-3 "><span>
      
{cartItem.length} products are selected 
      </span> <button onClick={handleOrder} className=" px-2 rounded-lg bg-orange-500 bg-opacity-70 text-white  font-thin hover:text-white hover:text-opacity-50 hover:bg-opacity-50">oreder now </button></div>
    </>
  )}
  {cartItem.length > 0 ? (
    <div className="flex flex-wrap justify-center items-center">

      {cartItem.map((product) => (
                 
                 <div className="product-card" 
                 style={{ transition: 'transform 0.3s' }}>
                   <div  alt="Product Name" style={{backgroundImage:`url('${product.image}')`}} className="cardimg" onClick={()=>nav(`/viewproduct/${product._id}`)}> </div>
                   <div className="w-full h-auto gap-2 flex flex-col items-start px-3">

                   <span className="flex w-full justify-start  items-center">{product.title}</span>
                   <div className="flex justify-center gap-4 items-center "> <span className="text-red-600">{product.price} </span> 
                   <div className="flex justify-center items-center  gap-3 text-sm" > <button>+</button>  <span>1</span> <button>-</button> </div>

                  
                   </div >
               
                   <div className="flex justify-evenly items-center gap-5 w-full ">
                      <button className="p-2  " onClick={()=>removeFromCart(product._id)}> <MdDelete  className="text-white text-xl "/></button>
                      <input type="checkbox" className="checkbox border rounded-lg" />
                   </div>
                   </div>
                 </div>
               
              
               
      ))}
    </div>
  ) : (
    <div className="text-white flex w-full h-full flex-col font-thin justify-center items-center">
       <div className="text-white flex w-full h-full flex-col font-thin justify-center items-center">
          <motion.img
            src={emptyCart}
            height={"200px"}
            width={"200px"}
            alt=""
          />
          <p>Your whishlist is empty</p>
        </div>
    </div>
  )}
  {
    isOrder&&
    <Modal open={isOrder}  style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
    <Box sx={style}
           className="shadow-md rounded-lg flex flex-col justify-center items-center shadow-md-top shadow-md-right shadow-md-bottom shadow-md-left"
           >
             <motion.img src={loginpic} alt="" className='w-32 h-20' 
               animate={{
                x: [0, 6, 0], // Move the image up and down in a loop
              }}
              transition={{
                duration: 4, // Set the duration of each cycle (in seconds)
                repeat: Infinity, // Repeat the animation infinitely
                ease: "linear", // Set the easing function for smooth animation
              }}
             />
             <Typography id="modal-modal-title" variant="h6" component="h2">
               <div className=" flex flex-col justify-center items-center gap-1 w-full">
               <motion.div
      className="bg-black btn"
      variants={textVariants}
      initial="initial"
      animate="animate"
    >
      {
      orderText.endsWith(".")?
     ( orderText.split('').map((letter, index) => (
        <motion.span key={index} variants={letterVariants}>
          {letter}
        </motion.span>
      ))
      ):
      (
        <span className="text-stone-200  font-thin">{orderText}👍</span>
      )
      
      }
    </motion.div>
   
           </div>
             </Typography>
           </Box>

  </Modal>
  }
</div>
  );
};

export default Slider;