import React,{useEffect} from 'react';

import {  motion } from 'framer-motion'; // Import useAnimation from framer-motion
import { selectIsLoading, selectProducts, selectToken, selectUserToken, selectUserid, setIsLoading, setProducts } from '../redux/authSlice';
import { IoIosCloseCircleOutline } from "react-icons/io";
import { FaCartPlus, FaHeart } from 'react-icons/fa';
import { useParams ,useNavigate} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux'
import axios from 'axios'
import toast from "react-hot-toast"
import axiosInsatnce from '../axiosInstance/instance';
import { MdDelete } from 'react-icons/md';
import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';
import Loading from '../components/loading';

function Kitchen() {
  const token=useSelector(selectToken)
  const userToken=useSelector(selectUserToken)
  const userId=useSelector(selectUserid)
  const products=useSelector(selectProducts)
  const isLoading=useSelector(selectIsLoading)
// const products=useSelector(selectProducts)
  const dispatch=useDispatch()
  
  const nav=useNavigate()

 



  const { category } = useParams();
  useEffect(() => {
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

    if (token) {
      getAllProducts(token);
    }
  }, [token]);
  const filteredProducts = products.filter(product => product.category === category);

    
const handleCart = async (productId) => {
  try {
    console.log("Adding product to cart...");
    console.log("Product ID:", productId);
    console.log("User ID:", userId);
    console.log("User Token:", userToken);

    const response = await axios.post(
      `https://ecommerce-api.bridgeon.in/users/${userId}/cart/${productId}`,
      null, // Assuming no data payload, pass null if not needed
      {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      }
    );

// Log the response from the server

    if (response.data.status === 'success') {
      console.log('Product added to cart.');
      toast.success("product added to cart  succussfully")
    } else {
      console.error('Product addition to cart failed. Message:', response.data.message);
    }
  } catch (error) {
    console.error('Error:', error.message);
   toast.error('already in cart')
  }
};

const handleWishlist = async (productId) => {
  try {
    console.log("Adding product to wishlist...");
    console.log("Product ID:", productId);
    console.log("User ID:", userId);
    console.log("User Token:", userToken);

    const response = await axios.post(
      `https://ecommerce-api.bridgeon.in/users/${userId}/wishlist/${productId}`,
      null, // Assuming no data payload, pass null if not needed
      {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      }
    );

// Log the response from the server

    if (response.data.status === 'success') {
      console.log('Product added to wishlist.');
      toast.success("product added to wishlist  succussfully")
    } else {
      console.error('Product addition to wishlist failed. Message:', response.data.message);
    }
  } catch (error) {
    console.error('Error:', error.message);
    toast.error("already in wishlist")
   
  }
};

const Loadings=(id)=>{
  setTimeout(() => {
    dispatch(setIsLoading(false))
  }, 3000);
}

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
            zIndex:800,
            overflow:"auto"
            
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
              <p className='text-2xl font-thin text-white text-opacity' >do you want {category} take an order and <span className='text-red-500'  >chill</span></p>
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
            {filteredProducts.map((value,index) => (
                <div className="product-card" key={index}>
   
                <div onDoubleClick={()=> nav(`/viewproduct/${value._id}`)} alt="Product Name" style={{backgroundImage:`url('${value.image}')`,
              opacity:0.5}} className="cardimg" > </div>
                <div className='w-full  h-auto flex flex-col items-start gap-0 text-xs  text-start'>
    <p className='text-xl  text-opacity-30' style={{
      fontFamily:" 'Arista Pro Alternate Fat', sans-serif "
    }}>{value.title}</p>
   
    
      <p>{value.description}</p> <div className='text-xl w-full  flex justify-evenly items-center'><span>₹ {value.price} /- </span>  <button>

<FaHeart  className='text-2xl hover:text-red-500' onClick={()=>handleWishlist(value._id)} />
</button>


<button >

 <FaCartPlus  className='text-2xl hover:text-orange-500'  onClick={()=>handleCart(value._id)}/></button> </div>
    <div className='flex justify-center items-center gap-5 '>
     
       
      </div>
   

  </div>
              </div>
            ))}
            </div>
          </motion.div>
        </motion.div>
     
    </>
  )
}

export default Kitchen