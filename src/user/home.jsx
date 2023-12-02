import React from 'react'
import Navber from './navbar'
import Mainbar from './mainbar'
import { motion } from 'framer-motion';
import {useDispatch, useSelector} from 'react-redux'
import Carousal from '../components/carousal';
import { useNavigate } from 'react-router-dom';
import box from "../offerbox.png"
import shrimp from "../delicious-shelled-cooked-shrimp-with-green-leaves-white_1284-45639-removebg-preview.png"
import rice from "../large-bowl-food-with-fish-vegetables_197463-2405-removebg-preview.png"
import burger from '../2150914687-removebg-preview.png'
import beverages from '../3d-rendering-brazil-icon_23-2150579996-removebg-preview.png'
import tika from '../this-3d-rendered-kebab-skewer-260nw-2177290863-removebg-preview.png'
import broast from '../arrangement-with-chicken-food-white-background_807701-4730__2_-removebg-preview.png'
import pizza from '../italian-pizza-fast-food-icon-isolated-3d-render-illustration_439185-12977-removebg-preview.png'
import shavaya from '../realistic-illustration-roasted-turkey-grilled-chicken-with-slices-spices-vegetable_1441-1865-removebg-preview.png'
import BasicCard from '../components/card';
import { FaFacebook, FaInstagram, FaMailBulk, FaPhone, FaWhatsapp } from 'react-icons/fa';
import { selectIsLoading, setIsLoading } from '../redux/authSlice';
import Loading from '../components/loading';
import About from './about';

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

const items = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1
  }
};
function Home() {
  const dispatch=useDispatch()
  console.log("loadingggg")
  const isLoading= useSelector(selectIsLoading)
  setTimeout(() => {
    dispatch(setIsLoading(false))
  }, 3000);
  const nav = useNavigate()
  const menucard=[
    {title:"pizza",src:`${pizza}`,nav:'/kitchen/pizza'},
    {title:"burger",src:`${burger}`,nav:'/kitchen/burger'},
    {title:"broast",src:`${broast}`,nav:'/kitchen/broast'},
    {title:"shavaya",src:`${shavaya}`,nav:'/kitchen/shavaya'},
    {title:"tika",src:`${tika}`,nav:'/kitchen/tika'},
    {title:"beverages",src:`${beverages}`,nav:'/kitchen/beverages'},
    {title:"rice",src:`${rice}`,nav:'/kitchen/rice'},
    {title:"shrimp",src:`${shrimp}`,nav:'/kitchen/shrimp'},
   
]


  return (
    <div className='home_main'
 
    >
      {
        isLoading&&(<Loading/>)
      }
  
    
   <div className='w-full h-auto  flex flex-col relative  '>
    <Mainbar/>
    <div className='crme'>
      <div className='w-full  sm:w-4/6 rounded-lg bg-opacity-30 overflow-hidden flex flex-col justify-center items-center lg:p-10 sm:p-8 '>
      
      <p className=' flex  justify-center items-center text-start xs:flex-col xs:flex w-full h-auto xs:justify-center xs:items-center  md:text-xl  text-xs px-3 text-orange-400 text-opacity-60'>    Enjoy exclusive discounts and irresistible deals on your favorite fast-food orders with our app's special offers!
    <motion.img
      src={box}
      height={"100px"}
      width={"100px"}
      alt=""
      animate={{
        y: [0, 10, 0], // Move the image up and down in a loop
      }}
      transition={{
        duration: 4, // Set the duration of each cycle (in seconds)
        repeat: Infinity, // Repeat the animation infinitely
        ease: "linear", // Set the easing function for smooth animation
      }}
    />
  </p>
<Carousal />
  </div>
      <div className=' p-4 font-thin h-1/2 lg:h-full'> <p>choose by menu</p><motion.ul
    className="w-full h-full sm:h-1/2 lg:h-full p-2 grid grid-cols-4 gap-4 grid-rows-2 gap-15 p-15 overflow-hidden bg-opacity-20 rounded-lg"
    variants={container}
    initial="hidden"
    animate="visible"
  >

{menucard.map((item, index) => (
  <motion.div className='flex justify-center h-auto gap-1 items-center flex-col w-auto' key={index}  onClick={() => nav(item.nav)}  variants={items}>
    <motion.div
      className=" md:h-24 md:w-24 h-10 w-10  md:flex overflow-hidden"
       
    
      // You might need to adjust this part according to your animation
  
     // Remove box shadow on hover
    >
      <motion.button 
      initial={{ scale: 1 }} // Initial scale of the image
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
  <p>contact us</p>
  <div className='w-full flex justify-between items-center p-4 h-40 '>

    <FaWhatsapp  className='text-2xl hover:text-green-600 opacity-50'/>
    <FaInstagram  className='text-2xl hover:text-pink-700 opacity-40'/>
    <FaPhone  className='text-2xl  hover:text-blue-700 opacity-50'/>
    <FaMailBulk  className='text-2xl hover:text-red-600 opacity-50'/>
    <FaFacebook  className='text-2xl   hover:text-blue-700 opacity-50'/>

      </div></div>
    </div>
    {/* <motion.div
      initial={{ opacity: 0, y: -20 }} // Initial state: hidden and slightly above
      animate={{ opacity: 1, y: 0 }} // Animated state: visible and at original position
      transition={{ duration: 1 }} // Animation duration
      className="co" 
      style={{
        display:"flex",
        justifyContent:"start",
        paddingInline:"10px"

        
      }}// Replace with your custom class name
    >
      <p className='qoute1'><motion.span  >CRUNCHICK </motion.span >  <motion.span className='text-opacity-70 text-6xl text-white'
          initial={{ opacity: 0 }} // Initial state: hidden
          animate={{ opacity: 1 }} // Animated state: visible
          transition={{ delay: 0.5, duration: 1 }} // Animation delay and duration
        >Order Now</motion.span></p>
    </motion.div> */}
   </div>
    <div className='font-thin flex justify-center ml-5  items-center'>our company provides you a lot of advantages <div className='icon-container'></div></div>
   <div className='w-full h-auto p-4 flex  justify-center gap-7 flex-wrap   '>
    <BasicCard/>

   </div>
   <section className='w-full h-auto bg-black flex flex-col justify-center mb-36 items-center'>
    <div className='flex justify-center w-full  '>
    <span  
    style={{
      fontFamily:""
    }}
    >CRUNCHICK </span>


    </div>
    
   </section>
   
   <Navber/>
    </div>
  )
}

export default Home