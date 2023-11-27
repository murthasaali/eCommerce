import React, { useEffect, useState } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import {  useSelector } from "react-redux";
import {toast} from 'react-hot-toast'
import axios from "axios";
import { Modal } from "@mui/material";
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
import {  FaSearch } from "react-icons/fa";
// import { selectUserid } from "../redux/authSlice";

import { MdDelete } from "react-icons/md";
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
const Slider = () => {

  
  

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
  const remove = async ( productId, userToken,userId) => {
    console.log(productId)
    console.log(userToken)
    console.log(userId)
    try {
      const response = await axios.delete(`https://ecommerce-api.bridgeon.in/users/${userId}/cart/${productId}`, {
        headers: {
          Authorization: `Bearer ${userToken}`,
        }
      });
      const { status, message } = response.data;
      if (status === 'success') {
        // Product removed from cart successfully.
        toast.error('product removed succussfully')
        viewCart(userId,userToken)
        toggleModal()

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

{isLogin?

( <Carousel
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
    <div className="bigcard"  key={product._id}>
      {modal && (
<Modal open={modal} onClose={toggleModal} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' ,
backgroundImage:"url('cicon.png')",
backgroundRepeat:"repeat"

}}>
<div className="p-8 bg-white rounded-xl">
<h2 className="text-2xl mb-4">hi </h2>
<p className="flex justify-center items-center gap-10">do yo want remove this product    <button className="btn" onClick={()=>removeFromCart(product._id)}> yes</button></p>

{/* Additional modal content */}
</div>
</Modal>
)}
     
      <MDBContainer fluid className="my-5">
<MDBRow className="justify-content-center">
  <MDBCol md="8">
    <MDBCard className="text-stone-300 bg-black  w-72" >
      <div className="w-ful h-40 rounded-md" style={{
      backgroundImage:`url("${product.image}")`,
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      overflow:"hidden",

    }}>

      </div>

    
      <MDBCardBody className="bg-stone-500 bg-opacity-30">
        <div className="text-center">
          <MDBCardTitle className="text-yellow-600" style={{
        fontFamily:"'Arista Pro Alternate Fat', sans-serif",
        textAlign:"start"
      }}>{product.title}</MDBCardTitle>
        </div>
        <div>
         
        </div>
        <div className="d-flex justify-content-between  total font-weight-bold ">
          <span></span>
          <span>₹{product.price}</span>
        </div>
          
      </MDBCardBody>
      <div  className="flex justify-evenly items-center  gap-10">
      <label className="flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={selectedProducts.includes(product._id)}
                            onChange={() =>
                              handleProductSelection(product._id)
                            }
                          />
                          <span className="ml-2">
                            Select for order
                          </span>
                        </label>
      <button onClick={() => setModal(true)}>
<MdDelete title="remove"/>

</button>

      </div>

    </MDBCard>
  </MDBCol>
</MDBRow>
</MDBContainer>
    </div>
  ))}



  
</Carousel>)



:
<div className="text-white"> your cart is empty plazz login</div>

}  
     
</>

   
  );
};
export default Slider;