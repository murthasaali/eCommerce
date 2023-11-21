import React, { useState } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import { setUserToken,setSignIn } from '../redux/authSlice';
import { useDispatch } from 'react-redux';
import { selectUserToken } from '../redux/authSlice';
import { useSelector } from 'react-redux';

// Define the motion variants for animation
const item = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1
  }
};

const container = {
  hidden: { opacity: 1, scale: 0 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      delayChildren: 0.3,
      staggerChildren: 0.2
    }
  }
};

function Registration() {
  const dispatch=useDispatch()
  const [alert,setAlert]=useState(false)
  const userToken= useSelector(selectUserToken);
  const isSignIn = useSelector((state) => state.auth.isSignIn);



  const registerUser = async (accessKey, username, email, password) => {
    try {
      const response = await axios.post('https://ecommerce-api.bridgeon.in/users/register', {
        accessKey,
        username,
        email,
        password,
      });
      const { status, message, data } = response.data;
      if (status === 'success') {
        dispatch(setUserToken(data.token))
        console.log('Registration successful. Token:', data.token);
      } else {
        console.error('Registration failed. Message:', message);
      }
    } catch (error) {
      console.error('Error:', error.message);
     
      
    }
  };
  
  const handleRegistration = (event) => {
    event.preventDefault();
    dispatch(setSignIn(true))
    // Access the form data and call the registerUser function with the appropriate values
  // const apiKey = apikeys; // Replace with your actual API key
    const username = event.target.username.value;
    const email = event.target.email.value;
    const password = event.target.password.value;
   if (username===""){
    setAlert(true)
   }

    registerUser("55eebc5550c70b2b7736", username, email, password);

  };

  return (
   
      <motion.div initial="hidden" animate="visible" variants={container} className="form-container">

        <motion.p variants={container} className="title">Registration</motion.p>

        <form className="form" onSubmit={handleRegistration}>
          <div className="input-group">
            <motion.label htmlFor="username" variants={item}>Username</motion.label>
            <input type="text" name="username" id="username" placeholder="" />
          </div>
          <div className="input-group">
            <motion.label htmlFor="email" variants={item}>Email</motion.label>
            <input type="email" name="email" id="email" placeholder="" />
          </div>
          <div className="input-group">
            <motion.label htmlFor="password" variants={item}>Password</motion.label>
            <input type="password" name="password" id="password" placeholder="" />
            <div className="forgot">
              <p rel="noopener noreferrer">Forgot Password?</p>
            </div>
          </div>
          {/* Add additional input fields for registration, if necessary */}
          <button className="sign" type="submit">Register</button>
          {alert&&
          <p>please fill in the blank</p>}
        </form>
        {/* Rest of the code remains unchanged */}
      </motion.div>
 
  );
}

export default Registration;
