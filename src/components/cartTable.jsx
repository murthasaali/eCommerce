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
import {  FaDropbox, FaRemoveFormat, FaSearch } from "react-icons/fa";
// import { selectUserid } from "../redux/authSlice";
import { MdDelete } from "react-icons/md";
import axiosInsatnce from "../axiosInstance/instance";

function CartTable() {
    
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
    <div className='w-full h-full overflow-y-auto flex flex-col justify-center items-center  gap-6'><div className="overflow-x-auto">
    <table className="table">
      {/* head */}
      <thead>
        <tr>
          <th>
            <label>
              <input type="checkbox" className="checkbox" />
            </label>
          </th>
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
    <th>
      <label>
        <input type="checkbox" className="checkbox" />
      </label>
    </th>
    <td>
      <div className="flex items-center gap-3">
      <div className="avatar">
  <div className="w-8 rounded">
    <img src={item.image} alt="Tailwind-CSS-Avatar-component" />
  </div>
</div>

        <div>
          <div className="font-bold">{item.category
}</div>
          <div className="md:text-sm md:flex hidden text-xs opacity-50">{item.description.slice(0,30)}..</div>
        </div>
      </div>
    </td>
    <td className="text-red-500">{item.price}</td>
    <td>{item.productColor} ...</td>
    <td><MdDelete/></td>

  </tr>
))}


      
    
      
        {/* row 2 */}
       
      </tbody>
      {/* foot */}
    
      
    </table>
  </div></div>
  );
}

export default CartTable;
