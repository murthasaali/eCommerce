import React, { useEffect, useState } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import {  useSelector } from "react-redux";
import 
import axios from "axios";
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  
} from "mdb-react-ui-kit";
import { selectToken } from "../redux/authSlice";
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
  const userToken = useSelector(selectToken);
  const [cartItem, setCartItem] = useState([]);
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
  const removeFromCart = async (userId, productId, token) => {
    try {
      const response = await axios.delete(`https://ecommerce-api.bridgeon.in/users/${userId}/cart`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: {
          productId,
        },
      });
      const { status, message } = response.data;
      if (status === 'success') {
        // Product removed from cart successfully.
        console.log('Product removed from cart.');
      } else {
        console.error('Product removal from cart failed. Message:', message);
      }
    } catch (error) {
      console.error('Error:', error.message);
    }
  };

  
  return (
  
      
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
          <div className="bigcard"  style={{}}>
           
            <MDBContainer fluid className="my-5">
      <MDBRow className="justify-content-center">
        <MDBCol md="8">
          <MDBCard className="text-stone-300 bg-black w-72" >
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
            <div className="flex justify-evenly items-center p-2 gap-10"><FaSearch/> <MdDelete title="remove" onClick={()=>removeFromCart(product._id)}/></div>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
          </div>
        ))}
      </Carousel>
   
  );
};
export default Slider;