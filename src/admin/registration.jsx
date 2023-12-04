// import React, { useState } from 'react';
// import { motion } from 'framer-motion';
// import axios from 'axios';
// import { setUserToken,setSignIn } from '../redux/authSlice';
// import { useDispatch } from 'react-redux';
// import { selectUserToken } from '../redux/authSlice';
// import { useSelector } from 'react-redux';

// // Define the motion variants for animation
// const item = {
//   hidden: { y: 20, opacity: 0 },
//   visible: {
//     y: 0,
//     opacity: 1
//   }
// };

// const container = {
//   hidden: { opacity: 1, scale: 0 },
//   visible: {
//     opacity: 1,
//     scale: 1,
//     transition: {
//       delayChildren: 0.3,
//       staggerChildren: 0.2
//     }
//   }
// };

// function Registration() {
//   const dispatch=useDispatch()
//   const [alert,setAlert]=useState(false)



//   const registerUser = async (accessKey, username, email, password) => {
//     try {
//       const response = await axios.post('https://ecommerce-api.bridgeon.in/users/register', {
//         accessKey,
//         username,
//         email,
//         password,
//       });
//       const { status, message, data } = response.data;
//       if (status === 'success') {
//         console.log('Registration successful. Token:', data.token);
//     dispatch(setSignIn(true))

//       } else {
//         console.error('Registration failed. Message:', message);
//       }
//     } catch (error) {
//       console.error('Error:', error.message);
     
      
//     }
//   };
  
//   const handleRegistration = (event) => {
//     event.preventDefault();
//     // Access the form data and call the registerUser function with the appropriate values
//   // const apiKey = apikeys; // Replace with your actual API key
//     const username = event.target.username.value;
//     const email = event.target.email.value;
//     const password = event.target.password.value;
  

//     registerUser("55eebc5550c70b2b7736", username, email, password);

//   };

//   return (
   
//       <motion.div initial="hidden" animate="visible" variants={container} className="form-container">

//         <motion.p variants={container} className="title">Registration</motion.p>

//         <form className="h-auto flex justify-center flex-col p-2 font-thin" onSubmit={handleRegistration}>
//         </form>
//         {/* Rest of the code remains unchanged */}
//       </motion.div>
 
//  );
// }

// export default Registration;


import React, { useState } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import * as yup from 'yup'; // Import Yup
import { setUserToken, setSignIn } from '../redux/authSlice';
import { useDispatch } from 'react-redux';
import { selectUserToken } from '../redux/authSlice';
import { useSelector } from 'react-redux';
import toast from "react-hot-toast"
import { toHaveStyle } from '@testing-library/jest-dom/matchers';

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
  const dispatch = useDispatch();
  const [alert, setAlert] = useState(false);

  // Define Yup schema for form validation
  const validationSchema = yup.object().shape({
    username: yup.string().required('Username is required'),
    email: yup.string().email('Invalid email').required('Email is required'),
    password: yup.string().required('Password is required'),
  });

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
        toast.success("user registered succussfully")
        dispatch(setSignIn(true));

      } else {
        console.error('Registration failed. Message:', message);
        toast.error("user already registered")
      }
    } catch (error) {
      console.error('Error:', error.message);
      toast.error("net work failuire")
    }
  };
  
  const handleRegistration = async (event) => {
    event.preventDefault();

    try {
      const { username, email, password } = event.target;

      // Validate form data using Yup schema
      await validationSchema.validate({
        username: username.value,
        email: email.value,
        password: password.value,
      }, { abortEarly: false }); // Validate all fields and collect all errors

      // If validation succeeds, register the user
      registerUser("55eebc5550c70b2b7736", username.value, email.value, password.value);
    } catch (error) {
      console.error('Validation Error:', error);

      // Set alert to true to display validation errors
      setAlert(true);
    }
  };

  return (
    <motion.div initial="hidden" animate="visible" variants={container} className="form-container">
      <motion.p variants={container} className="font-thin text-3xl">Registration</motion.p>
      <form className="h-auto flex justify-center gap-4 w-full  flex-col p-2 font-thin" onSubmit={handleRegistration}>
        {/* Input fields */}
        {/* ... */}
<div className="flex flex-col items-start ">
  <input type="text" name="username" id="username" placeholder="name "  className='bg-black px-2  rounded-lg w-full h-14'/>
</div>
<div className="flex flex-col items-start ">
<input type="email" name="email" id="email" placeholder="email "  className='bg-black px-2  rounded-lg w-full h-14'/>

</div>
<div className="flex flex-col items-start ">
  <input type="password" name="password" id="password" placeholder="password "  className='bg-black px-2  rounded-lg w-full h-14'/>

  <button className="forgot">
    <p rel="noopener noreferrer" onClick={()=>dispatch(setSignIn(true))}>already have an account?</p>
  </button>
</div>

{/* Add additional input fields for registration, if necessary */}
{alert&&
<p>please fill in the blank</p>}
        <button className="btn border" type="submit">Register</button>
        {alert && <p>Please fill in all the fields correctly.</p>}
      </form>
      {/* Rest of the code remains unchanged */}
    </motion.div>
  );
}

export default Registration;

