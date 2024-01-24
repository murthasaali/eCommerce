import React, { useEffect, useState } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import {  useDispatch, useSelector } from "react-redux";
import burger from '../assets/burger.png'
import axios from "axios";
import { Modal } from "@mui/material";
import emptyCart from '../assets/emptycart.png'
import {motion} from 'framer-motion'
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  
} from "mdb-react-ui-kit";
import { selectIsLoading, selectIslogin, selectToken, selectUserToken, selectWishlist, setIsLoading, setWishlist } from "../redux/authSlice";
import { selectUserid } from "../redux/authSlice";
import {  FaDropbox, FaRemoveFormat, FaSearch } from "react-icons/fa";
// import { selectUserid } from "../redux/authSlice";

import { MdDelete } from "react-icons/md";
import axiosInsatnce from "../axiosInstance/instance";
import Loading from "./loading";
import { LuDelete } from "react-icons/lu";
const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3,
    slidesToSlide: 1, // optional, default to 1.
  },
  tablet: {
    breakpoint: { max: 1024, min: 768 },
    items: 3,
    slidesToSlide: 1, // optional, default to 1.
  },
  mobile: {
    breakpoint: { max: 767, min: 464 },
    items: 2,
    slidesToSlide: 1, // optional, default to 1.
  },
};
const Whislistslider = () => {

  
  

  const userId = useSelector(selectUserid);
  const token = useSelector(selectUserToken);
  const isLogin=useSelector(selectIslogin)
  const isLoading=useSelector(selectIsLoading)
  const [wishlist,setWishlist]=useState([])
  const [modal,setModal]=useState(false)
  const dispatch=useDispatch()
  const yourWishlist = async (userId, token) => {
    try {
      console.log("getting all pro")
      console.log(token)
      console.log(userId)
      const response = await axios.get(`https://ecommerce-api.bridgeon.in/users/${userId}/wishlist`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const { status, message, data } = response.data;

      if (status === 'success') {
        const products = data.products[0].wishlist;
        console.log(products);
        setTimeout(() => {
          dispatch(setIsLoading(false))
          
        }, 5000);
        setWishlist(products)
      } else {
        console.log('Failed to fetch wishlist. Message:', message);
      }
    } catch (error) {
      console.error('Error', error.message);
    }
  };

  
  useEffect(()=>{
    
    yourWishlist(userId,token)
  },[userId,token])
  const toggleModal = () => {
    setModal(!modal);
  };
  
  return (
<>
{
  isLoading&&(<Modal open={isLoading} className="w-full h-screen"  style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundImage: "url('cicon.png')", backgroundRepeat: "repeat", border:"none" }}>
  <div className=" w-full h-full flex-col bg-black  gap-4  flex justify-center items-center">

  <motion.div className='w-16 h-16 ' style={{
    backgroundImage:`url(${burger})`,
        backgroundSize:'cover'}}
        animate={{
          y: [0, 13, 0], // Move the image up and down in a loop
        }}
        transition={{
          duration: 4, // Set the duration of each cycle (in seconds)
          repeat: Infinity, // Repeat the animation infinitely
          ease: "linear", // Set the easing function for smooth animation
        }}
    ></motion.div>
    {/* Additional modal content */}
    <p className="text-xs text-orange-600 ml-5 bg-opacity-50 font-thin" >please wait a moment ...</p>
    </div>
  
</Modal>)
}

<div className="w-full h-auto flex justify-between ">
<p className="text-xs md:text-2xl font-thin lg:px-10 md:px-1">Please select what you want in yours cart and oreder now</p>
<div className="dropdown dropdown-end">
  <div tabIndex={0} role="button" className="btn m-1">Sort by :--</div>
  <ul className="dropdown-content z-[1] menu p-2 shadow gap-2  border rounded-box w-52">
    <li className=" rounded-xl text-orange-700  hover:bg-stone-300"><a>Pizza</a></li>
    <li className=" rounded-xl text-orange-700  hover:bg-stone-300 " ><a>broast</a></li>
    <li className=" rounded-xl text-orange-700  hover:bg-stone-300"><a>beverages</a></li>
    <li className=" rounded-xl text-orange-700  hover:bg-stone-300"><a>rice </a></li>

  </ul>
</div>
</div>
<div className="w-full h-auto flex justify-start md:px-10 text-orange-600 opacity-80  items-center  text-xs md:text-2xl font-thin ">
        {wishlist.length} products are in your favorites list 😍   do you wanna move to cart?
</div>

{wishlist.length>0?

(<div>

<Carousel
  responsive={responsive}
  autoPlay={true}
  swipeable={true}
  draggable={true}
  showDots={true}
  
  partialVisible={true}
  dotListClass="custom-dot-list-style"
  itemClass="carousel-item-padding"
  customTransition="transform 800ms ease-in"
  className="maincard"
>
{wishlist.map((product) => (
            <div className=" flex w-full px-4 justify-center items-center flex-col" key={product._id}>
              {modal && (
                <Modal open={modal} onClose={toggleModal} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundImage: "url('cicon.png')", backgroundRepeat: "repeat" }}>
                  <div className="p-8 bg-white rounded-xl">
                    <h2 className="text-2xl mb-4">hi</h2>
                    <p className="flex justify-center items-center gap-10 text-xs">Do you want to remove this product <button className="btn" >Yes</button></p>
                    {/* Additional modal content */}
                  </div>
                </Modal>
              )}
              <div className="wishlist">
  <div className="product-card">
    <div  alt="Product Name" style={{backgroundImage:`url('${product.image}')`}} className="cardimg"> </div>
    <h3>{product.title}</h3>
    <p>{product.price}</p>

    <div className="flex justify-center items-center gap-5  ">
       <button className="p-2 text-xs border rounded-lg "> Add to Cart</button>
       <button className="p-2  "> <LuDelete className=""/></button>
    </div>
  </div>

<p className="text-xs w-3/4  text-start  md:text-lg">{product.description}</p>
</div>


          
            </div>
          ))}

        </Carousel>

</div>


      ) : (
        <div className="text-white flex w-full h-full flex-col font-thin justify-center items-center">
          <motion.img
            src={emptyCart}
            height={"200px"}
            width={"200px"}
            alt=""
          />
          <p>Your whishlist is empty</p>
        </div>
      )}
    </>
  );
};

export default Whislistslider;