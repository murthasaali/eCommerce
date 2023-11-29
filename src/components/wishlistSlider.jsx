import React, { useEffect, useState } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import {  useSelector } from "react-redux";
import {toast} from 'react-hot-toast'
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
  const userToken = useSelector(selectUserToken);
  const isLogin=useSelector(selectIslogin)
  console.log(userId)
  const [modal,setModal]=useState(false)
  const [cartItem, setCartItem] = useState([]);

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
  const veiwWishlist = async (userId, token) => {
    try {
      const response = await axios.get(`https://ecommerce-api.bridgeon.in/users/${userId}/whishlist`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const { status, message, data } = response.data;
      if (status === 'success') {
        // Successfully fetched cart items.
       const products=data.products[0].whishlist
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
    veiwWishlist(userId,userToken)
  }, [])
  const remove = async (productId, userToken, userId) => {
    console.log(productId);
    console.log(userToken);
    console.log(userId);
    try {
      const response = await axiosInsatnce.delete(`/users/${userId}/whislist/${productId}`, {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      });
      const { status, message } = response.data;
      if (status === 'success') {
        // Product removed from cart successfully.
        toast.error('Product removed successfully');
        veiwWishlist(userId, userToken);
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
  
  return (
<>


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
{cartItem.length>0?

(<div>

<Carousel
  responsive={responsive}
  autoPlay={true}
  swipeable={true}
  draggable={true}
  showDots={true}
  infinite={true}
  
  partialVisible={true}
  dotListClass="custom-dot-list-style"
  itemClass="carousel-item-padding"
  customTransition="transform 300ms ease-in"
>
{cartItem.map((product) => (
            <div className="bigcard" key={product._id}>
              {modal && (
                <Modal open={modal} onClose={toggleModal} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundImage: "url('cicon.png')", backgroundRepeat: "repeat" }}>
                  <div className="p-8 bg-white rounded-xl">
                    <h2 className="text-2xl mb-4">hi</h2>
                    <p className="flex justify-center items-center gap-10">Do you want to remove this product <button className="btn" onClick={() => removeFromCart(product._id)}>Yes</button></p>
                    {/* Additional modal content */}
                  </div>
                </Modal>
              )}

              <MDBContainer fluid className="my-5">
                <MDBRow className="justify-content-center">
                  <MDBCol md="8">
                    <MDBCard
                      className="text-stone-300 bg-black w-72"
                      style={{
                        width: '100%', // Default width for larger screens
                        '@media (max-width: 767px)': { // Change styles for mobile screens
                          width: '100%',
                          margin: '0 auto', 
                          padding:"20px"// Center align on mobile
                        },
                      }}
                    >
                      <div className="w-full h-40 rounded-md" style={{
                        backgroundImage: `url("${product.image}")`,
                        backgroundSize: 'cover',
                        backgroundRepeat: 'no-repeat',
                        overflow: "hidden",
                         '@media (max-width: 767px)': {
                          height:"100px",
                          // Change styles for mobile screens
                          
                        },
                      }}>
                      </div>
                      <MDBCardBody className="bg-stone-500 bg-opacity-30">
                        <div className="text-center">
                          <MDBCardTitle className="text-yellow-600" style={{
                            fontFamily: "'Arista Pro Alternate Fat', sans-serif",
                            textAlign: "start"
                          }}>{product.title}</MDBCardTitle>
                        </div>
                        {/* ... (other card content) */}
                      </MDBCardBody>
                      <div className="flex justify-evenly items-center p-4 gap-10">
                        <label className="flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            className="checkbox checkbox-info" 
                            checked={selectedProducts.includes(product._id)}
                            onChange={() =>
                              handleProductSelection(product._id)
                            }
                          />
                        </label>
                        <button onClick={() => setModal(true)}>
                          <MdDelete title="remove" />
                        </button>
                      </div>
                    </MDBCard>
                  </MDBCol>
                </MDBRow>
              </MDBContainer>
            </div>
          ))}

        </Carousel>
        <div>{selectedProducts.length}</div>  

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