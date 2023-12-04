import React from 'react';
import { useFormik } from 'formik';
import { signUpvalidation } from '../signUpvalidation';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { setSignIn } from '../redux/authSlice';
import {motion} from 'framer-motion'
const initialValues = {
  name: '',
  email: '',
  password: ''
};

function Registration() {
  const dispatch = useDispatch();

  const { values, handleBlur, handleChange, handleSubmit, errors } = useFormik({
    initialValues: initialValues,
    validationSchema: signUpvalidation,
    onSubmit: async (values, { setSubmitting }) => {
      const { name, email, password } = values;
      const accessKey = '55eebc5550c70b2b7736';

      try {
        const response = await axios.post('https://ecommerce-api.bridgeon.in/users/register', {
          accessKey,
          username: name,
          email,
          password
        });

        const { status, message, data } = response.data;

        if (status === 'success') {
          console.log('Registration successful. Token:', data.token);
          toast.success('User registered successfully');
          dispatch(setSignIn(true));
        } else {
          console.error('Registration failed. Message:', message);
          toast.error('User already registered');
        }
      } catch (error) {
        console.error('Error:', error.message);
        toast.error('Network failure');
      }
    }
  });

  return (
    <motion.div initial="hidden" animate="visible"  className="form-container">
    <motion.p  className="font-thin text-3xl">Registration</motion.p>
      <form onSubmit={handleSubmit} className='h-auto flex flex-col justify-center items-center gap-2  font-thin '>
        <input value={values.name} onChange={handleChange} type="name" name='name' placeholder='Name' onBlur={handleBlur}  className='bg-black rounded-lg  w-full h-10 p-2'/>
        {errors.name && <p className='text-xs font-thin text-black w-full text-left'>{errors.name}</p>}
        <input value={values.email} onChange={handleChange} onBlur={handleBlur} type="email" name='email' placeholder='Email'  className='bg-black rounded-lg  w-full h-10 p-2'/>
        {errors.email && <p className='text-xs font-thin text-black w-full text-left'>{errors.email}</p>}
        <input value={values.password} onChange={handleChange} onBlur={handleBlur} type="password" name='password' placeholder='Password' className='bg-black rounded-lg  p-2 w-full h-10'/>
        {errors.password && <p className='text-xs font-thin text-black w-full text-left'>{errors.password}</p>}
        <button type="submit" className='border w-1/2 p-1 rounded-lg'>Submit</button>
      </form>


        <button onClick={()=>dispatch(setSignIn(true))} className='text-xs text-black  '>already have an account ? sign in </button >






    </motion.div>
  );
}

export default Registration;
