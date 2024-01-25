import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import axios from "axios";
import { motion } from "framer-motion";
import { Modal, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { selectIslogin, selectUserid, selectUserToken } from "../redux/authSlice";
import { FaChevronCircleRight } from "react-icons/fa";
import { MdDelete, MdOutlineClose } from "react-icons/md";
import axiosInsatnce from "../axiosInstance/instance";
import Total from "./Total";
import { seleectImg } from "../redux/authSlice";
import { container } from "../constants/container";
import { items } from "../constants/items";

function CartTable() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [totalAmount, setTotalAmount] = useState(0);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const [isOrder, setOrder] = useState(false);
  const userId = useSelector(selectUserid);
  const userToken = useSelector(selectUserToken);
  const isLogin = useSelector(selectIslogin);
  const nav = useNavigate();
  const [modal, setModal] = useState(false);
  const [cartItem, setCartItem] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);

  const handleProductSelection = (productId) => {
    if (selectedProducts.includes(productId)) {
      setSelectedProducts(selectedProducts.filter((id) => id !== productId));
    } else {
      setSelectedProducts([...selectedProducts, productId]);
    }
  };

  const viewCart = async (userId, token) => {
    try {
      const response = await axios.get(
        `https://ecommerce-api.bridgeon.in/users/${userId}/cart`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const { status, message, data } = response.data;
      if (status === "success") {
        const products = data.products[0].cart.map((item) => ({
          ...item,
          quantity: 1, // Adding a quantity property to each item
        }));
        setCartItem(products);
        calculateTotalAmount(products);
      } else {
        console.error("Cart item retrieval failed. Message:", message);
      }
    } catch (error) {
      console.error("Error:", error.message);
    }
  };

  useEffect(() => {
    viewCart(userId, userToken);
  }, []);

  const calculateTotalAmount = (items) => {
    const total = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
    setTotalAmount(total);
  };

  const remove = async (productId, userToken, userId) => {
    try {
      const response = await axiosInsatnce.delete(
        `/users/${userId}/cart/${productId}`,
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        }
      );
      const { status, message } = response.data;
      if (status === "success") {
        toast.error("Product removed successfully");
        viewCart(userId, userToken);
        toggleModal();
      } else {
        console.error("Product removal from cart failed. Message:", message);
      }
    } catch (error) {
      console.error("Error:", error.message);
    }
  };

  const removeFromCart = (id) => {
    remove(id, userToken, userId);
  };

  const toggleModal = () => {
    setModal(!modal);
  };

  const [orderText, setOrderText] = useState("Order Processing....");

  const handleOrder = () => {
    setOrder(true);
    setTimeout(() => {
      setOrderText("order placed");
      setTimeout(() => {
        setOrder(false);
        nav("/");
        setOrderText("order processing....");
      }, 2000);
    }, 5000);
  };

  const updateQuantity = (productId, newQuantity) => {
    setCartItem((prevCart) =>
      prevCart.map((item) =>
        item._id === productId ? { ...item, quantity: newQuantity } : item
      )
    );
  };
  useEffect(() => {
    const total = cartItem.reduce((acc, item) => acc + item.price * item.quantity, 0);
    setTotalAmount(total);
    console.log(totalAmount)
  }, [cartItem]);
  
  return (
    <div className='w-full h-full flex text-white gap-10 justify-center items-start'>
      <div>
        <motion.button
          className='text-white bg-black h-auto w-auto px-3 py-1 rounded-sm text-3xl absolute left-2 top-1/2 md:hidden items-center gap-3 flex transform -translate-y-1/2 cursor-pointer z-20'
          onClick={openModal}
          animate={{
            y: [0, 10, 0],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          <FaChevronCircleRight />
          <span className='text-sm font-thin'>order now </span>
        </motion.button>

        {isModalOpen && (
          <div className='fixed top-0 left-0 w-full h-full backdrop-blur-sm z-50 flex justify-center items-center'>
            <div className='w-auto h-auto rounded-lg p-4'>
              <button
                className='mt-4 text-white text-3xl px-4 py-2 rounded-md'
                onClick={closeModal}
              >
                <MdOutlineClose />
              </button>
              <Total totalAmount={totalAmount} />
            </div>
          </div>
        )}

        <motion.table
          className='table md:p-3 p-0 border-b-transparent'
          variants={container}
          initial='hidden'
          animate='visible'
        >
          <thead className='text-sm font-thin text-stone-400'>
            <tr>
              <th>Name</th>
              <th>price</th>
              <th>quantity</th>
              <th></th>
            </tr>
          </thead>
          <motion.tbody exit={{ opacity: 0, transition: { duration: 0.5 } }}>
            {cartItem.map((item) => (
              <motion.tr
                key={item._id}
                variants={items}
                initial='hidden'
                animate='visible'
                className='border-b-transparent'
              >
                <td>
                  <div className='flex items-center gap-3'>
                    <div className='avatar'>
                      <div className='w-14 rounded'>
                        <img src={item.image} alt='Avatar' />
                      </div>
                    </div>
                    <div>
                      <div className='font-bold'>{item.title}</div>
                      <div className='md:text-sm md:flex hidden text-xs opacity-50 text-orange-500 text-opacity-90'>
                        {item.description.slice(0, 30)}..
                      </div>
                    </div>
                  </div>
                </td>
                <td className='text-red-500'>{item.price}</td>
                <td>
                  <div className='flex flex-col justify-center items-center'>
                    <button
                      className='p-2 bg-black text-white rounded-md'
                      onClick={() =>
                        updateQuantity(item._id, Math.max(1, item.quantity - 1))
                      }
                    >
                      -
                    </button>
                    <span className='mx-2'>{item.quantity}</span>
                    <button
                      className='p-2 bg-black text-white rounded-md'
                      onClick={() => updateQuantity(item._id, item.quantity + 1)}
                    >
                      +
                    </button>
                  </div>
                </td>
                <td>
                  <motion.button
                    className='hover:border-b-[1px] text-xl'
                    onClick={() => removeFromCart(item._id)}
                    whileHover={{ scale: 1.1 }}
                  >
                    <MdDelete />
                  </motion.button>
                </td>
              </motion.tr>
            ))}
          </motion.tbody>
        </motion.table>
      </div>
      <div className='md:flex hidden'>
        <Total totalAmount={totalAmount} />
      </div>
    </div>
  );
}

export default CartTable;
