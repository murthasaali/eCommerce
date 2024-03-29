import React, { useState, useEffect } from 'react'
import Navber from './navbar'
import Mainbar from './mainbar'
import { motion } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux'
import Carousal from '../components/carousal';
import { useNavigate } from 'react-router-dom';
import box from "../assets/offerbox.png"
import shrimp from "../assets/shrimp.png"
import rice from "../assets/bowl.png"
import burger from '../assets/burger.png'
import beverages from '../assets/bevearges.png'
import tika from '../assets/tika.png'
import broast from '../assets/chicken.png'
import pizza from '../assets/pizza.png'
import shavaya from '../assets/shavaya.png'
import { FaFacebook, FaInstagram, FaMailBulk, FaPhone, FaSearch, FaWhatsapp } from 'react-icons/fa';
import { selectIsLoading, setIsLoading } from '../redux/authSlice';
import Loading from '../components/loading';
import { Modal } from '@mui/material';
import Location from '../components/location';
import { setProducts } from '../redux/authSlice';
import axiosInsatnce from '../axiosInstance/instance';
import { selectToken, selectProducts } from '../redux/authSlice';
import Footer from '../components/footer';
import { container } from '../constants/container';

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

const items = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1
  }
};
function Home() {
  console.log("loadingggg")
  const [offerModal, setOfferModal] = useState(false)
  const isLoading = useSelector(selectIsLoading)
  setTimeout(() => {
    dispatch(setIsLoading(false))
  }, 3000);
  const menucard = [
    { title: "pizza", src: `${pizza}`, nav: '/kitchen/pizza' },
    { title: "burger", src: `${burger}`, nav: '/kitchen/burger' },
    { title: "broast", src: `${broast}`, nav: '/kitchen/broast' },
    { title: "shavaya", src: `${shavaya}`, nav: '/kitchen/shavaya' },
    { title: "tika", src: `${tika}`, nav: '/kitchen/tika' },
    { title: "beverages", src: `${beverages}`, nav: '/kitchen/beverages' },
    { title: "rice", src: `${rice}`, nav: '/kitchen/rice' },
    { title: "shrimp", src: `${shrimp}`, nav: '/kitchen/shrimp' },

  ]
  const [modal, setModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState([]);
  const token = useSelector(selectToken);
  const products = useSelector(selectProducts);
  const dispatch = useDispatch();
  const nav = useNavigate()
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
        console.log('navbar:', data);
      } else {
        console.error('Product retrieval failed. Message:', message);
      }
    } catch (error) {
      console.error('Error:', error.message);
    }
  };
  useEffect(() => {
    getAllProducts(token, apiKey);
  }, [token]);

  const handleInputChange = (e) => {
    const text = e.target.value;
    const text1 = text.trim().toLocaleLowerCase()
    const results = products.filter((product) => product.title.toLowerCase().includes(text1));
    console.log(results);
    setSearchQuery(results);
  };



  return (
    <>

      <div className='home_main'  >

        {modal && (
          <Modal
            open={modal}
            onClose={() => setModal(false)}
            style={{
              display: 'flex',
              alignItems: 'start',
              justifyContent: 'center',
              marginTop: '10px',
            }}
          >

            <div className="p-8 flex flex-col justify-center items-center gap-2 w-full rounded-xl">
              <input
                type="text"
                className="bg-stone-300 text-blue-950 w-3/4 h-8 rounded-3xl pl-4 overflow-hidden shadow-md"
                style={{ opacity: 1, y: 0 }}
                onChange={handleInputChange}

                placeholder="Search products..."
              />
              <div className="bg-orange-400 opacity-75 h-auto w-3/4 rounded-lg">

                <ul >

                  {searchQuery.length > 0 ?
                    (searchQuery.map((value, index) => {
                      return (

                        <p key={index} className=' font-mono rounded-lg ' onClick={() => nav(`/viewproduct/${value._id}`)} >
                          {index + 1}:
                          {value.title}
                        </p>
                      )
                    })) : <div>plsss enter something</div>
                  }
                </ul>
              </div>
              <div>
              </div>
            </div>
          </Modal>
        )}
        {
          isLoading && (<Loading />)
        }

        {
          offerModal &&
          <>
            {offerModal && (
             <Modal
             open={offerModal}
             onClose={() => setOfferModal(false)}
             aria-labelledby="modal-modal-title"
             aria-describedby="modal-modal-description"
             style={{
               display: 'flex',
               alignItems: 'center',
               justifyContent: 'center',
             }}
           >
             <div className="p-8 w-64 backdrop-blur-sm	 border rounded-xl">
               <div className="flex flex-col justify-center items-center gap-2 text-blue-600">
                 <span>Apply your coupon code</span>
                 <input type="text" className='w-48 h-10 rounded-lg bg-black bg-opacity-70 px-2' placeholder='coupon code' />
                 <button className="btn bg-black" onClick={() => setOfferModal(false)}>yes</button>
               </div>
             </div>
           </Modal>
           
            )}
          </>
        }
        <div className='w-full h-auto  flex flex-col relative  '>
          <Mainbar />
          <div className='crme'>
            <div className='w-full  sm:w-4/6 rounded-lg bg-opacity-30 overflow-hidden flex flex-col justify-center items-center lg:p-10 sm:p-8 '>
              <p className=' flex  justify-center items-center font-thin text-start xs:flex-col xs:flex w-full h-auto xs:justify-center xs:items-center  md:text-xl  text-xs px-3 text-stone-400 text-opacity-60'>    Enjoy exclusive discounts and irresistible deals on your favorite fast-food orders with our app's special offers!
                <button>
                  <motion.img
                    onClick={() => setOfferModal(true)}
                    src={box}
                    height={"100px"}
                    width={"100px"}
                    alt=""
                    animate={{
                      y: [0, 10, 0], 
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: "linear", 
                    }}
                  />
                </button>
              </p>
              <Carousal />
            </div>
            <div className=' p-4 font-thin h-1/2 lg:h-full flex flex-col gap-4'> <div className='flex justify-center items-center text-white gap-8'>choose by menu <FaSearch className='text-xl  flex md:hidden' onClick={() => setModal(true)} /> </div > <motion.ul
              className="w-full h-full sm:h-1/2 lg:h-full p-2 grid grid-cols-4 gap-4 grid-rows-2 gap-15 p-15 overflow-hidden bg-opacity-20 rounded-lg"
              variants={container}
              initial="hidden"
              animate="visible"
            >
              {menucard.map((item, index) => (
                <motion.div className='flex justify-center h-auto gap-1 items-center flex-col w-auto' key={index} onClick={() => nav(item.nav)} variants={items}>
                  <motion.div
                    className=" md:h-24 md:w-24 h-10 w-10  md:flex overflow-hidden"
                  >
                    <motion.button
                      initial={{ scale: 1 }} 
                      whileHover={{ scale: 1.1 }}
                      className='h-full w-full'
                      style={{
                        backgroundImage: `url("${item.src}")`,
                        backgroundSize: 'cover',
                        backgroundRepeat: 'no-repeat',
                        backgroundPosition: 'center',


                      }} >
                    </motion.button >
                  </motion.div>
                  <div className='h-auto text-stone-200'>
                    <span className='font-thin text-xs  flex xs:hidden'>{item.title}</span>
                  </div>
                </motion.div>
              ))}
            </motion.ul>
              {/* <Location /> */}
              <div className='w-full flex flex-col justify-evenly items-center p-4 h-40 text-white'>
                <p>contact us</p>
                <div className='flex w-full justify-evenly  text-white  '>
                  <FaWhatsapp className='text-2xl hover:text-green-600 opacity-50' />
                  <FaInstagram className='text-2xl hover:text-pink-700 opacity-40' />
                  <FaPhone className='text-2xl  hover:text-blue-700 opacity-50' />
                  <FaMailBulk className='text-2xl hover:text-red-600 opacity-50' />
                  <FaFacebook className='text-2xl   hover:text-blue-700 opacity-50' />
                </div>

              <Location/>
              </div></div>
          </div>    
        </div>
        <div className='font-thin flex justify-center ml-5  items-center'>our company provides you a lot of advantages <div className='icon-container'></div></div>
        <section className='w-full h-auto bg-black flex flex-col justify-center mb-36 items-center'>
          <div className='flex justify-center w-full  '>
            <span
              style={{
                fontFamily: ""
              }}
            >CRUNCHICK </span>
          </div>
        </section>
        <Navber />
        {/* <Footer /> */}

      </div>
    </>
  )
}

export default Home