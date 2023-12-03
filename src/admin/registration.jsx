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
        console.log('Registration successful. Token:', data.token);
    dispatch(setSignIn(true))

      } else {
        console.error('Registration failed. Message:', message);
      }
    } catch (error) {
      console.error('Error:', error.message);
     
      
    }
  };
  
  const handleRegistration = (event) => {
    event.preventDefault();
    // Access the form data and call the registerUser function with the appropriate values
  // const apiKey = apikeys; // Replace with your actual API key
    const username = event.target.username.name;
    const email = event.target.email.name;
    const password = event.target.password.name;
  

    registerUser("55eebc5550c70b2b7736", username, email, password);

  };

  return (
   
      <motion.div initial="hidden" animate="visible" variants={container} className="form-container">

        <motion.p variants={container} className="title">Registration</motion.p>

        <form className="h-auto flex justify-center flex-col p-2 font-thin" onSubmit={handleRegistration}>
          <div className="flex flex-col items-start ">
            <motion.label className='font-thin' variants={item}>Username</motion.label>
            <input type="text" name="username" id="username" placeholder="name "  className='bg-black px-2  rounded-lg w-full h-10'/>
          </div>
          <div className="flex flex-col items-start ">
            <motion.label className='font-thin' variants={item}>Username</motion.label>
<input type="email" name="email" id="email" placeholder="email "  className='bg-black px-2  rounded-lg w-full h-10'/>

          </div>
          <div className="flex flex-col items-start ">
            <motion.label className='font-thin' variants={item}>password</motion.label>
            <input type="password" name="password" id="password" placeholder="password "  className='bg-black px-2  rounded-lg w-full h-10'/>

            <button className="forgot">
              <p rel="noopener noreferrer" onClick={()=>dispatch(setSignIn(true))}>already have an account?</p>
            </button>
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
