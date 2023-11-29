import React, { useEffect, useState } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import {  useSelector } from "react-redux";
import burger from '../2150914687-removebg-preview.png'

import axios from "axios";
import { Modal } from "@mui/material";
import emptyCart from '../emptycart.png'

import {motion} from 'framer-motion'
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  
} from "mdb-react-ui-kit";
import { selectIslogin, selectToken, selectUserToken } from "../redux/authSlice";
import { selectUserid } from "../redux/authSlice";
import {  FaDropbox, FaSearch } from "react-icons/fa";
// import { selectUserid } from "../redux/authSlice";

import { MdDelete } from "react-icons/md";
import axiosInsatnce from "../axiosInstance/instance";
import Loading from "./loading";
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
  const token = useSelector(selectToken);
  const isLogin=useSelector(selectIslogin)
  const [loading , setLoading]=useState(true)

  const [modal,setModal]=useState(false)
  const [wishlist, setWishlist] = useState([]);

  const yourWishlist = async (userId, token) => {
    try {
      const response = await axios.get(`https://ecommerce-api.bridgeon.in/users/${userId}/wishlist`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const { status, message, data } = response.data;

      if (status === 'success') {
        const products = data.products[0].wishlist;
        console.log(products);
        setWishlist(products);
        setLoading(true)
      } else {
        console.log('Failed to fetch wishlist. Message:', message);
      }
    } catch (error) {
      console.error('Error', error.message);
    }
  };

  
  useEffect(()=>{
    setLoading(true)
    yourWishlist(userId,token)
  },[userId,token])
  const toggleModal = () => {
    setModal(!modal);
  };
  
  return (
<>
{
  loading&&(<Modal open={loading}  style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundImage: "url('cicon.png')", backgroundRepeat: "repeat", border:"none" }}>
  <div className="p-8  rounded-xl flex flex-col justify-center items-center">
  <div className='w-20 h-20 ' style={{
        backgroundImage:`url(${burger})`,
        backgroundSize:'cover'
    }}></div>
    <p className="flex justify-center items-center gap-10">Do you want to remove this product  </p>
    {/* Additional modal content */}
  </div>
</Modal>)
}

<div className="w-full h-auto flex justify-between ">
<p className="text-xs md:text-2xl font -thin">Please select what you want in yours cart and oreder now</p>
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
            <div className="" key={product._id}>
              {modal && (
                <Modal open={modal} onClose={toggleModal} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundImage: "url('cicon.png')", backgroundRepeat: "repeat" }}>
                  <div className="p-8 bg-white rounded-xl">
                    <h2 className="text-2xl mb-4">hi</h2>
                    <p className="flex justify-center items-center gap-10">Do you want to remove this product <button className="btn" >Yes</button></p>
                    {/* Additional modal content */}
                  </div>
                </Modal>
              )}
              <div className="wishlist">
  <div className="product-card">
    <div  alt="Product Name" style={{backgroundImage:`url('${product.image}')`}} className="cardimg"> </div>
    <h3>{product.title}</h3>
    <p>{product.price}</p>

    <button>Add to Cart</button>
  </div>

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