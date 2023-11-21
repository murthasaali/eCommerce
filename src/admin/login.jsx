import React, { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setToken ,setSignIn, setUserid, setUserToken, selectUserid, selectUserToken} from "../redux/authSlice";
import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import { selectToken } from "../redux/authSlice";
import Registration from "./registration";
import { setIslogin } from "../redux/authSlice";
import toast from "react-hot-toast";
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

function Login() {

  
  const isSignIn = useSelector((state) => state.auth.isSignIn);

  const userId=useSelector(selectUserid)
  const userToken=useSelector(selectUserToken)
  console.log("userid",userId);
  console.log("userToken",userToken);
  const [state, setState] = useState("");
  const [name, setName] = useState("");
  const dispatch = useDispatch();
  const navigation = useNavigate();
  // const userToken="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkZWFsZXJJZCI6IjY1NDA4ZjRkN2E2NmIyYTQ0MmY0M2ExNiIsImlhdCI6MTY5ODkxODc5MSwiZXhwIjoxNzMwNDU0NzkxfQ.-EK1a98jBLNXpTSxl90Jz4NP8NYdSB98kuD1H0KW4Rs"
  // const tologin=(event)=>{
  //   event.email.value==="@mail.com"?handleLogin(event):loginUser(event)
  // }
  const tologin = (event) => {
    const email = event.target.email.value;
    const isAdmin = email === "murthasa@mail.com"; // Replace with the actual admin email
    event.preventDefault();
    
  
    if (isAdmin) {
      handleLogin(event);
    } else {
      loginUser(event);
    }
  };
  
  
  const handleLogin = async (event) => {
    event.preventDefault();
    const email = event.target.email.value;
    console.log(email);
    const password = event.target.password.value;
    console.log(password);
  
    setState([...state, { email: email, password: password }]);
  
    try {
      const response = await axios.post(
        "https://ecommerce-api.bridgeon.in/login",
        {
          email,
          password,
        }
      );
      const { status, message, data } = response.data;
      console.log(response.data, "guyjgjyhbj");
      if (status === "success") {
        const token = data.token;
        console.log("Login successful. Token:", token);
        dispatch(setToken(token)); // Dispatch the token to the Redux store
        navigation("/admin");
      } else {
        console.error("Login failed. Message:", message);
      }
    } catch (error) {
      console.error("Error:", error.message);
    }
  }
    

  
  const loginUser = async (event) => {
    event.preventDefault()
    const email = event.target.email.value;
    const password=event.target.password.value;// /  const apiKey=""
    const accessKey="55eebc5550c70b2b7736"
  

    try {
      const response = await axios.post('https://ecommerce-api.bridgeon.in/users/login', {
        accessKey,
        email,
        password,
      }
        );
        const { status, message, data } = response.data;

      if (status === 'success') {
        console.log(data)
        const token = data.token;
        const id=data.userId;
        dispatch(setUserToken(token))
        setName(data.username)
        dispatch(setUserid(id))
        dispatch(setIslogin(true))
        toast.success("loggined succussfully")
       
     

        console.log('Login successful. Token:', token);
        navigation('/')
      } else {
        console.error('Login failed. Message:', message);
      }
    } catch (error) {
      console.error(`token${accessKey}`, error.message);
    }
  };
  
  return (
    <>
 
 <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.3 }}
    style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      display: 'flex',
      flexDirection:"column",
      justifyContent: 'center',
      alignItems: 'center',
      background: 'rgba(0, 0, 0, 0.9)',
      overflow:"auto",
      zIndex: 999,
    }}
    onClick={() =>dispatch(setIslogin(false))}
  >
    <p className="qoute"><span className="text-blue-200 text-6xl">welcome to ck sons </span><br/>
    <span className="text-3xl text-stone-200">car reandal service</span></p>
    <motion.div
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: 'tween', stiffness: 260, damping: 20 }}
      // style={{
      //   background: 'white',
      //   padding: '2rem',
      //   borderRadius: '0.5rem',
      // }}
      className=" w-3/4 h-3/4 bg-no-repeat bg-conatin bg-center  rounded-lg "
      onClick={(e) => e.stopPropagation()}
  
     
    > <div className='w-full h-full bg-blackn flex justify-center items-center bg-opacity-60 rounded-lg'>
 {   
  isSignIn?
  
  
  <motion.div initial="hidden"
        animate="visible" variants={container} className="form-container">
        <motion.p variants={container}
          className="title">Login</motion.p>

        <form className="form" onSubmit={tologin}>
          <div className="input-group">
            <motion.label htmlFor="username" variants={item} ><span className="text-stone-600 text-opacity-80">Username</span></motion.label>
            <input type="text" name="email" id="email" placeholder="" />
          </div>
          <div className="input-group">
            <motion.label htmlFor="password" variants={item}><span className="text-stone-600 text-opacity-80">Password</span></motion.label>
            <input type="password" name="password" id="password" placeholder="" />
            <div className="forgot">
              <p rel="noopener noreferrer" >Forgot Password ?</p>
            </div>
          </div>
          <button className="sign" type="submit">Sign in</button>
        </form>
        <div className="social-message">
          <div className="line"></div>
          <p className="message">Login with social accounts</p>
          <div className="line"></div>
        </div>
        <div className="social-icons">
          <button aria-label="Log in with Google" className="icon">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" className="w-5 h-5 fill-current">
              <path d="M16.318 13.714v5.484h9.078c-0.37 2.354-2.745 6.901-9.078 6.901-5.458 0-9.917-4.521-9.917-10.099s4.458-10.099 9.917-10.099c3.109 0 5.193 1.318 6.38 2.464l4.339-4.182c-2.786-2.599-6.396-4.182-10.719-4.182-8.844 0-16 7.151-16 16s7.156 16 16 16c9.234 0 15.365-6.49 15.365-15.635 0-1.052-0.115-1.854-0.255-2.651z"></path>
            </svg>
          </button>
          <button aria-label="Log in with Twitter" className="icon">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" className="w-5 h-5 fill-current">
              <path d="M31.937 6.093c-1.177 0.516-2.437 0.871-3.765 1.032 1.355-0.813 2.391-2.099 2.885-3.631-1.271 0.74-2.677 1.276-4.172 1.579-1.192-1.276-2.896-2.079-4.787-2.079-3.625 0-6.563 2.937-6.563 6.557 0 0.521 0.063 1.021 0.172 1.495-5.453-0.255-10.287-2.875-13.52-6.833-0.568 0.964-0.891 2.084-0.891 3.303 0 2.281 1.161 4.281 2.916 5.457-1.073-0.031-2.083-0.328-2.968-0.817v0.079c0 3.181 2.26 5.833 5.26 6.437-0.547 0.145-1.131 0.229-1.724 0.229-0.421 0-0.823-0.041-1.224-0.115 0.844 2.604 3.26 4.5 6.14 4.557-2.239 1.755-5.077 2.801-8.135 2.801-0.521 0-1.041-0.025-1.563-0.088 2.917 1.86 6.36 2.948 10.079 2.948 12.067 0 18.661-9.995 18.661-18.651 0-0.276 0-0.557-0.021-0.839 1.287-0.917 2.401-2.079 3.281-3.396z"></path>
            </svg>
          </button>
          <button aria-label="Log in with GitHub" className="icon">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" className="w-5 h-5 fill-current">
              <path d="M16 0.396c-8.839 0-16 7.167-16 16 0 7.073 4.584 13.068 10.937 15.183 0.803 0.151 1.093-0.344 1.093-0.772 0-0.38-0.009-1.385-0.015-2.719-4.453 0.964-5.391-2.151-5.391-2.151-0.729-1.844-1.781-2.339-1.781-2.339-1.448-0.989 0.115-0.968 0.115-0.968 1.604 0.109 2.448 1.645 2.448 1.645 1.427 2.448 3.744 1.74 4.661 1.328 0.14-1.031 0.557-1.74 1.011-2.135-3.552-0.401-7.287-1.776-7.287-7.907 0-1.751 0.62-3.177 1.645-4.297-0.177-0.401-0.719-2.031 0.141-4.235 0 0 1.339-0.427 4.4 1.641 1.281-0.355 2.641-0.532 4-0.541 1.36 0.009 2.719 0.187 4 0.541 3.043-2.068 4.381-1.641 4.381-1.641 0.859 2.204 0.317 3.833 0.161 4.235 1.015 1.12 1.635 2.547 1.635 4.297 0 6.145-3.74 7.5-7.296 7.891 0.556 0.479 1.077 1.464 1.077 2.959 0 2.14-0.020 3.864-0.020 4.385 0 0.416 0.28 0.916 1.104 0.755 6.4-2.093 10.979-8.093 10.979-15.156 0-8.833-7.161-16-16-16z"></path>
            </svg>
          </button>
        </div>
        
    <p className="signup" onClick={() => dispatch(setSignIn(false))}>
      Don't have an account?
      <a rel="noopener noreferrer" href="#" className="">
        Sign up
      </a>
    </p>
      </motion.div>:<Registration/>
      
      }


    </div>
    {/* <input type="text" className='bg-stone-300 text-blue-950  w-3/4 h-14 rounded-3xl pl-4 overflow-hidden shadow-md'/> */}

      
    </motion.div>
 
  </motion.div>

 

</>
    // <div>
    //   <div className="L-wrapper">
    //     <div className="L-inner">
    //       <form action="/login">
    //         <h3>Welcome back!</h3>
    //         <div className="L-form-group">
    //           <div className="L-form-wrapper">
    //             <label htmlFor="email">Email</label>
    //             <input type="text" className="L-form-control" id="email" />
    //           </div>
    //         </div>
    //         <div className="L-form-wrapper">
    //           <label htmlFor="password">Password</label>
    //           <input type="password" className="L-form-control" id="password" />
    //         </div>

    //         <button type="submit" className="L-button">
    //           Login
    //         </button>
    //       </form>
    //     </div>
    //   </div>
    // </div>




  );
}

export default Login;
