import React, { useEffect, useState } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import axios from "axios";
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBCardTitle,
  MDBIcon,
} from "mdb-react-ui-kit";
import { selectToken } from "../redux/authSlice";
import { selectUserid } from "../redux/authSlice";
// import { selectUserid } from "../redux/authSlice";


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
  
  
const userId=useSelector(selectUserid)
const userToken=useSelector(selectToken)
const [cartItem,setCaritem]=useState([])
 

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

        const products = data.products
        setCaritem(products)
        console.log(products)

      } else {
        console.error('Cart item retrieval failed. Message:', message);
      }
    } catch (error) {
      console.error('Error:', error.message);
    }
  };
  useEffect(() => {
    console.count('rerendering useEffect cart')

  viewCart(userId,userToken)
  }, [userId,userToken])
  
 
  return (
  
      
      <Carousel
        responsive={responsive}
        autoPlay={true}
        swipeable={true}
        draggable={true}
        showDots={false}
        infinite={true}
        
        partialVisible={true}
        dotListClass="custom-dot-list-style"
        itemClass="carousel-item-padding"
        customTransition="transform 300ms ease-in"
      >
        {cartItem?.map((product) => (
          <div className="bigcard"  style={{}}>
            <Link to={`/add/${product._id}`}>
            <MDBContainer fluid className="my-5">
      <MDBRow className="justify-content-center">
        <MDBCol md="8">
          <MDBCard className="text-black">
            <MDBCardImage
              src={product.image}
              position="top"
              alt="..."
            />
            <MDBCardBody>
              <div className="text-center">
                <MDBCardTitle>{product.title}</MDBCardTitle>
                <p className="text-muted mb-4">An Electric Magic</p>
              </div>
              <div>
                <div className="d-flex justify-content-between">
                  <span>Type:</span>
                  <h6>{product.category}</h6>
                </div>
              </div>
              <div className="d-flex justify-content-between total font-weight-bold mt-4">
                <span>Price:</span>
                <span>₹{product.price}</span>
              </div>
                <div className="d-flex justify-content-between" style={{color:'green'}}>
                  <span>*Free Delevery</span>
                </div>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
    </Link>
          </div>
        ))}
      </Carousel>
   
  );
};
export default Slider;