import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaHeart, FaSearch, FaSignOutAlt, FaUserPlus } from 'react-icons/fa';
import { Modal } from '@mui/material';
import DotBadge from '../components/badge';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setProducts, setIscart, clearUserToken, selectIslogin, clearIslogin, clearUserId, selectToken, selectProducts, seleectImg, clearuserName, selectUsername } from '../redux/authSlice';
import { setIsabout } from '../redux/authSlice';
import { Avatar } from '@mui/material';
import toast from 'react-hot-toast';
import axiosInsatnce from '../axiosInstance/instance';
import Box from '@mui/material/Box';
import loginpic from '../assets/login.png'
import Typography from '@mui/material/Typography';
import shakehand from '../assets/shake.png'
const scaleVariants = {
  initial: { scale: 1 },
  hover: { scale: 1.1, transition: { duration: 0.3 } },
};
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'black',
  boxShadow: '2px 5px 10px 5px white',
};

function Mainbar() {
  const [isSearch, setIsSearch] = useState(false);
  const [modal, setModal] = useState(false);
  const img = useSelector(seleectImg)
  const [loginModal, setloginModal] = useState(false);
  const token = useSelector(selectToken);
  const name = useSelector(selectUsername);
  const isLogin = useSelector(selectIslogin);

  console.log(isLogin)
  const nav = useNavigate();
  const dispatch = useDispatch();
  const products = useSelector(selectProducts)
  const [searchdata, setSearchdata] = useState([]);
  const apiKey = process.env.REACT_APP_API_KEY
  const getAllProducts = async (token, apiKey) => {
    try {
      const response = await axiosInsatnce.get(`/products?accessKey=${apiKey}`, {

        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const { status, message, data } = response.data;
      if (status === 'success') {
        dispatch(setProducts(data));
        console.log('Fetched products:axios instance', data);

      } else {
        console.error('Product retrieval failed. Message:', message);
      }
    } catch (error) {
      console.error('Error:', error.message);
    }
  };
  const handleLogout = () => {
    dispatch(clearUserToken());
    dispatch(clearIslogin());
    dispatch(clearUserId());
    dispatch(clearuserName())
    toast.error('logout');
    toggleModal();
  };

  const toggleModal = () => {
    setModal(!modal);
  };

  useEffect(() => {

    getAllProducts(token, apiKey)

  }, [token])
  const handleSearch = (e) => {
    e.preventDefault()
    const text = e.target.value
    const text1 = text.trim().toLowerCase()
    const results = products.filter((product) => product.title.toLowerCase().includes(text1));
    console.log(results);
    setSearchdata(results);

  };
  const toLogin = () => {
    setloginModal(false)
    nav('/login')
  }
  return (
    <div className="main-bar">
      <motion.button
        initial={{ scale: 0 }}
        whileHover={{ rotate: 160 }}
        animate={{ rotate: 360, scale: 1 }}
        transition={{
          type: 'spring',
          stiffness: 260,
          damping: 20,
        }}
        className="icon-container"
        onDoubleClick={() => nav('/admin')}
      ></motion.button>
      <div className="flex justify-center items-center gap-4">
        <ul className='flex justify-center items-center gap-4 font-thin text-2xl text-stone-300' style={{ fontFamily: "'Arista Pro Alternate Fat', sans-serif" }}>
          <motion.button variants={scaleVariants} initial="initial" whileHover="hover" whileTap="hover" onClick={() => dispatch(setIsabout(true))}>
            ABOUT
          </motion.button>
          <motion.button variants={scaleVariants} initial="initial" whileHover="hover" whileTap="hover">
            CONTACT
          </motion.button>
        </ul>
      </div>

      {/* User-related Elements */}
      <div className="flex gap-4 justify-center items-center text-stone-300">
        <motion.button variants={scaleVariants} initial="initial" whileHover="hover" whileTap="hover" onClick={() => setIsSearch(true)}>
          <FaSearch />
        </motion.button>
        <motion.button className="username" variants={scaleVariants} initial="initial" whileHover="hover" whileTap="hover">
          {name}        </motion.button>
        {!isLogin ? (
          <motion.button variants={scaleVariants} initial="initial" whileHover="hover" whileTap="hover">
            <FaUserPlus title="login" onClick={() => setloginModal(true)} />
          </motion.button>
        ) : (
          <motion.button variants={scaleVariants} initial="initial" whileHover="hover" whileTap="hover">
            <FaSignOutAlt title="logout" onClick={() => setModal(true)} />
          </motion.button>
        )}
        <motion.button variants={scaleVariants} initial="initial" whileHover="hover" whileTap="hover">
          <FaHeart className="text-pink-500" onClick={() => nav('/wishlist')} />
        </motion.button>
        <motion.button variants={scaleVariants} initial="initial" whileHover="hover" whileTap="hover" onClick={() => dispatch(setIscart(true))}>
          <DotBadge />
        </motion.button>
        {isLogin && (
          <motion.button variants={scaleVariants} initial="initial" whileHover="hover" whileTap="hover" onClick={() => nav("/account")}>
            <Avatar src={img}>

            </Avatar>
          </motion.button>
        )}
      </div>
      {isSearch && (
        <Modal
          open={isSearch}
          onClose={() => setIsSearch(false)}
          style={{ display: 'flex', alignItems: 'start', justifyContent: 'center', marginTop: '100px' }}
        >
          <div className="p-8  flex flex-col  justify-center items-center gap-2 w-1/2 rounded-xl">
            <input
              type="text"
              className="bg-stone-300 text-blue-950 w-3/4 h-14 rounded-3xl pl-4 overflow-hidden shadow-md"
              style={{ opacity: 1, y: 0 }}
              onChange={handleSearch}
            />
            <div className="bg-orange-400 opacity-75 h-auto w-3/4 rounded-lg">
              <ul >

                {searchdata.length > 0 ?
                  (searchdata.map((value, index) => {
                    return (

                      <p key={index} className=' font-mono rounded-lg ' onDoubleClick={() => nav(`/viewproduct/${value._id}`)} >
                        {index + 1}:
                        {value.title}
                      </p>
                    )
                  })) : <div>plsss enter something</div>
                }
              </ul>
            </div>
          </div>
        </Modal>
      )}


      {modal && (
        <Modal open={modal} onClose={toggleModal} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div className="p-8  backdrop-blur-sm rounded-xl  border">

            <p className="flex justify-center items-center gap-10 text-stone-200">
              do you want to logout <button className="btn" onClick={handleLogout}>yes</button>
            </p>
          
          </div>
        </Modal>
      )}
      {loginModal && (

<Modal
open={() => setloginModal(true)}
onClose={() => setloginModal(false)}
aria-labelledby="modal-modal-title"
aria-describedby="modal-modal-description"
>
<Box
  sx={{
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    backdropFilter:` blur(5px)`,
    boxShadow: '2px 5px 10px 5px black', // Adjust or remove this line
    p: 4,
  }}
  className="shadow-md rounded-lg flex flex-col justify-center items-center"
>
  <motion.img
    src={loginpic}
    alt=""
    className='w-24 h-24'
    animate={{
      y: [0, 10, 0],
    }}
    transition={{
      duration: 4,
      repeat: Infinity,
      ease: "linear",
    }}
  />
  <Typography id="modal-modal-title" variant="h6" component="h2">
    <p className="flex justify-center items-center gap-10 text-red-600">
      <button className="border bg-black btn" onClick={toLogin}>Login</button>
    </p>
  </Typography>
</Box>
</Modal>


      )}


    </div>
  );
}

export default Mainbar;
